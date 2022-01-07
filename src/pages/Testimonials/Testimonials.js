import React, { useState, useEffect } from 'react';
import { Typography, Modal, Box } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { FaEdit, FaEye, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux';
import {
  getAllTestimonials,
  updateTestimonialState,
} from '../../redux/slices/testimonials/testimonialsSlice';

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

const Users = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [one, setOne] = useState({
    name: '',
    company: '',
    testimonial: '',
    date: '',
    status: true,
  });

  const showTestimonial = (t) => {
    setOne(t);
    handleOpen();
  };

  const changeTestimonialState = (id, show) => {
    dispatch(updateTestimonialState({ testimonialId: id, show: show }));
  };

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
    // {
    //   field: 'mobile',
    //   headerName: 'Mobile No.',
    //   description: 'Mobile number of the user',
    //   flex: 1,
    // },
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
        
        const data = {
          name: params.row.name,
          company: params.row.company,
          message: params.row.message,
          date: params.row.createdAt,
          status: params.row.show,
        };
        return [
          <GridActionsCellItem
            icon={<FaCheck />}
            onClick={() => changeTestimonialState(params.id, true)}
          />,
          <GridActionsCellItem
            icon={<FaTimes />}
            onClick={() => changeTestimonialState(params.id, false)}
          />,
          <GridActionsCellItem
            icon={<FaEye />}
            onClick={() => showTestimonial(data)}
          />,
          <GridActionsCellItem icon={<FaEdit />} />,
          <GridActionsCellItem icon={<FaTrash />} />,
        ];
      },
    },
  ];

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
    dispatch(getAllTestimonials());
  }, [dispatch]);

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
              {new Date(one.date).toLocaleDateString('en-IN', {
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
              color={
                one.status === true
                  ? '#28a745'
                  : one.status === false
                  ? '#dc3545'
                  : '#ffc107'
              }>
              {one.status === true
                ? 'Approved'
                : one.status === false
                ? 'Rejected'
                : 'Pending'}
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
            sx={{ mt: 2, textAlign: 'center' }}>
            {one.company}
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {one.message}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default Users;
