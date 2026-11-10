/*!
 * Jojo Park eshop – MIKULÁŠSKÁ NADÍLKA 2026 (samostatný, odstranitelný skript)
 * - hero banner na homepage PŘED banner s vouchery
 * - na stránce kategorie Mikulášská nadílka: štítky dne a tlačítko „Vybrat vstupenku“
 * Po akci stačí odebrat řádek se skriptem ze Záhlaví v Shoptetu.
 * Skript se sám vypne po datu v CFG.hideAfter.
 * Ke stylu karet využívá jojopark.js, ale funguje i bez něj.
 */
(function () {
  'use strict';

  var CFG = {
    hideAfter: '2026-12-07T00:00:00',          // od tohoto data se skript sám vypne
    day5: '/5--12-mikulasska-nadilka-2026/',
    day6: '/6--12-mikulasska-nadilka-2026/',
    category: '/mikulasska-nadilka-2026/',
    priceFrom: 'od 39 Kč'
  };

  if (new Date() >= new Date(CFG.hideAfter)) return;

  var script = document.currentScript || document.querySelector('script[src*="mikulas.js"]');
  var BASE = script && script.src ? script.src.replace(/[^\/]*(\?.*)?$/, '') : '/';
  var IMG = BASE + 'img/';

  if (!document.getElementById('mk-fonts')) {
    var l = document.createElement('link');
    l.id = 'mk-fonts'; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@500;600;700&display=swap';
    document.head.appendChild(l);
  }

  var css = `
  :root{--mk-navy:#0c0850;--mk-pink:#ff3d5e;--mk-red:#f21f1f;--mk-green:#78c828;--mk-green-d:#4e8a14;--mk-orange:#f39200;--mk-orange-d:#b86d00}
  .mk *{box-sizing:border-box}
  .mk{font-family:'Barlow Semi Condensed','Arial Narrow',Arial,sans-serif}

  .mk-hero{position:relative;overflow:hidden;margin:0 0 34px;border-radius:26px;isolation:isolate;color:var(--mk-navy);
    background:linear-gradient(180deg,#2f6fe0 0%,#6f93ea 42%,#c6a5e0 70%,#f6b9a2 100%);
    box-shadow:0 14px 34px rgba(35,50,140,.32)}
  .mk-hill{position:absolute;left:0;right:0;bottom:0;width:100%;height:130px;z-index:0;display:block}
  .mk-flake{position:absolute;z-index:0;pointer-events:none;animation:mkfloat 7s ease-in-out infinite}
  .mk-hero__in{position:relative;z-index:2;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center;gap:20px;padding:42px 40px 74px 48px}
  .mk-hero__title{margin:0 0 14px;line-height:0}
  .mk-hero__title img{width:100%;max-width:520px;height:auto;display:block;
    filter:drop-shadow(2px 0 0 #fff) drop-shadow(-2px 0 0 #fff) drop-shadow(0 2px 0 #fff) drop-shadow(0 -2px 0 #fff) drop-shadow(0 6px 8px rgba(10,10,80,.35))}
  .mk-hero__lead{display:inline-block;margin:0 0 14px;padding:6px 16px;border-radius:999px;background:#fff;color:var(--mk-navy);font-weight:700;font-size:clamp(18px,1.9vw,24px);box-shadow:0 4px 0 rgba(10,10,80,.18);transform:rotate(-1.5deg)}
  .mk-info{margin:0 0 20px;padding:14px 18px;list-style:none;border-radius:18px;background:rgba(255,255,255,.88);font-size:clamp(17px,1.6vw,20px);line-height:1.3;font-weight:600;color:var(--mk-navy);max-width:520px;box-shadow:0 6px 16px rgba(10,10,80,.18)}
  .mk-info li{position:relative;padding:3px 0 3px 22px}
  .mk-info li::before{content:"";position:absolute;left:0;top:11px;width:11px;height:11px;border-radius:50%;background:var(--c,var(--mk-pink))}
  .mk-info b{color:var(--mk-pink)}
  .mk-cta{display:flex;flex-wrap:wrap;gap:14px;align-items:center}
  .mk-btn{display:inline-block;padding:13px 26px;border-radius:14px;color:#fff!important;font-weight:700;font-size:22px;text-decoration:none!important;
    background:var(--c);box-shadow:0 6px 0 var(--cd),0 12px 20px rgba(0,0,0,.22);transition:transform .15s,box-shadow .15s;white-space:nowrap}
  .mk-btn:hover{transform:translateY(4px);box-shadow:0 2px 0 var(--cd),0 6px 10px rgba(0,0,0,.22)}
  .mk-btn small{display:block;font-size:14px;font-weight:600;opacity:.92;margin-top:-2px}
  .mk-from{margin-top:12px;font-size:17px;font-weight:700;color:#fff;text-shadow:0 1px 3px rgba(10,10,80,.6)}

  .mk-art{position:relative;width:100%;max-width:540px;justify-self:end;aspect-ratio:1/.98}
  .mk-card{position:absolute;display:block;width:60%;border:6px solid #fff;border-radius:20px;overflow:hidden;background:#fff;line-height:0;
    box-shadow:0 14px 26px rgba(10,10,80,.4);transform:rotate(var(--r));transition:transform .25s cubic-bezier(.2,1.4,.4,1);
    animation:mkdrop .7s cubic-bezier(.2,1.3,.4,1) both;animation-delay:var(--d)}
  .mk-card img{width:100%;height:auto;display:block}
  .mk-card--5{left:0;top:0;--r:-4deg;--d:.05s;z-index:1}
  .mk-card--6{right:0;bottom:0;--r:4deg;--d:.25s;z-index:2}
  .mk-card:hover{transform:rotate(0) translateY(-6px) scale(1.03);z-index:5}
  .mk-time{position:absolute;z-index:6;left:50%;top:52%;transform:translate(-50%,-50%) rotate(-8deg);padding:8px 18px;border-radius:999px;
    background:var(--mk-pink);color:#fff;font-weight:700;font-size:clamp(20px,2.3vw,30px);box-shadow:0 5px 0 #b01f3a,0 10px 18px rgba(0,0,0,.28);white-space:nowrap;pointer-events:none}
  @keyframes mkdrop{from{opacity:0;transform:translateY(-34px) rotate(var(--r))}to{opacity:1;transform:rotate(var(--r))}}
  @keyframes mkfloat{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(8px) rotate(12deg)}}
  @media (prefers-reduced-motion:reduce){.mk-card,.mk-flake{animation:none}}
  @media (max-width:900px){
    .mk-hero{border-radius:18px}
    .mk-hero__in{grid-template-columns:1fr;padding:30px 18px 78px;gap:14px}
    .mk-art{max-width:460px;justify-self:center}
    .mk-btn{flex:1 1 100%;text-align:center}
  }

  /* ---- kategorie Mikulášská nadílka ---- */
  .mk-pill{position:absolute;left:12px;bottom:12px;z-index:2;padding:6px 16px;border-radius:999px;color:#fff;font-weight:700;font-size:20px;
    background:var(--c);box-shadow:0 3px 0 var(--cd);transform:rotate(-3deg)}
  .mk-vybrat{display:block!important;background:var(--mk-green)!important;color:#fff!important;border:0!important;border-radius:14px!important;
    font-size:20px!important;font-weight:700!important;padding:12px 22px!important;box-shadow:0 5px 0 var(--mk-green-d);text-align:center;text-decoration:none!important;
    transition:transform .15s,box-shadow .15s}
  .mk-vybrat:hover{transform:translateY(3px);box-shadow:0 2px 0 var(--mk-green-d)}
  `;

  function addStyle() {
    if (document.getElementById('mk-style')) return;
    var s = document.createElement('style');
    s.id = 'mk-style'; s.textContent = css;
    document.head.appendChild(s);
  }

  function flake(size, left, top, op, delay) {
    var arm = '<path d="M0,0V-9M-2.6,-6.6L0,-4L2.6,-6.6"/>', g = '';
    for (var a = 0; a < 360; a += 60) g += '<g transform="rotate(' + a + ')">' + arm + '</g>';
    return '<svg class="mk-flake" viewBox="-10 -10 20 20" width="' + size + '" height="' + size + '" style="left:' + left + ';top:' + top +
      ';opacity:' + op + ';animation-delay:' + delay + 's" fill="none" stroke="#fff" stroke-width="1.3" stroke-linecap="round">' + g + '</svg>';
  }
  var HILL = '<svg class="mk-hill" viewBox="0 0 1200 130" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="mkh" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#d6e4fb"/></linearGradient></defs>' +
    '<path d="M0,78 C170,22 340,96 570,64 C810,30 970,78 1200,38 L1200,130 L0,130Z" fill="url(#mkh)"/></svg>';

  function isHome() {
    return document.body.classList.contains('in-index') || location.pathname === '/' || location.pathname === '/index.php';
  }
  function topTarget() {
    var targets = ['.homepage-box', '#content .content-wrapper-in', '#content-wrapper', '#content', 'main'];
    for (var i = 0; i < targets.length; i++) { var t = document.querySelector(targets[i]); if (t) return t; }
    return null;
  }

  /* hero musí být vždy PŘED bannerem s vouchery (#jj-home) */
  function place() {
    var hero = document.getElementById('mk-home');
    if (!hero) return;
    var vouchers = document.getElementById('jj-home');
    if (vouchers && vouchers.parentNode) {
      if (hero.nextElementSibling !== vouchers || hero.parentNode !== vouchers.parentNode) vouchers.parentNode.insertBefore(hero, vouchers);
    } else if (!hero.parentNode) {
      var t = topTarget(); if (t) t.insertBefore(hero, t.firstChild);
    }
  }

  function buildHome() {
    if (!isHome() || document.getElementById('mk-home')) return;
    var hero = document.createElement('div');
    hero.id = 'mk-home'; hero.className = 'mk';
    hero.innerHTML =
      '<section class="mk-hero">' + HILL +
        flake(44, '47%', '6%', .6, 0) + flake(28, '40%', '62%', .45, 1.4) + flake(60, '92%', '8%', .5, .7) +
        flake(34, '3%', '70%', .45, 2.1) + flake(24, '60%', '40%', .5, 3) +
        '<div class="mk-hero__in">' +
          '<div>' +
            '<h2 class="mk-hero__title"><img src="' + IMG + 'mikulas-title.webp" alt="Mikulášská nadílka" width="1083" height="368"></h2>' +
            '<span class="mk-hero__lead">Bohatý mikulášský balíček pro všechny děti</span>' +
            '<ul class="mk-info">' +
              '<li style="--c:#ff3d5e"><b>15–19 hod.</b> &nbsp;5. 12. | 6. 12.</li>' +
              '<li style="--c:#29b6d9"><b>15–16:45</b> mikulášské tvořeníčko, malování na obličej, třpytivé tetování</li>' +
              '<li style="--c:#f39200">nadílka od cca <b>16:45 hod.</b></li>' +
              '<li style="--c:#78c828">po nadílce focení s mikulášskou partou</li>' +
            '</ul>' +
            '<div class="mk-cta">' +
              '<a class="mk-btn" style="--c:#ff3d5e;--cd:#b01f3a" href="' + CFG.day5 + '">Vstupenky 5. 12.<small>dětská i dospělá</small></a>' +
              '<a class="mk-btn" style="--c:#f21f1f;--cd:#a31010" href="' + CFG.day6 + '">Vstupenky 6. 12.<small>dětská i dospělá</small></a>' +
            '</div>' +
            '<div class="mk-from">Vstupenky ' + CFG.priceFrom + '</div>' +
          '</div>' +
          '<div class="mk-art">' +
            '<a class="mk-card mk-card--5" href="' + CFG.day5 + '" aria-label="Mikulášská nadílka 5. 12."><img src="' + IMG + 'mikulas-5.webp" alt="Mikulášská nadílka 5. 12."></a>' +
            '<a class="mk-card mk-card--6" href="' + CFG.day6 + '" aria-label="Mikulášská nadílka 6. 12."><img src="' + IMG + 'mikulas-6.webp" alt="Mikulášská nadílka 6. 12."></a>' +
            '<span class="mk-time">15–19 hod.</span>' +
          '</div>' +
        '</div>' +
      '</section>';
    var t = topTarget();
    if (t) t.insertBefore(hero, t.firstChild);
    place();
  }

  /* kategorie + výpis produktů s Mikulášem */
  function decorateCards() {
    var cards = document.querySelectorAll('.products .product');
    Array.prototype.forEach.call(cards, function (card) {
      var a = card.querySelector('a.image');
      var href = a ? (a.getAttribute('href') || '') : '';
      var m = href.match(/\/(5|6)--12-mikulasska-nadilka/);
      if (!m) return;
      if (!a.querySelector('.mk-pill')) {
        var pill = document.createElement('span'); pill.className = 'mk-pill';
        pill.textContent = m[1] + '. 12.';
        pill.style.cssText = m[1] === '5' ? '--c:#ff3d5e;--cd:#b01f3a' : '--c:#f21f1f;--cd:#a31010';
        a.style.position = 'relative'; a.appendChild(pill);
      }
      Array.prototype.forEach.call(card.querySelectorAll('.p-bottom a, a.btn'), function (b) {
        if (/^\s*Detail\s*$/i.test(b.textContent)) { b.textContent = 'Vybrat vstupenku'; b.classList.add('mk-vybrat'); }
      });
    });
  }

  function init() { addStyle(); buildHome(); place(); decorateCards(); }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  document.addEventListener('ShoptetDOMPageContentLoaded', init);
  document.addEventListener('ShoptetDOMContentLoaded', init);

  // jojopark.js může vložit voucher banner později – po dobu 5 s hlídáme pořadí
  if (window.MutationObserver) {
    var obs = new MutationObserver(function () { place(); });
    var start = function () { obs.observe(document.body, { childList: true, subtree: true }); setTimeout(function () { obs.disconnect(); }, 5000); };
    if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
  }
})();
