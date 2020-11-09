import React from 'react';
import PropTypes from 'prop-types';
import Chip from "@material-ui/core/Chip";
import {daysInWeek} from "./constants";

/** Component for choosing a day by clicking on it */
const DayPicker = ({onChange, value}) => {
    const handleDayChange = (day) => (e) => {
        e.preventDefault();
        if (value.includes(day)) {
            onChange(value.filter((_day => day !== _day)));
        } else {
            onChange([...value, day]);
        }
    }

    return (
        <div>
            {daysInWeek.map((day, index) =>
                <Chip
                    key={index}
                    label={day}
                    onClick={handleDayChange(index)}
                    variant={value.includes(index) ? 'default' : "outlined"}
                    color={value.includes(index) ? "primary" : 'default'}
                />
            )}
        </div>
    );
};

DayPicker.propTypes = {
    /** array of integers symbolizing days (monday is 0, friday is 4) */
    value: PropTypes.arrayOf(PropTypes.number),
    /** function taking days (array of integers) as param */
    onChange: PropTypes.func.isRequired
};

export default DayPicker;