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
    <vs-button @click="activePrompt = true" class="addStaff">Add</vs-button>
    <vs-prompt
        title="Add Position"
        accept-text= "Save"
        button-cancel = "border"
        @cancel="clearFields"
        @accept="addPosition"
        @close="clearFields"
        :is-valid="validateForm"
        :active.sync="activePrompt">
        <div>
            <form>
                <div class="vx-row">
                    <div class="vx-col w-full">
                      <div class="flex flex-row bg-gray-200">
                        <div class="py-2 pr-2 w-1/3">
                           <vs-input v-validate="'required'" label="Position:" name="position" class="w-full mb-4 mt-5" placeholder="Position" v-model="positionData.position" :color="validateForm ? 'success' : 'danger'" />
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
      activePrompt: false,
      positionData: {
        position: ''
        
      }
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.positionData.position !== ''
    }
  },
  methods: {
    clearFields () {
      Object.assign(this.positionData, {
        position: ''
      })
    },
    addPosition () {
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
