# Fotografi dan dokumenter

Setiap file HTML dapat dibuka langsung atau melalui `npm start`.

## Pilihan model

### [Frame / Photography](frame-photography.html)

- Model: `masonry`.
- Kegunaan: Galeri masonry dengan caption tipis dan navigasi dua tujuan.
- Sumber: implementasi orisinal.

### [Contact / Sheet](contact-sheet.html)

- Model: `contact-sheet`.
- Kegunaan: Fotografer dokumenter. Model contact-sheet, karya dan proses.
- Sumber: implementasi orisinal.

### [Fieldnotes / Documentary](story-documentary.html)

- Model: `documentary`.
- Kegunaan: Visual storyteller. Model documentary, karya dan proses.
- Sumber: implementasi orisinal.

### [Noir / Editorial](dark-editorial.html)

- Model: `editorial`.
- Kegunaan: Editorial photographer. Model editorial, karya dan proses.
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
