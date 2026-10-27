/* Lightweight interactivity. Token values come from config.js. */
(function(){
  'use strict';
  const cfg = window.FOUR_CONFIG || {};
  const by = s => Array.from(document.querySelectorAll(s));
  const safeText = v => typeof v === 'string' ? v.trim() : '';
  const ca = safeText(cfg.contractAddress);
  const validCA = /^0x[a-fA-F0-9]{40}$/.test(ca);
  const ticker = safeText(cfg.ticker) || '$4';
  const name = safeText(cfg.tokenName) || '4';
  document.title = `${name} (${ticker}) — Four on Ethereum`;
  by('[data-token-ticker]').forEach(el => el.textContent = ticker);
  by('[data-field]').forEach(el => {el.textContent = safeText(cfg[el.dataset.field]) || 'NOT ANNOUNCED';});
  by('.contract-short').forEach(el => el.textContent = validCA ? `${ca.slice(0,12)}…${ca.slice(-9)}` : 'SET YOUR CONTRACT ADDRESS');
  by('.contract-full').forEach(el => el.textContent = validCA ? ca : 'SET YOUR CONTRACT ADDRESS IN CONFIG.JS');
  const uniswap = validCA ? `https://app.uniswap.org/swap?chain=ethereum&inputCurrency=ETH&outputCurrency=${encodeURIComponent(ca)}` : '';
  function disable(a){a.classList.add('is-disabled');a.setAttribute('aria-disabled','true');a.removeAttribute('href');a.title = 'Configure the link in config.js first';}
  by('.buy-link').forEach(a => {if(uniswap){a.href=uniswap;a.target='_blank';a.rel='noopener noreferrer';}else{disable(a);}});
  by('.social-link').forEach(a => {const url=safeText(cfg[a.dataset.social]);const kind=a.dataset.social==='twitterUrl'?'x.com':'t.me';try{const u = new URL(url);if(u.protocol==='https:' && (u.hostname===kind || u.hostname.endsWith('.'+kind))){a.href=u.href;a.target='_blank';a.rel='noopener noreferrer';}else disable(a);}catch(e){disable(a);}});
  const toast = document.getElementById('toast');let toastTimer;
  function notify(text){toast.textContent=text;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2200);}
  async function copyCA(){if(!validCA){notify('SET YOUR CA IN CONFIG.JS');return;}try{await navigator.clipboard.writeText(ca);notify('ADDRESS COPIED');}catch(e){const t=document.createElement('textarea');t.value=ca;document.body.appendChild(t);t.select();try{document.execCommand('copy');notify('ADDRESS COPIED');}catch(err){notify('COPY FAILED — SELECT ADDRESS');}t.remove();}}
  by('[data-copy-ca]').forEach(b=>b.addEventListener('click',copyCA));
  const menu=document.getElementById('site-nav'), toggle=document.getElementById('menu-toggle');
  toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
  by('#site-nav a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));
  const cards=by('.gallery-item'),lightbox=document.getElementById('lightbox'),lbImage=document.getElementById('lightbox-img'),lbCaption=document.getElementById('lightbox-caption');let selected=0,restoreFocus=null;
  function display(index){selected=(index+cards.length)%cards.length;const source=cards[selected].querySelector('img');lbImage.src=source.src;lbImage.alt=source.alt;lbCaption.textContent=cards[selected].querySelector('span').textContent;}
  function show(index){restoreFocus=document.activeElement;display(index);lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.classList.add('locked');document.getElementById('lightbox-close').focus();}
  function hide(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');document.body.classList.remove('locked');lbImage.removeAttribute('src');if(restoreFocus)restoreFocus.focus();}
  cards.forEach((b,i)=>b.addEventListener('click',()=>show(i)));
  document.getElementById('lightbox-close').addEventListener('click',hide);
  document.getElementById('lightbox-prev').addEventListener('click',()=>display(selected-1));
  document.getElementById('lightbox-next').addEventListener('click',()=>display(selected+1));
  lightbox.addEventListener('click',e=>{if(e.target===lightbox)hide();});
  document.addEventListener('keydown',e=>{if(!lightbox.classList.contains('open'))return;if(e.key==='Escape')hide();else if(e.key==='ArrowLeft')display(selected-1);else if(e.key==='ArrowRight')display(selected+1);else if(e.key==='Tab'){const f=by('#lightbox button');const i=f.indexOf(document.activeElement);if(e.shiftKey&&i===0){e.preventDefault();f[f.length-1].focus();}else if(!e.shiftKey&&i===f.length-1){e.preventDefault();f[0].focus();}}});
  document.getElementById('year').textContent=String(new Date().getFullYear());
})();
