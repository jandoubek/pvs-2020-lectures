import React from 'react';
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import QueryForm from "./QueryForm";
import Logo from "./Logo";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: "25px",
        display: "flex",
        gap: "30px",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
        },
        marginBottom: "15px",
    }
}));

const ResultsBar = ({initialValue}) => {
    const classes = useStyles();
    return (
        <Container fixed maxWidth="md">
            <Paper className={classes.paper}>
                <Logo small/>
                <QueryForm initialValue={initialValue}/>
            </Paper>
        </Container>
    );
};

export default ResultsBar;