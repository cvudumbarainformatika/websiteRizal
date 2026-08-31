<template>
  <div class="g-card-light g-px-xl g-py-md g-flex g-flex-col md:g-flex-row g-items-center g-justify-between g-gap-lg">
    <!-- Left: Score & Stars -->
    <div class="g-text-center md:g-text-left">
      <div class="g-text-3xl g-font-bold g-text-dark" style="line-height: 1;">
        4.9
      </div>
      <div class="g-flex g-items-center g-justify-center md:g-justify-start g-gap-xs g-my-xs" style="color: #F5B800;">
        <q-icon v-for="i in 5" :key="i" name="star" size="22px" />
      </div>
      <div class="g-text-xs g-text-muted g-font-medium">
        (681 ulasan)
      </div>
    </div>

    <!-- Center: Star Progress Bars -->
    <div class="g-w-full" style="max-width: 320px;">
      <div v-for="bar in starBars" :key="bar.stars" class="g-flex g-items-center g-gap-sm g-mb-xs">
        <span class="g-text-xs g-text-muted g-font-bold g-flex g-items-center g-gap-xs" style="min-width: 32px;">
          {{ bar.stars }} <q-icon name="star" size="12px" style="color: #F5B800;" />
        </span>
        <q-linear-progress
          :value="bar.percentage / 100"
          color="warning"
          track-color="grey-3"
          rounded
          size="8px"
          class="g-w-full"
          style="flex: 1;"
        />
      </div>
    </div>

    <!-- Right: Write Review Button -->
    <div class="g-text-center">
      <q-btn
        outline
        class="g-btn-dark-outline g-flex g-items-center g-gap-xs"
        style="border-color: var(--color-light-border) !important; color: var(--color-text-dark) !important;"
        aria-label="Tulis Ulasan di Google"
        @click="openGoogleReview"
      >
        <q-icon name="fab fa-google" class="text-primary" />
        <span>Tulis Ulasan</span>
      </q-btn>
    </div>
  </div>
</template>

<script setup>
const starBars = [
  { stars: 5, percentage: 92 },
  { stars: 4, percentage: 6 },
  { stars: 3, percentage: 2 },
  { stars: 2, percentage: 0 },
  { stars: 1, percentage: 0 }
]

const openGoogleReview = () => {
  window.open('https://maps.google.com', '_blank')
}
</script>
