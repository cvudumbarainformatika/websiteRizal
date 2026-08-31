import CategoryModel from '../models/CategoryModel'

export default {
  /**
   * Mengambil semua kategori
   */
  async fetchAll() {
    try {
      const data = await CategoryModel.getAll()
      return { data, error: null }
    } catch (err) {
      console.error('Error in CategoryController.fetchAll:', err.message)
      return { data: [], error: err.message }
    }
  }
}
