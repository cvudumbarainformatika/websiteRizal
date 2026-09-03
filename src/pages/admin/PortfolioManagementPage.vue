<template>
  <q-page class="q-pa-md md-pa-lg bg-gray-50 pb-24">
    <!-- Header -->
    <div class="q-mb-md flex justify-between items-center">
      <div>
        <h1 class="text-h5 text-weight-bolder text-custom-dark q-my-none">Kelola Portofolio</h1>
        <p class="text-caption text-custom-muted q-mt-xs">Kelola karya foto dan video (YouTube) yang tampil di website publik.</p>
      </div>
      <q-btn v-if="$q.screen.gt.sm" unelevated class="global-btn-gold" icon="add" label="Tambah Karya" @click="openDialog()" />
    </div>

    <!-- Filter -->
    <div class="q-mb-md flex justify-center">
      <q-btn-group rounded unelevated class="bg-white border border-gray-200">
        <q-btn :class="filter === 'semua' ? 'bg-primary-gold text-dark' : 'text-gray-600'" label="Semua" @click="filter = 'semua'" />
        <q-btn :class="filter === 'foto' ? 'bg-primary-gold text-dark' : 'text-gray-600'" label="Foto" @click="filter = 'foto'" />
        <q-btn :class="filter === 'video' ? 'bg-primary-gold text-dark' : 'text-gray-600'" label="Video" @click="filter = 'video'" />
      </q-btn-group>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="row q-col-gutter-md">
      <div v-for="n in 3" :key="n" class="col-12 col-sm-6 col-lg-4">
        <q-card class="my-card no-shadow border border-gray-200">
          <q-skeleton height="200px" square />
        </q-card>
      </div>
    </div>

    <!-- Data List -->
    <div v-else class="row q-col-gutter-md">
      <div v-for="item in filteredPortfolios" :key="item.id" class="col-12 col-sm-6 col-lg-4">
        <q-card class="my-card rounded-borders no-shadow border border-gray-200 overflow-hidden relative group h-full flex flex-col">
          
          <!-- Visual Preview -->
          <div class="relative h-[200px] bg-gray-900 overflow-hidden flex-shrink-0 flex items-center justify-center">
            
            <!-- Video/YouTube Preview -->
            <template v-if="item.category === 'video'">
              <div class="absolute inset-0 opacity-50 bg-black"></div>
              <img v-if="getYoutubeThumbnail(item.media_url)" :src="getYoutubeThumbnail(item.media_url)" class="w-full h-full object-cover opacity-60" />
              <q-icon name="play_circle" size="48px" class="text-white relative z-10 opacity-80" />
            </template>
            
            <!-- Photo Preview -->
            <template v-else>
              <img :src="item.media_url" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </template>

            <!-- Badge -->
            <div class="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1">
              <q-icon :name="item.category === 'video' ? 'videocam' : 'photo_camera'" size="12px" color="warning" />
              {{ item.category }}
            </div>
          </div>

          <!-- Info -->
          <q-card-section class="flex-grow flex flex-col bg-white">
            <div class="text-subtitle1 text-weight-bold text-gray-900 leading-tight q-mb-xs line-clamp-2" :title="item.title">
              {{ item.title }}
            </div>
          </q-card-section>

          <!-- Aksi -->
          <q-card-actions align="right" class="q-pt-none bg-gray-50/50 border-t border-gray-100 mt-auto">
            <q-btn flat dense color="negative" icon="delete" size="sm" @click="confirmDelete(item)" label="Hapus" />
          </q-card-actions>
        </q-card>
      </div>

      <!-- Empty State -->
      <div v-if="filteredPortfolios.length === 0" class="col-12 text-center q-py-xl">
        <q-icon name="collections" size="64px" color="grey-3" />
        <div class="text-subtitle1 text-grey-6 q-mt-md">Belum ada portofolio di kategori ini.</div>
      </div>
    </div>

    <!-- Floating Action Button (Mobile) -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="$q.screen.lt.md">
      <q-btn fab icon="add" color="primary" class="bg-primary-gold text-dark" @click="openDialog()" />
    </q-page-sticky>

    <!-- Form Dialog -->
    <q-dialog v-model="dialogVisible" :position="$q.screen.lt.sm ? 'bottom' : 'standard'">
      <q-card :style="$q.screen.lt.sm ? 'width: 100%; border-radius: 20px 20px 0 0;' : 'min-width: 450px'">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 text-weight-bold">Tambah Karya</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <q-form @submit="saveData" class="q-gutter-md">
            <!-- Jenis Karya -->
            <div class="q-mb-sm">
              <label class="text-caption text-weight-bold text-gray-600 block q-mb-xs">Jenis Karya</label>
              <div class="flex gap-4">
                <q-radio v-model="form.category" val="foto" label="Foto" color="primary" />
                <q-radio v-model="form.category" val="video" label="Video YouTube" color="primary" />
              </div>
            </div>

            <!-- Judul -->
            <q-input v-model="form.title" label="Judul Karya" outlined dense :rules="[val => !!val || 'Judul wajib diisi']" placeholder="Misal: Keseruan Trip Bromo 2025" />
            
            <!-- Input Video (YouTube URL) -->
            <q-input 
              v-if="form.category === 'video'"
              v-model="form.media_url" 
              label="URL Video YouTube" 
              outlined 
              dense 
              hint="Format: https://www.youtube.com/watch?v=..."
              :rules="[val => !!val || 'URL YouTube wajib diisi', val => val.includes('youtube.com') || val.includes('youtu.be') || 'Harus berupa link YouTube']"
            />
            
            <!-- Input Foto (Upload) -->
            <div v-else>
               <ImageUploadField v-model="form.media_url" label="Upload Foto" hint="Rasio landscape (16:9) disarankan" prefix="portofolio" />
            </div>

            <!-- Submit -->
            <div class="q-mt-lg flex justify-end">
              <q-btn flat label="Batal" color="grey" v-close-popup class="q-mr-sm" />
              <q-btn unelevated type="submit" color="primary" class="bg-primary-gold text-dark font-bold" :loading="isSaving" label="Simpan ke Galeri" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import PortfolioController from 'src/backend/controllers/PortfolioController'
