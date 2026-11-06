'use strict';

const grid = document.getElementById('grid');
const featureVideo = document.getElementById('featureVideo');
const lb = document.getElementById('lb');
const posterWorks = WORKS.filter(work => work.cat === 'poster');
const filmWork = {cat:'video', video:true, img:'video-feature.jpg', title:'向前一刻 · DO IT!', meta:'短视频 / 2026', tagline:'点击观看完整影像'};
const featured = [JOURNAL_WORKS[0], posterWorks[0], JOURNAL_WORKS[5], JOURNAL_WORKS[2], posterWorks[1], JOURNAL_WORKS[6], JOURNAL_WORKS[3], posterWorks[2], JOURNAL_WORKS[7], JOURNAL_WORKS[4], WORKS.find(work => work.img === 'nature-1.jpg'), JOURNAL_WORKS[1]];
const allWorks = [...new Set([...featured, ...JOURNAL_WORKS, ...WORKS, filmWork])];
let selectedImages = [];
let gallery = [];
let current = 0;
let lastFocused = null;
let currentFilter = 'all';
let expanded = false;
const imagePath = filename => 'assets/img/' + filename;
const motion = () => matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';

function render(filter = currentFilter) {
  currentFilter = filter;
  const selected = allWorks.filter(work => filter === 'all' || work.cat === filter);
  selectedImages = selected.filter(work => !work.data && !work.video);
  const displayed = filter === 'all' && !expanded ? selected.slice(0, 12) : selected;
  grid.replaceChildren();
  displayed.forEach(work => {
    const card = document.createElement(work.data ? 'article' : 'button');
    card.className = 'card' + (work.data ? ' card--data' : ' card--image') + (work.video ? ' card--video' : '') + (work.cat === 'collage' ? ' card--collage' : '');
    if (work.data) {
      card.innerHTML = '<div class="dhead"><b>' + work.title + '</b><i>' + work.meta + '</i></div><div class="nums">'
        + work.nums.map(item => '<div><b>' + item[0] + '</b><i>' + item[1] + '</i></div>').join('') + '</div><div class="dnote">' + work.note + '</div>';
    } else {
      card.type = 'button';
      card.setAttribute('aria-label', (work.video ? '播放：' : '放大查看：') + work.title);
      if (work.video) card.dataset.playFilm = 'true';
      else { card.dataset.image = work.img; card.dataset.group = 'archive'; }
      card.innerHTML = '<figure><img loading="lazy" decoding="async" src="' + imagePath(work.img) + '" alt="' + work.title + '">'
        + (work.video ? '<span class="play-badge" aria-hidden="true">▶ <span>观看影像</span></span>' : '')
        + '</figure><div class="cap"><b>' + work.title + '</b><i>' + work.meta + '</i></div><div class="tagline">' + work.tagline + '</div>';
    }
    grid.appendChild(card);
  });
  document.querySelectorAll('#tabs button').forEach(button => {
    const active = button.dataset.f === filter;
    button.classList.toggle('on', active);
    button.setAttribute('aria-pressed', String(active));
  });
  document.getElementById('loadMore').hidden = filter !== 'all' || expanded;
  document.getElementById('filterStatus').textContent = '显示 ' + displayed.length + ' 件，共 ' + selected.length + ' 件作品';
}

document.getElementById('tabs').addEventListener('click', event => {
  const button = event.target.closest('button[data-f]');
  if (!button) return;
  expanded = false;
  render(button.dataset.f);
});
document.getElementById('loadMore').addEventListener('click', () => {
  expanded = true;
  render();
  grid.querySelectorAll('button')[12]?.focus({preventScroll:true});
});

document.querySelectorAll('.poster-sheet').forEach(button => { button.dataset.group = 'poster'; });
document.querySelectorAll('.paper-item').forEach(button => { button.dataset.group = 'collage'; });
document.querySelectorAll('.photo-print, .journal-cover, .contact-photo').forEach(button => { button.dataset.group = 'journal'; });

document.addEventListener('click', event => {
  const filterLink = event.target.closest('[data-filter-link]');
  if (filterLink) { expanded = false; render(filterLink.dataset.filterLink); }
  const button = event.target.closest('button[data-image]');
  if (button) {
    const scope = button.dataset.group;
    gallery = scope === 'archive' ? selectedImages
      : scope === 'poster' ? posterWorks
      : scope === 'collage' ? JOURNAL_WORKS.filter(work => work.cat === 'collage')
      : JOURNAL_WORKS.filter(work => work.cat === 'photo');
    const index = gallery.findIndex(work => work.img === button.dataset.image);
    if (index >= 0) openLightbox(index);
  }
  if (event.target.closest('[data-play-film]')) {
    document.getElementById('film').scrollIntoView({behavior:motion()});
    featureVideo.focus({preventScroll:true});
    featureVideo.play().catch(() => {});
  }
});

function updateLightbox() {
  const work = gallery[current];
  const image = document.getElementById('lbImg');
  image.src = imagePath(work.img);
  image.alt = work.title;
  image.closest('.imgbox').scrollTop = 0;
  document.getElementById('lbTitle').textContent = work.title;
  document.getElementById('lbMeta').textContent = work.meta + ' · ' + (current + 1) + ' / ' + gallery.length;
  document.getElementById('lbNote').textContent = work.note || '';
}
function openLightbox(index) {
  lastFocused = document.activeElement;
  current = index;
  updateLightbox();
  lb.setAttribute('aria-hidden', 'false');
  lb.classList.add('on');
  document.body.style.overflow = 'hidden';
  document.querySelectorAll('body > header, body > main, body > footer, body > .skip-link').forEach(element => { element.inert = true; });
  document.getElementById('lbClose').focus();
}
function closeLightbox() {
  document.body.style.overflow = '';
  document.querySelectorAll('[inert]').forEach(element => { element.inert = false; });
  if (lastFocused?.isConnected) lastFocused.focus({preventScroll:true});
  lb.classList.remove('on');
  lb.setAttribute('aria-hidden', 'true');
}
function step(direction) {
  current = (current + direction + gallery.length) % gallery.length;
  updateLightbox();
}
document.getElementById('lbNext').addEventListener('click', () => step(1));
document.getElementById('lbPrev').addEventListener('click', () => step(-1));
document.getElementById('lbClose').addEventListener('click', closeLightbox);
lb.addEventListener('click', event => { if (event.target === lb) closeLightbox(); });
document.addEventListener('keydown', event => {
  if (!lb.classList.contains('on')) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowRight') step(1);
  if (event.key === 'ArrowLeft') step(-1);
  if (event.key === 'Tab') {
    const buttons = [...lb.querySelectorAll('button')];
    const first = buttons[0], last = buttons[buttons.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});

const rail = document.getElementById('posterRail');
const previous = document.getElementById('posterPrev');
const next = document.getElementById('posterNext');
function updateRail() {
  previous.disabled = rail.scrollLeft < 2;
  next.disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2;
}
previous.addEventListener('click', () => rail.scrollBy({left:-rail.clientWidth * .8,behavior:motion()}));
next.addEventListener('click', () => rail.scrollBy({left:rail.clientWidth * .8,behavior:motion()}));
rail.addEventListener('scroll', updateRail, {passive:true});
window.addEventListener('resize', updateRail);
window.addEventListener('load', updateRail);
updateRail();
featureVideo.addEventListener('error', () => { document.getElementById('videoError').hidden = false; });
featureVideo.querySelector('source').addEventListener('error', () => { document.getElementById('videoError').hidden = false; });
render('all');
