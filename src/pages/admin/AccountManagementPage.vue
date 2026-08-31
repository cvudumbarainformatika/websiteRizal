<template>
  <q-page class="p-6 bg-gray-50 flex flex-col items-center">
    <!-- Header -->
    <div class="w-full max-w-4xl flex items-center justify-between mb-8 animate-fade-in">
      <div>
        <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">Manajemen Akun</h1>
        <p class="text-sm text-gray-500 font-medium mt-1">Kelola staf dan akses admin website</p>
      </div>
      <q-btn
        @click="showCreateDialog = true"
        color="warning"
        text-color="dark"
        icon="person_add"
        label="Tambah Akun"
        class="font-bold rounded-xl shadow-lg hover:scale-105 transition-transform px-5 py-2.5"
        no-caps
      />
    </div>

    <!-- Error/Warning Banner if API not configured -->
    <div v-if="apiError" class="w-full max-w-4xl bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
      <q-icon name="error_outline" color="negative" size="24px" class="mt-0.5" />
      <div>
        <h3 class="text-red-800 font-bold text-[15px]">API Belum Dikonfigurasi</h3>
        <p class="text-red-600 text-[13px] mt-1">{{ apiError }}</p>
      </div>
    </div>

    <!-- Table -->
    <div class="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in-up" style="animation-delay: 0.1s;">
      <q-table
        :rows="users"
        :columns="columns"
        row-key="id"
        flat
        :loading="loading"
        :pagination="{ rowsPerPage: 10 }"
        class="bg-transparent"
        table-header-class="bg-gray-50/80 text-gray-600 font-bold uppercase tracking-wider text-[11px]"
      >
        <template v-slot:loading>
          <q-inner-loading showing color="warning" />
        </template>

        <template v-slot:body-cell-email="props">
          <q-td :props="props">
            <div class="flex items-center gap-3">
              <q-avatar size="32px" class="bg-gray-100 text-gray-500 font-bold">
                {{ props.row.email.charAt(0).toUpperCase() }}
              </q-avatar>
              <div class="font-bold text-gray-900">{{ props.row.email }}</div>
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-created_at="props">
          <q-td :props="props" class="text-gray-500 font-medium">
            {{ formatDate(props.row.created_at) }}
          </q-td>
        </template>
        
        <template v-slot:body-cell-last_sign_in_at="props">
          <q-td :props="props" class="text-gray-500 font-medium">
            {{ props.row.last_sign_in_at ? formatDate(props.row.last_sign_in_at) : 'Belum pernah login' }}
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="text-right">
            <q-btn
              v-if="props.row.email !== currentUserEmail"
              flat
              round
              color="negative"
              icon="delete_outline"
              size="sm"
              @click="confirmDelete(props.row)"
            >
              <q-tooltip class="bg-red-600">Hapus Akun</q-tooltip>
            </q-btn>
            <q-chip v-else size="sm" color="warning" text-color="dark" class="font-bold">Anda</q-chip>
          </q-td>
        </template>

        <template v-slot:no-data>
          <div class="w-full flex flex-col items-center justify-center p-10 text-gray-400">
            <q-icon name="group_off" size="48px" class="mb-3 opacity-50" />
            <div class="text-[15px] font-medium">Tidak ada akun ditemukan</div>
          </div>
        </template>
      </q-table>
    </div>

    <!-- Create Dialog -->
    <q-dialog v-model="showCreateDialog" persistent>
      <q-card class="rounded-2xl shadow-2xl p-2 w-full max-w-md">
        <q-card-section class="pb-2">
          <div class="flex justify-between items-center mb-1">
            <h2 class="text-xl font-extrabold text-gray-900 tracking-tight">Tambah Akun Admin</h2>
            <q-btn icon="close" flat round dense v-close-popup class="text-gray-400 hover:text-gray-700" />
          </div>
          <p class="text-xs text-gray-500">Akun baru akan mendapatkan hak akses penuh ke Admin Panel.</p>
        </q-card-section>

        <q-form @submit="createUser" class="q-px-md q-pb-md mt-2">
          <q-input
            v-model="newUser.email"
            type="email"
            label="Email"
            outlined
            dense
            color="warning"
            class="mb-4"
            :rules="[val => !!val || 'Email wajib diisi', val => /.+@.+\..+/.test(val) || 'Format email tidak valid']"
          />

          <q-input
            v-model="newUser.password"
            type="password"
            label="Password"
            outlined
            dense
            color="warning"
            class="mb-6"
            :rules="[val => !!val || 'Password wajib diisi', val => val.length >= 6 || 'Minimal 6 karakter']"
          />

          <div class="flex justify-end gap-3 mt-2">
            <q-btn flat label="Batal" color="grey-7" v-close-popup class="font-bold rounded-lg px-4" no-caps />
            <q-btn 
              type="submit" 
              color="warning" 
              text-color="dark" 
              label="Buat Akun" 
              class="font-extrabold rounded-lg px-6" 
              no-caps 
              :loading="saving"
            />
          </div>
        </q-form>
      </q-card>
    </q-dialog>

    <!-- Delete Confirm Dialog -->
    <q-dialog v-model="showDeleteDialog" persistent>
      <q-card class="rounded-2xl p-4 w-full max-w-sm">
        <q-card-section class="flex flex-col items-center text-center">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <q-icon name="warning" color="negative" size="32px" />
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-1">Hapus Akun?</h3>
          <p class="text-sm text-gray-500">
            Anda yakin ingin menghapus akun <br><span class="font-bold text-gray-800">{{ userToDelete?.email }}</span>? Tindakan ini tidak dapat dibatalkan.
          </p>
        </q-card-section>

        <q-card-actions align="center" class="w-full gap-3 mt-2">
          <q-btn flat label="Batal" color="grey-7" v-close-popup class="font-bold rounded-xl px-5 w-[45%]" no-caps />
          <q-btn color="negative" label="Hapus" @click="executeDelete" :loading="deleting" class="font-bold rounded-xl px-5 w-[45%]" no-caps />
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
const newUser = ref({ email: '', password: '' })

