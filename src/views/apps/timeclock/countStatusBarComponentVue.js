import Vue from 'vue'

export default Vue.extend({
  template: `
            <div class="ag-status-name-value">
                    <span>Row Count Component&nbsp;:</span>
                    <span class="ag-status-name-value-value">{{count}}</span>
                </div>
            </div>
    `,
  data () {
    return {
      count: null
    }
  },
  beforeMount () {},
  mounted () {
    this.params.api.addEventListener('gridReady', this.onGridReady.bind(this))
  },
  methods: {
    onGridReady () {
      this.count = this.params.api.getModel().rowsToDisplay.length
    }
  }
})