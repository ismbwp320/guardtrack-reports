<template>
    <div id="page-user-list">
      <vx-card ref="filterCard" title="Find By Licence Number" class="pb-1 user-list-filters mb-8">
        <div class="vx-card p-6 my-5">
            <div>
                <h3>Licence Number</h3>
                <p>This is a 16 digit number.Please enter the number with no spaces</p>
               <vs-input class="sm:mr-4 mr-0 sm:w-auto pt-3 w-full sm:order-normal order-3 sm:mt-0 mt-4" v-model="searchQuery"  placeholder="Enter SIA Number" />
               <vs-button class="mt-3">Search</vs-button>
            </div>
        </div>
      </vx-card>
    </div>
</template>

<script>

export default {
  components: {},
  data () {  
    return {
      
      searchQuery: ''
    
    }
  },
  methods: {
  }
  
}

</script>

<style lang="scss">

</style>
