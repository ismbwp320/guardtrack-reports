<template>
  <div id="shift__listing">
    <div class="pb-2 text-right">
      <vs-button @click="exportFileHandler" color="primary" type="filled">Export</vs-button>
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
                                <template v-if="child.headerName === 'Date'">
                                  <div class="d-flex">
                                    <vs-input type="date" v-model="fromDate" />
                                    <vs-input type="date" v-model="toDate" />
                                  </div>
                                  <vs-button  size="small"  class="my-3 mx-1" @click="inRangeHandler" color="primary" type="filled">Apply</vs-button>
                                </template>
                                <template v-else-if="child.headerName === 'Pay Rate'">
                                  <div class="d-flex">
                                    <vs-input type="Number" v-model="fromRate" />
                                    <vs-input type="Number" v-model="toRate" />
                                  </div>
                                  <vs-button  size="small"  class="my-3 mx-1" @click="payRateHandler" color="primary" type="filled">Apply</vs-button>                    
                                  <label v-for="(item, index) in filters[child.headerName]" :key="index"  class="custom-label flex">
                                    <div class="bg-custom shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
                                      <input type="checkbox" :class="child.headerName.replace(/\s+/g, '')" :checked="checkBoxHandler(child.headerName, item)" class="hidden" v-on:change="filterHandler(child.headerName, item)">
                                      <svg class="hidden w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
                                    </div>
                                    <span class="select-none">{{item}}</span>
                                  </label>
                                </template>
                                <template v-else-if="child.headerName === 'Status'">
                                  <div class="btn-group">
                                    <template v-for="(item, index) in filters[child.headerName]">
                                        <vs-button  size="small" :key="index" :class="{ inactive: activeItem[item] === false}" class="my-1" @click="filterHandler(child.headerName, item)"><span @click="selectItem(item)">{{item}}</span></vs-button>
                                    </template>
                                  </div>
                                </template>
                              <template v-else>
                                <template v-if="child.headerName === 'Charge Rate'">
                                  <div class="d-flex">
                                    <vs-input type="Number" v-model="fromChargeRate" />
                                    <vs-input type="Number" v-model="toChargeRate" />
                                  </div>
                                  <vs-button  size="small"  class="my-3 mx-1" @click="chargeRateHandler" color="primary" type="filled">Apply</vs-button>                                  
                                </template>
                              <vs-input
                                @input="filterSearch(child.headerName, filterSearchQuery[child.headerName.replace(/\s+/g, '')])"
                                v-model="filterSearchQuery[child.headerName.replace(/\s+/g, '')]"
                                class="w-full sm:order-normal order-3 mb-4 ag-search" placeholder="Search..."/>
                                <label  class="custom-label flex">
                                  <div class="bg-custom shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
                                    <input type="checkbox" checked class="hidden" v-on:change="selectNothing(child.headerName, filters[child.headerName])">
                                    <svg class="hidden w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
                                  </div>
                                  <span class="select-none">Select All</span>
                                </label>
                                <template v-for="(item, index) in filters[child.headerName]">
                                  <label :key="index"  class="custom-label flex">
                                    <div class="bg-custom shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
                                      <input type="checkbox" :class="child.headerName.replace(/\s+/g, '')" :checked="checkBoxHandler(child.headerName, item)" class="hidden" v-on:change="filterHandler(child.headerName, item)">
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
    <vs-prompt
        title="View Shift"
        button-cancel = "border"
        button-accept = "hidden"
        :active.sync="activePrompt">
        <div>
          {{shiftModel}}
        </div>
    </vs-prompt>
    <!-- Shift Listing -->
    <div class="vx-card p-6">
      <div class="flex flex-wrap items-center">
        <!-- Custom Pagination -->
        <div class="flex-grow">
          <vs-dropdown vs-trigger-click class="cursor-pointer">
            <div class="p-4 border pagi-btn d-theme-border-grey-light d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
              <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ usersData.length - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : usersData.length }} of {{ usersData.length }}</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>
            <vs-dropdown-menu>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(100)">
                <span>100</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(250)">
                <span>250</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(500)">
                <span>500</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(1000)">
                <span>1000</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
        <!-- End Custom Pagination -->
        <!-- Quick Search -->
          <vs-input class="sm:mr-4 mr-0 sm:w-auto w-full sm:order-normal order-3 sm:mt-0 mt-4 ag-search" v-model="searchQuery" @input="updateSearchQuery" placeholder="Search..." />          
      </div>
      <!-- AgGrid Table -->
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
        :animateRows="true"
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :suppressPaginationPanel="true"
        :frameworkComponents="frameworkComponents"
        :allowContextMenuWithControlKey="true"
        :getContextMenuItems="getContextMenuItems"
        :statusBar="statusBar"
        @selection-changed="onSelectionChanged"
        @column-row-group-changed="onColumnRowGroupChanged"
        :isExternalFilterPresent="isExternalFilterPresent"
        :doesExternalFilterPass="doesExternalFilterPass"
        :detailCellRendererParams="detailCellRendererParams"
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
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'
import '@ag-grid-community/core/dist/styles/ag-grid.css'
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import _ from 'lodash'
import ClickableStatusBarComponent from './clickableStatusBarComponentVue.js'
import CountStatusBarComponent from './countStatusBarComponentVue.js'
import moment from 'moment'

