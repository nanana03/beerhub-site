// Beer Hub 公開ページの小さな動き。無くても全部読める（地図の点と県の数は HTML に書いてある）。
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  // ---- トップ：地図と県の一覧をつなぐ ----
  var svg = document.querySelector('.jp');
  var out = document.getElementById('readout');
  if (svg && out) {
    var groups = Array.prototype.slice.call(svg.querySelectorAll('.pref'));
    var chips = Array.prototype.slice.call(document.querySelectorAll('.pc'));
    var current = -1;
    var select = function (i) {
      if (i === current) return;
      current = i;
      groups.forEach(function (g) { g.classList.toggle('on', +g.dataset.i === i); });
      chips.forEach(function (c) { c.setAttribute('aria-pressed', String(+c.dataset.i === i)); });
      var g = groups[i];
      if (!g) return;
      out.innerHTML = '';
      var b = document.createElement('b'); b.textContent = g.dataset.p;
      var n = document.createElement('span'); n.className = 'rn'; n.textContent = g.dataset.n;
      out.appendChild(b); out.appendChild(document.createTextNode('掲載 ')); out.appendChild(n); out.appendChild(document.createTextNode('軒'));
    };
    chips.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
    svg.addEventListener('click', function (e) {
      var g = e.target.closest('.pref'); if (g) select(+g.dataset.i);
    });
    if (window.matchMedia('(hover: hover)').matches) {
      svg.addEventListener('mouseover', function (e) {
        var g = e.target.closest('.pref'); if (g) select(+g.dataset.i);
      });
    }
    chips.forEach(function (c) {
      c.addEventListener('click', function () { select(+c.dataset.i); });
    });
  }

  // ---- 書類：いま読んでいる節を目次で示す ----
  var toc = document.querySelectorAll('.toc a');
  if (toc.length && 'IntersectionObserver' in window) {
    var map = {};
    Array.prototype.forEach.call(toc, function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        Array.prototype.forEach.call(toc, function (a) { a.classList.remove('on'); });
        var a = map[en.target.id]; if (a) a.classList.add('on');
      });
    }, { rootMargin: '0px 0px -70% 0px' });
    Object.keys(map).forEach(function (id) { var h = document.getElementById(id); if (h) io.observe(h); });
  }
})();
