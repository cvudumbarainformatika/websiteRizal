<template>
  <article class="bg-surface-card rounded-xl overflow-hidden border border-outline-variant/20 flex flex-col group hover:shadow-lg transition-shadow">
    <div class="relative h-48 w-full bg-surface-container-highest">
      <img 
        :alt="name" 
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        :src="image"
      />
      <div class="absolute top-4 right-4 bg-primary-container text-text-on-primary px-3 py-1 rounded-full font-label-caps text-label-caps capitalize">
        {{ category }}
      </div>
    </div>
    
    <div class="p-stack-md flex-grow flex flex-col">
      <h2 class="font-headline-md text-headline-md mb-stack-sm">{{ name }}</h2>
      
      <div class="flex flex-wrap gap-x-4 gap-y-2 mb-stack-md text-text-muted font-body-md text-body-md">
        <div class="flex items-center gap-1" v-if="specs.passengers">
          <span class="material-symbols-outlined text-[20px]">person</span> {{ specs.passengers }}
        </div>
        <div class="flex items-center gap-1" v-if="specs.transmission">
          <span class="material-symbols-outlined text-[20px]">settings</span> {{ specs.transmission }}
        </div>
        <div class="flex items-center gap-1" v-if="specs.ac">
          <span class="material-symbols-outlined text-[20px]">ac_unit</span> AC
        </div>
        <div class="flex items-center gap-1" v-if="specs.fuel">
          <span class="material-symbols-outlined text-[20px]">local_gas_station</span> Hemat BBM
        </div>
      </div>
      
      <div class="mt-auto">
        <div class="font-headline-md text-headline-md text-primary mb-stack-md">
          {{ formatPrice(price) }} <span class="font-body-md text-body-md text-text-muted font-normal">/hari</span>
        </div>
        <button 
          class="w-full bg-primary-container text-text-on-primary font-title-sm text-title-sm py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          @click="$emit('book', { id, name, category })"
        >
          <span class="material-symbols-outlined">chat</span> Pesan Sekarang
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  id: { type: [String, Number], required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  specs: {
    type: Object,
    default: () => ({})
  }
})

defineEmits(['book'])

const formatPrice = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}
</script>
