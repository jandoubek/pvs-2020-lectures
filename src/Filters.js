import React from 'react';
import PropTypes from 'prop-types';
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FilterListIcon from "@material-ui/icons/FilterList";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Accordion from "@material-ui/core/Accordion";
import {makeStyles} from "@material-ui/core/styles";

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

/** Styled accordion that is a parent to filters */
const Filters = ({info, children}) => {
    const classes = useStyles();
    return (
        <Accordion
            className={classes.filters}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="filtry"
                className={classes.filtersSummary}
            >
                <FilterListIcon className={classes.filtersIcon}/>
                <Typography>{info}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    );
};

Filters.propTypes = {
    /** Info will be displayed in the accordion header */
    info: PropTypes.string
};

export default Filters;