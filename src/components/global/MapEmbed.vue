<template>
  <div class="w-full h-full bg-cover bg-center cursor-pointer group relative overflow-hidden" @click="openGoogleMaps">
    <div 
      class="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
      :style="{ backgroundImage: `url(${mapImage})` }"
    ></div>
    <div class="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent opacity-80 pointer-events-none"></div>
  </div>
</template>

<script setup>
import mapImage from 'assets/images/map_preview.jpg'

const openGoogleMaps = () => {
  window.open('https://www.google.com/maps/place/Master+Rizal+Rent+Car+%26+Motor+Bike/@-7.7778151,113.1694412,17z', '_blank')
}
</script>
