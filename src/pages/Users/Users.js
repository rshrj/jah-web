import { useEffect } from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { FaTrash, FaUser } from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/slices/users/usersSlice';

const columns = [
  {
    field: 'fullName',
    headerName: 'User Name',
    description: 'Name of User',
    flex: 1,
    headerClassName: {},
    renderCell: (params) => (
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center'
        }}>
        <FaUser color='black' />
        <Typography
          color='text.primary'
          variant='body1'
          sx={{ fontWeight: 'bold', marginLeft: 2 }}>
          {params.value}
        </Typography>
      </Box>
    )
  },
  {
    field: 'email',
    headerName: 'Email ID',
    description: 'Email id of the user',
    flex: 1
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    type: 'dateTime',
    description: 'Time of user creation',
    flex: 1
  },

  {
    field: 'role',
    headerName: 'Role',
    type: 'singleSelect',
    description: 'Type of User',
    flex: 1,
    valueOptions: ['CUSTOMER', 'ADMIN'],
    renderCell: (params) => (
      <Typography
        color={params.value === 'ADMIN' ? 'success.main' : 'info.main'}>
        {params.value}
      </Typography>
    )
  },
  {
    field: 'actions',
    type: 'actions',
    flex: 1,
    headerName: 'Actions',
    getActions: (params) => [<GridActionsCellItem icon={<FaTrash />} />]
  }
];

const Users = () => {
  const dispatch = useDispatch();

  const { ids, users } = useSelector((store) => store.users.content);
  let data = [];
  if (ids.length !== 0) {
    data = ids.map((id) => {
      const { first, last } = users[id].name;
      return { id, ...users[id], fullName: first + ' ' + last };
    });
  }

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <Box
      sx={{
        p: { xs: 0, md: 5 },
        m: { xs: 0, md: 2 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
      <Typography
        variant='h4'
        sx={{
          textAlign: 'center',
          color: 'primary.main',
          marginBottom: 2
        }}>
        Users
      </Typography>
      <Box sx={{ display: 'flex', height: 600, width: '80%' }}>
        <Box sx={{ flexGrow: 1 }}>
          <DataGrid
            columns={columns}
            rows={data}
            sx={{
              '& .MuiDataGrid-iconSeparator': {
                visibility: 'hidden'
              }
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Users;
