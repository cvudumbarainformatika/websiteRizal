-- 1. Buat tabel settings (Key-Value Store)
CREATE TABLE IF NOT EXISTS public.settings (
    key VARCHAR(100) PRIMARY KEY,
    value TEXT NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Mengaktifkan RLS untuk tabel settings
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Policy (Semua orang bisa baca pengaturan web)
CREATE POLICY "Settings are viewable by everyone" ON public.settings
    FOR SELECT USING (true);

-- Policy (Hanya Admin yang bisa modifikasi pengaturan)
CREATE POLICY "Settings can be inserted by authenticated users only" ON public.settings
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Settings can be updated by authenticated users only" ON public.settings
    FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Settings can be deleted by authenticated users only" ON public.settings
    FOR DELETE USING (auth.role() = 'authenticated');

-- 2. Masukkan data pengaturan awal (Seed Data)
INSERT INTO public.settings (key, value, description) VALUES 
('site_logo', '/src/assets/images/logo-mr-gold.png', 'Logo utama website di Header'),
('site_favicon', '/favicon.ico', 'Icon kecil di tab browser'),
('hero_banner', '/src/assets/images/hero_bg.jpg', 'Gambar latar belakang raksasa di Beranda'),
('hero_title', 'Sewa Kendaraan Probolinggo', 'Judul besar di Beranda'),
('hero_subtitle', 'Pilihan terbaik untuk sewa mobil dan motor di Probolinggo dengan harga terjangkau.', 'Subjudul di Beranda'),
('contact_wa', '+6281234567890', 'Nomor WhatsApp Admin'),
('contact_wa_link', '6281234567890', 'Nomor WhatsApp untuk link api.whatsapp.com (tanpa +)'),
('contact_address', 'Jl. Yos Sudarso No.XX, Probolinggo, Jawa Timur', 'Alamat Fisik Garasi / Kantor'),
('contact_map_link', 'https://www.google.com/maps/place/Master+Rizal+Rent+Car+%26+Motor+Bike/@-7.7778151,113.1694412,17z/data=!3m1!4b1!4m6!3m5!1s0x2dd7b36b5c703b63:0xcc57a1a6cf3ccc50!8m2!3d-7.7778151!4d113.1694412!16s%2Fg%2F11tb7nv06x!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDgyMy4wIKXMDSoASAFQAw%3D%3D', 'URL Google Maps')
ON CONFLICT (key) DO UPDATE 
SET value = EXCLUDED.value, description = EXCLUDED.description;
