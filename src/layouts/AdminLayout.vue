<template>
  <q-layout view="lHh Lpr lFf" class="bg-light-bg">
    <!-- Admin Header Navbar -->
    <q-header class="bg-white border-b border-gray-200 shadow-sm">
      <q-toolbar class="q-py-sm">
        <q-btn
          flat
          dense
          round
          icon="menu"
          class="text-gray-700 hover:text-primary-gold transition-colors"
          aria-label="Toggle Sidebar"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="flex items-center gap-3 ml-2">
          <div class="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center shadow-md">
            <span class="material-symbols-outlined text-primary-gold text-[20px]">admin_panel_settings</span>
          </div>
          <div class="flex flex-col leading-tight mt-1">
            <span class="text-[15px] font-black text-gray-900 tracking-tight leading-none">Master Rizal</span>
            <span class="text-[11px] font-bold text-primary-gold uppercase tracking-widest mt-0.5">Admin Panel</span>
          </div>
        </q-toolbar-title>

        <div class="flex items-center gap-4">
          <q-btn
            flat
            dense
            no-caps
            class="text-[13px] font-bold text-gray-700 hover:bg-gray-100 rounded-[12px] px-4 py-2 transition-all hidden sm:flex"
            aria-label="Ke Website Publik"
            to="/"
          >
            <q-icon name="open_in_new" size="18px" class="q-mr-sm" />
            Website Publik
          </q-btn>
          
          <div class="w-[1px] h-6 bg-gray-200 hidden sm:block"></div>

          <q-btn flat dense round class="q-mr-xs hover:scale-105 transition-transform">
            <q-avatar size="38px" class="shadow-md border-2 border-white bg-gray-100">
              <img src="/assets/images/user-avatar.svg" />
            </q-avatar>
            <q-menu class="rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 mt-2" :offset="[0, 8]">
              <q-list style="min-width: 180px" class="p-1">
                <div class="px-4 py-3 border-b border-gray-100 mb-1">
                  <div class="text-[13px] font-bold text-gray-900 capitalize">{{ adminName }}</div>
                  <div class="text-[11px] text-gray-500 font-medium">{{ adminEmail }}</div>
                </div>
                <q-item clickable v-close-popup @click="handleLogout" class="rounded-lg mx-1 hover:bg-red-50 text-red-600 transition-colors">
                  <q-item-section avatar min-width="40px">
                    <q-icon name="logout" size="20px" />
                  </q-item-section>
                  <q-item-section class="font-bold text-[13px]">Keluar Akun</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <!-- Admin Sidebar Drawer -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-dark-bg text-white"
    >
      <div class="q-pa-md border-bottom-dark text-center">
        <div class="text-subtitle1 text-weight-bolder text-primary-gold">
          PANEL DOKUMEN & KENDARAAN
        </div>
        <div class="text-caption text-custom-light-muted">
          Master Rizal Rent Car & Motor Bike
        </div>
      </div>

      <q-list class="q-pa-sm">
        <q-item-label header class="text-custom-light-muted text-weight-bold">
          MENU UTAMA
        </q-item-label>

        <q-item clickable v-ripple to="/setset" exact active-class="bg-dark-surface text-primary-gold">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>Dashboard</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/setset/armada" active-class="bg-dark-surface text-primary-gold">
          <q-item-section avatar>
            <q-icon name="directions_car" />
          </q-item-section>
          <q-item-section>Kelola Armada</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/setset/ulasan" active-class="bg-dark-surface text-primary-gold">
          <q-item-section avatar>
            <q-icon name="rate_review" />
          </q-item-section>
          <q-item-section>Ulasan Pelanggan</q-item-section>
        </q-item>

        <q-separator dark class="q-my-md" />

        <q-item-label header class="text-custom-light-muted text-weight-bold">
          SISTEM
        </q-item-label>
        
        <q-item clickable v-ripple to="/setset/pengaturan" active-class="bg-dark-surface text-primary-gold">
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>Pengaturan Website</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Admin Page Container -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from 'src/utils/supabase'
import { useQuasar } from 'quasar'

const leftDrawerOpen = ref(true)
const router = useRouter()
const $q = useQuasar()

const adminEmail = ref('Memuat...')
const adminName = ref('Admin')

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    adminEmail.value = user.email
    adminName.value = user.email.split('@')[0]
  }
})

const handleLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    
    $q.notify({
      color: 'positive',
      message: 'Berhasil keluar',
      icon: 'check_circle'
    })
    
    router.push('/setset/login')
  } catch (error) {
    console.error('Logout error:', error.message)
    $q.notify({
      color: 'negative',
      message: 'Gagal keluar: ' + error.message,
      icon: 'error'
    })
  }
}
</script>

<style lang="scss" scoped>
.border-bottom-dark {
  border-bottom: 1px solid var(--color-dark-border);
}

.gap-xs {
  gap: 6px;
}

.gap-sm {
  gap: 12px;
}
</style>
