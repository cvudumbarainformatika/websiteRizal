<template>
  <div class="flex-grow flex flex-col bg-[#F3F4F6] w-full min-h-screen pb-28 pt-0 relative z-10">
    <AppHeader />
    <div class="pt-8"></div>
    
    <!-- Fleet List -->
    <div class="px-5 flex flex-col gap-5 max-w-4xl mx-auto w-full relative min-h-[400px]">
      
      <!-- SKELETON LOADING -->
      <div v-if="isLoading" class="flex flex-col gap-5">
        <div v-for="n in 3" :key="'skeleton-'+n" class="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden flex flex-col animate-pulse">
          <!-- Image Skeleton -->
          <div class="w-full h-[220px] bg-gray-200"></div>
          <!-- Content Skeleton -->
          <div class="p-5 flex flex-col flex-grow">
            <div class="h-6 bg-gray-200 rounded-md w-2/3 mb-5"></div>
            <!-- Specs Skeleton -->
            <div class="flex flex-wrap gap-2 mb-6">
              <div class="h-6 w-16 bg-gray-100 rounded-xl"></div>
              <div class="h-6 w-16 bg-gray-100 rounded-xl"></div>
              <div class="h-6 w-12 bg-gray-100 rounded-xl"></div>
            </div>
            <!-- Footer Skeleton -->
            <div class="mt-auto pt-4 border-t border-gray-50 flex items-center">
              <div class="h-11 w-full bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- ACTUAL DATA -->
      <transition-group v-else-if="filteredVehicles.length > 0" name="list" tag="div" class="flex flex-col gap-5">
        <div 
          v-for="vehicle in filteredVehicles" 
          :key="vehicle.id"
          class="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden flex flex-col group border border-gray-100"
        >
          <!-- Image Section -->
          <div class="w-full h-[220px] relative overflow-hidden bg-gray-50">
            <img :src="vehicle.image_url" :alt="`Sewa ${vehicle.name} di Probolinggo`" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
            
            <!-- Subtle Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-80"></div>

            <!-- Tag Type (Glassmorphism) -->
            <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-gray-900 font-extrabold text-[11px] px-3.5 py-1.5 rounded-full tracking-wide shadow-sm flex items-center gap-1.5 capitalize">
              <span class="material-symbols-outlined text-[14px]" v-if="vehicle.categories?.slug === 'mobil'">directions_car</span>
              <span class="material-symbols-outlined text-[14px]" v-else>two_wheeler</span>
              {{ vehicle.categories?.name || 'Armada' }}
            </div>
          </div>

          <!-- Content Section -->
          <div class="p-5 flex flex-col flex-grow">
            <h3 class="font-display-lg text-gray-900 font-extrabold text-[19px] leading-tight mb-4 tracking-tight group-hover:text-[#FFC107] transition-colors duration-300">{{ vehicle.name }}</h3>
            
            <!-- Specs (Pill Style) -->
            <div class="flex flex-wrap gap-2 text-gray-600 mb-5">
              <div class="flex items-center gap-1 bg-gray-50 border border-gray-100 px-2.5 py-1.5 rounded-xl text-[11px] font-bold" v-if="vehicle.capacity">
                <span class="material-symbols-outlined text-[14px] text-gray-400">airline_seat_recline_normal</span>
                <span>{{ vehicle.capacity }} Kursi</span>
              </div>
              <div class="flex items-center gap-1 bg-gray-50 border border-gray-100 px-2.5 py-1.5 rounded-xl text-[11px] font-bold" v-if="vehicle.transmission">
                <span class="material-symbols-outlined text-[14px] text-gray-400">settings</span>
                <span>{{ vehicle.transmission }}</span>
              </div>
              
              <!-- Map Fitur Lainnya -->
              <template v-if="vehicle.features && vehicle.features.length">
                <div v-for="(feat, idx) in vehicle.features.slice(0, 2)" :key="idx" class="flex items-center gap-1 bg-gray-50 border border-gray-100 px-2.5 py-1.5 rounded-xl text-[11px] font-bold">
                  <span class="material-symbols-outlined text-[14px] text-gray-400">check_circle</span>
                  <span>{{ feat }}</span>
                </div>
              </template>
            </div>

            <!-- Action Button Footer -->
            <div class="mt-auto pt-4 border-t border-gray-100 flex items-center">
              <button @click="handleBooking(vehicle.name)" class="w-full bg-[#FFC107] hover:bg-[#FFD54F] text-gray-900 font-bold text-[13px] py-3 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2 shadow-sm active:scale-[0.99]">
                <span>Tanya Ketersediaan & Sewa</span>
                <span class="material-symbols-outlined text-[16px] leading-none">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </transition-group>

      <!-- Empty State (No Results) -->
      <div v-else class="absolute inset-0 flex flex-col items-center justify-center text-center px-6 mt-20">
        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-5">
          <span class="material-symbols-outlined text-[40px] text-gray-300">search_off</span>
        </div>
        <h3 class="font-display-lg font-black text-gray-900 text-[18px] mb-2 tracking-tight">Kendaraan Tidak Ditemukan</h3>
        <p class="text-gray-500 text-[13px] leading-relaxed max-w-[280px]">
          Maaf, armada yang Anda cari tidak tersedia. Coba gunakan kata kunci lain atau ubah filter pencarian Anda.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, inject } from 'vue'
