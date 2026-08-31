import SettingModel from '../models/SettingModel'
import { supabase } from '../../utils/supabase'

export default {
  /**
   * Mengambil semua pengaturan web
   * @returns {Object} { data: { key: value, ... }, error }
   */
  async fetchSettings() {
    try {
      const data = await SettingModel.getAll()
      return { data, error: null }
    } catch (err) {
      console.error('Error in SettingController.fetchSettings:', err.message)
      return { data: {}, error: err.message }
    }
  },

  /**
   * Menyimpan beberapa pengaturan sekaligus
   * @param {Object} settingsObj - { key: value, key2: value2 }
   */
  async saveSettings(settingsObj) {
    try {
      if (!settingsObj || Object.keys(settingsObj).length === 0) {
        throw new Error('Data pengaturan kosong.')
      }
      await SettingModel.updateMultiple(settingsObj)
      return { success: true, error: null }
    } catch (err) {
      console.error('Error in SettingController.saveSettings:', err.message)
      return { success: false, error: err.message }
    }
  },
  
  /**
   * Helper untuk menyuntikkan (inject) favicon secara dinamis ke DOM
   */
  injectFavicon(faviconUrl) {
    if (!faviconUrl) return;
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = faviconUrl;
  },

  /**
   * Mengunggah file (gambar) ke Supabase Storage (assets_rizal_web)
   * @param {File} file - Objek file gambar dari input
   * @param {String} prefix - Prefix nama file (misal: 'banner', 'logo')
   * @returns {Object} { url, error }
   */
  async uploadAsset(file, prefix = 'asset') {
    try {
      if (!file) throw new Error('File tidak ditemukan');

      // Bikin nama unik biar gak nabrak
      const fileExt = file.name.split('.').pop();
      const fileName = `${prefix}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Unggah ke bucket 'assets_rizal_web'
      const { data, error } = await supabase.storage
        .from('assets_rizal_web')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false // Jangan replace langsung, nama udah unik
        });

      if (error) throw error;

      // Ambil Public URL
      const { data: publicUrlData } = supabase.storage
        .from('assets_rizal_web')
        .getPublicUrl(filePath);

      return { url: publicUrlData.publicUrl, error: null };
    } catch (err) {
      console.error('Error in SettingController.uploadAsset:', err.message);
      return { url: null, error: err.message };
    }
  }
}
