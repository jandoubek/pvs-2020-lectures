import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {useSubjects} from "./hooks";
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import {DataGrid} from "@material-ui/data-grid";
import {subjectColumns} from "./ChosenSubjectsColumns"

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "100px"
    }
}));

// vychozi razeni
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
    // viz https://reactjs.org/docs/hooks-state.html
    const [selectedSubjects, setSelectedSubjects] = React.useState([]);
    const [subjectRows, setSubjectRows] = React.useState(getSubjectRows(useSubjects()));

    //var subjects = getSubjectRows(useSubjects());
    const classes = useStyles();
    return (
        <div>
        <div style={{ height: 550, width: '100%' }}>
            <DataGrid
                sortModel={sortModel}
                columns={subjectColumns}
                rows= {subjectRows}
                checkboxSelection={true}
                // zmen vyber
                onSelectionChange={(newSelection) => {
                    setSelectedSubjects(newSelection.rowIds);
                }}
                hideFooter={true}
            />
        </div>
        <div>vybrané řádky: {selectedSubjects.map(rowId => ','+rowId)}</div>
        <Button
            variant="outlined"
            color="secondary"
            startIcon={<DeleteIcon />}
            // vymaz vybrane radky (zustavaji ty, ktere nebyly vybrany)
            onClick={() => setSubjectRows(
                subjectRows.filter(row => !selectedSubjects.includes(row.id.toString())))
            }>
            Odstranit vybrané
        </Button>
        </div>
    );
};

ChosenSubjects.propTypes = {

};

export default ChosenSubjects;