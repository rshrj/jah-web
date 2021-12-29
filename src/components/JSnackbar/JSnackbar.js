import React from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useDispatch } from 'react-redux';

import { clearToast } from '../../redux/slices/errors/errorsSlice';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const JSnackbar = ({ toastId, toast, autoHideDuration = 6000 }) => {
  const dispatch = useDispatch();

  const handleClose = (toastId) => (event, reason) => {
    dispatch(clearToast(toastId));
  };

  return (
    <Snackbar
      open={toastId !== undefined}
      autoHideDuration={autoHideDuration}
      onClose={handleClose(toastId)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <Alert
        onClose={handleClose(toastId)}
        severity={toast.type}
        sx={{ width: '100%' }}>
        {toast.message}
      </Alert>
    </Snackbar>
  );
};

export default JSnackbar;
