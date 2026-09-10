<template>
  <q-page class="q-pa-md md-pa-lg bg-gray-50 pb-24">
    <!-- Header Page -->
    <div class="q-mb-lg flex justify-between items-center">
      <div>
        <h1 class="text-h5 text-weight-bolder text-custom-dark q-my-none">
          Pengaturan Website
        </h1>
        <p class="text-caption text-custom-muted q-mt-xs">
          Sesuaikan tampilan beranda, kontak, dan logo website Anda.
        </p>
      </div>
      
      <!-- Simpan Button (Desktop) -->
      <q-btn
        v-if="$q.screen.gt.sm"
        unelevated
        class="global-btn-gold"
        icon="save"
        label="Simpan Perubahan"
        @click="saveSettings"
        :loading="isSaving"
      />
    </div>

    <!-- Skeleton Loading -->
    <div v-if="isLoading" class="q-gutter-md">
      <q-skeleton type="rect" height="150px" class="rounded-borders" />
      <q-skeleton type="rect" height="200px" class="rounded-borders" />
      <q-skeleton type="rect" height="150px" class="rounded-borders" />
    </div>

    <!-- Settings Form -->
    <div v-else class="q-gutter-y-lg">
      
      <!-- Logo & Favicon -->
      <q-card class="my-card shadow-1 rounded-borders no-shadow border border-gray-200">
        <q-card-section>
          <div class="text-subtitle1 text-weight-bold q-mb-md">Identitas Brand</div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <ImageUploadField
                v-model="form.site_logo"
                label="Logo Website"
                hint="Disarankan PNG Transparan"
                prefix="logo"
              />
            </div>
            <div class="col-12 col-md-6">
              <ImageUploadField
                v-model="form.site_favicon"
                label="Favicon"
                hint="Icon untuk tab browser (kotak)"
                prefix="favicon"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Beranda (Hero Section) -->
      <q-card class="my-card shadow-1 rounded-borders no-shadow border border-gray-200">
        <q-card-section>
          <div class="text-subtitle1 text-weight-bold q-mb-md">Tampilan Beranda</div>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <ImageUploadField
                v-model="form.hero_banner"
                label="Gambar Background (Banner)"
                hint="Gambar lebar resolusi tinggi (Maks. 2MB)"
                prefix="banner"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="form.hero_title"
                label="Judul Besar Beranda"
                outlined
                dense
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="form.hero_subtitle"
                label="Sub-Judul Beranda"
                outlined
                dense
              />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Kontak & Lokasi -->
      <q-card class="my-card shadow-1 rounded-borders no-shadow border border-gray-200">
        <q-card-section>
          <div class="text-subtitle1 text-weight-bold q-mb-md">Informasi Kontak</div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                v-model="form.contact_wa"
                label="Nomor WhatsApp (Tampilan)"
                outlined
                dense
                hint="Misal: 085330222494 atau +62 853-3022-2494"
                @update:model-value="onContactWaChange"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="form.contact_wa_link"
                label="Nomor WhatsApp (Link API)"
                outlined
                dense
                hint="Otomatis dikonversi ke format 628... untuk link WhatsApp"
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="form.contact_address"
                label="Alamat Lengkap"
                type="textarea"
                rows="3"
                outlined
                dense
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="form.contact_map_link"
                label="URL Google Maps"
                outlined
                dense
                hint="Link URL saat tombol 'Lihat di Google Maps' diklik"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>

    </div>

    <!-- Floating Action Button (Mobile) -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="$q.screen.lt.md">
      <q-btn fab icon="save" color="primary" class="bg-primary-gold text-dark" @click="saveSettings" :loading="isSaving" />
    </q-page-sticky>

  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import SettingController from 'src/backend/controllers/SettingController'
import ImageUploadField from 'src/components/admin/ImageUploadField.vue'
import { formatWhatsAppNumber } from 'src/backend/helpers/format'

const $q = useQuasar()
const isLoading = ref(true)
const isSaving = ref(false)

const form = ref({
  site_logo: '',
  site_favicon: '',
  hero_banner: '',
  hero_title: '',
  hero_subtitle: '',
  contact_wa: '',
  contact_wa_link: '',
  contact_address: '',
  contact_map_link: ''
})

onMounted(async () => {
  await loadSettings()
})

const onContactWaChange = (val) => {
  if (val) {
    form.value.contact_wa_link = formatWhatsAppNumber(val)
  }
}

const loadSettings = async () => {
  isLoading.value = true
  const { data, error } = await SettingController.fetchSettings()
  
  if (!error && data) {
    // Merge data from DB to form
    Object.keys(form.value).forEach(key => {
      if (data[key] !== undefined) {
        form.value[key] = data[key]
      }
    })
    // Otomatis bersihkan contact_wa_link jika masih memakai format lokal 08...
    if (form.value.contact_wa_link) {
      form.value.contact_wa_link = formatWhatsAppNumber(form.value.contact_wa_link)
    }
  } else {
    $q.notify({
      color: 'negative',
      message: 'Gagal memuat pengaturan: ' + error,
      icon: 'error'
    })
  }
  
  isLoading.value = false
}

const saveSettings = async () => {
  isSaving.value = true
  
  // Pastikan format contact_wa_link selalu 628... sebelum disimpan ke database
  form.value.contact_wa_link = formatWhatsAppNumber(form.value.contact_wa_link || form.value.contact_wa)
  
  const { success, error } = await SettingController.saveSettings(form.value)
  
  if (success) {
    $q.notify({
      color: 'positive',
      message: 'Pengaturan berhasil disimpan!',
      icon: 'check_circle'
    })
    // Inject favicon dynamically
    SettingController.injectFavicon(form.value.site_favicon)
  } else {
    $q.notify({
      color: 'negative',
      message: 'Gagal menyimpan: ' + error,
      icon: 'error'
    })
  }
  
  isSaving.value = false
}
</script>

<style scoped>
.my-card {
  border-radius: 12px;
}
</style>
