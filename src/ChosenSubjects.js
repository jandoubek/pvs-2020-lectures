import React, {useCallback} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {useSubjects} from "./hooks";
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import { Paper } from '@material-ui/core';
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

const addSubjectIDs = subjectsFromJSON => {
    return subjectsFromJSON.map((subject, index) => { return {...subject, id: index} })
}

const updateTotalRow = subjects => {
    let totalCredits = subjects.reduce((total, nextsubject) => {return total + Number(nextsubject.credits)}, 0)
    let totalLength = subjects.reduce((total, nextsubject) => {return total + Number(nextsubject.len)}, 0)
    return [{id:0, credits:totalCredits, len:totalLength}]
}

/** Assigned to Hynek */
// TODO Vypadá to jako job pro https://material-ui.com/components/tables/
// TODO Tady je example jak dostat data: {subjects[0]["lecturer"]}
const ChosenSubjects = () => {
    // viz https://reactjs.org/docs/hooks-state.html
    const [selection, setSelection] = React.useState([]);
    const [subjectRows, setSubjectRows] = React.useState(addSubjectIDs(useSubjects()));
    const [totalRow, setTotalRow] = React.useState(updateTotalRow(subjectRows));

    const classes = useStyles();
    return (
        <Paper>
        <Paper style={{ height: 550, width: '100%' }}>
            <DataGrid
                sortModel={sortModel}
                columns={subjectColumns}
                rows={subjectRows}
                checkboxSelection={true}
                onSelectionChange={(newSelection) => {
                    setSelection(newSelection.rowIds);
                }}
                hideFooter={true}
            />
        </Paper>
        <Button
            variant="outlined"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={() => {
                setSubjectRows(
                    subjectRows.filter(row => !selection.includes(row.id.toString())));
                setSelection([]);
                setTotalRow(updateTotalRow(subjectRows));
                }
            }
        >
            Odstranit vybrané
        </Button>
        <div style={{ height: 110, width: '100%' }}>
            <DataGrid
                columns={subjectColumns}
                rows= {totalRow}
                hideFooter={true}
            />
        </div>
        </Paper>
    );
};

export default ChosenSubjects;