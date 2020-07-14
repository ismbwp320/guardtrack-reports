<template>
    <div class="pb-2 pt-2 text-right">
    <vs-button @click="activePrompt = true" class="addCompany">Create List</vs-button>
    <vs-prompt
        title="Create New Task List"
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
                        <div class="py-2 pr-2" style="width:100%">
                           <vs-input v-validate="'required'" label="Name Your list:" name="name" class="w-full mb-4 mt-5" placeholder="Name Your list" v-model="staff.name" :color="validateForm ? 'success' : 'danger'" />
                        </div>
                      </div>
                      <div class="flex flex-row bg-gray-200">
                        <div class="py-2 pr-2" style="width:100%">
                            <vx-input-group class="mb-base">
                            <vs-input v-validate="'required'" label="Task Name:" name="name" class="w-full mb-4 mt-5" placeholder="Task Name" v-model="staff.name" :color="validateForm ? 'success' : 'danger'" />

                            <template slot="append">
                              <div class="append-text btn-addon">
                                <vs-button color="primary">Button</vs-button>
                              </div>
                            </template>
                          </vx-input-group>
                        </div>
                      </div>
                      <div class="flex flex-row bg-gray-200">
                        <div class="py-2 pr-2 w-1/2">
                          <vs-checkbox class="w-full mt-5" v-model="staff.number">Repeats</vs-checkbox>
                        </div>
                          <div class="py-2 pr-2 w-1/2">
                            <vs-select label="Role:" v-model="staff.role" class="w-full mt-0">
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
