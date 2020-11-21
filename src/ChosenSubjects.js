import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {useSubjects} from "./hooks";
import {DataGrid} from "@material-ui/data-grid";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "100px"
    }
}));

const sortModel = [
    {
        field: 'code',
        sort: 'asc',
    },
];

const getSubjectRows = subjectsFromJSON => {
    // priprav predmety z JSONu pro zobrazeni v tabulce
    for (var i = 0; i < subjectsFromJSON.length; i++)
    {
        subjectsFromJSON[i].id = i;
    }
    return subjectsFromJSON;
}

const getSubjectColumns = subjects => {
    // priprav sloupce dynamicky
    var columns = []
    for (var prop in subjects[0])
    {
        if (prop != 'id')
            columns.push(prop);
    }
    // nejak to serad
    columns.sort();
    columns = columns.map(x => {return {field: x.toString()}});
    return columns;
}



/** Assigned to Hynek */
// TODO Vypadá to jako job pro https://material-ui.com/components/tables/
// TODO Tady je example jak dostat data: {subjects[0]["lecturer"]}
const ChosenSubjects = () => {
    const subjects = getSubjectRows(useSubjects());
    const classes = useStyles();
    return (
        <div style={{ height: 550, width: '100%' }}>
            <DataGrid
                sortModel={sortModel}
                columns={getSubjectColumns(subjects)}
                rows= {subjects}
            />
        </div>
    );
};

ChosenSubjects.propTypes = {

};

export default ChosenSubjects;