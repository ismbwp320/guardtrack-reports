<!-- =========================================================================================
  File Name: UserList.vue
  Description: User List page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>

    <div id="page-user-list">
        <div class="vx-card p-6">
            <div>
                <h3>Licence Number</h3>
                <p>This is a 16 digit number.Please enter the number with no spaces</p>
               <vs-input class="sm:mr-4 mr-0 sm:w-auto pt-3 w-full sm:order-normal order-3 sm:mt-0 mt-4" v-model="searchQuery"  placeholder="Enter SIA Number" />
               <vs-button class="mt-3">Search</vs-button>
            </div>
        </div>
    </div>
  

</template>

<script>

export default {
  components: {},
  data () {  
    return {
      
      searchQuery: ''
    
    }
  }
  
}

</script>

<style lang="scss">

</style>
