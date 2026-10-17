import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
const h = React.createElement;
const C = globalThis.TemplateCore;

function Metric({ label, value }) {
  return h(
    'div',
    { className: 'stat' },
    h('p', { className: 'small muted' }, label),
    h('p', { className: 'value num' }, value),
  );
}
function SalesChart({ points }) {
  const max = Math.max(1, ...points.map((p) => p.amount));
  return h(
    'div',
    { className: 'stack-sm' },
    h(
      'div',
      {
        className: 'react-chart',
        style: { gridTemplateColumns: `repeat(${points.length},1fr)` },
        role: 'img',
        'aria-label': points
          .map((p) => `${p.date}: ${C.money(p.amount)}`)
          .join('. '),
      },
      ...points.map((p) =>
        h(
          'div',
          { key: p.date },
          h('span', null, p.amount / 1000),
          h('b', { style: { '--bar': `${(p.amount / max) * 75}%` } }),
          h('span', null, p.date.slice(-2) + ' Okt'),
        ),
      ),
    ),
    h(
      'p',
      { className: 'muted small' },
      'Nilai dalam ribuan rupiah. Ringkasan per hari berasal dari pesanan berstatus Dibayar.',
    ),
  );
}
function OrdersTable({ rows }) {
  return h(
    'div',
    {
      className: 'table-scroll',
      role: 'region',
      tabIndex: 0,
      'aria-label': 'Rincian pesanan React',
    },
    h(
      'table',
      null,
      h(
        'caption',
        null,
        'Data ilustrasi · WIB · Pajak dan refund di luar model',
      ),
      h(
        'thead',
        null,
        h(
          'tr',
          null,
          ...['Pesanan', 'Tanggal', 'Status', 'Nilai'].map((text) =>
            h('th', { scope: 'col', key: text }, text),
          ),
        ),
      ),
      h(
        'tbody',
        null,
        ...rows.map((row) =>
          h(
            'tr',
            { key: row.id },
            ...[row.id, row.date, row.status, C.money(row.amount)].map(
              (value, i) => h('td', { key: i }, value),
            ),
          ),
        ),
      ),
    ),
  );
}
function Dashboard() {
  const [period, setPeriod] = useState('week');
  const [status, setStatus] = useState('');
  const summary = useMemo(() => C.salesSummary(period), [period]);
  function exportCSV() {
    const csv = C.toCSV([
      ['Pesanan', 'Tanggal WIB', 'Status', 'Nilai IDR'],
      ...summary.rows.map((o) => [o.id, o.date, o.status, o.amount]),
    ]);
    const url = URL.createObjectURL(
      new Blob([csv], { type: 'text/csv;charset=utf-8' }),
    );
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `react-pesanan-${period}.csv`;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus('CSV dibuat berdasarkan periode aktif.');
  }
  return h(
    'main',
    { id: 'main', className: 'wrap page stack' },
    h(
      'header',
      { className: 'row between' },
      h('a', { className: 'brand', href: '#main' }, 'pulse / react'),
      h('span', { className: 'pill' }, 'Demo lokal'),
    ),
    h(
      'section',
      { className: 'stack-sm' },
      h('p', { className: 'eyebrow' }, 'Ringkasan / Penjualan'),
      h('h1', null, 'Lihat angka dalam konteks.'),
      h(
        'p',
        { className: 'lead' },
        'Komponen React native. Filter yang sama memperbarui ringkasan, grafik, tabel, dan ekspor.',
      ),
    ),
    h(
      'div',
      { className: 'toolbar' },
      h(
        'label',
        null,
        'Periode',
        h(
          'select',
          {
            value: period,
            onChange: (event) => {
              setPeriod(event.target.value);
              setStatus('');
            },
          },
          h('option', { value: 'week' }, '11–17 Oktober 2026'),
          h('option', { value: 'day' }, '17 Oktober 2026'),
        ),
      ),
      h(
        'button',
        { className: 'btn secondary', onClick: exportCSV },
        'Unduh CSV',
      ),
    ),
    h(
      'div',
      { className: 'metric-strip' },
      h(Metric, {
        label: 'Penjualan dibayar',
        value: C.money(summary.revenue),
      }),
      h(Metric, { label: 'Pesanan dibayar', value: summary.count }),
      h(Metric, {
        label: 'Rata-rata pesanan',
        value: C.money(summary.average),
      }),
    ),
    h(
      'section',
      { className: 'stack' },
      h('h2', null, 'Penjualan per hari'),
      h(SalesChart, { points: summary.chart }),
    ),
    h(
      'section',
      { className: 'stack' },
      h('h2', null, 'Rincian pesanan'),
      h(OrdersTable, { rows: summary.rows }),
    ),
    h('p', { role: 'status', className: 'form-status' }, status),
    h(
      'footer',
      { className: 'footer' },
      'Data berasal dari fixture lokal. Tidak membaca rekening atau transaksi nyata.',
    ),
  );
}
createRoot(document.getElementById('react-root')).render(h(Dashboard));
