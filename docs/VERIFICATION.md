# Verifikasi

Diperiksa pada 17 Oktober 2026 untuk pembaruan koleksi 1.1.0.

## Perintah

```sh
npm run check
npm run format:check
git diff --check
```

Pemeriksaan utama memakai Node.js 20+ dan Python 3. Formatter pengembangan
memakai Prettier 3.6.2 yang dipatok pada manifest dan lockfile.

## Cakupan otomatis

- 90 ID template unik dalam 10 kategori.
- 36 portofolio, sembilan kategori profesi, enam adaptasi MIT.
- Metadata galeri dan exporter harus sama.
- Enam pengalihan URL lama mengarah ke template kanonis yang tersedia.
- 99 dokumen HTML: galeri, 90 template, enam redirect, dan dua framework.
- Struktur HTML, ID, anchor, referensi file, label, alt, main, h1, dan title.
- Sintaks 13 file JavaScript dan MJS.
- 15 tes fungsi dan ekspor, seluruhnya lulus.
- Gabungan pencarian, profesi, asal kode, favorit, dan hasil kosong.
- Aturan transaksi, periode, nilai nol, stok, varian, dan escaping CSV.
- Ekspor seluruh 90 template, termasuk folder bertingkat.
- Aset lokal digabung dan anchor hasil ekspor tetap tersedia.
- Ekspor adaptasi mempertahankan komentar lisensi MIT.
- Tiga hasil ekspor juga dibuka lewat file lokal di browser: Casebook Product,
  Paper Writer, dan Build Developer. Aset terdekode serta pencarian, keadaan
  kosong, dan reset pada dua model baru berfungsi.
- Prettier memeriksa HTML, CSS, JS, MJS, JSON, SVG, dan Markdown.
- Python dirapikan dengan indentasi empat spasi.

## Browser

Chromium 133.0.6943.0 melalui Playwright, headless pada Linux.

- 252 kunjungan viewport terhadap 90 template.
- Semua 36 portofolio: lebar 320, 360, 768, dan 1440 piksel.
- 54 template lain: lebar 360 dan 1365 piksel.
- Tidak menemukan exception JavaScript atau request lokal dengan status 4xx/5xx.
- Tidak menemukan overflow horizontal pada lebar yang diperiksa.
- 30 portofolio baru: pencarian, hasil kosong, reset, dan filter jenis karya.
- Detail proses dibuka dengan keyboard.
- Dialog ilustrasi dibuka dengan keyboard, ditutup melalui Escape, dan
  mengembalikan fokus ke tombol pembuka.
- Unduh profil menghasilkan `.txt` dengan nama template dan penanda demo.
- Tombol salin kontak memberikan status atau fallback pemilihan teks.
- Galeri: kategori, profesi, sumber, query, reload URL, dan favorit.
- Pratinjau: buka, ukuran HP, Escape, serta reset ukuran saat dibuka kembali.
- Seluruh enam URL lama berhasil berpindah ke folder kanonis.
- Pemeriksaan gambar membedakan media yang menunggu lazy loading dari file yang
  gagal dimuat. Gambar lazy diminta dan didekode saat pemeriksaan lanjut.

Screenshot desktop dan HP diperiksa untuk galeri, Casebook Product, Atelier
Architecture, Shell Backend, dan Paper Writer. Judul pada hero split diperkecil
setelah tinjauan visual agar ritme teks lebih proporsional.

## Batas cakupan

Viewport merupakan simulasi browser desktop, bukan perangkat fisik. Tidak
melakukan audit screen reader, pengukuran Core Web Vitals, atau menyatakan
kepatuhan WCAG secara menyeluruh.

Contoh React dan Vue mempertahankan versi CDN yang sudah ada. Nomor versi
tersedia pada registry, tetapi pemuatan CDN keduanya belum diuji end-to-end.
Perubahan Vue menandai literal template HTML agar formatter dapat merapikan
markup yang sebelumnya memanjang pada satu baris.

Tidak ada backend, autentikasi, pembayaran, pengiriman formulir, atau data
produksi yang termasuk dalam pengujian. Seluruh profil baru, karya, dan angka
adalah demonstrasi.
