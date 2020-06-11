<!-- =========================================================================================
  File Name: UserList.vue
  Description: User List page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>

  <div id="page-user-list">
    <user-filter  />
    <client-add-new />
    

    <div class="vx-card p-6">

      <div class="flex flex-wrap items-center">

        <!-- ITEMS PER PAGE -->
        <div class="flex-grow">
          <vs-dropdown vs-trigger-click class="cursor-pointer">
            <div class="p-4 border pagi-btn border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
              <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ usersData.length - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : usersData.length }} of {{ usersData.length }}</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>
            <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
            <vs-dropdown-menu>

              <vs-dropdown-item @click="gridApi.paginationSetPageSize(10)">
                <span>10</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(20)">
                <span>20</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(25)">
                <span>25</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(30)">
                <span>30</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>

        <!-- TABLE ACTION COL-2: SEARCH & EXPORT AS CSV -->
          <vs-input class="sm:mr-4 mr-0 sm:w-auto w-full sm:order-normal order-3 sm:mt-0 mt-4 ag-search" v-model="searchQuery" @input="updateSearchQuery" placeholder="Search..." />
          <!-- <vs-button class="mb-4 md:mb-0" @click="gridApi.exportDataAsCsv()">Export as CSV</vs-button> -->
          <vs-button  icon="icon-eye" @click="activePrompt = true" icon-pack="feather" />
          
      </div>


      <!-- AgGrid Table -->
      <div>
        
        <vs-prompt
            title="Choose Colums"
            accept-text= "Apply"
            button-cancel = "border"
            @cancel="clearFields"
            @accept="ColumnsShow"
            @close="clearFields"
            :active.sync="activePrompt">
            <div>
              <div class="flex flex-row bg-gray-200">
                <div class="py-2 pr-2 w-1/2">
                  <label class="custom-label flex">
                  <div class="bg-custom shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
                    <input type="checkbox" class="hidden" v-model="client_name_field" v-on:change="ColumnsShow($event)" id="c_name">
                    <svg class="hidden w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
                  </div>
                  <span class="select-none">Client name</span>
                  </label>
                  <label class="custom-label flex">
                  <div class="bg-custom shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
                    <input type="checkbox" class="hidden" v-model="client_phone_field" v-on:change="ColumnsShow($event)" id="c_phone">
                    <svg class="hidden w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
                  </div>
                  <span class="select-none">Phone</span>
                  </label>
                  <label class="custom-label flex">
                  <div class="bg-custom shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
                    <input type="checkbox" class="hidden" v-model="client_mobile_field" v-on:change="ColumnsShow($event)" id="c_mobile">
                    <svg class="hidden w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
                  </div>
                  <span class="select-none">Mobile</span>
                  </label>
                  <label class="custom-label flex">
                  <div class="bg-custom shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
                    <input type="checkbox" class="hidden" v-model="client_address_field" v-on:change="ColumnsShow($event)" id="c_address">
                    <svg class="hidden w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
                  </div>
                  <span class="select-none">Address</span>
                  </label>
                </div>
                <div class="py-2 pr-2 w-1/2">
                  <label class="custom-label flex">
                  <div class="bg-custom shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
                    <input type="checkbox" class="hidden" v-model="client_email_field" v-on:change="ColumnsShow($event)" id="c_email">
                    <svg class="hidden w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
                  </div>
                  <span class="select-none">Email</span>
                  </label>
                  <label class="custom-label flex">
                  <div class="bg-custom shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
                    <input type="checkbox" class="hidden" v-model="client_status_field" v-on:change="ColumnsShow($event)" id="c_status">
                    <svg class="hidden w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
                  </div>
                  <span class="select-none">Status</span>
                  </label>
                  <label class="custom-label flex">
                  <div class="bg-custom shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
                    <input type="checkbox" class="hidden" v-model="client_actions_field" v-on:change="ColumnsShow($event)" id="c_actions">
                    <svg class="hidden w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
                  </div>
                  <span class="select-none">Actions</span>
                  </label>
                </div>

              </div>
            </div>
        </vs-prompt>

        
        
      <!-- <button v-on:click="exportData" class="vs-component vs-button vs-button-primary vs-button-filled">Export</button> -->
          </div>
      <ag-grid-vue
        ref="agGridTable"
        :components="components"
        :gridOptions="gridOptions"
        class="ag-theme-material w-100 my-4 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="usersData"
        rowSelection="multiple"
        colResizeDefault="shift"
        :animateRows="true"
        :floatingFilter="true"
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :suppressPaginationPanel="true"
        :enableRtl="$vs.rtl">
      </ag-grid-vue>

      <vs-pagination
        :total="totalPages"
        :max="7"
        v-model="currentPage" />

    </div>
  </div>