// Store Module
import shiftJson from './shifts.json'

export default {
  components: {
    AgGridVue,
    VuePerfectScrollbar
  },
  data () {
    
    return {
      customColumns: [],
      customColumnsEdit: {},
      columnName: '',
      shiftModel: {},
      activePrompt: false,
      pinTop: [],
      pinBottom: [],
      searchModel: '',
      filterColumns: '',
      sidebarColumns: '',
      clearDisable: true,
      contextFilters: {
        clients: false,
        officer: false,
        sites: false,
        date: false
      },
      fromDate: '',
      toDate: '',
      fromRate: '',
      toRate: '',
      fromChargeRate: '',
      toChargeRate: '',
      ageType: 'everyone',
      activeItem: {
        Unapproved: true,
        Approved: true,
        Cancelled: true,
        Highlight: true,
        Unassign: true
      },
      rowGroups: [],
      aggregateValues: [],
      days: '',
      active: false,
      shifts: null,
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
        width: 140,
        filter: true,
        // floatingFilter: true, for field search and filters
        flex: 1
      },
      columnDefs:[
        {
          headerName: 'Shift Details',
          groupId: 0,
          active: false,
          children: [
            { headerName: 'No', field: 'No', hide: false, width: 50, headerCheckboxSelection: true, checkboxSelection: true },
            {
              headerName: 'Date',
              field: 'Date',
              hide: false,
              columnGroupShow: 'open'
            },
            // rowGroupIndex: 1
            { headerName: 'Site Name', field: 'Site Name', hide: false, width: 200 },
            {
              headerName: 'Type',
              field: 'Type',
              hide: false,
              columnGroupShow: 'open',
              cellClassRules: {
                'progress': params => {
                  return params.value === 'PATROL'
                },
                'complete': params => {
                  return params.value === 'Site_Inspection'
                },
                'incomplete': params => {
                  return params.value === 'CALL_OUT'
                }
              },
              cellRenderer : params => {
                return params.value ? `<div class="pos-relative">${params.value}<div>` : ''
              }
            },
            {
              headerName: 'Clients',
              field: 'Clients',
              hide: false
            },
            { headerName: 'Subcontractor', field: 'Subcontractor', hide: true },
            { headerName: 'Officer', field: 'Officer', hide: false },
            { headerName: 'Phone', field: 'Phone', hide: true, filter: false },
            { headerName: 'SIA', field: 'SIA', hide: true, filter: false },
            { headerName: 'SIA Expiry', field: 'SIA Expiry', hide: true, filter: false },
            { headerName: 'Day', field: 'Day', hide: false, filter: false },
            { headerName: 'Status', field: 'Status', hide: true }
          ]
        },
        {
          headerName: 'Staff Details',
          groupId: 1,
          active: false,
          children: [
            { headerName: 'Start', field: 'Start', filter: false, editable:true },
            { headerName: 'End', field: 'End', filter: false, editable:true },
            { headerName: 'HR', field: 'HR', filter: false },
            { headerName: 'Break', field: 'Break', filter: false, hide: true },
            { 
              headerName: 'Pay Rate',
              field: 'Pay Rate',
              enableValue: true,
              editable:true
            },
            { headerName: 'Amount', field: 'Amount', hide: true, filter: false},
            { headerName: 'Expense', field: 'Expense', hide: true, filter: false }
          ]
        },
        {
          headerName: 'Site Details',
          groupId: 2,
          active: false,
          children: [
            { headerName: 'Site Start', field: 'Site Start', hide: true, filter: false },
            { headerName: 'Site End', field: 'Site End', hide: true, filter: false },
            { headerName: 'Site HR', field: 'Site HR', hide: true, filter: false },
            { headerName: 'Charge Rate', field: 'Charge Rate', hide: true },
            { headerName: 'Charge Amount', field: 'Charge Amount', hide: true, filter: false}
          ] 
        }
      ]
    }
  },
  computed: {
    usersData () {
      return this.shifts
    },
    searchColumns (value) {
      const filterValues = this.columnDefs.map((element) => {
        return {...element, children: element.children.filter((children) => children.headerName.includes(value))}
      })
      return value ? filterValues : this.columnDefs
    },
    paginationPageSize () {
      if (this.gridApi) return this.gridApi.paginationGetPageSize()
      else return 100
    },
    totalPages () {
      if (this.gridApi) return this.gridApi.paginationGetTotalPages()
      else return 0
    },
    scrollbarTag () { return this.$store.state.is_touch_device ? 'div' : 'VuePerfectScrollbar' },
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
  watch: {
    searchModel: {
      handler (value) {
        if (!value) {
          this.filterColumns = this.columnDefs
        }
        this.filterColumns = this.columnDefs.map((element) => {
          return {...element, children: element.children.filter((children) => children.headerName.includes(value))}
        })
      },
      immediate: true
    },
    active: {
      handler (value) {
        if (value) {
          document.querySelector('.layout--main').classList.add('d-flex-reverse')
        } else {
          document.querySelector('.layout--main').classList.remove('d-flex-reverse')
        }
      }
    }
  },
  methods: {
    addColumnHandler () {
      const manualCol = { field: this.columnName, headerName: this.columnName, edit: false}
      if (!_.some(this.columnDefs, manualCol)) {
        this.columnDefs.push(manualCol)
        this.customColumns.push(manualCol)
        this.gridApi.setColumnDefs(this.columnDefs)
      }
      this.columnName = ''
    },
    editCustomColumn (index) {
      this.customColumns[index].edit = true
      this.customColumnsEdit[index] = this.customColumns[index].field
    },
    updateCustomColumn (column, index) {
      this.customColumns[index] = {
        ...this.customColumns[index],
        field: this.customColumnsEdit[index],
        headerName: this.customColumnsEdit[index],
        edit: false 
      }
      this.columnDefs = this.columnDefs.map(obj => {
        return obj.headerName === column.headerName ? { ...obj, field: this.customColumnsEdit[index], headerName: this.customColumnsEdit[index] } : obj
      })
      this.gridApi.setColumnDefs(this.columnDefs)
      console.log(column, index)
    },
    removeCustomColumnsHandler (column) {
      this.columnDefs = this.columnDefs.filter(obj => {
        return obj !== column
      })
      this.customColumns = this.customColumns.filter(obj => {
        return obj !== column
      })
      this.gridApi.setColumnDefs(this.columnDefs)
    },
    onSelectionChanged () {
      let rowData = []
      this.gridApi.getSelectedNodes().forEach(node => {
        rowData = [...rowData, node.data]
      })
      const data = {
        payHrs: _.sumBy(rowData, (o) => { return o['HR'] }),
        siteHrs: _.sumBy(rowData, (o) => { return o['Site HR'] }),
        chargeRate: _.sumBy(rowData, (o) => { return o['Charge Rate'] }),
        chargeAmount: _.sumBy(rowData, (o) => { return Number(o['Charge Amount']) })
      }
      const componentInstance = this.gridApi.getStatusPanel('statusBarCompKey').component
      componentInstance.setChargeValue(data)
    },
    onColumnRowGroupChanged (event) {
      if (event.columns.length > 0) {
        // this.rowGroups.push(textData)
        console.log(event.columns)
        this.gridColumnApi.setColumnVisible('No', false)
        console.log(this.columnDefs[0])
        // this.columnDefs[0].hide = true
      } else {
        this.gridColumnApi.setColumnVisible('No', true)
      }
      console.log(event)
    },
    activeHandler () {
      this.active = !this.active
      document.querySelector('.layout--main').classList.add('d-flex-reverse')
    // var element = document.getElementById("myDIV");
    // element.classList.add("mystyle");
      // d-flex-reverse
    },
    inRangeHandler () {
      this.externalFilterChanged('dateRangeFilter')
    },
    payRateHandler () {
      this.externalFilterChanged('payRateRange')
    },
    chargeRateHandler () {
      this.externalFilterChanged('chargeRateRange')
    },
    externalFilterChanged (newValue) {
      this.ageType = newValue
      this.gridApi.onFilterChanged()
    },
    isExternalFilterPresent () {
      return this.ageType !== 'everyone'
    },
    doesExternalFilterPass (node) {
      switch (this.ageType) {
      case 'chargeRateRange':
        return node.data['Charge Rate'] >= this.fromChargeRate && node.data['Charge Rate'] <= this.toChargeRate
      case 'payRateRange':
        return node.data['Pay Rate'] >= this.fromRate && node.data['Pay Rate'] <= this.toRate
      case 'dateRangeFilter':
        return node.data.Date >= moment(this.fromDate, 'YYYY-MM-DD').format('DD/MM/YYYY') && node.data.Date <= moment(this.toDate, 'YYYY-MM-DD').format('DD/MM/YYYY')
      default:
        return true
      }
    },
    asDate (dateAsString) {
      const splitFields = dateAsString.split('/')
      return new Date(splitFields[2], splitFields[1], splitFields[0])
    },
    onDragStart (event, data) {
      const userAgent = window.navigator.userAgent
      const isIE = userAgent.indexOf('Trident/') >= 0
      event.dataTransfer.setData(isIE ? 'text' : 'text/plain', data)
    },
    onDragOver (event) {
      const types = event.dataTransfer.types
      const dragSupported = types.length
      if (dragSupported) {
        event.dataTransfer.dropEffect = 'move'
      }
      event.preventDefault()
    },
    onDrop (event) {
      event.preventDefault()
      const userAgent = window.navigator.userAgent
      const isIE = userAgent.indexOf('Trident/') >= 0
      const textData = event.dataTransfer.getData(isIE ? 'text' : 'text/plain')
      if (!this.rowGroups.includes(textData)) {
        this.rowGroups.push(textData)
        this.gridOptions.columnApi.addRowGroupColumns([textData])
      }
    },
    onVlaueDrop (event) {
      event.preventDefault()
      const userAgent = window.navigator.userAgent
      const isIE = userAgent.indexOf('Trident/') >= 0
      const textData = event.dataTransfer.getData(isIE ? 'text' : 'text/plain')
      if (!this.aggregateValues.includes(textData)) {
        this.aggregateValues.push(textData)
        this.gridOptions.columnApi.addValueColumns([textData])
      }
    },
    dsRowGroup (row) {
      this.gridOptions.columnApi.removeRowGroupColumn(row)
      this.rowGroups = this.rowGroups.filter(value => { return value !== row })
    },
    dsAggregateValues (value) {
      this.gridOptions.columnApi.removeValueColumn(value)
      this.aggregateValues = this.aggregateValues.filter(row => { return row !== value })
    },
    clickHandler (col, groupId) {
      const data = this.gridColumnApi.getColumn(col)
      this.gridColumnApi.setColumnVisible(col, !data.visible)
      if (this.columnDefs[groupId].children) {
        this.columnDefs[groupId].children = this.columnDefs[groupId].children.map(obj => {
          return obj.field === col ? { ...obj, hide: !data.hide } : obj
        })
      }
      if (data.originalParent.children.length === data.parent.displayedChildren.length) {
        this.columnDefs[groupId].active = true
      } else {
        this.columnDefs[groupId].active = false
      }
    },
    colCheckBoxHandler (data, active, groupId) {
      
      this.columnDefs[groupId].active = !active
      if (this.columnDefs[groupId].active) {
        data.forEach(node => {
          this.gridColumnApi.setColumnVisible(node.field, true)
          node.hide = false
          
        }) 
      } else {
        data.forEach(node => {
          this.gridColumnApi.setColumnVisible(node.field, false)
          node.hide = true
        }) 
      }
    },
    checkBoxHandler (instanceName, child) {
      const instance = this.gridOptions.api.getFilterInstance(instanceName)
      if (instance.getValueModel().availableValues.size > 0) {
        const item = instance.getValueModel().availableValues
        return item.has(child)
      }
      return false
    },
    filterHandler (filter, value) {
      let result = []
      let getArray = []
      const FilterComponent = this.gridOptions.api.getFilterInstance(filter)
      if (FilterComponent.appliedModel === null) {
        getArray = FilterComponent.getValues()
        result = getArray.filter(query => query !== value)
      } else {
        getArray = FilterComponent.appliedModel.values
        result = getArray.includes(value) ? getArray.filter(query => query !== value) : [...getArray, value]
      }
      FilterComponent.setModel({
        type: 'set',
        values: result
      })
      FilterComponent.onFilterChanged()
    },
    filterSearch (filter, query) {
      const data = [... new Set(this.usersData.map((v) =>  { if (v[filter].includes(query)) return v[filter] }))]
      this.filters[filter] = data.filter(elm => elm)
    },
    selectNothing (instanceName, child) {
      const instance = this.gridOptions.api.getFilterInstance(instanceName)
      const getModelValues = instance.getValueModel()
      const checkboxes = document.getElementsByClassName(instanceName.replace(/\s+/g, ''))
      if (_.isEqual(getModelValues.availableValues, getModelValues.selectedValues)) {
        instance.setModel({
          type: 'set',
          values: []
        })
        
        for (const item in child) {
          checkboxes[item].checked = false
          // console.log(instanceName, child[item])
          // this.filterHandler(instanceName, child[item])
        }
      } else {
        instance.setModel({
          type: 'set',
          values: [...child]
        })
        for (const item in child) {
          checkboxes[item].checked = true
        }
      }
      instance.onFilterChanged()
    },
    updateSearchQuery () { 
      this.gridApi.setQuickFilter(this.searchQuery)
    },
    exportFileHandler () {
      this.gridApi.exportDataAsCsv()
    },
    selectItem (key) {
      this.activeItem[key] = !this.activeItem[key]
    },
    contextFilterHandler (params, filter) {
      const instance = this.gridOptions.api.getFilterInstance(filter)
      instance.setModel({
        type: 'set',
        values: [params.node.data[filter]]
      })
      instance.onFilterChanged()
      this.clearDisable = false
    },
    getContextMenuItems (params) {
      const result = [
        {
          name: 'View',
          action: () => {
            this.activePrompt = true
            this.shiftModel = params.node.data
          }
        },
        {
          name: 'Pin Row',
          subMenu: [
            {
              name: 'Pin Top',
              checked: _.some(this.pinTop, params.node.data), 
              action: () => {
                if (!_.some(this.pinTop, params.node.data)) {
                  if (_.some(this.pinBottom, params.node.data)) {
                    this.pinBottom = this.pinBottom.filter(row => {
                      return row !== params.node.data
                    })
                    this.gridApi.setPinnedBottomRowData(this.pinBottom)
                  }
                  this.pinTop.push(params.node.data)
                }
                this.gridApi.setPinnedTopRowData(this.pinTop)
              }
            },
            {
              name: 'Pin Bottom',
              checked: _.some(this.pinBottom, params.node.data),
              action: () => {
                if (!_.some(this.pinBottom, params.node.data)) {
                  if (_.some(this.pinTop, params.node.data)) {
                    this.pinTop = this.pinTop.filter(row => {
                      return row !== params.node.data
                    })
                    this.gridApi.setPinnedTopRowData(this.pinTop)
                  }
                  this.pinBottom.push(params.node.data)  
                }
                this.gridApi.setPinnedBottomRowData(this.pinBottom)
              }
            },
            {
              name: 'Clear Pin',
              disabled: !(this.pinBottom.length || this.pinTop.length),
              action: () => {
                this.pinTop = []
                this.pinBottom = []
                this.gridApi.setPinnedTopRowData([])
                this.gridApi.setPinnedBottomRowData([])
              }
            }
          ]
        },
        {
          name: 'Filters',
          subMenu: [
            {
              name: 'Clients',
              checked: this.contextFilters.clients,
              action: () => {
                this.contextFilterHandler(params, 'Clients')
                this.contextFilters.clients = true
              }
            },
            {
              name: 'Sites',
              checked: this.contextFilters.sites,
              action: () => {
                this.contextFilterHandler(params, 'Site Name')
                this.contextFilters.sites = true
              }
            },
            {
              name: 'Officer',
              checked: this.contextFilters.officer,
              action: () => {
                this.contextFilterHandler(params, 'Officer')
                this.contextFilters.officer = true
              }
            },
            {
              name: 'Date',
              checked: this.contextFilters.date,
              action: () => {
                this.contextFilterHandler(params, 'Date')
                this.contextFilters.date = true
              }
            },
            {
              name: 'Clear',
              disabled: this.clearDisable,
              action: () => {
                this.gridOptions.api.setFilterModel(null)
                this.gridOptions.api.onFilterChanged()
                this.clearDisable = true
                this.contextFilters = {
                  clients: false,
                  sites: false,
                  officer: false,
                  date: false
                }
              }
            }
          ]
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
    onGridReady (params) {
      params.api.sizeColumnsToFit()
    }
  },
  beforeMount () {
    this.shifts = shiftJson
    this.rowSelection = 'multiple'
    // SideBar 
    // this.sideBar = {
    //   toolPanels: [
    //     'filters',
    //     {
    //       id: 'columns',
    //       labelDefault: 'Columns',
    //       labelKey: 'columns',
    //       iconKey: 'columns',
    //       toolPanel: 'agColumnsToolPanel',
    //       toolPanelParams: { suppressSyncLayoutWithGrid: true }
    //     }
    //   ]
    // }
    this.frameworkComponents = {
      
      clickableStatusBarComponent: ClickableStatusBarComponent,
      countStatusBarComponent: CountStatusBarComponent
    }
    this.statusBar = {
      statusPanels: [
        { statusPanel: 'clickableStatusBarComponent', 
          key: 'statusBarCompKey',
          align: 'right'
        },
        {
          statusPanel: 'agAggregationComponent',
          statusPanelParams: {
            aggFuncs: ['count', 'sum', 'min', 'max', 'avg']
          }
        }
      ]
    }
  },
  mounted () {
    this.gridApi = this.gridOptions.api
    this.gridColumnApi = this.gridOptions.columnApi
    // const show = []
    // const data = this.columnDefs.map((element) => {
    //   if (element.headerName.includes('Type')) {
    //     show.push({ ...element })
    //   } else {
    //     const arr = element.children.filter((children) => children.headerName.includes('Type'))
    //     if (arr.length) {
    //       show.push({...element, children: element.children.filter((children) => children.headerName.includes('Type'))})
    //     }
    //   }
      
    //   return show
    // })
    
    for (const key in this.usersData[0]) {
      this.filters[key] = [... new Set(this.usersData.map((v) =>  v[key]))] 
    }
   
  },
  created () {
  }
}

</script>

<style lang="scss">
#shift__listing{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
@import url(//db.onlinewebfonts.com/c/150ed9b2a009a71d2d819b5561167302?family=Segoe+UI+Symbol);

.d-flex-reverse{
  margin-right: 450px;
}
.ag-status-bar-right{
  width: 100%;
}
.vx-card .vx-card__collapsible-content .vx-card__body{
  padding-bottom: 0 !important;
  padding-top: 0 !important;
}
.vx-card .vx-card__title h4{
  font-size: 14px;
}
.vs-sidebar.vs-sidebar-parent{
  position: fixed !important;
  max-width: 450px !important;
}
.input-block{
  margin: 12px 0;
  &.vs-con-input-label{ width: 100%; }
}
.ag-theme-alpine .ag-floating-top{
  border-bottom-color: #ff4081 !important;
}
.ag-theme-alpine .ag-floating-bottom{
  border-top-color: #ff4081 !important;
}
.d-flex{
  display: flex;
  padding: 0 5px;
  +.small{
    height: 30px;
    font-size: .8rem;
  }
  .vs-component + .vs-component{
    margin-left: 5px;
  }
}
.inactive.vs-button-primary.vs-button-filled{ background: #444 !important;}
.ag-cell-value{
  &.red{
    background: lightcoral;
  }
  &.blue{
    background: lightgreen;
  }
  &.grey{
    background: lightsalmon;
  }
} 
.line-vs-tabs{
  min-width: 63px;
  top: 37px !important;
}
.vs-collapse-sidebar {
  padding: 0;
  .vs-collapse-item--header{
    padding: .5rem 0;
    font-size: 1.1rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  .con-content--item{
    padding: 0 !important;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1rem !important;
    max-height: 200px;
    min-height: 100px;
    overflow-y: scroll;
    .btn-group button{
      padding: 1rem .8rem !important;
    }
  }
}
.ag-column-drop__row{
  border-top: 1px solid #e2e2e2;
  .ag-row-title{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    padding: 10px 0;
    color: rgba(0, 0, 0, 0.87);
  }
  .emplty-span{
    color: rgba(0, 0, 0, 0.38);
    font-weight: 600;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  .ag-column-drop-content {
    height: 100px;
    padding-top: 10px;
    padding-bottom: 20px;
    box-sizing: border-box;
    overflow-y: scroll;
  }
  .row-group-btn{
    margin: 5px;
    color: rgba(0, 0, 0, 0.87);
    font-size: 15px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: var(--ag-chip-background-color, #e2e2e2);
    border-radius: 32px;
    padding: 5px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .close-icon{
      height: 16px;
      width: 16px;
    }
  }
}
#filter-sidebar .vs-sidebar {
    position: fixed;
    z-index: 52000;
    width: 450px;
    max-width: 90vw;
    -webkit-box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11), 0 5px 15px 0 rgba(0, 0, 0, 0.08);
}
.customizer-btn{
    position: absolute !important;
    top: 50%;
    z-index: 50000;
    right: 0 !important;
}
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
.pos-relative{
  position: relative;
  &::after{
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    display: block;
    border-radius: 50%;
    top: 18px;
    right: auto !important;
    left: -16px !important;
  }
}
.progress > span .pos-relative::after{
  background: chocolate !important;
}
.complete > span .pos-relative::after{
  background: chartreuse !important;
}
.incomplete > span .pos-relative::after{
  background: lightcoral !important;
}
</style>
