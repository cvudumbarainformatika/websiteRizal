import { supabase } from 'src/utils/supabase'

export default {
  /**
   * Mengambil semua data kendaraan beserta kategorinya
   */
  async getAll() {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*, categories(id, name, slug)')
      .order('created_at', { ascending: false })
      
    if (error) throw error
    return data
  },

  /**
   * Mengambil data kendaraan berdasarkan ID
   */
  async getById(id) {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*, categories(id, name, slug)')
      .eq('id', id)
      .single()
      
    if (error) throw error
    return data
  },

  /**
   * Menambahkan kendaraan baru
   */
  async create(payload) {
    const { data, error } = await supabase
      .from('vehicles')
      .insert([payload])
      .select()
      
    if (error) throw error
    return data
  },

  /**
   * Memperbarui data kendaraan
   */
  async update(id, payload) {
    const { data, error } = await supabase
      .from('vehicles')
      .update(payload)
      .eq('id', id)
      .select()
      
    if (error) throw error
    return data
  },

  /**
   * Menghapus kendaraan
   */
  async remove(id) {
    const { error } = await supabase
      .from('vehicles')
      .delete()
      .eq('id', id)
      
    if (error) throw error
    return true
  }
}
