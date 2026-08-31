<template>
  <!-- NOTE: We don't use pb-28 here because we want AppFooter to sit normally at the bottom -->
  <div class="flex-grow flex flex-col bg-[#F3F4F6] w-full min-h-screen relative z-10">
    <!-- Header Global yang Ter-Animasi -->
    <AppHeader />
    
    <div class="pt-8"></div>
    
    <!-- Main Content -->
    <div class="px-5 flex flex-col gap-6 max-w-4xl mx-auto w-full relative mb-12 flex-grow">
      
      <!-- Peta Lokasi -->
      <div class="bg-white rounded-[24px] border border-gray-200 shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-[10px] flex flex-col items-center">
        <div class="h-48 sm:h-64 w-full rounded-[16px] overflow-hidden relative cursor-pointer group mb-3" @click="openGoogleMaps">
          <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style="background-image: url('/src/assets/images/map_preview.jpg')"></div>
          <div class="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors"></div>
        </div>
        <button class="w-full text-gray-900 bg-[#FFC107] font-extrabold text-[14px] py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2" @click="openGoogleMaps">
          <span class="material-symbols-outlined text-[20px]">directions</span>
          Lihat di Google Maps
        </button>
      </div>

      <!-- Info Kontak -->
      <div class="bg-white rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.08)] p-6 flex flex-col gap-6 border border-gray-100">
        
        <!-- Alamat -->
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 bg-gray-50 rounded-full flex flex-shrink-0 items-center justify-center border border-gray-100">
            <span class="material-symbols-outlined text-gray-900 text-[24px]">location_on</span>
          </div>
          <div class="mt-1">
            <h4 class="text-gray-900 font-extrabold text-[16px] mb-1 leading-none tracking-tight">Alamat Garasi</h4>
            <p class="text-gray-600 text-[14px] leading-relaxed" style="white-space: pre-wrap;">{{ globalSettings?.contact_address || 'Jl. Sukapura, RT./004/RW./002, Triwung Kidul, Kec. Kademangan, Kota Probolinggo, Jawa Timur 67224' }}</p>
          </div>
        </div>
        
        <hr class="border-gray-100" />
        
        <!-- WhatsApp -->
        <div class="flex items-start gap-4 cursor-pointer group" @click="contactWhatsApp">
          <div class="w-12 h-12 bg-gray-50 rounded-full flex flex-shrink-0 items-center justify-center border border-gray-100 group-hover:bg-[#25D366] transition-colors">
            <svg class="w-[24px] h-[24px] text-gray-900 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </div>
          <div class="mt-1 flex-1">
            <h4 class="text-gray-900 font-extrabold text-[16px] mb-1 leading-none tracking-tight">WhatsApp / Telepon</h4>
            <p class="text-gray-600 text-[14px] leading-relaxed">+62 812-3456-7890</p>
          </div>
          <div class="mt-2 text-gray-400 group-hover:text-gray-900 transition-colors">
            <span class="material-symbols-outlined text-[20px]">chevron_right</span>
          </div>
        </div>
        
        <hr class="border-gray-100" />
        
        <!-- Jam Operasional -->
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 bg-gray-50 rounded-full flex flex-shrink-0 items-center justify-center border border-gray-100">
            <span class="material-symbols-outlined text-gray-900 text-[24px]">schedule</span>
          </div>
          <div class="mt-1">
            <h4 class="text-gray-900 font-extrabold text-[16px] mb-1 leading-none tracking-tight">Jam Operasional</h4>
            <p class="text-gray-600 text-[14px] leading-relaxed flex flex-col gap-1">
              <span class="flex justify-between w-40"><span>Setiap Hari</span><span class="font-bold text-[#FFC107]">Buka 24 Jam</span></span>
            </p>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { inject, ref } from 'vue'
import { useMeta } from 'quasar'
import AppHeader from 'components/global/AppHeader.vue'

const globalSettings = inject('globalSettings', ref({}))

useMeta(() => {
  const baseName = globalSettings.value?.website_name || 'Master Rizal Rent Car'
  const title = `Lokasi & Kontak | ${baseName}`
  const desc = `Hubungi ${baseName} untuk penyewaan mobil dan motor di Probolinggo. Temukan lokasi kami dan hubungi via WhatsApp untuk respon cepat 24 jam.`

  return {
    title: 'Lokasi & Kontak',
    meta: {
      description: { name: 'description', content: desc },
      ogTitle: { property: 'og:title', content: title },
      ogDesc: { property: 'og:description', content: desc },
      twTitle: { name: 'twitter:title', content: title },
      twDesc: { name: 'twitter:description', content: desc }
    }
  }
})

const openGoogleMaps = () => {
  const url = globalSettings.value?.contact_map_link || 'https://www.google.com/maps/place/Master+Rizal+Rent+Car+%26+Motor+Bike/@-7.7778151,113.1694412,17z'
  window.open(url, '_blank')
}

const contactWhatsApp = () => {
  const wa = globalSettings.value?.contact_wa_link || '6285330222494'
  const text = encodeURIComponent('Halo Master Rizal, saya ingin bertanya tentang sewa kendaraan.')
  window.open(`https://wa.me/${wa}?text=${text}`, '_blank')
}
</script>