const showDeleteDialog = ref(false)
const deleting = ref(false)
const userToDelete = ref(null)

const currentUserEmail = ref('')

const columns = [
  { name: 'email', required: true, label: 'Alamat Email', align: 'left', field: 'email', sortable: true },
  { name: 'created_at', label: 'Tgl Dibuat', align: 'left', field: 'created_at', sortable: true },
  { name: 'last_sign_in_at', label: 'Terakhir Login', align: 'left', field: 'last_sign_in_at', sortable: true },
  { name: 'actions', label: '', align: 'right' }
]

const formatDate = (dateString) => {
  if (!dateString) return '-'
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
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
    users.value = response.data.users
  } catch (error) {
    console.error('Fetch users error:', error)
    if (error.response?.data?.error) {
      apiError.value = error.response.data.error
    } else {
      apiError.value = 'Gagal terhubung ke API. Pastikan Anda sudah mengatur SUPABASE_SERVICE_ROLE_KEY di Vercel.'
    }
    
    // Fallback: Jika API error, setidaknya tampilkan data admin saat ini agar tabel tidak kosong sama sekali
    if (users.value.length === 0 && currentUserEmail.value) {
      users.value = [{
        id: 'current',
        email: currentUserEmail.value,
        created_at: new Date().toISOString(),
        last_sign_in_at: new Date().toISOString()
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
      email: newUser.value.email,
      password: newUser.value.password
    }, { headers })

    $q.notify({
      color: 'positive',
      message: 'Akun berhasil dibuat!',
      icon: 'check_circle'
    })
    
    showCreateDialog.value = false
    newUser.value = { email: '', password: '' }
    fetchUsers()
  } catch (error) {
    console.error('Create user error:', error)
    $q.notify({
      color: 'negative',
      message: error.response?.data?.error || 'Gagal membuat akun',
      icon: 'error'
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
      color: 'positive',
      message: 'Akun berhasil dihapus',
      icon: 'check_circle'
    })
    
    showDeleteDialog.value = false
    userToDelete.value = null
    fetchUsers()
  } catch (error) {
    console.error('Delete user error:', error)
    $q.notify({
      color: 'negative',
      message: error.response?.data?.error || 'Gagal menghapus akun',
      icon: 'error'
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
  animation: fadeIn 0.5s ease-out;
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out both;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
