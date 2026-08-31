<template>
  <q-page class="q-pa-md bg-gray-50 flex flex-col items-center justify-center min-h-[80vh]">
    <div class="text-center max-w-lg w-full px-4">
      <div class="w-20 h-20 bg-white rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-sm border border-gray-100">
        <span class="material-symbols-outlined text-primary-gold text-[40px]">admin_panel_settings</span>
      </div>
      
      <h1 class="text-3xl font-black text-gray-900 tracking-tight leading-none mb-3">
        Selamat Datang di Admin Panel
      </h1>
      <p class="text-[15px] text-gray-500 font-medium mb-8">
        Gunakan menu di sebelah kiri untuk mulai mengelola armada kendaraan, pesanan, dan ulasan pelanggan Anda.
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <q-btn
          unelevated
          to="/setset/armada"
          class="bg-white border border-gray-200 text-gray-800 hover:border-primary-gold hover:text-primary-gold transition-colors py-4 rounded-xl flex items-center justify-center gap-3 w-full"
        >
          <q-icon name="directions_car" size="24px" />
          <span class="font-bold text-[14px]">Kelola Armada</span>
        </q-btn>
        <q-btn
          unelevated
          to="/setset/ulasan"
          class="bg-white border border-gray-200 text-gray-800 hover:border-primary-gold hover:text-primary-gold transition-colors py-4 rounded-xl flex items-center justify-center gap-3 w-full"
        >
          <q-icon name="rate_review" size="24px" />
          <span class="font-bold text-[14px]">Ulasan Pelanggan</span>
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script setup>
</script>
