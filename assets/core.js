/* Pure demo-domain functions. Shared by HTML pages and the Node test suite. */
(function (root) {
  'use strict';
  const orders = Object.freeze(
    [
      { id: 'P-101', date: '2026-10-11', status: 'Dibayar', amount: 185000 },
      { id: 'P-102', date: '2026-10-12', status: 'Dibayar', amount: 450000 },
      { id: 'P-103', date: '2026-10-13', status: 'Menunggu', amount: 1250000 },
      { id: 'P-104', date: '2026-10-14', status: 'Dibayar', amount: 390000 },
      { id: 'P-105', date: '2026-10-15', status: 'Dibayar', amount: 65000 },
      { id: 'P-106', date: '2026-10-16', status: 'Dibayar', amount: 185000 },
      { id: 'P-107', date: '2026-10-17', status: 'Dibayar', amount: 450000 },
      { id: 'P-108', date: '2026-10-17', status: 'Menunggu', amount: 390000 },
    ].map(Object.freeze),
  );
  const money = (amount) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(amount);
  function valueLevel(value, maximum) {
    if (!Number.isFinite(value) || !Number.isFinite(maximum) || maximum <= 0) {
      return 0;
    }
    return Math.round(Math.min(1, Math.max(0, value / maximum)) * 100);
  }
  function salesSummary(period, source = orders) {
    const rows = source.filter((o) =>
      period === 'day'
        ? o.date === '2026-10-17'
        : o.date >= '2026-10-11' && o.date <= '2026-10-17',
    );
    const paid = rows.filter((o) => o.status === 'Dibayar');
    const revenue = paid.reduce((sum, o) => sum + o.amount, 0);
    const days =
      period === 'day'
        ? ['2026-10-17']
        : Array.from({ length: 7 }, (_, i) => `2026-10-${i + 11}`);
    return {
      rows,
      revenue,
      count: paid.length,
      average: paid.length ? revenue / paid.length : 0,
      chart: days.map((date) => ({
        date,
        amount: paid
          .filter((o) => o.date === date)
          .reduce((s, o) => s + o.amount, 0),
      })),
    };
  }
  function matches(text, query, status = '', filter = '') {
    return (
      text
        .toLocaleLowerCase('id-ID')
        .includes(query.trim().toLocaleLowerCase('id-ID')) &&
      (!filter ||
        status.toLocaleLowerCase('id-ID') === filter.toLocaleLowerCase('id-ID'))
    );
  }
  function cartAdd(cart, product, quantity = 1) {
    if (!Number.isSafeInteger(quantity) || quantity < 1)
      throw new Error('Jumlah harus berupa bilangan bulat minimal 1.');
    if (
      !Number.isSafeInteger(product.price) ||
      product.price < 0 ||
      !Number.isSafeInteger(product.stock) ||
      product.stock < 0
    )
      throw new Error('Data produk tidak valid.');
    const used = cart
      .filter((x) => x.id === product.id)
      .reduce((s, x) => s + x.quantity, 0);
    if (used + quantity > product.stock)
      throw new Error(
        `Stok demo ${product.name} tersisa ${Math.max(0, product.stock - used)} unit.`,
      );
    const key = product.id + ':' + (product.variant || 'default');
    const next = cart.map((x) => ({ ...x }));
    const existing = next.find((x) => x.key === key);
    if (existing) existing.quantity += quantity;
    else next.push({ ...product, key, quantity });
    return next;
  }
  const cartTotal = (cart) =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  function csvCell(value) {
    let text = String(value);
    if (/^[\s]*[=+@\-]/.test(text)) text = "'" + text;
    return '"' + text.replaceAll('"', '""') + '"';
  }
  const toCSV = (rows) =>
    '\uFEFF' + rows.map((row) => row.map(csvCell).join(',')).join('\r\n');
  root.TemplateCore = Object.freeze({
    orders,
    money,
    valueLevel,
    salesSummary,
    matches,
    cartAdd,
    cartTotal,
    toCSV,
  });
})(globalThis);
