import React from 'react';
import ResultsBar from "./ResultsBar";
import {Box} from "@material-ui/core";
import ResultsList from "./ResultsList";
import {useLocation} from "react-router-dom";
import NoResults from "./NoResults";
import {parseCredits, parseLength} from "./utility.js"
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

const ResultsPage = ({subjects}) => {
    let queryRoute = useQuery();
    const includes = queryRoute.get("includes");
    const days = parseDays(queryRoute.get("days"));
    const credits = parseCredits(queryRoute.get("credits"));
    const totallength = parseLength(queryRoute.get("totallength"));

    subjects = includes ? subjects.filter(subject => subjectMatches(subject, includes)) : subjects;

    // TODO Needs manual fixing
    // subjects = days.length > 0 ? subjects.filter(subject => days.includes(subject.day)) : subjects;
    subjects = subjects.filter(subject => 0 <= days.length);  // Avoiding warnings, delete this

    subjects = subjects.filter(subject => (subject.kredity >= credits[0] && subject.kredity <= credits[1]));

    // TODO Needs manual fixing
    // subjects = subjects.filter(subject => (subject.total_len >= totallength[0] && subject.total_len <= totallength[1]));
    subjects = subjects.filter(subject => 0 <= totallength.length);  // Avoiding warnings, delete this

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