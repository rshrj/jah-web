import { useCallback, useEffect, useState } from 'react';
import { Typography, Modal } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { FaTrash, FaUser, FaEye } from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCallBackRequests,
  updateState,
} from '../../redux/slices/callback/callbackSlice';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '600px',
  bgcolor: 'background.paper',
  p: 4,
  transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  borderRadius: '4px',
  boxShadow:
    'rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px',
  backgroundImage:
    'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
  overflow: 'hidden',
};


const CallbackRequests = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [one, setOne] = useState({
    createdAt: '',
    fromIp: '',
    id: '',
    message: '',
    name: '',
    phone: '',
    state: '',
  });

  const showCallbackRequest = (data) => {
    setOne(data);
    handleOpen();
  };

  const { ids, callbackrequests } = useSelector(
    (store) => store.callback.content
  );

  let data = [];
  if (ids.length !== 0) {
    data = ids.map((id) => {
      return { id, ...callbackrequests[id] };
    });
  }

  console.log(callbackrequests);

  const updateCurrentState = (model) => {
    const keys = Object.keys(model);
    console.log(model);
    if (keys.length > 0) {
      let callbackId = keys[0];
      let currentState = model[keys[0]].state.value;
      console.log(data);
      dispatch(
        updateState({
          callbackId: callbackId,
          state: currentState,
        })
      );
    }
  };

  const handleEditRowsModelChange = useCallback((model) => {
    updateCurrentState(model);
  }, []);

  useEffect(() => {
    dispatch(fetchCallBackRequests());
  }, [dispatch]);

  const columns = [
    {
      field: 'name',
      headerName: 'Full Name',
      description: 'Name of Person',
      flex: 1,
      headerClassName: {},
      renderCell: (params) => (
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
          }}>
          <FaUser color='black' />
          <Typography
            color='text.primary'
            variant='body1'
            sx={{ fontWeight: 'bold', marginLeft: 2 }}>
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'phone',
      headerName: 'Phone No.',
      description: 'Phone no of the user',
      flex: 1,
    },
    {
      field: 'state',
      headerName: 'Status',
      description: 'Status of the callback request',
      flex: 1,
      type: 'singleSelect',
      valueOptions: ['pendingCall', 'calledAlready'],
      width: 160,
      editable: true,
      renderCell: (params) => (
        <Typography
          color={params.value === 'calledAlready' ? '#28a745' : '#dc3545'}>
          {params.value === 'calledAlready' ? 'Called Already' : 'Pending Call'}
        </Typography>
      ),
      //  renderEditCell: renderRatingEditInputCell,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      type: 'dateTime',
      description: 'Time of user creation',
      flex: 1,
    },
    {
      field: 'actions',
      type: 'actions',
      flex: 1,
      headerName: 'Actions',
      getActions: (params) => {
        console.log(params.row);
        return [
          <GridActionsCellItem
            icon={<FaEye />}
            onClick={() => showCallbackRequest(params.row)}
          />,
          <GridActionsCellItem icon={<FaTrash />} />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        p: { xs: 0, md: 5 },
        m: { xs: 0, md: 2 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Typography
        variant='h4'
        sx={{
          textAlign: 'center',
          color: 'primary.main',
          marginBottom: 2,
        }}>
        Callback Requests
      </Typography>
      <Box sx={{ display: 'flex', height: 600, width: '80%' }}>
        <Box sx={{ flexGrow: 1 }}>
          <DataGrid
            columns={columns}
            rows={data}
            sx={{
              '& .MuiDataGrid-iconSeparator': {
                visibility: 'hidden',
              },
            }}
            onEditRowsModelChange={handleEditRowsModelChange}
          />
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Box
            width='100%'
            justifyContent='space-between'
            display='inline-flex'>
            <Typography variant='body2'>
              {new Date(one.createdAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </Typography>
            <Typography
              varient='body2'
              color={one.state === 'calledAlready' ? '#28a745' : '#dc3545'}>
              {one.state === 'calledAlready' ? 'Call Already' : 'Pending Call'}
            </Typography>
          </Box>
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            sx={{ textAlign: 'center' }}>
            {one.name}
          </Typography>
          <Typography
            id='modal-modal-description'
            sx={{ mt: 0, textAlign: 'center' }}>
            {one.phone}
          </Typography>
          <Typography
            id='modal-modal-description'
            sx={{ mt: 0, textAlign: 'center' }}>
            IP : {one.fromIp}
          </Typography>
          <Typography
            id='modal-modal-description'
            sx={{ mt: 2, textAlign: 'center' }}>
            {one.message}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default CallbackRequests;
