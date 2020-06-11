/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
  // {
  //   url: "/apps/email",
  //   name: "Email",
  //   slug: "email",
  //   icon: "MailIcon",
  //   i18n: "Email",
  // },
  // {
  //   url: null,
  //   name: 'Dashboard',
  //   tag: '2',
  //   tagColor: 'warning',
  //   icon: 'HomeIcon',
  //   i18n: 'Dashboard',
  //   submenu: [
  //     {
  //       url: '/dashboard/analytics',
  //       name: 'Analytics',
  //       slug: 'dashboard-analytics',
  //       i18n: 'Analytics'
  //     },
  //     {
  //       url: '/dashboard/ecommerce',
  //       name: 'eCommerce',
  //       slug: 'dashboard-ecommerce',
  //       i18n: 'eCommerce'
  //     }
  //   ]
  // },
  {
    header: 'SCHEDULE',
    icon: 'PackageIcon',
    i18n: 'SCHEDULE',
    items: [
      {
        url: '/apps/email',
        name: 'CALENDAR',
        slug: 'email',
        icon: 'CalendarIcon',
        i18n: 'CALENDAR'
      }
    ]
  },
  {
    header: 'STAFF',
    icon: 'LayersIcon',
    i18n: 'STAFF',
    items: [
      {
        url: '/apps/staff/all',
        name: 'STAFF',
        tagColor: 'primary',
        icon: 'ListIcon',
        i18n: 'STAFF'
      },
      {
        url: null,
        name: 'CAMPUS',
        tagColor: 'primary',
        icon: 'ListIcon',
        i18n: 'CAMPUS'
      }
    ]
  },
  {
    header: 'SITES',
    icon: 'MapIcon',
    i18n: 'SITES',
    items: [
      {
        url: '/apps/site/all',
        name: 'SITES',
        tagColor: 'primary',
        icon: 'ListIcon',
        i18n: 'SITES'
      },
      {
        url: null,
        name: 'QR',
        tagColor: 'primary',
        icon: 'ListIcon',
        i18n: 'QR'
      },
      {
        url: null,
        name: 'KEY HOLDING',
        tagColor: 'primary',
        icon: 'ListIcon',
        i18n: 'KEY HOLDING'
      }
    ]
  },
  {
    header: 'CLIENTS',
    icon: 'UsersIcon',
    i18n: 'CLIENTS',
    items: [
      {
        url: '/apps/client/all',
        name: 'CLIENTS',
        tagColor: 'primary',
        icon: 'ListIcon',
        i18n: 'CLIENTS'
      }
    ]
  },
  {
    header: 'REPORTS',
    icon: 'FileIcon',
    i18n: 'REPORTS',
    items: [
      {
        url: '/apps/reports/all',
        name: 'ALL REPORTS',
        icon: 'MenuIcon',
        i18n: 'ALL REPORTS'
      }
    ]
  },
  {
    header: 'SIA',
    icon: 'PaperclipIcon',
    i18n: 'SIA',
    items: [
      {
        url: '/apps/sia/check',
        name: 'SIA CHECK',
        icon: 'MenuIcon',
        i18n: 'SIA CHECK'
      },
      {
        url: '/apps/sia/check',
        name: 'SIA REPORT',
        icon: 'MenuIcon',
        i18n: 'SIA REPORT'
      }
    ]
  }
]

