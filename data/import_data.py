import pickle
from lxml import etree
import datetime
import itertools
import more_itertools
import json
import string
import functools
import re
import aiohttp
import asyncio
import time
from os import path


async def fetch_xml(session, url):
    async with session.get(url) as response:
        return await response.read()


def fixup_specialization_name(s):
    """Fix the irregular formatting of specialization names found in Bila kniha."""
    s = re.sub(" +", " ", s)
    return s.replace("jaderné", "Jaderné")

def lecture_and_exercise_hours(rozsah_string):
    """Attempt to parse the rozsah field in Bila kniha as the respective weekly lecture and exercise hours."""
    m=re.match("^(?:(\d+)P?\+)?(\d+)C?$", rozsah_string)
    if m:
        return int(m[1]) if m[1] else 0, int(m[2])
    else:
        return 0,0

def subject_codes(document):
    """Return the codes of all the subjects present in a timetable XML document."""
    return document.xpath("/definitions/courses/course/acronym/text()")


def get_course(document, course_acronym):
    """Retrieve a course from a timetable XML document. In case of ambiguity, guess the correct element based on
    the maximum number of linked cards."""
    course_elements = document.xpath('/definitions/courses/course[acronym/text()="{}"]'.format(course_acronym))
    return max(course_elements, key=lambda course: len(unique_course_time_slots(course)))


def course_lectures(course):
    """Retrieve all lectures associated with a course."""
    return course.xpath('/definitions/lectures/lecture[course/@ref={}]'.format(course.attrib['id']))


def lecture_part_ids(lecture):
    """Retrieve the IDs of all parts that have at least one card of a given lecture in their timetable."""
    xpath = '/definitions/cards/card/part[parent::card[lecture[@ref="{}"]]]/@ref'.format(lecture.attrib['id'])
    return {int(x) for x in lecture.xpath(xpath)}


def part_ids_for_course(course):
    """Retrieve all groups of students (identified by part id) that have the course present in their timetable."""
    return set().union(*(lecture_part_ids(lecture) for lecture in course_lectures(course)))


def is_card_valid(card):
    """Check if a card is not garbage (i.e., actually refers to a time slot)."""
    return card.xpath("string(day/@ref)") != '' and card.xpath("string(time/@ref)") != ''


def card_data(card):
    """Extract the relevant data from a card element: Who teaches the lesson in which room and building at what time."""
    lecture_id = card.xpath("string(lecture/@ref)")
    lecturer_id = card.xpath("string(lecturer/@ref)")
    classroom_id = card.xpath("string(classroom/@ref)")
    begin = int(card.xpath("string(day/@ref)")) * 100 + int(card.xpath("string(time/@ref)")) + 6.5
    end = begin + int(card.xpath("string(/definitions/lectures/lecture[@id=\"{}\"]/duration)".format(lecture_id)))
    what = "C" if card.xpath("string(/definitions/lectures/lecture[@id={}]/tag)".format(lecture_id)) in ["ex",
                                                                                                         "cv"] else "P"
    who = card.xpath("string(/definitions/lecturers/lecturer[@id=\"{}\"]/name)".format(lecturer_id))
    room = card.xpath("string(/definitions/classrooms/classroom[@id=\"{}\"]/name)".format(classroom_id))
    maybe_building = card.xpath(
        "string(/definitions/classrooms/classroom[@id=\"{}\"]/building/@ref)".format(classroom_id))
    building = 0 if maybe_building == "" else int(maybe_building)
    return begin, end, what, who, room, building


def cards_for_course_and_part(course, part_id):
    """Return all lessons that a group of students identified by part_id supposed to attend to satisfy the
    requirements of a course. """
    lecture_ids = [int(lecture.attrib['id']) for lecture in course_lectures(course)]
    lecture_predicate = " or ".join(["lecture/@ref={}".format(lecture_id) for lecture_id in lecture_ids])
    return course.xpath("/definitions/cards/card[part/@ref={}][{}]".format(part_id, lecture_predicate))


@functools.lru_cache(1000)
def unique_course_time_slots(course):
    """Return all alternative combinations of lessons that a student of a course must attend, with all duplicates removed."""
    return {frozenset({card_data(card) for card in cards_for_course_and_part(course, part_id)
                       if is_card_valid(card)})
            for part_id in part_ids_for_course(course)}


