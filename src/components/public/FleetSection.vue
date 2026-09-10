<template>
  <section id="armada" class="max-w-4xl mx-auto w-full relative z-30 mb-10 pt-4">
    <!-- Header -->
    <div class="mb-6 px-4 flex items-end justify-between">
      <div>
        <h2 class="text-gray-900 font-black leading-[1.25] text-[26px] tracking-tight mb-2">
          Pilih Kendaraan<br/>Sesuai <span class="text-[#FFC107]">Kebutuhan Anda</span>
        </h2>
        <p class="font-body-md text-gray-500 text-[13px] leading-[1.6] max-w-[280px]">
          Tersedia berbagai pilihan mobil & motor<br/>dengan kondisi prima.
        </p>
      </div>
      <button @click="goToListing" class="text-[#FFC107] font-bold text-[13px] flex items-center gap-1 hover:opacity-80 transition-opacity whitespace-nowrap pb-1">
        Lihat Semua
        <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
      </button>
    </div>

    <!-- Vehicle Horizontal Scroll -->
    <div class="flex flex-row flex-nowrap items-stretch overflow-x-auto gap-4 snap-x snap-mandatory px-4 pb-4 hide-scrollbar w-full md:justify-center" style="scrollbar-width: none; -ms-overflow-style: none;">
      
      <!-- SKELETON LOADING -->
      <template v-if="isLoading">
        <div v-for="n in 3" :key="'skeleton-home-'+n" class="snap-start shrink-0 w-[220px] sm:w-[240px] bg-white rounded-[20px] border border-gray-100 shadow-sm overflow-hidden flex flex-col animate-pulse">
          <div class="w-full h-[150px] bg-gray-200 shrink-0"></div>
          <div class="p-4 pt-3 flex flex-col flex-grow">
            <div class="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div class="mt-auto h-9 bg-gray-100 rounded-[12px] w-full"></div>
          </div>
        </div>
      </template>

      <!-- ACTUAL DATA -->
      <template v-else>
      <!-- Card Dinamis -->
      <div v-for="vehicle in vehicles" :key="vehicle.id" class="snap-start shrink-0 w-[220px] sm:w-[240px] bg-white rounded-[20px] border border-gray-200 shadow-[0_12px_40px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col group">
        <!-- Top: Edge-to-edge Image -->
        <div class="w-full h-[150px] relative bg-gray-100 overflow-hidden shrink-0">
          <img :alt="`Sewa ${vehicle.name} di Probolinggo`" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" :src="vehicle.image_url"/>
        </div>
        
        <!-- Bottom: Text Content -->
        <div class="p-4 pt-3 flex flex-col flex-grow bg-white justify-between">
          <div class="mb-4">
            <h3 class="font-title-sm text-gray-900 font-extrabold text-[15.5px] leading-snug tracking-tight line-clamp-1">{{ vehicle.name }}</h3>
            <span class="inline-block mt-1 text-[11px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
              {{ vehicle.categories?.name || 'Unit Prima' }}
            </span>
          </div>
          <button class="mt-auto w-full bg-white text-gray-900 border-[1.5px] border-[#FFE48A] font-title-sm text-[13px] font-bold py-2.5 rounded-[12px] hover:bg-[#FFC107]/10 transition-colors flex items-center justify-center gap-1" @click="handleBooking(vehicle.name)">
            Lihat Unit
            <span class="material-symbols-outlined text-[15px]">arrow_forward</span>
          </button>
        </div>
      </div>
      </template>
    </div>

    <!-- Long Term Banner -->
    <div class="mt-8 px-4">
      <div class="bg-[#18181B] rounded-[24px] p-6 flex flex-col relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] min-h-[160px]">
        <div class="relative z-10 flex flex-col gap-2 w-[60%]">
          <h3 class="font-title-sm text-white font-bold leading-[1.3] text-[18px] tracking-tight">Butuh Sewa<br/><span class="text-[#FDE047]">Jangka Panjang?</span></h3>
          <p class="text-[12px] text-gray-300 leading-[1.6] mb-4">Dapatkan harga spesial untuk sewa mingguan & bulanan.</p>
          <button class="self-start bg-[#FFC107] text-gray-900 font-black text-[12px] py-2.5 px-5 rounded-[10px] hover:opacity-90 transition-opacity" @click="handleBooking('Jangka Panjang')">
            Hubungi Kami
          </button>
        </div>
        <!-- Black Xpander Image Absolute positioned to right -->
        <div class="absolute -right-8 top-1/2 -translate-y-1/2 w-[240px] h-auto z-0 pointer-events-none">
          <img src="/assets/images/car_xpander.jpg" alt="Sewa Mobil Jangka Panjang Probolinggo" class="w-full h-full object-contain mix-blend-multiply brightness-110 contrast-125" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import VehicleController from 'src/backend/controllers/VehicleController'
import { formatWhatsAppNumber } from 'src/backend/helpers/format'

const router = useRouter()
const globalSettings = inject('globalSettings', ref({}))
const isLoading = ref(true)
const vehicles = ref([])

onMounted(async () => {
  const { data, error } = await VehicleController.fetchAll()
  if (!error) {
    // Untuk beranda, tampilkan maksimal 3 kendaraan saja sebagai preview
    vehicles.value = data.slice(0, 3)
  }
  isLoading.value = false
})

const goToListing = () => {
  router.push('/armada')
}

const handleBooking = (type) => {
  if (type === 'Jangka Panjang') {
    const rawWa = globalSettings.value?.contact_wa_link || globalSettings.value?.contact_wa
    const wa = formatWhatsAppNumber(rawWa)
    const text = encodeURIComponent(`Halo Master Rizal, saya tertarik untuk sewa Jangka Panjang. Bisa minta infonya?`)
    window.open(`https://wa.me/${wa}?text=${text}`, '_blank')
  } else {
    router.push('/armada')
  }
}
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
