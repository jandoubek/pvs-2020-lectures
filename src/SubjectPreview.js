import React from 'react';
import ListItemText from "@material-ui/core/ListItemText";
import SubjectDialog from "./SubjectDialog";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import {daysInWeek} from "./constants";

const formatDay = (day) => {
    return daysInWeek[day];
}

/** Assigned to Jan */
// TODO ListItem does not have to be used, you may delete anything/rewrite it however you want
// TODO note that ListItem is expected to be child of List, which it currently is in ResultsList.js
const SubjectPreview = ({subject}) => {
    return (
        <ListItem key={subject.code}>
            <ListItemText
                component="div"
                primary={<SubjectDialog subject={subject}/>}
                secondary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                        >
                            {subject.code}
                        </Typography>
                        {" — " + subject.lecturer}
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
    );
};

export default SubjectPreview;