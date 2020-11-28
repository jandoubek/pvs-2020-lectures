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
    subject.name = "Průmyslový vývoj software"

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

};

export default SubjectPreview;


// TODO Probably should move these definitions somewhere else in the future
const ItemFirstLine = ({subject}) => {
    return (
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
        <Box ml={1}>
            <Typography variant="body2" color="textSecondary" align="center" component="span">{"z zk"}</Typography>
        </Box>
    );
};


const ItemTimetable = ({subject, align="left"}) => {
    return (
        <Typography variant="body2" align={align} gutterBottom>
            {"Rozvrhováno: "}{formatDay(subject.day)}
            {subject.day === 4 ? ", úterý" : null}
            {subject.day === 1 ? ", pátek" : null}
        </Typography>
    );
};


const ItemAnnotation = ({subject}) => {
    return (
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
            value={3}
            maxValue={12}
            tooltip={"3 kredity"}
            label={
                <Typography variant="body2" color="textSecondary" align="right" component="span">{"kr"}</Typography>
            }
        />
    );
};


const ItemHours = ({subject}) => {
    return(
        <QuantityIndicator
            value={Number(subject.length)}
            valueSecond={2}
            maxValue={12}
            color="secondary"
            tooltip={"2h přednášky + 2h cvičení"}
            label={
                <Typography variant="body2" color="textSecondary" align="right" component="span">{"h"}</Typography>
            }
        />
    );
};
