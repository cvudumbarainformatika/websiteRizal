import PortfolioModel from '../models/PortfolioModel'

export default {
  async fetchAll() {
    try {
      const data = await PortfolioModel.getAll()
      return { data, error: null }
    } catch (err) {
      console.error('Error fetching portfolios:', err.message)
      return { data: [], error: err.message }
    }
  },

  async addPortfolio(payload) {
    try {
      if (!payload.title || !payload.category || !payload.media_url) {
        throw new Error('Semua field (judul, kategori, url media) harus diisi.')
      }
      
      const newPortfolio = await PortfolioModel.insert(payload)
      return { data: newPortfolio, error: null }
    } catch (err) {
      console.error('Error adding portfolio:', err.message)
      return { data: null, error: err.message }
    }
  },

  async deletePortfolio(id) {
    try {
      await PortfolioModel.delete(id)
      return { success: true, error: null }
    } catch (err) {
      console.error('Error deleting portfolio:', err.message)
      return { success: false, error: err.message }
    }
  }
}
