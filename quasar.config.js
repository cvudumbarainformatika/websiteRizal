/* eslint-env node */

import { configure } from 'quasar/wrappers'

export default configure(function () {
  return {
    // === ESLint ===
    eslint: {
      warnings: true,
      errors: true
    },

    // === Boot Files ===
    boot: [
      { path: 'axios', server: false },
      { path: 'global-components', server: true },
      'router',
      { path: 'main', server: false }
    ],

    // === CSS Files ===
    css: ['app.scss'],

    // === Extra Icons ===
    extras: [
      'material-icons',
      'fontawesome-v6'
    ],

    // === Build Options ===
    build: {
      target: {
        browser: ['es2022', 'edge118', 'firefox115', 'chrome115', 'safari16'],
        node: 'node22'
      },
      vueRouterMode: 'history'
    },

    // === Dev Server ===
    devServer: {
      port: 9001,
      open: true
    },

    // === Quasar Framework Config ===
    framework: {
      config: {
        dark: true
      },
      plugins: [
        'Meta',
        'Notify',
        'LocalStorage',
        'Dialog',
        'Loading',
        'AppFullscreen'
      ]
    },

    // === Animations ===
    animations: ['fadeIn', 'fadeOut', 'slideInDown', 'slideOutUp'],

    // === SSR Mode ===
    ssr: {
      pwa: false,
      prodPort: 3000,
      maxAge: process.env.DEV
        ? 0
        : 1000 * 60 * 60 * 24 * 30,
      middlewares: [
        'proxy',
        ctx => import('compression').then(m => m.default()),
        'render'
      ],
      serverMemoryLimit: 256,
      compression: true,
      manualHydration: true,
      htmlVariables: {
        lang: 'id'
      },
      staticPaths: [
        'robots.txt',
        'sitemap.xml'
      ]
    },

    // === Electron App ===
    electron: {
      inspectPort: 5858,
      builder: {
        appId: 'MasterRizalRentCar'
      }
    }
  }
})