import { useRoute } from 'vue-router'
import { useMeta } from 'quasar'
import AppHeader from 'components/global/AppHeader.vue'
import VehicleController from 'src/backend/controllers/VehicleController'
import { formatRupiah } from 'src/backend/helpers/format'

const route = useRoute()
const globalSettings = inject('globalSettings', ref({}))
const isLoading = ref(true)
const vehicles = ref([])

// Dynamic Meta Override
useMeta(() => {
  const filter = route.query.filter || 'Semua'
  const search = route.query.search || ''
  const baseName = globalSettings.value?.website_name || 'Master Rizal Rent Car'
  
  let pageTitle = 'Pilih Armada Sewa'
  if (filter !== 'Semua') pageTitle = `Sewa ${filter.charAt(0).toUpperCase() + filter.slice(1)}`
  if (search) pageTitle = `Cari Kendaraan: ${search}`

  const desc = `Lihat daftar lengkap armada sewa mobil dan motor di Probolinggo. Pilihan unit terlengkap dengan harga bersahabat di ${baseName}.`

  return {
    title: pageTitle,
    meta: {
      description: { name: 'description', content: desc },
      ogTitle: { property: 'og:title', content: `${pageTitle} | ${baseName}` },
      ogDesc: { property: 'og:description', content: desc },
      twTitle: { name: 'twitter:title', content: `${pageTitle} | ${baseName}` },
      twDesc: { name: 'twitter:description', content: desc },
    }
  }
})

onMounted(async () => {
  const { data, error } = await VehicleController.fetchAll()
  if (!error && data) {
    vehicles.value = data
  }
  isLoading.value = false
})

const filteredVehicles = computed(() => {
  const currentFilter = route.query.filter || 'Semua'
  const searchQuery = (route.query.search || '').toLowerCase()
  
  let result = vehicles.value

  if (currentFilter !== 'Semua') {
    // Memastikan perbandingan case-insensitive terhadap slug kategori
    result = result.filter(v => v.categories && v.categories.slug.toLowerCase() === currentFilter.toLowerCase())
  }

  if (searchQuery) {
    result = result.filter(v => v.name.toLowerCase().includes(searchQuery))
  }

  return result
})

const handleBooking = (name) => {
  const wa = globalSettings.value?.contact_wa_link || '6285330222494'
  const text = encodeURIComponent(`Halo Master Rizal, saya tertarik untuk menyewa ${name}. Bisa minta infonya?`)
  window.open(`https://wa.me/${wa}?text=${text}`, '_blank')
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
