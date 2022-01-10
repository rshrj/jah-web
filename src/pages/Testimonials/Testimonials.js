import React, { useState, useEffect, useMemo } from 'react';
import {
  Typography,
  Modal,
  Box,
  Button,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  TextareaAutosize,
  Link,
  Chip
} from '@mui/material';
import { JInputField } from '../../components/JInputField';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import {
  FaEdit,
  FaEye,
  FaTrash,
  FaCheck,
  FaTimes,
  FaQuoteLeft,
  FaPhoneAlt
} from 'react-icons/fa';
import { format } from 'date-fns';
import { useTheme, styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { HashLoader } from 'react-spinners';

import { clearFormErrors } from '../../redux/slices/errors/errorsSlice';
import {
  getAllTestimonials,
  updateTestimonialState,
  updateTestimonial,
  deleteTestimonial
} from '../../redux/slices/testimonials/testimonialsSlice';

import DialogBox from '../../components/DialogBox';
import Loader from '../../components/Loader';
import NoRowsOverlay from '../../components/NoRowsOverlay';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: '600px',
  bgcolor: 'background.paper',
  p: 4,
  transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  borderRadius: '4px',
  boxShadow:
    'rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px',
  backgroundImage:
    'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
  overflow: 'hidden'
};

const StyledTextareaAutosize = styled(TextareaAutosize)(({ theme }) => ({
  fontFamily: 'inherit',
  borderColor: theme.palette.grey[400],
  borderRadius: 5,
  padding: theme.spacing(1),
  backgroundColor: 'inherit',
  '&:hover': {
    borderColor: theme.palette.grey[600]
  },
  '&:focus': {
    borderColor: theme.palette.primary.main
  },
  '&:focus-visible': {
    borderColor: theme.palette.primary.main
  }
}));

