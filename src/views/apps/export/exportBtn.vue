<template>
    <vs-dropdown vs-trigger-click class="ml-auto md:block hidden cursor-pointer">
        <vs-button  icon-pack="feather">{{$t('ActionsBtn')}}</vs-button>
        

        <vs-dropdown-menu class="w-90">
        <vs-dropdown-item>
            <span>Export</span>
            <hr />
        </vs-dropdown-item>
        <vs-dropdown-item>
            <div v-on:click="exportData" class="flex items-center">
            <feather-icon icon="UserIcon" class="inline-block mr-2" svgClasses="w-4 h-4" />
            <span>CSV</span>
            </div>
        </vs-dropdown-item>
        </vs-dropdown-menu>

    </vs-dropdown>
</template>

<script>
export default {
    name:'export-btn',

    data () {
        return{
            expo:true
        }

    },
    methods :{
        exportData() {
            console.log("Clicked")
        // let params = {
        // columnKeys:['c_name','c_phone','c_mobile','c_address','c_email','c_status'],
        // skipHeader: false,
        // skipFooters: true,
        // skipGroups: true,
        // fileName: "export.csv"
        // }
        // this.gridOptions.api.exportDataAsCsv(params)
     },
    }
}
</script>

<style scoped>

</style>