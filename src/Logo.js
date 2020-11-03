import React from 'react';
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import {withRouter} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    link: {
        '&:hover': {
            textDecoration: "none"
        }
    }
}));

const Logo = ({small, history}) => {
    const classes = useStyles();
    return (
        <Typography
            variant={small ? "h5" : "h3"}
            align="center"
            color="textPrimary"
            gutterBottom={!small}
        >
            <Link href="#" onClick={(e) => {e.preventDefault(); history.push("/");}} className={classes.link}>
                PŘEDMĚTY
            </Link>
        </Typography>
    );
};

export default withRouter(Logo);