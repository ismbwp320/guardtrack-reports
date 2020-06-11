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
    <staff-add-new />
    <!-- <vx-card ref="filterCard" title="Filters" class="user-list-filters mb-8" actionButtons @refresh="resetColFilters" @remove="resetColFilters">
      <div class="vx-row">
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">Role</label>
          <v-select :options="roleOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="roleFilter" class="mb-4 md:mb-0" />
        </div>
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">Status</label>
          <v-select :options="statusOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="statusFilter" class="mb-4 md:mb-0" />
        </div>
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">Verified</label>
          <v-select :options="isVerifiedOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="isVerifiedFilter" class="mb-4 sm:mb-0" />
        </div>
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">Department</label>
          <v-select :options="departmentOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="departmentFilter" />
        </div>
      </div>
    </vx-card> -->

    <div class="vx-card p-6">

      <div class="flex flex-wrap items-center">

        <!-- ITEMS PER PAGE -->
        <div class="flex-grow">
          <vs-dropdown vs-trigger-click class="cursor-pointer">
            <div class="p-4 border pagi-btn  border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
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
                    <input type="checkbox" class="hidden" v-model="toggle_checkboxes.officer_field" v-on:change="ColumnsShow($event)" id="officer">
                    <svg class="hidden w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
                  </div>
                  <span class="select-none">Officer</span>
                  </label>
                  <label class="custom-label flex">
                  <div class="bg-custom shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
                    <input type="checkbox" class="hidden" v-model="toggle_checkboxes.pin_field" v-on:change="ColumnsShow($event)" id="pin">
                    <svg class="hidden w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
                  </div>
                  <span class="select-none">Pin</span>
                  </label>
                  <label class="custom-label flex">
                  <div class="bg-custom shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
                    <input type="checkbox" class="hidden" v-model="toggle_checkboxes.email_field" v-on:change="ColumnsShow($event)" id="email">
                    <svg class="hidden w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
                  </div>
                  <span class="select-none">Email</span>
                  </label>
                  <label class="custom-label flex">
                  <div class="bg-custom shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
                    <input type="checkbox" class="hidden" v-model="toggle_checkboxes.phone_field" v-on:change="ColumnsShow($event)" id="phone">
                    <svg class="hidden w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
                  </div>
                  <span class="select-none">Phone</span>
                  </label>
                  <label class="custom-label flex">
                  <div class="bg-custom shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
                    <input type="checkbox" class="hidden" v-model="toggle_checkboxes.position_field" v-on:change="ColumnsShow($event)" id="position">
                    <svg class="hidden w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
                  </div>
                  <span class="select-none">Position</span>
                  </label>
                  <label class="custom-label flex">
                  <div class="bg-custom shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
                    <input type="checkbox" class="hidden" v-model="toggle_checkboxes.sia_no_field" v-on:change="ColumnsShow($event)" id="sia_no">
                    <svg class="hidden w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
                  </div>
                  <span class="select-none">SIA Number</span>
                  </label>
                  <label class="custom-label flex">
                  <div class="bg-custom shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
                    <input type="checkbox" class="hidden" v-model="toggle_checkboxes.location_field" v-on:change="ColumnsShow($event)" id="location">
                    <svg class="hidden w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
                  </div>
                  <span class="select-none">location</span>
                  </label>
                </div>
                <div class="py-2 pr-2 w-1/2">
                  
                  <label class="custom-label flex">
                  <div class="bg-custom shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
                    <input type="checkbox" class="hidden" v-model="toggle_checkboxes.added_date_field" v-on:change="ColumnsShow($event)" id="added_date">
                    <svg class="hidden w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
                  </div>
                  <span class="select-none">Added Date</span>
                  </label>
                  <label class="custom-label flex">
                  <div class="bg-custom shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
                    <input type="checkbox" class="hidden" v-model="toggle_checkboxes.contract_start_field" v-on:change="ColumnsShow($event)" id="contract_start_date">
                    <svg class="hidden w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
                  </div>
                  <span class="select-none">Contract Start Date</span>
                  </label>
                  <label class="custom-label flex">
                  <div class="bg-custom shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
                    <input type="checkbox" class="hidden" v-model="toggle_checkboxes.pay_rate_field" v-on:change="ColumnsShow($event)" id="pay_rate">
                    <svg class="hidden w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
                  </div>
                  <span class="select-none">Pay Rate</span>
                  </label>
                  <label class="custom-label flex">
                  <div class="bg-custom shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
                    <input type="checkbox" class="hidden" v-model="toggle_checkboxes.status_field" v-on:change="ColumnsShow($event)" id="status">
                    <svg class="hidden w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
                  </div>
                  <span class="select-none">Status</span>
                  </label>
                  <label class="custom-label flex">
                  <div class="bg-custom shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
                    <input type="checkbox" class="hidden" v-model="toggle_checkboxes.staff_actions_field" v-on:change="ColumnsShow($event)" id="s_actions">
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
      <!-- AgGrid Table -->
     
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
import vSelect from 'vue-select'
import StaffAddNew from './StaffAddNew'

