
<template>
  <div id="page-user-list">
    <div class="flex justify-end">
      <ContractorAddNew />
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
                                      <input type="checkbox" :class="child.headerName.replace(/\s+/g, '')" :checked="checkBoxHandler(child.field, item)" class="hidden" v-on:change="filterHandler(child.field, item, column.field)">
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
          <!-- <vs-button class="mb-4 md:mb-0" @click="gridApi.exportDataAsCsv()">Export as CSV</vs-button> -->

      </div>
      <!-- AgGrid Table -->
     
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
        :statusBar="statusBar"        
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
import {agGridMixins} from '@/mixins/agGridMixins'
import {sharedFunctions} from '@/mixins/sharedFunctions'
import vSelect from 'vue-select'
import _ from 'lodash'
import ContractorAddNew from './ContractorAddNew'
import subcontractorJson from './subcontractor.json'
// Store Module
import moduleUserManagement from '@/store/user-management/moduleUserManagement.js'

// Cell Renderer


export default {
  mixins: [agGridMixins, sharedFunctions],
  components: {
    AgGridVue,
    VuePerfectScrollbar,
    vSelect,
    ContractorAddNew
  },
  data () {
    
    return {
      subcontractors: subcontractorJson,
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
        width: 140,
        filter: true,
        flex: 1
      },
      columnDefs: [
        {
          headerName: 'Staff Details',
          groupId: 0,
          active: true,
          children: [
            {
              headerName: 'Subcontractor Name',
              field: 'name',
              filter: true,
              checkboxSelection: true,
              headerCheckboxSelectionFilteredOnly: true,
              headerCheckboxSelection: true
            },
            {
              headerName: 'Short Code',
              field: 'short_name',
              filter: true
            },
            {
              headerName: 'Phone',
              field: 'number',
              filter: true
            },
            {
              headerName: 'Email',
              field: 'email',
              filter: true
            },
            {
              headerName: 'Address',
              field: 'address',
              filter: true
            },
            {
              headerName: 'Pay Rate',
              field: 'rate',
              filter: true
            },
            {
              headerName: 'Status',
              field: 'status',
              filter: true

            }
          ]}
      ]

     
    }
  },
  computed: {
    usersData () {
      return this.subcontractors
    }
  },
  methods: {
    updateSearchQuery (val) {
      this.gridApi.setQuickFilter(val)
    },
    onGridReady (params) {
      params.api.sizeColumnsToFit()
    }
  },
  mounted () {
    for (const key in this.usersData[0]) {
      this.filters[key] = [... new Set(this.usersData.map((v) =>  v[key]))] 
    }
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
