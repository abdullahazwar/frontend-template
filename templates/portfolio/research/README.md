# Akademik, riset, dan data

Setiap file HTML dapat dibuka langsung atau melalui `npm start`.

## Pilihan model

### [Citation / Academic](citation-academic.html)

- Model: `academic`.
- Kegunaan: Academic profile. Model academic, karya dan proses.
- Sumber: adaptasi kode MIT.

### [Lab / Researcher](lab-researcher.html)

- Model: `casebook`.
- Kegunaan: Research scientist. Model casebook, karya dan proses.
- Sumber: implementasi orisinal.

### [Notebook / Data](notebook-data.html)

- Model: `notebook`.
- Kegunaan: Data analyst. Model notebook, karya dan proses.
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
