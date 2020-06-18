import Vue from 'vue'

export default Vue.extend({
  template: `
        <span :style="params.style">{{params.value}}</span>
    `,
  data () {
    return {}
  },
  beforeMount () {},
  mounted () {},
  methods: {}
})