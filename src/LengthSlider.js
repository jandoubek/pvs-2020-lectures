import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles((theme) => ({}));

const LengthSlider = ({onChange, value, maxvalue}) => {
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        onChange(newValue);
    };

    return (
        <div className={classes.root}>
            <Typography id="length-slider" variant="body2">
                Délka:
            </Typography>
            <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="on"
                aria-labelledby = "length-slider"
                marks={true}
                step={1}
                min={1}
                max={maxvalue}
            />
        </div>
    );
};

LengthSlider.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.arrayOf(PropTypes.number),
    maxValue: PropTypes.number
};

export default LengthSlider;