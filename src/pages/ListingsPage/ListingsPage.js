import { useEffect } from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import {
  FaBuilding,
  FaEdit,
  FaEye,
  FaTrash,
  FaCheck,
  FaTimes
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import { getListings } from '../../redux/slices/listings/listingsSlice';

import { listingObject } from '../../constants/listingTypes';

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

// const listings = [
//   {
//     name: '2BHK in Mankhurd',
//     state: 'pending',
//     listingType: 'sellapartment',
//     sellapartment: {
//       societyname: 'Gokuldham Hillview',
//       location: 'Mankhurd',
//       landmark: 'Near HBCSE',
//       apartmentType: '2bhk',
//       price: '8345000',
//       pricePerSqFt: '10000',
//       allInclusivePrice: false,
//       taxAndGovtChargesExcluded: true,
//       priceNegotiable: true,
//       numBathrooms: '2',
//       numBalconies: '2',
//       carpetArea: '834',
//       builtUpArea: '',
//       superBuiltUpArea: '1350',
//       otherRooms: ['poojaRoom', 'studyRoom'],
//       furnishing: 'furnished',
//       coveredParking: '2',
//       openParking: '0',
//       totalFloors: '10',
//       propertyOnFloor: '8',
//       ageOfProperty: '0-1yrs',
//       availabilityStatus: 'readyToMove',
//       ownershipType: 'freehold',
//       usp: 'A very nice place!',
//       pictures: [
//         'https://i.picsum.photos/id/164/800/600.jpg?hmac=PXOkqOXBrKf4yZjDeJ3q5KtnTSFO4DOIJKNhBRDlKiY',
//         'https://i.picsum.photos/id/12/800/600.jpg?hmac=OnuvMhu3pBo7i6hErvnN-U922LRgjb8pBHux29xEv34',
//         'https://i.picsum.photos/id/229/800/600.jpg?hmac=XBz4BdHCdXDT8GerLNU_gH41Hv6gKY0beR0wprsUesQ',
//         'https://i.picsum.photos/id/41/500/900.jpg?hmac=anOtTY6nmGpH2yWQzb8DA9QMUktr6y8X5QVfpuYpHXY',
//         'https://i.picsum.photos/id/950/600/500.jpg?hmac=NplsaUFi8hC7-nsbDSXR9b0QBGtfo7-g11beSBNBpUc',
//         'https://i.picsum.photos/id/570/800/600.jpg?hmac=uKkwPFnmvK2ixiYuqFoYCJE8CoEWXxFTCDF0syKNm0I',
//         'https://i.picsum.photos/id/182/800/600.jpg?hmac=tljGSjfYZx-pg_MFSQUL-Emf_FGXS3FCXB3nlEBYFtY',
//         'https://i.picsum.photos/id/699/500/900.jpg?hmac=CC4usCtofVGSafR68gmrqfIoqKyUeWbqDfGXNlsnBMI',
//         'https://i.picsum.photos/id/689/800/600.jpg?hmac=9Ewgx9LpNR5YK4XHAXstG8gMaBlRyWG-EirYYVkaEVU',
//         'https://i.picsum.photos/id/187/600/800.jpg?hmac=TtgRrLawCBefKSnxolzreh-dUucf0jxrfN0cQJ4Vmzg',
//       ],
//       featuredPicture:
//         'https://i.picsum.photos/id/164/800/600.jpg?hmac=PXOkqOXBrKf4yZjDeJ3q5KtnTSFO4DOIJKNhBRDlKiY',
//       videoLink:
//         'https://www.youtube.com/watch?v=2YBtspm8j8M&ab_channel=Dissolve',
//     },
//     createdBy: '61c86363686210e7fe8ffde0',
//     createdAt: Date.now(),
//   },
// ];

const columns = [
  {
    field: 'name',
    headerName: 'Listing name',
    description: 'Name of the property / project',
    type: 'string',
    flex: 1,
    renderCell: (params) => (
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center'
        }}>
        <FaBuilding color='orange' />
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
    field: 'postedBy',
    headerName: 'Posted By',
    description:
      'Customer who posted the property (click to open their profile)',
    flex: 1
  },
  {
    field: 'state',
    headerName: 'Status',
    description: 'status of listing',
    flex: 1,
    renderCell: (params) => (
      <Typography
        color={
          params.value === 'Approved'
            ? '#28a745'
            : params.value === 'Deactivated'
            ? '#dc3545'
            : '#ffc107'
        }>
        {params.value === 'Approved'
          ? 'Approved'
          : params.value === 'Deactivated'
          ? 'Deactivated'
          : 'Pending'}
      </Typography>
    )
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    description: 'Time of listing creation',
    flex: 1
  },
  {
    field: 'listingType',
    headerName: 'Type',
    description: 'Type of listing',
    type: 'singleSelect',
    flex: 1,
    valueOptions: ['rentlease', 'sellapartment', 'sellproject'],
    renderCell: (params) => {
      console.log(params.value);
      return (
        <Typography color={listingObject[params.value].color}>
          {listingObject[params.value].label}
        </Typography>
      );
    }
  },
  {
    field: 'actions',
    type: 'actions',
    flex: 1,
    headerName: 'Actions',
    description: 'View, Edit, Delete buttons',
    getActions: (params) => [
      <GridActionsCellItem icon={<FaCheck />} />,
      <GridActionsCellItem icon={<FaTimes />} />,
      <GridActionsCellItem icon={<FaEye />} />,
      <GridActionsCellItem icon={<FaEdit />} />,
      <GridActionsCellItem icon={<FaTrash />} />
    ]
  }
];

const ListingsPage = () => {
  const dispatch = useDispatch();

  const { ids, listings } = useSelector((store) => store.listings.content);

  let data = [];
  if (ids.length !== 0) {
    data = ids.map((id) => {
      const { first, last } = listings[id].createdBy.name;
      return { id, ...listings[id], postedBy: first + ' ' + last };
    });
  }

  console.log(listings);

  useEffect(() => {
    dispatch(getListings());
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
        Listings
      </Typography>
      <Box
        sx={{
          display: 'flex',
          height: 600,
          width: { xs: '100%', sm: '100%', md: '80%', lg: '80%' }
        }}>
        <Box sx={{ flexGrow: 1 }}>
          <DataGrid
            // TODO: set default page size to 10 rows per page
            columns={columns}
            rows={data}
            sx={{
              '& .MuiDataGrid-iconSeparator': {
                visibility: 'hidden'
              },
              border: 'none'
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ListingsPage;
