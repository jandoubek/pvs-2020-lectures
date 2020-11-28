import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip"


const CustomLinearProgress = withStyles((theme) => ({
    root: {
        height: 4,
    },
    dashed: { /* Disable dashed animation for variant="buffer" */
        animation: "",
        display: "none",
    }
}))(LinearProgress);

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
    value: PropTypes.number.isRequired,
    valueSecond: PropTypes.number,
    valueMax: PropTypes.number.isRequired,

    label: PropTypes.string.isRequired,
    labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    tooltip: PropTypes.string.isRequired,
    color: PropTypes.string,
};

export default QuantityIndicator;
