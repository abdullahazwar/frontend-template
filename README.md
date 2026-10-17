# Frontend Template

60 desain frontend dalam 10 kategori. Setiap kategori berisi enam komposisi dengan hierarki dan alur yang sesuai fungsinya. Ditambah contoh native React dan Vue.

Template memakai HTML, CSS, dan JavaScript biasa. Tidak memerlukan instalasi dependency, API key, akun Cloudflare, atau proses build. Semua ilustrasi merupakan SVG asli yang tersimpan di repo.

## Cara pakai

1. Unduh repo, lalu buka `index.html` di browser untuk menjelajahi koleksi.
2. Cari kategori atau nama. Buka halaman langsung atau gunakan pratinjau ukuran desktop dan HP.
3. Edit file di `templates/<kategori>/<nama>.html`. Token warna dan gaya khusus halaman ada di elemen `<style>` pada file tersebut.
4. Pertahankan `assets/` jika menyalin halaman dengan struktur aslinya. Untuk satu file yang mandiri, gunakan exporter.

Server lokal opsional, Node.js 20 atau lebih baru:

```sh
npm start
```

Buka `http://127.0.0.1:4173`. Contoh React dan Vue perlu server HTTP serta koneksi CDN. Galeri dan 60 template HTML memakai script klasik sehingga dapat dibuka langsung melalui `file://`. Penyimpanan favorit pada `file://` bergantung pada browser.

## Ekspor satu file HTML

```sh
npm run export -- pulse-sales
npm run export -- all
```

Hasil berada di `exports/`. CSS, JavaScript, dan ilustrasi digabung ke dalam setiap file HTML. Link halaman terkait diganti dengan keterangan lokal. Hasil ekspor dapat dibuka offline dan tidak bergantung pada galeri atau CDN.

ID template tercantum pada nama file dan `templates.json`. Folder `exports/` diabaikan oleh Git karena dapat dihasilkan kembali.

## Isi koleksi

| Kategori | Enam desain |
| --- | --- |
| Dashboard | Pulse Sales, Runway Finance, Orchard Analytics, Dispatch Logistics, Sprint Projects, Kelas Education |
| Admin | Atlas Users, Rak Inventory, Pressroom CMS, Relay Support, Roster Team, Access Permissions |
| User | Nook Profile, Parcel Orders, Pocket Wallet, Belajar Course, Desk Settings, Ruang Membership |
| Toko daring | Rakit Marketplace, Sumber Wholesale, Sela Furniture, Pagi Grocery, Mono Product, Edisi Fashion |
| Login | Paper Split, Terminal Dev, Studio Minimal, Member Warm, Workspace Account, Link Passwordless |
| Portofolio | Folio Graphic, Frame Photography, Build Developer, Space Architect, Motion Director, Craft Illustrator |
| Perusahaan | Civic Consulting, Forge Industrial, Meja Restaurant, Habitat Studio, Orbit SaaS, Tepat Local Service |
| Blog | Jeda Newspaper, Lapang Journal, Byte Engineering, Margin Essay, Signal Magazine, Indeks Newsletter |
| Forum | Commons Topics, Thread Community, Jawab Q&A, Lobby Gaming, Circle Makers, Sekitar Neighborhood |
| Pendaftaran | Summit Event, Launch Onboarding, Apply Career, Kampus Admissions, Sesi Booking, Teman Community |

[Katalog dengan tautan setiap halaman](docs/CATALOG.md)

## Perilaku yang bisa dicoba

- Galeri: pencarian, kategori, urutan, favorit, URL filter, pratinjau satu halaman, dan ukuran HP.
- Dashboard penjualan: filter periode yang memperbarui metrik, grafik, tabel, dan ekspor CSV dari fixture yang sama.
- Admin: filter anggota, status akses/publikasi, penerimaan stok, perpindahan tugas, inbox, balasan lokal, dan matriks checkbox.
- Toko: pencarian produk, tambah/kurangi keranjang, total, batas stok, varian produk, dan ringkasan demo.
- Akun: validasi native, tampilkan password demo, checklist progres, dan penanda simpan.
- Forum: buka diskusi, dukungan yang dapat dibatalkan, dan simpan karya selama tab terbuka.
- Pendaftaran: validasi input, tiket dengan total dinamis, wizard tiga langkah, dan tinjauan jawaban.

Setiap kontrol mengikuti lingkup demo yang tertulis. Formulir tidak mengirim data. Login tidak mengautentikasi. Checkout tidak membuat pesanan atau pembayaran. Tidak ada integrasi backend atau pengumpulan kredensial.

## Struktur

```text
index.html                Galeri 60 template
templates/                Halaman yang langsung bisa diedit
assets/base.css           Token, primitive, layout, responsive
assets/core.js            Aturan data demo dan fungsi murni
assets/runtime.js         Interaksi HTML
assets/catalog.*          Galeri dan pratinjau
assets/art/               12 ilustrasi SVG asli
frameworks/react/         Dashboard dengan komponen React native
frameworks/vue/           Toko dengan state Vue native
scripts/                  Server, exporter, dan pemeriksaan
docs/                     Katalog, brief, sumber, dan hasil verifikasi
templates.json            Metadata untuk tooling/export
```

## Contoh framework

React menggunakan komponen `Metric`, `SalesChart`, `OrdersTable`, dan `Dashboard`, dengan state serta metrik turunan. Vue menggunakan Composition API dengan `ref` dan `computed`. Keduanya mengelola DOM melalui framework masing-masing. Tidak membungkus template HTML dalam iframe atau memanggil runtime DOM milik template biasa.

Versi dipatok pada React 19.3.0 dan Vue 3.5.44. Contoh memakai ES modules melalui import map dan CDN. Untuk aplikasi produksi, pindahkan komponen ke tooling proyek yang dipilih, kunci dependency, dan sambungkan kontrak backend yang sesuai. Versi ini merupakan snapshot saat koleksi dibuat, bukan rentang `latest`.

## Pemeriksaan

```sh
npm run check
```

Pemeriksaan membutuhkan Node.js 20+ dan Python 3. Tidak memasang dependency. Memeriksa sintaks JavaScript, jumlah desain per kategori, struktur HTML, referensi lokal, anchor, label, metrik, filter, batas stok lintas varian, CSV, dan ekspor seluruh 60 halaman.

Lihat [cakupan verifikasi](docs/VERIFICATION.md). Pemeriksaan otomatis tidak menggantikan pengujian visual, keyboard, perangkat nyata, atau integrasi backend.

## Prinsip desain

Konten menentukan susunan. Tabel operasional memakai kepadatan yang terkontrol. Halaman baca menjaga panjang baris. Toko mendekatkan harga, stok, dan aksi. Portofolio menjelaskan konteks karya. Navigasi hanya memuat tujuan yang ada pada halaman. Tidak semua bagian dimasukkan ke dalam kartu.

Lihat [brief desain](docs/DESIGN.md) dan [sumber referensi](docs/REFERENCES.md). Amazon, Alibaba, Stripe, dan Linear dipelajari sebagai pola fungsi. Logo, kode, gambar, dan identitas mereka tidak disalin.

## Lisensi

Kode, gaya, konten contoh, dan SVG asli dalam repo ini menggunakan [MIT](LICENSE). Library React dan Vue memiliki lisensi upstream masing-masing. Nama merek dan profil pada demo merupakan ilustrasi, tanpa afiliasi dengan perusahaan yang dirujuk.
