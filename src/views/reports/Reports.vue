<template>
  <div id="page-user-list">
    <div class="flex justify-end">
    </div>
    <!-- Filter SideBar -->
    <div id="filter-sidebar">
      <vs-button
        @click="activeHandler"
        class="customizer-btn"
        icon="icon-settings"
        icon-pack="feather"
        color="primary"
        type="filled"
      />

      <vs-sidebar
        click-not-close
        parent=".parentx"
        hidden-background
        position-right
        v-model="active"
        class="items-no-padding">
        <div class="h-full" style="overflow:scroll">
          <div class="customizer-header mt-6 flex items-center justify-between px-6">
            <div>
              <h4>SHIFT LIST FILTERS</h4>
              <small>Customize Filters and Columns</small>
            </div>
            <feather-icon icon="XIcon" @click.stop="active = false" class="cursor-pointer"></feather-icon>
          </div>
          <vs-divider class="mb-2" />
          <div class="scroll-area--customizer pt-4 pb-6">
            <div class="px-6">
              <vs-tabs>
                <vs-tab label="Filters">
                  <vs-input class="input-block" v-model="searchModel" placeholder="Search..." />
                  <div class="con-tab-ejemplo">
                    <template v-for="(column, index) in filterColumns">
                      <template v-if="column.children">
                        <vs-collapse class="vs-collapse-sidebar" :key="index">
                          <template v-for="(child, index) in column.children">
                            <vs-collapse-item  :key="index" v-if="child.headerName && child.filter !== false">
                              <div slot="header">
                                {{child.headerName}}
                              </div>
                              <template>
                              <vs-input
                                @input="filterSearch(child.headerName, filterSearchQuery[child.headerName.replace(/\s+/g, '')])"
                                v-model="filterSearchQuery[child.headerName.replace(/\s+/g, '')]"
                                class="w-full sm:order-normal order-3 mb-4 ag-search" placeholder="Search..."/>
                                <label  class="custom-label flex">
                                  <div class="bg-custom shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
                                    <input type="checkbox" :class="child.headerName.replace(/\s+/g, '')" :checked="child.filterAll" class="hidden" v-on:change="selectNothing(child.headerName, filters[child.headerName])">
                                    <svg class="hidden w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
                                  </div>
                                  <span class="select-none">Select All</span>
                                </label>
                                <template v-for="(item, index) in filters[child.field]">
                                  <label :key="index"  class="custom-label flex">
                                    <div class="bg-custom shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
                                      <input type="checkbox" :class="child.headerName.replace(/\s+/g, '')"  class="hidden">
                                      <svg class="hidden w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
                                    </div>
                                    <span class="select-none">{{item}}</span>
                                  </label>
                                </template>
                              </template>
                            </vs-collapse-item>
                          </template>
                        </vs-collapse>
                      </template>
                      <div v-else :key="index"></div>
                    </template>
                  </div>
                </vs-tab>
                <vs-tab label="Columns">
                  <div class="con-tab-ejemplo">
                    <vs-collapse class="vs-collapse-sidebar">
                      <template v-for="(column, index) in columnDefs">
                        <vs-collapse-item v-if="column.children" :key="index">
                          <div slot="header">
                            <label :key="index" class="custom-label flex">
                              <div class="bg-custom shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
                                <input type="checkbox" :checked="column.active" class="hidden" v-on:change="colCheckBoxHandler(column.children, column.active, column.groupId)">
                                <svg class="hidden w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
                              </div>
                              <span>{{column.headerName}}</span>
                            </label> 
                          </div>
                          <template v-for="(child, index) in column.children">
                            <label :key="index" class="custom-label flex">
                              <div class="bg-custom shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
                                <input type="checkbox" :checked="!child.hide" class="hidden" v-on:change="clickHandler(child.field, column.groupId)">
                                <svg class="hidden w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
                              </div>
                              <span draggable="true" v-on:dragstart="onDragStart($event, child.headerName)" class="cursor-pointer select-none">
                                <vs-icon icon="icon-grid" icon-pack="feather"></vs-icon>
                                {{child.headerName}}</span>
                            </label>
                          </template>
                        </vs-collapse-item>
                      </template>
                      </vs-collapse>
                  </div>
                  <div class="ag-column-drop__row">
                    <div class="ag-row-title">
                      <span class="ag-column-drop-title ag-column-drop-vertical-title">Row Groups</span>
                    </div>
                    <div class="ag-column-drop-content" v-on:dragover="onDragOver($event)" v-on:drop="onDrop($event)">
                      <div v-if="rowGroups.length">
                        <div v-for="(row, index) in rowGroups" :key="index">
                          <div class="row-group-btn" @click="dsRowGroup(row)">
                            <span>{{row}}</span>
                            <feather-icon icon="XIcon" class="close-icon cursor-pointer"></feather-icon> 
                          </div>
                        </div>
                      </div>
                      <span class="emplty-span" v-else>
                          Drag here to set row groups
                      </span>
                    </div>
                  </div>
                  <div class="ag-column-drop__row">
                    <div class="ag-row-title">
                      <span class="ag-column-drop-title ag-column-drop-vertical-title">Values</span>
                    </div>
                    <div class="ag-column-drop-content" v-on:dragover="onDragOver($event)" v-on:drop="onVlaueDrop($event)">
                      <div v-if="aggregateValues.length">
                        <div v-for="(row, index) in aggregateValues" :key="index">
                          <div class="row-group-btn" @click="dsAggregateValues(row)">
                            <span>{{row}}</span>
                            <feather-icon icon="XIcon" class="close-icon cursor-pointer"></feather-icon>  
                          </div>
                        </div>
                      </div>
                      <span class="emplty-span" v-else>
                          Drag here to set row groups
                      </span>
                    </div>
                  </div>
                </vs-tab>
                <vs-tab label="Custom Columns">
                  <div class="con-tab-ejemplo">
                    <div class="vs-list"  v-if="customColumns.length > 0">
                      <div class="vs-list--header vs-header-list-success">
                        <div class="list-titles">
                          <div class="vs-list--title">Custom Columns</div>
                        </div>
                      </div>
                      <div class="vs-list--item" v-for="(column, index) in customColumns" :key="index">
                        <div class="list-titles">
                          <vs-input v-if="column.edit" class="input-block" v-model="customColumnsEdit[index]" placeholder="Column Name" />
                          <div v-else class="vs-list--title">{{column.field}}</div>
                        </div>
                        <div class="vs-list--slot">
                          <div class="d-flex">
                            <vs-button v-if="column.edit" @click="updateCustomColumn(column, index)" class="mx-1" size="small" icon="icon-check" icon-pack="feather"/>
                            <vs-button v-else @click="editCustomColumn(index)" class="mx-1" size="small" icon="icon-edit-2" icon-pack="feather"/>
                            <vs-button @click="removeCustomColumnsHandler(column)" size="small" icon="icon-trash-2" icon-pack="feather"/>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- Custom Column Add To Ag-grid -->
                    <vx-card title="Custom Field">
                      <div>
                        <vs-input class="input-block" v-model="columnName" placeholder="Column Name" />
                      </div>
                      <template slot="footer">
                        <div class="flex justify-between">
                          <div></div>
                          <vs-button size="medium" @click="addColumnHandler" color="primary" type="filled">Add Custom Column</vs-button>
                        </div>
                      </template>
                    </vx-card> 
                    <!-- /Custom Column Add To Ag-grid -->
                  </div>
                </vs-tab>
              </vs-tabs>
            </div>
          </div>
        </div>
      </vs-sidebar>
    </div>
    <!-- End Filter SideBar -->
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
        <!-- TABLE ACTION COL-2: SEARCH & EXPORT AS CSV -->
          <vs-input class="sm:mr-4 mr-0 sm:w-auto w-full sm:order-normal order-3 sm:mt-0 mt-4 ag-search" v-model="searchQuery" @input="updateSearchQuery" placeholder="Search..." />
      </div>
      <div>
    </div>
      <ag-grid-vue
        ref="agGridTable"
        :modules="modules"
        :gridOptions="gridOptions"
        @grid-ready="onGridReady"
        class="ag-theme-alpine w-100 my-4 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="usersData"
        :rowSelection="rowSelection"
        :rowGroupPanelShow="rowGroupPanelShow"
        :pivotPanelShow="pivotPanelShow"
        colResizeDefault="shift"
        :rowDragManaged="true"
        :suppressMoveWhenRowDragging="true"
        :animateRows="true"
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :suppressPaginationPanel="true"
        :frameworkComponents="frameworkComponents"
        :allowContextMenuWithControlKey="true"
        :statusBar="statusBar"
        :sideBar="sideBar">
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
import '@ag-grid-community/core/dist/styles/ag-grid.css'
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css'
// Store Module
import _ from 'lodash'
import {agGridMixins} from '@/mixins/agGridMixins'
import {sharedFunctions} from '@/mixins/sharedFunctions'
//
import usersJson from './users.json'

