# Verifikasi

Diperiksa pada 17 Oktober 2026 untuk versi 1.3.0, pemisahan seluruh aturan
visual dari HTML, metadata, dan JavaScript runtime.

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
- Metadata tidak menyimpan palet warna. Tema galeri dihasilkan dari token CSS
  setiap halaman dan diperiksa kesesuaiannya.
- Bentuk serta layout sketsa galeri didefinisikan oleh CSS, dengan struktur
  elemen pada template HTML.
- Ukuran gambar sumber dipindahkan dari atribut HTML ke class `.artwork`.
- Grafik memakai data-level 0 sampai 100 dan skala yang berada pada CSS.
- HTML sumber tidak memuat `<style>`, atribut style statis, event handler
  inline, atribut ukuran presentasional, atau JavaScript yang berjalan tanpa
  src.
- Runtime diperiksa agar tidak menulis style DOM atau style object React.
- Dua import map tetap berupa JSON dan diperiksa validitasnya.
- 99 dokumen HTML diperiksa: galeri, 90 template, enam redirect, dua framework.
- Nesting, ID, anchor, referensi lokal, label, alt, main, h1, dan title
  diperiksa.
- Sintaks seluruh 16 file JavaScript dan MJS diperiksa.
- Prettier memeriksa HTML, CSS, JS, MJS, JSON, SVG, dan Markdown.
- Python memakai indentasi empat spasi.

## Fungsi dan ekspor

16 tes fungsi dan ekspor lulus, mencakup:

- Filter gabungan kategori, profesi, asal kode, query, dan favorit.
- Keadaan hasil kosong dan pembatasan filter khusus portofolio.
- Ringkasan transaksi, periode, nilai nol, stok, varian, dan escaping CSV.
- Normalisasi data grafik, nilai tidak valid, dan batas skala 0 sampai 100.
- Ekspor seluruh 90 template ke folder HTML, CSS, JavaScript, dan aset media.
- Seluruh referensi lokal tersedia di dalam folder ekspor masing-masing.
- Gambar SVG lokal disertakan, anchor tersedia, dan lisensi MIT dipertahankan.

Seluruh 90 folder ekspor dibuka sebagai file lokal dalam browser. HTML memuat
stylesheet dan script eksternal. Tema halaman serta gambar lokal terbaca, tanpa
style inline. Filter dashboard dan pencarian portofolio juga diuji pada hasil
ekspor.

## Perbandingan tampilan

Chromium 133.0.6943.0 melalui Playwright, headless pada Linux.

90 template dibandingkan dengan commit sebelumnya pada lebar 360 dan 1365
piksel. Total 180 pasangan perbandingan, atau 360 pemuatan halaman.

Pemeriksaan membandingkan kotak elemen serta nilai style terhitung, termasuk
font, warna, latar, padding, margin, border, grid, gap, alignment, dan ukuran.
Gambar diminta dan didekode sebelum pengambilan nilai. Hasil:

- 178 pasangan sama pada elemen yang diperiksa.
- Dua pasangan Pulse Sales menunjukkan pembulatan tinggi batang karena
  normalisasi data menjadi 0 sampai 100. Metrik dan label angka tetap sama.
- Tidak ditemukan exception JavaScript.

Screenshot HP ditinjau untuk Pulse Sales, Member Warm, Notebook Data, dan
Casebook Product. Sketsa galeri ditinjau pada HP dan desktop. Ini pemeriksaan
hasil render, bukan audit pixel menyeluruh atau bukti kepatuhan aksesibilitas.

## Alur browser

- Galeri: 90 sketsa CSS, profesi dan sumber, simpan favorit, reload, dialog
  pratinjau, iframe, dan ukuran HP.
- Preview portofolio memuat ketiga stylesheet lokal yang diperlukan.
- Dashboard: periode harian mengubah pendapatan menjadi Rp450.000 dan CSV
  memakai periode aktif. Jumlah batang berubah dari tujuh menjadi satu. Data nol
  menghasilkan tinggi nol; skala CSS mengikuti nilai data.
- Toko: tambah produk, buka keranjang, lihat baris, dan tutup dialog.
- Login: tombol tampilkan password mengubah tipe input.
- Portofolio: pencarian kosong, reset, dialog ilustrasi, Escape, dan unduh
  profil.
- React dan Vue: loader eksternal menampilkan pesan saat request library CDN
  sengaja digagalkan oleh pemeriksaan.
- CSS grafik React diuji dengan tujuh dan satu kolom tanpa penulisan style oleh
  JavaScript. Ini pemeriksaan layout CSS dengan struktur DOM komponen, bukan
  pengujian komponen React secara end-to-end.
- Tidak ada style inline setelah interaksi galeri, grafik, toko, login,
  portofolio, dan hasil ekspor.
- Tidak ditemukan request lokal 4xx/5xx atau exception JavaScript pada alur ini.

## Batas cakupan

Viewport merupakan simulasi browser desktop, bukan perangkat fisik. Tidak
melakukan audit screen reader atau pengukuran Core Web Vitals. Tidak mengklaim
kepatuhan WCAG menyeluruh.

Alur gagal memuat CDN diuji pada React dan Vue. Pemuatan CDN keduanya sampai
aplikasi berjalan belum diuji end-to-end pada pembaruan ini. Versi library tidak
berubah. Perubahan komponen mencakup pemetaan nilai grafik dan pemindahan ukuran
media ke CSS.

Tidak ada backend, autentikasi, pembayaran, pengiriman formulir, atau data
produksi yang termasuk dalam pengujian. Seluruh profil dan karya adalah demo.
