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
  FaCheck,
  FaTimes,
} from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux';
import { getTestimonials } from '../../redux/slices/testimonials/testimonialsSlice';


const columns = [
  {
    field: 'name',
    headerName: 'Full Name',
    description: 'Full Name',
    flex: 1,
    headerClassName: {},
  },
  {
    field: 'company',
    headerName: 'Campany',
    description: 'Company of the user',
    flex: 1,
  },
  {
    field: 'show',
    headerName: 'Status',
    description: 'Status of the testimonial',
    flex: 1,
    renderCell: (params) => (
      <Typography
        color={
          params.value === true
            ? '#28a745'
            : params.value === false
            ? '#dc3545'
            : '#ffc107'
        }>
        {params.value === true
          ? 'Approved'
          : params.value === false
          ? 'Rejected'
          : 'Pending'}
      </Typography>
    ),
  },
  {
    field: 'mobile',
    headerName: 'Mobile No.',
    description: 'Mobile number of the user',
    flex: 1,
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
    getActions: (params) => [
      <GridActionsCellItem icon={<FaCheck />} />,
      <GridActionsCellItem icon={<FaTimes />} />,
      <GridActionsCellItem icon={<FaEye />} />,
      <GridActionsCellItem icon={<FaEdit />} />,
      <GridActionsCellItem icon={<FaTrash />} />,
    ],
  },
];

const Users = () => {
  const dispatch = useDispatch();

  const { ids, testimonials } = useSelector(
    (store) => store.testimonials.content
  );
  let data = [];
  if (ids.length !== 0) {
    data = ids.map((id) => {
      return { id, ...testimonials[id] };
    });
  }

  useEffect(() => {
    dispatch(getTestimonials());
  }, []);

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
        Testimonials
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
