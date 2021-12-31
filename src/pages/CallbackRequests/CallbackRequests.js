import { useEffect } from 'react';
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


const data = [
  {
    id:'1',
    name:"Bimalesh Seth",
    phone:"9999999999",
    createdAt: new Date(),
    status: false
},
  {
    id:'2',
    name:"Kamlesh Soni",
    phone:"9999999999",
    createdAt: new Date(),
    status: true
},
  {
    id:'3',
    name:"Krishna Sahani",
    phone:"9999999999",
    createdAt: new Date(),
    status: true
},
  {
    id:'4',
    name:"Ankur Gupta",
    phone:"9999999999",
    createdAt: new Date(),
    status: false
},
];

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
    field: 'status',
    headerName: 'Status',
    description: 'Status of the callback request',
    flex: 1,
    renderCell: (params) => (
      <Typography
        color={
          params.value === true
            ? '#28a745' : '#dc3545'
        }>
        {params.value === true
          ? 'Called Already' : 'Pending Call'}
      </Typography>
    ),
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

const Users = () => {

 
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
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Users;
