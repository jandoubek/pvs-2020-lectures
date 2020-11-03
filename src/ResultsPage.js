import React from 'react';
import ResultsBar from "./ResultsBar";
import {Box} from "@material-ui/core";
import ResultsList from "./ResultsList";
import {useLocation} from "react-router-dom";
import NoResults from "./NoResults";

const useSubjects = () => {
    return [
        {
            name: "Softwarový seminář 1",
            acronym: "SOS1",
            department: "Katedra softwarového inženýrství v ekonomii",
            day: 0
        },
        {
            name: "Pravděpodobnost a aplikovaná statistika",
            acronym: "AST",
            department: "Katedra matematiky",
            day: 4
        },
        {
            name: "Počítačová fyzika 1",
            acronym: "PF1",
            department: "Katedra fyzikální elektroniky",
            day: 0
        }
    ];
};

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

const ResultsPage = () => {
    let queryRoute = useQuery();
    const includes = queryRoute.get("includes");
    const days = parseDays(queryRoute.get("days"));
    let subjects = useSubjects();
    subjects = includes ? subjects.filter(subject => subjectMatches(subject, includes)) : subjects;
    subjects = days.length > 0 ? subjects.filter(subject => days.includes(subject.day)) : subjects;
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

export default ResultsPage;