</template>

<script>
import { AgGridVue } from 'ag-grid-vue'
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'

import ClientAddNew from './clientAddNew'
import UserFilter from '../UserFilter'

// Store Module
import moduleUserManagement from '@/store/user-management/moduleUserManagement.js'

// Cell Renderer
import CellRendererLink from './cell-renderer/CellRendererLink.vue'
import CellRendererStatus from './cell-renderer/CellRendererStatus.vue'
import CellRendererVerified from './cell-renderer/CellRendererVerified.vue'
import CellRendererActions from './cell-renderer/CellRendererActions.vue'


//



export default {
  components: {
    AgGridVue,

    // Cell Renderer
    CellRendererLink,
    CellRendererStatus,
    CellRendererVerified,
    CellRendererActions,
    ClientAddNew,
    UserFilter,
  },
  data () {
    
    return {
      activePrompt: false,
      client_name_field:true,
      client_phone_field:true,
      client_mobile_field:true,
      client_address_field:true,
      client_email_field:true,
      client_status_field:true,
      client_actions_field:true,
      clientLocal: {
        name: '',
        phone: '',
        mobile: '',
        city:'',
        postCode:'',
        country:'',
        email: '',
        desc: ''
      },
      

      statusFilter: { label: 'All', value: 'all' },
      statusOptions: [
        { label: 'All', value: 'all' },
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Blocked', value: 'blocked' }
      ],

    

      searchQuery: '',
      hide_show : [],
      fileteredColumn: [],

      // AgGrid
      gridApi: null,
      gridOptions: {
        rowClass:'animate-edit-icon'
      },
      defaultColDef: {
        sortable: true,
        resizable: true,
        suppressMenu: true
      },
      columnDefs: [
        {
          headerName: 'ID',
          field:'index',
          width: 100,
          filter: true,
          checkboxSelection: true,
          headerCheckboxSelectionFilteredOnly: true,
          headerCheckboxSelection: true
        },

        {
          headerName: 'Client name',
          field: 'c_name',
          filter: true,
          
        },
        {
          headerName: 'Phone',
          field: 'c_phone',
          filter: true,
        },
        {
          headerName: 'Mobile',
          field: 'c_mobile',
          filter: true,
        },
        {
          headerName: 'Address',
          field: 'c_address',
          filter: true,
        },
        
        {
          headerName: 'Email',
          field: 'c_email',
          filter: true,
        },
        {
          headerName: 'Status',
          field: 'c_status',
          cellEditor : 'agSelectCellEditor',
          cellEditorParams : {
            values: ['active','inactive']
          },
          editable: true,
          filter: true,
          cellRendererFramework: 'CellRendererStatus'
        },
        {
          headerName: 'Actions',
          field: 'c_actions',
          cellRendererFramework: 'CellRendererActions'
        }
      ],

      // Cell Renderer Components
      components: {
        CellRendererLink,
        CellRendererStatus,
        CellRendererVerified,
        CellRendererActions
      }
    }
  },
  watch: {
    
    statusFilter (obj) {
      this.setColumnFilter('c_status', obj.value)
    },
   
  },
  computed: {
    usersData () {
      return this.$store.state.userManagement.users
    },
    paginationPageSize () {
      if (this.gridApi) return this.gridApi.paginationGetPageSize()
      else return 10
    },
    totalPages () {
      if (this.gridApi) return this.gridApi.paginationGetTotalPages()
      else return 0
    },
    currentPage: {
      get () {
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
        else return 1
      },
      set (val) {
        this.gridApi.paginationGoToPage(val - 1)
      }
    }
  },
  methods: {
    clearFields () {
      Object.assign(this.clientLocal, {
        c_name: '',
        c_phone: '',
        c_mobile: '',
        c_city:'',
        c_postCode:'',
        c_country:'',
        c_email: '',
        c_desc: ''
      })
    }, 
    addClient () {
      this.$validator.validateAll().then(result => {
        if (result) {
          //this.$store.dispatch('client/addClient', Object.assign({}, this.clientLocal))
          this.clearFields()
        }
      })
    },
    setColumnFilter (column, val) {
      const filter = this.gridApi.getFilterInstance(column)
      let modelObj = null

      if (val !== 'all') {
        modelObj = { type: 'equals', filter: val }
      }

      filter.setModel(modelObj)
      this.gridApi.onFilterChanged()
    },
    ColumnsShow ($e) {
      // this.fileteredColumn = this.columnDefs.filter(item => {
      //   return this.hide_show.includes(item.field)
      // })

      switch($e.target.id) {

        case 'c_name':
          this.gridOptions.columnApi.setColumnVisible($e.target.id, this.client_name_field ? true:false)
          this.gridOptions.api.sizeColumnsToFit()
          break;
        case  'c_phone':
          this.gridOptions.columnApi.setColumnVisible($e.target.id, this.client_phone_field ? true:false)
          this.gridOptions.api.sizeColumnsToFit()
          break
        case 'c_mobile':
          this.gridOptions.columnApi.setColumnVisible($e.target.id, this.client_mobile_field ? true:false)
          this.gridOptions.api.sizeColumnsToFit()
          break;
        case  'c_address':
          this.gridOptions.columnApi.setColumnVisible($e.target.id, this.client_address_field ? true:false)
          this.gridOptions.api.sizeColumnsToFit()
          break
        case 'c_email':
          this.gridOptions.columnApi.setColumnVisible($e.target.id, this.client_email_field ? true:false)
          this.gridOptions.api.sizeColumnsToFit()
          break;
        case  'c_status':
          this.gridOptions.columnApi.setColumnVisible($e.target.id, this.client_status_field ? true:false)
          this.gridOptions.api.sizeColumnsToFit()
          break
        case  'c_actions':
          this.gridOptions.columnApi.setColumnVisible($e.target.id, this.client_actions_field ? true:false)
          this.gridOptions.api.sizeColumnsToFit()
          break
        
        default:
          console.log('No matched')


      }
      
      
      
    },
    resetColFilters () {
      // Reset Grid Filter
      this.gridApi.setFilterModel(null)
      this.gridApi.onFilterChanged()

      // Reset Filter Options
      this.roleFilter = this.statusFilter = this.isVerifiedFilter = this.departmentFilter = { label: 'All', value: 'all' }

      this.$refs.filterCard.removeRefreshAnimation()
    },
    updateSearchQuery (val) {
      this.gridApi.setQuickFilter(val)
    }
  },
  mounted () {
    this.gridApi = this.gridOptions.api
    this.gridOptions.api.sizeColumnsToFit();
    /* =================================================================
      NOTE:
      Header is not aligned properly in RTL version of agGrid table.
      However, we given fix to this issue. If you want more robust solution please contact them at gitHub
    ================================================================= */
    if (this.$vs.rtl) {
      const header = this.$refs.agGridTable.$el.querySelector('.ag-header-container')
      header.style.left = `-${  String(Number(header.style.transform.slice(11, -3)) + 9)  }px`
    }
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

<style lang="scss">
#page-user-list {
  .user-list-filters {
    .vs__actions {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-58%);
    }
  }
}
.pagi-btn {
  border: none !important;
  border-radius: 0px !important;
  border-bottom: 1px solid #4596fb !important;
}
.animate-edit-icon:hover .edit-animate{
  margin-right:1rem !important;
  opacity: 1;
  transition: all 1s;

}
.edit-animate{
  margin-right: -2rem !important;
  opacity: 0;
  color: rgb(111, 236, 111);
}
</style>
