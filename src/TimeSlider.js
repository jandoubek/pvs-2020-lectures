import React from 'react';
import Slider from '@material-ui/core/Slider';
import {timeMarks} from "./constants";
import PropTypes from 'prop-types';



const TimeSlider = ({value, onChange, defaultvalues}) => {
    const handleChange = (event, val) => {
        onChange(val);
    };

    return (
        <div>
            <Slider
                value={value}
                step={null}
                valueLabelDisplay="off"
                marks={timeMarks}
                min={defaultvalues[0]}
                max={defaultvalues[1]}
                onChange={handleChange}
            />
        </div>
    );
};

TimeSlider.propTypes = {
    value: PropTypes.arrayOf(PropTypes.number),
    onChange: PropTypes.func.isRequired,
    defaultvalues: PropTypes.arrayOf(PropTypes.number)
};
export default TimeSlider;