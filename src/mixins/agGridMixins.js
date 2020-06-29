export const agGridMixins = {

  data () {
    return {
      aggregateValues: [],
      rowGroups: []
    }
  },
  
  mounted () {

    this.gridApi = this.gridOptions.api
    this.gridColumnApi = this.gridOptions.columnApi
   
  },

  methods: {

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
    }

  }
}