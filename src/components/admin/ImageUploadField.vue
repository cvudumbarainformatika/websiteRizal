<template>
  <div class="image-upload-field w-full">
    <div class="text-caption text-weight-bold q-mb-xs text-grey-9">{{ label }}</div>
    
    <div 
      class="upload-container border border-gray-200 rounded-xl overflow-hidden relative transition-all duration-300 group"
      :class="{ 'border-primary ring-2 ring-primary/20': isDragging, 'bg-gray-50': !modelValue }"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
    >
      
      <!-- Preview Image if exists -->
      <div v-if="modelValue" class="relative w-full h-[140px] bg-gray-100 flex items-center justify-center">
        <img :src="modelValue" class="max-w-full max-h-full object-contain" />
        
        <!-- Hover Overlay -->
        <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
          <q-btn round color="negative" icon="delete" size="sm" @click="removeImage" />
          <q-btn round color="primary" icon="edit" size="sm" @click="triggerFileInput" />
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="relative w-full h-[140px] flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 transition-colors" @click="triggerFileInput">
        <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-1">
          <q-icon name="cloud_upload" size="24px" />
        </div>
        <div class="text-[13px] text-gray-600 font-medium text-center px-4">
          <span class="text-primary font-bold">Klik untuk upload</span> atau seret file ke sini
        </div>
        <div class="text-[11px] text-gray-400">{{ hint }}</div>
      </div>

      <!-- Loading Overlay -->
      <div v-if="isUploading" class="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
        <q-spinner-dots color="primary" size="40px" />
        <div class="text-xs font-bold text-gray-600 mt-2">Mengunggah...</div>
      </div>

      <!-- Hidden File Input -->
      <input 
        type="file" 
        ref="fileInput" 
        class="hidden" 
        accept="image/jpeg, image/png, image/webp, image/x-icon, image/svg+xml" 
        @change="handleFileChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import SettingController from 'src/backend/controllers/SettingController'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    required: true
  },
  hint: {
    type: String,
    default: 'Maks. 2MB (JPG, PNG, WEBP)'
  },
  prefix: {
    type: String,
    default: 'image'
  }
})

const emit = defineEmits(['update:modelValue'])
const $q = useQuasar()

const fileInput = ref(null)
const isDragging = ref(false)
const isUploading = ref(false)

const triggerFileInput = () => {
  fileInput.value.click()
}

const removeImage = () => {
  emit('update:modelValue', '')
}

const handleDrop = (e) => {
  isDragging.value = false
  const files = e.dataTransfer.files
  if (files && files.length > 0) {
    processFile(files[0])
  }
}

const handleFileChange = (e) => {
  const files = e.target.files
  if (files && files.length > 0) {
    processFile(files[0])
  }
  // Reset input agar bisa pilih file yang sama dua kali
  e.target.value = ''
}

const processFile = async (file) => {
  // Validasi ukuran max 2MB
  const maxMb = 2
  if (file.size > maxMb * 1024 * 1024) {
    $q.notify({
      color: 'negative',
      message: `Ukuran file terlalu besar! Maksimal ${maxMb}MB.`,
      icon: 'error'
    })
    return
  }

  isUploading.value = true
  
  const { url, error } = await SettingController.uploadAsset(file, props.prefix)
  
  if (error) {
    $q.notify({
      color: 'negative',
      message: 'Gagal mengunggah gambar: ' + error,
      icon: 'error'
    })
  } else if (url) {
    emit('update:modelValue', url)
    $q.notify({
      color: 'positive',
      message: 'Gambar berhasil diunggah!',
      icon: 'check_circle'
    })
  }

  isUploading.value = false
}
</script>
