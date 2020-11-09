import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "green",
    }
}));

/** Assigned to Dominik */
const CreditsSlider = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            Zde bude slider s možností vybrat počet kreditů
        </div>
    );
};

CreditsSlider.propTypes = {

};

export default CreditsSlider;