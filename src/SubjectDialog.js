import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from "@material-ui/core/Link";

export default function SubjectDialog({subject}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (e) => {
        e.preventDefault();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        subject ? <React.Fragment>
            <Link href="#" onClick={handleClickOpen}>
                {subject.name}
            </Link>
            <Dialog
                fullWidth
                maxWidth="md"
                open={open}
                onClose={handleClose}
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
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment> : <React.Fragment/>
    );
}