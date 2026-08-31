-- Buat tabel vehicles
CREATE TABLE vehicles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('mobil', 'motor')),
  price integer NOT NULL,
  image_url text NOT NULL,
  transmission text NOT NULL,
  capacity integer,
  features jsonb DEFAULT '[]'::jsonb
);

-- Aturan Keamanan (Row Level Security)
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

-- Izinkan siapa saja (publik) untuk MEMBACA (SELECT) data kendaraan
CREATE POLICY "Public profiles are viewable by everyone."
  ON vehicles FOR SELECT
  USING ( true );

-- Izinkan hanya admin (yang sudah login) untuk MENAMBAH, MENGUBAH, dan MENGHAPUS
CREATE POLICY "Users can insert vehicles."
  ON vehicles FOR INSERT
  WITH CHECK ( auth.role() = 'authenticated' );

CREATE POLICY "Users can update own vehicles."
  ON vehicles FOR UPDATE
  USING ( auth.role() = 'authenticated' );

CREATE POLICY "Users can delete own vehicles."
  ON vehicles FOR DELETE
  USING ( auth.role() = 'authenticated' );

-- Insert Data Dummy Awal
INSERT INTO vehicles (name, type, price, image_url, transmission, capacity, features) VALUES
('Toyota Avanza', 'mobil', 300000, '/src/assets/images/car_avanza.jpg', 'Manual / Matic', 7, '["AC Dingin", "Audio Bluetooth", "Bersih & Wangi"]'),
('Toyota Innova Reborn', 'mobil', 500000, '/src/assets/images/car_innova.jpg', 'Manual / Matic', 7, '["Captain Seat", "AC Double Blower", "Suspensi Empuk"]'),
('Mitsubishi Xpander', 'mobil', 350000, '/src/assets/images/car_xpander.jpg', 'Manual / Matic', 7, '["Desain Sporty", "Kabin Luas", "Irit BBM"]'),
('Honda Vario 125', 'motor', 75000, '/src/assets/images/motor_vario.jpg', 'Matic', 2, '["2 Helm SNI", "Jas Hujan", "Terawat"]'),
('Honda Beat Street', 'motor', 65000, '/src/assets/images/motor_beat.jpg', 'Matic', 2, '["2 Helm SNI", "Jas Hujan", "Lincah & Irit"]');
