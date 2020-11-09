import React, {useState} from 'react';
import {withRouter} from "react-router-dom";
import Box from "@material-ui/core/Box";
import SearchBar from "./SearchBar";
import DayPicker from "./DayPicker";
import {useQuery} from "./hooks";
import Filters from "./Filters";
import {daysInWeek} from "./constants";

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
        return history.push('/search?' + params);
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <SearchBar value={query} onChange={setQuery}/>
            <Filters info={days.length > 0 ? "Předměty " + daysToInfo(days) : "Filtry"}>
                <DayPicker value={days} onChange={setDays}/>
            </Filters>
        </Box>
    );
};

export default withRouter(QueryForm);