'use strict';

const grid = document.getElementById('grid');
const featureVideo = document.getElementById('featureVideo');
const lb = document.getElementById('lb');
const worksWithFilm = [{ cat: 'video', video: true, img: 'video-feature.jpg', title: '向前一刻 · DO IT!', meta: '短视频 / 2026', tagline: '新作 · 观看完整影像' }, ...WORKS];
let gallery = [];
let current = 0;
let lastFocused = null;

function imagePath(filename) { return 'assets/img/' + filename; }

function render(filter) {
  grid.replaceChildren();
  const selected = worksWithFilm.filter(work => filter === 'all' || work.cat === filter);
  gallery = selected.filter(work => !work.data && !work.video);
  selected.forEach(work => {
    const card = document.createElement(work.data ? 'article' : 'button');
    if (work.data) {
      card.className = 'card card--data';
      card.innerHTML = '<div class="dhead"><b>' + work.title + '</b><i>' + work.meta + '</i></div>'
        + '<div class="nums">' + work.nums.map(item => '<div><b>' + item[0] + '</b><i>' + item[1] + '</i></div>').join('') + '</div>'
        + '<div class="dnote">' + work.note + '</div>';
    } else {
      card.type = 'button';
      card.className = 'card card--image' + (work.video ? ' card--video' : '');
      card.setAttribute('aria-label', (work.video ? '播放：' : '放大查看：') + work.title);
      card.innerHTML = '<figure><img loading="lazy" decoding="async" src="' + imagePath(work.img) + '" alt="' + work.title + '">'
        + (work.video ? '<span class="play-badge" aria-hidden="true">▶ <span>观看影像</span></span>' : '') + '</figure>'
        + '<div class="cap"><b>' + work.title + '</b><i>' + work.meta + '</i></div>'
        + '<div class="tagline">' + work.tagline + '</div>';
      card.addEventListener('click', () => {
        if (work.video) {
          document.getElementById('film').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
          featureVideo.focus({ preventScroll: true });
          featureVideo.play().catch(() => { /* Native controls remain available if playback is blocked. */ });
        } else {
          openLightbox(gallery.indexOf(work));
        }
      });
    }
    grid.appendChild(card);
  });
  document.getElementById('filterStatus').textContent = '当前显示 ' + selected.length + ' 件作品';
}

document.getElementById('tabs').addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  document.querySelectorAll('#tabs button').forEach(item => {
    const active = item === button;
    item.classList.toggle('on', active);
    item.setAttribute('aria-pressed', String(active));
  });
  render(button.dataset.f);
});

function updateLightbox() {
  const work = gallery[current];
  const image = document.getElementById('lbImg');
  image.src = imagePath(work.img);
  image.alt = work.title + '。' + work.note;
  image.closest('.imgbox').scrollTop = 0;
  document.getElementById('lbTitle').textContent = work.title;
  document.getElementById('lbMeta').textContent = work.meta + ' · ' + (current + 1) + ' / ' + gallery.length;
}

function openLightbox(index) {
  if (!gallery.length || index < 0) return;
  lastFocused = document.activeElement;
  current = index;
  updateLightbox();
  lb.classList.add('on');
  lb.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.querySelectorAll('body > header, body > main, body > footer, body > .hero, body > .skip-link').forEach(element => { element.inert = true; });
  document.getElementById('lbClose').focus();
}

function closeLightbox() {
  lb.classList.remove('on');
  lb.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  document.querySelectorAll('[inert]').forEach(element => { element.inert = false; });
  if (lastFocused && lastFocused.isConnected) lastFocused.focus({ preventScroll: true });
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
    const first = buttons[0];
    const last = buttons[buttons.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});

featureVideo.addEventListener('error', () => { document.getElementById('videoError').hidden = false; });
featureVideo.querySelector('source').addEventListener('error', () => { document.getElementById('videoError').hidden = false; });

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target); }
  }), { threshold: 0.08 });
  document.querySelectorAll('.rv').forEach(element => observer.observe(element));
}
render('all');
