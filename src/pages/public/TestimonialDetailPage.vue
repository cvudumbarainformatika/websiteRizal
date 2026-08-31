<template>
  <div class="flex-grow flex flex-col bg-[#F3F4F6] w-full min-h-screen pb-28 pt-0 relative z-10">
    <!-- Header Global yang Ter-Animasi -->
    <AppHeader />
    <div class="pt-8"></div>
    
    <!-- Testimonial List -->
    <div class="px-5 flex flex-col gap-5 max-w-4xl mx-auto w-full relative min-h-[400px]">
      
      <!-- SCORE SUMMARY (SKELETON) -->
      <div v-if="isLoading" class="bg-white rounded-[24px] border border-gray-100 shadow-sm p-6 w-full flex items-center justify-between gap-5 animate-pulse">
        <div class="flex flex-col items-center min-w-[130px]">
          <div class="h-10 bg-gray-200 rounded w-16 mb-2"></div>
          <div class="h-4 bg-gray-100 rounded w-24 mb-2"></div>
          <div class="h-3 bg-gray-100 rounded w-20 mb-4"></div>
          <div class="h-9 bg-gray-200 rounded-[12px] w-full"></div>
        </div>
        <div class="flex-1 flex flex-col justify-center gap-2 mb-4">
          <div class="flex items-center gap-1.5" v-for="n in 5" :key="'skel-bar-'+n">
            <div class="w-2 h-3 bg-gray-100 rounded"></div>
            <div class="w-3 h-3 bg-gray-100 rounded"></div>
            <div class="flex-1 h-[7px] bg-gray-200 rounded-full ml-1"></div>
          </div>
        </div>
      </div>

      <!-- SCORE SUMMARY (ACTUAL) -->
      <div v-else class="bg-white rounded-[24px] border border-gray-200 shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-6 w-full flex items-center justify-between gap-5">
        <!-- Left: Score -->
        <div class="flex flex-col items-center min-w-[130px]">
          <span class="text-gray-900 font-black text-[42px] leading-none mb-2 tracking-tight">4.9</span>
          <div class="flex text-[#FFC107] gap-[2px] mb-1.5">
            <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">star</span>
            <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">star</span>
            <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">star</span>
            <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">star</span>
            <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">star</span>
          </div>
          <span class="text-gray-500 font-medium text-[13px] mb-4">(681 ulasan)</span>
          <button class="bg-white border border-gray-200 rounded-[12px] py-2 px-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors w-full" @click="openGoogleReview">
            <svg class="w-[16px] h-[16px]" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span class="text-gray-900 font-extrabold text-[12.5px] tracking-tight">Tulis Ulasan</span>
          </button>
        </div>
        <!-- Right: Bars -->
        <div class="flex-1 flex flex-col justify-center gap-2 mb-4">
          <div class="flex items-center gap-1.5" v-for="(bar, i) in ratingBars" :key="i">
            <span class="text-gray-900 font-extrabold text-[11px] w-2 text-center">{{ 5 - i }}</span>
            <span class="material-symbols-outlined text-gray-500 text-[11px]" style="font-variation-settings: 'FILL' 1;">star</span>
            <div class="flex-1 h-[7px] bg-[#EEEEEE] rounded-full overflow-hidden ml-1">
              <div class="h-full bg-[#FFC107] rounded-full" :style="{ width: bar.pct + '%' }"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- SKELETON LOADING REVIEWS -->
      <div v-if="isLoading" class="flex flex-col gap-5 mt-2">
        <div v-for="n in 3" :key="'skeleton-'+n" class="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden flex flex-col p-6 animate-pulse">
          <!-- Header Skeleton -->
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-gray-200 rounded-full shrink-0"></div>
            <div class="flex flex-col gap-2 w-full">
              <div class="h-4 bg-gray-200 rounded-md w-1/3"></div>
              <div class="h-3 bg-gray-100 rounded-md w-1/4"></div>
            </div>
          </div>
          <!-- Stars Skeleton -->
          <div class="flex gap-1 mb-4">
            <div v-for="s in 5" :key="s" class="w-4 h-4 bg-gray-200 rounded-sm"></div>
          </div>
          <!-- Text Skeleton -->
          <div class="flex flex-col gap-2">
            <div class="h-3 bg-gray-100 rounded-md w-full"></div>
            <div class="h-3 bg-gray-100 rounded-md w-11/12"></div>
            <div class="h-3 bg-gray-100 rounded-md w-4/5"></div>
          </div>
        </div>
      </div>

      <!-- ACTUAL DATA -->
      <transition-group v-else-if="reviews.length > 0" name="list" tag="div" class="flex flex-col gap-5">
        <div 
          v-for="review in reviews" 
          :key="review.id"
          class="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden flex flex-col p-6 border border-gray-100 group"
        >
          <!-- User Info -->
          <div class="flex items-center gap-4 mb-4">
            <!-- Avatar Placeholder (Initial) -->
            <div class="w-12 h-12 rounded-full bg-[#151515] text-white flex items-center justify-center font-title-sm font-black text-[18px] shrink-0">
              {{ review.name.charAt(0) }}
            </div>
            <div class="flex flex-col">
              <h3 class="font-title-sm text-gray-900 font-extrabold text-[15px] leading-tight tracking-tight">{{ review.name }}</h3>
              <p class="text-[12px] text-gray-400 font-medium mt-0.5">{{ review.date }}</p>
            </div>
            <!-- Google Icon Badge (Opsional, asumsikan dari Google) -->
            <div class="ml-auto w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
              <svg class="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>
          </div>

          <!-- Stars -->
          <div class="flex text-[#FFC107] gap-[2px] mb-3">
            <span v-for="s in review.rating" :key="'star-'+s" class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">star</span>
          </div>

          <!-- Review Text -->
          <p class="text-gray-600 text-[13px] leading-[1.7] font-medium">
            "{{ review.text }}"
          </p>
        </div>
      </transition-group>

      <!-- Empty State -->
      <div v-else class="absolute inset-0 flex flex-col items-center justify-center text-center px-6 mt-20">
        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-5">
          <span class="material-symbols-outlined text-[40px] text-gray-300">speaker_notes_off</span>
        </div>
        <h3 class="font-display-lg font-black text-gray-900 text-[18px] mb-2 tracking-tight">Belum Ada Ulasan</h3>
        <p class="text-gray-500 text-[13px] leading-relaxed max-w-[280px]">
          Jadilah yang pertama memberikan ulasan tentang pengalaman luar biasa menyewa kendaraan di Master Rizal.
        </p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import AppHeader from 'components/global/AppHeader.vue'

