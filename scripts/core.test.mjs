import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import '../assets/core.js';
import { exportTemplate } from './export.mjs';
const C = globalThis.TemplateCore;

test('weekly totals include paid orders only and equal chart sum', () => {
  const result = C.salesSummary('week');
  assert.equal(result.rows.length, 8);
  assert.equal(result.count, 6);
  assert.equal(result.revenue, 1725000);
  assert.equal(result.average, 287500);
  assert.equal(
    result.chart.reduce((s, p) => s + p.amount, 0),
    result.revenue,
  );
});
test('day filter changes table, metrics and chart consistently', () => {
  const result = C.salesSummary('day');
  assert.equal(result.rows.length, 2);
  assert.equal(result.revenue, 450000);
  assert.equal(result.count, 1);
  assert.equal(result.average, 450000);
  assert.equal(result.chart.length, 1);
  assert.equal(result.chart[0].amount, result.revenue);
});
test('zero paid orders produces zero average, not NaN or Infinity', () => {
  const summary = C.salesSummary('week', [
    { date: '2026-10-12', status: 'Menunggu', amount: 999 },
  ]);
  assert.equal(summary.average, 0);
  assert.equal(summary.revenue, 0);
  assert.equal(summary.count, 0);
});
test('period boundaries exclude outside dates', () => {
  const summary = C.salesSummary('week', [
    { date: '2026-10-10', status: 'Dibayar', amount: 10 },
    { date: '2026-10-18', status: 'Dibayar', amount: 20 },
  ]);
  assert.equal(summary.rows.length, 0);
});
test('search ignores case and surrounding whitespace and combines status', () => {
  assert.equal(
    C.matches('Alya Putri Admin', '  ALYA  ', 'aktif', 'Aktif'),
    true,
  );
  assert.equal(
    C.matches('Alya Putri Admin', 'alya', 'nonaktif', 'Aktif'),
    false,
  );
  assert.equal(C.matches('Kursi Sela Furnitur', 'lampu'), false);
  assert.equal(C.matches('Kursi Sela Furnitur', ''), true);
});
const product = { id: 'camera', name: 'Kamera Mono', price: 4200000, stock: 6 };
test('cart adds and merges lines without mutating previous state', () => {
  const first = C.cartAdd([], product, 2);
  const next = C.cartAdd(first, product, 1);
  assert.equal(first[0].quantity, 2);
  assert.equal(next[0].quantity, 3);
  assert.equal(next.length, 1);
  assert.equal(C.cartTotal(next), 12600000);
});
test('cart enforces combined stock across variants', () => {
  const first = C.cartAdd([], { ...product, variant: 'Graphite' }, 4);
  const next = C.cartAdd(first, { ...product, variant: 'Silver' }, 2);
  assert.equal(next.length, 2);
  assert.throws(
    () => C.cartAdd(next, { ...product, variant: 'Silver' }, 1),
    /tersisa 0/,
  );
  assert.equal(C.cartTotal(next), 25200000);
});
test('invalid quantities and invalid product amounts are rejected', () => {
  for (const qty of [0, -1, 1.5, NaN, Infinity])
    assert.throws(() => C.cartAdd([], product, qty));
  assert.throws(() => C.cartAdd([], { ...product, price: -1 }, 1));
  assert.throws(() => C.cartAdd([], { ...product, stock: 0 }, 1), /tersisa 0/);
});
test('stock failures do not change the existing cart', () => {
  const cart = C.cartAdd([], product, 6);
  assert.throws(() => C.cartAdd(cart, product, 1));
  assert.equal(cart[0].quantity, 6);
});
test('CSV escapes commas, quotes, newlines and spreadsheet formulas', () => {
  const text = C.toCSV([
    ['A,B', '"quoted"', 'line\nbreak', '=1+1', '  +SUM(A1)', '@x', '-2'],
  ]);
  assert.equal(
    text,
    '\uFEFF"A,B","""quoted""","line\nbreak","\'=1+1","\'  +SUM(A1)","\'@x","\'-2"',
  );
});
test('empty cart total is zero', () => assert.equal(C.cartTotal([]), 0));
test('all 90 exports inline code and images and resolve internal destinations', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'frontend-exports-'));
  const manifest = JSON.parse(
    await readFile(new URL('../templates.json', import.meta.url), 'utf8'),
  );
  try {
    for (const template of manifest) {
      const file = await exportTemplate(template.id, directory);
      const html = await readFile(file, 'utf8');
      assert.doesNotMatch(
        html,
        /(?:src|href)="\.\.\//,
        template.id + ' must not require sibling files',
      );
      assert.doesNotMatch(
        html,
        /<script src=/,
        template.id + ' must inline scripts',
      );
      assert.match(html, /TemplateCore/);
      const ids = new Set(
        [...html.matchAll(/\bid="([^\"]+)"/g)].map((m) => m[1]),
      );
      for (const [, anchor] of html.matchAll(/href="#([^\"]+)"/g))
        assert.ok(
          ids.has(anchor),
          template.id + ' has an unresolved anchor: ' + anchor,
        );
    }
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