@functools.lru_cache(1000)
def jsonable_time_slots(course):
    """Return the alternative allowed combinations of lessons that a student of a course may attend to satisfy the
    requirements of a course, in a form suitable for dumping in JSON format. """
    keys = ("od", "do", "typ", "vyucujici", "mistnost", "budova")
    time_slots_with_possible_garbage = ([dict(zip(keys, values)) for values in variant if values[0] != 0]
                                        for variant in unique_course_time_slots(course))
    return [time_slot_list for time_slot_list in time_slots_with_possible_garbage if len(time_slot_list) > 0]


@functools.lru_cache(1000)
def translate_subject_code(timetable, subject_code):
    """Attempt a translation from a Bila kniha subject code to the relevant timetable subject code."""
    exceptions = {"01VAM": "VAM/B", "01VAMB": "VAM/B",
                  "01LIP": "LIP/B", "01LIPB": "LIP/B",
                  "17EHJE": "ZEH",
                  "17DEZ": "DEZ", "17PTA": "DEZ",
                  "17JBEZ": "JBEZ/", "17JABE": "JBEZ/", "17ZBJE": "JBEZ/",
                  "17ELZ": "TCJ1", "17TCJ1": "TCJ1",
                  "17PRE": "NRE",
                  "02KOHOM": "KOHO",
                  "16EZ": "EZ", "16EZB": "EZ", "16EZM": "EZ",
                  "16HE": "HE", "16HEB": "HE", "16HEM": "HE",
                  "16INZ": "INZ", "16INZB": "INZ",
                  "16MEIZ": "MEIZ", "16MEZB": "MEIZ",
                  "16MERV": "16PMM",
                  "16PAFZ1": "ZOME", "16PAFZB": "ZOME", "16ZOME": "ZOME", "16ZOMEM": "ZOME",
                  "16RAO": "RAO", "16RAOB": "RAO",
                  "16RDKP": "RDKP", "16RDKB": "RDKP", "16RDKBS": "RDKP",
                  "16RTNM": "RFNM", "16RTNMM": "RFNM", "16RFNM": "RFNM", "16RFNMN": "RFNM",
                  "16RTDG": "RFRD", "16RTDGM": "RFRD", "16RFRD": "RFRD",
                  "16SEM1": "SEM", "16SED1": "SEM",
                  "16UAZ": "UAZ", "16UAZB": "UAZ",
                  "16ZBAF1": "ZBAF1", "16OAF1": "ZBAF1",
                  "16ZJT": "ZJT", "16ZJTB": "ZJT",
                  "16ZPP": "ZPP", "16ZPPB": "ZPP",
                  "16ZIVO": "ZIVO", "16ZIVB": "ZIVO"}
    if subject_code in exceptions:
        return exceptions[subject_code]
    elif subject_code.lstrip(string.digits) in subject_codes(timetable):
        return subject_code.lstrip(string.digits)
    else:
        return None


@functools.lru_cache(maxsize=1000)
def get_timetable_data(timetable, subject_code):
    """Attempt to extract timetable data for a course identified by its code in Bila kniha."""
    possible_match = translate_subject_code(timetable, subject_code)
    return [] if possible_match is None else jsonable_time_slots(get_course(timetable, possible_match))


def guess_semester_code():
    """Guess the current semester code, such as 'B202'."""
    now = datetime.datetime.now()
    return "B{}{}".format(str(now.year % 100), 2 if now.month < 8 else 1)


def guess_timetable_uri():
    """Guess the URI at which an XML timetable is supposed to be published."""
    now = datetime.datetime.now()
    year = now.year % 100 - (1 if now.month < 8 else 0)
    semester = "letni" if now.month < 8 else "zimni"
    return "https://rozvrh.fjfi.cvut.cz/timetable/{}-{}-{}.xml".format(year, year + 1, semester)

def summarize_rozvrhy(rozvrhy, key_fn, filter_fn=lambda card: True):
    """Summarize a specific aspect of the timetable data (extracted by the provided key_fn function) for easier
    searching, after optionally filtering out the irrelevant lesson cards."""
    transformed_cards = ((key_fn(card) for card in card_list if filter_fn(card)) for card_list in rozvrhy)
    return list(set(itertools.chain.from_iterable(transformed_cards)))

