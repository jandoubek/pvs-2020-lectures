import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import SubjectDialog from "./SubjectDialog";
import QuantityIndicator from "./QuantityIndicator"
import {daysInWeek} from "./constants";


const formatDay = (day) => {
    return daysInWeek[day];
}


const useStyles = makeStyles((theme) => ({
    root: {},
}));


/** Assigned to Jan */
const SubjectPreview = ({subject}) => {
    const classes = useStyles()

    // TODO Temporary hacks
    subject.name = "Průmyslový vývoj software";
    subject.day = 0;

    return (
        <ListItem key={subject.code} style={{display: "block"}}>
            <ListItemText primary={<SubjectDialog subject={subject}/>}/>

            <Typography component="div" variant="body2" color="textSecondary">
            <Grid container spacing={0} justify="space-between">
                <Grid container item xs={12} sm={9} spacing={1} justify="space-between">
                    <Grid item xs={10} sm={6}>
                        <ItemFirstLine subject={subject}/>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <ItemTimetable subject={subject} align="right"/>
                    </Grid>

                    <Grid item xs={9} sm={12}>
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
    subject: PropTypes.shape({
        code: PropTypes.string.isRequired,
        lecturer: PropTypes.string.isRequired,
        // day: PropTypes.number,  // TODO Should be number and not english string as it is now (toy data)
        time: PropTypes.string.isRequired,
        credits: PropTypes.number.isRequired,
        len: PropTypes.string.isRequired,  // TODO Number or string? ... "2+2"?

        // TODO Following things are not yet in toy data
        // name: PropTypes.string.isRequired,
        // department: PropTypes.string.isRequired,
        // departmentCode: PropTypes.string.isRequired,
        // examType: PropTypes.string.isRequired,
        // annotation: PropTypes.string.isRequired,
    })
};

export default SubjectPreview;


// TODO Probably should move these definitions somewhere else in the future
const ItemFirstLine = ({subject}) => {
    return (
        // TODO Put real values here (katedra)
        <Typography variant="body2" gutterBottom>
            <Typography component="span" variant="body2" color="textPrimary">
                {"18" + subject.code}
            </Typography>
            {" — " + "KSI" + " — " + subject.lecturer}
        </Typography>
    );
};


const ItemExamType = ({subject}) => {
    return (
        // TODO Put real values here (zkouska)
        <Box textAlign="center">
            {"z zk"}
        </Box>
    );
};


const ItemTimetable = ({subject, align="left"}) => {
    return (
        <Typography variant="body2" align={align} gutterBottom>
            {`${formatDay(subject.day)} ${subject.time}`}
        </Typography>
    );
};


const ItemAnnotation = ({subject}) => {
    return (
        // TODO Put real values here (anotace)
        <Typography variant="body2" align="justify">
            /anotace/ Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis...
        </Typography>
    );
};


const ItemCredits = ({subject}) => {
    return(
        <QuantityIndicator
            // TODO Put real values here (kredity max)
            value={Number(subject.credits)}
            valueMax={12}
            label={`${subject.credits} kr`}
            labelWidth={"7em"}
            tooltip={`${subject.credits} kredity`}
            color="primary"
        />
    );
};


const ItemHours = ({subject}) => {
    return(
        <QuantityIndicator
            // TODO Put real values here (hodiny cvika, hodiny max)
            value={Number(subject.len)}
            valueSecond={2}
            valueMax={12}
            label={`${subject.len}+? h`}
            labelWidth={"7em"}
            tooltip={`${subject.len}h přednášky + ?h cvičení`}
            color="secondary"
        />
    );
};
