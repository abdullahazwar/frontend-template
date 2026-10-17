(function (root) {
  'use strict';

  const portfolioTypes = {
    developer: 'Developer',
    design: 'UI, UX, dan brand',
    photography: 'Fotografi',
    architecture: 'Arsitektur, interior, produk',
    creative: 'Film, musik, dan seni',
    writing: 'Penulis, editor, dan penerjemah',
    research: 'Akademik, riset, data',
    professional: 'Profesional dan freelancer',
    student: 'Mahasiswa dan pelajar',
  };
  const sourceTypes = {
    original: 'Orisinal',
    'open-source-adaptation': 'Adaptasi open source MIT',
  };
  const categoryNames = {
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

  function selectTemplates(manifest, options = {}) {
    const {
      category = 'all',
      portfolioType = 'all',
      source = 'all',
      query = '',
      savedOnly = false,
      saved = new Set(),
    } = options;
    const normalized = query.trim().toLocaleLowerCase('id-ID');
    return manifest.filter((template) => {
      if (category !== 'all' && template.category !== category) return false;
      if (savedOnly && !saved.has(template.id)) return false;
      if (category === 'portfolio') {
        if (portfolioType !== 'all' && template.portfolioType !== portfolioType)
          return false;
        if (source !== 'all' && template.source?.kind !== source) return false;
      }
      const text = [
        template.name,
        template.description,
        template.category,
        categoryNames[template.category] || '',
        portfolioTypes[template.portfolioType] || '',
        template.model || '',
        sourceTypes[template.source?.kind] || '',
        ...(template.features || []),
      ]
        .join(' ')
        .toLocaleLowerCase('id-ID');
      return text.includes(normalized);
    });
  }

  root.TemplateCatalog = { portfolioTypes, sourceTypes, selectTemplates };
})(globalThis);
