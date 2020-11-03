import React from 'react';
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import SearchBar from "./QueryForm";
import Logo from "./Logo";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        padding: "25px",
        display: "flex",
        gap: "30px",
        marginBottom: "15px"
    }
}));

const ResultsBar = ({initialValue}) => {
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <Logo small/>
            <SearchBar initialValue={initialValue}/>
        </Paper>
    );
};

export default ResultsBar;