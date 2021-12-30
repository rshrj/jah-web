import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { FaBars, FaEdit, FaEllipsisH, FaTrash } from 'react-icons/fa';

const data = [
  {
    id: 1,
    name: 'Hiranandani',
    postedBy: 'Rishi',
    createdAt: new Date(),
    type: 'rentlease'
  },
  {
    id: 2,
    name: 'Abc',
    postedBy: 'Rishiga',
    createdAt: new Date(),
    type: 'sellapartment'
  },
  {
    id: 3,
    name: 'Zyx',
    postedBy: 'Rigfshisa',
    createdAt: new Date(),
    type: 'sellproject'
  },
  {
    id: 4,
    name: 'Gasf',
    postedBy: 'gasRishi',
    createdAt: new Date(),
    type: 'rentlease'
  }
];

const columns = [
  {
    field: 'name',
    headerName: 'Listing name',
    description: 'Name of the property / project',
    flex: 1
  },
  {
    field: 'postedBy',
    headerName: 'Posted By',
    description:
      'Customer who posted the property (click to open their profile)',
    flex: 1
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    type: 'dateTime',
    description: 'Time of listing creation',
    flex: 1
  },
  {
    field: 'type',
    headerName: 'Type',
    description: 'Type of listing',
    flex: 1
  },
  {
    field: 'actions',
    type: 'actions',
    flex: 1,
    getActions: (params) => [
      <GridActionsCellItem icon={<FaEllipsisH />} />,
      <GridActionsCellItem icon={<FaEdit />} />,
      <GridActionsCellItem icon={<FaTrash />} />
    ]
  }
];

const ListingsPage = () => {
  return (
    <Box
      sx={{
        p: { xs: 0, md: 5 },
        m: 2,
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
          <DataGrid columns={columns} rows={data} />
        </Box>
      </Box>
    </Box>
  );
};

export default ListingsPage;
