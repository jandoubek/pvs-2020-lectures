import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {useLocation, withRouter} from "react-router-dom";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FilterListIcon from '@material-ui/icons/FilterList';
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import SearchBar from "./SearchBar";

const useStyles = makeStyles((theme) => ({
    divider: {
        height: 28,
        margin: 4,
    },
    filters: {
        width: "600px",
        marginTop: "15px"
    },
    filtersSummary: {
        color: "#535353"
    },
    filtersIcon: {
        marginRight: "10px"
    }
}));

//explicit is better than implicit
const daysInWeek = [
    "pondělí",
    "úterý",
    "středa",
    "čtvrtek",
    "pátek"
];

const daysToInfo = (days) => {
    if (days.length === 5) return "kterýkoliv den"
    const preposition =  days[0] === 2 || days[0] === 3 ? "ve" : "v";
    days = days.sort().map(index => daysInWeek[index]).join(", ");
    days = days.replace("středa", "středu");
    return preposition +" " + days;
}

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const parseDays = (daysString) => {
    if (!daysString) return [];
    return [...daysString].map(letter => parseInt(letter));
}

const QueryForm = ({history}) => {
    let queryRoute = useQuery();
    const classes = useStyles();
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
    const handleDayChange = (day) => (e) => {
        e.preventDefault();
        if (days.includes(day)) {
            setDays(days.filter((_day => day !== _day)));
        } else {
            setDays([...days, day]);
        }
    }
    return (
        <Box component="form" onSubmit={handleSubmit}>
            <SearchBar value={query} onChange={(value) => {setQuery(value)}}/>
            <Accordion
                className={classes.filters}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="filtry"
                    className={classes.filtersSummary}
                >
                    <FilterListIcon className={classes.filtersIcon}/>
                    <Typography>{
                        days.length > 0 ? "Předměty " + daysToInfo(days) : "Filtry"
                    }</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        {daysInWeek.map((day, index) =>
                            <Chip
                                key={index}
                                label={day}
                                onClick={handleDayChange(index)}
                                variant={days.includes(index) ? 'default' : "outlined"}
                                color={days.includes(index) ? "primary" : 'default'}
                            />
                        )}
                    </div>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default withRouter(QueryForm);