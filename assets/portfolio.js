(function () {
  'use strict';

  const collection = document.querySelector('[data-portfolio]');
  if (!collection) return;
  const search = collection.querySelector('[data-work-search]');
  const items = [...collection.querySelectorAll('[data-work]')];
  const filters = [...collection.querySelectorAll('[data-work-filter]')];
  let selected = 'all';

  function filterWorks() {
    const query = search.value.trim().toLocaleLowerCase('id-ID');
    let visible = 0;
    for (const item of items) {
      const matchesKind = selected === 'all' || item.dataset.kind === selected;
      const matchesText = item.textContent
        .toLocaleLowerCase('id-ID')
        .includes(query);
      item.hidden = !(matchesKind && matchesText);
      if (!item.hidden) visible++;
    }
    for (const button of filters) {
      button.setAttribute(
        'aria-pressed',
        String(button.dataset.workFilter === selected),
      );
    }
    collection.querySelector('[data-work-count]').textContent =
      `${visible} karya ditampilkan`;
    collection.querySelector('[data-work-empty]').hidden = visible !== 0;
  }

  search.addEventListener('input', filterWorks);
  for (const button of filters) {
    button.addEventListener('click', () => {
      selected = button.dataset.workFilter;
      filterWorks();
    });
  }
  collection
    .querySelector('[data-work-reset]')
    .addEventListener('click', () => {
      selected = 'all';
      search.value = '';
      filterWorks();
      search.focus();
    });
  filterWorks();

  const lightbox = document.querySelector('[data-art-dialog]');
  let lightboxOpener;
  for (const button of collection.querySelectorAll('[data-art-open]')) {
    button.addEventListener('click', () => {
      const image = button.closest('figure').querySelector('img');
      if (typeof lightbox.showModal !== 'function') {
        window.open(image.src, '_blank', 'noopener');
        return;
      }
      const enlarged = lightbox.querySelector('img');
      enlarged.src = image.src;
      enlarged.alt = image.alt;
      lightbox.querySelector('figcaption').textContent = image.alt;
      lightboxOpener = button;
      lightbox.showModal();
    });
  }
  lightbox
    ?.querySelector('[data-art-close]')
    .addEventListener('click', () => lightbox.close());
  lightbox?.addEventListener('close', () => lightboxOpener?.focus());

  const contact = document.querySelector('[data-contact-address]');
  const contactStatus = document.querySelector('[data-contact-status]');
  document
    .querySelector('[data-copy-contact]')
    .addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(contact.textContent.trim());
        contactStatus.textContent = 'Alamat kontak contoh disalin.';
      } catch {
        const range = document.createRange();
        range.selectNodeContents(contact);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        contactStatus.textContent =
          'Alamat ditandai. Gunakan menu Salin pada browser.';
      }
    });

  document
    .querySelector('[data-profile-download]')
    .addEventListener('click', () => {
      const text = [
        'PROFIL DEMONSTRASI. Identitas dan proyek fiktif.',
        document.querySelector('h1').textContent.trim(),
        document.querySelector('[data-profile-summary]').textContent.trim(),
        '',
        ...items.map((item) => item.textContent.trim().replace(/\s+/g, ' ')),
        '',
        'Kontak contoh: ' + contact.textContent.trim(),
      ].join('\n\n');
      const url = URL.createObjectURL(
        new Blob([text], { type: 'text/plain;charset=utf-8' }),
      );
      const link = document.createElement('a');
      link.href = url;
      link.download = document.body.dataset.template + '-profil-contoh.txt';
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
})();
