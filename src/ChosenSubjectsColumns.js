
// sloupce bude lepsi vybrat takto hardcoded
// jak budou vypadat sloupce ve vybranych predmetech
import {Button} from "@material-ui/core";
import React from "react";

export const subjectColumns = [
    //{ field: 'id', headerName: 'ID', width: 70 },
    { field: 'code', headerName: 'Kód', width: 100 },
    { field: 'name', headerName: 'Název předmětu', width: 200 },
    { field: 'lecturer', headerName: 'Vyučující', width: 150 },
    { field: 'len', headerName: 'Délka', type: 'number', width: 100 },
    { field: 'credits', headerName: 'Kredity', type: 'number', width: 100 },
    { field: 'day', headerName: 'Den', type: 'number',  width: 100 },
    { field: 'time', headerName: 'Čas', width: 100 },
    { field: 'room', headerName: 'Místnost', width: 150 },
    { field: 'button', headerName: ' ', width: 250, type: 'buttonCol', render: ({row}) => {return(<Button variant="outlined"
                                                                                                            color="secondary">row</Button>)}}
];
