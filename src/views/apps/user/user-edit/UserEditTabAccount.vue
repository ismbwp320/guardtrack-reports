<!-- =========================================================================================
  File Name: UserEditTabInformation.vue
  Description: User Edit Information Tab content
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="user-edit-tab-info">


    <!-- Content Row -->
    <div class="vx-row">
      <div class="vx-col md:w-1/2 w-full">
        <vs-input class="w-full mt-4" label="Client name" v-model="data_local.c_name" v-validate="'required|alpha_num'" name="c_name" />
        <span class="text-danger text-sm"  v-show="errors.has('username')">{{ errors.first('username') }}</span>

        <vs-input class="w-full mt-4" label="Phone" v-model="data_local.c_phone" v-validate="'required|alpha_spaces'" name="name" />
        <span class="text-danger text-sm"  v-show="errors.has('name')">{{ errors.first('name') }}</span>

        <vs-input class="w-full mt-4" label="Mobile" v-model="data_local.c_mobile" type="text" v-validate="'required|email'" name="mobile" />
        <span class="text-danger text-sm"  v-show="errors.has('email')">{{ errors.first('email') }}</span>
      </div>

      <div class="vx-col md:w-1/2 w-full">

        <vs-input class="w-full mt-4" label="Address" v-model="data_local.c_address" v-validate="'required|alpha_num'" name="c_address" />
        <span class="text-danger text-sm"  v-show="errors.has('username')">{{ errors.first('username') }}</span>

        <vs-input class="w-full mt-4" label="Email" v-model="data_local.c_email" v-validate="'required|alpha_spaces'" name="email" />
        <span class="text-danger text-sm"  v-show="errors.has('name')">{{ errors.first('name') }}</span>

        <vs-input class="w-full mt-4" label="Mobile" v-model="data_local.c_mobile" type="text" v-validate="'required|email'" name="mobile" />
        <span class="text-danger text-sm"  v-show="errors.has('email')">{{ errors.first('email') }}</span>

        

      </div>
    </div>

  

    <!-- Save & Reset Button -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-8 flex flex-wrap items-center justify-end">
          <vs-button class="ml-auto mt-2" @click="save_changes" :disabled="!validateForm">Save Changes</vs-button>
          <vs-button class="ml-4 mt-2" type="border" color="warning" @click="reset_data">Reset</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'

export default {
  components: {
    vSelect
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

      data_local: JSON.parse(JSON.stringify(this.data)),

      statusOptions: [
        { label: 'Active',  value: 'active' },
        { label: 'Blocked',  value: 'blocked' },
        { label: 'Deactivated',  value: 'deactivated' }
      ],
      roleOptions: [
        { label: 'Admin',  value: 'admin' },
        { label: 'User',  value: 'user' },
        { label: 'Staff',  value: 'staff' }
      ]
    }
  },
  computed: {
    status_local: {
      get () {
        return { label: this.capitalize(this.data_local.c_status),  value: this.data_local.c_status  }
      },
      set (obj) {
        this.data_local.c_status = obj.value
      }
    },
    role_local: {
      get () {
        return { label: this.capitalize(this.data_local.role),  value: this.data_local.role  }
      },
      set (obj) {
        this.data_local.role = obj.value
      }
    },
    validateForm () {
      return !this.errors.any()
    }
  },
  methods: {
    capitalize (str) {
      return 1;
      // str.slice(0, 1).toUpperCase() + str.slice(1, str.length)
    },
    save_changes () {
      /* eslint-disable */
      if (!this.validateForm) return

      // Here will go your API call for updating data
      // You can get data in "this.data_local"

      /* eslint-enable */
    },
    reset_data () {
      this.data_local = JSON.parse(JSON.stringify(this.data))
    },
    update_avatar () {
      // You can update avatar Here
      // For reference you can check dataList example
      // We haven't integrated it here, because data isn't saved in DB
    }
  }
}
</script>
