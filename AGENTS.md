# Aturan kerja frontend-template

Pengguna meminta pemisahan HTML, CSS, dan JavaScript untuk setiap permintaan
kode antarmuka. Terapkan aturan ini pada template baru, perbaikan, contoh
framework, dan hasil ekspor.

## Pembagian tanggung jawab

- HTML menyimpan struktur semantik, konten, class, label, dan atribut data.
- CSS terpisah mengatur warna, typography, ukuran, jarak, layout, responsive,
  serta efek visual. Hubungkan melalui `link` dengan `rel="stylesheet"`.
- JavaScript terpisah mengatur data, state, dan interaksi. Hubungkan melalui
  `script` dengan `src`. Pakai `defer` untuk script klasik yang membaca DOM.
- Jangan menambah `style`, blok `style`, handler event inline, style object
  React, penulisan `.style`, atau aturan CSS di JavaScript runtime.
- Gunakan class atau atribut data untuk state. Nilai data boleh dikirim ke CSS,
  tetapi aturan visual dan pemetaan skalanya tetap berada di CSS.
- Import map framework boleh berisi JSON pemetaan library. SVG eksternal
  merupakan konten media; geometri dan warna di dalamnya bukan layout halaman.
- Setiap template memiliki pasangan `<id>.html` dan `<id>.css` pada folder
  kategori yang sama. Gunakan runtime bersama bila perilakunya sudah tersedia.
- Ekspor harus mempertahankan file HTML, CSS, JavaScript, dan media yang
  terpisah, dengan semua referensi lokal tetap berfungsi.

## Desain dan konten

- Berikan komposisi dan isi yang sesuai profesi, bukan hanya mengganti warna.
- Profil dan proyek contoh harus jelas bersifat demonstrasi. Jangan mengarang
  klien, hasil bisnis, publikasi, sertifikasi, atau pengalaman nyata.
- Gunakan aset lokal orisinal atau sumber berlisensi. Pertahankan atribusi dan
  pemberitahuan lisensi yang sudah ada.
- Jangan menambah dependency hanya untuk dekorasi. Jika Bootstrap digunakan,
  gunakan aset lokal dari paket Bootstrap 5 yang disediakan pengguna dan
  dokumentasikan file yang diperlukan.

## Integrasi dan pemeriksaan

1. Daftarkan template pada `templates.json` dan `assets/manifest.js`.
2. Perbarui kategori, hitungan, katalog, dan README yang terkait.
3. Jalankan `npm run sync:previews` setelah menambah atau mengubah token tema.
4. Format kode dengan Prettier yang tersedia, berpedoman pada lebar 80 kolom.
5. Jalankan `npm run check`, `npm run format:check`, dan `git diff --check`.
6. Tinjau browser pada HP dan desktop. Periksa filter, hasil kosong, dialog,
   keyboard, gambar, overflow, serta ekspor untuk halaman yang berubah.
7. Laporkan pengujian yang benar-benar dilakukan. Push hanya ketika diminta atau
   termasuk lingkup pekerjaan yang telah diizinkan pengguna.
