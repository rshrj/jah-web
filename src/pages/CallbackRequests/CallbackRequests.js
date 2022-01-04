import { useCallback, useState, useEffect } from 'react';
import { Container, Typography, Chip } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import {
  FaBars,
  FaBuilding,
  FaEdit,
  FaEllipsisH,
  FaEye,
  FaTrash,
  FaUser,
} from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCallBackRequests,
  updateState,
} from '../../redux/slices/callback/callbackSlice';

const CallbackRequests = () => {
  const dispatch = useDispatch();

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
      getActions: (params) => [<GridActionsCellItem icon={<FaTrash />} />],
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
    </Box>
  );
};

export default CallbackRequests;
