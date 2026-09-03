<template>
  <section class="px-5 flex flex-col max-w-4xl mx-auto w-full relative z-30 mb-10">
    <div class="bg-[#1A1C19] rounded-[24px] p-6 md:p-10 relative overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
      
      <!-- Background Image with Overlay (Subtle) -->
      <div class="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1516362540502-42171ecba3a2?q=80&w=2000&auto=format&fit=crop" alt="Jasa Fotografer" class="w-full h-full object-cover opacity-[0.15] object-center mix-blend-luminosity" loading="lazy" />
        <div class="absolute inset-0 bg-gradient-to-t from-[#1A1C19] via-[#1A1C19]/80 to-transparent"></div>
      </div>

      <div class="relative z-10 flex flex-col">
        <!-- Header -->
        <div class="flex items-center gap-1.5 mb-3">
          <q-icon name="camera_alt" size="16px" class="text-[#FFC107]" />
          <span class="text-[#FFC107] font-bold text-[12px] tracking-widest uppercase">Jasa Photo dan Video</span>
        </div>
        
        <h3 class="font-title-sm text-white font-black leading-[1.25] text-[24px] md:text-[32px] tracking-tight mb-3">
          Abadikan Momen <br/>
          <span class="text-[#FDE047]">Perjalanan Anda.</span>
        </h3>
        
        <p class="text-[13px] md:text-[14px] text-gray-400 leading-[1.6] mb-8 max-w-2xl font-body-md">
          Jangan biarkan kenangan liburan Anda berlalu begitu saja. Kami menyediakan Jasa Fotografer & Videografer Profesional untuk mendokumentasikan setiap detik petualangan Anda (Bromo, Kawah Ijen, dll) dengan kualitas sinematik.
        </p>

        <!-- The 3 Content Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <!-- Card 1 -->
          <div class="bg-white/[0.03] border border-white/10 rounded-[16px] p-5 backdrop-blur-sm flex flex-col hover:bg-white/[0.06] transition-colors">
            <div class="w-10 h-10 rounded-full bg-[#FFC107]/20 flex items-center justify-center shrink-0 mb-3">
              <q-icon name="photo_camera" size="20px" class="text-[#FFC107]" />
            </div>
            <h4 class="text-white font-bold text-[15px] mb-1.5 tracking-tight">Fotografi Liburan</h4>
            <p class="text-gray-400 text-[12px] leading-[1.6]">Hasil foto jernih, profesional, dan siap diunggah ke sosial media Anda.</p>
          </div>
          
          <!-- Card 2 -->
          <div class="bg-white/[0.03] border border-white/10 rounded-[16px] p-5 backdrop-blur-sm flex flex-col hover:bg-white/[0.06] transition-colors">
            <div class="w-10 h-10 rounded-full bg-[#FFC107]/20 flex items-center justify-center shrink-0 mb-3">
              <q-icon name="videocam" size="20px" class="text-[#FFC107]" />
            </div>
            <h4 class="text-white font-bold text-[15px] mb-1.5 tracking-tight">Video Sinematik</h4>
            <p class="text-gray-400 text-[12px] leading-[1.6]">Rekaman drone & mirrorless untuk menghasilkan video trip yang epik.</p>
          </div>
          
          <!-- Card 3 -->
          <div class="bg-white/[0.03] border border-white/10 rounded-[16px] p-5 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center sm:col-span-2 gap-4 hover:bg-white/[0.06] transition-colors">
            <div class="w-10 h-10 rounded-full bg-[#FFC107]/20 flex items-center justify-center shrink-0">
              <q-icon name="groups" size="20px" class="text-[#FFC107]" />
            </div>
            <div>
              <h4 class="text-white font-bold text-[15px] mb-1 tracking-tight">Dokumentasi Rombongan & Jeep Bromo</h4>
              <p class="text-gray-400 text-[12px] leading-[1.6]">Layanan dokumentasi penuh menggunakan drone dan kamera profesional untuk rombongan keluarga atau gathering instansi.</p>
            </div>
          </div>
        </div>
        
        <!-- CTA Button -->
        <a 
          :href="whatsappLink" 
          target="_blank"
          class="self-start bg-[#FFC107] text-gray-900 font-black text-[13px] py-3 px-6 rounded-[12px] hover:opacity-90 transition-opacity flex items-center gap-2 shadow-[0_4px_12px_rgba(255,193,7,0.3)]"
        >
          <q-icon name="chat" size="18px" />
          Konsultasi Paket Kamera
        </a>
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
