<template>
  <div class="min-h-screen flex items-center justify-center bg-[#F3F4F6] px-5 relative overflow-hidden">
    <!-- Decorative background elements -->
    <div class="absolute top-0 left-0 w-full h-[40vh] bg-gray-900 rounded-b-[40px] z-0"></div>
    <div class="absolute top-[-50px] right-[-50px] w-[300px] h-[300px] bg-[#FFC107]/10 rounded-full blur-3xl z-0 pointer-events-none"></div>

    <div class="w-full max-w-md bg-white rounded-[32px] shadow-[0_24px_60px_rgba(0,0,0,0.15)] p-8 relative z-10 border border-gray-100">
      
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-gray-900 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-gray-900/20">
          <span class="material-symbols-outlined text-[#FFC107] text-[32px]">admin_panel_settings</span>
        </div>
        <h1 class="text-[24px] font-black text-gray-900 tracking-tight leading-none mb-2">Login Admin</h1>
        <p class="text-[14px] text-gray-500 font-medium">Masuk untuk mengelola armada & pesanan</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="flex flex-col gap-5">
        
        <!-- Error Message -->
        <div v-if="errorMsg" class="bg-red-50 border border-red-100 text-red-600 text-[13px] font-medium px-4 py-3 rounded-[16px] flex items-center gap-2">
          <span class="material-symbols-outlined text-[18px]">error</span>
          {{ errorMsg }}
        </div>

        <!-- Email Field -->
        <div>
          <label class="block text-[13px] font-extrabold text-gray-900 mb-2 tracking-tight">Email Address</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span class="material-symbols-outlined text-gray-400 text-[20px]">mail</span>
            </div>
            <input 
              v-model="email" 
              type="email" 
              required
              class="w-full bg-gray-50 border border-gray-200 text-gray-900 text-[15px] font-medium rounded-[16px] focus:ring-2 focus:ring-[#FFC107]/50 focus:border-[#FFC107] block w-full pl-11 p-3.5 transition-all outline-none"
              placeholder="admin@masterrizal.com"
            >
          </div>
        </div>

        <!-- Password Field -->
        <div>
          <label class="block text-[13px] font-extrabold text-gray-900 mb-2 tracking-tight">Password</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span class="material-symbols-outlined text-gray-400 text-[20px]">lock</span>
            </div>
            <input 
              v-model="password" 
              :type="showPassword ? 'text' : 'password'" 
              required
              class="w-full bg-gray-50 border border-gray-200 text-gray-900 text-[15px] font-medium rounded-[16px] focus:ring-2 focus:ring-[#FFC107]/50 focus:border-[#FFC107] block w-full pl-11 pr-11 p-3.5 transition-all outline-none"
              placeholder="••••••••"
            >
            <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 pr-4 flex items-center">
              <span class="material-symbols-outlined text-gray-400 hover:text-gray-600 text-[20px] transition-colors">
                {{ showPassword ? 'visibility_off' : 'visibility' }}
              </span>
            </button>
          </div>
        </div>

        <!-- Submit Button -->
        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full text-gray-900 bg-[#FFC107] hover:bg-[#F5B700] focus:ring-4 focus:ring-[#FFC107]/30 font-extrabold rounded-[16px] text-[15px] px-5 py-4 text-center mt-2 transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span v-if="isLoading" class="w-5 h-5 border-2 border-gray-900/30 border-t-gray-900 rounded-full animate-spin"></span>
          <span v-else>Masuk ke Dashboard</span>
        </button>

        <router-link to="/" class="text-center text-[13px] text-gray-500 hover:text-gray-900 font-medium transition-colors mt-2">
          &larr; Kembali ke Website
        </router-link>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from 'src/utils/supabase'

const router = useRouter()
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const errorMsg = ref('')

const handleLogin = async () => {
  isLoading.value = true
  errorMsg.value = ''
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (error) throw error

    // Login successful
    router.push('/setset')
  } catch (error) {
    errorMsg.value = 'Email atau password salah.'
    console.error('Login error:', error.message)
  } finally {
    isLoading.value = false
  }
}
</script>
