import { supabase } from 'src/utils/supabase'

export default {
  /**
   * Mengambil semua master data kategori
   */
  async getAll() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true })
      
    if (error) throw error
    return data
  }
}
