# Frontend Template

108 template HTML dalam 10 kategori. Koleksi portofolio berisi 54 model,
dikelompokkan ke sembilan profesi. Tersedia juga contoh native React dan Vue.

Koleksi portofolio mencakup enam model awal, 42 tambahan orisinal, dan enam
adaptasi bagian kode Simplefolio, DevPortfolio, serta AstroPaper berlisensi MIT.
Pemberitahuan lisensi dan sumber tersimpan bersama proyek.

## Mulai

1. Unduh repo dan buka `index.html` untuk menjelajahi galeri.
2. Pilih kategori Portofolio. Saring profesi, asal kode, atau kata pencarian.
3. Buka halaman langsung atau gunakan pratinjau desktop dan HP.
4. Edit konten pada HTML dan tampilan pada file CSS pasangannya. Semua template
   memakai aset lokal.

Tanpa instalasi dependency atau build untuk menjalankan template HTML. Server
lokal opsional memakai Node.js 20+:

```sh
npm start
```

Buka `http://127.0.0.1:4173`. Template HTML dapat dibuka melalui `file://`. Dua
contoh framework memerlukan server HTTP dan koneksi CDN.

## Kategori utama

- Dashboard: 6 halaman analitik dan operasional.
- Admin: 6 halaman pengelolaan.
- User: 6 halaman akun dan aktivitas.
- Toko daring: 6 model katalog dan produk.
- Login: 6 model akses akun.
- Portofolio: 54 model dengan kategori dan asal kode.
- Perusahaan: 6 halaman bisnis dan layanan.
- Blog: 6 model tulisan dan publikasi.
- Forum: 6 model diskusi.
- Pendaftaran: 6 model registrasi dan onboarding.

[Katalog seluruh halaman](docs/CATALOG.md)

## Model portofolio

- `developer/`: 8 model, termasuk DevOps, keamanan, terminal, dan release log.
- `design/`: 7 model untuk UI, UX, brand, riset, serta desain inklusif.
- `photography/`: 6 model termasuk fotografi produk dan seri alam.
- `architecture/`: 6 model arsitektur, interior, lanskap, dan desain ruang.
- `creative/`: 8 model film, musik, ilustrasi, tattoo art, serta keramik.
- `writing/`: 5 model esai, jurnalistik, copywriting, editor, dan penerjemah.
- `research/`: 5 model akademik, laboratorium, data, dan geospasial.
- `professional/`: 5 model konsultan, engineer, freelancer, pengajar, dan
  kuliner.
- `student/`: 4 model lulusan, pelajar TKJ, tugas akhir, serta peserta magang.

Setiap folder memuat README yang menjelaskan model dan cara mengubah isi. 48
halaman tambahan memiliki pencarian karya, filter, detail proses, kontak contoh
yang bisa disalin, dan unduh profil demonstrasi sebagai `.txt`. Model visual
memiliki dialog untuk memperbesar ilustrasi.

Enam alamat portofolio lama tetap berfungsi melalui halaman pengalihan. Lokasi
kanonis baru ada di `templates/portfolio/<profesi>/`.

[Panduan portofolio](templates/portfolio/README.md)

## Pemisahan HTML, CSS, dan JavaScript

Setiap template mempunyai pasangan file dengan nama yang sama. Contohnya:

```text
templates/portfolio/design/case-product.html
templates/portfolio/design/case-product.css
```

HTML memuat CSS melalui `<link rel="stylesheet" href="./case-product.css">`.
JavaScript dimuat melalui `<script src="..." defer></script>`. Kode interaksi
bersama tetap berada di `assets/`, sehingga perbaikan berlaku ke halaman
terkait.

108 template dan dua contoh framework memakai stylesheet terpisah. Style statis
sudah menjadi class CSS. Tidak ada blok CSS atau kode JavaScript yang berjalan
di dalam HTML sumber. Dua import map framework tetap berupa konfigurasi JSON.

Saat menyalin template, sertakan file CSS pasangannya serta aset bersama yang
direferensikan. Desain memakai CSS native. Pemisahan file mempertahankan
komposisi koleksi yang sudah tersedia.

JavaScript tidak menyimpan warna, ukuran, posisi, atau aturan layout. Grafik
mengirim data terukur melalui `data-level`; CSS menentukan tampilannya. Galeri
memakai struktur HTML dan stylesheet untuk komposisi serta tema. Nilai warna
tidak disimpan dalam metadata template.

