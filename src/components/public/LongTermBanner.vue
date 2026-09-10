<template>
  <section class="global-container g-py-md">
    <div class="g-card-dark relative-position overflow-hidden g-px-lg md:g-px-xl g-py-lg md:g-py-xl shadow-3">
      <!-- Background Vehicle Image -->
      <div class="absolute-right deskt-only" style="width: 50%; top: 0; bottom: 0; right: 0;">
        <q-img
          :src="xpanderImg"
          alt="Rental Mobil Jangka Panjang"
          fit="contain"
          class="g-h-full"
          style="opacity: 0.35;"
        />
      </div>

      <div class="relative-position z-top g-text-center md:g-text-left" style="max-width: 500px;">
        <span class="g-badge-gold g-mb-sm" style="display: inline-block;">PENAWARAN KHUSUS</span>
        <h2 class="g-text-2xl md:g-text-3xl g-font-bold g-text-white g-mb-xs" style="margin-top: 0;">
          Butuh Sewa Jangka Panjang?
        </h2>
        <p class="g-text-base g-text-muted g-mb-lg">
          Dapatkan harga spesial untuk sewa mingguan & bulanan. Hemat lebih banyak!
        </p>

        <q-btn
          unelevated
          class="g-btn-gold"
          aria-label="Hubungi Kami untuk Sewa Jangka Panjang"
          @click="openWhatsApp"
        >
          <q-icon name="fab fa-whatsapp" class="g-mr-xs text-subtitle1" />
          Hubungi Kami
        </q-btn>
      </div>
    </div>
  </section>
</template>

<script setup>
import { inject, ref } from 'vue'
import xpanderImg from 'assets/images/car_xpander.jpg'
import { formatWhatsAppNumber } from 'src/backend/helpers/format'

const globalSettings = inject('globalSettings', ref({}))

const openWhatsApp = () => {
  const rawWa = globalSettings.value?.contact_wa_link || globalSettings.value?.contact_wa
  const wa = formatWhatsAppNumber(rawWa)
  window.open(`https://wa.me/${wa}?text=Halo%20Master%20Rizal,%20saya%20tertarik%20sewa%20jangka%20panjang%20(mingguan/bulanan)`, '_blank')
}
</script>
