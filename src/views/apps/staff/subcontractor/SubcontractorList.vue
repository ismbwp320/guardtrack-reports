
<template>

  <div id="page-user-list">
    <div class="flex justify-end">
      <ContractorAddNew />
    </div>
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

      </div>
      <!-- AgGrid Table -->
     
      <ag-grid-vue
        ref="agGridTable"
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
import ContractorAddNew from './ContractorAddNew'

// Store Module
import moduleUserManagement from '@/store/user-management/moduleUserManagement.js'

// Cell Renderer



export default {
  components: {
    AgGridVue,
    vSelect,
    ContractorAddNew,
  },
  data () {
    
    return {
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
          headerName: 'Subcontractor Name',
          field: 'subcont_name',
          filter: true,
        },
        {
          headerName: 'Short Code',
          field: 'short_code',
          filter: true,
        },
        {
          headerName: 'Phone',
          field: 'phone',
          filter: true,
        },
        {
          headerName: 'Email',
          field: 'email',
          filter: true,
        },
        {
          headerName: 'Address',
          field: 'address',
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
          field: 'actions',
          filter: true,

        }
      ],

     
    }
  },
  computed: {
    usersData () {
      return [{
        test:'test'
      }]
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
    setColumnFilter (column, val) {
      const filter = this.gridApi.getFilterInstance(column)
      let modelObj = null

      if (val !== 'all') {
        modelObj = { type: 'equals', filter: val }
      }

      filter.setModel(modelObj)
      this.gridApi.onFilterChanged()
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

.pagi-btn {
  border: none !important;
  border-radius: 0px !important;
  border-bottom: 1px solid #4596fb !important;
}
</style>
