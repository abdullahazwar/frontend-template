# Pemeliharaan template

Versi 1.2.0 memisahkan konten, tampilan, dan perilaku pada seluruh koleksi.

## Tanggung jawab file

| File                      | Isi yang diubah                                          |
| ------------------------- | -------------------------------------------------------- |
| `<id>.html`               | Konten, struktur semantik, class, label, dan data demo   |
| `<id>.css`                | Token tema dan layout khusus template tersebut           |
| `assets/base.css`         | Reset, typography, primitive, dan responsive bersama     |
| `assets/portfolio.css`    | Komposisi dan primitive seluruh model portofolio         |
| `assets/core.js`          | Fixture dan aturan data demo                             |
| `assets/runtime.js`       | Interaksi template biasa melalui atribut data            |
| `assets/portfolio.js`     | Filter karya, dialog ilustrasi, kontak, dan unduh profil |
| `assets/catalog-core.js`  | Aturan filter galeri                                     |
| `assets/catalog.js`       | DOM galeri, favorit, dan pratinjau                       |
| `frameworks/*/styles.css` | Tampilan contoh framework                                |
| `frameworks/*/loader.js`  | Pemuatan aplikasi dan pesan saat library gagal dimuat    |
| `frameworks/*/app.js`     | Komponen dan state React/Vue                             |

## Urutan pemuatan

1. `assets/base.css` menyediakan aturan dasar.
2. `assets/portfolio.css` ditambahkan untuk model portofolio baru.
3. File CSS pasangan template dimuat terakhir untuk tema dan layout khusus.
4. `assets/core.js` dimuat sebelum `runtime.js`.
5. Halaman portofolio baru menambahkan `portfolio.js` setelah runtime bersama.

Script klasik memakai `defer` agar DOM tersedia saat kode mulai berjalan. Loader
React/Vue memakai `type="module"`. Import map pada dua halaman framework berisi
JSON pemetaan library, bukan kode JavaScript yang berjalan.

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

Custom property seperti `--bar` mengikuti nilai grafik yang berubah.
Perhitungannya berada pada JavaScript eksternal. Bentuk dan warna default
komponen tetap berada pada CSS.

## Menambah template

1. Buat pasangan `<id>.html` dan `<id>.css` dalam kategori yang tepat.
2. Hubungkan stylesheet dengan href relatif dan script dengan src relatif.
3. Tambahkan metadata `path` serta `stylesheet` pada `templates.json`.
4. Sinkronkan metadata galeri pada `assets/manifest.js`.
5. Tambahkan halaman ke katalog dan catat sumber serta lisensi jika diperlukan.
6. Jalankan pemeriksaan serta tinjau halaman pada HP dan desktop.

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

Exporter menggabungkan aset ke satu HTML untuk dibagikan atau dibuka offline.
Ini format distribusi. Edit file sumber yang terpisah ketika mengembangkan
template, lalu ekspor kembali setelah perubahan selesai.
