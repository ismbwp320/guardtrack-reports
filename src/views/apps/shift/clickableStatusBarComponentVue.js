import Vue from 'vue'
export default Vue.extend({
  template: `
            <div class="ag-status-name-value" v-if="object.chargeRate > 0">
                <span> <strong>Charge Rate :</strong> {{object.chargeRate}}</span>
                <span class="ml-3"> <strong>Charge Amount :</strong> {{object.chargeAmount}}</span>
            </div>
    `,
  data () {
    return {
      object: {
        chargeRate: 0,
        chargeAmount: 0
      }
    }
  },
  beforeMount () {},
  mounted () {
  },
  methods: {
    setChargeValue (value) {
      this.object = value
    }
  }
})