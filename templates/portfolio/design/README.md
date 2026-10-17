# UI, UX, brand, dan desain grafis

Setiap file HTML dapat dibuka langsung atau melalui `npm start`.

## Pilihan model

### [Folio / Graphic](folio-graphic.html)

- Model: `graphic-index`.
- Kegunaan: Portofolio grafis dengan tipografi besar, indeks karya, dan proses
  yang bisa dibuka.
- Sumber: implementasi orisinal.

### [Casebook / Product](case-product.html)

- Model: `casebook`.
- Kegunaan: Product designer. Model casebook, karya dan proses.
- Sumber: implementasi orisinal.

### [Mono / Interface](mono-ui.html)

- Model: `sidebar`.
- Kegunaan: UI designer. Model sidebar, karya dan proses.
- Sumber: implementasi orisinal.

### [Index / Brand](index-brand.html)

- Model: `index`.
- Kegunaan: Brand designer. Model index, karya dan proses.
- Sumber: implementasi orisinal.

### [Tokens / Systems](systems-designer.html)

- Model: `systems`.
- Kegunaan: Design systems designer. Model systems, karya dan proses.
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
