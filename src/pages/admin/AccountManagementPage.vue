<template>
  <q-page class="p-4 md:p-8 bg-[#F8FAFC] min-h-screen">
    <!-- Header Section -->
    <div class="max-w-6xl mx-auto mb-10 mt-4 animate-fade-in-up">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-gold/10 text-primary-gold font-bold text-xs mb-3 border border-primary-gold/20">
            <q-icon name="admin_panel_settings" size="16px" />
            <span>Administrator Akses</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Manajemen <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-gold to-yellow-600">Akun</span>
          </h1>
          <p class="text-gray-500 mt-2 text-base md:text-lg max-w-xl">
            Kelola hak akses tim Anda. Tambahkan admin baru atau cabut akses yang tidak diperlukan dengan aman.
          </p>
        </div>
        
        <q-btn
          @click="showCreateDialog = true"
          color="dark"
          text-color="white"
          class="font-bold rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-300 px-6 py-3.5 group"
          no-caps
        >
          <div class="flex items-center gap-2">
            <q-icon name="add_circle" size="22px" class="group-hover:rotate-90 transition-transform duration-500" />
            <span>Tambah Admin</span>
          </div>
        </q-btn>
      </div>
    </div>

    <!-- Error/Warning Banner if API not configured -->
    <div v-if="apiError" class="max-w-6xl mx-auto mb-8 animate-fade-in">
      <div class="bg-red-50/80 backdrop-blur-md border border-red-200 rounded-3xl p-5 flex items-start gap-4 shadow-sm relative overflow-hidden">
        <div class="absolute top-0 left-0 w-2 h-full bg-red-500"></div>
        <div class="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center shrink-0">
          <q-icon name="error_outline" color="negative" size="28px" />
        </div>
        <div>
          <h3 class="text-red-900 font-extrabold text-lg mb-1">API Belum Dikonfigurasi</h3>
          <p class="text-red-700 text-sm leading-relaxed">{{ apiError }}</p>
        </div>
      </div>
    </div>

    <!-- User Grid -->
    <div class="max-w-6xl mx-auto relative min-h-[400px]">
      
      <!-- Loading State -->
      <div v-if="loading" class="absolute inset-0 z-10 flex items-center justify-center bg-[#F8FAFC]/80 backdrop-blur-sm rounded-3xl">
        <div class="flex flex-col items-center">
          <q-spinner-dots color="warning" size="60px" />
          <div class="text-gray-500 font-medium mt-4 animate-pulse">Memuat data akses...</div>
        </div>
      </div>

      <!-- Grid Content -->
      <div v-if="!loading && users.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up" style="animation-delay: 0.2s;">
        <div 
          v-for="(user, index) in users" 
          :key="user.id"
          class="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:border-gray-200 transition-all duration-300 group flex flex-col h-full"
          :style="{ animationDelay: `${0.1 * index}s` }"
        >
          <!-- Card Header -->
          <div class="flex justify-between items-start mb-5">
            <div class="relative">
              <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-extrabold text-white shadow-lg overflow-hidden relative"
                   :class="getGradientClass(user.email)">
                <!-- Glass shine effect -->
                <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                {{ getUserInitials(user) }}
              </div>
              <div v-if="user.email === currentUserEmail" class="absolute -bottom-2 -right-2 bg-green-500 border-[3px] border-white w-5 h-5 rounded-full shadow-sm">
                <q-tooltip class="bg-dark text-white font-bold rounded-lg">Anda Sedang Login</q-tooltip>
              </div>
            </div>
            
            <div>
              <q-btn v-if="user.email !== currentUserEmail" flat round color="gray-4" text-color="gray-5" icon="more_vert" size="sm" class="hover:bg-red-50 hover:text-red-600 transition-colors">
                <q-menu class="rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100" :offset="[0, 8]">
                  <q-list style="min-width: 150px" class="p-1">
                    <q-item clickable v-close-popup @click="confirmDelete(user)" class="rounded-lg mx-1 hover:bg-red-50 text-red-600 font-medium transition-colors">
                      <q-item-section avatar min-width="32px">
                        <q-icon name="person_remove" size="20px" />
                      </q-item-section>
                      <q-item-section>Cabut Akses</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
              <div v-else class="px-3 py-1 bg-green-50 text-green-700 font-bold text-[10px] uppercase tracking-wider rounded-full border border-green-200">
                Current
              </div>
            </div>
          </div>

          <!-- User Details -->
          <div class="flex-grow">
            <h3 class="text-xl font-extrabold text-gray-900 mb-1 capitalize truncate" :title="getUserName(user)">
              {{ getUserName(user) }}
            </h3>
            <div class="text-sm text-gray-500 font-medium truncate flex items-center gap-1.5 mb-4" :title="user.email">
              <q-icon name="email" size="14px" class="opacity-70" />
              {{ user.email }}
            </div>

            <div class="grid grid-cols-2 gap-3 pt-4 border-t border-gray-50">
              <div>
                <div class="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Dibuat Pada</div>
                <div class="text-xs text-gray-700 font-medium">{{ formatDate(user.created_at) }}</div>
              </div>
              <div>
                <div class="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Terakhir Login</div>
                <div class="text-xs text-gray-700 font-medium flex items-center gap-1">
                  <div class="w-1.5 h-1.5 rounded-full" :class="user.last_sign_in_at ? 'bg-green-500' : 'bg-gray-300'"></div>
                  {{ user.last_sign_in_at ? formatDate(user.last_sign_in_at) : 'Belum Pernah' }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && users.length === 0" class="flex flex-col items-center justify-center p-16 bg-white rounded-3xl border border-gray-100 shadow-sm text-center">
        <div class="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <q-icon name="group_off" size="48px" class="text-gray-300" />
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">Tidak ada akun admin</h3>
        <p class="text-gray-500 max-w-md">Belum ada akun staf yang didaftarkan. Klik tombol "Tambah Admin" di atas untuk mulai membuat akses.</p>
      </div>
    </div>

    <!-- Create Dialog (Modernized) -->
    <q-dialog v-model="showCreateDialog" persistent backdrop-filter="blur(8px)">
      <q-card class="rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] w-full max-w-md overflow-hidden bg-white">
        <!-- Dialog Header with Pattern -->
        <div class="relative pt-8 pb-6 px-8 bg-gradient-to-br from-gray-900 to-black text-white">
          <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 20px 20px;"></div>
          <div class="relative z-10 flex justify-between items-start">
            <div>
              <div class="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/20">
                <q-icon name="person_add" size="24px" color="warning" />
              </div>
              <h2 class="text-2xl font-extrabold tracking-tight">Undang Admin</h2>
              <p class="text-gray-400 text-sm mt-1">Buat akun untuk memberi akses pengelola.</p>
            </div>
            <q-btn icon="close" flat round dense v-close-popup class="text-white/50 hover:text-white bg-white/5 hover:bg-white/20 transition-colors" />
          </div>
        </div>

        <q-form @submit="createUser" class="p-8">
          <div class="space-y-5">
            <div>
              <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nama Lengkap</label>
              <q-input
                v-model="newUser.name"
                placeholder="Contoh: Budi Santoso"
                outlined
                dense
                color="warning"
                bg-color="grey-1"
                class="modern-input"
                :rules="[val => !!val || 'Nama wajib diisi']"
                hide-bottom-space
              >
                <template v-slot:prepend>
                  <q-icon name="badge" color="grey-5" size="20px" />
                </template>
              </q-input>
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Alamat Email</label>
              <q-input
                v-model="newUser.email"
                type="email"
                placeholder="budi@masterrizal.com"
                outlined
                dense
                color="warning"
                bg-color="grey-1"
                class="modern-input"
                :rules="[val => !!val || 'Email wajib diisi', val => /.+@.+\..+/.test(val) || 'Format email tidak valid']"
                hide-bottom-space
              >
                <template v-slot:prepend>
                  <q-icon name="mail" color="grey-5" size="20px" />
                </template>
              </q-input>
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Kata Sandi</label>
              <q-input
                v-model="newUser.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Minimal 6 karakter"
                outlined
                dense
                color="warning"
                bg-color="grey-1"
                class="modern-input"
                :rules="[val => !!val || 'Password wajib diisi', val => val.length >= 6 || 'Minimal 6 karakter']"
                hide-bottom-space
              >
                <template v-slot:prepend>
                  <q-icon name="lock" color="grey-5" size="20px" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="showPassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer text-gray-400 hover:text-gray-700 transition-colors"
                    @click="showPassword = !showPassword"
                    size="20px"
                  />
                </template>
              </q-input>
            </div>
          </div>

          <div class="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
            <q-btn flat label="Batal" color="grey-6" v-close-popup class="font-bold rounded-xl px-5 hover:bg-gray-50" no-caps />
            <q-btn 
              type="submit" 
              color="dark" 
              text-color="white" 
              label="Buat Akun Sekarang" 
              class="font-extrabold rounded-xl px-6 shadow-lg hover:shadow-xl transition-shadow" 
              no-caps 
              :loading="saving"
            />
          </div>
        </q-form>
      </q-card>
    </q-dialog>

    <!-- Delete Confirm Dialog -->
    <q-dialog v-model="showDeleteDialog" persistent backdrop-filter="blur(8px)">
      <q-card class="rounded-[28px] p-2 w-full max-w-sm overflow-hidden text-center bg-white shadow-2xl">
        <q-card-section class="pt-8 px-6 pb-2">
          <div class="relative w-24 h-24 mx-auto mb-6">
            <div class="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-20"></div>
            <div class="relative w-full h-full bg-red-50 border-4 border-white shadow-md rounded-full flex items-center justify-center">
              <q-icon name="warning_amber" color="negative" size="48px" />
            </div>
          </div>
          
          <h3 class="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">Cabut Akses?</h3>
          <p class="text-base text-gray-500 leading-relaxed">
            Anda yakin ingin menghapus akun admin<br>
            <span class="font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded text-sm block mt-2 truncate">{{ userToDelete?.email }}</span>
          </p>
          <div class="mt-4 bg-red-50 text-red-600 text-xs font-medium px-4 py-2 rounded-xl text-left border border-red-100 flex gap-2 items-start">
            <q-icon name="info" size="16px" class="mt-0.5 shrink-0" />
            Tindakan ini permanen. Pengguna tidak akan bisa lagi mengakses Admin Panel.
          </div>
        </q-card-section>

        <q-card-actions align="center" class="w-full gap-3 mt-4 pb-6 px-6">
          <q-btn flat label="Batalkan" color="grey-8" v-close-popup class="font-bold bg-gray-100 rounded-2xl px-6 w-[45%] h-12" no-caps />
          <q-btn color="negative" label="Ya, Hapus" @click="executeDelete" :loading="deleting" class="font-bold rounded-2xl px-6 w-[45%] h-12 shadow-lg shadow-red-200" no-caps />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from 'src/utils/supabase'
import { useQuasar } from 'quasar'
import axios from 'axios'

const $q = useQuasar()
const users = ref([])
const loading = ref(true)
const apiError = ref('')

const showCreateDialog = ref(false)
const saving = ref(false)
const showPassword = ref(false)
const newUser = ref({ name: '', email: '', password: '' })

const showDeleteDialog = ref(false)
const deleting = ref(false)
const userToDelete = ref(null)

const currentUserEmail = ref('')

// Utility functions
const getUserName = (user) => {
  if (user.user_metadata && user.user_metadata.name) {
    return user.user_metadata.name
  }
  return user.email.split('@')[0]
}

const getUserInitials = (user) => {
  const name = getUserName(user)
  const parts = name.split(' ').filter(p => p.length > 0)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

// Generate beautiful gradients based on email string
const getGradientClass = (email) => {
  const gradients = [
    'bg-gradient-to-br from-indigo-500 to-purple-600',
    'bg-gradient-to-br from-blue-500 to-cyan-500',
    'bg-gradient-to-br from-emerald-400 to-teal-600',
    'bg-gradient-to-br from-orange-400 to-red-500',
    'bg-gradient-to-br from-pink-500 to-rose-500',
    'bg-gradient-to-br from-[#1E293B] to-[#0F172A]',
    'bg-gradient-to-br from-primary-gold to-yellow-600'
  ]
  const charSum = email.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return gradients[charSum % gradients.length]
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateString))
}