const TestimonialView = ({ open, onClose, one, onCancel }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'>
      <Box sx={style}>
        <Box width='100%' justifyContent='space-between' display='inline-flex'>
          <Typography variant='body2'>
            {new Date(one.createdAt).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
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
        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
          <Button
            variant='outlined'
            sx={{ marginTop: 1, marginBottom: 1 }}
            onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const TestimonialModal = ({ open, onClose, one, onCancel }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [values, setValues] = useState({
    name: '',
    company: '',
    message: '',
    phone: ''
  });

  useEffect(() => {
    setValues(one);
  }, [one]);

  const handleChange = (prop) => (event) => {
    if (Object.entries(errors).length !== 0) {
      dispatch(clearFormErrors());
    }

    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Update Click');
    dispatch(
      updateTestimonial({
        testimonialId: one.id,
        name: values.name,
        company: values.company,
        message: values.message,
        phone: values.phone,
        cancelHandler: onCancel
      })
    );
  };

  const loading = useSelector(
    (state) => state.testimonials.loading === 'loading'
  );
  const errors = useSelector((state) => state.errors.formErrors);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'>
      <Box sx={style}>
        <Typography sx={{ mb: 1, textAlign: 'center', fontSize: '20px' }}>
          Update Testimonial
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
          component='form'
          autoComplete='off'>
          <Grid item xs={12} sm={6}>
            <FormGroup>
              <JInputField
                topLabel='Name'
                placeholder='Enter your name'
                spacing={0}
                value={values.name}
                handleChange={handleChange('name')}
                errors={errors['name']}
                disabled={loading}
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormGroup>
              <JInputField
                topLabel={
                  <Typography>
                    Company Name{' '}
                    <span
                      style={{
                        color: theme.palette.text.secondary,
                        fontSize: 13,
                        marginLeft: 1
                      }}>
                      (Optional)
                    </span>
                  </Typography>
                }
                placeholder='Enter your company name'
                spacing={0}
                value={values.company}
                handleChange={handleChange('company')}
                errors={errors['company']}
                disabled={loading}
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormGroup>
              <JInputField
                topLabel='Phone number'
                placeholder='Enter your phone number'
                helperText='We will not share your phone number with anyone'
                spacing={0}
                value={values.phone}
                handleChange={handleChange('phone')}
                errors={errors['phone']}
                disabled={loading}
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormGroup>
              <FormLabel
                sx={{
                  color: 'text.primary',
                  marginBottom: 1
                }}>
                <Typography
                  variant='body1'
                  color='text.primary'
                  sx={{
                    display: 'inline-block',
                    marginRight: 1
                  }}>
                  Testimonial
                </Typography>
              </FormLabel>
              <StyledTextareaAutosize
                aria-label='Testimonial message'
                minRows={4}
                value={values.message}
                onChange={handleChange('message')}
                placeholder='Enter your testimonial'
              />
              {errors['message'] !== undefined && (
                <FormHelperText error>{errors['message']}</FormHelperText>
              )}
              <Typography
                color={
                  values.message.length <= 140 ? 'text.secondary' : 'error'
                }
                fontWeight={values.message.length <= 140 ? 'normal' : 'bold'}
                sx={{ marginTop: 1 }}>
                {values.message.length} / 140
              </Typography>
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={12} textAlign='center'>
            <Button
              variant='outlined'
              sx={{ marginTop: 1, marginBottom: 1, marginRight: 2 }}
              onClick={onClose}
              disabled={loading}>
              Cancel
            </Button>
            <Button
              type='submit'
              variant='contained'
              sx={{ marginTop: 1, marginBottom: 1 }}
              onClick={handleSubmit}
              disabled={loading || values.message.length > 140}>
              {loading ? <Loader /> : 'Submit'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

const Testimonials = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const loading = useSelector(
    (state) => state.testimonials.fetchLoading === 'loading'
  );
  const data = useSelector((state) =>
    state.testimonials.content.ids.map((id) => ({
      id,
      ...state.testimonials.content.testimonials[id]
    }))
  );

  const [modalState, setModalState] = useState('close');
  const [selection, setSelection] = useState({});

  const showTestimonial = (testimonial) => {
    setSelection(testimonial);
    setModalState('view');
  };

  const openUpdateHandler = (testimonial) => {
    setSelection(testimonial);
    setModalState('update');
  };

  const handleClose = () => {
    setModalState('close');
  };

  const [deleteTestimonialId, setDeleteTestimonialId] = useState('');

  const deleteATestimonial = () => {
    dispatch(deleteTestimonial({ testimonialId: deleteTestimonialId }));
    setModalState('close');
  };

  const openDialogBoxHandler = (id) => {
    setDeleteTestimonialId(id);
    setModalState('delete');
  };

  const columns = useMemo(() => {
    const handleApprove = (id) => (e) => {
      dispatch(updateTestimonialState({ testimonialId: id, show: true }));
    };
    const handleReject = (id) => (e) => {
      dispatch(updateTestimonialState({ testimonialId: id, show: false }));
    };
    const handleView = (row) => (e) => {
      showTestimonial(row);
    };
    const handleEdit = (row) => (e) => {
      openUpdateHandler(row);
    };
    const handleDelete = (id) => (e) => {
      openDialogBoxHandler(id);
    };

    const fieldName = {
      field: 'name',
      headerName: 'Posted By',
      description: 'Name of the person who left the testimonial',
      type: 'string',
      flex: 1.5,
      renderCell: (params) => (
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center'
          }}>
          <FaQuoteLeft color={theme.palette.primary.main} />
          <Typography
            color='text.primary'
            variant='body1'
            sx={{ fontWeight: 'bold', marginLeft: 2 }}>
            {params.value}
          </Typography>
        </Box>
      )
    };
    const fieldCompany = {
      field: 'company',
      headerName: 'Company',
      description: 'Company they work in',
      flex: 1.5,
      type: 'string',
      renderCell: (params) => (
        <Typography
          sx={{
            fontWeight: params.value !== '' ? 'bold' : 'normal',
            marginLeft: 2,
            color: 'text.secondary'
          }}>
          {params.value !== '' ? params.value : 'NA'}
        </Typography>
      )
    };
    const fieldState = {
      field: 'show',
      headerName: 'State',
      description: 'Whether the testimonial is shown on the landing page',
      flex: 1,
      type: 'boolean',
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Chip
          color={params.value ? 'success' : 'default'}
          size='small'
          label={params.value ? 'Shown' : 'Hidden'}
        />
      )
    };
    const fieldCreatedAt = {
      field: 'createdAt',
      headerName: 'Created At',
      description: 'Date when the testimonial was posted',
      flex: 1,
      renderCell: (params) => (
        <Typography>{format(new Date(params.value), 'MMM dd, yy')}</Typography>
      )
    };
    const fieldPhone = {
      field: 'phone',
      headerName: 'Phone No.',
      description: 'Phone no. of the person who left the testimonial',
      type: 'string',
      flex: 1.5,
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
    const fieldActions = {
      field: 'actions',
      type: 'actions',
      flex: 0.5,
      headerName: 'Actions',
      description: 'View, Edit, Delete buttons',
      getActions: ({ row, id }) => {
        const actionApprove = (
          <GridActionsCellItem
            icon={<FaCheck />}
            label='Approve'
            showInMenu
            onClick={handleApprove(id)}
          />
        );
        const actionReject = (
          <GridActionsCellItem
            icon={<FaTimes />}
            label='Reject'
            showInMenu
            onClick={handleReject(id)}
          />
        );
        const actionView = (
          <GridActionsCellItem
            icon={<FaEye />}
            label='View'
            onClick={handleView(row)}
            showInMenu
          />
        );
        const actionEdit = (
          <GridActionsCellItem
            icon={<FaEdit />}
            label='Edit'
            onClick={handleEdit(row)}
            showInMenu
          />
        );
        const actionDelete = (
          <GridActionsCellItem
            icon={<FaTrash />}
            label='Delete'
            color='error'
            showInMenu
            onClick={handleDelete(id)}
          />
        );

        return [
          actionApprove,
          actionReject,
          actionView,
          actionEdit,
          actionDelete
        ];
      }
    };

    return [
      fieldName,
      fieldCompany,
      fieldCreatedAt,
      fieldPhone,
      fieldState,
      fieldActions
    ];
  }, [dispatch, theme]);

  useEffect(() => {
    dispatch(getAllTestimonials());
  }, [dispatch]);

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
        Testimonials
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

      {modalState === 'delete' && (
        <DialogBox
          open={modalState === 'delete'}
          handleAccept={deleteATestimonial}
          handleDecline={handleClose}
        />
      )}

      {modalState === 'view' && (
        <TestimonialView
          open={modalState === 'view'}
          onClose={handleClose}
          one={selection}
          onCancel={handleClose}
        />
      )}

      {modalState === 'update' && (
        <TestimonialModal
          open={modalState === 'update'}
          onClose={handleClose}
          one={selection}
          onCancel={handleClose}
        />
      )}
    </Box>
  );
};

export default Testimonials;
