<template>
  <div id="page-user-list">
    <client-add-new />
    <vs-prompt
        title="Update Client"
        accept-text= "Update Client"
        button-cancel = "border"
        :is-valid="validateForm"
        :active.sync="activePrompt">
        <div>
            <form>
                <div class="vx-row">
                    <div class="vx-col w-full">
                      <div class="flex flex-row bg-gray-200">
                        <div class="py-2 pr-2">
                           <vs-input v-validate="'required'" name="c_name" class="w-full mb-4 mt-5" placeholder="Client name" v-model="clientLocal.name" :color="validateForm ? 'success' : 'danger'" />
                        </div>
                        <div class="py-2 pr-2">
                           <vs-input v-validate="'required'" name="c_phone" class="w-full mb-4 mt-5" placeholder="Phone" v-model="clientLocal.phone" :color="validateForm ? 'success' : 'danger'" />
                        </div>
                        <div class="py-2">
                            <vs-input v-validate="'required'" name="c_mobile" class="w-full mb-4 mt-5" placeholder="Mobile" v-model="clientLocal.mobile" :color="validateForm ? 'success' : 'danger'" />
                        </div>
                      </div>
                      <vs-textarea rows="5" label="Address" v-model="clientLocal.desc" />
                      <div class="flex flex-row bg-gray-200">
                          <div class="py-2 pr-2 w-1/2">
                              <vs-input v-validate="'required'" name="c_email" class="w-full mb-4 mt-5" placeholder="Email" v-model="clientLocal.email" :color="validateForm ? 'success' : 'danger'" />
                          </div>
                          <div class="py-2 pr-2 w-1/2">
                             <vs-input v-validate="'required'" name="c_post_code" class="w-full mb-4 mt-5" placeholder="Post Code" v-model="clientLocal.postCode" :color="validateForm ? 'success' : 'danger'" />
                          </div>
                      </div>
                      <div class="flex flex-row bg-gray-200">
                          <div class="py-2 pr-2 w-1/2">
                               <vs-input v-validate="'required'" name="c_city" class="w-full mb-4 mt-5" placeholder="City/Town" v-model="clientLocal.city" :color="validateForm ? 'success' : 'danger'" />
                          </div>
                          <div class="py-2 pr-2 w-1/2">
                               <vs-input v-validate="'required'" name="c_country" class="w-full mb-4 mt-5" placeholder="Country" v-model="clientLocal.country" :color="validateForm ? 'success' : 'danger'" />
                          </div>
                      </div>
                         
                    </div>
                </div>

            </form>
        </div>
    </vs-prompt>
    <div class="vx-card p-6">
      <div class="flex flex-wrap items-center">
        <!-- ITEMS PER PAGE -->
        <div class="flex-grow">
          <vs-dropdown vs-trigger-click class="cursor-pointer">
            <div class="p-4 border pagi-btn border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
              <span class="mr-2">{{ paginationMask }}</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>
            <vs-dropdown-menu>
              <vs-dropdown-item v-for="n in 5" :key="n" @click="gridApi.paginationSetPageSize(n*50)">
                <span>{{ n*50 }}</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>

        <!-- QUICK SEARCH -->
        <vs-input class="sm:mr-4 mr-0 sm:w-auto w-full sm:order-normal order-3 sm:mt-0 mt-4 ag-search" v-model="searchQuery" @input="updateSearchQuery" placeholder="Search..." />  
      </div>

      <!-- AgGrid Table -->
      <ag-grid-vue
        ref="agGridTable"
        :modules="modules"
        :components="components"
        :gridOptions="gridOptions"
        class="ag-theme-alpine w-100 my-4 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="usersData"
        rowGroupPanelShow="always"
        pivotPanelShow="always"
        :allowContextMenuWithControlKey="true"
        :getContextMenuItems="getContextMenuItems"
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

</template>

<script>
import { AgGridVue } from '@ag-grid-community/vue'
import { AllModules } from '@ag-grid-enterprise/all-modules'
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'
import '@ag-grid-community/core/dist/styles/ag-grid.css'
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css'

import ClientAddNew from './clientAddNew'

// Store Module
import moduleUserManagement from '@/store/user-management/moduleUserManagement.js'

// Cell Renderer
import CellRendererLink from './cell-renderer/CellRendererLink.vue'
import CellRendererStatus from './cell-renderer/CellRendererStatus.vue'
import CellRendererVerified from './cell-renderer/CellRendererVerified.vue'


//


export default {
  components: {
    AgGridVue,

    // Cell Renderer
    CellRendererLink,
    CellRendererStatus,
    CellRendererVerified,
    ClientAddNew
  },
  data () {
    
    return {
      modules: AllModules,
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
          cellRendererFramework:'CellRendererLink'
          
        },
        {
          headerName: 'Phone',
          field: 'c_phone',
          filter: true
        },
        {
          headerName: 'Mobile',
          field: 'c_mobile',
          filter: true
        },
        {
          headerName: 'Address',
          field: 'c_address',
          filter: true
        },
        
        {
          headerName: 'Email',
          field: 'c_email',
          filter: true
        },
        {
          headerName: 'Status',
          field: 'c_status',
          cellEditor : 'agSelectCellEditor',
          cellEditorParams : {
            values: ['active', 'inactive']
          },
          editable: true,
          filter: true,
          cellRendererFramework: 'CellRendererStatus'
        }
      ],

      // Cell Renderer Components
      components: {
        CellRendererLink,
        CellRendererStatus,
        CellRendererVerified
      }
    }
  },
  watch: {
    
    statusFilter (obj) {
      this.setColumnFilter('c_status', obj.value)
    }
   
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.clientLocal.name !== ''
    },
    paginationMask () {
      const d = this.currentPage * this.paginationPageSize
      const dataLength = this.usersData.length
      return `${d - (this.paginationPageSize - 1)} - ${dataLength - d > 0 ? d : dataLength} of ${dataLength}`
    },
    usersData () {
      return this.$store.state.userManagement.users
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
    getContextMenuItems (params) {
      const result = [
        {
          name: 'Update',
          action: () => {
            this.activePrompt = true
            const data = params.node.data
            this.clientLocal = {
              name: data.c_name,
              phone: data.c_phone,
              mobile: data.c_mobile,
              city: data.c_city,
              postCode: data.c_postCode,
              country: data.c_country,
              email: data.c_email,
              desc: data.c_address
            }
            // this.clientLocal = params.node.data
          }
        },
        'separator',
        'copy',
        'separator',
        'paste',
        'separator',
        'export'
      ]
      return result
    },
    updateSearchQuery (val) {
      this.gridApi.setQuickFilter(val)
    }
  },
  mounted () {
    this.gridApi = this.gridOptions.api
    this.gridOptions.api.sizeColumnsToFit()
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
