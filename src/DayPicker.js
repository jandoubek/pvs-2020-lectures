import React from 'react';
import PropTypes from 'prop-types';
import Chip from "@material-ui/core/Chip";
import {daysInWeek} from "./constants";
import {makeStyles} from "@material-ui/core/styles";
import {Box} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "420px",
        display: "flex",
        justifyContent: "space-between"
    },
    chip: {
        width: "80px"
    }
}));

/** Component for choosing a day by clicking on it */
const DayPicker = ({onChange, value}) => {
    const classes = useStyles();
    const handleDayChange = (day) => (e) => {
        e.preventDefault();
        if (value.includes(day)) {
            onChange(value.filter((_day => day !== _day)));
        } else {
            onChange([...value, day]);
        }
    }

    return (
        <Box className={classes.root}>
            {daysInWeek.map((day, index) =>
                <Chip
                    className={classes.chip}
                    key={index}
                    label={day}
                    onClick={handleDayChange(index)}
                    variant={value.includes(index) ? 'default' : "outlined"}
                    color={value.includes(index) ? "primary" : 'default'}
                />
            )}
        </Box>
    );
};


function foo(a) {  // Noncompliant
  let b = 12;
  if (a) {
    return b;
  }
  return b;
}

DayPicker.propTypes = {
    /** array of integers symbolizing days (monday is 0, friday is 4) */
    value: PropTypes.arrayOf(PropTypes.number),
    /** function taking days (array of integers) as param */
    onChange: PropTypes.func.isRequired
};

export default DayPicker;