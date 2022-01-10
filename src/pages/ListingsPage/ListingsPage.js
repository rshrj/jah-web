import { useEffect, useMemo, useState } from 'react';
import { Chip, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import {
  FaBuilding,
  FaEdit,
  FaEye,
  FaTrash,
  FaCheck,
  FaTimes,
  FaUser
} from 'react-icons/fa';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { useTheme } from '@mui/material/styles';

import {
  getListings,
  deleteListing,
  updateListingState
} from '../../redux/slices/listings/listingsSlice';
import { listingObject } from '../../constants/listingTypes';

import DialogBox from '../../components/DialogBox';
import NoRowsOverlay from '../../components/NoRowsOverlay';

const ListingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const [openDelete, setOpenDelete] = useState(false);
  const [deleteListingId, setDeleteListingId] = useState('');

  useEffect(() => {
    dispatch(getListings());
  }, [dispatch]);

  const data = useSelector((state) =>
    state.listings.content.ids.map((id) => ({
      id,
      ...state.listings.content.listings[id]
    }))
  );
  const loading = useSelector(
    (state) => state.listings.fetchLoading === 'loading'
  );
  const role = useSelector((state) => state.auth.user.role);

  const deleteAListing = () => {
    dispatch(deleteListing({ listingId: deleteListingId }));
    setOpenDelete(false);
  };

  const openDialogBoxHandler = (id) => {
    setDeleteListingId(id);
    setOpenDelete(true);
  };

  const columns = useMemo(() => {
    const handleApprove = (id) => (e) => {
      dispatch(updateListingState({ listingId: id, state: 'Approved' }));
    };
    const handleReject = (id) => (e) => {
      dispatch(updateListingState({ listingId: id, state: 'Rejected' }));
    };
    const handleView = (id) => (e) => {
      navigate(`/listing/${id}`);
    };
    const handleEdit = (id) => (e) => {
      navigate(`/dashboard/edit/${id}`);
    };
    const handleDelete = (id) => (e) => {
      openDialogBoxHandler(id);
    };

    const fieldName = {
      field: 'name',
      headerName: 'Listing name',
      description: 'Name of the property / project',
      type: 'string',
      flex: 3,
      renderCell: (params) => (
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center'
          }}>
          <FaBuilding color={theme.palette.primary.main} />
          <Typography
            color='text.primary'
            variant='body1'
            sx={{ fontWeight: 'bold', marginLeft: 2 }}>
            {params.value}
          </Typography>
        </Box>
      )
    };
    const fieldCreatedBy = {
      field: 'createdBy',
      headerName: 'Posted By',
      description:
        'Customer who posted the property (click to open their profile)',
      flex: 1.5,
      type: 'string',
      renderCell: (params) =>
        params.value !== null ? (
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center'
            }}>
            <FaUser color={theme.palette.text.secondary} />
            <Link
              component={RouterLink}
              to={`/dashboard/users/${params.value._id}`}
              sx={{
                fontWeight: 'bold',
                marginLeft: 2,
                color: 'text.secondary'
              }}>
              {params.value.name.first} {params.value.name.last}
            </Link>
          </Box>
        ) : (
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ marginLeft: 3 }}>
            Deleted
          </Typography>
        )
    };
    const fieldState = {
      field: 'state',
      headerName: 'Status',
      description: 'status of listing',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Chip
          color={
            params.value === 'Approved'
              ? 'success'
              : params.value === 'Rejected'
              ? 'error'
              : 'warning'
          }
          size='small'
          label={
            params.value === 'Approved'
              ? 'Approved'
              : params.value === 'Rejected'
              ? 'Rejected'
              : 'Pending'
          }
        />
      )
    };
    const fieldCreatedAt = {
      field: 'createdAt',
      headerName: 'Created At',
      description: 'Time of listing creation',
      flex: 1,
      renderCell: (params) => (
        <Typography>{format(new Date(params.value), 'MMM dd, yy')}</Typography>
      )
    };
    const fieldType = {
      field: 'type',
      headerName: 'Type',
      description: 'Type of listing',
      type: 'singleSelect',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      valueOptions: ['rentlease', 'sellapartment', 'sellproject'],
      renderCell: (params) => {
        return (
          <Chip
            variant='outlined'
            color={listingObject[params.value].color}
            size='small'
            label={listingObject[params.value].label}
          />
        );
      }
    };
    const fieldActions = {
      field: 'actions',
      type: 'actions',
      flex: 0.5,
      headerName: 'Actions',
      description: 'View, Edit, Delete buttons',
      getActions: (params) => {
        const actionApprove = (
          <GridActionsCellItem
            icon={<FaCheck />}
            label='Approve'
            showInMenu
            onClick={handleApprove(params.id)}
          />
        );
        const actionReject = (
          <GridActionsCellItem
            icon={<FaTimes />}
            label='Reject'
            showInMenu
            onClick={handleReject(params.id)}
          />
        );
        const actionView = (
          <GridActionsCellItem
            icon={<FaEye />}
            label='View'
            onClick={handleView(params.id)}
            showInMenu
          />
        );
        const actionEdit = (
          <GridActionsCellItem
            icon={<FaEdit />}
            label='Edit'
            onClick={handleEdit(params.id)}
            showInMenu
          />
        );
        const actionDelete = (
          <GridActionsCellItem
            icon={<FaTrash />}
            label='Delete'
            color='error'
            showInMenu
            onClick={handleDelete(params.id)}
          />
        );

        return role === 'ADMIN'
          ? [actionApprove, actionReject, actionView, actionEdit, actionDelete]
          : [actionView, actionEdit, actionDelete];
      }
    };

    return role === 'ADMIN'
      ? [
          fieldName,
          fieldCreatedBy,
          fieldCreatedAt,
          fieldType,
          fieldState,
          fieldActions
        ]
      : [fieldName, fieldCreatedAt, fieldType, fieldState, fieldActions];
  }, [dispatch, navigate, role, theme]);

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
        Listings
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
        handleAccept={deleteAListing}
        handleDecline={() => setOpenDelete(false)}
      />
    </Box>
  );
};

export default ListingsPage;