const getHeaders = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) throw new Error('Tidak ada sesi aktif')
  return {
    Authorization: `Bearer ${session.access_token}`
  }
}

const fetchUsers = async () => {
  loading.value = true
  apiError.value = ''
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) currentUserEmail.value = user.email

    const headers = await getHeaders()
    const response = await axios.get('/api/manage-users', { headers })
    
    // Validasi respons: Cegah error saat dijalankan di local dev server
    if (response.data && Array.isArray(response.data.users)) {
      users.value = response.data.users
    } else if (response.data && Array.isArray(response.data)) {
      users.value = response.data
    } else if (response.data && Array.isArray(response.data.data?.users)) {
      users.value = response.data.data.users
    } else {
      throw new Error('API Vercel tidak merespons dengan benar. Harap jalankan di Vercel, bukan Localhost.')
    }
  } catch (error) {
    console.error('Fetch users error:', error)
    if (error.response?.data?.error) {
      apiError.value = error.response.data.error
    } else {
      apiError.value = 'Gagal terhubung ke API. Pastikan Anda sudah mengatur SUPABASE_SERVICE_ROLE_KEY di Vercel dan men-deploy ulang (Sync Changes).'
    }
    
    // Fallback Data untuk melihat desain di Localhost
    if (users.value.length === 0 && currentUserEmail.value) {
      users.value = [{
        id: 'current',
        email: currentUserEmail.value,
        created_at: new Date().toISOString(),
        last_sign_in_at: new Date().toISOString(),
        user_metadata: { name: 'Admin Master (Lokal)' }
      }]
    }
  } finally {
    loading.value = false
  }
}

