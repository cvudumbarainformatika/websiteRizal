<template>
  <header class="w-full sticky top-0 z-50 flex flex-col transition-all duration-300 bg-[#151515] relative shadow-md">
    
    <!-- Bagian Utama Header (Hitam) -->
    <div class="text-white flex flex-col relative z-20">
      
      <!-- Top Bar: Padding berbeda antara Beranda dan Subpage -->
      <div :class="['flex items-center px-4 relative w-full', isHome ? 'py-4' : 'pt-8 pb-4']">
        
        <template v-if="isHome">
          <!-- Home Header -->
          <div class="flex items-center gap-3 w-full">
            <img :src="globalSettings.site_logo || '/assets/images/logo-mr-gold.png'" alt="MR Logo" class="w-[42px] h-[42px] object-contain mix-blend-screen -ml-1 drop-shadow-md" />
            <div class="flex flex-col justify-center -mt-0.5">
              <span class="font-headline-md font-extrabold text-white leading-none text-[17px] tracking-tight">MASTER RIZAL</span>
              <span class="text-[9px] text-gray-200 tracking-[0.15em] mt-[3px] font-medium leading-none">RENT CAR & MOTOR BIKE</span>
            </div>
          </div>
        </template>

        <template v-else>
          <!-- Subpage Header -->
          <!-- Menggunakan struktur grid/flex seimbang agar tombol back dan judul selalu sejajar vertikal -->
          <div class="flex items-center w-full">
            <button @click="$router.push('/')" class="text-white hover:text-[#FFC107] transition-colors p-1 flex items-center justify-center w-[40px] z-10 -ml-2">
              <span class="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
            </button>
            <div class="font-display-lg text-center flex-1 font-extrabold text-[18px] leading-none tracking-tight text-white">{{ routeTitle }}</div>
            <div class="w-[40px]"></div> <!-- Spacer penyeimbang di kanan -->
          </div>
        </template>
      </div>

      <!-- Armada Extra Header Content (Search & Filters) -->
      <div v-if="route.path === '/armada'" class="flex flex-col w-full pb-5 px-5 relative z-10 mt-2">
        
        <!-- Search Bar (Compact & Professional) -->
        <div class="relative w-full mb-5">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <span class="material-symbols-outlined text-gray-400 text-[18px]">search</span>
          </div>
          <input 
            type="text" 
            :value="searchQuery"
            @input="updateSearch"
            class="block w-full pl-10 pr-3 py-2.5 border border-[#333] rounded-xl leading-5 bg-[#222] text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#FFC107] focus:border-[#FFC107] text-[13px] transition-all" 
            placeholder="Cari kendaraan..." 
          />
        </div>

        <!-- Filters (Compact) -->
        <div class="flex gap-2 justify-center overflow-x-auto hide-scrollbar">
          <button 
            @click="setFilter('Semua')"
            :class="['px-5 py-2 rounded-full font-bold text-[12px] transition-colors shadow-sm whitespace-nowrap', 
              currentFilter === 'Semua' ? 'bg-[#FFC107] text-gray-900 border border-[#FFC107]' : 'bg-[#222] text-gray-300 border border-gray-700 hover:border-gray-500'
            ]"
          >
            Semua
          </button>
          <button 
            v-for="cat in categories" 
            :key="cat.id"
            @click="setFilter(cat.slug)"
            :class="['px-5 py-2 rounded-full font-bold text-[12px] transition-colors shadow-sm whitespace-nowrap capitalize', 
              currentFilter === cat.slug ? 'bg-[#FFC107] text-gray-900 border border-[#FFC107]' : 'bg-[#222] text-gray-300 border border-gray-700 hover:border-gray-500'
            ]"
          >
            {{ cat.name }}
          </button>
        </div>
      </div>
    </div>

    <!-- Lengkungan Transparan Menghadap Keluar (Inverted Curve) -->
    <div class="absolute bottom-[-24px] left-0 w-[24px] h-[24px] pointer-events-none z-10" style="background: radial-gradient(circle at 100% 100%, transparent 24px, #151515 24px);"></div>
    <div class="absolute bottom-[-24px] right-0 w-[24px] h-[24px] pointer-events-none z-10" style="background: radial-gradient(circle at 0% 100%, transparent 24px, #151515 24px);"></div>

  </header>
</template>

<script setup>
import { computed, ref, onMounted, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CategoryController from 'src/backend/controllers/CategoryController'

const globalSettings = inject('globalSettings', ref({}))

const route = useRoute()
const router = useRouter()

const isHome = computed(() => route.path === '/')
const routeTitle = computed(() => route.meta.title || '')

const currentFilter = computed(() => route.query.filter || 'Semua')
const searchQuery = computed(() => route.query.search || '')
const categories = ref([])

onMounted(async () => {
  const { data, error } = await CategoryController.fetchAll()
  if (!error && data) {
    categories.value = data
  }
})

const setFilter = (filter) => {
  router.replace({ query: { ...route.query, filter } })
}

const updateSearch = (event) => {
  router.replace({ query: { ...route.query, search: event.target.value } })
}
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
