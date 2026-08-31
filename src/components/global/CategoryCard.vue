<template>
  <div class="g-card-light g-px-md g-py-md g-flex g-flex-col g-justify-between g-items-center g-text-center g-h-full">
    <div class="g-mb-sm g-w-full g-flex g-items-center g-justify-center g-rounded-lg" style="height: 140px; background-color: #f9fafb;">
      <q-img
        :src="image"
        :alt="title"
        fit="contain"
        height="120px"
        width="100%"
      />
    </div>

    <div class="g-w-full g-mb-md g-text-left">
      <h3 class="g-text-lg g-font-bold g-text-dark g-mb-xs" style="margin-top: 0;">
        {{ title }}
      </h3>
      <div class="g-text-xs g-text-muted">
        Mulai dari
      </div>
      <div class="g-text-base g-font-bold g-text-gold">
        Rp {{ formatNumber(price) }} <span class="g-text-xs g-text-muted">/hari</span>
      </div>
    </div>

    <q-btn
      unelevated
      class="g-btn-dark-outline g-w-full"
      style="border-color: var(--color-light-border) !important; color: var(--color-text-dark) !important;"
      :aria-label="buttonLabel"
      @click="$emit('select')"
    >
      {{ buttonLabel }}
    </q-btn>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  buttonLabel: {
    type: String,
    default: 'Lihat Armada'
  }
})

defineEmits(['select'])

const formatNumber = (num) => {
  if (!num) return '0'
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
</script>
