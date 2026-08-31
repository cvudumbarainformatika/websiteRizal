import VehicleModel from '../models/VehicleModel'

export default {
  /**
   * Mengambil semua kendaraan dengan handling state
   * @returns {Object} { data, error }
   */
  async fetchAll() {
    try {
      const data = await VehicleModel.getAll()
      return { data, error: null }
    } catch (err) {
      console.error('Error in VehicleController.fetchAll:', err.message)
      return { data: [], error: err.message }
    }
  },

  /**
   * Menyimpan kendaraan baru dengan validasi
   * @param {Object} payload 
   * @returns {Object} { data, error }
   */
  async store(payload) {
    try {
      if (!payload.name || !payload.category_id || !payload.price) {
        throw new Error('Data tidak lengkap. Nama, kategori, dan harga wajib diisi.')
      }
      const data = await VehicleModel.create(payload)
      return { data, error: null }
    } catch (err) {
      console.error('Error in VehicleController.store:', err.message)
      return { data: null, error: err.message }
    }
  },

  /**
   * Memperbarui kendaraan
   * @param {String} id 
   * @param {Object} payload 
   * @returns {Object} { data, error }
   */
  async update(id, payload) {
    try {
      if (!id || !payload) {
        throw new Error('ID atau data tidak lengkap.')
      }
      const data = await VehicleModel.update(id, payload)
      return { data, error: null }
    } catch (err) {
      console.error('Error in VehicleController.update:', err.message)
      return { data: null, error: err.message }
    }
  },

  /**
   * Menghapus kendaraan
   * @param {String} id 
   * @returns {Object} { success, error }
   */
  async destroy(id) {
    try {
      await VehicleModel.remove(id)
      return { success: true, error: null }
    } catch (err) {
      console.error('Error in VehicleController.destroy:', err.message)
      return { success: false, error: err.message }
    }
  }
}
