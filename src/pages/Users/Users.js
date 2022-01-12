import { useEffect, useMemo, useState } from 'react';
import { Chip, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { FaEnvelope, FaPhoneAlt, FaTrash, FaUser } from 'react-icons/fa';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { HashLoader } from 'react-spinners';
import { Link as RouterLink } from 'react-router-dom';
import { format } from 'date-fns';

import { getUsers, deleteUser } from '../../redux/slices/users/usersSlice';

import DialogBox from '../../components/DialogBox';
import NoRowsOverlay from '../../components/NoRowsOverlay';

const Users = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  // const { ids, users } = useSelector((store) => store.users.content);
  // let data = [];
  // if (ids.length !== 0) {
  //   data = ids.map((id) => {
  //     const { first, last } = users[id].name;
  //     return { id, ...users[id], fullName: first + ' ' + last };
  //   });
  // }

  const [openDelete, setOpenDelete] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState('');

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const data = useSelector((state) =>
    state.users.content.ids.map((id) => ({
      id,
      ...state.users.content.users[id]
    }))
  );
  const loading = useSelector(
    (state) => state.users.fetchLoading === 'loading'
  );

  const deleteAUser = () => {
    dispatch(deleteUser({ userId: deleteUserId }));
    setOpenDelete(false);
  };

  const openDialogBoxHandler = (id) => {
    setDeleteUserId(id);
    setOpenDelete(true);
  };

  const columns = useMemo(() => {
    const handleDelete = (id) => (e) => {
      openDialogBoxHandler(id);
    };

    const fieldName = {
      field: 'name',
      headerName: 'Name',
      description: 'Name of the user',
      type: 'string',
      flex: 1.2,
      renderCell: (params) => (
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center'
          }}>
          <FaUser color={theme.palette.primary.main} />
          <Link
            component={RouterLink}
            to={`/dashboard/users/${params.id}`}
            sx={{ fontWeight: 'bold', marginLeft: 2, color: 'text.secondary' }}>
            {params.value.first} {params.value.last}
          </Link>
        </Box>
      )
    };
    const fieldEmail = {
      field: 'email',
      headerName: 'Email',
      description: 'Email',
      flex: 2.2,
      type: 'string',
      renderCell: (params) => (
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center'
          }}>
          <FaEnvelope color={theme.palette.text.secondary} />
          <Link
            href={`mailto:${params.value}`}
            sx={{
              fontWeight: 'bold',
              marginLeft: 2,
              color: 'text.secondary'
            }}>
            {params.value}
          </Link>
        </Box>
      )
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
              alignItems: 'center'
            }}>
            <FaPhoneAlt color={theme.palette.text.secondary} />
            <Link
              href={`tel:${params.value}`}
              sx={{
                fontWeight: 'bold',
                marginLeft: 2,
                color: 'text.secondary'
              }}>
              {params.value}
            </Link>
          </Box>
        );
      }
    };
    // const fieldState = {
    //   field: 'state',
    //   headerName: 'Status',
    //   description: 'status of listing',
    //   flex: 1,
    //   align: 'center',
    //   headerAlign: 'center',
    //   renderCell: (params) => (
    //     <Chip
    //       color={
    //         params.value === 'Approved'
    //           ? 'success'
    //           : params.value === 'Rejected'
    //           ? 'error'
    //           : 'warning'
    //       }
    //       size='small'
    //       label={
    //         params.value === 'Approved'
    //           ? 'Approved'
    //           : params.value === 'Rejected'
    //           ? 'Rejected'
    //           : 'Pending'
    //       }
    //     />
    //   )
    // };
    const fieldCreatedAt = {
      field: 'createdAt',
      headerName: 'Created on',
      description: 'When the user signed up',
      flex: 0.7,
      renderCell: (params) => (
        <Typography>{format(new Date(params.value), 'MMM dd, yy')}</Typography>
      )
    };
    const fieldRole = {
      field: 'role',
      headerName: 'Role',
      description: 'Role of the user',
      type: 'singleSelect',
      flex: 0.5,
      align: 'center',
      headerAlign: 'center',
      valueOptions: ['ADMIN', 'CUSTOMER'],
      renderCell: ({ value }) => {
        return (
          <Chip
            variant='outlined'
            color={value === 'ADMIN' ? 'success' : 'warning'}
            size='small'
            label={value === 'ADMIN' ? 'Admin' : 'Customer'}
          />
        );
      }
    };
    const fieldActions = {
      field: 'actions',
      type: 'actions',
      flex: 0.5,
      headerName: 'Actions',
      description: 'Delete user',
      getActions: (params) => {
        const actionDelete = (
          <GridActionsCellItem
            icon={<FaTrash />}
            label='Delete'
            color='error'
            showInMenu
            onClick={handleDelete(params.id)}
          />
        );

        return [actionDelete];
      }
    };

    return [
      fieldName,
      fieldEmail,
      fieldPhone,
      fieldCreatedAt,
      fieldRole,
      fieldActions
    ];
  }, [theme]);

  return (
    <Box
      sx={{
        p: { xs: 0, md: 3 },
        m: { xs: 0, md: 1 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
      <Typography
        variant='h4'
        sx={{
          textAlign: 'center',
          color: 'primary.main',
          marginBottom: 3
        }}>
        Users
      </Typography>
      <Box
        sx={{
          display: 'flex',
          height: 600,
          width: { xs: '100vw', sm: '600px', md: '850px' },
          overflowX: { xs: 'scroll', md: 'hidden' },
          px: 2
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
              backgroundColor: theme.palette.grey[0]
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
                NoRowsOverlay
              }}
              sx={{
                '& .MuiDataGrid-iconSeparator': {
                  visibility: 'hidden'
                },
                border: 'none',
                width: 800
              }}
              pageSize={10}
              rowsPerPageOptions={[10, 20, 50, 100]}
              pagination
            />
          </Box>
        )}
      </Box>
      <DialogBox
        open={openDelete}
        handleAccept={deleteAUser}
        handleDecline={() => setOpenDelete(false)}
      />
    </Box>
  );
};

export default Users;
