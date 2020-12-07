import React from 'react';
import Slider from '@material-ui/core/Slider';
import {timeMarks} from "./constants";



const TimeSlider = ({value, onChange, defaultvalues}) => {
    const handleChange = (event, value) => {
        onChange(value);
        console.log(value);
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
//TODO add proptypes
export default TimeSlider;