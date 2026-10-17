(function () {
  'use strict';
  const categories = {
    dashboard: 'Dashboard',
    admin: 'Admin',
    user: 'User',
    shop: 'Toko daring',
    login: 'Login',
    portfolio: 'Portofolio',
    company: 'Perusahaan',
    blog: 'Blog',
    forum: 'Forum',
    registration: 'Pendaftaran',
  };
  const manifest = window.TEMPLATE_MANIFEST;
  const C = globalThis.TemplateCatalog;
  const $ = (selector) => document.querySelector(selector);
  const params = new URLSearchParams(location.search);
  let category = Object.hasOwn(categories, params.get('category'))
    ? params.get('category')
    : 'all';
  let portfolioType = Object.hasOwn(C.portfolioTypes, params.get('type'))
    ? params.get('type')
    : 'all';
  let source = Object.hasOwn(C.sourceTypes, params.get('source'))
    ? params.get('source')
    : 'all';
  if (portfolioType !== 'all' || source !== 'all') category = 'portfolio';
  let savedOnly = params.get('saved') === '1';
  let saved = new Set();
  let storageAvailable = true;
  try {
    const stored = JSON.parse(
      localStorage.getItem('frontend-template:favorites') || '[]',
    );
    if (Array.isArray(stored))
      saved = new Set(stored.filter((id) => manifest.some((t) => t.id === id)));
  } catch {
    storageAvailable = false;
  }
  $('#search').value = params.get('q') || '';
  let toastTimer;
  function tell(message) {
    const toast = $('.toast');
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.hidden = false;
    toastTimer = setTimeout(() => {
      toast.hidden = true;
    }, 4500);
  }
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  const typeSelect = $('#portfolio-type');
  const sourceSelect = $('#portfolio-source');
  for (const [id, label] of Object.entries(C.portfolioTypes)) {
    const option = el('option', '', label);
    option.value = id;
    typeSelect.append(option);
  }
  for (const [id, label] of Object.entries(C.sourceTypes)) {
    const option = el('option', '', label);
    option.value = id;
    sourceSelect.append(option);
  }
  typeSelect.value = portfolioType;
  sourceSelect.value = source;
  const nav = $('#categories');
  for (const [id, label] of [
    ['all', 'Semua template'],
    ...Object.entries(categories),
  ]) {
    const button = el('button', '', label);
    button.type = 'button';
    button.dataset.category = id;
    button.append(
      el(
        'span',
        '',
        String(
          id === 'all'
            ? manifest.length
            : manifest.filter((t) => t.category === id).length,
        ).padStart(2, '0'),
      ),
    );
    button.addEventListener('click', () => {
      category = id;
      portfolioType = 'all';
      source = 'all';
      render();
    });
    nav.append(button);
  }
  function persist() {
    try {
      localStorage.setItem(
        'frontend-template:favorites',
        JSON.stringify([...saved]),
      );
    } catch {
      storageAvailable = false;
    }
  }
  function render() {
    const query = $('#search').value.trim().toLocaleLowerCase('id-ID');
    const templates = C.selectTemplates(manifest, {
      category,
      portfolioType,
      source,
      query,
      savedOnly,
      saved,
    });
    $('#portfolio-filters').hidden = category !== 'portfolio';
    typeSelect.value = portfolioType;
    sourceSelect.value = source;
    if ($('#sort').value === 'name')
      templates.sort((a, b) => a.name.localeCompare(b.name, 'id'));
    const grid = $('#template-grid');
    grid.replaceChildren(
      ...templates.map((t) => {
        const card = el('article', 'template-card');
        const thumb = el('a', 'template-thumb');
        thumb.href = t.path;
        thumb.setAttribute('aria-label', 'Buka ' + t.name);
        thumb.dataset.template = t.id;
        thumb.dataset.category = t.category;
        thumb.dataset.model = t.model || '';
        thumb.dataset.variant = String(
          manifest
            .filter((item) => item.category === t.category)
            .findIndex((item) => item.id === t.id),
        );
        thumb.append($('#catalog-sketch').content.cloneNode(true));
        thumb.append(el('span', 'thumb-label', 'SKETSA KOMPOSISI / HTML'));
        const meta = el('div', 'template-meta');
        const text = el('div');
        text.append(
          el('h3', '', t.name),
          el(
            'p',
            '',
            (C.portfolioTypes[t.portfolioType] || categories[t.category]) +
              ' · HTML',
          ),
        );
        const save = el('button', 'save-template', saved.has(t.id) ? '●' : '+');
        save.type = 'button';
        save.setAttribute(
          'aria-label',
          (saved.has(t.id) ? 'Hapus simpanan ' : 'Simpan ') + t.name,
        );
        save.setAttribute('aria-pressed', String(saved.has(t.id)));
        save.addEventListener('click', () => {
          if (saved.has(t.id)) saved.delete(t.id);
          else saved.add(t.id);
          persist();
          render();
          // Find the replacement button after filtering, or retain a stable fallback.
          const replacement = [...grid.querySelectorAll('.save-template')].find(
            (b) => b.dataset.id === t.id,
          );
          (replacement || $('#favorites')).focus();
          if (!storageAvailable)
            tell('Ditandai untuk tab ini. Penyimpanan browser tidak tersedia.');
        });
        save.dataset.id = t.id;
        if (t.source) text.append(el('p', '', C.sourceTypes[t.source.kind]));
        meta.append(text, save);
        const actions = el('div', 'template-actions');
        const preview = el('button', '', 'Pratinjau');
        preview.type = 'button';
        preview.addEventListener('click', () => openPreview(t, preview));
        const open = el('a', '', 'Buka halaman ↗');
        open.href = t.path;
        actions.append(preview, open);
        card.append(
          thumb,
          meta,
          el('p', 'template-description', t.description),
          actions,
        );
        return card;
      }),
    );
    $('#result-count').textContent =
      templates.length +
      ' dari ' +
      manifest.length +
      ' template' +
      (category !== 'all' ? ' / ' + categories[category] : '');
    $('#no-results').hidden = templates.length > 0;
    $('#favorites').setAttribute('aria-pressed', String(savedOnly));
    $('#favorite-count').textContent = saved.size;
    nav
      .querySelectorAll('button')
      .forEach((b) =>
        b.setAttribute('aria-pressed', String(b.dataset.category === category)),
      );
    const url = new URL(location.href);
    for (const key of ['category', 'q', 'saved', 'type', 'source'])
      url.searchParams.delete(key);
    if (category !== 'all') url.searchParams.set('category', category);
    if (query) url.searchParams.set('q', $('#search').value.trim());
    if (savedOnly) url.searchParams.set('saved', '1');
    if (category === 'portfolio' && portfolioType !== 'all')
      url.searchParams.set('type', portfolioType);
    if (category === 'portfolio' && source !== 'all')
      url.searchParams.set('source', source);
    try {
      history.replaceState(null, '', url);
    } catch {
      /* file:// support varies by browser. */
    }
  }
  let previewOpener;
  function openPreview(template, opener) {
    const dialog = $('#preview');
    if (typeof dialog.showModal !== 'function') {
      location.href = template.path;
      return;
    }
    previewOpener = opener;
    $('#preview-frame').classList.remove('mobile');
    $('#mobile-view').setAttribute('aria-pressed', 'false');
    $('#mobile-view').textContent = 'Ukuran HP';
    $('#preview-title').textContent = template.name;
    $('#preview-description').textContent =
      categories[template.category] + ' / ' + template.description;
    $('#preview-frame').src = template.path;
    $('#preview-frame').title = 'Pratinjau ' + template.name;
    $('#open-template').href = template.path;
    dialog.showModal();
  }
  $('#close-preview').addEventListener('click', () => $('#preview').close());
  $('#preview').addEventListener('close', () => {
    $('#preview-frame').removeAttribute('src');
    previewOpener?.focus();
  });
  $('#mobile-view').addEventListener('click', (event) => {
    const mobile = $('#preview-frame').classList.toggle('mobile');
    event.currentTarget.setAttribute('aria-pressed', String(mobile));
    event.currentTarget.textContent = mobile ? 'Ukuran desktop' : 'Ukuran HP';
  });
  $('#search').addEventListener('input', render);
  $('#sort').addEventListener('change', render);
  typeSelect.addEventListener('change', () => {
    portfolioType = typeSelect.value;
    render();
  });
  sourceSelect.addEventListener('change', () => {
    source = sourceSelect.value;
    render();
  });
  $('#favorites').addEventListener('click', () => {
    savedOnly = !savedOnly;
    render();
  });
  $('#reset').addEventListener('click', () => {
    category = 'all';
    portfolioType = 'all';
    source = 'all';
    savedOnly = false;
    $('#search').value = '';
    render();
  });
  render();
})();
