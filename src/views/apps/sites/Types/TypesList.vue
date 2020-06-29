<template>
    <ag-grid-vue
        ref="agGridTable"
        :gridOptions="gridOptions"
        class="ag-theme-material w-100 my-4 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="TypesData"
        rowSelection="multiple"
        colResizeDefault="shift"
        :animateRows="true"
        :floatingFilter="true"
        :pagination="true"
        :suppressPaginationPanel="true"
        :enableRtl="$vs.rtl">
      </ag-grid-vue>
</template>


<script>

import { AgGridVue } from 'ag-grid-vue'
import moduleUserManagement from '@/store/user-management/moduleUserManagement.js'
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'
export default {
  name:'Types-list',
  data: () => {
    return {
      rowData: [
        {
          position:'Honda',
          status:'active'
        },
        {
          position:'Toyta',
          status:'inactive'
        }
            
      ],
      gridApi: null,
      gridOptions: {},
      defaultColDef: {
        sortable: true,
        resizable: true,
        suppressMenu: true
      },
      columnDefs: [
        {
          headerName: 'ID',
          field:'id',
          filter: true,
          checkboxSelection: true,
          headerCheckboxSelectionFilteredOnly: true,
          headerCheckboxSelection: true
        },

        {
          headerName: 'Types',
          field: 'types',
          filter: true
        },
        {
          headerName: 'Color',
          field: 'color',
          filter: true
        },
        {
          headerName: 'Status',
          field: 'status',
          filter: true
        }
      ]

    }
  },
  computed:{
    TypesData () {
      return this.$store.state.userManagement.users
    }

  },
  components:{
    AgGridVue
  },
  mounted () {
    this.gridOptions.api.sizeColumnsToFit()
  },
  created () {
    if (!moduleUserManagement.isRegistered) {
      this.$store.registerModule('userManagement', moduleUserManagement)
      moduleUserManagement.isRegistered = true
    }
    this.$store.dispatch('userManagement/fetchUsers').catch(err => { console.error(err) })
  }
    
}
</script>