export default {
  mixins: [agGridMixins, sharedFunctions],
  components: {
    AgGridVue
  },
  data () {
    
    return {
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
          headerName: 'Reports',
          groupId: 0,
          active: true,
          children: [
            {
              headerName: 'Client',
              field: 'Client',
              filter: true
              
            },
            {
              headerName: 'Charge Hours',
              field: 'Charge Hours',
              filter: true
            },
            {
              headerName: 'Pay Hours',
              field: 'Pay Hours',
              filter: true
            },
            {
              headerName: 'Hours Difference',
              field: 'Hours Difference',
              filter: true,
              cellRenderer : params => {
                console.log(params)
                return params.data['Pay Hours'] - params.data['Charge Hours']
              }
            },
            {
              headerName: 'Charge Amount',
              field: 'Charge Amount',
              filter: true
              
            },
            {
              headerName: 'Pay Amount',
              field: 'Pay Amount',
              filter: true
            },
            {
              headerName: 'Profit',
              field: 'Profit',
              filter: true
            },
            {
              headerName: 'Invoice',
              field: 'Invoice',
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
  beforeMount () {
    this.statusBar = {
      statusPanels: [
        {
          statusPanel: 'agAggregationComponent',
          statusPanelParams: {
            aggFuncs: ['sum', 'min', 'max', 'avg']
          }
        }
      ]
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
    this.aggregateValues = ['Pay Amount', 'Profit', 'Charge Amount', 'Pay Hours', 'Charge Hours']
    this.rowGroups = ['Client']
    this.gridOptions.columnApi.addRowGroupColumns(this.rowGroups)
    this.gridOptions.columnApi.addValueColumns(this.aggregateValues)
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