def extract_subject_data(subject, timetable):
    """Extract relevant data for a subject found in Bila kniha, potentially with its timetable entries if any are found."""
    subject_code = subject.xpath("string(kod)")
    rozvrhy = get_timetable_data(timetable, subject_code)
    lecture_hours, exercise_hours = lecture_and_exercise_hours(subject.xpath("string(rozsah)"))
    return {
        "predmet_id": int(subject.xpath("string(predmet_id)")),
        "kod": subject_code,
        "nazev": subject.xpath("string(nazev)"),
        "kredity": int(subject.xpath("string(kredity)")),
        "rozsah": subject.xpath("string(rozsah)"),
        "tydne_prednasky": lecture_hours,
        "tydne_cviceni": exercise_hours,
        "rozvrhy": rozvrhy,
        "vsechny_dny": summarize_rozvrhy(rozvrhy, lambda card: int(card["od"]//100)),
        "vsichni_vyucujici": summarize_rozvrhy(rozvrhy, lambda card: card["vyucujici"]),
        "vsichni_prednasejici": summarize_rozvrhy(rozvrhy, lambda card: card["vyucujici"], lambda card: card["typ"]=="P"),
        "vsichni_cvicici": summarize_rozvrhy(rozvrhy, lambda card: card["vyucujici"], lambda card: card["typ"]=="C"),
        "zpuszak": subject.xpath("string(zpuszak)"),
        "anotace": subject.xpath("string(texty/anotace)").strip(),
        "osnova": subject.xpath("string(texty/osnova)").strip(),
        "pozadavky": subject.xpath("string(texty/pozadavky)").strip(),
        "osnova_cv": subject.xpath("string(texty/osnova_cv)").strip(),
        "cile": subject.xpath("string(texty/cile)").strip(),
    }


def extract_study_plan(study_plan, timetable):
    """Extract data for all subjects taught in a given study plan in the current semester."""
    for course in study_plan.xpath("//predmet[sem_idy/sem_idx/sem_id/text()=\"{}\"]".format(guess_semester_code())):
        yield extract_subject_data(course, timetable)


def extract_everything(study_plans, timetable):
    """Given all the study plans and the current timetable, return deduplicated data for all subjects in these plans."""
    duplicated_subjects = itertools.chain.from_iterable(extract_study_plan(plan, timetable) for plan in study_plans)
    return list(more_itertools.unique_everseen(duplicated_subjects, key=lambda subject: subject['predmet_id']))


async def fetch_xml_files(urls):
    async with aiohttp.ClientSession() as session:
        return await asyncio.gather(*(fetch_xml(session, url) for url in urls))


def generate_plans_urls():
    indices = [
        30015446, 30015447, 30015448,
        30015465, 30015466, 30015467, 30015468,
        30015470, 30015471, 30015472, 30015473, 30015474, 30015475,
        30015485, 30015486, 30015487, 30015488, 30015489, 30015490,
        30015185, 30015186, 30015187,
        30015227, 30015228,
        30015245, 30015246, 30015247,
        30015285, 30015286,
        30015305, 30015306, 30015307, 30015325, 30015326, 30015327
    ]
    base = "http://bilakniha.cvut.cz/api/2012/cs/plany/plan{}.xml"
    return (base.format(index) for index in indices)


def parse_study_plans(raw_study_plans):
    return (etree.XML(raw) for raw in raw_study_plans)

async def main():
    time_table = etree.XML((await fetch_xml_files([guess_timetable_uri()]))[0])
    pickle_filename = "study_plans.pickle"
    if not path.exists(pickle_filename):
        print("Fetching study plans")
        start_time = time.time()
        study_plans = await fetch_xml_files(generate_plans_urls())
        print("Fetching took {} seconds".format(time.time() - start_time))
        pickle.dump(study_plans, open(pickle_filename, 'wb'))
    with open("data.json", "w") as f:
        json.dump(extract_everything(parse_study_plans(pickle.load(open(pickle_filename, 'rb'))), time_table), f)


if __name__ == '__main__':
    asyncio.run(main())
