<template>
  <q-page class="q-pa-md md-pa-lg bg-gray-50 pb-24">
    <!-- Header -->
    <div class="q-mb-md flex justify-between items-center">
      <div>
        <h1 class="text-h5 text-weight-bolder text-custom-dark q-my-none">Kelola Armada</h1>
        <p class="text-caption text-custom-muted q-mt-xs">Kelola daftar kendaraan (Mobil & Motor) Anda.</p>
      </div>
      <!-- Desktop Button -->
      <q-btn v-if="$q.screen.gt.sm" unelevated class="global-btn-gold" icon="add" label="Tambah Armada" @click="openDialog()" />
    </div>

    <!-- Search & Filter -->
    <div class="row q-col-gutter-sm q-mb-md">
      <div class="col-12 col-md-6">
        <q-input v-model="search" dense outlined placeholder="Cari nama kendaraan..." class="bg-white">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div class="col-12 col-md-6">
        <q-select v-model="filterCategory" :options="categoryOptions" option-value="id" option-label="name" emit-value map-options dense outlined class="bg-white" label="Filter Kategori" clearable />
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="row q-col-gutter-md">
      <div v-for="n in 4" :key="n" class="col-12 col-md-6 col-lg-4">
        <q-card class="my-card no-shadow border border-gray-200">
          <q-skeleton height="150px" square />
          <q-card-section>
            <q-skeleton type="text" class="text-subtitle1" />
            <q-skeleton type="text" width="50%" class="text-caption" />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Card List (Mobile First) -->
    <div v-else class="row q-col-gutter-md">
      <div v-for="vehicle in filteredVehicles" :key="vehicle.id" class="col-12 col-sm-6 col-lg-4">
        <q-card class="my-card rounded-borders no-shadow border border-gray-200 overflow-hidden relative group">
          <!-- Gambar -->
          <div class="relative h-[160px] bg-gray-100">
            <q-img :src="vehicle.image_url" class="h-full w-full object-cover" />
            <!-- Tag Kategori -->
            <div class="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-2 py-1 rounded-full text-[10px] font-bold text-gray-800 shadow-sm">
              {{ vehicle.categories?.name || 'Lainnya' }}
            </div>
          </div>

          <!-- Info -->
          <q-card-section class="q-pb-sm">
            <div class="text-subtitle1 text-weight-bold text-gray-900 leading-tight q-mb-xs">{{ vehicle.name }}</div>
            <div class="text-primary-gold text-weight-bolder text-[15px]">
              {{ formatRupiah(vehicle.price) }}<span class="text-[10px] text-gray-500 font-normal">/hari</span>
            </div>
          </q-card-section>

          <!-- Aksi (Edit / Hapus) -->
          <q-card-actions align="right" class="q-pt-none border-t border-gray-100 bg-gray-50/50">
            <q-btn flat dense color="primary" icon="edit" size="sm" class="q-mr-xs" @click="openDialog(vehicle)" />
            <q-btn flat dense color="negative" icon="delete" size="sm" @click="confirmDelete(vehicle)" />
          </q-card-actions>
        </q-card>
      </div>

      <!-- Empty State -->
      <div v-if="filteredVehicles.length === 0" class="col-12 text-center q-py-xl">
        <q-icon name="directions_car" size="64px" color="grey-3" />
        <div class="text-subtitle1 text-grey-6 q-mt-md">Tidak ada armada yang ditemukan.</div>
      </div>
    </div>

    <!-- Floating Action Button (Mobile) -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="$q.screen.lt.md">
      <q-btn fab icon="add" color="primary" class="bg-primary-gold text-dark" @click="openDialog()" />
    </q-page-sticky>

    <!-- Dialog Form (Bottom Sheet di HP, Modal biasa di Desktop) -->
    <q-dialog v-model="dialogVisible" :position="$q.screen.lt.sm ? 'bottom' : 'standard'">
      <q-card :style="$q.screen.lt.sm ? 'width: 100%; border-radius: 20px 20px 0 0;' : 'min-width: 400px'">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 text-weight-bold">{{ isEditing ? 'Edit Armada' : 'Tambah Armada Baru' }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <q-form @submit="saveVehicle" class="q-gutter-md">
            <!-- Nama -->
            <q-input v-model="form.name" label="Nama Kendaraan" outlined dense :rules="[val => !!val || 'Nama harus diisi']" />
            
            <!-- Kategori (Dropdown Master Data) -->
            <q-select v-model="form.category_id" :options="categoryOptions" option-value="id" option-label="name" emit-value map-options label="Pilih Kategori" outlined dense :rules="[val => !!val || 'Kategori harus dipilih']" />
            
            <!-- Gambar -->
            <ImageUploadField v-model="form.image_url" label="Foto Kendaraan" hint="Disarankan rasio Landscape (JPG/PNG)" prefix="fleet" />
            
            <!-- Harga -->
            <q-input v-model="formattedPrice" type="text" inputmode="numeric" label="Harga Sewa / Hari (Rp)" outlined dense :rules="[val => !!val || 'Harga harus diisi']" />
            
            <!-- Kapasitas & Transmisi -->
            <div class="row q-col-gutter-sm">
              <div class="col-6">
                <q-input v-model.number="form.capacity" type="number" label="Kapasitas Kursi" outlined dense />
              </div>
              <div class="col-6">
                <q-select v-model="form.transmission" :options="['Manual', 'Otomatis']" label="Transmisi" outlined dense />
              </div>
            </div>

            <!-- Fitur Tambahan (JSON Textarea untuk simpel) -->
            <q-input v-model="formFeaturesText" type="textarea" rows="2" label="Fitur (Pisahkan dengan koma)" outlined dense hint="Misal: AC Dingin, Audio, Full Bensin" />

            <!-- Submit -->
            <div class="q-mt-lg flex justify-end">
              <q-btn flat label="Batal" color="grey" v-close-popup class="q-mr-sm" />
              <q-btn unelevated type="submit" color="primary" class="bg-primary-gold text-dark font-bold" :loading="isSaving" label="Simpan" />
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
import VehicleController from 'src/backend/controllers/VehicleController'
import CategoryController from 'src/backend/controllers/CategoryController'
import { formatRupiah } from 'src/backend/helpers/format'
import ImageUploadField from 'components/admin/ImageUploadField.vue'

