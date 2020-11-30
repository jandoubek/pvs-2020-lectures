import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";


const CustomLinearProgress = withStyles((theme) => ({
    root: {
        height: 4,
    },
    dashed: {  // Disable dashed animation for variant="buffer"
        animation: "",
        display: "none",
    }
}))(LinearProgress);


/**
 * Displays a horizontal bar indicating a numerical value (optionally 2 values).
 */
const QuantityIndicator = ({value, valueSecond=0, valueMax, label,
                            labelWidth, tooltip, color="primary"}) => {
    return (
        <Tooltip title={tooltip}>
        <Box display="flex" alignItems="center">
            <Box width={labelWidth} mr={1} textAlign="right">
                {label}
            </Box>
            <Box width="100%">
                <CustomLinearProgress
                    variant="buffer"
                    color={color}
                    value={100 * value / valueMax}
                    valueBuffer={100 * (value + valueSecond) / valueMax}
                />
            </Box>
        </Box>
        </Tooltip>
    );
};

QuantityIndicator.propTypes = {
    /** Main value. */
    value: PropTypes.number.isRequired,
    /** Optional secondary value, uses a lighter shade of the color. */
    valueSecond: PropTypes.number,
    /** Maximal value, determines the width of the component. */
    valueMax: PropTypes.number.isRequired,
    /** Text label, placed on the left side. */
    label: PropTypes.string.isRequired,
    /** Estimated width of the text label. */
    labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    /** Text for the tooltip. */
    tooltip: PropTypes.string.isRequired,
    /** Color of the bar. */
    color: PropTypes.oneOf(["primary", "secondary"]),
};

export default QuantityIndicator;
