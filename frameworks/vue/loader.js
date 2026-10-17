import('./app.js').catch(() => {
  document.getElementById('load-status').textContent =
    'Library tidak dapat dimuat. Jalankan npm start, ' +
    'periksa koneksi CDN, lalu muat ulang halaman.';
});
