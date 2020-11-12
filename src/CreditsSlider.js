import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({}));

/** Assigned to Dominik */
const CreditsSlider = ({setValue, value, maxvalue}) => {
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Typography id="credits-slider" variant="body2">
                Počet kreditů:
            </Typography>
            <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="on"
                aria-labelledby="credits-slider"
                marks={true}
                step={1}
                min={1}
                max={maxvalue}
            />
        </div>
    );
};

CreditsSlider.propTypes = {
    setValue: PropTypes.func.isRequired,
    value: PropTypes.arrayOf(PropTypes.number),
    maxValue: PropTypes.number
};

export default CreditsSlider;