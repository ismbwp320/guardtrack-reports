<template>
    <ag-grid-vue
        ref="agGridTable"
        :components="components"
        :gridOptions="gridOptions"
        class="ag-theme-alpine w-100 my-4 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="TypesData"
        rowSelection="multiple"
        colResizeDefault="shift"
        :animateRows="true"
        :pagination="true"
        :suppressPaginationPanel="true"
        :enableRtl="$vs.rtl">
      </ag-grid-vue>
</template>


<script>

import { AgGridVue } from 'ag-grid-vue'
import moduleUserManagement from '@/store/user-management/moduleUserManagement.js'
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'
// Cell Renderer
import CellRendererLink from './cell-renderer/CellRendererLink.vue'
import typesJson from './types.json'
export default {
  name:'Types-list',
  data: () => {
    return {
      types: typesJson,
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
          field:'types.type_id',
          filter: true,
          checkboxSelection: true,
          headerCheckboxSelectionFilteredOnly: true,
          headerCheckboxSelection: true
        },

        {
          headerName: 'Types',
          field: 'types.type_name',
          filter: true
        },
        {
          headerName: 'Color',
          field: 'types.color',
          filter: true,
          cellRendererFramework:'CellRendererLink'
        },
        {
          headerName: 'Status',
          field: 'types.status',
          filter: true,
          cellRenderer : params => {
            return `<div> ${params.value === '0' ? 'InActive' : 'Active' }</div>`
          }
        }
      ],
      // Cell Renderer Components
      components: {
        CellRendererLink
      }

    }
  },
  computed:{
    TypesData () {
      return this.types
    }

  },
  components:{
    AgGridVue,
    CellRendererLink
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