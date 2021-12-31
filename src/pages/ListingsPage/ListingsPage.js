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
  FaTrash
} from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux';
import { getListings } from '../../redux/slices/listings/listingsSlice';

import { listingObject, listingKeys } from '../../constants/listingTypes';

// const data = [
//   {
//     id: 1,
//     name: 'Hiranandani',
//     postedBy: 'Rishi',
//     createdAt: new Date(),
//     type: 'rentlease',
//     status: ''
//   },
//   {
//     id: 2,
//     name: 'Abc',
//     postedBy: 'Rishiga',
//     createdAt: new Date(),
//     type: 'sellapartment'
//   },
//   {
//     id: 3,
//     name: 'Zyx',
//     postedBy: 'Rigfshisa',
//     createdAt: new Date(),
//     type: 'sellproject'
//   },
//   {
//     id: 4,
//     name: 'Gasf',
//     postedBy: 'gasRishi',
//     createdAt: new Date(),
//     type: 'rentlease'
//   }
// ];

const columns = [
  {
    field: 'name',
    headerName: 'Listing name',
    description: 'Name of the property / project',
    flex: 1,
    headerClassName: {},
    renderCell: (params) => (
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
        }}>
        <FaBuilding color='orange' />
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
    field: 'postedBy',
    headerName: 'Posted By',
    description:
      'Customer who posted the property (click to open their profile)',
    flex: 1,
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    type: 'dateTime',
    description: 'Time of listing creation',
    flex: 1,
  },
  {
    field: 'listingType',
    headerName: 'Type',
    type: 'singleSelect',
    description: 'Type of listing',
    flex: 1,
    valueOptions: ['rentlease', 'sellapartment', 'sellproject'],
    renderCell: (params) => (
      <Typography color={listingObject[params.value].color}>
        {listingObject[params.value].label}
      </Typography>
    ),
  },
  {
    field: 'actions',
    type: 'actions',
    flex: 1,
    headerName: 'Actions',
    getActions: (params) => [
      <GridActionsCellItem icon={<FaEye />} />,
      <GridActionsCellItem icon={<FaEdit />} />,
      <GridActionsCellItem icon={<FaTrash />} />,
    ],
  },
];

const ListingsPage = () => {

  const dispatch = useDispatch();

  const {ids, listings} = useSelector((store) => store.listings.content);
  
  let data = [];
  if(ids.length !== 0){
    data = ids.map(id => {
      const { first, last } = listings[id].createdBy.name;
      return { id, ...listings[id], postedBy: first + ' ' + last };
    });
  }

  console.log(listings);

  useEffect(()=>{
    dispatch(getListings());
  },[]);


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
        Listings
      </Typography>
      <Box sx={{ display: 'flex', height: 600, width: '70%' }}>
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

export default ListingsPage;
