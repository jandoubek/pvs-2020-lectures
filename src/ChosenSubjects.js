import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "100px"
    }
}));

/** Assigned to Hynek */
// TODO Vypadá to jako job pro https://material-ui.com/components/tables/
// TODO Tady je example jak dostat data: {subjects[0]["lecturer"]}
export const ChosenSubjects = ({subjects}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            Zde bude vyvíjen seznam vybraných předmětů, kam se umístí až bude potřeba ještě rozmyslíme.
            Rozhodně to nebude takto přes one-way button "Vybrané předměty".
            První předmět vyučuje: {subjects[0]["lecturer"]}
        </div>
    );
};

export default connect(({subjects}) => ({
    subjects
}))(ChosenSubjects);