import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip"
import Paper from "@material-ui/core/Paper"


const CustomLinearProgress = withStyles((theme) => ({
    root: {
        height: 4,
    },
    dashed: { /* Disable dashed animation for variant="buffer" */
        animation: "",
        display: "none",
    }
}))(LinearProgress);

const QuantityIndicator = ({value, valueSecond=0, maxValue=100, color="primary", label, tooltip, paper}) => {
    return (
        label ?
            <Tooltip title={tooltip}>
            <Paper square elevation={paper ? 1 : 0}>
            <Box display="flex" alignItems="center">
                <Box mr={1} ml={1} width={32}>
                    {/* <Tooltip title={tooltip}>{label}</Tooltip> */}
                    {label}
                </Box>
                <Box width="100%">
                    <CustomLinearProgress
                        variant="buffer"
                        color={color}
                        value={100 * value / maxValue}
                        valueBuffer={100 * (value + valueSecond) / maxValue}
                    />
                </Box>
            </Box>
            </Paper>
            </Tooltip>
        :
            <Tooltip title={tooltip}>
                <CustomLinearProgress
                    variant="buffer"
                    color={color}
                    value={100 * value / maxValue}
                    valueBuffer={100 * (value + valueSecond) / maxValue}
                />
            </Tooltip>
    );
};

QuantityIndicator.propTypes = {

};

export default QuantityIndicator;
