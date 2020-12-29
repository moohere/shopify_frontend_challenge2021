import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Taken from Material UI, modified as needed.
export default function HelperButton() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
            No results?
        </Button>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Helpful Note"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                    The API requires at least 3 characters to return results.<br/><br/>
                    Sometimes, it may also require you to complete words for certain searches.<br/>
                    For example, 'guar' won't return results until you completed the word 'guard'.<br/><br/>
                    If neither of the above helped, then we likely reached the daily call limits of 1000 searches for this API.
                    Please try again tomorrow. :)
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
                Ok
            </Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}
