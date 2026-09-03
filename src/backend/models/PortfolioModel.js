import { supabase } from 'src/utils/supabase'

export default {
  async getAll() {
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .order('created_at', { ascending: false })
      
    if (error) throw error
    return data
  },

  async getByCategory(category) {
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })
      
    if (error) throw error
    return data
  },

  async insert(payload) {
    const { data, error } = await supabase
      .from('portfolios')
      .insert([payload])
      .select()
      
    if (error) throw error
    return data[0]
  },

  async delete(id) {
    const { error } = await supabase
      .from('portfolios')
      .delete()
      .eq('id', id)
      
    if (error) throw error
    return true
  }
}
