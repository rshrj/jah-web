import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DialogBox({
  open,
  handleDecline,
  handleAccept,
  title = 'Delete',
}) {
  return (
    <Dialog
      open={open}
      onClose={handleDecline}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'>
      <DialogTitle id='alert-dialog-title' align='center'>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          It is an irreversible action. Are you sure ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDecline}>No</Button>
        <Button onClick={handleAccept} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
