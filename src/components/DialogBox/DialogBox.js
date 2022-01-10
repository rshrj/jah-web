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
  objectLabel = ''
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
          This is an irreversible action. Are you sure you want to delete
          {objectLabel !== '' ? objectLabel : ''}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={handleDecline}>
          Cancel
        </Button>
        <Button color='error' onClick={handleAccept} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
