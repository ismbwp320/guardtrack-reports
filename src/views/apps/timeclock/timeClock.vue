<template>
  <div id="shift__listing">
        <vs-prompt
        :title="timesheetModel.callType"
        button-cancel = "none"
        button-accept = "hidden"
        :active.sync="activePrompt">
          <div class="flex flex-col">
              <vs-input v-if="timesheetModel.callType === 'Start'" :label="timesheetModel.callType" v-model="timesheetModel.timesheets.time_in" class="input-field-block" />
              <vs-input v-if="timesheetModel.callType === 'Finish'" :label="timesheetModel.callType" v-model="timesheetModel.timesheets.time_out" class="input-field-block" />
              <vs-textarea label="Comments" height="60px" />
              <vs-button @click="submitHandler" color="primary" type="filled">Add</vs-button>
          </div>
        </vs-prompt>
        <vs-prompt
            class="model-lg"
            :title="shiftModel.sites_name.site_name"
            button-cancel = "none"
            button-accept = "hidden"
            :active.sync="activeView">
            <vs-row>
              <vs-col vs-type="flex" vs-w="6">
                <div style="width:100%">
                  <vx-card class="box-shadow-none margin-right-2">
                    <ul>
                        <li class="flex mb-3">
                            <span class="inline-block font-semibold">Name</span>
                            <span class="mx-2">-</span>
                            <span class="mr-4">{{shiftModel.officers.fname}}</span>
                        </li>
                        <li class="flex mb-3">
                            <span class="inline-block font-semibold">Email</span>
                            <span class="mx-2">-</span>
                            <span class="mr-4">marshad5758@gmail.com</span>
                        </li>
                        <li class="flex mb-3">
                            <span class="inline-block font-semibold">Number</span>
                            <span class="mx-2">-</span>
                            <span class="mr-4">07473865793</span>
                        </li>
                        <li class="flex mb-3">
                            <span class="inline-block font-semibold">Sia Number</span>
                            <span class="mx-2">-</span>
                            <span class="mr-4">1012315572399006</span>
                        </li>
                        <li class="flex mb-3">
                            <span class="inline-block font-semibold">Sia Expiry</span>
                            <span class="mx-2">-</span>
                            <span class="mr-4">17 Feb 2021</span>
                        </li>
                        <li class="flex mb-3">
                            <span class="inline-block font-semibold">PIN</span>
                            <span class="mx-2">-</span>
                            <span class="mr-4">11249</span>
                        </li>
                    </ul>
                  </vx-card>
                  <vx-card title="Shift Detail" class="box-shadow-none">
                      <div class="mt-5">
                          <h6>Site Name:</h6>
                          <p>Norway</p>
                      </div>
                      <!-- OTEHR DATA -->
                      <div class="mt-5">
                          <h6>Date:</h6>
                          <p>Tuesday, 17 Dec 2019</p>
                      </div>
                  </vx-card>            
                  <vs-table stripe :data="users">
                    <template slot="thead">
                      <vs-th></vs-th>
                      <vs-th>Start</vs-th>
                      <vs-th>Finish</vs-th>
                      <vs-th>Total</vs-th>
                    </template>
                    <template slot-scope="{data}">
                      <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
                        <vs-td :data="data[indextr].name">
                          {{data[indextr].name}}
                        </vs-td>

                        <vs-td :data="data[indextr].start">
                          {{data[indextr].start}}
                        </vs-td>

                        <vs-td :data="data[indextr].id">
                          {{data[indextr].end}}
                        </vs-td>

                        <vs-td :data="data[indextr].id">
                          {{data[indextr].total}}
                        </vs-td>
                      </vs-tr>
                    </template>
                  </vs-table>
        <div>
          <vs-button color="danger" size="small">Start</vs-button>
          <vs-button color="danger" size="small" class="mx-2">Finish</vs-button>
        </div>
                </div>
              </vs-col>
              <vs-col vs-type="flex" vs-w="6">
                <vx-timeline :data="timelineData"></vx-timeline>
              </vs-col>
            </vs-row>
            <!-- CARD WITH TABS COMPONENT -->
            <div class="vx-row mt-5">
                <!-- SIMPLE CARD WITH TABS -->
                <div class="vx-col w-full">
                    <vx-card class="box-shadow-none">
                        <vs-tabs>
                            <vs-tab label="Notes">
                                <div class="mt-2">
                                    <h6>Notes:</h6>
                                    <div>
                                      <vs-textarea label="Notes" height="60px" />
                                    </div>
                                </div>
                            </vs-tab>
                            <vs-tab label="Shift Instruction">
                                <div class="mt-2">
                                    <h6>Shift Instruction:</h6>
                                    <div>
                                      <vs-textarea label="Shift Instruction" height="60px" />
                                    </div>
                                </div>
                            </vs-tab>
                            <vs-tab label="Expense">
                                <div class="mt-2">
                                    <h6>Expense:</h6>
                                    <div>
                                      <vs-input type="number" label="Expense Amount" class="input-field-block" />
                                      <vs-textarea label="Expense Reason" height="60px" />
                                    </div>
                                </div>
                            </vs-tab>
                        </vs-tabs>
                    </vx-card>
                </div>
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
        :rowDragManaged="true"
        :suppressMoveWhenRowDragging="true"
        :animateRows="true"
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :suppressPaginationPanel="true"
        :frameworkComponents="frameworkComponents"
        :allowContextMenuWithControlKey="true"
        :getContextMenuItems="getContextMenuItems"
        :statusBar="statusBar"
        :overlayLoadingTemplate="overlayLoadingTemplate"
        :overlayNoRowsTemplate="overlayNoRowsTemplate"        
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
import {agGridMixins} from '@/mixins/agGridMixins'
import VxTimeline from '@/components/VxTimeline'
import VxTooltip from '@/components/VxTooltip'
import ClickableStatusBarComponent from './clickableStatusBarComponentVue.js'
import CountStatusBarComponent from './countStatusBarComponentVue.js'
import moment from 'moment'

