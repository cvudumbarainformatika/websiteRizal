<template>
  <section class="px-5 flex flex-col max-w-4xl mx-auto w-full relative z-30 mb-10 pt-4">
    
    <!-- HEADER (KONSISTEN DENGAN SECTION LAIN) -->
    <div class="mb-6 px-1 md:px-4 flex items-end justify-between">
      <div>
        <h2 class="text-gray-900 font-black leading-[1.25] text-[26px] tracking-tight mb-2">
          Jasa Photo &<br/>Video <span class="text-[#FFC107]">Profesional</span>
        </h2>
        <p class="font-body-md text-gray-500 text-[13px] leading-[1.6] max-w-[280px]">
          Dokumentasikan momen liburan Anda dengan kualitas sinematik.
        </p>
      </div>
      <button @click="router.push('/dokumentasi')" class="text-[#FFC107] font-bold text-[13px] flex items-center gap-1 hover:opacity-80 transition-opacity whitespace-nowrap pb-1">
        Lihat Semua
        <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
      </button>
    </div>

    <!-- CARD KONTEN GELAP -->
    <div class="bg-[#1A1C19] rounded-[24px] p-6 md:p-10 relative overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
      
      <!-- Background Image with Overlay (Subtle) -->
      <div class="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1516362540502-42171ecba3a2?q=80&w=2000&auto=format&fit=crop" alt="Jasa Fotografer" class="w-full h-full object-cover opacity-[0.15] object-center mix-blend-luminosity" loading="lazy" />
        <div class="absolute inset-0 bg-gradient-to-t from-[#1A1C19] via-[#1A1C19]/80 to-transparent"></div>
      </div>

      <div class="relative z-10 flex flex-col">
        <!-- The 3 Content Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        
      </div>

    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
