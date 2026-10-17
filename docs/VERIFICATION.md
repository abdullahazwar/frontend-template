# Verifikasi

Perintah utama: `npm run check`. Node.js dan Python standar, tanpa dependency tambahan.

## Cakupan otomatis

| Area | Pemeriksaan |
| --- | --- |
| Manifest | 60 ID unik, 10 kategori, enam desain per kategori, metadata galeri sama dengan metadata ekspor |
| JavaScript | Sintaks semua file JS/MJS |
| HTML | 63 halaman: galeri, 60 template, dua contoh framework |
| Struktur | Nesting elemen, satu main/h1/title, ID unik, bahasa Indonesia |
| Referensi | File lokal, anchor, target dialog, input jumlah, varian, dan label |
| Media | Keberadaan alt pada seluruh gambar |
| Dashboard | Total mingguan, harian, status dibayar, batas tanggal, kondisi tanpa pesanan dibayar, konsistensi grafik |
| Filter | Huruf besar/kecil, whitespace, hasil nol, gabungan query dan status |
| Keranjang | Penggabungan item, state sebelumnya tetap, total integer, jumlah invalid, stok gabungan lintas varian |
| CSV | Koma, tanda kutip, newline, mitigasi formula spreadsheet |
| Exporter | Seluruh 60 halaman menggabungkan kode/aset dan tidak memiliki tujuan anchor yang hilang |

## Batas verifikasi

Lingkungan kerja ini tidak menyediakan jalur kontrol browser yang didukung untuk tugas ini. Tidak menjalankan screenshot desktop/mobile, pengujian keyboard di browser, screen reader, pengukuran contrast pada hasil render, atau pengukuran Core Web Vitals. Tidak mengklaim WCAG compliant atau production ready.

Pemuatan CDN pada dua contoh framework belum diuji end-to-end. Kode ESM diperiksa sintaksnya. Aplikasi menampilkan pesan kegagalan saat import CDN gagal. 60 template HTML tidak memerlukan library CDN.

Pemeriksaan fungsi murni memverifikasi aturan demo, bukan interaksi DOM secara end-to-end. Sebelum memakai template untuk produksi, uji pratinjau, form, dialog, navigasi keyboard, reflow 320 px, dan alur pada perangkat sasaran.

## Skenario tinjauan manual

1. Galeri: pilih kategori, cari hasil nol, reset, simpan favorit, buka/tutup pratinjau dengan Escape, lalu buka ukuran HP.
2. Pulse: ganti minggu ke hari. Cocokkan Rp450.000, satu pesanan dibayar, dua baris total, dan isi CSV.
3. Atlas: cari anggota, nonaktifkan, gunakan filter Nonaktif, lalu aktifkan kembali.
4. Rak: tambah 10 unit. Cocokkan unit baris dan jumlah SKU stok rendah.
5. Sprint: pindahkan tugas dan cocokkan jumlah pada dua kolom yang berubah.
6. Relay: ganti tiket, kirim balasan demo, pindah tiket, lalu kembali untuk memeriksa balasan lokal.
7. Mono: tambah empat Graphite dan dua Silver. Tambahan ketujuh ditolak oleh stok gabungan.
8. Login: submit input kosong, email invalid, lalu data fiktif valid. Periksa tombol tampilkan password.
9. Launch: validasi tahap pertama dan kedua, baca review, kembali, edit, lalu selesaikan demo.
10. Forum: dukung topik, batalkan dukungan, dan pastikan angka kembali ke semula.
