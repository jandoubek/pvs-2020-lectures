import React from 'react';
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

const CenterBox = ({children}) => {
    return (
        <Container fixed maxWidth="sm">
            <Box marginTop="30vh">
                {children}
            </Box>
        </Container>
    );
};

export default CenterBox;