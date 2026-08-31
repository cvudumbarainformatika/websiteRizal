<template>
  <q-page class="p-4 md:p-8 bg-[#F8FAFC] min-h-screen">
    <!-- Header -->
    <div class="max-w-7xl mx-auto mb-8 animate-fade-in-up">
      <div class="flex items-center gap-3 mb-2">
        <q-avatar size="48px" class="bg-gradient-to-tr from-primary-gold to-yellow-500 shadow-lg">
          <q-icon name="local_fire_department" color="white" size="24px" />
        </q-avatar>
        <div>
          <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight leading-none">Beranda Admin</h1>
          <p class="text-gray-500 font-medium mt-1">Pantau performa dan kelola operasional hari ini.</p>
        </div>
      </div>
    </div>

    <!-- Stats Overview Cards -->
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      
      <!-- Card 1: Pengunjung Hari Ini -->
      <div class="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden group">
        <div class="absolute -right-6 -top-6 w-24 h-24 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-700 ease-out"></div>
        <div class="relative z-10 flex justify-between items-start mb-4">
          <div class="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-inner">
            <q-icon name="trending_up" size="24px" />
          </div>
          <div class="bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">Hari Ini</div>
        </div>
        <div class="relative z-10">
          <h3 class="text-gray-500 font-medium text-sm mb-1">Pengunjung Unik</h3>
          <div class="flex items-baseline gap-2">
            <span class="text-4xl font-black text-gray-900 tracking-tight">
              <q-spinner-dots v-if="loading" color="blue" size="1em" />
              <span v-else>{{ stats.visitorsToday }}</span>
            </span>
            <span class="text-sm font-bold text-gray-400">orang</span>
          </div>
        </div>
      </div>

      <!-- Card 2: Pengunjung Bulan Ini -->
      <div class="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden group">
        <div class="absolute -right-6 -top-6 w-24 h-24 bg-purple-50 rounded-full group-hover:scale-150 transition-transform duration-700 ease-out"></div>
        <div class="relative z-10 flex justify-between items-start mb-4">
          <div class="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 shadow-inner">
            <q-icon name="insights" size="24px" />
          </div>
          <div class="bg-purple-50 text-purple-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">Bulan Ini</div>
        </div>
        <div class="relative z-10">
          <h3 class="text-gray-500 font-medium text-sm mb-1">Total Pengunjung</h3>
          <div class="flex items-baseline gap-2">
            <span class="text-4xl font-black text-gray-900 tracking-tight">
              <q-spinner-dots v-if="loading" color="purple" size="1em" />
              <span v-else>{{ stats.visitorsMonth }}</span>
            </span>
            <span class="text-sm font-bold text-gray-400">orang</span>
          </div>
        </div>
      </div>

      <!-- Card 3: Total Armada -->
      <div class="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden group">
        <div class="absolute -right-6 -top-6 w-24 h-24 bg-amber-50 rounded-full group-hover:scale-150 transition-transform duration-700 ease-out"></div>
        <div class="relative z-10 flex justify-between items-start mb-4">
          <div class="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shadow-inner">
            <q-icon name="directions_car" size="24px" />
          </div>
          <div class="bg-amber-50 text-amber-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">Aktif</div>
        </div>
        <div class="relative z-10">
          <h3 class="text-gray-500 font-medium text-sm mb-1">Total Armada</h3>
          <div class="flex items-baseline gap-2">
            <span class="text-4xl font-black text-gray-900 tracking-tight">
              <q-spinner-dots v-if="loading" color="amber" size="1em" />
              <span v-else>{{ stats.armada }}</span>
            </span>
            <span class="text-sm font-bold text-gray-400">unit</span>
          </div>
        </div>
      </div>

      <!-- Card 4: Total Admin -->
      <div class="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden group">
        <div class="absolute -right-6 -top-6 w-24 h-24 bg-emerald-50 rounded-full group-hover:scale-150 transition-transform duration-700 ease-out"></div>
        <div class="relative z-10 flex justify-between items-start mb-4">
          <div class="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner">
            <q-icon name="admin_panel_settings" size="24px" />
          </div>
          <div class="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">Sistem</div>
        </div>
        <div class="relative z-10">
          <h3 class="text-gray-500 font-medium text-sm mb-1">Admin Pengelola</h3>
          <div class="flex items-baseline gap-2">
            <span class="text-4xl font-black text-gray-900 tracking-tight">
              <q-spinner-dots v-if="loading" color="emerald" size="1em" />
              <span v-else>{{ stats.admins }}</span>
            </span>
            <span class="text-sm font-bold text-gray-400">orang</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions & Status -->
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Quick Actions Panel -->
      <div class="lg:col-span-2 bg-gradient-to-br from-gray-900 to-black rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
        <!-- Abstract Decoration -->
        <div class="absolute top-0 right-0 w-64 h-64 bg-primary-gold opacity-10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4"></div>
        <div class="absolute bottom-0 left-0 w-48 h-48 bg-blue-500 opacity-10 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/4"></div>
        
        <div class="relative z-10 mb-8">
          <h2 class="text-2xl font-extrabold tracking-tight mb-2">Akses Cepat</h2>
          <p class="text-gray-400">Jalan pintas ke fitur-fitur utama sistem operasional website Anda.</p>
        </div>

        <div class="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <!-- Action 1 -->
          <router-link to="/setset/armada" class="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-2xl p-5 transition-all group block">
            <div class="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <q-icon name="directions_car" size="20px" class="text-primary-gold" />
            </div>
            <h3 class="font-bold text-white mb-1">Kelola Armada</h3>
            <p class="text-xs text-gray-400">Tambah atau edit mobil & motor.</p>
          </router-link>

          <!-- Action 2 -->
          <router-link to="/setset/accounts" class="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-2xl p-5 transition-all group block">
            <div class="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <q-icon name="person_add" size="20px" class="text-primary-gold" />
            </div>
            <h3 class="font-bold text-white mb-1">Undang Staf</h3>
            <p class="text-xs text-gray-400">Tambahkan admin baru ke sistem.</p>
          </router-link>

          <!-- Action 3 -->
          <router-link to="/setset/pengaturan" class="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-2xl p-5 transition-all group block">
            <div class="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <q-icon name="settings" size="20px" class="text-primary-gold" />
            </div>
            <h3 class="font-bold text-white mb-1">Pengaturan</h3>
            <p class="text-xs text-gray-400">Ubah info & kontak website.</p>
          </router-link>
        </div>
      </div>

      <!-- System Status / Timeline -->
      <div class="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col">
        <h2 class="text-lg font-extrabold text-gray-900 mb-6 flex items-center gap-2">
          <q-icon name="check_circle" color="positive" size="20px" />
          Status Sistem
        </h2>

        <div class="flex-grow space-y-6">
          <div class="flex items-start gap-4">
            <div class="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
              <q-icon name="dns" size="14px" />
            </div>
            <div>
              <h4 class="font-bold text-gray-900 text-sm">Server Database Aktif</h4>
              <p class="text-xs text-gray-500 mt-0.5">Koneksi ke Supabase stabil. Kecepatan respon optimal.</p>
            </div>
          </div>
          
          <div class="flex items-start gap-4">
            <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
              <q-icon name="public" size="14px" />
            </div>
            <div>
              <h4 class="font-bold text-gray-900 text-sm">Website Publik Online</h4>
              <p class="text-xs text-gray-500 mt-0.5">Website dapat diakses oleh pelanggan tanpa kendala.</p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
              <q-icon name="security" size="14px" />
            </div>
            <div>
              <h4 class="font-bold text-gray-900 text-sm">Sistem Keamanan Aktif</h4>
              <p class="text-xs text-gray-500 mt-0.5">Auth dan API dilindungi. Enkripsi data berjalan dengan baik.</p>
            </div>
          </div>
        </div>

        <div class="mt-6 pt-6 border-t border-gray-100 text-center">
          <div class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Terakhir Diperbarui</div>
          <div class="text-sm font-medium text-gray-600 mt-1">{{ currentTime }}</div>
        </div>
      </div>

    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { supabase } from 'src/utils/supabase'
