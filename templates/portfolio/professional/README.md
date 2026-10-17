# Profesional, pengajar, dan kuliner

Setiap file HTML dapat dibuka langsung atau melalui `npm start`.

## Pilihan model

### [Ledger / Consultant](ledger-consultant.html)

- Model: `ledger`.
- Kegunaan: Operations consultant. Model ledger, karya dan proses.
- Sumber: implementasi orisinal.

### [Field / Engineer](field-engineer.html)

- Model: `object`.
- Kegunaan: Field and network engineer. Model object, karya dan proses.
- Sumber: implementasi orisinal.

### [Focus / Freelance](focus-freelance.html)

- Model: `minimal`.
- Kegunaan: Independent web designer. Model minimal, karya dan proses.
- Sumber: adaptasi kode MIT.

### [Lesson / Educator](lesson-educator.html)

- Model: `lesson`.
- Kegunaan: Pengajar dan perancang pembelajaran.
- File desain: [lesson-educator.css](lesson-educator.css).
- Sumber: implementasi orisinal.

### [Table / Culinary](table-culinary.html)

- Model: `menu-notes`.
- Kegunaan: Perancang menu dan kreator kuliner.
- File desain: [table-culinary.css](table-culinary.css).
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
