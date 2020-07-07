<template>

  <div id="page-user-list">
          <site-add-new />
          <!-- <types-add-new /> -->
     <vs-tabs>
      <vs-tab label="Sites">
        <div class="con-tab-ejemplo">
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
                    <input type="checkbox" class="hidden" v-model="site_name_field" v-on:change="ColumnsShow($event)" id="site_name">
                    <svg class="hidden w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
                  </div>
                  <span class="select-none">Site Name</span>
                  </label>
                  <label class="custom-label flex">
                  <div class="bg-custom shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
                    <input type="checkbox" class="hidden" v-model="sin_field" v-on:change="ColumnsShow($event)" id="sin">
                    <svg class="hidden w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
                  </div>
                  <span class="select-none">SIN</span>
                  </label>
                  <label class="custom-label flex">
                  <div class="bg-custom shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
                    <input type="checkbox" class="hidden" v-model="location_field" v-on:change="ColumnsShow($event)" id="location">
                    <svg class="hidden w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
                  </div>
                  <span class="select-none">Location</span>
                  </label>
                </div>
                <div class="py-2 pr-2 w-1/2">
                  <label class="custom-label flex">
                  <div class="bg-custom shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
                    <input type="checkbox" class="hidden" v-model="status_field" v-on:change="ColumnsShow($event)" id="status">
                    <svg class="hidden w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
                  </div>
                  <span class="select-none">Status</span>
                  </label>
                  <label class="custom-label flex">
                  <div class="bg-custom shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
                    <input type="checkbox" class="hidden" v-model="check_calls_field" v-on:change="ColumnsShow($event)" id="check_calls">
                    <svg class="hidden w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
                  </div>
                  <span class="select-none">Check Calls</span>
                  </label>
                  <label class="custom-label flex">
                  <div class="bg-custom shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
                    <input type="checkbox" class="hidden" v-model="actions_field" v-on:change="ColumnsShow($event)" id="s_actions">
                    <svg class="hidden w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
                  </div>
                  <span class="select-none">Action</span>
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
        class="ag-theme-alpine w-100 my-4 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="usersData"
        rowSelection="multiple"
        colResizeDefault="shift"
        :animateRows="true"
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
      </vs-tab>
      <vs-tab label="Types">
        <div class="con-tab-ejemplo">
            <TypesList />
        </div>
      </vs-tab>  
    </vs-tabs>
    
  </div>

</template>

<script>
import { AgGridVue } from 'ag-grid-vue'
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'

import SiteAddNew from './SiteAddNew'
import TypesList from './Types/TypesList.vue'
import TypesAddNew from './Types/TypesAddNew.vue'
// Store Module
import moduleUserManagement from '@/store/user-management/moduleUserManagement.js'

// Cell Renderer
import CellRendererStatus from './cell-renderer/cellRendererStatus.vue'
import CellRendererActions from './cell-renderer/CellRendererActions.vue'


//
import sitesJson from './sites.json'

export default {
  components: {
    AgGridVue,

    // Cell Renderer
    CellRendererStatus,
    CellRendererActions,
    SiteAddNew,
    TypesList,
    TypesAddNew
  },
  data () {
    
    return {
      sites: sitesJson,
      activePrompt: false,
      site_name_field:true,
      sin_field:true,
      location_field:true,
      status_field:true,
      check_calls_field:true,
      actions_field:true,
      Site: {
        site_name: '',
        sin: '',
        location: '',
        status:'',
        check_calls:''
      },
      searchQuery: '',

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
          headerName: 'Site Name',
          field: 'Site Name',
          filter: true
          
        },
        {
          headerName: 'SIN',
          field: 'SIN',
          filter: true
        },
        {
          headerName: 'Client',
          field: 'Client',
          filter: true
        },
        {
          headerName: 'Location',
          field: 'Location',
          filter: true
        },
        {
          headerName: 'Status',
          field: 'Status',
          cellEditor : 'agSelectCellEditor',
          editable: true,
          filter: true
        },    
        {
          headerName: 'Check Calls',
          field: 'check_calls',
          filter: true
        }
      ],

      // Cell Renderer Components
      components: {
        CellRendererStatus,
        CellRendererActions
      }
    }
  },
  watch: {
    
    statusFilter (obj) {
      this.setColumnFilter('status', obj.value)
    }
   
  },
  computed: {
    usersData () {
      return this.sites
    },
    paginationPageSize () {
      if (this.gridApi) return this.gridApi.paginationGetPageSize()
      else return 50
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
        site_name: '',
        sin: '',
        location: '',
        status:'',
        check_calls:''
      })
    }, 
    addSite () {
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

      switch ($e.target.id) {

      case 'site_name':
        this.gridOptions.columnApi.setColumnVisible($e.target.id, !!this.site_name_field)
        this.gridOptions.api.sizeColumnsToFit()
        break
      case  'sin':
        this.gridOptions.columnApi.setColumnVisible($e.target.id, !!this.sin_field)
        this.gridOptions.api.sizeColumnsToFit()
        break
      case 'status':
        this.gridOptions.columnApi.setColumnVisible($e.target.id, !!this.status_field)
        this.gridOptions.api.sizeColumnsToFit()
        break
      case 'location':
        this.gridOptions.columnApi.setColumnVisible($e.target.id, !!this.location_field)
        this.gridOptions.api.sizeColumnsToFit()
        break  
      case  'check_calls':
        this.gridOptions.columnApi.setColumnVisible($e.target.id, !!this.check_calls_field)
        this.gridOptions.api.sizeColumnsToFit()
        break
      case  's_actions':
        this.gridOptions.columnApi.setColumnVisible($e.target.id, !!this.actions_field)
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
    // this.gridOptions.api.sizeColumnsToFit()
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
