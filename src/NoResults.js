import React from 'react';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: "50px",
        color: "#4c4c4c"
    },
    bold: {
        fontWeight: "bold"
    }
}));

const NoResults = ({query}) => {
    const classes = useStyles();
    return (
        <Typography variant="body1" className={classes.root}>
            Nebyly nalezeny žádné přeměty odpovídající: <span className={classes.bold}>{query}</span>
        </Typography>
    );
};

export default NoResults;