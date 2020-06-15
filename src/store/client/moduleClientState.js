/*=========================================================================================
  File Name: moduleTodoState.js
  Description: Todo Module State
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {
  columnDefss:[
    {
      headerName: 'ID',
        
      width: 50,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      headerCheckboxSelection: true
    },
    {
      headerName: 'Name',
      field: 'name',
      filter: true,
      width: 200
    },
    {
      headerName: 'Email',
      field: 'email',
      filter: true,
      width: 225
    },
    {
      headerName: 'Phone',
      field: 'phone',
      filter: true,
      width: 225
    },
    {
      headerName: 'Mobile',
      field: 'mobile',
      filter: true,
      width: 200
    },
    {
      headerName: 'City/Town',
      field: 'city',
      filter: true,
      width: 225
    },
    {
      headerName: 'Post Code',
      field: 'postCode',
      filter: true,
      width: 150
    },
      
    {
      headerName: 'Country',
      field: 'country',
      filter: true,
      width: 150
    },
  
    {
      headerName: 'Actions',
      field: 'transactions',
      width: 150,
      cellRendererFramework: 'CellRendererActions'
    }
  ],
  clients: [],
  clientSearchQuery: '',
  clientFilter: null
}
  