<template>
  <div :class="['g-mb-lg', alignClass, extraClass]">
    <div v-if="subtitle" class="g-text-xs g-font-bold g-text-muted g-mb-sm">
      {{ subtitle }}
    </div>
    <h2 class="g-text-2xl md:g-text-3xl g-font-bold g-text-dark g-mb-sm" style="margin-top: 0;">
      <template v-for="(part, index) in parsedTitle" :key="index">
        <span v-if="part.isHighlight" class="g-text-gold">{{ part.text }}</span>
        <span v-else>{{ part.text }}</span>
      </template>
    </h2>
    <p v-if="description" class="g-text-sm g-text-muted g-mt-sm" style="max-width: 600px; line-height: 1.6;" :style="align === 'center' ? 'margin-left: auto; margin-right: auto;' : 'margin-left: 0;'">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  highlight: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  align: {
    type: String,
    default: 'center', // 'left', 'center', 'right'
    validator: (v) => ['left', 'center', 'right'].includes(v)
  },
  extraClass: {
    type: String,
    default: ''
  }
})

const alignClass = computed(() => {
  if (props.align === 'left') return 'g-text-left'
  if (props.align === 'right') return 'g-text-right'
  return 'g-text-center'
})

const parsedTitle = computed(() => {
  if (!props.highlight) {
    return [{ text: props.title, isHighlight: false }]
  }
  const parts = props.title.split(props.highlight)
  const result = []
  parts.forEach((part, i) => {
    if (part) result.push({ text: part, isHighlight: false })
    if (i < parts.length - 1) result.push({ text: props.highlight, isHighlight: true })
  })
  return result
})
</script>
