# Arsitektur, interior, dan produk

Setiap file HTML dapat dibuka langsung atau melalui `npm start`.

## Pilihan model

### [Space / Architect](space-architect.html)

- Model: `architecture-split`.
- Kegunaan: Portofolio arsitek dengan pembuka gambar di kiri dan uraian proyek
  yang lapang.
- Sumber: implementasi orisinal.

### [Atelier / Architecture](atelier-architect.html)

- Model: `index`.
- Kegunaan: Architecture portfolio. Model index, karya dan proses.
- Sumber: implementasi orisinal.

### [Material / Interior](material-interior.html)

- Model: `interior`.
- Kegunaan: Interior designer. Model interior, karya dan proses.
- Sumber: implementasi orisinal.

### [Object / Industrial](object-industrial.html)

- Model: `object`.
- Kegunaan: Industrial designer. Model object, karya dan proses.
- Sumber: implementasi orisinal.

## Mengubah isi

Edit nama, peran, pengantar, dan bagian `data-work` pada file HTML. Warna ada
pada token `:root`. Model komposisi ditandai oleh `data-model`. Foto dan karya
dapat menggantikan SVG pada `../../../assets/art/`. Pertahankan alt, caption,
dan hak penggunaan aset. Kontak memakai alamat contoh.

Pencarian, filter, dialog ilustrasi, dan unduh profil memakai
`../../../assets/portfolio.js`. Enam model lama memakai runtime asalnya.

Ekspor mandiri: `npm run export -- <id-template>`. Untuk adaptasi MIT,
pertahankan pemberitahuan lisensi pada HTML dan hasil ekspor.

Lihat [asal dan lisensi](../../../docs/PORTFOLIO-SOURCES.md).
