/**
 * Helper formatter functions
 */

export const formatRupiah = (value) => {
  if (!value) return 'Rp 0'
  return 'Rp ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

/**
 * Otomatis mengubah nomor HP Indonesia menjadi format resmi WhatsApp internasional (628...)
 * Mendukung format: 08..., +62..., 8..., spasi, tanda hubung (-)
 */
export const formatWhatsAppNumber = (phone) => {
  if (!phone) return '6285330222494'
  
  // Hapus semua karakter non-angka
  let cleaned = phone.toString().replace(/\D/g, '')
  
  // Jika diawali '0', ganti 0 dengan 62 (contoh: 0853... -> 62853...)
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.slice(1)
  } else if (cleaned.startsWith('8')) {
    // Jika user hanya ketik 853..., tambahkan 62 di depan
    cleaned = '62' + cleaned
  }
  
  return cleaned || '6285330222494'
}
