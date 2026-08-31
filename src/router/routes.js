const routes = [
  // 1. Layout Public (Public Website Landing Page)
  {
    path: '/',
    component: () => import('layouts/PublicLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/public/LandingPage.vue'),
        meta: { depth: 1 }
      },
      {
        path: 'armada',
        name: 'fleet-detail',
        component: () => import('pages/public/FleetDetailPage.vue'),
        meta: { hideFooter: true, title: 'Armada Kami', depth: 2 }
      },
      {
        path: 'testimoni',
        name: 'testimoni-detail',
        component: () => import('pages/public/TestimonialDetailPage.vue'),
        meta: { hideFooter: true, title: 'Ulasan Pelanggan', depth: 2 }
      },
      {
        path: 'lokasi',
        name: 'location-detail',
        component: () => import('pages/public/LocationPage.vue'),
        meta: { title: 'Lokasi & Kontak', depth: 2 }
      }
    ]
  },

  // 2. Layout Admin (Dashboard Admin)
  {
    path: '/setset',
    component: () => import('layouts/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'admin-dashboard',
        component: () => import('pages/admin/DashboardPage.vue')
      },
      {
        path: 'armada',
        name: 'admin-fleet',
        component: () => import('pages/admin/FleetPage.vue')
      },
      {
        path: 'ulasan',
        name: 'admin-review',
        component: () => import('pages/admin/ReviewPage.vue')
      },
      {
        path: 'pengaturan',
        name: 'admin-settings',
        component: () => import('pages/admin/SettingsPage.vue')
      }
    ]
  },

  // 3. Admin Login (No Layout)
  {
    path: '/setset/login',
    name: 'admin-login',
    component: () => import('pages/admin/LoginPage.vue')
  },

  // Catch-all 404 Page
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
