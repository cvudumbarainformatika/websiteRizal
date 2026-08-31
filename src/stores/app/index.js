import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    logo: null,
    banner: null,
    header: {
      phone: '+6281234567890',
      link_fb: 'https://facebook.com',
      link_instagram: 'https://instagram.com',
      title: 'MASTER RIZAL RENT CAR & MOTOR BIKE',
      desc: 'Sewa mobil dan motor terpercaya di Probolinggo',
      email: 'info@masterrizal.com',
      link_map: 'https://maps.google.com'
    },
    loading: false
  }),
  persist: true,
  actions: {}
})
