
import React from 'react';
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


const updateTotalRow = subjects => {
    // prepocitej soucty v poslednim radku
    let totalCredits = 0;
    let totalLength = 0;
    for (let i = 0; i < subjects.length; i++)
    {
        totalCredits += subjects[i].credits;
        totalLength += Number(subjects[i]["length"]);
    }

    return [{id:0, credits:totalCredits, length:totalLength}]
}

/** Assigned to Hynek */
// TODO Vypadá to jako job pro https://material-ui.com/components/tables/
// TODO Tady je example jak dostat data: {subjects[0]["lecturer"]}
const ChosenSubjects = () => {
    // viz https://reactjs.org/docs/hooks-state.html
    const [selection, setSelection] = React.useState([]);
    const [subjectRows, setSubjectRows] = React.useState(getSubjectRows(useSubjects()));
    const [totalRow, setTotalRow] = React.useState(updateTotalRow(subjectRows));

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
                    setSelection(newSelection.rowIds);
                }}
                hideFooter={true}
            />
        </div>
        <div>vybrané řádky: {selection.map(rowId => ','+rowId)}</div>
        <Button
            variant="outlined"
            color="secondary"
            startIcon={<DeleteIcon />}
            // vymaz vybrane radky (zustavaji ty, ktere nebyly vybrany)
            onClick={() => {
                setSubjectRows(
                    subjectRows.filter(row => !selection.includes(row.id.toString())));
                setTotalRow(updateTotalRow(subjectRows));
                setSelection([]);
            }
            }>
            Odstranit vybrané
        </Button>
        <div style={{ height: 110, width: '100%' }}>
            <DataGrid
                columns={subjectColumns}
                rows= {totalRow}
                //rowCount={1}
                hideFooter={true}
                //disableSelectionOnClick={true}
            />
        </div>
        </div>
    );
};

export default ChosenSubjects;