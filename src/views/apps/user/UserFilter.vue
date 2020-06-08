<!-- =========================================================================================
  File Name: TheCustomizer.vue
  Description: Template Customizer
  Component Name: TheCustomizer
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="theme-customizer">

    <!-- Open Customizer Button -->
    <vs-button
      @click.stop="active=!active"
      color="primary"
      type="filled"
      class="customizer-btn"
      icon-pack="feather"
      icon="icon-settings" />

    <!-- Customizer Content -->
    <vs-sidebar
      click-not-close
      hidden-background
      position-right
      v-model="active"
      class="items-no-padding">
      <div class="h-full">

        <div class="customizer-header mt-6 flex items-center justify-between px-6">
          <div>
            <h4>THEME CUSTOMIZER</h4>
            <small>Customize & Preview in Real Time</small>
          </div>
          <feather-icon icon="XIcon" @click.stop="active = false" class="cursor-pointer"></feather-icon>
        </div>

        <vs-divider class="mb-0" />

        <component :is="scrollbarTag" class="scroll-area--customizer pt-4 pb-6" :settings="settings" :key="$vs.rtl">

          <div class="px-6">
            <vx-card ref="filterCard" title="Filters" class="user-list-filters">
                <div class="flex flex-col">
                    <div class="w-full">
                    <label class="text-sm opacity-75">Role</label>
                    <v-select :options="roleOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="roleFilter" class="mb-4 md:mb-0" />
                    </div>
                    <div class="w-full">
                    <label class="text-sm opacity-75">Status</label>
                    <v-select :options="statusOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="statusFilter" class="mb-4 md:mb-0" />
                    </div>
                    <div class="w-full">
                    <label class="text-sm opacity-75">Verified</label>
                    <v-select :options="isVerifiedOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="isVerifiedFilter" class="mb-4 sm:mb-0" />
                    </div>
                    <div class="w-full">
                    <label class="text-sm opacity-75">Department</label>
                    <v-select :options="departmentOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="departmentFilter" />
                    </div>
                </div>
            </vx-card>
          </div>

        </component>
      </div>
    </vs-sidebar>
  </div>
</template>


<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import vSelect from 'vue-select'

export default {
  data () {
    return {
      active             : false,
      customPrimaryColor : '#3DC9B3',
      customNavbarColor  : '#3DC9B3',
      routerTransitionsList: [
        { text: 'Zoom Fade',   value: 'zoom-fade'   },
        { text: 'Slide Fade',  value: 'slide-fade'  },
        { text: 'Fade Bottom', value: 'fade-bottom' },
        { text: 'Fade',        value: 'fade'        },
        { text: 'Zoom Out',    value: 'zoom-out'    },
        { text: 'None',        value: 'none'        }
      ],
      settings: {
        maxScrollbarLength : 60,
        wheelSpeed         : .60
      },
      themeColors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],
      // Filter Options
      roleFilter: { label: 'All', value: 'all' },
      roleOptions: [
        { label: 'All', value: 'all' },
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
        { label: 'Staff', value: 'staff' }
      ],

      statusFilter: { label: 'All', value: 'all' },
      statusOptions: [
        { label: 'All', value: 'all' },
        { label: 'Active', value: 'active' },
        { label: 'Deactivated', value: 'deactivated' },
        { label: 'Blocked', value: 'blocked' }
      ],

      isVerifiedFilter: { label: 'All', value: 'all' },
      isVerifiedOptions: [
        { label: 'All', value: 'all' },
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ],

      departmentFilter: { label: 'All', value: 'all' },
      departmentOptions: [
        { label: 'All', value: 'all' },
        { label: 'Sales', value: 'sales' },
        { label: 'Development', value: 'development' },
        { label: 'Management', value: 'management' }
      ],
    }
  },
  watch: {
    layoutType (val) {

      // Reset unsupported options
      if (val === 'horizontal') {
        if (this.themeMode === 'semi-dark') this.themeMode = 'light'
        if (this.navbarType === 'hidden')   this.navbarTypeLocal = 'floating'
        this.$emit('updateNavbarColor', '#fff')
      }
    }
  },
  computed: {
    footerTypeLocal: {
      get ()    { return this.footerType },
      set (val) { this.$emit('updateFooter', val) }
    },
    hideScrollToTopLocal: {
      get ()    { return this.hideScrollToTop },
      set (val) { this.$emit('toggleHideScrollToTop', val) }
    },
    navbarColorInitial () {
      return this.$store.state.theme === 'dark' ? '#10163a' : '#fff'
    },
    navbarColorOptionClasses () {
      return (color) => {
        const classes = {}
        if (color === this.navbarColorLocal)   classes['shadow-outline'] = true
        if (this.navbarTypeLocal === 'static') classes['cursor-not-allowed'] = true
        return classes
      }
    },
    navbarColorLocal: {
      get () { return this.navbarColor },
      set (val) {
        if (this.navbarType === 'static') return
        this.$emit('updateNavbarColor', val)
      }
    },
    navbarTypeLocal: {
      get ()    { return this.navbarType },
      set (val) { this.$emit('updateNavbar', val) }
    },
    layoutType: {
      get ()    { return this.$store.state.mainLayoutType },
      set (val) { this.$store.commit('UPDATE_MAIN_LAYOUT_TYPE', val) }
    },
    primaryColor: {
      get ()    { return this.$store.state.themePrimaryColor },
      set (val) { this.$store.commit('UPDATE_PRIMARY_COLOR', val) }
    },
    reduced_sidebar: {
      get ()    { return this.$store.state.reduceButton },
      set (val) { this.$store.commit('TOGGLE_REDUCE_BUTTON', val) }
    },
    routerTransitionLocal: {
      get ()    { return this.routerTransition },
      set (val) { this.$emit('updateRouterTransition', val) }
    },
    rtl: {
      get ()    { return this.$vs.rtl },
      set (val) { this.$vs.rtl = val  }
    },
    themeMode: {
      get ()    { return this.$store.state.theme },
      set (val) { this.$store.dispatch('updateTheme', val) }
    },
    scrollbarTag () { return this.$store.state.is_touch_device ? 'div' : 'VuePerfectScrollbar' },
    windowWidth () {
      return this.$store.state.windowWidth
    }
  },
  methods: {
    updatePrimaryColor (color) {
      this.primaryColor = color
      this.$vs.theme({ primary: color })
    }
  },
  components: {
    VuePerfectScrollbar,
    vSelect
  }
}

</script>


<style lang="scss">
#theme-customizer {
  .vs-sidebar {
    position: fixed;
    z-index: 52000;
    width: 400px;
    max-width: 90vw;
    // @apply shadow-lg;
    box-shadow: 0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08);
  }
}

.customizer-btn {
  position: fixed;
  top: 50%;
  right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  z-index: 50000;

  .vs-icon {
    animation: spin 1.5s linear infinite;
  }
}

.scroll-area--customizer {
  height: calc(100% - 5rem);

  &:not(.ps) {
    overflow-y: auto;
  }
}
</style>

