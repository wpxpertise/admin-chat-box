import React, { useState, useEffect } from 'react';
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import './data-table-user.scss'


export const userColumns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

export const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: "Khankir", age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 10, lastName: 'Sargaryen', firstName: 'Waenerys', age: 65 },
];

export const actionColumns = [
  {
    field: "action",
    headerName: "ACTION",
    // width: 150,
    flex: 0.5,
    renderCell:(params)=>{
      return(
        <div className="wcs_cellAction">
         <div className="wcs_viewButton">
            <a href="#" style={{textDecoration:"none"}}>EDIT</a>
         </div>
         <div className="wcs_deleteButton">BLOCK</div>
         <div className="wcs_deleteButton">DELETE</div>
        </div>
      );
    },
  },
]

const DataTableUser = () => {

  return (
    <div className='wcs_datatable_staff'>
      <h4 className='pro_badge'>UPCOMMING</h4>
      <DataGrid className="wcs_left wec_left_free"
         rows={rows}
        columns={userColumns.concat(actionColumns)}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        disableSelectionOnClick
        getRowId={row => row.id}
      />
    </div>
  )
}

export default DataTableUser