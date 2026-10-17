# Asal template portofolio

Diperiksa pada 17 Oktober 2026. Referensi upstream dipatok ke commit.

## Adaptasi kode open source

Enam halaman mengadaptasi bagian yang disebut di bawah. Ini port HTML dengan
konten fiktif dan CSS lokal, bukan salinan lengkap atau instalasi framework
upstream. Tidak menjalankan installer maupun script upstream.

### cobiwave/simplefolio

- Commit: `af03c0cb90d03844de2b5a4cf2045aa0f72c2442`.
- Lisensi:
  [MIT](https://github.com/cobiwave/simplefolio/blob/af03c0cb90d03844de2b5a4cf2045aa0f72c2442/LICENSE.md).
- Adaptasi: Struktur hero, pengenalan, dan proyek. Primitive CTA diubah ke CSS
  native.
- Halaman: `simple-developer`, `focus-freelance`.
- Sumber yang dibaca:
  - [src/index.html](https://github.com/cobiwave/simplefolio/blob/af03c0cb90d03844de2b5a4cf2045aa0f72c2442/src/index.html)
  - [src/sass/components/\_buttons.scss](https://github.com/cobiwave/simplefolio/blob/af03c0cb90d03844de2b5a4cf2045aa0f72c2442/src/sass/components/_buttons.scss)

Perubahan: nama dan konten baru, markup semantik Indonesia, tanpa dependency
upstream, filter lokal, state kosong, dan akses keyboard. Pemberitahuan lengkap
tersimpan pada [licenses/simplefolio.txt](../licenses/simplefolio.txt) dan
komentar HTML pada halaman terkait, termasuk hasil ekspornya.

### RyanFitzgerald/devportfolio

- Commit: `852d650fb0a8cf0c98f874af5a56a0a9b7d7d4b7`.
- Lisensi:
  [MIT](https://github.com/RyanFitzgerald/devportfolio/blob/852d650fb0a8cf0c98f874af5a56a0a9b7d7d4b7/LICENSE.md).
- Adaptasi: Urutan pengalaman, periode, peran, dan garis penghubung dari
  komponen Experience.
- Halaman: `timeline-engineer`, `campus-graduate`.
- Sumber yang dibaca:
  - [src/components/Experience.astro](https://github.com/RyanFitzgerald/devportfolio/blob/852d650fb0a8cf0c98f874af5a56a0a9b7d7d4b7/src/components/Experience.astro)

Perubahan: nama dan konten baru, markup semantik Indonesia, tanpa dependency
upstream, filter lokal, state kosong, dan akses keyboard. Pemberitahuan lengkap
tersimpan pada [licenses/devportfolio.txt](../licenses/devportfolio.txt) dan
komentar HTML pada halaman terkait, termasuk hasil ekspornya.

### satnaing/astro-paper

- Commit: `35cfa7fbe0b897306d27670d3819e55d5205f3dd`.
- Lisensi:
  [MIT](https://github.com/satnaing/astro-paper/blob/35cfa7fbe0b897306d27670d3819e55d5205f3dd/LICENSE).
- Adaptasi: Struktur daftar artikel, judul bertaut, tanggal semantik, dan
  ringkasan.
- Halaman: `paper-writer`, `citation-academic`.
- Sumber yang dibaca:
  - [src/components/Card.astro](https://github.com/satnaing/astro-paper/blob/35cfa7fbe0b897306d27670d3819e55d5205f3dd/src/components/Card.astro)

Perubahan: nama dan konten baru, markup semantik Indonesia, tanpa dependency
upstream, filter lokal, state kosong, dan akses keyboard. Pemberitahuan lengkap
tersimpan pada [licenses/astro-paper.txt](../licenses/astro-paper.txt) dan
komentar HTML pada halaman terkait, termasuk hasil ekspornya.

## Acuan di luar open source

Halaman berikut menjadi acuan kebutuhan dan jenis komposisi saja. Tidak
mengunduh, menyalin, mendistribusikan ulang, atau membeli kode, foto, font, dan
aset marketplace. Implementasi dibuat sendiri.

- `framer-portfolio`:
  [Framer Portfolio](https://www.framer.com/marketplace/templates/categories/portfolio/).
  Acuan variasi profesi, indeks karya, identitas, dan jalur kontak.
- `photographer-tnc`:
  [Photographer TNC](https://webflow.com/templates/html/photographertnc-photography-website-template).
  Acuan pemisahan galeri, konteks proyek, dan informasi jasa.
- `woodland`:
  [Woodland](https://webflow.com/templates/html/woodland-website-template).
  Acuan urutan proyek, informasi ruang, material, dan profil studio.

Lisensi marketplace tidak diasumsikan memberi hak redistribusi. Referensi
komersial tidak dilabeli sebagai sumber kode MIT.

## Pemetaan per template

- [Simple / Developer](../templates/portfolio/developer/simple-developer.html):
  adaptasi kode MIT, `simplefolio`.
- [Timeline / Engineer](../templates/portfolio/developer/timeline-engineer.html):
  adaptasi kode MIT, `devportfolio`.
- [Shell / Backend](../templates/portfolio/developer/terminal-backend.html):
  orisinal, acuan kebutuhan, `framer-portfolio`.
- [Split / Fullstack](../templates/portfolio/developer/split-fullstack.html):
  orisinal, acuan kebutuhan, `framer-portfolio`.
- [Release / Maintainer](../templates/portfolio/developer/cli-maintainer.html):
  orisinal, acuan kebutuhan, `simplefolio`.
- [Casebook / Product](../templates/portfolio/design/case-product.html):
  orisinal, acuan kebutuhan, `framer-portfolio`.
- [Mono / Interface](../templates/portfolio/design/mono-ui.html): orisinal,
  acuan kebutuhan, `framer-portfolio`.
- [Index / Brand](../templates/portfolio/design/index-brand.html): orisinal,
  acuan kebutuhan, `framer-portfolio`.
- [Tokens / Systems](../templates/portfolio/design/systems-designer.html):
  orisinal, acuan kebutuhan, `framer-portfolio`.
- [Contact / Sheet](../templates/portfolio/photography/contact-sheet.html):
  orisinal, acuan kebutuhan, `photographer-tnc`.
- [Fieldnotes / Documentary](../templates/portfolio/photography/story-documentary.html):
  orisinal, acuan kebutuhan, `photographer-tnc`.
- [Noir / Editorial](../templates/portfolio/photography/dark-editorial.html):
  orisinal, acuan kebutuhan, `photographer-tnc`.
- [Atelier / Architecture](../templates/portfolio/architecture/atelier-architect.html):
  orisinal, acuan kebutuhan, `woodland`.
- [Material / Interior](../templates/portfolio/architecture/material-interior.html):
  orisinal, acuan kebutuhan, `woodland`.
- [Object / Industrial](../templates/portfolio/architecture/object-industrial.html):
  orisinal, acuan kebutuhan, `woodland`.
- [Reel / Filmmaker](../templates/portfolio/creative/reel-filmmaker.html):
  orisinal, acuan kebutuhan, `framer-portfolio`.
- [Score / Composer](../templates/portfolio/creative/score-composer.html):
  orisinal, acuan kebutuhan, `framer-portfolio`.
- [Quest / Game Art](../templates/portfolio/creative/play-gameartist.html):
  orisinal, acuan kebutuhan, `framer-portfolio`.
- [Type / Art Direction](../templates/portfolio/creative/type-artdirector.html):
  orisinal, acuan kebutuhan, `framer-portfolio`.
- [Paper / Writer](../templates/portfolio/writing/paper-writer.html): adaptasi
  kode MIT, `astro-paper`.
- [Dispatch / Journalist](../templates/portfolio/writing/dispatch-journalist.html):
  orisinal, acuan kebutuhan, `framer-portfolio`.
- [Script / Copywriter](../templates/portfolio/writing/script-copywriter.html):
  orisinal, acuan kebutuhan, `framer-portfolio`.
- [Citation / Academic](../templates/portfolio/research/citation-academic.html):
  adaptasi kode MIT, `astro-paper`.
- [Lab / Researcher](../templates/portfolio/research/lab-researcher.html):
  orisinal, acuan kebutuhan, `framer-portfolio`.
- [Notebook / Data](../templates/portfolio/research/notebook-data.html):
  orisinal, acuan kebutuhan, `framer-portfolio`.
- [Ledger / Consultant](../templates/portfolio/professional/ledger-consultant.html):
  orisinal, acuan kebutuhan, `framer-portfolio`.
- [Field / Engineer](../templates/portfolio/professional/field-engineer.html):
  orisinal, acuan kebutuhan, `woodland`.
- [Campus / Graduate](../templates/portfolio/student/campus-graduate.html):
  adaptasi kode MIT, `devportfolio`.
- [Labbook / TKJ](../templates/portfolio/student/apprentice-tkj.html): orisinal,
  acuan kebutuhan, `framer-portfolio`.
- [Focus / Freelance](../templates/portfolio/professional/focus-freelance.html):
  adaptasi kode MIT, `simplefolio`.

## Tambahan orisinal versi 1.4.0

Referensi metadata `collection-original-2026` menandai 18 implementasi yang
dibuat khusus untuk repo ini. Tidak mengadaptasi kode atau aset pihak ketiga.
Model, komposisi, konten demonstrasi, HTML, dan CSS ditulis untuk koleksi ini.

- [Trace / DevOps](../templates/portfolio/developer/trace-devops.html):
  `developer`, model `runbook`, devops dan reliability engineer.
- [Audit / Security](../templates/portfolio/developer/audit-security.html):
  `developer`, model `evidence`, security engineer.
- [Fieldwork / UX Research](../templates/portfolio/design/fieldwork-ux.html):
  `design`, model `research-log`, ux researcher.
- [Access / Inclusive Design](../templates/portfolio/design/access-inclusive.html):
  `design`, model `accessibility`, desainer antarmuka inklusif.
- [Still / Product Photography](../templates/portfolio/photography/still-productphoto.html):
  `photography`, model `light-table`, fotografer produk.
- [Trail / Nature](../templates/portfolio/photography/trail-nature.html):
  `photography`, model `field-atlas`, fotografer alam dan perjalanan.
- [Terrain / Landscape](../templates/portfolio/architecture/terrain-landscape.html):
  `architecture`, model `site-plan`, desainer lanskap.
- [Section / Spatial](../templates/portfolio/architecture/section-spatial.html):
  `architecture`, model `section`, desainer ruang dan pameran.
- [Ink / Tattoo Art](../templates/portfolio/creative/ink-tattoo.html):
  `creative`, model `flash-sheet`, ilustrator dan tattoo artist.
- [Clay / Ceramic](../templates/portfolio/creative/clay-ceramic.html):
  `creative`, model `craft`, seniman keramik.
- [Proof / Editor](../templates/portfolio/writing/proof-editor.html): `writing`,
  model `proof`, editor naskah.
- [Bridge / Translator](../templates/portfolio/writing/bridge-translator.html):
  `writing`, model `parallel`, penerjemah dan pelokalan.
- [Atlas / Geospatial](../templates/portfolio/research/atlas-geospatial.html):
  `research`, model `atlas`, analis geospasial.
- [Bench / Scientist](../templates/portfolio/research/bench-scientist.html):
  `research`, model `protocol`, peneliti dan asisten laboratorium.
- [Lesson / Educator](../templates/portfolio/professional/lesson-educator.html):
  `professional`, model `lesson`, pengajar dan perancang pembelajaran.
- [Table / Culinary](../templates/portfolio/professional/table-culinary.html):
  `professional`, model `menu-notes`, perancang menu dan kreator kuliner.
- [Thesis / Student](../templates/portfolio/student/thesis-student.html):
  `student`, model `thesis`, mahasiswa dan peneliti pemula.
- [Workshop / Apprentice](../templates/portfolio/student/workshop-apprentice.html):
  `student`, model `workshop`, pelajar teknik dan peserta magang.

Sembilan SVG orisinal tambahan: `pipeline-study.svg`, `field-survey.svg`,
`terrain-study.svg`, `section-study.svg`, `flash-study.svg`, `vessel-study.svg`,
`harvest-study.svg`, `parallel-study.svg`, serta `workshop-study.svg`.
Seluruhnya merupakan ilustrasi konsep lokal, bukan foto, data geografis, hasil
penelitian, atau gambar kerja konstruksi. Kode dan aset orisinal mengikuti MIT
pada repo.

## Aset dan konten

SVG tambahan dibuat khusus untuk koleksi ini. Semua SVG lokal adalah ilustrasi
konsep, bukan foto atau hasil pekerjaan klien. Identitas, pengalaman, publikasi,
dan proyek bersifat demonstrasi. Tidak ada data kontak pribadi, lisensi font
komersial, atau aset berbayar.
