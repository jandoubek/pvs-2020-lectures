import React from 'react';
import Slider from '@material-ui/core/Slider';
import {timeMarks} from "./constants";



const TimeSlider = () => {
    const minvalue = timeMarks[0].value;
    const maxvalue = timeMarks[timeMarks.length-1].value;
    const [value, onChange] = React.useState([minvalue, maxvalue])

    const handleChange = (event, value) => {
        onChange(value);
        console.log(value);
    };
    return (
        <div>
            <Slider
                value={value}
                aria-labelledby="discrete-slider-restrict"
                step={null}
                valueLabelDisplay="off"
                marks={timeMarks}
                min={minvalue}
                max={maxvalue}
                onChange={handleChange}
            />
        </div>
    );
};
//TODO add proptypes
export default TimeSlider;