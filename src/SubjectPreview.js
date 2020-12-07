import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import SubjectDialog from "./SubjectDialog";
import QuantityIndicator from "./QuantityIndicator";
import {daysInWeek, maxcredits, maxlength} from "./constants";


const useStyles = makeStyles((theme) => ({
    root: {
        display: "block"  // This overrides horizontal layout of ListItem's children
    },
}));


/**
 * Displays brief information about the subject organized in a small grid.
 */
const SubjectPreview = ({ subject }) => {
    const classes = useStyles()

    return (
        <ListItem className={classes.root}>
            <ListItemText primary={<SubjectDialog subject={subject}/>}/>
            <Typography component="div" variant="body2" color="textSecondary">
                <Grid container spacing={0} justify="space-between">
                    <Grid container item xs={12} sm={9} spacing={1} alignContent="flex-start">
                        <Grid item xs={12} sm={6}>
                            <ItemFirstLine subject={subject}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ItemTimetable subject={subject} align="right"/>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <ItemAnnotation subject={subject}/>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={3} spacing={1}>
                        <Grid item xs={12}>
                            <ItemExamType subject={subject}/>
                        </Grid>
                        <Grid item xs={12}>
                            <ItemCredits subject={subject} useBar/>
                        </Grid>
                        <Grid item xs={12}>
                            <ItemHours subject={subject} useBar/>
                        </Grid>
                    </Grid>
                </Grid>
            </Typography>
        </ListItem>
    );
};

SubjectPreview.propTypes = {
    /** Data representing 1 subject */
    subject: PropTypes.shape({
        kod: PropTypes.string.isRequired,
        nazev: PropTypes.string.isRequired,
        anotace: PropTypes.string.isRequired,

        kredity: PropTypes.number.isRequired,
        rozsah: PropTypes.string.isRequired,
        zpuszak: PropTypes.string.isRequired,

        // TODO Following things are not yet handled / not in data
        // katedra_kod: PropTypes.string.isRequired,
        // vyucujici: PropTypes.string.isRequired,
        // day: PropTypes.string.isRequired,
        // time: PropTypes.string.isRequired,
    }),
};

export default SubjectPreview;


const ItemFirstLine = ({subject}) => {
    return (
        // TODO Put real values here (katedra)
        // TODO Use values extracted from subject.rozvrhy (vyucujici)
        <Typography variant="body2">
            <Typography component="span" variant="body2" color="textPrimary">
                {subject.kod}
            </Typography>
            {` — KSI — ${subject.vyucujici}`}
        </Typography>
    );
};


const ItemExamType = ({subject}) => {
    return (
        <Box textAlign="center">
            {subject.zpuszak.toLowerCase().replace(",", " ")}
        </Box>
    );
};


const ItemTimetable = ({subject, align="left"}) => {
    return (
        // TODO Use values extracted from subject.rozvrhy (day, time)
        <Typography variant="body2" align={align}>
            {`${daysInWeek[subject.day]} ${subject.time}`}
        </Typography>
    );
};


const ItemAnnotation = ({subject}) => {
    function truncateText (text, maxLen) {
        return text.slice(0, maxLen) + (text.length > maxLen ? "..." : "")
    }
    return (
        <Typography variant="body2" align="justify">
            {truncateText(subject.anotace, 170)}
        </Typography>
    );
};


const ItemCredits = ({subject}) => {
    return(
        <QuantityIndicator
            value={Number(subject.kredity)}
            valueMax={maxcredits}
            label={`${subject.kredity} kr`}
            labelWidth={"7em"}
            tooltip={`${subject.kredity} kredity`}
            color="primary"
        />
    );
};


const ItemHours = ({subject}) => {
    const match = /(?<lenP>\d+)P?\+(?<lenC>\d+)C?/g.exec(subject.rozsah)

    return(
        <QuantityIndicator
            value={Number(match ? match.groups.lenP : 0)}
            valueSecond={Number(match ? match.groups.lenC : 0)}
            valueMax={maxlength}
            label={match ? `${match.groups.lenP}+${match.groups.lenC} h` : subject.rozsah}
            labelWidth={"7em"}
            tooltip={match ?
                `${Number(match.groups.lenP)}h přednášky + ${Number(match.groups.lenC)}h cvičení`
                :
                subject.rozsah
            }
            color="secondary"
        />
    );
};
