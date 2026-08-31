-- 1. Buat tabel categories
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL, -- e.g., 'Mobil', 'Motor', 'Pesawat'
    slug VARCHAR(100) NOT NULL UNIQUE, -- e.g., 'mobil', 'motor', 'pesawat'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Mengaktifkan RLS untuk tabel categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Policy (Semua orang bisa baca)
CREATE POLICY "Categories are viewable by everyone" ON public.categories
    FOR SELECT USING (true);

-- Policy (Hanya Admin yang bisa modifikasi)
CREATE POLICY "Categories can be inserted by authenticated users only" ON public.categories
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Categories can be updated by authenticated users only" ON public.categories
    FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Categories can be deleted by authenticated users only" ON public.categories
    FOR DELETE USING (auth.role() = 'authenticated');


-- 2. Insert master data awal
INSERT INTO public.categories (name, slug) VALUES 
('Mobil', 'mobil'),
('Motor', 'motor');


-- 3. Tambahkan kolom category_id ke tabel vehicles
ALTER TABLE public.vehicles 
ADD COLUMN category_id UUID REFERENCES public.categories(id);

-- 4. Update data kendaraan yang sudah ada agar terhubung dengan kategori yang tepat
-- (Akan mengubah berdasarkan nilai 'type' sebelumnya)
UPDATE public.vehicles v
SET category_id = c.id
FROM public.categories c
WHERE lower(v.type) = c.slug;

-- 5. Hapus kolom 'type' yang lama karena sudah tidak dipakai
ALTER TABLE public.vehicles 
DROP COLUMN type;
