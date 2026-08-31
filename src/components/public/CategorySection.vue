<template>
  <section class="g-py-xl" style="background-color: #FFFFFF;">
    <div class="global-container">
      <SectionTitle
        title="Pilih Kendaraan Sesuai Kebutuhan Anda"
        highlight="Kebutuhan Anda"
        subtitle="KATEGORI"
        description="Tersedia berbagai pilihan mobil & motor dengan kondisi prima."
        align="left"
      />

      <div class="g-grid g-grid-cols-2 g-gap-sm g-mt-lg">
        <CategoryCard
          title="Sewa Mobil"
          :price="350000"
          :image="avanzaImg"
          button-label="Lihat Mobil"
          @select="$emit('filter-category', 'Mobil')"
        />

        <CategoryCard
          title="Sewa Motor"
          :price="75000"
          :image="varioImg"
          button-label="Lihat Motor"
          @select="$emit('filter-category', 'Motor')"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionTitle from 'components/global/SectionTitle.vue'
import CategoryCard from 'components/global/CategoryCard.vue'
import avanzaImg from 'assets/images/car_avanza.jpg'
import varioImg from 'assets/images/motor_vario.jpg'

defineEmits(['filter-category'])
</script>
