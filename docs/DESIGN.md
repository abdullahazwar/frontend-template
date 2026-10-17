# Brief desain

## Tujuan

Menyediakan banyak titik awal frontend tanpa menjadikan setiap halaman variasi warna dari landing page yang sama. Sasaran: programmer yang membutuhkan HTML mudah diubah dan contoh framework yang memperlihatkan pengelolaan state secara native.

Hasil: 60 komposisi HTML, enam pada masing-masing 10 kategori. Dua contoh framework tambahan tidak dihitung sebagai desain baru.

## Arah komposisi

| Kategori | Keputusan | Alasan |
| --- | --- | --- |
| Dashboard | Metrik strip, buku kas, distribusi kanal, rute, kanban, kalender | Tugas analisis berbeda dari tugas operasional |
| Admin | Tabel, daftar naskah, inbox, roster, matriks izin | Dahulukan pekerjaan yang harus ditangani |
| User | Identitas, timeline, riwayat uang, materi, form, kartu anggota | Informasi mengikuti konteks pemilik akun |
| Toko | Grid, grosir, editorial furnitur, baris belanja, produk tunggal, fashion asimetris | Cara memilih produk bergantung pada model jual |
| Login | Split editorial, terminal, center minimal, panel hangat, workspace, email link | Tetap satu tujuan, dengan karakter merek berbeda |
| Portofolio | Indeks grafis, masonry, studi kasus engineering, arsitektur, daftar film, galeri ilustrasi | Bukti kerja menentukan penyajian |
| Perusahaan | Konsultasi, manufaktur, restoran, studio, SaaS, servis lokal | Pertanyaan calon pelanggan berbeda untuk tiap bisnis |
| Blog | Koran, jurnal alam, artikel teknis, esai, majalah, newsletter | Panjang baca dan tipe arsip memerlukan ritme berbeda |
| Forum | Daftar topik, voting, Q&A, kanal gaming, karya visual, papan warga | Percakapan, dukungan, dan pengumuman punya struktur berbeda |
| Pendaftaran | Tiket, wizard, karier, pendidikan, slot waktu, komunitas | Form meminta informasi sesuai keputusan yang dibuat |

## Sistem visual

- Token semantik untuk latar, permukaan, teks, teks sekunder, garis, aksen, dan fokus.
- Font sistem untuk aplikasi. Serif untuk konteks editorial. Monospace untuk konteks teknis.
- Tidak menggunakan font eksternal. Gambar tidak mengandalkan penyedia stok atau hotlink.
- Panel hanya untuk pengelompokan yang punya fungsi: ringkasan, konteks samping, keranjang, tiket, atau percakapan.
- Pemisahan bagian lain memakai grid, jarak, tipografi, dan garis seperlunya.
- Warna gelap memiliki token permukaan dan teks sendiri.
- Gerak dibatasi. Preferensi reduced motion dihormati.

## Responsif dan aksesibilitas yang diterapkan

- Layout berkolom berpindah menjadi satu kolom pada lebar yang relevan.
- Navigasi aplikasi menjadi baris yang dapat membungkus, bukan drawer yang menyembunyikan tujuan.
- Tabel dua dimensi memakai region gulir yang diberi nama dan dapat difokuskan.
- Form memakai label, tipe input, batas jumlah, dan validasi native.
- Dialog memakai elemen native, nama aksesibel, Escape, dan pengembalian fokus ke pemicu.
- Skip link dan focus-visible tersedia. Status memakai teks, bukan warna saja.
- Ilustrasi memiliki alt sesuai konteks atau alt kosong jika dekoratif.

Implementasi CSS mencakup breakpoint 1000, 760, dan 480 px, serta penyesuaian galeri. Pengujian visual pada 320, 360, 768, dan 1440 px tetap perlu dilakukan. Implementasi aturan CSS tidak sama dengan bukti hasil render.

## Kontrak data

Angka dan identitas merupakan fixture fiktif. Dashboard Pulse menghitung penjualan hanya dari status Dibayar dalam periode aktif. Tabel dan CSV menyertakan seluruh status pada periode tersebut. Grafik hanya menyertakan nilai Dibayar dan dijelaskan di dekat grafik. Mata uang IDR. Tanggal fixture berupa tanggal kalender WIB, tanpa konversi timezone tersembunyi.

Keranjang menggunakan integer rupiah, menghitung ulang total, dan membatasi jumlah gabungan semua varian pada stok produk. State keranjang hanya ada dalam memori. Favorit galeri menyimpan ID template saja melalui localStorage dan memiliki fallback ketika penyimpanan ditolak.

Form tidak mengirim data dan tidak membuat hasil sukses eksternal. Balasan tiket, status anggota, publikasi, dukungan forum, dan progres belajar hanya mengubah tab yang terbuka.
