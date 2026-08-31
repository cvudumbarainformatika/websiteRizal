<template>
  <div class="bg-surface-card rounded-xl p-container-margin flex flex-col gap-stack-sm border border-outline-variant/30 shadow-md">
    <div class="flex items-center gap-3">
      <div 
        class="w-10 h-10 rounded-full flex items-center justify-center font-title-sm shrink-0"
        :class="avatarColor || 'bg-surface-container text-on-surface-variant'"
      >
        {{ avatar }}
      </div>
      <div>
        <div class="font-title-sm text-title-sm text-on-surface">{{ name }}</div>
        <div class="font-label-caps text-label-caps text-on-surface-variant lowercase">{{ time }}</div>
      </div>
    </div>
    
    <div class="flex text-primary-container">
      <span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;" v-for="i in rating" :key="i">star</span>
    </div>
    
    <p class="font-body-md text-body-md text-on-surface">{{ text }}</p>
    
    <div class="flex items-center gap-1 text-on-surface-variant font-label-caps text-label-caps mt-2" v-if="platform">
      <span class="material-symbols-outlined text-[14px]">public</span> {{ platform }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: { type: [String, Number], required: true },
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  avatarColor: { type: String, default: '' },
  time: { type: String, required: true },
  rating: { type: Number, default: 5 },
  text: { type: String, required: true },
  platform: { type: String, default: 'Google' }
})
</script>
