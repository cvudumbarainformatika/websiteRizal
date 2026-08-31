# Standard Aturan & Arsitektur Frontend Website

Dokumen ini berisi aturan **WAJIB** untuk pengembangan frontend aplikasi/website ini. Seluruh pengembang dan AI agent yang bekerja pada proyek ini harus mematuhi aturan ini tanpa terkecuali.

---

## 🚀 Prinsip Utama (Core Principles)
Frontend harus memenuhi 9 pilar utama:
`GOOD UI` + `GOOD UX` + `RESPONSIVE` + `ACCESSIBLE` + `MODULAR` + `REUSABLE` + `PERFORMANT` + `MAINTAINABLE` + `SCALABLE`

---

## 📌 6 Aturan Wajib Pengembangan

### 1. Harus Responsive (Mobile First)
- Desain diawali dari viewport mobile (`xs`/`sm`), kemudian dikembangkan untuk tablet (`md`) dan desktop (`lg`/`xl`).
- Gunakan grid system dan breakpoint global (`@media` breakpoint Quasar / CSS variables).
- Komponen seperti navigasi dasar harus fleksibel (misal: Bottom Navigation pada Mobile, Header Navigation pada Desktop).

### 2. Harus Modular
- Struktur folder dan modul harus terorganisir dengan rapi sesuai domain/fitur.
- **Struktur Folder Standar:**
  ```text
  src/
  ├── assets/          # Gambar, font, icon
  ├── boot/            # Inisialisasi awal (axios, global-components, dll)
  ├── components/      # Komponen UI
  │   ├── global/      # Komponen global reusable (AppButton, AppBadge, dll)
  │   ├── public/      # Komponen modular khusus halaman publik
  │   └── admin/       # Komponen modular khusus halaman admin
  ├── css/             # Styling global & token warna
  │   ├── quasar.variables.scss
  │   ├── colors.scss  # HANYA di sini tempat mendaftarkan warna!
  │   └── app.scss
  ├── layouts/         # Layout utama aplikasi
  │   ├── PublicLayout.vue # 1 Layout Publik
  │   └── AdminLayout.vue  # 1 Layout Admin
  ├── pages/           # Halaman utama
  │   ├── public/      # Halaman publik (Landing page, Armada, dll)
  │   └── admin/       # Halaman dashboard admin
  ├── router/          # Konfigurasi routing
  └── stores/          # Pinia / State management modular
  ```

### 3. Harus Global Class
- Hindari menulis utility class berulang di scoped CSS masing-masing komponen.
- Semua utility class umum (padding, margin, flex helper, text alignment, card container, glassmorphism, shadow, border-radius) didefinisikan secara global di `src/css/app.scss` & `src/css/customs.scss`.

### 4. Warna Harus Global (DILARANG HARDCODE COLOR!)
- **SANGAT DILARANG** melakukan hardcode kode warna hex/rgb (`#F5B800`, `rgb(...)`) langsung pada file `.vue` (baik inline style maupun scoped CSS).
- Semua variabel warna didefinisikan secara sentral pada `src/css/colors.scss` dan `src/css/quasar.variables.scss`.
- Gunakan class warna global atau CSS Variables (contoh: `var(--color-primary-gold)`, `class="bg-primary-gold"`, `class="text-primary-gold"`).
- Jika ada penambahan warna baru, **WAJIB** mendaftarkannya terlebih dahulu di `src/css/colors.scss`.

### 5. Komponen Harus Reusable (Sebisa Mungkin)
- Setiap elemen UI yang dipakai lebih dari satu kali (Button, Rating Stars, Vehicle Card, Testimonial Card, Badge, Section Header, Filter Tabs, Nav Item) harus diisolasi menjadi komponen terpisah di `components/global/` atau `components/public/`.
- Gunakan Vue `props` dan `slots` secara efektif untuk meningkatkan fleksibilitas komponen.

### 6. Tepat 1 Layout Publik & 1 Layout Admin
- **PublicLayout.vue**: Layout khusus untuk pengunjung/halaman publik (Header branding, Bottom Navigation Mobile, Footer, WhatsApp Floating CTA).
- **AdminLayout.vue**: Layout khusus untuk dashboard administrator (Sidebar drawer, Top navbar user, Content wrapper).
- Tidak boleh membuat layout acak/terpisah-pisah untuk halaman publik lain.

---

## ♿ Aksesibilitas (SEO & Accessibility)
- Seluruh halaman publik wajib menggunakan HTML5 Semantic tag (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- Menyediakan tag `<h1-h6>` secara hierarkis yang benar untuk struktur heading SEO.
- Semua elemen interaktif (tombol, link) harus memiliki `aria-label` dan kontras warna yang cukup.
- Semua gambar wajib menggunakan atribut `alt` yang deskriptif.
- Menyediakan metadata SEO (title, meta description, OpenGraph tags, JSON-LD structured data) untuk kemudahan pengindeksan Google.
