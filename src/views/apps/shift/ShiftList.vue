<template>
  <div id="shift__listing">

    <div class="pb-2 text-right">
      <vs-button @click="exportFileHandler" color="primary" type="filled">Export</vs-button>
    </div>

    <!-- Filter SideBar -->
    <div id="filter-sidebar">
      <vs-button
        @click="active=!active"
        class="customizer-btn"
        icon="icon-settings"
        icon-pack="feather"
        color="primary"
        type="filled"
      />

      <vs-sidebar
        click-not-close
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
                  <div class="con-tab-ejemplo">
                    <template v-for="(column, index) in columnDefs">
                      <template v-if="column.children">
                        <vs-collapse class="vs-collapse-sidebar" :key="index">
                          <template v-for="(child, index) in column.children">
                            <vs-collapse-item  :key="index" v-if="child.headerName && child.filter !== false">
                              <div slot="header">
                                {{child.headerName}}
                              </div>
                              <vs-input  @input="filterSearch(child.headerName, filterSearchQuery[child.headerName.replace(/\s+/g, '')])" v-model="filterSearchQuery[child.headerName.replace(/\s+/g, '')]" class="w-full sm:order-normal order-3 mb-4 ag-search" placeholder="Placeholder"/>
                                <label  class="custom-label flex">
                                  <div class="bg-custom shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
                                    <input type="checkbox" checked class="hidden" v-on:change="selectNothing(child.headerName, filters[child.headerName])">
                                    <svg class="hidden w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
                                  </div>
                                  <span class="select-none">Select All</span>
                                </label>
                              <template v-if="child.headerName">
                                <div v-for="(item, index) in filters[child.headerName]" :key="index">
                                  <label  class="custom-label flex">
                                    <div class="bg-custom shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
                                      <input type="checkbox" :checked="checkBoxHandler(child.headerName, item)" class="hidden" v-on:change="filterHandler(child.headerName, item)">
                                      <svg class="hidden w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
                                    </div>
                                    <span class="select-none">{{item}}</span>
                                  </label>
                                </div>
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
                            {{column.headerName}}
                          </div>
                          <template v-for="(child, index) in column.children">
                            <label :key="index" class="custom-label flex">
                              <div class="bg-custom shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
                                <input type="checkbox" :checked="!child.hide" class="hidden" v-on:change="clickHandler(child.field)">
                                <svg class="hidden w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
                              </div>
                              <span draggable="true" v-on:dragstart="onDragStart($event, child.headerName)" class="select-none">
                                <vs-icon icon="android" color="rgb(70, 150, 0)"></vs-icon>
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
              </vs-tabs>
            </div>
          </div>
        </div>
      </vs-sidebar>
    </div>
    <!-- End Filter SideBar -->

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
        <!-- End Custom Pagination -->
        <!-- Quick Search -->
          <vs-input class="sm:mr-4 mr-0 sm:w-auto w-full sm:order-normal order-3 sm:mt-0 mt-4 ag-search" v-model="searchQuery" @input="updateSearchQuery" placeholder="Search..." />          
      </div>
      <!-- AgGrid Table -->
      <ag-grid-vue
        ref="agGridTable"
        :modules="modules"
        :gridOptions="gridOptions"
        class="ag-theme-material w-100 my-4 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="usersData"
        :rowSelection="rowSelection"
        :rowGroupPanelShow="rowGroupPanelShow"
        colResizeDefault="shift"
        :animateRows="true"
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :suppressPaginationPanel="true"
        :frameworkComponents="frameworkComponents"
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
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'
import '@ag-grid-community/core/dist/styles/ag-grid.css'
import '@ag-grid-community/core/dist/styles/ag-theme-material.css'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import _ from 'lodash'
import ClickableStatusBarComponent from './clickableStatusBarComponentVue.js'
import CountStatusBarComponent from './countStatusBarComponentVue.js'

// Store Module
import shiftJson from './shifts.json'

const createTile = function createTile (data) {
  const el = document.createElement('div')
  el.classList.add('tile')
  el.innerHTML = `<div class="id">${data} </div>`
  return el
}

