<template>
  <div class="relative w-full flex flex-col bg-white">
    <!-- Hero Image Background -->
    <section id="beranda" class="relative w-full px-5 pt-16 pb-32 flex flex-col justify-center min-h-[500px] bg-white z-10">
      
      <!-- Background Image -->
      <div class="absolute inset-0 z-0 bg-black">
        <div class="absolute inset-0 bg-cover bg-center opacity-70" :style="`background-image: url('${globalSettings.hero_banner || '/src/assets/images/hero_bg.jpg'}')`"></div>
        <!-- Gradient overlay: Dark at top, fading to transparent -->
        <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-transparent"></div>
        <!-- Smooth White Fade at bottom -->
        <div class="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent z-0"></div>
      </div>

      <div class="relative z-10 flex flex-col w-full max-w-4xl mx-auto mt-2">
        <h1 class="font-display-lg-mobile md:font-display-lg text-white font-extrabold leading-[1.2] text-[34px] mb-3 tracking-tight" v-html="formattedHeroTitle"></h1>
        <p class="font-body-md text-gray-200 mb-8 text-[13px] leading-relaxed max-w-[280px]">
          {{ globalSettings.hero_subtitle || 'Pilihan terbaik untuk sewa mobil dan motor di Banyuwangi dengan harga terjangkau.' }}
        </p>
        
        <div class="flex flex-col sm:flex-row gap-3 w-full">
          <button class="w-full bg-primary text-black font-title-sm font-bold py-[15px] px-6 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity" @click="openWhatsApp(globalSettings.contact_wa_link)">
            <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'wght' 600;">chat</span>
            WhatsApp Kami
          </button>
          <button class="w-full bg-transparent text-white border-[1.5px] border-primary/70 font-title-sm font-bold py-[15px] px-6 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center" @click="goToFleet">
            Lihat Armada
          </button>
        </div>
      </div>
    </section>

    <!-- Trust Badges (Overlapping) -->
    <section class="px-5 max-w-4xl mx-auto w-full relative z-20 -mt-[72px] mb-10 bg-transparent">
      <div class="grid grid-cols-3 gap-1 p-5 bg-[#171717] rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
        <div class="flex flex-col items-center text-center gap-1.5">
          <span class="material-symbols-outlined text-primary text-[38px] mb-0.5 drop-shadow-sm" style="font-variation-settings: 'wght' 300;">verified_user</span>
          <span class="font-title-sm text-white text-[11px] font-semibold leading-snug tracking-wide">Aman &<br/>Terpercaya</span>
        </div>
        <div class="flex flex-col items-center text-center gap-1.5">
          <span class="material-symbols-outlined text-primary text-[38px] mb-0.5 drop-shadow-sm" style="font-variation-settings: 'wght' 300;">local_offer</span>
          <span class="font-title-sm text-white text-[11px] font-semibold leading-snug tracking-wide">Harga<br/>Terbaik</span>
        </div>
        <div class="flex flex-col items-center text-center gap-1.5">
          <span class="material-symbols-outlined text-primary text-[38px] mb-0.5 drop-shadow-sm" style="font-variation-settings: 'wght' 300;">support_agent</span>
          <span class="font-title-sm text-white text-[11px] font-semibold leading-snug tracking-wide">Layanan<br/>24 Jam</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { inject, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const globalSettings = inject('globalSettings', ref({}))

const formattedHeroTitle = computed(() => {
  let title = globalSettings.value?.hero_title || 'Sewa Kendaraan<br/>Banyuwangi'
  // Trim spaces and find the last word, then wrap it in the yellow class (text-[#FFC107])
  return title.trim().replace(/([^\s>]+)((?:<[^>]+>|\s)*)$/, '<span class="text-[#FFC107]">$1</span>$2')
})

const openWhatsApp = (link) => {
  const wa = link || '6285330222494'
  window.open(`https://wa.me/${wa}?text=Halo%20Master%20Rizal,%20saya%20ingin%20tanya%20sewa%20kendaraan`, '_blank')
}

const goToFleet = () => {
  router.push('/armada')
}
</script>
