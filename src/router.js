import Vue from 'vue'
import Router from 'vue-router'
import auth from '@/auth/authService'
import ShiftList from '@/views/apps/shift/ShiftList.vue'
import TimeClock from '@/views/apps/timeclock/timeClock.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [

    {
      path: '/',
      component: () => import('./layouts/main/Main.vue'),
      children: [
       
        {
          path: '/',
          component: () => import('@/views/apps/user/user-list/UserList.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Client' },
              { title: 'List' }
            ],
            rule: 'editor'
          }
        },
        {
          path: '/chat-box',
          component: () => import('@/views/chat/ChatBox.vue'),
          name: 'CHAT_BOX',
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'CHATBOX' },
              { title: 'List' }
            ],
            rule: 'editor'
          }
        },
        {
          path: '/companies',
          component: () => import('@/views/companies/Companies.vue'),
          name: 'COMPANIES',
          meta: {
            breadcrumb: [
              { title: 'Companies', url: '/' },
              { title: 'COMPANIES' },
              { title: 'List' }
            ],
            rule: 'editor'
          }
        },
        {
          path: '/users',
          component: () => import('@/views/users/Users.vue'),
          name: 'USERS',
          meta: {
            breadcrumb: [
              { title: 'Users', url: '/' },
              { title: 'USERS' },
              { title: 'List' }
            ],
            rule: 'editor'
          }
        },
        {
          path: '/settings',
          component: () => import('@/views/settings/Settings.vue'),
          name: 'SETTINGS',
          meta: {
            breadcrumb: [
              { title: 'Settings', url: '/' },
              { title: 'SETTINGS' },
              { title: 'List' }
            ],
            rule: 'editor'
          }
        },
        {
          path: '/tasks',
          component: () => import('@/views/tasks/Tasks.vue'),
          name: 'TASKS',
          meta: {
            breadcrumb: [
              { title: 'Tasks', url: '/' },
              { title: 'TASKS' },
              { title: 'List' }
            ],
            rule: 'editor'
          }
        },
        {
          path: '/history',
          component: () => import('@/views/history/History.vue'),
          name: 'HISTORY',
          meta: {
            breadcrumb: [
              { title: 'History', url: '/' },
              { title: 'HISTORY' },
              { title: 'List' }
            ],
            rule: 'editor'
          }
        },
        {
          path: '/payment',
          component: () => import('@/views/payment/Payment.vue'),
          name: 'PAYMENT',
          meta: {
            breadcrumb: [
              { title: 'Payment', url: '/' },
              { title: 'PAYMENT' },
              { title: 'List' }
            ],
            rule: 'editor'
          }
        },
        {
          path: '/reports',
          component: () => import('@/views/reports/Reports.vue'),
          name: 'REPORTS',
          meta: {
            breadcrumb: [
              { title: 'Reports', url: '/' },
              { title: 'REPORTS' },
              { title: 'List' }
            ],
            rule: 'editor'
          }
        },
        // =============================================================================
        // Main App Routes
        // =============================================================================
        {
          path: '/apps/timeclock',
          name: 'time-clock',
          component: TimeClock,
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Time Clock' },
              { title: 'List', active: true }
            ],
            rule: 'editor'
          }
        },
        {
          path: '/apps/shift/listing',
          name: 'shift-list',
          component: ShiftList,
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Shift' },
              { title: 'List', active: true }
            ],
            rule: 'editor'
          }
        },
        {
          path: '/apps/client/all',
          name: 'client-list',
          component: () => import('@/views/apps/user/user-list/UserList.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'ttt', I18n:'client_b_o'},
              { title: 'List' }
            ],
            rule: 'editor'
          }
        },
        {
          path: '/apps/client/client-edit/:userId',
          name: 'app-user-edit',
          component: () => import('@/views/apps/user/user-edit/UserEdit.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Client' },
              { title: 'Edit', active: true }
            ],
            rule: 'editor'
          }
        },
        {
          path: '/apps/client/client-view/:clientId',
          name: 'app-user-edit',
          component: () => import('@/views/apps/user/UserView.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/apps/site/all',
          name: 'site-list',
          component: () => import('@/views/apps/sites/SiteList.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Site' },
              { title: 'List', active: true }
            ],
            rule: 'editor'
          }
        },
        {
          path: '/apps/site/site-edit/:siteId',
          name: 'app-site-edit',
          component: () => import('@/views/apps/sites/SiteEdit.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Client' },
              { title: 'Edit', active: true }
            ],
            rule: 'editor'
          }
        },
        {
          path: '/apps/staff/all',
          name: 'staff-list',
          component: () => import('@/views/apps/staff/StaffList.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Staff' },
              { title: 'List', active: true }
            ],
            rule: 'editor'
          }
        }, {
          path: '/apps/contractor',
          name: 'contractor-list',
          component: () => import('@/views/apps/staff/subcontractor/SubcontractorList.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Staff' },
              { title: 'List', active: true }
            ],
            rule: 'editor'
          }
        },
        {
          path: '/apps/sia/check',
          name: 'sia-check',
          component: () => import('@/views/apps/sia/SiaCheck.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/apps/sia/reports',
          name: 'sia-report',
          component: () => import('@/views/apps/sia/SiaReport.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/profile',
          name: 'page-profile',
          component: () => import('@/views/pages/Profile.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'Profile', active: true }
            ],
            rule: 'editor'
          }
        },
        {
          path: '/pages/user-settings',
          name: 'page-user-settings',
          component: () => import('@/views/pages/user-settings/UserSettings.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'User Settings', active: true }
            ],
            pageTitle: 'Settings',
            rule: 'editor'
          }
        },
        {
          path: '/pages/faq',
          name: 'page-faq',
          component: () => import('@/views/pages/Faq.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'FAQ', active: true }
            ],
            pageTitle: 'FAQ',
            rule: 'editor'
          }
        },
        {
          path: '/pages/knowledge-base',
          name: 'page-knowledge-base',
          component: () => import('@/views/pages/KnowledgeBase.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'KnowledgeBase', active: true }
            ],
            pageTitle: 'KnowledgeBase',
            rule: 'editor'
          }
        },
        {
          path: '/pages/knowledge-base/category',
          name: 'page-knowledge-base-category',
          component: () => import('@/views/pages/KnowledgeBaseCategory.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'KnowledgeBase', url: '/pages/knowledge-base' },
              { title: 'Category', active: true }
            ],
            parent: 'page-knowledge-base',
            rule: 'editor'
          }
        },
        {
          path: '/pages/knowledge-base/category/question',
          name: 'page-knowledge-base-category-question',
          component: () => import('@/views/pages/KnowledgeBaseCategoryQuestion.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'KnowledgeBase', url: '/pages/knowledge-base' },
              { title: 'Category', url: '/pages/knowledge-base/category' },
              { title: 'Question', active: true }
            ],
            parent: 'page-knowledge-base',
            rule: 'editor'
          }
        },
        {
          path: '/pages/search',
          name: 'page-search',
          component: () => import('@/views/pages/Search.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'Search', active: true }
            ],
            pageTitle: 'Search',
            rule: 'editor'
          }
        },
        {
          path: '/pages/invoice',
          name: 'page-invoice',
          component: () => import('@/views/pages/Invoice.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'Invoice', active: true }
            ],
            pageTitle: 'Invoice',
            rule: 'editor'
          }
        }
 
      ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: '/callback',
          name: 'auth-callback',
          component: () => import('@/views/Callback.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/login',
          name: 'page-login',
          component: () => import('@/views/pages/login/Login.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/register',
          name: 'page-register',
          component: () => import('@/views/pages/register/Register.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/forgot-password',
          name: 'page-forgot-password',
          component: () => import('@/views/pages/ForgotPassword.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/reset-password',
          name: 'page-reset-password',
          component: () => import('@/views/pages/ResetPassword.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/lock-screen',
          name: 'page-lock-screen',
          component: () => import('@/views/pages/LockScreen.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/comingsoon',
          name: 'page-coming-soon',
          component: () => import('@/views/pages/ComingSoon.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/error-404',
          name: 'page-error-404',
          component: () => import('@/views/pages/Error404.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/error-500',
          name: 'page-error-500',
          component: () => import('@/views/pages/Error500.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/not-authorized',
          name: 'page-not-authorized',
          component: () => import('@/views/pages/NotAuthorized.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/maintenance',
          name: 'page-maintenance',
          component: () => import('@/views/pages/Maintenance.vue'),
          meta: {
            rule: 'editor'
          }
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/pages/error-404'
    }
  ]
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})


export default router