Tema galeri mengikuti CSS halaman. Setelah mengubah tema, jalankan:

```sh
npm run sync:previews
```

[Panduan pemeliharaan](docs/MAINTENANCE.md)

[AGENTS.md](AGENTS.md) menetapkan pemisahan HTML, CSS, dan JavaScript sebagai
aturan untuk setiap perubahan antarmuka berikutnya dalam repo ini.

## Struktur

```text
index.html
assets/
  base.css
  core.js
  runtime.js
  catalog-core.js
  catalog.js
  catalog.css
  catalog-previews.css
  catalog-themes.css
  chart-scale.css
  portfolio.css
  portfolio.js
  art/
templates/
  dashboard/
    pulse-sales.html
    pulse-sales.css
  portfolio/
    developer/
    design/
    photography/
    architecture/
    creative/
    writing/
    research/
    professional/
    student/
frameworks/
  react/
    index.html
    styles.css
    loader.js
    app.js
  vue/
    index.html
    styles.css
    loader.js
    app.js
scripts/
docs/
licenses/
templates.json
portfolio-redirects.json
```

## Ekspor folder template mandiri

```sh
npm run export -- case-product
npm run export -- all
```

Exporter membuat folder portabel dengan file terpisah:

```text
exports/case-product/
  index.html
  styles.css
  script.js
  assets/art/
```

Buka `index.html` dalam folder tersebut, atau bagikan seluruh foldernya. HTML
hasil ekspor hanya memuat struktur, CSS menyimpan desain, dan JavaScript
menyimpan logika. Aset lokal serta pemberitahuan lisensi tetap disertakan.

## Format kode

Seluruh HTML, CSS, JavaScript, JSON, SVG, dan Markdown dirapikan. Target panjang
baris 80 karakter. Atribut HTML panjang ditulis per baris. Python memakai
indentasi empat spasi. `.editorconfig` mendokumentasikan pengaturan untuk
editor.

Untuk memasang formatter pengembangan yang versinya dipatok:

```sh
npm ci --ignore-scripts
npm run format
npm run format:check
```

Prettier hanya dependency pengembangan. Template HTML tidak memuatnya. URL,
nilai data, dan path SVG tertentu dapat melampaui target baris.

## Pemeriksaan

```sh
npm run check
```

Node.js 20+ dan Python 3. Tidak perlu dependency runtime. Pemeriksaan mencakup
metadata, 108 template kanonis, 117 halaman HTML, redirect lama, sintaks JS,
referensi lokal, gabungan filter galeri, aturan data demo, dan ekspor seluruh
halaman.

[Cakupan dan hasil verifikasi](docs/VERIFICATION.md)

## Contoh React dan Vue

Contoh React memakai komponen dashboard native dengan state, periode, dan CSV.
Contoh Vue memakai Composition API untuk pencarian serta keranjang. Versi CDN
mengikuti contoh yang sudah ada, React 19.3.0 dan Vue 3.5.44. Tidak mengganti
stack keduanya. `styles.css` menangani tampilan, `loader.js` menangani pemuatan
dan kegagalannya, sedangkan `app.js` menyimpan komponen aplikasi.

## Isi demonstrasi

Identitas, karya, riwayat, dan angka adalah contoh. Ilustrasi SVG lokal bukan
foto klien atau bukti hasil pekerjaan. Form demo tidak mengirim data, login
tidak mengautentikasi, dan checkout tidak memproses pembayaran.

Ganti konten serta kontak dengan informasi yang benar sebelum publikasi.

## Sumber dan lisensi

Kode orisinal dan SVG memakai [MIT](LICENSE). Adaptasi mempertahankan hak cipta
upstream. [Pemberitahuan pihak ketiga](THIRD_PARTY_NOTICES.md) dan
[asal per portofolio](docs/PORTFOLIO-SOURCES.md) mencatat commit, path sumber,
lingkup adaptasi, dan lisensinya.

Framer dan Webflow menjadi acuan kebutuhan serta komposisi. Kode, foto, font,
dan identitas template marketplace tidak didistribusikan ulang.

[Brief desain](docs/DESIGN.md) dan [referensi awal](docs/REFERENCES.md)
