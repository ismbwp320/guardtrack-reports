<!-- =========================================================================================
    File Name: ClientAddNew.vue
    Description: Add new client component
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div class="px-6 pb-2 pt-6">
    <vs-button @click="activePrompt = true" class="w-full">Add Client</vs-button>
    <vs-prompt
        title="Add Client"
        accept-text= "Add Client"
        button-cancel = "border"
        @cancel="clearFields"
        @accept="addClient"
        @close="clearFields"
        :is-valid="validateForm"
        :active.sync="activePrompt">
        <div>
            <form>
                <div class="vx-row">
                    <div class="vx-col w-full">
                        <vs-input v-validate="'required'" name="c_name" class="w-full mb-4 mt-5" placeholder="Client name" v-model="clientLocal.name" :color="validateForm ? 'success' : 'danger'" />
                        <vs-input v-validate="'required'" name="c_phone" class="w-full mb-4 mt-5" placeholder="Phone" v-model="clientLocal.phone" :color="validateForm ? 'success' : 'danger'" />
                        <vs-input v-validate="'required'" name="c_mobile" class="w-full mb-4 mt-5" placeholder="Mobile" v-model="clientLocal.mobile" :color="validateForm ? 'success' : 'danger'" />
                        <vs-input v-validate="'required'" name="c_city" class="w-full mb-4 mt-5" placeholder="City/Town" v-model="clientLocal.city" :color="validateForm ? 'success' : 'danger'" />
                        <vs-input v-validate="'required'" name="c_post_code" class="w-full mb-4 mt-5" placeholder="Post Code" v-model="clientLocal.postCode" :color="validateForm ? 'success' : 'danger'" />
                        <vs-input v-validate="'required'" name="c_country" class="w-full mb-4 mt-5" placeholder="Country" v-model="clientLocal.country" :color="validateForm ? 'success' : 'danger'" />
                        <vs-input v-validate="'required'" name="c_email" class="w-full mb-4 mt-5" placeholder="Email" v-model="clientLocal.email" :color="validateForm ? 'success' : 'danger'" />
                        <vs-textarea rows="5" label="Address" v-model="clientLocal.desc" />
                    </div>
                </div>

            </form>
        </div>
    </vs-prompt>
    </div>
</template>

<script>
export default {
  data () {
    return {
      activePrompt: false,
      clientLocal: {
        name: '',
        phone: '',
        mobile: '',
        city:'',
        postCode:'',
        country:'',
        email: '',
        desc: ''
      }
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.clientLocal.name !== ''
    }
  },
  methods: {
    clearFields () {
      Object.assign(this.clientLocal, {
        name: '',
        phone: '',
        mobile: '',
        city:'',
        postCode:'',
        country:'',
        email: '',
        desc: ''
      })
    },
    addClient () {
      this.$validator.validateAll().then(result => {
        if (result) {
          console.log(this.clientLocal)
          //this.$store.dispatch('client/addClient', Object.assign({}, this.clientLocal))
          this.clearFields()
        }
      })
    }
  }
}
</script>
