import { useCallback, useEffect, useState, useMemo } from 'react';
import { Typography, Modal, Link } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { FaTrash, FaUser, FaEye, FaPhoneAlt } from 'react-icons/fa';
import { useTheme } from '@mui/material/styles';
import { format } from 'date-fns';
import { HashLoader } from 'react-spinners';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCallBackRequests,
  updateState,
  deleteCallbackRequest,
} from '../../redux/slices/callback/callbackSlice';
import NoRowsOverlay from '../../components/NoRowsOverlay';
import DialogBox from '../../components/DialogBox';

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
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState('');

   const loading = useSelector(
     (state) => state.users.fetchLoading === 'loading'
   );

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

   const deleteACallback= () => {
     dispatch(deleteCallbackRequest({ callbackId: deleteId }));
     setOpenDelete(false);
   };

   const openDialogBoxHandler = (id) => {
     setDeleteId(id);
     setOpenDelete(true);
   };

  const columns = useMemo(() => {

  

    const fieldName = {
      field: 'name',
      headerName: 'Full Name',
      description: 'Name of Person',
      flex: 1.2,
      headerClassName: {},
      renderCell: (params) => (
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
          }}>
          <FaUser color={theme.palette.primary.main} />
          <Typography
            variant='body1'
            sx={{ fontWeight: 'bold', marginLeft: 2, color: 'text.secondary' }}>
            {params.value}
          </Typography>
        </Box>
      ),
    };

    const fieldPhone = {
      field: 'phone',
      headerName: 'Phone No.',
      description: 'Mobile number of the user',
      type: 'string',
      flex: 0.8,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
            }}>
            <FaPhoneAlt color={theme.palette.text.secondary} />
            <Link
              href={`tel:${params.value}`}
              sx={{
                fontWeight: 'bold',
                marginLeft: 2,
                color: 'text.secondary',
              }}>
              {params.value}
            </Link>
          </Box>
        );
      },
    };

    const fieldState = {
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
    };

    const fieldCreatedAt = {
      field: 'createdAt',
      headerName: 'Created on',
      description: 'When the callback request came',
      flex: 0.7,
      renderCell: (params) => (
        <Typography>{format(new Date(params.value), 'MMM dd, yy')}</Typography>
      ),
    };

    const fieldActions = {
      field: 'actions',
      type: 'actions',
      flex: 0.5,
      headerName: 'Actions',
      description: 'Show, Delete callback',

      getActions: (params) => {
        const actionShow = (
          <GridActionsCellItem
            icon={<FaEye />}
            label='Show'
            showInMenu
            onClick={() => showCallbackRequest(params.row)}
          />
        );
        const actionDelete = (
          <GridActionsCellItem
            icon={<FaTrash />}
            label='Delete'
            showInMenu
            onClick={() => openDialogBoxHandler( params.id)}
          />
        );
        return [actionShow, actionDelete];
      },
    };

    return [fieldName, fieldPhone, fieldState, fieldCreatedAt, fieldActions];
  }, [theme]);


  return (
    <Box
      sx={{
        p: { xs: 0, md: 3 },
        m: { xs: 0, md: 1 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Typography
        variant='h4'
        sx={{
          textAlign: 'center',
          color: 'primary.main',
          marginBottom: 3,
        }}>
        Callback Requests
      </Typography>
      <Box
        sx={{
          display: 'flex',
          height: 600,
          width: { xs: '100vw', sm: '600px', md: '850px' },
          overflowX: { xs: 'scroll', md: 'hidden' },
          px: 2,
        }}>
        {loading && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              pt: 20,
              pb: 30,
              backgroundColor: theme.palette.grey[0],
            }}>
            <HashLoader
              color={theme.palette.primary.main}
              style={{ display: 'block', margin: '100px' }}
              size={150}
            />
          </Box>
        )}
        {!loading && (
          <Box sx={{ flexGrow: 1 }}>
            <DataGrid
              columns={columns}
              rows={data}
              components={{
                NoRowsOverlay,
              }}
              sx={{
                '& .MuiDataGrid-iconSeparator': {
                  visibility: 'hidden',
                },
                border: 'none',
                width: 800,
              }}
              pageSize={10}
              rowsPerPageOptions={[10, 20, 50, 100]}
              pagination
              onEditRowsModelChange={handleEditRowsModelChange}
            />
          </Box>
        )}
      </Box>
      <DialogBox
        open={openDelete}
        handleAccept={deleteACallback}
        handleDecline={() => setOpenDelete(false)}
      />
     
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
