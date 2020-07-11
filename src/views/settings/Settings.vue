<template>
  <div id="page-user-list">
      <div class="vx-card p-6">
            <vs-tabs>
                <vs-tab label="GT Sync">
                    <div class="tab-text">
                      <p class="my-2">GT Sync Android mobile SMS application enables Guardtrack to send SMS notifications to staff.</p>
                      <div>
                          <p class="font-semibold my-3">Create your login to enable SMS notifications service</p>
                        <vs-input class="sm:mr-4 mr-0 sm:w-auto pt-3 w-full sm:order-normal order-3 sm:mt-0 mt-4" v-model="searchQuery"  placeholder="Email" />
                        <vs-input class="sm:mr-4 mr-0 sm:w-auto pt-3 w-full sm:order-normal order-3 sm:mt-0 mt-4" v-model="searchQuery"  placeholder="Password" />
                        <vs-button class="mt-3">Save</vs-button>
                      </div>
                    </div>
                </vs-tab>
                <vs-tab label="Time Clock">
                    <div class="tab-text">
                      <p class="my-2">Failed Book on / book off notifications. Notify the manager when someone has not booked on / book off.</p>
                      <div>
                          <p class="font-semibold">Mobile Number:</p>
                        <vs-input class="sm:mr-4 mr-0 sm:w-auto pt-3 w-full sm:order-normal order-3 sm:mt-0 mt-4" v-model="searchQuery"  placeholder="Mobile Number" />
                        <vs-button class="mt-3">Save</vs-button>
                      </div>
                    </div>
                </vs-tab>
                <vs-tab label="Permissions">
                    <div class="tab-text">
                        <p class="font-semibold my-3">Manage your Permissions.</p>
                        <vs-table :data="users">

                            <template slot="thead">
                                <vs-th>Description</vs-th>
                                <vs-th>Controller</vs-th>
                                <vs-th>Manager</vs-th>
                                <vs-th>Super User</vs-th>
                            </template>

                            <template slot-scope="{data}">
                                <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                                    <vs-td>
                                        Can manage settings?
                                    </vs-td>
                                    <vs-td>
                                      <vs-switch v-model="switch1">
                                          <span slot="on">On</span>
                                          <span slot="off">Off</span>
                                      </vs-switch>
                                    </vs-td>
                                    <vs-td>
                                      <vs-switch v-model="switch1">
                                          <span slot="on">On</span>
                                          <span slot="off">Off</span>
                                      </vs-switch>
                                    </vs-td>
                                    <vs-td>
                                      <vs-switch v-model="switch1">
                                          <span slot="on">On</span>
                                          <span slot="off">Off</span>
                                      </vs-switch>
                                    </vs-td>
                                </vs-tr>
                            </template>
                        </vs-table>
                      </div>
                </vs-tab>
                <vs-tab label="Credit Card">
                    <div class="tab-text">
                        <ul class="vx-timeline  mt-5">
                            <li>
                                <div class="timeline-info">
                                    <p class="font-semibold">Manage your credit card information.</p>
                                    <p class="activity-desc mt-2">BILLING INFORMATION</p>
                                </div>
                                 <p class="activity-desc mt-2">No card added</p>
                            </li>
                        </ul>
                      </div>
                </vs-tab>
            </vs-tabs>
      <div>
    </div>
    </div>
  </div>

</template>

<script>
import { AgGridVue } from 'ag-grid-vue'
import { AllModules } from '@ag-grid-enterprise/all-modules'
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'
// Store Module

import {agGridMixins} from '@/mixins/agGridMixins'
import {sharedFunctions} from '@/mixins/sharedFunctions'
import AddNewUser from './AddNewUser'
//
import usersJson from './users.json'

export default {
  mixins: [agGridMixins, sharedFunctions],
  components: {
    AgGridVue,
    AddNewUser
  },
  data () {
    
    return {
      switch1: false,
      users: usersJson,
      shiftModel: {},
      activeOfficer: '',
      activeOfficerPrompt: false,
      activePrompt: false,
      pinTop: [],
      pinBottom: [],
      clearDisable: true,
      contextFilters: {
        clients: false,
        officer: false,
        sites: false,
        date: false
      },
      sideBar: null,
      statusBar: null,
      modules: AllModules,
      gridApi: null,
      columnApi: null,
      frameworkComponents: null,
      detailCellRendererParams: null,
      rowSelection: null,
      filters: {},
      filterSearchQuery: {},
      searchQuery: '',
      rowGroupPanelShow: 'always',
      pivotPanelShow: 'always',
      settings: {
        maxScrollbarLength : 60,
        wheelSpeed         : .60
      },
      // AgGrid
      gridOptions: {
        masterDetail: true,
        enableFillHandle: true,
        enableRangeSelection: true,
        undoRedoCellEditing: true,
        undoRedoCellEditingLimit: 20,
        enableCellChangeFlash: true

      },
      defaultColDef: {
        sortable: true,
        resizable: true,
        enableRowGroup: true,
        enablePivot: true,
        enable: true,
        filter: true,
        flex: 1
      },
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
      columnDefs: [
        {
          headerName: 'Users',
          groupId: 0,
          active: true,
          children: [
            {
              headerName: 'Name',
              field: 'fullname',
              filter: true
              
            },
            {
              headerName: 'Email',
              field: 'email',
              filter: true
            },
            {
              headerName: 'Number',
              field: 'mobile',
              filter: true
            },
            {
              headerName: 'Role',
              field: 'role',
              filter: true
            },
            {
              headerName: 'Status',
              field: 'active',
              filter: true
            },
            {
              headerName: 'Last Login',
              field: 'last_login',
              filter: true
            },
            {
              headerName: 'Location',
              field: 'ip',
              filter: true
            }
          ]
        }
      ],

      // Cell Renderer Components
      components: {
      }
    }
  },
  computed: {
    usersData () {
      return this.users
    }
  },
  mounted () {
    for (const key in this.usersData[0]) {
      if (_.isObject(this.usersData[0][key])) {
        for (const key2 in this.usersData[0][key]) {
          const d = `${key}.${key2}`
          this.filters[d] = [... new Set(this.usersData.map((v) =>  v[key][key2]))] 
        }
      } else {
        this.filters[key] = [... new Set(this.usersData.map((v) =>  v[key]))] 
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
    updateSearchQuery (val) {
      this.gridApi.setQuickFilter(val)
    },
    onGridReady (params) {
      params.api.sizeColumnsToFit()
    }
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