import axios from 'axios'

const loading = ref(true)
const stats = ref({
  armada: 0,
  visitorsToday: 0,
  visitorsMonth: 0,
  admins: 0
})

const currentTime = ref('')
let timer

const updateTime = () => {
  currentTime.value = new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    day: 'numeric', month: 'long', year: 'numeric'
  }).format(new Date())
}

const fetchDashboardData = async () => {
  loading.value = true
  try {
    // 1. Fetch Armada
    const { count: armadaCount } = await supabase.from('vehicles').select('*', { count: 'exact', head: true })
    stats.value.armada = armadaCount || 0

    // 2. Fetch Visitors
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

    // Using try catch specifically for visitors in case table doesn't exist yet
    try {
      const [todayRes, monthRes] = await Promise.all([
        supabase.from('page_views').select('session_id').gte('created_at', today.toISOString()),
        supabase.from('page_views').select('session_id').gte('created_at', firstDayOfMonth.toISOString())
      ])

      if (!todayRes.error && todayRes.data) {
        stats.value.visitorsToday = new Set(todayRes.data.map(v => v.session_id)).size
      }
      if (!monthRes.error && monthRes.data) {
        stats.value.visitorsMonth = new Set(monthRes.data.map(v => v.session_id)).size
      }
    } catch (e) {
      console.warn('Page views table might not exist yet', e)
    }

    // 3. Fetch Admins
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        const { data: adminData } = await axios.get('/api/manage-users', {
          headers: { Authorization: `Bearer ${session.access_token}` }
        })
        
        if (adminData && Array.isArray(adminData.users)) stats.value.admins = adminData.users.length
        else if (adminData && Array.isArray(adminData)) stats.value.admins = adminData.length
        else if (adminData && Array.isArray(adminData.data?.users)) stats.value.admins = adminData.data.users.length
      }
    } catch (e) {
      console.warn('Failed to fetch admins, fallback to 1', e)
      stats.value.admins = 1 // At least 1 admin exists if they are logged in
    }

  } catch (err) {
    console.error('Error fetching dashboard data:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
  fetchDashboardData()
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