// Store Module
import shiftJson from './shifts.json'
const officersList = ['ADNAN ZAKAULLAH', 'Syed Omair', 'ABDUL RAZZAQ', 'Masroor Khan']
export default {
  mixins: [agGridMixins],
  components: {
    AgGridVue,
    VuePerfectScrollbar,
    VxTimeline,
    VxTooltip
  },
  data () {
    
    return {
      users:[
        {
          id: 1,
          name: 'Scheduled',
          start: '19:00',
          end: '07:00',
          total: '12h'
        },
        {
          id: 2,
          name: 'Actual',
          start: '',
          end: '',
          total: ''
        }
      ],
      timelineData: [
        {
          color : 'primary',
          icon  : 'PlusIcon',
          title : 'New Task Added',
          desc  : 'Bonbon macaroon jelly beans gummi bears jelly lollipop apple',
          time  : '25 Days Ago'
        },
        {
          color : 'warning',
          icon  : 'AlertCircleIcon',
          title : 'Task Update Found',
          desc  : 'Cupcake gummi bears soufflé caramels candy',
          time  : '15 Days Ago'
        },
        {
          color : 'success',
          icon  : 'CheckIcon',
          title : 'Task Finished',
          desc  : 'Candy ice cream cake. Halvah gummi bears',
          time  : '20 mins ago'
        }
      ],
      timesheetModel: {},
      selectDateOption: 'custom',
      dtFrom: '',
      dtTo: '',
      overlayLoadingTemplate: null,
      overlayNoRowsTemplate: null,
      customColumns: [],
      customColumnsEdit: {},
      columnName: '',
      shiftModel: {
        sites_name: {},
        officers: {}
      },
      activePrompt: false,
      activeView: false,
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
            {
              headerName: 'Call Type',
              field: 'callType',
              hide: false,
              width: 110,
              filterAll: true,
              cellRenderer : params => {
                console.log(params.data)
                return `<div class="pos-relative" style="text-align:center;color:#fff;background: ${params.data.background}">${params.data.callType}<div>`
              },
              onCellClicked : (params) => {
                console.log(params)
                this.timesheetModel = params.data
                this.activePrompt = true
              }
            },
            // rowGroupIndex: 1
            { headerName: 'Site Name', field: 'sites_name.site_name', hide: false, width: 200, filterAll: true },
            {
              headerName: 'Type',
              field: 'types.type_name',
              hide: false,
              filterAll: true
            },
            {
              headerName: 'Clients',
              field: 'clients.client_name',
              hide: false,
              filterAll: true
            },
            {
              headerName: 'Officer',
              field: 'officers.fname',
              hide: false,
              filterAll: true,
              editable: true,
              cellEditor: 'agRichSelectCellEditor',
              cellEditorParams: {
                cellHeight: 50,
                values: officersList
              }
            },
            { headerName: 'Date', field: 'timesheets.reg_date', hide: false, filter: false, filterAll: true },
            {
              headerName: 'Shift Time',
              field: 'Shift Time',
              hide: false,
              filter: false,
              filterAll: true,
              cellRenderer : params => {
                const d = params.data
                return `<div>${d.timesheets.time_in} - ${d.timesheets.time_out}<div>`
              }
            },
            {
              headerName: 'Clock Time',
              field: 'Clock Time',
              hide: false,
              filter: false,
              filterAll: true,
              cellRenderer : params => {
                const d = params.data
                return `<div style="text-align:center">${d.shift_time_detail.book_on} - ${d.shift_time_detail.book_off}<div>`
              }
            },
            { headerName: 'HR', field: 'timesheets.hours', filter: false, width: 50, filterAll: true },
            { headerName: 'Start', field: 'shift_time_detail.book_on', hide: false, filterAll: true },
            { headerName: 'Finish', field: 'shift_time_detail.book_off', hide: false, filterAll: true },
            { headerName: 'Status', field: 'shift_time_detail.status', hide: false, filterAll: true }
          ]
        }
      ]
    }
  },
  async created () {
    // const { data } = await axios.get('https://www.guardtrack.co.uk/ajax/staff_timeclock?option=&month=July,2020&max=&min=&not_approved=not_approved') 
    // console.log(data)
    this.timesheetHandler()
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
    submitHandler () {
      this.shifts = this.shifts.map(obj => {
        let data = {}
        if (this.timesheetModel.callType === 'Start') {
          data = {
            book_on : this.timesheetModel.timesheets.time_in
          }
        }
        return obj.DT_RowId === this.timesheetModel.DT_RowId ? { ...obj, shift_time_detail: {...data} } : obj
      })
      this.activePrompt = false
    },
    timesheetHandler () {
      let newData = []
      const dateFormat = 'DD-MM-YYYY HH:mm'

      this.shifts.forEach(node => {
        // SHIFT TIME
        const bookOnTime = `${node.timesheets.reg_date} ${node.timesheets.time_in}`
        const bookOffTime = moment(bookOnTime, dateFormat).add(node.timesheets.hours, 'hours').format(dateFormat)

        // ACTUAL TIME 
        const bookOnValue = node.shift_time_detail.book_on
        const bookOffValue = node.shift_time_detail.book_off

        const anHour = moment(new Date()).add(1, 'hours').format(dateFormat)
        const current = moment(new Date()).format(dateFormat)
        const currentHour = moment(new Date()).format('HH')
        if (current > bookOnTime && bookOnValue === '') {
          newData = [...newData, {...node, background: 'red', callType: 'Start', dataOrder: 1}]
        } else if (current > bookOffTime && bookOffValue === '' && bookOnValue !== '') {
          newData = [...newData, {...node, background: 'red', callType: 'Finish', dataOrder: 1}]
        } else if (current < bookOnTime && anHour > bookOnTime && bookOnValue === '') {
          newData = [...newData, {...node, background: 'orange', callType: 'Start', dataOrder: 2}]
        } else if (current < bookOffTime && anHour > bookOffTime && bookOffValue === '' && bookOnValue !== '') {
          newData = [...newData, {...node, background: 'orange', callType: 'Finish', dataOrder: 2}]
        } else if (current > bookOnTime && anHour > bookOnTime && bookOnValue !== '' && anHour < bookOffTime && bookOffValue === '') {
          
          const val = `t${currentHour}`
          const check_call = node.check_call[val]
          // Sub Conditions
          if (node.shift_time_detail.check_call_status !== '0' && node.check_call_status.after_interval !== null) {
            if ((check_call === null || check_call === '')) {
              const current_min = moment(new Date()).format('mm')
              if (current_min <= 15) {
                newData = [...newData, {...node, background: 'orange', callType: 'Check', dataOrder: 2}]
              } else {
                newData = [...newData, {...node, background: 'red', callType: 'Check', dataOrder: 1}]
              }
            } else {
              newData = [...newData, {...node, background: 'green', callType: 'Check', dataOrder: 3}]
            }
          } else {
            newData = [...newData, {...node, background: 'green', callType: 'Start', dataOrder: 3}]
          }
          // End Sub Conditions
        } else if (bookOffValue !== '' && bookOnValue !== '') {
          if (node.shift_time_detail.status === '0') {
            newData = [...newData, {...node, background: '#9e9e9e', callType: 'Approve', dataOrder: 4}]  
          } else {
            newData = [...newData, {...node, background: '#374767', callType: 'Approve', dataOrder: 4}]
          }
        } else if (bookOnValue !== '' && bookOffValue === '') {
          newData = [...newData, {...node, background: 'green', callType: 'Start', dataOrder: 3}]
        } else {
          newData = [...newData, {...node, background: '#444', callType: 'Start', dataOrder: 5}]
        }
      })
      this.shifts = newData.sort((a, b) => a.dataOrder - b.dataOrder)
    },
    onCellValueChanged (params) {
      const colId = params.column.getId()
      if (colId === 'Officer') {
        // console.log(params.data)
      }
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
        // console.log(event.columns)
        // this.gridColumnApi.setColumnVisible('No', false)
        // console.log(this.columnDefs[0])
        // this.columnDefs[0].hide = true
      } else {
        // this.gridColumnApi.setColumnVisible('No', true)
      }
      // console.log(event)
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
        return node.data.Date >= moment(this.dtFrom, 'YYYY-MM-DD').format('DD/MM/YYYY') && node.data.Date <= moment(this.dtTo, 'YYYY-MM-DD').format('DD/MM/YYYY')
      default:
        return true
      }
    },
    updateSearchQuery () { 
      this.gridApi.setQuickFilter(this.searchQuery)
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
            this.activeView = true
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
                this.shifts = this.shifts.filter(row => {
                  return row !== params.node.data
                })
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
                this.shifts = this.shifts.filter(row => {
                  return row !== params.node.data
                })
              }
            },
            {
              name: 'Clear Pin',
              disabled: !(this.pinBottom.length || this.pinTop.length),
              action: () => {
                this.shifts = shiftJson
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
    }
  },
  beforeMount () {
    this.overlayLoadingTemplate =
      '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>'
    this.overlayNoRowsTemplate =
      '<span style="padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;">This is a custom \'no rows\' overlay</span>'
    this.shifts = shiftJson
    this.rowSelection = 'multiple'
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
    this.timesheetHandler()
    // setInterval(() => console.log('HHHH'), 5000)
    // console.log(moment(new Date()).format('HH:mm'))
    // for (const key in this.usersData[0]) {
    //   this.filters[key] = [... new Set(this.usersData.map((v) =>  v[key]))] 
    // }
   
  }
}

</script>

<style lang="scss">
.con-vs-dialog .vs-dialog footer{
  display: none !important;
}
.bg-shift-col {
  background: #f8d7da;
}
.bg-shift-success{
  background: #d4edda;
}
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
.ag-theme-alpine .ag-header-cell-resize::after{
  left: calc(50% - 3px);
  width: 3px;
  height: 50%;
  top: calc(50% - 25%);
  background: #d7d7d7 !important;
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
    min-height: 150px;
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
.con-vs-dialog .vs-dialog header span.after {
    width: 3px !important;
}

.model-lg {
  .vs-dialog {
    max-width: 860px !important;
    max-height: calc(100% - 40px);
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .dialog-title {
    text-transform: uppercase;
  }
  footer{
    display: none !important;
  }
}
.input-field-block{
    margin: 10px 0;
    &.vs-con-input-label{ width: 100%; }
    .vs-input--input{
      display: block;
      width: 100%;
    }
}
.box-shadow-none{
  box-shadow: none !important;
  border:none;
  &.margin-right-2{
    .vx-card__body{
      margin-right: 30px;
    }
  }
}
.flex-justify-bw{
  display: flex;
  justify-content: space-between;
}
</style>
