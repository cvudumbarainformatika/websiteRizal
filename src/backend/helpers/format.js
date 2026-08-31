/**
 * Helper formatter functions
 */

export const formatRupiah = (value) => {
  if (!value) return 'Rp 0'
  return 'Rp ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
