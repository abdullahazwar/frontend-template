# Penulis, editor, dan penerjemah

Setiap file HTML dapat dibuka langsung atau melalui `npm start`.

## Pilihan model

### [Paper / Writer](paper-writer.html)

- Model: `writer`.
- Kegunaan: Writer and essayist. Model writer, karya dan proses.
- Sumber: adaptasi kode MIT.

### [Dispatch / Journalist](dispatch-journalist.html)

- Model: `newspaper`.
- Kegunaan: Independent journalist. Model newspaper, karya dan proses.
- Sumber: implementasi orisinal.

### [Script / Copywriter](script-copywriter.html)

- Model: `copy`.
- Kegunaan: Copywriter and content designer. Model copy, karya dan proses.
- Sumber: implementasi orisinal.

### [Proof / Editor](proof-editor.html)

- Model: `proof`.
- Kegunaan: Editor naskah.
- File desain: [proof-editor.css](proof-editor.css).
- Sumber: implementasi orisinal.

### [Bridge / Translator](bridge-translator.html)

- Model: `parallel`.
- Kegunaan: Penerjemah dan pelokalan.
- File desain: [bridge-translator.css](bridge-translator.css).
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
