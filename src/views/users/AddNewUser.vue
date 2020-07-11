<template>
    <div class="pb-2 pt-2 text-right">
    <vs-button @click="activePrompt = true" class="addCompany">New User</vs-button>
    <vs-prompt
        title="Add New User"
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
                        <div class="py-2 pr-2 w-1/2">
                           <vs-input v-validate="'required'" label="Name:" name="name" class="w-full mb-4 mt-5" placeholder="Name" v-model="staff.name" :color="validateForm ? 'success' : 'danger'" />
                        </div>
                        <div class="py-2 pr-2 w-1/2">
                           <vs-input v-validate="'required'" label="Email:" name="email" class="w-full mb-4 mt-5" placeholder="email" v-model="staff.email" :color="validateForm ? 'success' : 'danger'" />
                        </div>
                      </div>
                      <div class="flex flex-row bg-gray-200">
                        <div class="py-2 pr-2 w-1/2">
                           <vs-input v-validate="'required'" label="Number:" name="number" class="w-full mb-4 mt-5" placeholder="Number" v-model="staff.number" :color="validateForm ? 'success' : 'danger'" />
                        </div>
                          <div class="py-2 pr-2 w-1/2">
                            <vs-select label="Role:" v-model="staff.role" class="w-full mt-5">
                              <!-- <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in Roles" /> -->
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
        name: '',
        email: '',
        number:'',
        role:''
      }
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.staff.name !== ''
    }
  },
  methods: {
    clearFields () {
      Object.assign(this.staff, {
        name: '',
        email: '',
        number:'',
        role:''
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
