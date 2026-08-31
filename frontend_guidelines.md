# Panduan Frontend (6 Aturan Wajib)

Sesuai dengan instruksi, berikut adalah 6 Aturan Wajib yang harus dipatuhi dalam pengembangan UI/UX di proyek ini. Aturan ini dirancang untuk memastikan desain yang *scalable*, rapi, dan mudah dikelola (maintainable).

## 1. Harus Responsive (Mobile First)
- **Konsep Dasar**: Semua styling (padding, margin, flexbox, grid, typography) harus ditulis dengan asumsi layar terkecil (mobile) terlebih dahulu tanpa media query.
- **Implementasi**: Gunakan utility classes secara default untuk mobile, dan tambahkan prefix modifier (seperti `md-`, `lg-`) HANYA jika tata letak perlu berubah di layar yang lebih besar.
- **Larangan**: Jangan membuat elemen yang dipaksa lebar/tinggi fix (misalnya `width: 800px`) yang akan merusak tampilan di mobile.

## 2. Harus Modular
- **Konsep Dasar**: Halaman web harus dipecah menjadi blok-blok fungsional yang terpisah (komponen).
- **Implementasi**: Setiap bagian halaman (misal: Hero, Fleet, Testimonial) harus berupa file `.vue` terpisah yang diletakkan di folder `src/components/public/`.
- **Manfaat**: Memudahkan pencarian bug dan pengerjaan kolaboratif tanpa risiko *merge conflict* yang tinggi.

## 3. Harus Global Class
- **Konsep Dasar**: Penataan elemen (layouting) harus menggunakan kelas utilitas global, bukan menulis CSS custom untuk setiap elemen.
- **Implementasi**: DILARANG menggunakan tag `<style scoped>` di dalam komponen `.vue` untuk keperluan layout (seperti margin, padding, flex, grid, warna). Semua kelas utilitas harus didefinisikan di `src/css/app.scss` atau file SCSS global lainnya.
- **Larangan**: Tidak boleh ada kelas seperti `.card-saya { margin-top: 20px; }` di dalam komponen Vue. Gunakan kelas global seperti `<div class="g-mt-lg">`.

## 4. Warna Harus Global
- **Konsep Dasar**: Manajemen warna harus terpusat.
- **Implementasi**: DILARANG keras *hardcode* warna (contoh: `color: #FF0000` atau `background-color: red`) baik di atribut HTML, class custom, maupun inline style.
- **Larangan**: Jika membutuhkan warna spesifik, warna tersebut HARUS didaftarkan sebagai variabel CSS di `src/css/colors.scss` (contoh: `var(--color-primary-gold)`), lalu buat kelas utilitas global (contoh: `.text-primary-gold` atau `.bg-primary-gold`).

## 5. Komponen Harus Reusable (Sebisa Mungkin)
- **Konsep Dasar**: Komponen UI yang sering muncul (Tombol, Card, Judul Bagian) harus dibuat menjadi satu komponen Vue khusus yang menerima *props*.
- **Implementasi**: Letakkan komponen-komponen ini di `src/components/global/` (contoh: `VehicleCard.vue`, `SectionTitle.vue`). Komponen ini tidak boleh berisi logika *business* yang spesifik pada satu halaman saja.

## 6. Hanya 1 Layout Public & 1 Layout Admin
- **Konsep Dasar**: Struktur layouting utama aplikasi disederhanakan.
- **Implementasi**: 
  - `src/layouts/public/PublicLayout.vue`: Digunakan oleh semua halaman yang dapat diakses oleh pengunjung umum (Landing Page, Profil, dll).
  - `src/layouts/admin/AdminLayout.vue`: Digunakan HANYA untuk halaman dashboard dan panel kendali internal.
- **Manfaat**: Menghindari redundansi kode pada Header, Footer, dan Bottom Navigation.
