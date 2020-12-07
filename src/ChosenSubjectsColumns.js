
// sloupce bude lepsi vybrat takto hardcoded
// jak budou vypadat sloupce ve vybranych predmetech
export const subjectColumns = [
    //{ field: 'id', headerName: 'ID', width: 70 },
    { field: 'code', headerName: 'Kód', width: 100 },
    { field: 'name', headerName: 'Název předmětu', width: 200 },
    { field: 'lecturer', headerName: 'Vyučující', width: 150 },
    { field: 'len', headerName: 'Délka', type: 'number', width: 100 },
    { field: 'credits', headerName: 'Kredity', type: 'number', width: 100 },
    { field: 'day', headerName: 'Den', type: 'number',  width: 100 },
    { field: 'time', headerName: 'Čas', width: 100 },
    { field: 'room', headerName: 'Místnost', width: 150 }
];
