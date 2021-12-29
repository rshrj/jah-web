import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from "@mui/styles";
import {FaPen,FaTrash} from 'react-icons/fa';
import { red } from '@mui/material/colors';

const renderViewButton = (params) => {
  return (
    <FaPen
      color="rgba(0, 0, 0, 0.54)"
          />
  )
}
const renderPenButton = (params) => {
  return (
    <FaPen
      color="rgba(0, 0, 0, 0.54)"
    />
  )
}
const renderDeleteButton = (params) => {
  return (
    <FaTrash
      color="rgba(0, 0, 0, 0.54)"
    />
  )
}
const columns = [
    // { field: "id", headerName: "Id", width: 70 },
    { field: 'name', headerName: 'Name',  flex:0.4},
    { field: 'postedBy', headerName: 'Posted By' ,flex:0.4},
    { field: 'postedOn', headerName: 'Posted on',flex:0.4 },
    {
      field: 'viewButton',
      headerName: '',
      flex:0.02,
      renderCell: renderViewButton,
      disableClickEventBubbling: true,
      align:'center'
    },
    {
    field: 'penButton',
    headerName: '',
    flex:0.02,
    renderCell: renderPenButton,
    disableClickEventBubbling: true,
    align:'center'
    },
  {
    field: 'deleteButton',
    headerName: '',
    flex:0.02,
    renderCell: renderDeleteButton,
    disableClickEventBubbling: true,
    align:'center'
  },
  ];
  const useStyles = makeStyles({
    root: {
      "& .styledrows": {
        // backgroundColor: "aqua"
      }
    }
  });
const rows = [
    { id:1,name:'Arihant Skylines', postedBy:'Nettie Fields', postedOn:'20/12/2021',},
    { id:2,name:'Arihant Skylines', postedBy:'Thomas Bewn', postedOn:'24/12/2021' },
    { id:3,name:'Arihant Skylines', postedBy:'Matthew Perry', postedOn:'20/12/2021' },
    { id:4,name:'Arihant Skylines', postedBy:'Rachel Scott', postedOn:'20/12/2021' },
    { id:5,name:'Arihant Skylines', postedBy:'Alex Holt', postedOn:'20/12/2021' },
    { id:6,name:'Arihant Skylines', postedBy:'Robin Trump', postedOn:'20/12/2021' },
    { id:7,name:'Arihant Skylines', postedBy:'Charles Harper', postedOn:'28/12/2021' },
    { id:8,name:'Arihant Skylines', postedBy:'David Blanc', postedOn:'20/12/2021' },
    { id:9,name:'Arihant Skylines', postedBy:'Simon Lewis', postedOn:'20/12/2021' },
    { id:10,name:'Arihant Skylines',postedBy:'Amy Diaz', postedOn:'20/12/2021' },
    { id:11,name:'Arihant Skylines',postedBy:'Sheldon Cooper', postedOn:'20/12/2021' },
    { id:12,name:'Arihant Skylines',postedBy:'Nettie Fields', postedOn:'20/12/2021' },
    { id:13,name:'Arihant Skylines',postedBy:'Nettie Fields', postedOn:'20/12/2021' },
    { id:14,name:'Arihant Skylines',postedBy:'Nettie Fields', postedOn:'20/12/2021' },
    { id:15,name:'Arihant Skylines',postedBy:'Nettie Fields', postedOn:'20/12/2021' },
];
  
  export default function Table() {
    const classes = useStyles();
    return (
      <div style={{ height: 400, width:'100%'}} className={classes.root}>
        <DataGrid rowHeight={42} sx={{border:'transparent',
          '& .MuiDataGrid-cell:focus': {
            border:'transparent',
            outline:'none'
          },
        }}
          rows={rows}
          columns={columns}
          getRowClassName={(params) => `styledrows`}
          // pageSize={5}
          autoPageSize
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    );
  }