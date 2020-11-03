import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import SubjectDialog from "./SubjectDialog";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

const formatDay = (day) => {
    switch(day) {
        case 0:
            return "pondělí";
        case 1:
            return "úterý";
        case 2:
            return "středa";
        case 3:
            return "čtvrtek";
        case 4:
            return "pátek";
        default:
            throw new Error("Unknown day");
    }
}

const ResultsList = ({subjects}) => {
    const classes = useStyles();
    return (
        <List className={classes.root}>
            {subjects.map(subject =>
                <ListItem key={subject.acronym}>
                    <ListItemText
                        component="div"
                        primary={<SubjectDialog subject={subject}/>}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    {subject.acronym}
                                </Typography>
                                {" — " + subject.department}
                                <br />
                                <Typography
                                    component="span"
                                    variant="body2"
                                >
                                    {"Rozvrhováno: " + formatDay(subject.day)}
                                </Typography>
                            </React.Fragment>
                        }/>
                </ListItem>
            )}
            <SubjectDialog/>
        </List>
    );
};

export default ResultsList;