const isLoading = ref(true)
const globalSettings = inject('globalSettings', ref({}))

// Simulasi fetching data
onMounted(() => {
  isLoading.value = false
})

const ratingBars = [
  { pct: 95 }, // 5 star
  { pct: 45 }, // 4 star
  { pct: 15 }, // 3 star
  { pct: 5 },  // 2 star
  { pct: 5 }   // 1 star
]

const openGoogleReview = () => {
  const url = globalSettings.value?.contact_map_link || 'https://www.google.com/search?q=Master+Rizal+Rent+Car'
  window.open(url, '_blank')
}

// Data dummy (nantinya dari backend)
const reviews = ref([
  {
    id: 1,
    name: 'charlotte hadj-chaib',
    date: '2 months ago',
    rating: 5,
    text: 'We rented a 50cc scooter for 24 hours to visit Mount Bromo, and we can only highly recommend this rental service. The rental process was incredibly quick and easy, and we were warmly welcomed by the family with drinks and homemade cakes. We paid only 100,000 IDR for the day, and the scooter was surprisingly powerful. You truly couldn\'t ask for a better experience. Honest, reliable, friendly, and incredibly helpful people.'
  },
  {
    id: 2,
    name: 'Tobby Toh',
    date: 'a month ago',
    rating: 5,
    text: 'Rented 2 scooters with Master Rizal Rent Car & Motor Bike for 2 days. The condition of the scooters are very well maintained. The owners is responsive to our questions and they also pick us up from the train station. They also recommended nice places to dine and relax. Highly recommended to anyone who is looking to hire a scooter for a couple of days in Probolinggo'
  },
  {
    id: 3,
    name: 'Sharon Moscato',
    date: '3 weeks ago',
    rating: 5,
    text: 'The lovely family running this rental is truly amazing kind, welcoming, and always happy to help. The bikes are in excellent condition, and they\'re very responsive on whatsapp, making the whole rental process easy and hassle free. I would definitely come back 😌'
  },
  {
    id: 4,
    name: 'Shai Gilad',
    date: '3 weeks ago',
    rating: 5,
    text: 'The nicest and kindest people!'
  }
])
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
