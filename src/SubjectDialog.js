import React from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from "@material-ui/core/Typography";


// const lorem = "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

/**
 * Displays more information about a single subject, dialog window.
 */
const SubjectDialog = ({ subject, onClose }) => {
    // TODO Temporary hacks
    subject.katedra = "Katedra bludiček a permoníků";
    subject.vyucujici = "Herbert";

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            fullScreen={useMediaQuery(useTheme().breakpoints.down("sm"))}
            open={true}
            onClose={onClose}
            aria-labelledby="subject-dialog-title"
        >
            <DialogTitle id="subject-dialog-title">
                {`${subject.nazev}`}<br/>
                <Typography>{`${subject.kod} — ${subject.katedra} — ${subject.vyucujici}`}</Typography>
            </DialogTitle>
            <DialogContent dividers>
                <LabeledTextContent label="Anotace:">{subject.anotace}</LabeledTextContent>
                <LabeledTextContent label="Osnova:">{subject.osnova}</LabeledTextContent>
                <LabeledTextContent label="Osnova cvičení:">{subject.osnova_cv}</LabeledTextContent>
                <LabeledTextContent label="Požadavky:">{subject.pozadavky}</LabeledTextContent>
                <LabeledTextContent label="Cíle:">{subject.cile}</LabeledTextContent>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Zavřít
                </Button>
            </DialogActions>
        </Dialog>
    );
};

SubjectDialog.propTypes = {
    /** Data representing 1 subject */
    subject: PropTypes.shape({
        kod: PropTypes.string,
        nazev: PropTypes.string,

        anotace: PropTypes.string,
        osnova: PropTypes.string,
        osnova_cv: PropTypes.string,
        pozadavky: PropTypes.string,
        cile: PropTypes.string,

        // TODO Following things are not yet handled / not in data
        // katedra: PropTypes.string,
        // vyucujici: PropTypes.string,
    }).isRequired,

    /** Event callback - user wants to close the dialog */
    onClose: PropTypes.func.isRequired
};

export default SubjectDialog;


const LabeledTextContent = ({ label, children }) => {
    return (
        <DialogContentText align="justify">
            <Typography color="textPrimary" component="span">{label}</Typography>
            {children.replace(/\n[\w\s]/, "").split("\n").map(s => <React.Fragment><br/>{s}</React.Fragment>)}
        </DialogContentText>
    );
};
