import React from 'react';
import List from "@material-ui/core/List";
import SubjectPreview from "./SubjectPreview";

/** Assigned to Jan */
//TODO do not really style this unless 100% necessary
const ResultsList = ({subjects}) => {
    return (
        <List>
            {subjects.map(subject => <SubjectPreview subject={subject}/>)}
        </List>
    );
};

export default ResultsList;