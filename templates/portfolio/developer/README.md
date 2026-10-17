# Developer dan software engineer

Setiap file HTML dapat dibuka langsung atau melalui `npm start`.

## Pilihan model

### [Build / Developer](build-developer.html)

- Model: `technical-case`.
- Kegunaan: Portofolio engineer berbasis masalah, keputusan implementasi, dan
  bukti kerja.
- Sumber: implementasi orisinal.

### [Simple / Developer](simple-developer.html)

- Model: `minimal`.
- Kegunaan: Frontend developer. Model minimal, karya dan proses.
- Sumber: adaptasi kode MIT.

### [Timeline / Engineer](timeline-engineer.html)

- Model: `resume`.
- Kegunaan: Software engineer. Model resume, karya dan proses.
- Sumber: adaptasi kode MIT.

### [Shell / Backend](terminal-backend.html)

- Model: `terminal`.
- Kegunaan: Backend engineer. Model terminal, karya dan proses.
- Sumber: implementasi orisinal.

### [Split / Fullstack](split-fullstack.html)

- Model: `sidebar`.
- Kegunaan: Fullstack developer. Model sidebar, karya dan proses.
- Sumber: implementasi orisinal.

### [Release / Maintainer](cli-maintainer.html)

- Model: `changelog`.
- Kegunaan: Open source maintainer. Model changelog, karya dan proses.
- Sumber: implementasi orisinal.

## Mengubah isi

Edit nama, peran, pengantar, dan bagian `data-work` pada file HTML. Warna dan
layout khusus berada pada file `.css` dengan nama yang sama. Token warna berada
pada `:root`. Model komposisi ditandai oleh `data-model`. Foto dan karya dapat
menggantikan SVG pada `../../../assets/art/`. Pertahankan alt, caption, dan hak
penggunaan aset. Kontak memakai alamat contoh.

Pencarian, filter, dialog ilustrasi, dan unduh profil memakai
`../../../assets/portfolio.js`. Enam model lama memakai runtime asalnya.

Ekspor mandiri: `npm run export -- <id-template>`. Untuk adaptasi MIT,
pertahankan pemberitahuan lisensi pada HTML dan hasil ekspor.

Lihat [asal dan lisensi](../../../docs/PORTFOLIO-SOURCES.md).
