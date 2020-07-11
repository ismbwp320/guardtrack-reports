<template>
    <div class="pb-2 pt-2 text-right">
    <vs-button @click="activePrompt = true" class="addCompany">New Company</vs-button>
    <vs-prompt
        title="Add New Company"
        accept-text= "Save"
        button-cancel = "border"
        @cancel="clearFields"
        @accept="addCompany"
        @close="clearFields"
        :is-valid="validateForm"
        :active.sync="activePrompt">
        <div>
            <form>
                <div class="vx-row">
                    <div class="vx-col w-full">
                      <div class="flex flex-row bg-gray-200">
                        <div class="py-2 pr-2 w-1/3">
                           <vs-input v-validate="'required'" label="Company Name:" name="company_name" class="w-full mb-4 mt-5" placeholder="Company Name" v-model="staff.company_name" :color="validateForm ? 'success' : 'danger'" />
                        </div>
                        <div class="py-2 pr-2 w-1/3">
                           <vs-input v-validate="'required'" label="User Name:" name="user_name" class="w-full mb-4 mt-5" placeholder="User Name" v-model="staff.user_name" :color="validateForm ? 'success' : 'danger'" />
                        </div>
                        <div class="py-2 pr-2 w-1/3">
                           <vs-input v-validate="'required'" label="Email:" name="email" class="w-full mb-4 mt-5" placeholder="email" v-model="staff.email" :color="validateForm ? 'success' : 'danger'" />
                        </div>
                      </div>
                      <div class="flex flex-row bg-gray-200">
                          <div class="py-2 pr-2 w-1/3">
                            <vs-select label="Package ID:" v-model="staff.package_id" class="w-full mt-5">
                              <!-- <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in Packages" /> -->
                            </vs-select>
                          </div>
                        <div class="py-2 pr-2 w-1/3">
                           <vs-input v-validate="'required'" label="Due Date:" name="due_date" class="w-full mb-4 mt-5" placeholder="Due Date" v-model="staff.due_date" :color="validateForm ? 'success' : 'danger'" />
                        </div>
                          <div class="py-2 pr-2 w-1/3">
                            <vs-select label="Role:" v-model="staff.role" class="w-full mt-5">
                              <!-- <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in Roles" /> -->
                            </vs-select>
                          </div>
                      </div>
                      <div class="flex flex-row bg-gray-200">
                        <div class="py-2 pr-2 w-1/3">
                            <vs-select label="Status:" v-model="staff.status" class="w-full mt-5">
                              <vs-select-item value="1" text="Active" />
                              <vs-select-item value="0" text="InActive" />
                            </vs-select>
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
        company_name: '',
        user_name: '',
        email: '',
        package_id:'',
        due_date:'',
        role:'',
        status: ''
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
        company_name: '',
        user_name: '',
        email: '',
        package_id:'',
        due_date:'',
        role:'',
        status: ''
      })
    },
    addCompany () {
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