const $q = useQuasar()
const isLoading = ref(true)
const isSaving = ref(false)
const vehicles = ref([])
const categoryOptions = ref([])

// State untuk Filter & Search
const search = ref('')
const filterCategory = ref(null)

// State untuk Dialog
const dialogVisible = ref(false)
const isEditing = ref(false)
const currentId = ref(null)

const form = ref({
  name: '',
  category_id: null,
  image_url: '',
  price: 0,
  capacity: null,
  transmission: 'Manual',
  features: []
})
const formFeaturesText = ref('')

const formattedPrice = computed({
  get: () => {
    if (form.value.price === null || form.value.price === undefined || form.value.price === 0) return ''
    return form.value.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  },
  set: (val) => {
    if (!val) {
      form.value.price = 0
      return
    }
    const num = parseInt(val.replace(/\./g, ''), 10)
    form.value.price = isNaN(num) ? 0 : num
  }
})

onMounted(async () => {
  await Promise.all([loadCategories(), loadVehicles()])
  isLoading.value = false
})

const loadCategories = async () => {
  const { data } = await CategoryController.fetchAll()
  categoryOptions.value = data || []
}

const loadVehicles = async () => {
  const { data } = await VehicleController.fetchAll()
  vehicles.value = data || []
}

const filteredVehicles = computed(() => {
  let result = vehicles.value
  if (filterCategory.value) {
    result = result.filter(v => v.category_id === filterCategory.value)
  }
  if (search.value) {
    const s = search.value.toLowerCase()
    result = result.filter(v => v.name.toLowerCase().includes(s))
  }
  return result
})

const openDialog = (vehicle = null) => {
  if (vehicle) {
    isEditing.value = true
    currentId.value = vehicle.id
    form.value = { 
      name: vehicle.name,
      category_id: vehicle.category_id,
      image_url: vehicle.image_url,
      price: vehicle.price,
      capacity: vehicle.capacity,
      transmission: vehicle.transmission,
      features: vehicle.features || []
    }
    formFeaturesText.value = (vehicle.features || []).join(', ')
  } else {
    isEditing.value = false
    currentId.value = null
    form.value = { name: '', category_id: categoryOptions.value[0]?.id || null, image_url: '', price: null, capacity: null, transmission: 'Manual', features: [] }
    formFeaturesText.value = ''
  }
  dialogVisible.value = true
}

const saveVehicle = async () => {
  isSaving.value = true
  
  // Parse features dari teks koma
  form.value.features = formFeaturesText.value.split(',').map(i => i.trim()).filter(i => i)
  
  let res;
  if (isEditing.value) {
    res = await VehicleController.update(currentId.value, form.value)
  } else {
    res = await VehicleController.store(form.value)
  }
  
  if (!res.error) {
    $q.notify({ color: 'positive', message: 'Data armada berhasil disimpan!', icon: 'check_circle' })
    dialogVisible.value = false
    await loadVehicles()
  } else {
    $q.notify({ color: 'negative', message: 'Gagal menyimpan: ' + res.error, icon: 'error' })
  }
  
  isSaving.value = false
}

const confirmDelete = (vehicle) => {
  $q.dialog({
    title: 'Konfirmasi',
    message: `Apakah Anda yakin ingin menghapus armada "${vehicle.name}"?`,
    cancel: true,
    persistent: true
  }).onOk(async () => {
    const res = await VehicleController.destroy(vehicle.id)
    if (res.success) {
      $q.notify({ color: 'positive', message: 'Armada berhasil dihapus.', icon: 'check_circle' })
      await loadVehicles()
    } else {
      $q.notify({ color: 'negative', message: 'Gagal menghapus: ' + res.error, icon: 'error' })
    }
  })
}
</script>

<style scoped>
.my-card {
  border-radius: 12px;
}
</style>
