# Verifikasi

Diperiksa pada 17 Oktober 2026 untuk versi 1.2.0, pemisahan aset halaman.

## Perintah

```sh
npm run check
npm run format:check
git diff --check
```

Pemeriksaan utama memakai Node.js 20+ dan Python 3. Formatter pengembangan
memakai Prettier 3.6.2 yang dipatok pada manifest dan lockfile.

## Struktur dan aset

- 90 ID template unik dalam 10 kategori.
- 36 portofolio dalam sembilan kategori profesi, dengan enam adaptasi MIT.
- Setiap template mempunyai stylesheet dengan nama yang sama di foldernya.
- Metadata `stylesheet` sesuai dengan file yang dirujuk HTML.
- 92 blok CSS dipindahkan ke 90 stylesheet template dan dua stylesheet
  framework.
- 11 atribut style statis diubah menjadi class dengan nama sesuai fungsinya.
- Dua loader framework dipindahkan ke file `loader.js` masing-masing.
- HTML sumber tidak memuat `<style>`, atribut style statis, event handler
  inline, atau JavaScript yang berjalan tanpa src.
- Dua import map tetap berupa JSON dan diperiksa validitasnya.
- 99 dokumen HTML diperiksa: galeri, 90 template, enam redirect, dua framework.
- Nesting, ID, anchor, referensi lokal, label, alt, main, h1, dan title
  diperiksa.
- Sintaks seluruh 15 file JavaScript dan MJS diperiksa.
- Prettier memeriksa HTML, CSS, JS, MJS, JSON, SVG, dan Markdown.
- Python memakai indentasi empat spasi.

## Fungsi dan ekspor

15 tes fungsi dan ekspor lulus, mencakup:

- Filter gabungan kategori, profesi, asal kode, query, dan favorit.
- Keadaan hasil kosong dan pembatasan filter khusus portofolio.
- Ringkasan transaksi, periode, nilai nol, stok, varian, dan escaping CSV.
- Ekspor seluruh 90 template dengan CSS pasangannya.
- Tidak ada ketergantungan file tetangga pada hasil ekspor mandiri.
- Gambar SVG lokal disertakan, anchor tersedia, dan lisensi MIT dipertahankan.

Tiga hasil ekspor dibuka sebagai file lokal dalam browser: Pulse Sales, Member
Warm, dan Casebook Product. Tema halaman terpasang dan interaksi pencarian
Casebook tetap berfungsi setelah CSS dan JS digabung ke hasil ekspor.

## Perbandingan tampilan

Chromium 133.0.6943.0 melalui Playwright, headless pada Linux.

90 template dibandingkan dengan commit sebelumnya pada lebar 360 dan 1365
piksel. Total 180 pasangan perbandingan, atau 360 pemuatan halaman.

Pemeriksaan membandingkan kotak elemen serta nilai style terhitung, termasuk
font, warna, latar, padding, margin, border, grid, gap, alignment, dan ukuran.
Gambar diminta dan didekode sebelum pengambilan nilai. Hasil:

- 180 pasangan sama, tanpa perubahan style atau geometri elemen yang diperiksa.
- Tidak ditemukan exception JavaScript.

Screenshot HP ditinjau untuk Pulse Sales, Member Warm, Notebook Data, dan
Casebook Product. Ini pemeriksaan hasil render, bukan audit pixel menyeluruh
atau bukti kepatuhan aksesibilitas.

## Alur browser

- Galeri: profesi dan sumber, dialog pratinjau, iframe, dan ukuran HP.
- Preview portofolio memuat ketiga stylesheet lokal yang diperlukan.
- Dashboard: periode harian mengubah pendapatan menjadi Rp450.000 dan CSV
  memakai periode aktif.
- Toko: tambah produk, buka keranjang, lihat baris, dan tutup dialog.
- Login: tombol tampilkan password mengubah tipe input.
- Portofolio: pencarian kosong, reset, dialog ilustrasi, Escape, dan unduh
  profil.
- React dan Vue: loader eksternal menampilkan pesan saat request library CDN
  sengaja digagalkan oleh pemeriksaan.
- Tidak ditemukan request lokal 4xx/5xx atau exception JavaScript pada alur ini.

## Batas cakupan

Viewport merupakan simulasi browser desktop, bukan perangkat fisik. Tidak
melakukan audit screen reader atau pengukuran Core Web Vitals. Tidak mengklaim
kepatuhan WCAG menyeluruh.

Alur gagal memuat CDN diuji pada React dan Vue. Pemuatan CDN keduanya sampai
aplikasi berjalan belum diuji end-to-end pada pembaruan ini. Versi library dan
komponen aplikasi tidak berubah.

Tidak ada backend, autentikasi, pembayaran, pengiriman formulir, atau data
produksi yang termasuk dalam pengujian. Seluruh profil dan karya adalah demo.
