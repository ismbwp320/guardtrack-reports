import Vue from 'vue'
export default Vue.extend({
  template: `
            <div class="ag-status-name-value" v-if="object.chargeRate > 0">
              <div>
                <span>  <strong>Charge Amount :</strong> {{object.chargeAmount.toFixed(2)}}</span>
                <span class="ml-3"><strong>Pay Amount :</strong> {{object.chargeRate.toFixed(2)}} </span>
                <span class="ml-3"><strong>Differnece :</strong> {{(object.chargeAmount - object.chargeRate).toFixed(2)}} </span>
              </div>
              <div>
                <span>  <strong>Charge Hrs :</strong> {{object.siteHrs}}</span>
                <span class="ml-3"><strong>Pay Hrs :</strong> {{object.payHrs}} </span>
                <span class="ml-3"><strong>Differnece :</strong> {{object.siteHrs - object.payHrs}} </span>
              </div>
            </div>
    `,
  data () {
    return {
      object: {
        chargeRate: 0,
        chargeAmount: 0,
        siteHrs: 0,
        payHrs: 0
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