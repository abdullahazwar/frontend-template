# Brief desain

## Tujuan

Menyediakan banyak titik awal frontend tanpa menjadikan setiap halaman variasi
warna dari landing page yang sama. Sasaran: programmer yang membutuhkan HTML
mudah diubah dan contoh framework yang memperlihatkan pengelolaan state secara
native.

Hasil: 90 komposisi HTML dalam 10 kategori, termasuk 36 portofolio. Dua contoh
framework tambahan tidak dihitung sebagai desain baru.

## Arah komposisi

| Kategori    | Keputusan                                                                                  | Alasan                                                      |
| ----------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| Dashboard   | Metrik strip, buku kas, distribusi kanal, rute, kanban, kalender                           | Tugas analisis berbeda dari tugas operasional               |
| Admin       | Tabel, daftar naskah, inbox, roster, matriks izin                                          | Dahulukan pekerjaan yang harus ditangani                    |
| User        | Identitas, timeline, riwayat uang, materi, form, kartu anggota                             | Informasi mengikuti konteks pemilik akun                    |
| Toko        | Grid, grosir, editorial furnitur, baris belanja, produk tunggal, fashion asimetris         | Cara memilih produk bergantung pada model jual              |
| Login       | Split editorial, terminal, center minimal, panel hangat, workspace, email link             | Tetap satu tujuan, dengan karakter merek berbeda            |
| Portofolio  | Indeks grafis, masonry, studi kasus engineering, arsitektur, daftar film, galeri ilustrasi | Bukti kerja menentukan penyajian                            |
| Perusahaan  | Konsultasi, manufaktur, restoran, studio, SaaS, servis lokal                               | Pertanyaan calon pelanggan berbeda untuk tiap bisnis        |
| Blog        | Koran, jurnal alam, artikel teknis, esai, majalah, newsletter                              | Panjang baca dan tipe arsip memerlukan ritme berbeda        |
| Forum       | Daftar topik, voting, Q&A, kanal gaming, karya visual, papan warga                         | Percakapan, dukungan, dan pengumuman punya struktur berbeda |
| Pendaftaran | Tiket, wizard, karier, pendidikan, slot waktu, komunitas                                   | Form meminta informasi sesuai keputusan yang dibuat         |

## Sistem visual

- Token semantik untuk latar, permukaan, teks, teks sekunder, garis, aksen, dan
  fokus.
- Font sistem untuk aplikasi. Serif untuk konteks editorial. Monospace untuk
  konteks teknis.
- Tidak menggunakan font eksternal. Gambar tidak mengandalkan penyedia stok atau
  hotlink.
- Panel hanya untuk pengelompokan yang punya fungsi: ringkasan, konteks samping,
  keranjang, tiket, atau percakapan.
- Pemisahan bagian lain memakai grid, jarak, tipografi, dan garis seperlunya.
- Warna gelap memiliki token permukaan dan teks sendiri.
- Gerak dibatasi. Preferensi reduced motion dihormati.

## Responsif dan aksesibilitas yang diterapkan

- Layout berkolom berpindah menjadi satu kolom pada lebar yang relevan.
- Navigasi aplikasi menjadi baris yang dapat membungkus, bukan drawer yang
  menyembunyikan tujuan.
- Tabel dua dimensi memakai region gulir yang diberi nama dan dapat difokuskan.
- Form memakai label, tipe input, batas jumlah, dan validasi native.
- Dialog memakai elemen native, nama aksesibel, Escape, dan pengembalian fokus
  ke pemicu.
- Skip link dan focus-visible tersedia. Status memakai teks, bukan warna saja.
- Ilustrasi memiliki alt sesuai konteks atau alt kosong jika dekoratif.

Implementasi CSS mencakup breakpoint 1000, 760, dan 480 px, serta penyesuaian
galeri. Portofolio diperiksa pada viewport 320, 360, 768, dan 1440 px. Cakupan
hasil terkini dicatat pada VERIFICATION.md. Implementasi aturan CSS tidak sama
dengan bukti hasil render.

## Kontrak data

Angka dan identitas merupakan fixture fiktif. Dashboard Pulse menghitung
penjualan hanya dari status Dibayar dalam periode aktif. Tabel dan CSV
menyertakan seluruh status pada periode tersebut. Grafik hanya menyertakan nilai
Dibayar dan dijelaskan di dekat grafik. Mata uang IDR. Tanggal fixture berupa
tanggal kalender WIB, tanpa konversi timezone tersembunyi.

Keranjang menggunakan integer rupiah, menghitung ulang total, dan membatasi
jumlah gabungan semua varian pada stok produk. State keranjang hanya ada dalam
memori. Favorit galeri menyimpan ID template saja melalui localStorage dan
memiliki fallback ketika penyimpanan ditolak.

Form tidak mengirim data dan tidak membuat hasil sukses eksternal. Balasan
tiket, status anggota, publikasi, dukungan forum, dan progres belajar hanya
mengubah tab yang terbuka.

## Ekspansi portofolio

Sembilan kategori mengikuti jenis bukti yang dicari pengunjung: proyek software,
keputusan desain, seri foto, ruang, karya kreatif, naskah, metode riset, artefak
profesional, dan proses belajar. Metadata `portfolioType`, `model`, dan `source`
memisahkan profesi, komposisi, dan asal kode.

Model teks seperti terminal, daftar publikasi, CV, dan ledger mengutamakan
urutan informasi. Model visual seperti contact sheet, editorial, cinema,
casebook, dan interior mengutamakan media beserta caption. Beberapa model
menggunakan primitive bersama, dengan susunan konten berbeda.

Tidak menggunakan persentase skill, testimoni, klien, hasil bisnis, atau
publikasi nyata yang dibuat-buat. Setiap karya ditandai konsep dan profil
ditandai demonstrasi. SVG baru merupakan ilustrasi, bukan foto contoh milik
pihak lain. Kontrol media hanya memperbesar ilustrasi yang tersedia.

## Pemisahan aset versi 1.2.0

Tema dan aturan khusus tiap template dipindahkan ke file CSS dengan nama sama.
Semua stylesheet bersama dimuat lebih dahulu, diikuti CSS halaman. 92 blok
stylesheet dan 11 style statis dipisahkan dari HTML. Dua loader framework
sekarang berada di `loader.js`. Aturan visual tetap mengikuti desain yang sudah
ada. Tidak menambahkan dependency runtime baru.

Pada versi ini, tinggi grafik dan warna thumbnail masih memakai custom property
CSS yang diisi oleh JavaScript eksternal. Aturan tersebut digantikan oleh
pemisahan visual pada versi 1.3.0. Konfigurasi import map React/Vue tetap berupa
JSON, terpisah dari kode aplikasi.

## Aturan visual versi 1.3.0

Aturan visual pratinjau berpindah dari renderer SVG JavaScript ke CSS. Struktur
sketsa berada pada template HTML. Metadata menyimpan identitas dan fungsi
halaman. Tema pratinjau diturunkan dari CSS halaman, bukan nilai warna pada
JSON. Grafik memakai data-level dan layout kolom otomatis dalam CSS.

Atribut ukuran gambar dipindahkan ke class reset `.artwork`. Tampilan komponen
khusus mengikuti CSS yang sudah ada. Ekspor menghasilkan folder HTML, CSS,
JavaScript, serta aset, dengan tanggung jawab yang tetap terpisah.
