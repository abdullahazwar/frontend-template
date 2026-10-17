# Film, musik, ilustrasi, dan seni

Setiap file HTML dapat dibuka langsung atau melalui `npm start`.

## Pilihan model

### [Motion / Director](motion-director.html)

- Model: `motion-index`.
- Kegunaan: Portofolio motion gelap dengan indeks film, durasi, dan detail
  konsep tanpa pemutar palsu.
- Sumber: implementasi orisinal.

### [Craft / Illustrator](craft-illustrator.html)

- Model: `illustration-grid`.
- Kegunaan: Portofolio ilustrator dengan grid karya besar dan caption yang
  menjadi navigasi baca.
- Sumber: implementasi orisinal.

### [Reel / Filmmaker](reel-filmmaker.html)

- Model: `cinema`.
- Kegunaan: Director and editor. Model cinema, karya dan proses.
- Sumber: implementasi orisinal.

### [Score / Composer](score-composer.html)

- Model: `score`.
- Kegunaan: Composer and sound designer. Model score, karya dan proses.
- Sumber: implementasi orisinal.

### [Quest / Game Art](play-gameartist.html)

- Model: `contact-sheet`.
- Kegunaan: Game environment artist. Model contact-sheet, karya dan proses.
- Sumber: implementasi orisinal.

### [Type / Art Direction](type-artdirector.html)

- Model: `art-type`.
- Kegunaan: Art director. Model art-type, karya dan proses.
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
