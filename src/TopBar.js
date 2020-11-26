import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: "15px"
    },
    title: {
        flexGrow: 1,
    }
}));

const TopBar = () => {
    const classes = useStyles();
    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar variant="dense">
                <Typography variant="h6" className={classes.title}>
                    FJFI
                </Typography>
                <Button component={Link} to="/chosen" color="inherit">Vybrané přeměty</Button>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;