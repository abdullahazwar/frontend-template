# Mahasiswa, lulusan, dan pelajar

Setiap file HTML dapat dibuka langsung atau melalui `npm start`.

## Pilihan model

### [Campus / Graduate](campus-graduate.html)

- Model: `resume`.
- Kegunaan: Fresh graduate. Model resume, karya dan proses.
- Sumber: adaptasi kode MIT.

### [Labbook / TKJ](apprentice-tkj.html)

- Model: `terminal`.
- Kegunaan: Pelajar TKJ dan teknisi pemula. Model terminal, karya dan proses.
- Sumber: implementasi orisinal.

## Mengubah isi

Edit nama, peran, pengantar, dan bagian `data-work` pada file HTML. Warna dan
layout khusus berada pada file `.css` dengan nama yang sama. Token warna berada
pada `:root`. Model komposisi ditandai oleh `data-model`. Foto dan karya dapat
menggantikan SVG pada `../../../assets/art/`. Pertahankan alt, caption, dan hak
penggunaan aset. Kontak memakai alamat contoh.

Pencarian, filter, dialog ilustrasi, dan unduh profil memakai
`../../../assets/portfolio.js`. Enam model lama memakai runtime asalnya.

Ekspor folder mandiri: `npm run export -- <id-template>`. Untuk adaptasi MIT,
pertahankan pemberitahuan lisensi pada HTML dan hasil ekspor.

Lihat [asal dan lisensi](../../../docs/PORTFOLIO-SOURCES.md).
