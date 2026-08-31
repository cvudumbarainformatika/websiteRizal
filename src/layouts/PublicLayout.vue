<template>
  <div class="min-h-screen bg-black text-gray-900 flex flex-col relative font-body-md w-full">
    <!-- Main Page Container with true iOS Transition -->
    <div class="flex-grow flex flex-col w-full min-w-0 relative">
      <router-view v-slot="{ Component }">
        <transition :name="transitionName">
          <component :is="Component" class="page-component" />
        </transition>
      </router-view>
    </div>

    <!-- Footer -->
    <AppFooter v-if="!$route.meta.hideFooter" />

    <!-- Floating Mobile Bottom Navigation -->
    <AppBottomNav />
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMeta } from 'quasar'
import { supabase } from 'src/utils/supabase'
import AppFooter from 'components/global/AppFooter.vue'
import AppBottomNav from 'components/global/AppBottomNav.vue'

const globalSettings = inject('globalSettings', ref({}))
const router = useRouter()
const transitionName = ref('slide-ios')

const trackVisit = async () => {
  try {
    let sessionId = sessionStorage.getItem('visitor_session_id')
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 15)
      sessionStorage.setItem('visitor_session_id', sessionId)
      
      await supabase.from('page_views').insert({
        path: window.location.pathname,
        session_id: sessionId
      })
    }
  } catch (error) {
    // Silent fail for tracker
  }
}

onMounted(() => {
  trackVisit()
})

// Konfigurasi SEO Dasar & Schema.org (SSR Ready)
useMeta(() => {
  const siteName = globalSettings.value?.website_name || 'Master Rizal Rent Car & Motor Bike'
  const desc = 'Layanan sewa mobil dan motor terbaik di Probolinggo. Unit terawat, harga bersahabat, pelayanan 24 jam.'
  const logo = globalSettings.value?.site_logo || '/assets/images/logo-mr-gold.png'
  const wa = globalSettings.value?.whatsapp_number || '+6285330222494'
  const address = globalSettings.value?.contact_address || 'Jl. Sukapura, Kota Probolinggo'

  const schema = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    "name": siteName,
    "image": logo,
    "telephone": wa,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address,
      "addressLocality": "Probolinggo",
      "addressRegion": "Jawa Timur",
      "addressCountry": "ID"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "681"
    },
    "priceRange": "Rp 60.000 - Rp 550.000",
    "openingHours": "Mo-Su 00:00-23:59"
  }

  return {
    title: 'Sewa Mobil & Motor Terpercaya Probolinggo',
    titleTemplate: title => `${title} | ${siteName}`,
    meta: {
      description: { name: 'description', content: desc },
      ogTitle: { property: 'og:title', content: `Sewa Mobil & Motor Terpercaya Probolinggo | ${siteName}` },
      ogDesc: { property: 'og:description', content: desc },
      ogImage: { property: 'og:image', content: logo },
      ogType: { property: 'og:type', content: 'website' },
      twCard: { name: 'twitter:card', content: 'summary_large_image' },
      twTitle: { name: 'twitter:title', content: `Sewa Mobil & Motor Terpercaya Probolinggo | ${siteName}` },
      twDesc: { name: 'twitter:description', content: desc },
      twImage: { name: 'twitter:image', content: logo },
    },
    script: {
      jsonLD: {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(schema)
      }
    }
  }
})

router.afterEach((to, from) => {
  const toDepth = to.meta.depth || 1
  const fromDepth = from.meta.depth || 1
  // Jika menuju ke route yang depth-nya lebih kecil, berarti kembali (back)
  transitionName.value = toDepth < fromDepth ? 'slide-ios-back' : 'slide-ios'
})
</script>

<style>
/* Global fix to prevent horizontal scroll during animation without breaking sticky */
html, body {
  overflow-x: clip;
}

/* True iOS-like slide transition */
.page-component {
  width: 100%;
  min-height: 100vh;
  background-color: white; /* Base color to prevent black flashing */
}

/* =========================================
   FORWARD ANIMATION (slide-ios)
   ========================================= */
.slide-ios-enter-active,
.slide-ios-leave-active {
  transition: transform 0.4s cubic-bezier(0.36, 0.66, 0.04, 1), opacity 0.4s ease;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
}

.slide-ios-enter-active {
  z-index: 20;
  box-shadow: -15px 0 30px rgba(0,0,0,0.15); /* Shadow on incoming page */
}

.slide-ios-leave-active {
  z-index: 10;
}

.slide-ios-enter-from {
  transform: translateX(100%);
}

.slide-ios-enter-to {
  transform: translateX(0);
}

.slide-ios-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-ios-leave-to {
  transform: translateX(-25%); /* Parallax slide for outgoing page */
  opacity: 0.8; /* Slight dimming */
}

/* =========================================
   BACKWARD ANIMATION (slide-ios-back)
   ========================================= */
.slide-ios-back-enter-active,
.slide-ios-back-leave-active {
  transition: transform 0.4s cubic-bezier(0.36, 0.66, 0.04, 1), opacity 0.4s ease;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
}

.slide-ios-back-enter-active {
  z-index: 10; /* Halaman sebelumnya (di bawah) */
}

.slide-ios-back-leave-active {
  z-index: 20; /* Halaman saat ini (di atas) yang akan digeser keluar */
  box-shadow: -15px 0 30px rgba(0,0,0,0.15);
}

.slide-ios-back-enter-from {
  transform: translateX(-25%);
  opacity: 0.8;
}

.slide-ios-back-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-ios-back-leave-from {
  transform: translateX(0);
}

.slide-ios-back-leave-to {
  transform: translateX(100%);
}
</style>
