# Pemeliharaan template

Versi 1.3.0 memisahkan konten, tampilan, dan perilaku pada seluruh koleksi.

## Tanggung jawab file

| File                          | Isi yang diubah                                          |
| ----------------------------- | -------------------------------------------------------- |
| `<id>.html`                   | Konten, struktur semantik, class, label, dan data demo   |
| `<id>.css`                    | Token tema dan layout khusus template tersebut           |
| `assets/base.css`             | Reset, typography, primitive, dan responsive bersama     |
| `assets/portfolio.css`        | Komposisi dan primitive seluruh model portofolio         |
| `assets/core.js`              | Fixture dan aturan data demo                             |
| `assets/runtime.js`           | Interaksi template biasa melalui atribut data            |
| `assets/portfolio.js`         | Filter karya, dialog ilustrasi, kontak, dan unduh profil |
| `assets/catalog-previews.css` | Bentuk, proporsi, dan layout sketsa galeri               |
| `assets/catalog-themes.css`   | Tema sketsa yang dihasilkan dari CSS halaman             |
| `assets/chart-scale.css`      | Pemetaan nilai data grafik ke custom property CSS        |
| `assets/catalog-core.js`      | Aturan filter galeri                                     |
| `assets/catalog.js`           | DOM galeri, favorit, dan pratinjau                       |
| `frameworks/*/styles.css`     | Tampilan contoh framework                                |
| `frameworks/*/loader.js`      | Pemuatan aplikasi dan pesan saat library gagal dimuat    |
| `frameworks/*/app.js`         | Komponen dan state React/Vue                             |

## Urutan pemuatan

1. `assets/base.css` menyediakan aturan dasar.
2. `assets/portfolio.css` ditambahkan untuk model portofolio baru.
3. File CSS pasangan template dimuat terakhir untuk tema dan layout khusus.
4. `assets/core.js` dimuat sebelum `runtime.js`.
5. Halaman portofolio baru menambahkan `portfolio.js` setelah runtime bersama.

Script template statis memakai `defer` agar DOM tersedia saat kode mulai
berjalan. Core framework dimuat sebelum loader. Loader React/Vue memakai
`type="module"`. Import map pada dua halaman framework berisi JSON pemetaan
library, bukan kode JavaScript yang berjalan.

## Mengubah satu template

- Ubah judul, isi, label, gambar, dan alt pada HTML.
- Ubah warna melalui `:root` pada CSS pasangan template.
- Letakkan aturan khusus di CSS halaman, agar template lain tetap stabil.
- Gunakan class yang menyatakan fungsi, seperti `.ticket-price` atau
  `.booking-fields`, untuk style statis.
- Gunakan event listener pada file JS untuk perilaku baru. Kontrol bersama
  mengikuti kontrak `data-*` yang sudah tersedia.
- Buat `<id>.js` hanya jika ada perilaku khusus yang tidak cocok di runtime
  bersama. Jangan membuat file kosong atau salinan runtime untuk setiap HTML.

## Batas tanggung jawab

HTML memuat konten, struktur semantik, class, label, dan atribut data. Semua
warna, ukuran, jarak, layout, serta responsive berada dalam CSS. JavaScript
memproses input dan data, mengubah state, serta memasang event.

Jangan memakai atribut style, ukuran presentasional, style object React,
`.style`, cssText, atau penyisipan stylesheet pada kode runtime. Ukuran bawaan
ilustrasi didefinisikan oleh class `.artwork` pada reset CSS. Aturan media dan
halaman dapat menyesuaikannya melalui cascade.

Grafik mengirim nilai data yang dinormalisasi 0 sampai 100 melalui `data-level`.
`chart-scale.css` memetakan data tersebut. Persentase tinggi maksimum dan
susunan kolom berada pada CSS komponen. Label angka tetap menampilkan nilai
asli, sehingga pembulatan tingkat visual tidak mengubah metrik bisnis.

Pratinjau menggunakan elemen `<template id="catalog-sketch">` pada galeri.
JavaScript mengkloning struktur dan memberi identitas kategori, model, serta
template. `catalog-previews.css` menentukan bentuk. Tema berasal dari token
`:root` pada CSS setiap halaman melalui perintah:

```sh
npm run sync:previews
```

Jangan mengubah `catalog-themes.css` secara manual. Pemeriksaan akan menolak
warna metadata atau tema galeri yang tidak sesuai dengan CSS halaman.

Foto dan SVG di folder aset adalah konten media. Warna di dalam gambar merupakan
isi gambar. Aturan layout elemen gambar tetap berada pada CSS.

## Menambah template

1. Buat pasangan `<id>.html` dan `<id>.css` dalam kategori yang tepat.
2. Hubungkan stylesheet dengan href relatif dan script dengan src relatif.
3. Tambahkan metadata `path` serta `stylesheet` pada `templates.json`.
4. Sinkronkan metadata galeri pada `assets/manifest.js` tanpa nilai warna.
5. Jalankan `npm run sync:previews` setelah mengubah token tema.
6. Tambahkan halaman ke katalog dan catat sumber serta lisensi jika diperlukan.
7. Jalankan pemeriksaan serta tinjau halaman pada HP dan desktop.

Jalur portofolio memiliki satu tingkat folder tambahan. Pertahankan jumlah `../`
yang sesuai ketika menyalin referensi aset bersama.

## Pemeriksaan

```sh
npm run check
npm run format:check
```

Pemeriksaan menolak `<style>`, atribut style statis, event handler inline, dan
script yang berjalan tanpa src pada HTML sumber. Import map diperiksa sebagai
JSON. Stylesheet pasangan harus ada dan dirujuk oleh HTML-nya.

## Menyalin dan mengekspor

Untuk pemeliharaan, salin HTML, CSS pasangannya, serta file pada `assets/` yang
dirujuk. Menyalin hanya HTML tidak menyertakan tema halaman.

```sh
npm run export -- case-product
```

Exporter menghasilkan `exports/<id>/index.html`, `styles.css`, `script.js`, dan
folder aset media. Seluruhnya dapat dipindahkan bersama dan dibuka offline.
Format hasil ekspor mengikuti prinsip yang sama dengan sumber. Tidak ada CSS
atau kode JavaScript yang berjalan secara inline di HTML hasil ekspor.
