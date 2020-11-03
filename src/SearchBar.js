import React from 'react';
import PropTypes from 'prop-types';
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '3px 8px',
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #E9E9E9',
        width: '600px'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    icon: {
        padding: 10,
    },
}));

/**
 * View component displaying a search bar
 */
const SearchBar = ({value, onChange}) => {
    const classes = useStyles();
    const handleChange = (e) => {
        e.preventDefault();
        onChange(e.target.value);
    };
    return (
        <Paper className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder="Všechny předměty"
                inputProps={{'aria-label': 'Vyhledat předměty'}}
                value={value}
                onChange={handleChange}
            />
            <IconButton type="submit" className={classes.icon} aria-label="Vyhledat">
                <SearchIcon/>
            </IconButton>
        </Paper>
    );
};

SearchBar.propTypes = {
    /** value displayed in the search bar */
    value: PropTypes.string.isRequired,
    /** function taking string value as a param triggered when a user changes the input*/
    onChange: PropTypes.func.isRequired
};

export default SearchBar;