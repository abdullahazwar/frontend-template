(function () {
  'use strict';
  const categories = {
    dashboard: 'Dashboard', admin: 'Admin', user: 'User', shop: 'Toko daring', login: 'Login',
    portfolio: 'Portofolio', company: 'Perusahaan', blog: 'Blog', forum: 'Forum', registration: 'Pendaftaran'
  };
  const manifest = window.TEMPLATE_MANIFEST;
  const $ = selector => document.querySelector(selector);
  const params = new URLSearchParams(location.search);
  let category = Object.hasOwn(categories, params.get('category')) ? params.get('category') : 'all';
  let savedOnly = params.get('saved') === '1';
  let saved = new Set();
  let storageAvailable = true;
  try {
    const stored = JSON.parse(localStorage.getItem('frontend-template:favorites') || '[]');
    if (Array.isArray(stored)) saved = new Set(stored.filter(id => manifest.some(t => t.id === id)));
  } catch { storageAvailable = false; }
  $('#search').value = params.get('q') || '';
  let toastTimer;
  function tell(message) {
    const toast = $('.toast');
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.hidden = false;
    toastTimer = setTimeout(() => { toast.hidden = true; }, 4500);
  }
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  // Diagrams communicate composition. They are intentionally labeled as sketches, not screenshots.
  function sketch(t) {
    const [bg, surface, ink, muted, accent, soft] = t.colors;
    const index = manifest.filter(x => x.category === t.category).findIndex(x => x.id === t.id);
    const r = (x,y,w,h,fill,rx=1) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"/>`;
    let shapes = r(0,0,280,195,surface,3) + r(12,11,26,5,ink) + r(218,12,17,3,muted) + r(244,12,20,3,muted);
    const line = (x,y,w) => r(x,y,w,3,soft);
    if (['dashboard','admin','user'].includes(t.category)) {
      if (index % 2 === 0) {
        shapes += r(0,25,48,170,bg) + r(8,40,30,8,soft) + line(8,59,24) + line(8,74,24) + line(8,89,22);
      }
      const x = index % 2 === 0 ? 60 : 15;
      shapes += r(x,36,95,8,ink) + line(x,51,135);
      if (index === 4) {
        for (let col=0;col<3;col++) for(let row=0;row<3;row++) shapes += r(x+col*66,73+row*31,58,24,row===0?soft:bg,2);
      } else {
        for(let i=0;i<3;i++) shapes += r(x+i*65,69,51,22,i===0?soft:bg,2) + r(x+5+i*65,76,27,5,accent);
        if (t.category === 'dashboard' && index < 4) {
          for(let i=0;i<7;i++) shapes += r(x+8+i*25,158-(i*11+26)%58,15,(i*11+26)%58,accent,2);
          shapes += line(x,168,190) + line(x,180,175);
        } else for(let i=0;i<4;i++) shapes += line(x,110+i*19,190) + r(x+160,107+i*19,27,8,soft,2);
      }
    } else if(t.category==='login' || t.category==='registration') {
      const split = index%2===0;
      if(split) shapes += r(0,25,127,170,soft) + r(17,47,70,9,ink) + r(17,63,82,9,ink) + r(17,108,90,59,accent,2);
      const x=split?151:76;
      shapes+=r(x,43,70,7,ink);
      for(let i=0;i<3;i++) shapes += line(x,64+i*27,40) + r(x,73+i*27,102,16,bg,2);
      shapes+=r(x,158,102,17,accent,2);
    } else if(t.category==='shop') {
      if(index===2 || index===4 || index===5) shapes += r(15,35,123,95,soft,2) + r(155,45,90,9,ink) + line(155,63,100) + r(155,100,70,18,accent,2);
      else shapes += r(15,37,170,11,ink) + line(15,57,220);
      const y=[2,4,5].includes(index)?143:80;
      for(let i=0;i<3;i++) shapes+=r(15+i*88,y,75,y===80?75:24,soft,2) + r(27+i*88,y+8,50,y===80?52:8,i%2?accent:muted,2) + line(15+i*88,y+(y===80?86:33),65);
    } else if(t.category==='forum') {
      shapes+=r(15,37,190,10,ink)+line(15,55,240);
      for(let i=0;i<3;i++) shapes+=r(15,78+i*36,16,16,soft,6)+r(43,77+i*36,160-i*17,5,ink)+line(43,90+i*36,190)+line(43,100+i*36,115);
    } else if(t.category==='blog') {
      if(index===3) {
        shapes+=r(55,38,170,12,ink)+line(75,59,130);
        for(let i=0;i<10;i++) shapes+=line(55,81+i*10,170-(i%4)*6);
      } else if(index===0) {
        shapes+=r(47,34,185,18,ink)+line(15,63,250)+r(15,75,158,68,soft)+r(185,75,76,6,ink);
        for(let i=0;i<6;i++) shapes+=line(185,94+i*12,76)+line(15,153+i*5,158);
      } else {
        shapes+=r(15,35,140,88,soft)+r(169,39,95,8,ink)+line(169,58,90);
        for(let i=0;i<8;i++) shapes+=line(16,138+i*6,230-(i%3)*15);
      }
    } else {
      if(index===0 || index===4) {
        shapes+=r(15,38,180,18,ink)+r(15,63,220,18,ink)+line(15,95,120);
        for(let i=0;i<3;i++) shapes+=r(15,122+i*20,225,1,soft)+r(20,130+i*20,120,5,ink);
      } else if(index===1) {
        for(let i=0;i<3;i++) shapes+=r(12+i*88,40,79,112+i%2*20,soft,1)+r(16+i*88,160+i%2*12,60,4,ink);
      } else {
        shapes+=r(15,38,115,98,soft)+r(147,43,110,13,ink)+r(147,64,95,13,ink)+line(147,95,105)+line(147,106,85)+r(147,122,70,15,accent,2)+line(15,156,245)+line(15,173,230);
      }
    }
    return `<svg viewBox="0 0 280 195" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${shapes}</svg>`;
  }
  const nav = $('#categories');
  for (const [id, label] of [['all','Semua template'], ...Object.entries(categories)]) {
    const button = el('button', '', label);
    button.type = 'button';
    button.dataset.category = id;
    button.append(el('span', '', id==='all'?'60':'06'));
    button.addEventListener('click', () => { category=id;render(); });
    nav.append(button);
  }
  function persist() {
    try { localStorage.setItem('frontend-template:favorites', JSON.stringify([...saved])); }
    catch { storageAvailable=false; }
  }
  function render() {
    const query=$('#search').value.trim().toLocaleLowerCase('id-ID');
    const templates=manifest.filter(t => (category==='all'||t.category===category) && (!savedOnly||saved.has(t.id)) && [t.name,t.description,categories[t.category],...t.features].join(' ').toLocaleLowerCase('id-ID').includes(query));
    if($('#sort').value==='name') templates.sort((a,b)=>a.name.localeCompare(b.name,'id'));
    const grid=$('#template-grid');
    grid.replaceChildren(...templates.map(t => {
      const card=el('article','template-card');
      const thumb=el('a','template-thumb');
      thumb.href=t.path;
      thumb.setAttribute('aria-label','Buka '+t.name);
      thumb.style.setProperty('--thumb-bg',t.colors[5]);
      thumb.style.setProperty('--thumb-ink',t.colors[2]);
      thumb.innerHTML=sketch(t); // All colors and geometry are trusted, repository-owned metadata.
      thumb.append(el('span','thumb-label','SKETSA KOMPOSISI / HTML'));
      const meta=el('div','template-meta');
      const text=el('div');
      text.append(el('h3','',t.name),el('p','',categories[t.category]+' · HTML'));
      const save=el('button','save-template',saved.has(t.id)?'●':'＋');
      save.type='button';
      save.setAttribute('aria-label',(saved.has(t.id)?'Hapus simpanan ':'Simpan ')+t.name);
      save.setAttribute('aria-pressed',String(saved.has(t.id)));
      save.addEventListener('click',()=>{
        if(saved.has(t.id)) saved.delete(t.id);else saved.add(t.id);
        persist();
        render();
        // Find the replacement button after filtering, or retain a stable fallback.
        const replacement=[...grid.querySelectorAll('.save-template')].find(b=>b.dataset.id===t.id);
        (replacement||$('#favorites')).focus();
        if(!storageAvailable) tell('Ditandai untuk tab ini. Penyimpanan browser tidak tersedia.');
      });
      save.dataset.id=t.id;
      meta.append(text,save);
      const actions=el('div','template-actions');
      const preview=el('button','','Pratinjau');
      preview.type='button';
      preview.addEventListener('click',()=>openPreview(t,preview));
      const open=el('a','','Buka halaman ↗');
      open.href=t.path;
      actions.append(preview,open);
      card.append(thumb,meta,el('p','template-description',t.description),actions);
      return card;
    }));
    $('#result-count').textContent=templates.length+' dari 60 template'+(category!=='all'?' / '+categories[category]:'');
    $('#no-results').hidden=templates.length>0;
    $('#favorites').setAttribute('aria-pressed',String(savedOnly));
    $('#favorite-count').textContent=saved.size;
    nav.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.category===category)));
    const url=new URL(location.href);
    for(const key of ['category','q','saved']) url.searchParams.delete(key);
    if(category!=='all') url.searchParams.set('category',category);
    if(query) url.searchParams.set('q',$('#search').value.trim());
    if(savedOnly) url.searchParams.set('saved','1');
    try { history.replaceState(null,'',url); } catch { /* file:// support varies by browser. */ }
  }
  let previewOpener;
  function openPreview(template,opener) {
    const dialog=$('#preview');
    if(typeof dialog.showModal!=='function'){location.href=template.path;return;}
    previewOpener=opener;
    $('#preview-title').textContent=template.name;
    $('#preview-description').textContent=categories[template.category]+' / '+template.description;
    $('#preview-frame').src=template.path;
    $('#preview-frame').title='Pratinjau '+template.name;
    $('#open-template').href=template.path;
    dialog.showModal();
  }
  $('#close-preview').addEventListener('click',()=>$('#preview').close());
  $('#preview').addEventListener('close',()=>{
    $('#preview-frame').removeAttribute('src');
    previewOpener?.focus();
  });
  $('#mobile-view').addEventListener('click',event=>{
    const mobile=$('#preview-frame').classList.toggle('mobile');
    event.currentTarget.setAttribute('aria-pressed',String(mobile));
    event.currentTarget.textContent=mobile?'Ukuran desktop':'Ukuran HP';
  });
  $('#search').addEventListener('input',render);
  $('#sort').addEventListener('change',render);
  $('#favorites').addEventListener('click',()=>{savedOnly=!savedOnly;render();});
  $('#reset').addEventListener('click',()=>{category='all';savedOnly=false;$('#search').value='';render();});
  render();
})();
