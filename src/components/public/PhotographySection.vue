<template>
  <section class="px-5 flex flex-col max-w-4xl mx-auto w-full relative z-30 mb-10">
    <div class="bg-[#1A1C19] rounded-[20px] p-6 md:p-8 relative overflow-hidden flex flex-col justify-center min-h-[200px] shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
      
      <!-- Content Left -->
      <div class="relative z-10 w-[70%] md:w-2/3 flex flex-col justify-center">
        <div class="flex items-center gap-1.5 mb-2">
          <q-icon name="camera_alt" size="14px" class="text-[#FFC107]" />
          <span class="text-[#FFC107] font-bold text-[10px] tracking-widest uppercase">Layanan Tambahan</span>
        </div>
        
        <h3 class="font-title-sm text-white font-black leading-[1.25] text-[20px] md:text-[24px] tracking-tight mb-1.5">
          Abadikan Perjalanan <br/>
          <span class="text-[#FDE047]">Liburan Anda.</span>
        </h3>
        
        <p class="text-[12px] md:text-[13px] text-gray-400 leading-[1.6] mb-5 max-w-[400px]">
          Kami menyediakan Jasa Fotografer & Videografer Profesional untuk mendokumentasikan setiap momen liburan Anda (Bromo, Kawah Ijen, dll).
        </p>
        
        <a 
          :href="whatsappLink" 
          target="_blank"
          class="self-start bg-[#FFC107] text-gray-900 font-black text-[12px] py-2.5 px-5 rounded-[10px] hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <q-icon name="chat" size="16px" />
          Konsultasi Paket
        </a>
      </div>

      <!-- Image Absolute positioned to right -->
      <div class="absolute -right-10 md:right-0 top-1/2 -translate-y-1/2 w-[200px] md:w-[320px] h-full z-0 pointer-events-none opacity-50 md:opacity-100 flex items-center justify-end">
        <!-- Menggunakan mask image agar menyatu halus dengan background gelap -->
        <img 
          src="https://images.unsplash.com/photo-1516362540502-42171ecba3a2?q=80&w=600&auto=format&fit=crop" 
          alt="Fotografer Liburan Bromo" 
          class="w-full h-full object-cover rounded-l-full" 
          style="mask-image: linear-gradient(to right, transparent, black 40%); -webkit-mask-image: linear-gradient(to right, transparent, black 40%);"
        />
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed, inject, ref } from 'vue'

const globalSettings = inject('globalSettings', ref({}))

const whatsappLink = computed(() => {
  const num = globalSettings.value?.whatsapp_number || '+6285330222494'
  const cleanNum = num.replace(/\D/g, '')
  const msg = encodeURIComponent('Halo Master Rizal, saya tertarik dengan layanan Fotografer & Videografer untuk trip saya. Bisa minta info harganya?')
  return `https://wa.me/${cleanNum}?text=${msg}`
})
</script>
