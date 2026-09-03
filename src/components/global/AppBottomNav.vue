<template>
  <nav class="md:hidden fixed bottom-4 left-4 right-4 bg-[#18181B] flex justify-around items-center py-3 px-2 z-50 rounded-[24px] shadow-[0_16px_40px_rgba(0,0,0,0.4)] border border-[#27272A]">
    
    <!-- Beranda -->
    <a @click.prevent="navigateHome('#beranda')" :class="['flex flex-col items-center justify-center w-1/5 transition-colors cursor-pointer', route.path === '/' ? 'text-[#FFC107]' : 'text-[#E4E4E7] hover:text-white']">
      <span class="material-symbols-outlined text-[24px] mb-1 leading-none">home</span>
      <span :class="['text-[10px] tracking-wide', route.path === '/' ? 'font-bold' : 'font-medium']">Beranda</span>
    </a>
    
    <!-- Armada -->
    <router-link to="/armada" :class="['flex flex-col items-center justify-center w-1/5 transition-colors cursor-pointer', route.path === '/armada' ? 'text-[#FFC107]' : 'text-[#E4E4E7] hover:text-white']">
      <span class="material-symbols-outlined text-[24px] mb-1 leading-none">directions_car</span>
      <span :class="['text-[10px] tracking-wide', route.path === '/armada' ? 'font-bold' : 'font-medium']">Armada</span>
    </router-link>
    
    <!-- Galeri -->
    <router-link to="/dokumentasi" :class="['flex flex-col items-center justify-center w-1/5 transition-colors cursor-pointer', route.path === '/dokumentasi' ? 'text-[#FFC107]' : 'text-[#E4E4E7] hover:text-white']">
      <span class="material-symbols-outlined text-[24px] mb-1 leading-none">photo_camera</span>
      <span :class="['text-[10px] tracking-wide', route.path === '/dokumentasi' ? 'font-bold' : 'font-medium']">Galeri</span>
    </router-link>

    <!-- Testimoni -->
    <router-link to="/testimoni" :class="['flex flex-col items-center justify-center w-1/5 transition-colors cursor-pointer', route.path === '/testimoni' ? 'text-[#FFC107]' : 'text-[#E4E4E7] hover:text-white']">
      <span class="material-symbols-outlined text-[24px] mb-1 leading-none">chat</span>
      <span :class="['text-[10px] tracking-wide', route.path === '/testimoni' ? 'font-bold' : 'font-medium']">Testimoni</span>
    </router-link>
    
    <!-- Lokasi & Kontak -->
    <router-link to="/lokasi" :class="['flex flex-col items-center justify-center w-1/5 transition-colors cursor-pointer', route.path === '/lokasi' ? 'text-[#FFC107]' : 'text-[#E4E4E7] hover:text-white']">
      <span class="material-symbols-outlined text-[24px] mb-1 leading-none">location_on</span>
      <span :class="['text-[10px] tracking-wide', route.path === '/lokasi' ? 'font-bold' : 'font-medium']">Lokasi</span>
    </router-link>

  </nav>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const navigateHome = (hash) => {
  if (route.path !== '/') {
    router.push({ path: '/', hash: hash })
  } else {
    const el = document.querySelector(hash)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
</script>
