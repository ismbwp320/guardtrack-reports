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
        title="Add Staff"
        accept-text= "Save"
        button-cancel = "border"
        @cancel="clearFields"
        @accept="addStaff"
        @close="clearFields"
        :is-valid="validateForm"
        :active.sync="activePrompt">
        <div>
            <form>
                <div class="vx-row">
                    <div class="vx-col w-full">
                      <div class="flex flex-row bg-gray-200">
                        <div class="py-2 pr-2 w-1/3">
                           <vs-input v-validate="'required'" label="First name:" name="first_name" class="w-full mb-4 mt-5" placeholder="First name" v-model="staff.first_name" :color="validateForm ? 'success' : 'danger'" />
                        </div>
                        <div class="py-2 pr-2 w-1/2">
                           <vs-input v-validate="'required'" label="Last name:" name="last_name" class="w-full mb-4 mt-5" placeholder="Last name" v-model="staff.last_name" :color="validateForm ? 'success' : 'danger'" />
                        </div>
                        <div class="py-2 pr-2 w-1/3">
                           <vs-input v-validate="'required'" label="ID:" name="staff_id" class="w-full mb-4 mt-5" placeholder="Id" v-model="staff.staff_id" :color="validateForm ? 'success' : 'danger'" />
                        </div>
                      </div>
                      <div class="flex flex-row bg-gray-200">
                          <div class="py-2 pr-2 w-1/2">
                            <vs-select label="Contractor:" v-model="staff.contractor" class="w-full mt-5">
                              <!-- <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in addressTypeOptions" /> -->
                            </vs-select>
                          </div>
                          <div class="py-2 pr-2 w-1/2">
                            <vs-select label="Position:" v-model="staff.position" class="w-full mt-5">
                              <!-- <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in addressTypeOptions" /> -->
                            </vs-select>
                          </div>
                      </div>
                      <div class="flex flex-row bg-gray-200">
                        <div class="py-2 pr-2 w-1/3">
                           <vs-input v-validate="'required'" label="Email:" name="staff_email" class="w-full mb-4 mt-5" placeholder="Email" v-model="staff.staff_email" :color="validateForm ? 'success' : 'danger'" />
                        </div>
                        <div class="py-2 pr-2 w-1/2">
                           <vs-input v-validate="'required'" label="Pay Rate:" name="satff_pay_rate" class="w-full mb-4 mt-5" placeholder="Pay rate" v-model="staff.staff_pay_rate" :color="validateForm ? 'success' : 'danger'" />
                        </div>
                        <div class="py-2 pr-2 w-1/3">
                           <vs-input v-validate="'required'" label="SIA number:" name="staff_sia_no" class="w-full mb-4 mt-5" placeholder="SIA number" v-model="staff.staff_sia_no" :color="validateForm ? 'success' : 'danger'" />
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
      staff: {
        first_name: '',
        last_name: '',
        staff_id: '',
        contractor:'',
        position:'',
        staff_email:'',
        staff_pay_rate: '',
        staff_sia_no: ''
      }
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.staff.first_name !== ''
    }
  },
  methods: {
    clearFields () {
      Object.assign(this.staff, {
        first_name: '',
        last_name: '',
        staff_id: '',
        contractor:'',
        position:'',
        staff_email:'',
        staff_pay_rate: '',
        staff_sia_no: ''
      })
    },
    addStaff () {
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
