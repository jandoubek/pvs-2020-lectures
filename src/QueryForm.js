import React, {useState} from 'react';
import {withRouter} from "react-router-dom";
import Box from "@material-ui/core/Box";
import SearchBar from "./SearchBar";
import DayPicker from "./DayPicker";
import {useQuery} from "./hooks";
import Filters from "./Filters";
import {daysInWeek, maxcredits, maxlength, timeMarks} from "./constants";
import CreditsSlider from "./CreditsSlider";
import {parseCredits, parseLength, parseTime} from "./utility.js"
import LengthSlider from "./LengthSlider";
import TimeSlider from "./TimeSlider";


const daysToInfo = (days) => {
    if (days.length === 5) return "kterýkoliv den"
    const preposition =  days[0] === 2 || days[0] === 3 ? "ve" : "v";
    days = days.sort().map(index => daysInWeek[index]).join(", ");
    days = days.replace("středa", "středu");
    return preposition +" " + days;
}

const parseDays = (daysString) => {
    if (!daysString) return [];
    return [...daysString].map(letter => parseInt(letter));
}



const QueryForm = ({history}) => {
    let queryRoute = useQuery();
    const [query, setQuery] = useState(queryRoute.get("includes") ? queryRoute.get("includes") : "");
    const [days, setDays] = useState(parseDays(queryRoute.get("days")));


    const [credits, setCredits] = useState(parseCredits(queryRoute.get("credits")));


    const [totallength, setTotalLength] = useState(parseLength(queryRoute.get("totallength")));

    const [time, setTime] = useState(parseTime(queryRoute.get("time")));
    const defaulttime = [timeMarks[0].value, timeMarks[timeMarks.length - 1].value];

    const handleSubmit = (e) => {
        e.preventDefault();
        let params = '';
        if (query) {
            params += '&includes=' + query;
        }
        if (days.length > 0){
            params += '&days=' + days.reduce((accumulator, index) => accumulator + String(index), "");
        }
        if (params.charAt(0) === '&') params = params.substr(1);
        params += '&credits=' + credits[0] + '-' +  credits[1];
        params += '&time=' + time[0] + '-' + time[1];
        params += '&totallength=' + totallength[0] + '-' + totallength[1];
        return history.push('/search?' + params);
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <SearchBar value={query} onChange={setQuery}/>
            <Filters info={days.length > 0 ? "Předměty " + daysToInfo(days) : "Filtry"}>
                <DayPicker value={days} onChange={setDays}/>
                <TimeSlider onChange={setTime} value={time} defaultvalues={defaulttime}/>
                <CreditsSlider onChange={setCredits} value={credits} maxvalue={maxcredits}/>
                <LengthSlider value={totallength} onChange={setTotalLength} maxvalue={maxlength}/>
            </Filters>
        </Box>
    );
};

export default withRouter(QueryForm);