const createUser = async () => {
  saving.value = true
  try {
    const headers = await getHeaders()
    await axios.post('/api/manage-users', {
      name: newUser.value.name,
      email: newUser.value.email,
      password: newUser.value.password
    }, { headers })

    $q.notify({
      color: 'dark',
      message: 'Admin berhasil diundang!',
      icon: 'check_circle',
      position: 'top',
      classes: 'font-bold rounded-xl shadow-lg border border-gray-700'
    })
    
    showCreateDialog.value = false
    newUser.value = { name: '', email: '', password: '' }
    fetchUsers()
  } catch (error) {
    console.error('Create user error:', error)
    $q.notify({
      color: 'negative',
      message: error.response?.data?.error || 'Gagal membuat akun',
      icon: 'error',
      position: 'top',
      classes: 'font-bold rounded-xl shadow-lg'
    })
  } finally {
    saving.value = false
  }
}

const confirmDelete = (user) => {
  userToDelete.value = user
  showDeleteDialog.value = true
}

const executeDelete = async () => {
  if (!userToDelete.value) return
  
  deleting.value = true
  try {
    const headers = await getHeaders()
    await axios.delete('/api/manage-users', {
      headers,
      data: { id: userToDelete.value.id }
    })

    $q.notify({
      color: 'dark',
      message: 'Akses Admin berhasil dicabut',
      icon: 'check_circle',
      position: 'top',
      classes: 'font-bold rounded-xl shadow-lg border border-gray-700'
    })
    
    showDeleteDialog.value = false
    userToDelete.value = null
    fetchUsers()
  } catch (error) {
    console.error('Delete user error:', error)
    $q.notify({
      color: 'negative',
      message: error.response?.data?.error || 'Gagal mencabut akses',
      icon: 'error',
      position: 'top',
      classes: 'font-bold rounded-xl shadow-lg'
    })
  } finally {
    deleting.value = false
  }
}

onMounted(() => {
  fetchUsers()
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
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

/* Custom styling for inputs to make them super premium */
:deep(.modern-input .q-field__control) {
  border-radius: 12px;
  transition: all 0.3s ease;
}

:deep(.modern-input .q-field__control:before) {
  border-color: #E2E8F0;
}

:deep(.modern-input.q-field--focused .q-field__control) {
  background: white !important;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}
</style>
