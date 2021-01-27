import React from 'react';
import ResultsBar from "./ResultsBar";
import {Box} from "@material-ui/core";
import ResultsList from "./ResultsList";
import {useLocation} from "react-router-dom";
import NoResults from "./NoResults";
import {parseCredits, parseLength, parseTime} from "./utility.js"
import { connect } from "react-redux";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const subjectMatches = (subject, query) => {
    const subjectRepresentation = JSON.stringify(subject).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const queryRepresentation = query.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    return subjectRepresentation.includes(queryRepresentation);
}

const parseDays = (daysString) => {
    if (!daysString) return [];
    return [...daysString].map(letter => parseInt(letter));
}

const timeFilter = (subjects, time) => {
    const getTimeFromTimedate = (time) => {
        let timeString = String(time);
        return parseInt(timeString.slice(1,3));
    }
    const isInCorrectTime = (subject, time) => {
        let alloptions = subject.rozvrhy;
        let correctstart = alloptions.map(option => option.map(timepiece => getTimeFromTimedate(timepiece.od) >= time[0]));
        let correctend = alloptions.map(option => option.map(timepiece => getTimeFromTimedate(timepiece.do) <= time[1]))
        return (correctstart.map(arr=>arr.includes(true)).includes(true)) && (correctend.map(arr=>arr.includes(true)).includes(true))
    }
    return subjects.filter(subject => isInCorrectTime(subject,time))
};

const dayFilter = (subjects, days) => {
    const getDayFromTimedate = (time) => {
        let timeString = String(time);
        return parseInt(timeString.charAt(0))-1;//edit so that monday is indexed from one
    }

    const isInCorrectDay = (subject, wanteddays) => {
        let timetable = subject.rozvrhy;
        timetable = timetable.map(entry => entry[0]);
        let subjectdays = timetable.map(timepiece => getDayFromTimedate(timepiece.od));
        let correctday = subjectdays.map(entry => wanteddays.includes(entry));
        return correctday.includes(true);
    }

    return days.length > 0 ? subjects.filter(subject => isInCorrectDay(subject, days)) : subjects;
}

const ResultsPage = ({subjects}) => {
    let queryRoute = useQuery();
    const includes = queryRoute.get("includes");
    const days = parseDays(queryRoute.get("days"));
    const credits = parseCredits(queryRoute.get("credits"));
    const time = parseTime(queryRoute.get("time"));
    const totallength = parseLength(queryRoute.get("totallength"));

    subjects = includes ? subjects.filter(subject => subjectMatches(subject, includes)) : subjects;

    //TODO: NEEDS FIXING, ACTUALLY ONLY FIRST ENTRY IN POSSIBLE "ZAPIS PREDMETU" IS CONSIDERED
    //subjects = dayFilter(subjects, days);


    subjects = subjects.filter(subject => (subject.kredity >= credits[0] && subject.kredity <= credits[1]));

    // TODO Needs manual fixing
    // subjects = subjects.filter(subject => (subject.total_len >= totallength[0] && subject.total_len <= totallength[1]));
    subjects = subjects.filter(subject => 0 <= totallength.length);  // Avoiding warnings, delete this

    subjects = timeFilter(subjects, time);

    // TODO Temporary hack - only show first 20 results instead of all (500+)
    subjects = subjects.slice(0, 20);

    return (
        <React.Fragment>
            <ResultsBar />
            <Box marginLeft="175px" width="620px">
                {subjects.length > 0 ?
                    <ResultsList subjects={subjects}/>
                    :
                    <NoResults query={includes}/>
                }
            </Box>
        </React.Fragment>
    );
};

export default connect(({subjects}) => ({
    subjects
}))(ResultsPage);
