import Vue from 'vue'

export default Vue.extend({
  template: `
            <div class="ag-status-name-value">
                <span>Status Bar Component&nbsp; 
                    <input type="button" v-on:click="onClick" value="Click Me"/>
                </span>
            </div>
    `,
  data () {
    return {}
  },
  beforeMount () {},
  mounted () {},
  methods: {
    onClick () {
      alert(`Selected Row Count: ${this.params.api.getSelectedRows().length}`)
    }
  }
})