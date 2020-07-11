import _ from 'lodash'
export const sharedFunctions = {

  data () {
    return {
      searchModel: '',
      active: false,
      filterColumns: '',
      columnName: '',
      customColumns: [],
      customColumnsEdit: {}
    }
  },
  computed: {
    paginationMask () {
      const d = this.currentPage * this.paginationPageSize
      const dataLength = this.usersData.length
      return `${d - (this.paginationPageSize - 1)} - ${dataLength - d > 0 ? d : dataLength} of ${dataLength}`
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
    activeHandler () {
      this.active = !this.active
      document.querySelector('.layout--main').classList.add('d-flex-reverse')
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
      console.log(instance)
      if (instance.getValueModel().availableValues.size > 0) {
        const item = instance.getValueModel().availableValues
        return item.has(child)
      }
      return false
    },
    filterHandler (filter, value, parent) {
      const index = this.columnDefs.map(e => e.headerName).indexOf(parent)
      const child = this.columnDefs[index].children.map(e => e.headerName).indexOf(filter)
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
      if (FilterComponent.appliedModelValues === null) {
        this.columnDefs[index].children[child].filterAll = true
      } else {
        this.columnDefs[index].children[child].filterAll = false
      }
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
          checkboxes[Number(item)].checked = false
        }
      } else {
        instance.setModel({
          type: 'set',
          values: [...child]
        })
        for (const item in child) {
          checkboxes[Number(item)].checked = true
        }
      }
      instance.onFilterChanged()
    },
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
    },
    removeCustomColumnsHandler (column) {
      this.columnDefs = this.columnDefs.filter(obj => {
        return obj !== column
      })
      this.customColumns = this.customColumns.filter(obj => {
        return obj !== column
      })
      this.gridApi.setColumnDefs(this.columnDefs)
    }
  }
}