const addDropZones = function addDropZones (params) {
  const tileContainer = document.querySelector('.tile-container'),
    dropZone = {
      getContainer () {
        return tileContainer
      },
      onDragStop (params) {
        const tile = createTile(params.node.data)
        tileContainer.appendChild(tile)
      }
    }
  params.api.addRowDropZone(dropZone)
}
export default {
  components: {
    AgGridVue,
    VuePerfectScrollbar
  },
  data () {
    
    return {
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
      rowSelection: null,
      filters: {},
      filterSearchQuery: {},
      searchQuery: '',
      rowGroupPanelShow: 'always',
      settings: {
        maxScrollbarLength : 60,
        wheelSpeed         : .60
      },
      // AgGrid
      gridOptions: {
        enableFillHandle: true,
        enableRangeSelection: true,
        undoRedoCellEditing: true,
        undoRedoCellEditingLimit: 20,
        enableCellChangeFlash: true
      },
      defaultColDef: {
        editable:true,
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
          groupId: 'GroupB',
          children: [
            { headerName: 'Site Name', field: 'Site Name', hide: false },
            { headerName: 'Type', field: 'Type', hide: false },
            { headerName: 'Clients', field: 'Clients', hide: false },
            { headerName: 'Subcontractor', field: 'Subcontractor', hide: true },
            { headerName: 'Officer', field: 'Officer', hide: false },
            { headerName: 'Phone', field: 'Phone', hide: true, filter: false },
            { headerName: 'SIA', field: 'SIA', hide: true, filter: false },
            { headerName: 'SIA Expiry', field: 'SIA Expiry', hide: true, filter: false },
            { headerName: 'Date', field: 'Date', hide: false },
            { headerName: 'Day', field: 'Day', hide: false, filter: false },
            { headerName: 'Status', field: 'Status', hide: true }
          ]
        },
        {
          headerName: 'Staff Details',
          children: [
            { headerName: 'Start', field: 'Start', filter: false },
            { headerName: 'End', field: 'End', filter: false },
            { headerName: 'HR', field: 'HR', filter: false },
            { headerName: 'Break', field: 'Break', filter: false },
            { 
              headerName: 'Pay Rate',
              field: 'Pay Rate',
              enableValue: true
            },
            { headerName: 'Amount', field: 'Amount', hide: true, filter: false},
            { headerName: 'Expense', field: 'Expense', hide: true, filter: false }
          ]
        },
        {
          headerName: 'Site Details',
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
    paginationPageSize () {
      if (this.gridApi) return this.gridApi.paginationGetPageSize()
      else return 10
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
  methods: {
    onGridReady (params) {
      addDropZones(params)
      params.api.sizeColumnsToFit()
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
    clickHandler (col) {
      const data = this.gridColumnApi.getColumn(col)
      this.gridColumnApi.setColumnVisible(col, !data.visible)
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
      if (_.isEqual(getModelValues.availableValues, getModelValues.selectedValues)) {
        instance.setModel({
          type: 'set',
          values: []
        })
        for (const item in child) {
          this.checkBoxHandler(instanceName, item)
        }
      } else {
        instance.setModel({
          type: 'set',
          values: [...child]
        })
      }
      instance.onFilterChanged()
    },
    updateSearchQuery () { 
      this.gridApi.setQuickFilter(this.searchQuery)
    },
    exportFileHandler () {
      this.gridApi.exportDataAsCsv()
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
      countStatusBarComponent: CountStatusBarComponent,
      clickableStatusBarComponent: ClickableStatusBarComponent
    }
    this.statusBar = {
      statusPanels: [
        { statusPanel: 'countStatusBarComponent' },
        { statusPanel: 'clickableStatusBarComponent' },
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
    for (const key in this.usersData[0]) {
      this.filters[key] = [... new Set(this.usersData.map((v) =>  v[key]))] 
    }
  }
}

</script>

<style lang="scss">
.line-vs-tabs{
  min-width: 63px;
  top: 37px !important;
}
.vs-collapse-sidebar {
  padding: 0;
  .vs-collapse-item--header{
    padding: .5rem 0;
    font-size: 1rem;
  }
  .con-content--item{
    padding: 0 !important;
  }
}
.ag-column-drop__row{
  border-top: 1px solid #e2e2e2;
  .ag-row-title{
    padding: 10px 0;
    color: rgba(0, 0, 0, 0.87);
  }
  .emplty-span{
    color: rgba(0, 0, 0, 0.38);
    font-weight: 600;
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
    font-size: 13px;
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
    width: 400px;
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
</style>
