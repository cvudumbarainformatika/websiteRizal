<template>
  <router-view />
</template>

<script setup>
import { onMounted, ref, provide } from 'vue'
import { useQuasar } from 'quasar'
import SettingController from 'src/backend/controllers/SettingController'

import customIcons from 'src/custom-icons/custom-icons'
const $q = useQuasar()
$q.dark.set(false)
$q.iconSet.set(customIcons)

// Buat state global untuk settings
const globalSettings = ref({})
// Sediakan untuk semua child components
provide('globalSettings', globalSettings)

onMounted(async () => {
  document.body.setAttribute('data-theme', 'wew') // Hanya dijalankan di klien
  
  // Ambil pengaturan dari DB
  const { data } = await SettingController.fetchSettings()
  if (data) {
    globalSettings.value = data
    // Pasang favicon dinamis
    if (data.site_favicon) {
      SettingController.injectFavicon(data.site_favicon)
    }
  }
})

</script>
