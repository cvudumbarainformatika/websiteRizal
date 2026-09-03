<template>
  <section class="px-5 flex flex-col max-w-4xl mx-auto w-full relative z-30 mb-10">
    <div class="rounded-[24px] bg-gray-900 relative overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-8 md:p-12">
      <!-- Background Image with Overlay -->
      <div class="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1554046920-90dcac824af0?q=80&w=2000&auto=format&fit=crop" alt="Jasa Fotografer Profesional" class="w-full h-full object-cover opacity-20 object-center" loading="lazy" />
        <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent"></div>
      </div>

      <!-- Abstract Decor -->
      <div class="absolute top-1/4 -right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-screen filter blur-[100px] opacity-10"></div>
      <div class="absolute bottom-1/4 -left-20 w-72 h-72 bg-white rounded-full mix-blend-screen filter blur-[100px] opacity-5"></div>

      <div class="w-full relative z-10">
        <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        <!-- Left Content -->
        <div class="w-full lg:w-1/2" data-aos="fade-up">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
            <q-icon name="camera_alt" color="warning" size="20px" class="text-yellow-500" />
            <span class="text-yellow-500 font-bold text-sm tracking-wide uppercase">Layanan Eksklusif</span>
          </div>
          
          <h2 class="text-4xl md:text-5xl font-black text-white leading-tight mb-6 tracking-tight">
            Abadikan Momen <br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">Perjalanan Anda.</span>
          </h2>
          
          <p class="text-gray-400 text-lg mb-8 leading-relaxed font-medium">
            Jangan biarkan kenangan liburan Anda berlalu begitu saja. Kami menyediakan Jasa Fotografer & Videografer Profesional untuk mendokumentasikan setiap detik petualangan Anda (Bromo, Kawah Ijen, dll) dengan kualitas sinematik.
          </p>

          <!-- Services Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <div class="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm flex items-start gap-4">
              <div class="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
                <q-icon name="photo_camera" color="warning" size="20px" class="text-yellow-500" />
              </div>
              <div>
                <h4 class="text-white font-bold text-base mb-1">Fotografi Liburan</h4>
                <p class="text-gray-400 text-xs leading-relaxed">Hasil foto jernih, profesional, dan siap diunggah ke sosial media.</p>
              </div>
            </div>
            
            <div class="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm flex items-start gap-4">
              <div class="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
                <q-icon name="videocam" color="warning" size="20px" class="text-yellow-500" />
              </div>
              <div>
                <h4 class="text-white font-bold text-base mb-1">Video Sinematik</h4>
                <p class="text-gray-400 text-xs leading-relaxed">Rekaman drone & mirrorless untuk video trip yang epik.</p>
              </div>
            </div>
            
            <div class="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm flex items-start gap-4 sm:col-span-2">
              <div class="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
                <q-icon name="favorite" color="warning" size="20px" class="text-yellow-500" />
              </div>
              <div>
                <h4 class="text-white font-bold text-base mb-1">Pre-Wedding & Group Tour</h4>
                <p class="text-gray-400 text-xs leading-relaxed">Dokumentasi penuh untuk acara rombongan atau momen spesial Anda selama perjalanan.</p>
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4">
            <a 
              :href="whatsappLink" 
              target="_blank"
              class="inline-flex items-center justify-center gap-2 bg-yellow-500 text-gray-900 font-extrabold px-8 py-4 rounded-xl hover:bg-yellow-500 transition-colors shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)]"
            >
              <q-icon name="chat" size="20px" />
              Konsultasi Paket Kamera
            </a>
          </div>
        </div>

        <!-- Right Visual -->
        <div class="w-full lg:w-1/2 relative hidden md:block" data-aos="fade-left">
          <!-- Stacked Images effect -->
          <div class="relative w-full max-w-md mx-auto aspect-[3/4]">
            <!-- Back image -->
            <div class="absolute inset-0 bg-white/5 rounded-3xl transform rotate-6 border border-white/10 backdrop-blur-sm transition-transform hover:rotate-12 duration-500"></div>
            <!-- Front image -->
            <div class="absolute inset-0 bg-black rounded-3xl overflow-hidden border border-white/20 shadow-2xl z-10 transform -rotate-3 transition-transform hover:rotate-0 duration-500">
              <img src="https://images.unsplash.com/photo-1516362540502-42171ecba3a2?q=80&w=800&auto=format&fit=crop" alt="Fotografer Bromo" class="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700" loading="lazy" />
              <!-- Badge -->
              <div class="absolute bottom-6 left-6 right-6 bg-gray-900/80 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-xl flex items-center gap-4">
                <div class="w-12 h-12 rounded-full bg-yellow-500 text-gray-900 flex items-center justify-center shrink-0">
                  <q-icon name="star" size="24px" />
                </div>
                <div>
                  <div class="text-white font-bold text-sm">Peralatan Profesional</div>
                  <div class="text-gray-400 text-xs">Sony Alpha & Drone DJI</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
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
