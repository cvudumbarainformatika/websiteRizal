<template>
  <main class="w-full flex-grow relative bg-white">
    <AppHeader />
    <!-- 1. Hero Section -->
    <HeroSection />

    <!-- 2. Daftar Armada Section (termasuk filter & CTA Jangka Panjang) -->
    <FleetSection />

    <!-- 3. Ulasan / Testimoni Section -->
    <TestimonialSection />

    <!-- 4. Lokasi & Kontak Section -->
    <LocationSection />
  </main>
</template>

<script setup>
import AppHeader from 'components/global/AppHeader.vue'
import HeroSection from 'components/public/HeroSection.vue'
import FleetSection from 'components/public/FleetSection.vue'
import TestimonialSection from 'components/public/TestimonialSection.vue'
import LocationSection from 'components/public/LocationSection.vue'
</script>
