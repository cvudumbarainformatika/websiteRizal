<template>
  <footer class="w-full bg-[#18181B] rounded-t-[32px] pb-28 md:pb-12 relative overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
    <div class="w-full max-w-4xl mx-auto flex flex-col items-center text-center px-6 pt-10 md:pt-12">
      
      <!-- Top Section -->
      <h2 class="text-white font-extrabold text-[22px] md:text-[26px] mb-3 leading-tight tracking-tight">Siap Menyewa<br/>Kendaraan?</h2>
      <p class="text-gray-300 text-[13.5px] mb-8 max-w-sm leading-relaxed">Hubungi kami sekarang dan dapatkan penawaran terbaik untuk Anda!</p>
      
      <button @click="openWhatsApp" class="w-full max-w-[300px] bg-[#FFC107] text-gray-900 font-bold text-[14.5px] py-3.5 rounded-[14px] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
        <svg class="w-[18px] h-[18px] text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
        Chat via WhatsApp
      </button>

      <!-- Divider -->
      <hr class="w-full border-[#27272A] my-10" />

      <!-- Bottom Section -->
      <img :src="globalSettings?.site_logo || logoPlaceholder" alt="Master Rizal Logo" class="h-10 mx-auto mb-5 mix-blend-screen grayscale-[20%] contrast-125 object-contain" />
      
      <p class="text-gray-400 text-[12.5px] max-w-[280px] leading-[1.6] mb-8 font-medium">
        Sewa mobil & motor terpercaya di Probolinggo.<br/>Layanan terbaik untuk perjalanan Anda!
      </p>

      <!-- Social Icons -->
      <div class="flex items-center gap-4 mb-8">
        <a href="#" @click.prevent="openWhatsApp" class="w-11 h-11 rounded-full border border-[#3F3F46] bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors group">
          <svg class="w-5 h-5 text-[#22c55e] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
        </a>
        <a href="#" class="w-11 h-11 rounded-full border border-[#3F3F46] bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors group">
          <svg class="w-5 h-5 text-[#E4E4E7] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>
        <a href="#" class="w-11 h-11 rounded-full border border-[#3F3F46] bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors group">
          <svg class="w-[22px] h-[22px] text-[#E4E4E7] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21.5 12.3c0-.8-.1-1.5-.2-2.3H12v4.4h5.4c-.2 1.4-1 2.6-2.2 3.4v2.8h3.6c2.1-1.9 3.3-4.8 3.3-8.3z"></path>
            <path d="M12 22.5c2.7 0 5-1 6.7-2.6l-3.6-2.8c-.9.6-2.1 1-3.1 1-2.4 0-4.4-1.6-5.1-3.8H3.2v2.9c1.7 3.4 5.3 5.3 8.8 5.3z"></path>
            <path d="M6.9 14.3c-.2-.6-.3-1.2-.3-1.8s.1-1.2.3-1.8V7.8H3.2C2.5 9.1 2 10.5 2 12s.5 2.9 1.2 4.2l3.7-1.9z"></path>
            <path d="M12 5.5c1.5 0 2.8.5 3.9 1.5l2.9-2.9C17 2.4 14.7 1.5 12 1.5 8.5 1.5 4.9 3.4 3.2 6.8l3.7 2.9c.7-2.2 2.7-4.2 5.1-4.2z"></path>
          </svg>
        </a>
      </div>

      <!-- Copyright -->
      <div class="text-[#71717A] text-[11.5px] leading-[1.6]">
        <p>© 2026 Master Rizal Rent Car & Motor Bike</p>
        <p>All rights reserved.</p>
      </div>

    </div>
  </footer>
</template>

<script setup>
import { inject, ref } from 'vue'
import { formatWhatsAppNumber } from 'src/backend/helpers/format'

const globalSettings = inject('globalSettings', ref({}))
const logoPlaceholder = '/assets/images/logo-mr-gold.png'

const openWhatsApp = () => {
  const rawWa = globalSettings.value?.contact_wa_link || globalSettings.value?.contact_wa
  const wa = formatWhatsAppNumber(rawWa)
  window.open(`https://wa.me/${wa}?text=Halo%20Master%20Rizal,%20saya%20ingin%20tanya%20sewa%20kendaraan`, '_blank')
}
</script>
