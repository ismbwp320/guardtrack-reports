<!-- =========================================================================================
    File Name: ClientAddNew.vue
    Description: Add new client component
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div class="pb-2 pt-2 text-right">
    <vs-button @click="activePrompt = true" class="addSite">Add Site</vs-button>
    <vs-prompt
        title="Add Site"
        accept-text= "Save"
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
                      <div class="flex flex-row bg-gray-200">
                        <div class="py-2 pr-2 w-1/2">
                           <vs-input v-validate="'required'" label="Site name:" name="c_name" class="w-full mb-4 mt-5" placeholder="Site name" v-model="clientLocal.name" :color="validateForm ? 'success' : 'danger'" />
                        </div>
                        <div class="py-2 pr-2 w-1/2">
                           <vs-select label="Client:" v-model="addressType" class="w-full mt-5">
                              <!-- <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in addressTypeOptions" /> -->
                            </vs-select>
                        </div>
                        
                      </div>
                      <vs-textarea rows="5" label="Address" v-model="clientLocal.desc" />
                      <div class="flex flex-row bg-gray-200">
                          <div class="py-2 pr-2 w-1/2">
                              <vs-input v-validate="'required'" label="Post code:" name="c_post_code" class="w-full mb-4 mt-5" placeholder="Post Code" v-model="clientLocal.postCode" :color="validateForm ? 'success' : 'danger'" />
                          </div>
                          <div class="py-2 pr-2 w-1/2">
                              <vs-input v-validate="'required'" label="City:" name="c_city" class="w-full mb-4 mt-5" placeholder="City/Town" v-model="clientLocal.city" :color="validateForm ? 'success' : 'danger'" />
                          </div>
                      </div>
                         
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
      addressType: '',
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
          //this.$store.dispatch('client/addClient', Object.assign({}, this.clientLocal))
          this.clearFields()
        }
      })
    }
  }
}
</script>
