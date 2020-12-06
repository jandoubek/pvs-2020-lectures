import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


/**
 * Displays more information about a single subject, dialog window.
 */
export default function SubjectDialog({ subject, onClose }) {
    return (
        subject && <Dialog
            fullWidth
            maxWidth="md"
            open={true}
            onClose={onClose}
            aria-labelledby={subject.name}
        >
            <DialogTitle id="subject-dialog-title">{subject.name}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {subject.acronym + " - " + subject.department}
                </DialogContentText>
                <DialogContentText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}