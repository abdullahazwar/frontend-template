# Verifikasi

Diperiksa pada 17 Oktober 2026 untuk versi 1.4.0, penambahan 18 model portofolio
dengan HTML, CSS, dan JavaScript terpisah.

## Perintah

```sh
npm run check
npm run format:check
node scripts/sync-previews.mjs --check
git diff --check
```

16 tes fungsi dan ekspor lulus. Pemeriksaan HTML mencakup 117 dokumen: galeri,
108 template kanonis, enam redirect, dan dua contoh framework. Sintaks 16 file
JavaScript/MJS diperiksa. Formatter tetap Prettier 3.6.2; tidak menambah
dependency runtime.

## Koleksi dan pemisahan file

- 108 ID unik dalam 10 kategori utama.
- 54 portofolio dalam sembilan kategori profesi, dengan enam adaptasi MIT.
- 18 tambahan orisinal mempunyai pasangan HTML dan CSS pada folder profesinya.
- Tiap kategori profesi mendapat dua model tambahan. Hitungan folder, README,
  metadata, dan galeri diperbarui.
- Warna dan layout berada pada stylesheet. Metadata tidak memuat palet warna.
- HTML sumber tidak memuat blok style, atribut style, ukuran presentasional,
  handler inline, atau JavaScript yang berjalan tanpa src.
- Runtime diperiksa agar tidak menulis style DOM atau style object React. Aturan
  juga mencakup JavaScript pada folder template.
- Tema sketsa galeri sesuai token CSS halaman.
- Sembilan SVG orisinal tambahan diperiksa sebagai XML yang valid. Referensi,
  alt, caption, ID, anchor, nesting, landmark, dan label HTML diperiksa.
- Aturan pemisahan file dicatat pada AGENTS.md untuk pekerjaan berikutnya.

## Browser dan responsive

Chromium 133.0.6943.0 melalui Playwright, headless pada Linux.

18 halaman baru dibuka pada lebar 320, 360, 768, dan 1440 piksel: total 72
kombinasi halaman dan viewport. Gambar dimuat serta didekode sebelum
pemeriksaan. Tidak ditemukan overflow horizontal pada dokumen yang diperiksa.
Tema, lebar konten, dan pemuatan media diperiksa; screenshot HP, desktop, serta
bagian karya ditinjau untuk variasi model.

Dua ilustrasi tapak disesuaikan agar diagram hero ditampilkan utuh. Halaman
Terrain dan Atlas diperiksa ulang pada keempat ukuran setelah perubahan,
termasuk interaksi dan hasil ekspornya.

Kontras token teks utama, teks sekunder, aksen, serta tombol diperiksa terhadap
latar yang dipakai komponen. Beberapa token teks sekunder digelapkan agar
caption pada latar lembut tetap terbaca. Pemeriksaan token ini bukan audit
aksesibilitas menyeluruh.

## Interaksi portofolio

Seluruh 18 halaman baru menjalani alur berikut:

- Pencarian tanpa hasil menampilkan keadaan kosong.
- Reset memulihkan tiga karya dan mengembalikan fokus ke kolom pencarian.
- Filter kategori dan pencarian bekerja bersama.
- Detail proses dapat dibuka melalui elemen native details.
- Dialog ilustrasi terbuka, tertutup dengan Escape, dan mengembalikan fokus.
- Tombol kontak menyalin alamat contoh ke clipboard dan menampilkan status.
- Unduh profil menghasilkan nama file yang sesuai template serta isi ketiga
  karya. Label demonstrasi tetap disertakan.
- Filter dan reset tetap dapat digunakan pada lebar 320 piksel.
- Tidak ditemukan deklarasi CSS inline setelah interaksi.

Galeri diuji untuk 54 portofolio, kategori pelajar, sumber orisinal, pencarian,
favorit yang bertahan setelah reload, serta iframe pratinjau HP. Template baru
pada iframe memuat tiga stylesheet eksternal yang dibutuhkan.

## Ekspor dan regresi

Semua 108 folder ekspor dibuka offline sebagai file lokal. HTML memuat
styles.css dan script.js secara eksternal. Tema serta gambar lokal terbaca.
Pencarian dan reset juga diuji pada seluruh 18 portofolio baru hasil ekspor. Tes
otomatis memeriksa keberadaan referensi lokal, anchor, dan pemberitahuan MIT
pada adaptasi.

36 portofolio lama dibandingkan dengan commit a474e5c pada lebar 360 dan 1440
piksel: total 72 pasangan, atau 144 pemuatan halaman. Kotak elemen dan computed
style yang diperiksa tetap sama pada seluruh pasangan. Penambahan primitive CSS
baru tidak mengubah tampilan halaman lama yang diperiksa.

Tidak ditemukan exception JavaScript atau respons aset lokal 4xx/5xx pada alur
browser pembaruan ini.

## Batas cakupan

Viewport memakai simulasi browser desktop, bukan perangkat fisik. Tidak
melakukan pengukuran Core Web Vitals, audit screen reader, atau audit kepatuhan
WCAG penuh. Identitas, proyek, dan ilustrasi merupakan demonstrasi.

Contoh React/Vue serta backend tidak diubah oleh pembaruan ini. Pemuatan library
CDN framework tidak diuji ulang. Tidak menguji autentikasi, pembayaran,
pengiriman formulir, atau layanan produksi.