import ImageUploadField from 'components/admin/ImageUploadField.vue'

const $q = useQuasar()
const isLoading = ref(true)
const isSaving = ref(false)
const portfolios = ref([])
const filter = ref('semua')

const dialogVisible = ref(false)
const form = ref({
  title: '',
  category: 'foto',
  media_url: ''
})

onMounted(async () => {
  await loadData()
})

const loadData = async () => {
  isLoading.value = true
  const { data } = await PortfolioController.fetchAll()
  portfolios.value = data || []
  isLoading.value = false
}

const filteredPortfolios = computed(() => {
  if (filter.value === 'semua') return portfolios.value
  return portfolios.value.filter(p => p.category === filter.value)
})

const getYoutubeThumbnail = (url) => {
  if (!url) return null
  let videoId = null
  // Match youtube.com/watch?v=ID or youtu.be/ID
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i)
  if (match && match[1]) {
    videoId = match[1]
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  }
  return null
}

const openDialog = () => {
  form.value = { title: '', category: 'foto', media_url: '' }
  dialogVisible.value = true
}

const saveData = async () => {
  isSaving.value = true
  
  if (form.value.category === 'foto' && !form.value.media_url) {
    $q.notify({ type: 'negative', message: 'Harap upload foto terlebih dahulu', position: 'top' })
    isSaving.value = false
    return
  }

  const { error } = await PortfolioController.addPortfolio(form.value)
  
  isSaving.value = false
  
  if (error) {
    $q.notify({ type: 'negative', message: 'Gagal menyimpan: ' + error, position: 'top' })
  } else {
    $q.notify({ type: 'positive', message: 'Karya berhasil ditambahkan!', position: 'top' })
    dialogVisible.value = false
    await loadData()
  }
}

const confirmDelete = (item) => {
  $q.dialog({
    title: 'Hapus Portofolio',
    message: `Yakin ingin menghapus karya "${item.title}"?`,
    cancel: true,
    persistent: true,
    ok: { color: 'negative', label: 'Hapus', unelevated: true },
    cancel: { flat: true, color: 'grey', label: 'Batal' }
  }).onOk(async () => {
    $q.loading.show()
    const { success, error } = await PortfolioController.deletePortfolio(item.id)
    $q.loading.hide()
    
    if (success) {
      $q.notify({ type: 'positive', message: 'Portofolio dihapus', position: 'top' })
      await loadData()
    } else {
      $q.notify({ type: 'negative', message: 'Gagal: ' + error, position: 'top' })
    }
  })
}
</script>
