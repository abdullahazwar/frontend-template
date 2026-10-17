(function () {
  'use strict';
  const C = globalThis.TemplateCore;
  const one = (selector, root = document) => root.querySelector(selector);
  const all = (selector, root = document) => [
    ...root.querySelectorAll(selector),
  ];
  let cart = [];
  let toastTimer;
  function tell(message) {
    const modal = one('dialog[open]');
    if (modal) {
      let status = one('[data-dialog-status]', modal);
      if (!status) {
        status = node('p', '', 'form-status space');
        status.dataset.dialogStatus = '';
        status.setAttribute('role', 'status');
        one('.dialog-head', modal).after(status);
      }
      status.textContent = message;
      return;
    }
    const toast = one('.toast');
    if (!toast) return;
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.hidden = false;
    toastTimer = setTimeout(() => {
      toast.hidden = true;
    }, 4500);
  }
  function node(tag, text, className = '') {
    const el = document.createElement(tag);
    if (text !== undefined) el.textContent = text;
    if (className) el.className = className;
    return el;
  }
  function filterCollection(collection) {
    const search = one('[data-search]', collection)?.value || '';
    const filter = one('[data-filter]', collection)?.value || '';
    let count = 0;
    all('[data-item]', collection).forEach((item) => {
      const text = item.dataset.searchText || item.textContent;
      item.hidden = !C.matches(text, search, item.dataset.status || '', filter);
      if (!item.hidden) count++;
    });
    const empty = one('[data-empty]', collection);
    if (empty) empty.hidden = count > 0;
    const status = one('[data-count]', collection);
    if (status) status.textContent = count + ' hasil ditampilkan.';
  }
  all('[data-collection]').forEach((collection) => {
    all('[data-search],[data-filter]', collection).forEach((control) =>
      control.addEventListener('input', () => filterCollection(collection)),
    );
    filterCollection(collection);
  });

  function renderSales(dashboard) {
    const period = one('[data-period]', dashboard).value;
    const summary = C.salesSummary(period);
    one('[data-metric="revenue"]', dashboard).textContent = C.money(
      summary.revenue,
    );
    one('[data-metric="count"]', dashboard).textContent = summary.count;
    one('[data-metric="average"]', dashboard).textContent = C.money(
      summary.average,
    );
    const tbody = one('[data-sales-rows]', dashboard);
    tbody.replaceChildren(
      ...summary.rows.map((row) => {
        const tr = node('tr');
        [
          row.id,
          row.date.split('-').reverse().join('/'),
          row.status,
          C.money(row.amount),
        ].forEach((text) => tr.append(node('td', text)));
        return tr;
      }),
    );
    const region = one('[data-sales-chart]', dashboard);
    const max = Math.max(1, ...summary.chart.map((x) => x.amount));
    const chart = node('div', undefined, 'bar-chart');
    chart.setAttribute('role', 'img');
    chart.setAttribute(
      'aria-label',
      'Penjualan dibayar per hari. ' +
        summary.chart.map((x) => x.date + ': ' + C.money(x.amount)).join('. '),
    );
    summary.chart.forEach((point) => {
      const col = node('div', undefined, 'bar-col');
      const bar = node('b');
      bar.dataset.level = C.valueLevel(point.amount, max);
      col.append(
        node(
          'span',
          new Intl.NumberFormat('id-ID').format(point.amount / 1000),
        ),
        bar,
        node('span', point.date.slice(-2) + ' Okt'),
      );
      chart.append(col);
    });
    region.replaceChildren(
      chart,
      node(
        'p',
        'Nilai batang dalam ribuan rupiah. Skala dari Rp0 sampai ' +
          C.money(max) +
          '. Rincian pesanan tersedia di tabel.',
        'muted small space',
      ),
    );
  }
  all('[data-dashboard]').forEach((dashboard) => {
    one('[data-period]', dashboard).addEventListener('change', () =>
      renderSales(dashboard),
    );
    one('[data-export]', dashboard).addEventListener('click', () => {
      const period = one('[data-period]', dashboard).value;
      const rows = C.salesSummary(period).rows;
      const csv = C.toCSV([
        ['Pesanan', 'Tanggal WIB', 'Status', 'Nilai IDR'],
        ...rows.map((o) => [o.id, o.date, o.status, o.amount]),
      ]);
      const url = URL.createObjectURL(
        new Blob([csv], { type: 'text/csv;charset=utf-8' }),
      );
      const a = node('a');
      a.href = url;
      a.download = `pesanan-demo-${period}.csv`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      tell('CSV dibuat dari periode yang sedang dipilih.');
    });
    renderSales(dashboard);
  });

  function renderCart() {
    const list = one('[data-cart-items]');
    if (!list) return;
    if (!cart.length)
      list.replaceChildren(
        node(
          'p',
          'Keranjang masih kosong. Tambahkan produk dari katalog.',
          'empty',
        ),
      );
    else
      list.replaceChildren(
        ...cart.map((item) => {
          const row = node('div', undefined, 'cart-line');
          const info = node('div');
          info.append(
            node('b', item.name + (item.variant ? ' / ' + item.variant : '')),
            node(
              'p',
              `${item.quantity} × ${C.money(item.price)}`,
              'small muted',
            ),
          );
          const action = node('div', undefined, 'row');
          const minus = node('button', '−', 'btn secondary small');
          minus.type = 'button';
          minus.dataset.cartMinus = item.key;
          minus.setAttribute(
            'aria-label',
            'Kurangi satu ' +
              item.name +
              (item.variant ? ' ' + item.variant : ''),
          );
          const plus = node('button', '+', 'btn secondary small');
          plus.type = 'button';
          plus.dataset.cartPlus = item.key;
          plus.setAttribute(
            'aria-label',
            'Tambah satu ' +
              item.name +
              (item.variant ? ' ' + item.variant : ''),
          );
          action.append(
            minus,
            node('b', C.money(item.quantity * item.price)),
            plus,
          );
          row.append(info, action);
          return row;
        }),
      );
    one('[data-cart-total]').textContent = C.money(C.cartTotal(cart));
    const qty = cart.reduce((s, x) => s + x.quantity, 0);
    all('[data-cart-button]').forEach((button) => {
      button.textContent = `Keranjang (${qty})`;
    });
    one('[data-checkout]').disabled = qty === 0;
    one('[data-checkout-status]').textContent = '';
  }
  renderCart();

  document.addEventListener('click', (event) => {
    const button = event.target.closest('button,[data-dialog]');
    if (!button) return;
    if (button.hasAttribute('data-dialog')) {
      const dialog = document.getElementById(button.dataset.dialog);
      if (dialog && typeof dialog.showModal === 'function') {
        const oldStatus = one('[data-dialog-status]', dialog);
        if (oldStatus) oldStatus.textContent = '';
        dialog._opener = button;
        dialog.showModal();
      } else tell('Pratinjau dialog memerlukan browser modern.');
    }
    if (button.hasAttribute('data-close')) button.closest('dialog')?.close();
    if (button.hasAttribute('data-password')) {
      const input = document.getElementById(button.dataset.password);
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      button.textContent = show ? 'Sembunyikan' : 'Tampilkan';
      button.setAttribute('aria-pressed', String(show));
    }
    if (button.hasAttribute('data-bookmark')) {
      const saved = button.getAttribute('aria-pressed') !== 'true';
      if (!button.dataset.originalLabel)
        button.dataset.originalLabel = button.textContent;
      button.setAttribute('aria-pressed', String(saved));
      button.textContent = saved
        ? 'Tersimpan di tab ini'
        : button.dataset.originalLabel;
      tell(
        saved ? 'Ditandai selama halaman terbuka.' : 'Tanda simpan dibatalkan.',
      );
    }
    if (button.hasAttribute('data-vote')) {
      const group = button.closest('.vote,.panel');
      const count = one('[data-vote-count]', group);
      const active = button.getAttribute('aria-pressed') !== 'true';
      count.textContent = Number(count.textContent) + (active ? 1 : -1);
      button.setAttribute('aria-pressed', String(active));
      tell(
        active ? 'Dukungan lokal ditambahkan.' : 'Dukungan lokal dibatalkan.',
      );
    }
    if (button.hasAttribute('data-toggle-state')) {
      const item = button.closest('[data-item]');
      const active = button.getAttribute('aria-pressed') !== 'true';
      const label = active ? button.dataset.on : button.dataset.off;
      button.setAttribute('aria-pressed', String(active));
      item.dataset.status = label.toLowerCase();
      const pill = one('[data-state-label]', item);
      pill.textContent = label;
      pill.className = 'pill' + (active ? ' success' : ' neutral');
      const action =
        button.dataset.on === 'Terbit'
          ? active
            ? 'Jadikan draf'
            : 'Terbitkan'
          : active
            ? 'Nonaktifkan'
            : 'Aktifkan';
      button.textContent = action + ' ' + button.dataset.label;
      tell(button.dataset.label + ': ' + label + ' (demo).');
      filterCollection(item.closest('[data-collection]'));
    }
    if (button.hasAttribute('data-restock')) {
      const count = one('[data-stock]', button.closest('tr'));
      count.textContent = Number(count.textContent) + 10;
      const scope = button.closest('main');
      const stats = all('.metric-strip .stat .value', scope);
      if (stats[1])
        stats[1].textContent = all('[data-stock]', scope).filter(
          (x) => Number(x.textContent) < 10,
        ).length;
      tell(button.dataset.label + ': 10 unit demo ditambahkan.');
    }
    if (button.hasAttribute('data-move-task')) {
      const task = button.closest('[data-task]');
      const board = button.closest('[data-board]');
      const columns = all('[data-column]', board);
      const oldIndex = columns.indexOf(task.closest('[data-column]'));
      one('[data-task-list]', columns[(oldIndex + 1) % columns.length]).append(
        task,
      );
      columns.forEach((column) => {
        one('[data-column-count]', column).textContent = all(
          '[data-task]',
          column,
        ).length;
      });
      button.focus();
      tell(
        'Tugas dipindahkan ke ' +
          one('h2', columns[(oldIndex + 1) % columns.length]).textContent +
          '.',
      );
    }
    if (button.hasAttribute('data-add-cart')) {
      const qtyInput = button.dataset.quantity
        ? document.getElementById(button.dataset.quantity)
        : null;
      if (qtyInput && !qtyInput.reportValidity()) return;
      const variant = button.dataset.variantSource
        ? document.getElementById(button.dataset.variantSource).value
        : '';
      try {
        cart = C.cartAdd(
          cart,
          {
            id: button.dataset.id,
            name: button.dataset.name,
            price: Number(button.dataset.price),
            stock: Number(button.dataset.stock),
            variant,
          },
          qtyInput ? Number(qtyInput.value) : 1,
        );
        renderCart();
        tell(button.dataset.name + ' ditambahkan ke keranjang demo.');
      } catch (error) {
        tell(error.message);
      }
    }
    if (button.hasAttribute('data-cart-minus')) {
      const key = button.dataset.cartMinus;
      cart = cart
        .map((item) =>
          item.key === key ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0);
      renderCart();
      // Keep focus inside the native modal after a row is rebuilt or removed.
      one('[data-close]', one('#cart')).focus();
    }
    if (button.hasAttribute('data-cart-plus')) {
      const item = cart.find((x) => x.key === button.dataset.cartPlus);
      try {
        cart = C.cartAdd(cart, item, 1);
        renderCart();
        one('[data-close]', one('#cart')).focus();
      } catch (error) {
        tell(error.message);
      }
    }
    if (button.hasAttribute('data-checkout')) {
      one('[data-checkout-status]').textContent =
        'Ringkasan demo: ' +
        cart.reduce((s, x) => s + x.quantity, 0) +
        ' produk, total ' +
        C.money(C.cartTotal(cart)) +
        '. Tidak ada pesanan atau pembayaran yang dibuat.';
    }
    if (button.hasAttribute('data-ticket-title')) {
      all('[data-ticket-title]').forEach((x) =>
        x.setAttribute('aria-pressed', String(x === button)),
      );
      one('[data-ticket-heading]').textContent = button.dataset.ticketTitle;
      one('[data-ticket-body]').textContent = button.dataset.ticketMessage;
      const replies = one('[data-replies]');
      replies.replaceChildren(
        ...(ticketReplies.get(button.dataset.ticketTitle) || []).map((text) =>
          node('p', text, 'bubble own'),
        ),
      );
    }
  });
  all('dialog').forEach((dialog) => {
    dialog.setAttribute('aria-labelledby', dialog.id + '-title');
    one('h2', dialog).id = dialog.id + '-title';
    dialog.addEventListener('close', () => {
      dialog._opener?.focus();
    });
    dialog.addEventListener('click', (event) => {
      const r = dialog.getBoundingClientRect();
      if (
        event.target === dialog &&
        (event.clientX < r.left ||
          event.clientX > r.right ||
          event.clientY < r.top ||
          event.clientY > r.bottom)
      )
        dialog.close();
    });
  });
  const ticketReplies = new Map();
  all('[data-reply-form]').forEach((form) =>
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = one('textarea', form);
      if (!form.reportValidity() || !input.value.trim()) return;
      const title = one('[data-ticket-heading]').textContent;
      const replies = ticketReplies.get(title) || [];
      replies.push(input.value.trim());
      ticketReplies.set(title, replies);
      one('[data-replies]').append(node('p', input.value.trim(), 'bubble own'));
      input.value = '';
      tell('Balasan ditambahkan di tab ini. Tidak ada pesan yang dikirim.');
    }),
  );
  all('[data-demo-form]').forEach((form) =>
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      one('.form-status', form).textContent = form.hasAttribute(
        'data-auth-form',
      )
        ? 'Format input valid. Demo tidak melakukan login atau mengirim email.'
        : 'Validasi demo selesai. Data tidak dikirim dan tidak disimpan.';
    }),
  );
  all('[data-course]').forEach((course) =>
    all('[data-lesson]', course).forEach((input) =>
      input.addEventListener('change', () => {
        const count = all('[data-lesson]:checked', course).length;
        one('progress', course).value = count;
        one('[data-course-count]', course).textContent =
          count + ' dari ' + all('[data-lesson]', course).length + ' selesai';
      }),
    ),
  );
  all('[data-ticket-price]').forEach((radio) =>
    radio.addEventListener('change', () => {
      one('[data-ticket-total]').textContent = C.money(Number(radio.value));
    }),
  );
  all('[data-wizard]').forEach((form) => {
    let index = 0;
    const steps = all('[data-step]', form);
    function render() {
      steps.forEach((step, i) => {
        step.hidden = i !== index;
        all('input,select,textarea', step).forEach((control) => {
          control.disabled = i !== index;
        });
      });
      all('[data-step-label]', form).forEach((label, i) => {
        if (i === index) label.setAttribute('aria-current', 'step');
        else label.removeAttribute('aria-current');
      });
      one('[data-prev]', form).hidden = index === 0;
      one('[data-next]', form).hidden = index === steps.length - 1;
      one('[data-finish]', form).hidden = index !== steps.length - 1;
      if (index === steps.length - 1) {
        const review = one('[data-review]', form);
        review.replaceChildren();
        steps.slice(0, -1).forEach((step) =>
          all('input,select', step).forEach((input) => {
            const label =
              one(`label[for="${input.id}"]`, form)?.textContent || input.name;
            review.append(
              node('dt', label, 'muted small'),
              node('dd', input.value),
            );
          }),
        );
      }
    }
    one('[data-next]', form).addEventListener('click', () => {
      const invalid = all('input,select,textarea', steps[index]).find(
        (input) => !input.checkValidity(),
      );
      if (invalid) {
        invalid.reportValidity();
        return;
      }
      index++;
      render();
      (
        one('input,select,textarea,h2', steps[index]) ||
        one('[data-finish]', form)
      ).focus();
    });
    one('[data-prev]', form).addEventListener('click', () => {
      index = Math.max(0, index - 1);
      render();
      one('input,select,textarea', steps[index])?.focus();
    });
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (index !== steps.length - 1) {
        one('[data-next]', form).click();
        return;
      }
      const invalidStep = steps.slice(0, -1).findIndex((step) =>
        all('input,select,textarea', step).some((input) => {
          input.disabled = false;
          return !input.checkValidity();
        }),
      );
      if (invalidStep >= 0) {
        index = invalidStep;
        render();
        all('input,select,textarea', steps[index])
          .find((x) => !x.checkValidity())
          ?.reportValidity();
        return;
      }
      render();
      one('.form-status', form).textContent =
        'Demo selesai. Tidak ada akun yang dibuat atau data yang dikirim.';
    });
    render();
  });
})();
