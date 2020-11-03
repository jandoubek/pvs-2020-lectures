import React from 'react';
import Box from "@material-ui/core/Box";

const CenterBox = ({children}) => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            width="100%"
            marginTop="250px"
        >
            <Box>
                {children}
            </Box>
        </Box>
    );
};

export default CenterBox;