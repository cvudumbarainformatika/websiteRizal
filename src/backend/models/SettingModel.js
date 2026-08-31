import { supabase } from 'src/utils/supabase'

export default {
  /**
   * Mengambil semua pengaturan web
   */
  async getAll() {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      
    if (error) throw error
    
    // Mengubah array of object menjadi single object map untuk kemudahan akses
    // contoh: { site_logo: '...', hero_title: '...' }
    const settingsMap = {}
    if (data) {
      data.forEach(item => {
        settingsMap[item.key] = item.value
      })
    }
    
    return settingsMap
  },

  /**
   * Mengambil pengaturan spesifik berdasarkan key
   */
  async getByKey(key) {
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', key)
      .single()
      
    if (error) throw error
    return data ? data.value : null
  },

  /**
   * Memperbarui beberapa pengaturan sekaligus
   * @param {Object} settingsObj - Object berisi key: value
   */
  async updateMultiple(settingsObj) {
    const updates = Object.keys(settingsObj).map(key => ({
      key,
      value: settingsObj[key],
      updated_at: new Date().toISOString()
    }))

    const { data, error } = await supabase
      .from('settings')
      .upsert(updates) // Menggunakan upsert untuk update batch berdasar Primary Key (key)
      .select()

    if (error) throw error
    return data
  }
}
