
<template>
    <div class="pb-2 pt-2 text-right">
    <vs-button @click="activePrompt = true" class="addStaff">Add</vs-button>
    <vs-prompt
        title="Add Subcontractor"
        accept-text= "Save"
        button-cancel = "border"
        @cancel="clearFields"
        @accept="addSubcontractor"
        @close="clearFields"
        :is-valid="validateForm"
        :active.sync="activePrompt">
        <div>
            <form>
                <div class="vx-row">
                    <div class="vx-col w-full">
                      <div class="flex flex-row bg-gray-200">
                        <div class="py-2 pr-2 w-1/3">
                           <vs-input v-validate="'required'" label="Subcontractor name:" name="subcontractor_name" class="w-full mb-4 mt-5" v-model="subcontractor.name" :color="validateForm ? 'success' : 'danger'" />
                        </div>
                        <div class="py-2 pr-2 w-1/2">
                           <vs-input v-validate="'required'" label="Short Code:" name="short_code" class="w-full mb-4 mt-5" v-model="subcontractor.short_code" :color="validateForm ? 'success' : 'danger'" />
                        </div>
                        <div class="py-2 pr-2 w-1/3">
                           <vs-input v-validate="'required'" label="Phone:" name="phone" class="w-full mb-4 mt-5" v-model="subcontractor.phone" :color="validateForm ? 'success' : 'danger'" />
                        </div>
                      </div>
                      <div class="flex flex-row bg-gray-200">
                          <div class="py-2 pr-2 w-1/2">
                             <vs-input v-validate="'required'" label="Email:" name="phone" class="w-full mb-4 mt-5" v-model="subcontractor.email" :color="validateForm ? 'success' : 'danger'" />
                          </div>
                          <div class="py-2 pr-2 w-1/2">
                             <vs-input v-validate="'required'" label="Pay Rate:" name="pay_rate" class="w-full mb-4 mt-5" v-model="subcontractor.pay_rate" :color="validateForm ? 'success' : 'danger'" />
                          </div>
                      </div>
                      <div class="flex flex-row bg-gray-200">
                          <vs-textarea class="w-full mt-4" label="Address" v-model="subcontractor.address" type="text" v-validate="'required|email'" name="mobile" />
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
      activePrompt: false,
      subcontractor: {
        name: '',
        short_code: '',
        phone: '',
        email:'',
        pay_rate:'',
        address:''
      }
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.subcontractor.name !== ''
    }
  },
  methods: {
    clearFields () {
      Object.assign(this.subcontractor, {
        name: '',
        short_code: '',
        phone: '',
        email:'',
        pay_rate:'',
        address:''
      })
    },
    addSubcontractor () {
      this.$validator.validateAll().then(result => {
        if (result) {
          //this.$store.dispatch('client/addClient', Object.assign({}, this.subcontractor))
          this.clearFields()
        }
      })
    }
  }
}
</script>
