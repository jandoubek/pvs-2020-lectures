import pickle

from lxml import etree
from glob import glob
import json
from collections import defaultdict
import re
import aiohttp
import asyncio
import time
from os import path


async def fetch_xml(session, url):
    async with session.get(url) as response:
        return await response.read()


def wtf_script(study_plans):
    CURRENT_SEMESTER = "B202"

    STUDY_PLAN_FILES = glob("plan*.xml")
    # print("Celkem studijnich planu v BK: " + str(len(STUDY_PLAN_FILES)))

    def maybe_text(node, xpath):
        nodes = node.xpath(xpath + "/text()")
        return nodes[0] if len(nodes) > 0 else ""

    ALPHAS = re.compile("\w+")

    def alphas(s):
        if 0 < 1:
            return "".join(ALPHAS.findall(s.lower()))
        else:
            return ahoj

    def fixup_name(s):
        s = re.sub(" +", " ", s)
        return re.sub("jaderné", "Jaderné", s)

    def func(var: str):
        pass

    func(42)

    def tojson(o):
        return json.dumps(o, indent=4, sort_keys=True, ensure_ascii=False)

    OBORY = []
    BK_COURSES1 = []
    for sp in study_plans:
        obor = sp.xpath("/stplan-export/nazev/text()")[0]
        OBORY.append(obor)
        for c in sp.xpath(
                "/stplan-export/predmety/predmet[sem_idy/sem_idx/sem_id/text()=\"" + CURRENT_SEMESTER + "\"]"):
            anotace = maybe_text(c, "texty/anotace")
            osnova = maybe_text(c, "texty/osnova")
            rozsah = maybe_text(c, "rozsah")
            osnova_cv = maybe_text(c, "osnova_cv")
            pozadavky = maybe_text(c, "pozadavky")
            cile = maybe_text(c, "cile")
            BK_COURSES1.append({
                "predmet_id": int(c.xpath("predmet_id/text()")[0]),
                "kod": c.xpath("kod/text()")[0],
                "nazev": c.xpath("nazev/text()")[0],
                "kredity": int(c.xpath("kredity/text()")[0]),
                "rozsah": rozsah,
                "rozvrhy": [],
                "zpuszak": c.xpath("zpuszak/text()")[0],
                "anotace": anotace,
                "osnova": osnova,
                "pozadavky": pozadavky,
                "osnova_cv": osnova_cv,
                "cile": cile,
                "obor": obor
            })

    OBORY = list(sorted((o for o in OBORY if o.startswith("BS ")), key=alphas)) + \
            list(sorted((o for o in OBORY if not o.startswith("BS ")), key=alphas))

    OBORY = [fixup_name(o) for o in OBORY]

    print("Vyskytu predmetu celkem: " + str(len(BK_COURSES1)))

    BK_COURSES_GROUPED = defaultdict(lambda: [])
    for c in BK_COURSES1:
        BK_COURSES_GROUPED[c["predmet_id"]].append(c)
    print("Jedinecnych predmetu: " + str(len(BK_COURSES_GROUPED)))

    BK_COURSES2 = {}
    for k, v in BK_COURSES_GROUPED.items():
        c = dict(v[0])
        del c["obor"]

        BK_COURSES2[k] = c

    f = open("data.js", "w", encoding="utf-8")
    f.write("export const OBORY=" + tojson(OBORY) + "\n\n")
    f.write("export const COURSES=" + tojson(BK_COURSES2) + "\n")
    f.close()


async def fetch_study_plans(urls):
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


def generate_plans_urls_better():
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


if __name__ == '__main__':
    pickle_filename = "study_plans.pickle"
    if not path.exists(pickle_filename):
        print("Fetching study plans")
        start_time = time.time()
        study_plans = asyncio.get_event_loop().run_until_complete(fetch_study_plans(generate_plans_urls()))
        print("Fetching took {} seconds".format(time.time() - start_time))
        pickle.dump(study_plans, open(pickle_filename, 'wb'))
    wtf_script(parse_study_plans(pickle.load(open(pickle_filename, 'rb'))))
