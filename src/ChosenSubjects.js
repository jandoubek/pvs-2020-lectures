import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {useSubjects} from "./hooks";
import {DataGrid} from "@material-ui/data-grid";
import {subjectColumns} from "./ChosenSubjectsColumns"

// const subjectColumns = [
//     //{ field: 'id', headerName: 'ID', width: 70 },
//     { field: 'code', headerName: 'Kód', width: 100 },
//     //{ field: 'name', headerName: 'Název', width: 150 },
//     { field: 'lecturer', headerName: 'Vyučující', width: 200 },
//     { field: 'length', headerName: 'Dotace', type: 'number', width: 100 },
//     { field: 'day', headerName: 'Den', type: 'number',  width: 100 },
//     //{ field: 'time', headerName: 'Čas', width: 100 },
//     { field: 'room', headerName: 'Místnost', width: 150 }
// ];

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
    // pro zobrazeni v tabulce je nutne, aby kazdy zaznam mel ciselne ID, to pak urcuje default sort
    for (var i = 0; i < subjectsFromJSON.length; i++)
    {
        subjectsFromJSON[i].id = i;
    }
    return subjectsFromJSON;
}

const getSubjectColumns = subjects => {
    // priprav sloupce dynamicky z dat
    var columns = []
    for (var prop in subjects[0])
    {
        if (prop != 'id')
            columns.push(prop);
    }
    // nejak to serad
    columns.sort();
    // takhle to DataGrid vyzaduje - sloupce tabulky jsou samostatne objekty
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
                columns={subjectColumns}
                rows= {subjects}
            />
        </div>
    );
};

ChosenSubjects.propTypes = {

};

export default ChosenSubjects;