// Store Module
import moduleUserManagement from '@/store/user-management/moduleUserManagement.js'

// Cell Renderer
import CellRendererLink from '../user/user-list/cell-renderer/CellRendererLink.vue'
import CellRendererStatus from '../user/user-list/cell-renderer/CellRendererStatus.vue'
import CellRendererVerified from '../user/user-list/cell-renderer/CellRendererVerified.vue'
import CellRendererActions from '../user/user-list/cell-renderer/CellRendererActions.vue'


export default {
  components: {
    AgGridVue,
    vSelect,

    // Cell Renderer
    CellRendererLink,
    CellRendererStatus,
    CellRendererVerified,
    CellRendererActions,
    StaffAddNew
  },
  data () {
    
    return {

        toggle_checkboxes:{

          officer_field:true,
          pin_field:true,
          email_field:true,
          phone_field:true,
          position_field:true,
          sia_no_field:true,
          location_field:true,
          added_date_field:true,
          contract_start_field:true,
          pay_rate_field:true,
          status_field:true,
          staff_actions_field:true
          
        },
      activePrompt: false,
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
      // Filter Options
      roleFilter: { label: 'All', value: 'all' },
      roleOptions: [
        { label: 'All', value: 'all' },
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
        { label: 'Staff', value: 'staff' }
      ],

      statusFilter: { label: 'All', value: 'all' },
      statusOptions: [
        { label: 'All', value: 'all' },
        { label: 'Active', value: 'active' },
        { label: 'Deactivated', value: 'deactivated' },
        { label: 'Blocked', value: 'blocked' }
      ],

      isVerifiedFilter: { label: 'All', value: 'all' },
      isVerifiedOptions: [
        { label: 'All', value: 'all' },
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ],

      departmentFilter: { label: 'All', value: 'all' },
      departmentOptions: [
        { label: 'All', value: 'all' },
        { label: 'Sales', value: 'sales' },
        { label: 'Development', value: 'development' },
        { label: 'Management', value: 'management' }
      ],

      searchQuery: '',

      // AgGrid
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
          headerName: 'Officer',
          field: 'officer',
          filter: true,
        },
        {
          headerName: 'Pin',
          field: 'pin',
          filter: true,
        },
        {
          headerName: 'Email',
          field: 'email',
          filter: true,
        },
        {
          headerName: 'Phone',
          field: 'phone',
          filter: true,
        },
        {
          headerName: 'Position',
          field: 'position',
          filter: true,
        },
        {
          headerName: 'SIA Number',
          field: 'sia_no',
          filter: true,
        },
        
        {
          headerName: 'Location',
          field: 'location',
          filter: true,
  
        },
        {
          headerName: 'Added Date',
          field: 'added_date',
          filter: true,
        },
        {
          headerName: 'Contract Start Date',
          field: 'contract_start_date',
          filter: true,

        },
        {
          headerName: 'Pay Rate',
          field: 'pay_rate',
          filter: true,

        },
        {
          headerName: 'Status',
          field: 'status',
          filter: true,

        },
    
        {
          headerName: 'Actions',
          field: 's_actions',
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
    roleFilter (obj) {
      this.setColumnFilter('role', obj.value)
    },
    statusFilter (obj) {
      this.setColumnFilter('status', obj.value)
    },
    isVerifiedFilter (obj) {
      const val = obj.value === 'all' ? 'all' : obj.value === 'yes' ? 'true' : 'false'
      this.setColumnFilter('is_verified', val)
    },
    departmentFilter (obj) {
      this.setColumnFilter('department', obj.value)
    }
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
        name: '',
        phone: '',
        mobile: '',
        city:'',
        postCode:'',
        country:'',
        email: '',
        desc: ''
      })
    },
    ColumnsShow ($e) {
      switch($e.target.id) {

        case 'officer':
          this.gridOptions.columnApi.setColumnVisible($e.target.id, this.toggle_checkboxes.officer_field ? false:true)
          this.gridOptions.api.sizeColumnsToFit()
          break;
        case  'pin':
          this.gridOptions.columnApi.setColumnVisible($e.target.id, this.toggle_checkboxes.pin_field ? true:false)
          this.gridOptions.api.sizeColumnsToFit()
          break
        case 'email':
          this.gridOptions.columnApi.setColumnVisible($e.target.id, this.toggle_checkboxes.email_field? true:false)
          this.gridOptions.api.sizeColumnsToFit()
          break;
        case  'phone':
          this.gridOptions.columnApi.setColumnVisible($e.target.id, this.toggle_checkboxes.phone_field ? true:false)
          this.gridOptions.api.sizeColumnsToFit()
          break
        case 'position':
          this.gridOptions.columnApi.setColumnVisible($e.target.id, this.toggle_checkboxes.position_field ? true:false)
          this.gridOptions.api.sizeColumnsToFit()
          break;
        case  'sia_no':
          this.gridOptions.columnApi.setColumnVisible($e.target.id, this.toggle_checkboxes.sia_no_field ? true:false)
          this.gridOptions.api.sizeColumnsToFit()
          break
        case  'location':
          this.gridOptions.columnApi.setColumnVisible($e.target.id, this.toggle_checkboxes.location_field? true:false)
          this.gridOptions.api.sizeColumnsToFit()
          break  
        case  'added_date':
          this.gridOptions.columnApi.setColumnVisible($e.target.id, this.toggle_checkboxes.added_date_field? true:false)
          this.gridOptions.api.sizeColumnsToFit()
          break
        case  'contract_start_date':
          this.gridOptions.columnApi.setColumnVisible($e.target.id, this.toggle_checkboxes.contract_start_field? true:false)
          this.gridOptions.api.sizeColumnsToFit()
          break
        case  'pay_rate':
          this.gridOptions.columnApi.setColumnVisible($e.target.id, this.toggle_checkboxes.pay_rate_field? true:false)
          this.gridOptions.api.sizeColumnsToFit()
          break
        case  'status':
          this.gridOptions.columnApi.setColumnVisible($e.target.id, this.toggle_checkboxes.status_field? true:false)
          this.gridOptions.api.sizeColumnsToFit()
          break
        case  's_actions':
        this.gridOptions.columnApi.setColumnVisible($e.target.id, this.toggle_checkboxes.staff_actions_field? true:false)
        this.gridOptions.api.sizeColumnsToFit()
          break                  
        default:
          console.log('No matched')
      }        
    },
    addStaff () {
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
    testt () {
      // this.fileteredColumn = this.columnDefs.filter(item => {
      //   return this.hide_show.includes(item.field)
      // })
      
      this.gridOptions.columnApi.setColumnsVisible(this.hide_show, false)
      this.gridOptions.api.sizeColumnsToFit()
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
</style>
