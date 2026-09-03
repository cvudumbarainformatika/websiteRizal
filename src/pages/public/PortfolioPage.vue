<template>
  <div class="w-full flex-grow flex flex-col bg-gray-50 pb-20 relative z-10 min-h-screen">
    <AppHeader />
    
    <!-- Hero Section -->
    <section class="bg-gray-900 pt-32 pb-20 px-5 text-center relative overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1516362540502-42171ecba3a2?q=80&w=2000&auto=format&fit=crop" class="w-full h-full object-cover opacity-10 object-center" />
        <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/40"></div>
      </div>
      
      <div class="relative z-10 max-w-3xl mx-auto">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
          <q-icon name="collections" size="20px" class="text-yellow-500" />
          <span class="text-yellow-500 font-bold text-sm tracking-wide uppercase">Photo dan Video</span>
        </div>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-4">
          Galeri <span class="text-yellow-500">Karya</span>
        </h1>
        <p class="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
          Lihat langsung hasil dokumentasi epik perjalanan luar biasa pelanggan kami di berbagai destinasi wisata.
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="max-w-7xl mx-auto px-5 -mt-10 relative z-20">
      
      <!-- Filter -->
      <div class="flex justify-center mb-10">
        <div class="bg-white p-1 rounded-full shadow-lg border border-gray-100 flex gap-1">
          <button 
            @click="activeFilter = 'semua'"
            :class="[
              'px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300',
              activeFilter === 'semua' ? 'bg-yellow-500 text-gray-900 shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            ]"
          >
            Semua
          </button>
          <button 
            @click="activeFilter = 'foto'"
            :class="[
              'px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300',
              activeFilter === 'foto' ? 'bg-yellow-500 text-gray-900 shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            ]"
          >
            Foto
          </button>
          <button 
            @click="activeFilter = 'video'"
            :class="[
              'px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300',
              activeFilter === 'video' ? 'bg-yellow-500 text-gray-900 shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            ]"
          >
            Video
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="n in 6" :key="n" class="bg-gray-200 rounded-[24px] h-[300px] animate-pulse"></div>
      </div>

      <!-- Gallery Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <div v-for="item in filteredData" :key="item.id" class="group relative bg-white rounded-[24px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-500">
          
          <!-- FOTO PREVIEW -->
          <template v-if="item.category === 'foto'">
            <div class="aspect-[4/3] w-full relative overflow-hidden bg-gray-100 cursor-pointer" @click="openImage(item.media_url)">
              <img :src="item.media_url" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              <!-- Hover Overlay -->
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <q-icon name="zoom_in" color="white" size="24px" />
                </div>
              </div>
            </div>
            <div class="p-5">
              <div class="flex items-center gap-2 mb-2 text-yellow-600 font-bold text-[10px] uppercase tracking-widest">
                <q-icon name="photo_camera" size="14px" />
                Foto
              </div>
              <h3 class="font-bold text-gray-900 text-lg leading-tight line-clamp-2">{{ item.title }}</h3>
            </div>
          </template>

          <!-- VIDEO PREVIEW -->
          <template v-else>
            <div class="aspect-[16/9] w-full relative overflow-hidden bg-black">
              <iframe 
                :src="getEmbedUrl(item.media_url)" 
                class="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
              </iframe>
            </div>
            <div class="p-5">
              <div class="flex items-center gap-2 mb-2 text-red-500 font-bold text-[10px] uppercase tracking-widest">
                <q-icon name="play_circle" size="14px" />
                YouTube Video
              </div>
              <h3 class="font-bold text-gray-900 text-lg leading-tight line-clamp-2">{{ item.title }}</h3>
            </div>
          </template>

        </div>

      </div>

      <!-- Empty State -->
      <div v-if="!isLoading && filteredData.length === 0" class="text-center py-24 bg-white rounded-[24px] border border-gray-100 shadow-sm mt-8">
        <div class="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <q-icon name="photo_camera" size="48px" class="text-gray-300" />
        </div>
        <h3 class="text-2xl font-black text-gray-900 mb-3">Galeri Masih Kosong</h3>
        <p class="text-gray-500 max-w-md mx-auto text-[15px] leading-relaxed">Admin belum mengunggah karya dokumentasi untuk kategori ini. Silakan kembali lagi nanti untuk melihat koleksi terbaru kami.</p>
      </div>

    </section>

    <!-- Image Lightbox Dialog -->
    <q-dialog v-model="lightboxOpen" maximized transition-show="fade" transition-hide="fade" class="bg-black/90">
      <div class="w-full h-full flex flex-col relative p-4">
        <q-btn icon="close" color="white" flat round class="absolute top-4 right-4 z-50 bg-black/50" v-close-popup size="lg" />
        <div class="flex-grow flex items-center justify-center overflow-hidden">
          <img :src="activeImage" class="max-w-full max-h-full object-contain drop-shadow-2xl" />
        </div>
      </div>
    </q-dialog>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AppHeader from 'components/global/AppHeader.vue'
import PortfolioController from 'src/backend/controllers/PortfolioController'

const isLoading = ref(true)
const portfolios = ref([])
const activeFilter = ref('semua')

const lightboxOpen = ref(false)
const activeImage = ref('')

onMounted(async () => {
  const { data } = await PortfolioController.fetchAll()
  portfolios.value = data || []
  isLoading.value = false
})

const filteredData = computed(() => {
  if (activeFilter.value === 'semua') return portfolios.value
  return portfolios.value.filter(p => p.category === activeFilter.value)
})

const openImage = (url) => {
  activeImage.value = url
  lightboxOpen.value = true
}

const getEmbedUrl = (url) => {
  if (!url) return ''
  let videoId = null
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i)
  if (match && match[1]) {
    videoId = match[1]
    return `https://www.youtube.com/embed/${videoId}?rel=0`
  }
  return url // fallback
}
</script>
