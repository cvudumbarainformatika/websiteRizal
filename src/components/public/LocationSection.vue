<template>
  <section id="lokasi" class="px-5 flex flex-col gap-4 max-w-4xl mx-auto w-full relative z-30 mb-10">
    
    <!-- Header -->
    <div class="mb-6 px-1 flex items-end justify-between">
      <div>
        <h2 class="text-gray-900 font-black leading-[1.25] text-[26px] tracking-tight mb-2">
          Lokasi Kami<br/>Mudah <span class="text-[#FFC107]">Dijangkau</span>
        </h2>
        <p class="font-body-md text-gray-500 text-[13px] leading-[1.6] max-w-[280px]">
          Kunjungi garasi kami atau dapatkan petunjuk arah via Google Maps.
        </p>
      </div>
      <button @click="router.push('/lokasi')" class="text-[#FFC107] font-bold text-[13px] flex items-center gap-1 hover:opacity-80 transition-opacity whitespace-nowrap pb-1">
        Lihat Semua
        <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
      </button>
    </div>

    <!-- Map Section -->
    <div class="bg-white rounded-[24px] p-[10px] border border-gray-200 shadow-[0_12px_40px_rgba(0,0,0,0.12)] flex flex-col items-center">
      <div class="h-44 w-full rounded-[16px] overflow-hidden relative cursor-pointer group mb-3" @click="openGoogleMaps">
        <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style="background-image: url('/assets/images/map_preview.jpg')"></div>
        <div class="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors"></div>
      </div>
      <button class="w-full text-[#FFC107] font-bold text-[14px] pb-2 pt-1 hover:opacity-80 transition-opacity" @click="openGoogleMaps">
        Lihat di Google Maps
      </button>
    </div>

    <!-- Contact Details -->
    <div class="bg-[#F9FAFB] rounded-[24px] p-6 flex flex-col gap-6 border border-gray-200">
      
      <!-- Alamat -->
      <div class="flex items-start gap-4">
        <div class="flex flex-shrink-0 items-center justify-center">
          <span class="material-symbols-outlined text-gray-900 text-[26px]">location_on</span>
        </div>
        <div class="mt-0.5">
          <h3 class="text-gray-900 font-extrabold text-[15px] mb-0.5 leading-none tracking-tight">Alamat Garasi</h3>
          <p class="text-gray-600 text-[13px] leading-snug" style="white-space: pre-wrap;">{{ globalSettings.contact_address || 'Jl. Sukapura, RT./004/RW./002, Triwung Kidul, Kec. Kademangan, Kota Probolinggo, Jawa Timur 67224' }}</p>
        </div>
      </div>
      
      <!-- WhatsApp -->
      <div class="flex items-start gap-4">
        <div class="flex flex-shrink-0 items-center justify-center">
          <svg class="w-[26px] h-[26px] text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
        </div>
        <div class="mt-0.5">
          <h4 class="text-gray-900 font-extrabold text-[15px] mb-0.5 leading-none tracking-tight">WhatsApp</h4>
          <p class="text-gray-600 text-[13px] leading-snug">{{ globalSettings.contact_wa || '+62 812-3456-7890' }}</p>
        </div>
      </div>
      
      <!-- Jam Operasional -->
      <div class="flex items-start gap-4">
        <div class="flex flex-shrink-0 items-center justify-center">
          <span class="material-symbols-outlined text-gray-900 text-[26px]">alarm</span>
        </div>
        <div class="mt-0.5">
          <h4 class="text-gray-900 font-extrabold text-[15px] mb-0.5 leading-none tracking-tight">Jam Operasional</h4>
          <p class="text-gray-600 text-[13px] leading-snug">Setiap Hari 07.00 - 21.00 WIB</p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const globalSettings = inject('globalSettings', ref({}))

const openGoogleMaps = () => {
  const url = globalSettings.value?.contact_map_link || 'https://www.google.com/maps/place/Master+Rizal+Rent+Car+%26+Motor+Bike/@-7.7778151,113.1694412,17z'
  window.open(url, '_blank')
}
</script>
