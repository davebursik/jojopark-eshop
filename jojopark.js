/*!
 * Jojo Park eshop – vlastní úpravy pro Shoptet
 * - banner na homepage (skutečné poukazy z /img)
 * - sekce „Vyberte poukaz“ + „Jak to funguje“ na homepage
 * - hezké produktové karty
 * - volba počtu kusů (− 1 +) ve výpisu i v detailu
 */
(function () {
  'use strict';

  /* ===== NASTAVENÍ ===== */
  var CFG = {
    category: '/darkove-poukazy/',
    ribbon: 'Vánoční inspirace',   // '' = bez červené stuhy
    maxQty: 20,
    swapImages: true   // obrázky karet podle produktu (z /product-covers); po nahrání obrázků do Shoptetu dej false
  };

  var script = document.currentScript || document.querySelector('script[src*="jojopark.js"]');
  var BASE = script && script.src ? script.src.replace(/[^\/]*(\?.*)?$/, '') : '/';
  var IMG = BASE + 'img/';

  /* ===== FONTY ===== */
  if (!document.getElementById('jj-fonts')) {
    var l = document.createElement('link');
    l.id = 'jj-fonts'; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Amatic+SC:wght@700&family=Barlow+Semi+Condensed:ital,wght@0,500;0,600;0,700;1,600&display=swap';
    document.head.appendChild(l);
  }

  /* ===== CSS ===== */
  var css = `
  :root{--jj-blue:#6797e9;--jj-teal:#1c7c94;--jj-cyan:#29b6d9;--jj-green:#78c828;--jj-green-d:#4e8a14;--jj-navy:#2a2368;--jj-pink:#e91e8c;--jj-orange:#f39200;--jj-gray:#666}
  .jj *{box-sizing:border-box}
  .jj{font-family:'Barlow Semi Condensed',inherit,sans-serif}

  /* ---------- Banner ---------- */
  .jj-hero{position:relative;overflow:hidden;margin:0 0 36px;border-radius:22px;color:#fff;
    background:radial-gradient(1200px 500px at 85% 0%,#8bb3f3 0%,transparent 60%),linear-gradient(160deg,#6c9bec,#5a8be0);
    box-shadow:0 10px 30px rgba(35,70,140,.25)}
  .jj-hero__flake{position:absolute;color:rgba(255,255,255,.2);line-height:1;pointer-events:none;user-select:none}
  .jj-hero__ribbon{position:absolute;z-index:5;top:40px;left:-68px;width:270px;padding:7px 0 7px 14px;text-align:center;
    background:linear-gradient(#e8180f,#c4130c);color:#fff;font-weight:700;font-size:17px;letter-spacing:.3px;
    transform:rotate(-37deg);box-shadow:0 3px 8px rgba(0,0,0,.3)}
  .jj-hero__in{display:grid;grid-template-columns:1.05fr 1fr;align-items:center;gap:20px;padding:44px 44px 44px 92px;position:relative;z-index:2}
  .jj-hero__title{margin:0 0 14px;font-family:'Amatic SC','Barlow Semi Condensed',Impact,sans-serif;font-weight:700;
    font-size:clamp(46px,6.4vw,88px);line-height:.95;letter-spacing:1px;text-transform:uppercase;color:#fff}
  .jj-hero__lead{margin:0 0 26px;max-width:520px;font-style:italic;font-weight:600;font-size:clamp(19px,2.1vw,27px);line-height:1.25;color:var(--jj-navy)}
  .jj-btn{display:inline-block;padding:15px 34px;border-radius:12px;background:var(--jj-green);color:#fff!important;
    font-weight:700;font-size:21px;text-decoration:none!important;box-shadow:0 5px 0 var(--jj-green-d),0 10px 18px rgba(0,0,0,.18);
    transition:transform .15s,box-shadow .15s}
  .jj-btn:hover{transform:translateY(3px);box-shadow:0 2px 0 var(--jj-green-d),0 5px 10px rgba(0,0,0,.18)}
  .jj-hero__note{margin-top:16px;font-size:16px;color:#fff;opacity:.95;font-weight:600}
  .jj-hero__art{position:relative;aspect-ratio:1.28/1;width:100%;max-width:560px;justify-self:end}
  .jj-v{position:absolute;display:block;height:auto;filter:drop-shadow(0 8px 14px rgba(15,30,80,.35));transition:transform .25s}
  .jj-v1{left:0;top:3%;width:50%;transform:rotate(-6deg);z-index:1}
  .jj-v2{left:30%;top:0;width:50%;transform:rotate(4deg);z-index:2}
  .jj-v3{left:2%;top:50%;width:49%;transform:rotate(-3deg);z-index:3}
  .jj-v4{left:42%;top:55%;width:49%;transform:rotate(3deg);z-index:4}
  .jj-hero:hover .jj-v1{transform:rotate(-8deg) translateY(-3px)}
  .jj-hero:hover .jj-v2{transform:rotate(6deg) translateY(-3px)}
  .jj-mascot{position:absolute;right:-3%;top:-6%;width:34%;height:auto;z-index:5;transform:rotate(4deg)}
  @media (max-width:860px){
    .jj-hero{border-radius:16px}
    .jj-hero__in{grid-template-columns:1fr;padding:78px 20px 24px;gap:8px}
    .jj-hero__art{max-width:460px;justify-self:center;margin-top:6px}
    .jj-hero__ribbon{top:30px;left:-78px;width:250px;font-size:14px}
    .jj-btn{display:block;text-align:center}
  }

  /* ---------- Sekce na homepage ---------- */
  .jj-sec{margin:0 0 40px}
  .jj-sec__h{margin:0 0 20px;text-align:center;font-family:'Amatic SC','Barlow Semi Condensed',sans-serif;font-size:clamp(34px,4vw,50px);
    font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--jj-teal)}
  .jj-tiles{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
  .jj-tile{display:flex;flex-direction:column;align-items:center;padding:22px 18px 20px;border-radius:18px;background:#fff;
    border:1px solid #e3eaf3;box-shadow:0 4px 14px rgba(30,60,120,.08);text-decoration:none!important;color:inherit!important;transition:transform .2s,box-shadow .2s}
  .jj-tile:hover{transform:translateY(-5px);box-shadow:0 12px 26px rgba(30,60,120,.18)}
  .jj-tile img{width:100%;max-width:300px;height:auto;filter:drop-shadow(0 6px 10px rgba(0,0,0,.2));margin-bottom:16px}
  .jj-tile b{font-size:26px;color:var(--jj-teal);font-weight:700}
  .jj-tile span{margin:4px 0 14px;font-size:17px;color:#555;text-align:center}
  .jj-tile i{font-style:normal;font-weight:700;color:var(--jj-green-d);font-size:18px}
  .jj-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;counter-reset:s}
  .jj-step{position:relative;padding:22px 20px 20px 78px;border-radius:16px;background:#f2f7fd;font-size:18px;line-height:1.35;color:#333}
  .jj-step::before{counter-increment:s;content:counter(s);position:absolute;left:20px;top:50%;transform:translateY(-50%);width:44px;height:44px;border-radius:50%;
    background:var(--jj-pink);color:#fff;font-size:26px;font-weight:700;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 0 #a8135f}
  .jj-step b{display:block;font-size:21px;color:var(--jj-teal)}
  @media (max-width:860px){.jj-tiles,.jj-steps{grid-template-columns:1fr}.jj-tile img{max-width:260px}}

  /* ---------- Produktové karty ---------- */
  .products-block.products,.products.products-block,.products-page .products{display:flex;flex-wrap:wrap;gap:24px;margin:0 0 30px!important;padding:0!important}
  .products-block .product{float:none!important;width:calc(33.333% - 16px)!important;margin:0!important;padding:0!important;min-width:260px;flex:1 1 calc(33.333% - 16px);max-width:calc(33.333% - 16px)}
  @media (max-width:991px){.products-block .product{flex-basis:calc(50% - 12px);max-width:calc(50% - 12px);width:calc(50% - 12px)!important}}
  @media (max-width:560px){.products-block .product{flex-basis:100%;max-width:100%;width:100%!important}}
  .products-block .product .p{display:flex;flex-direction:column;height:100%;background:#fff;border:1px solid #e3eaf3;border-radius:18px;overflow:hidden;
    box-shadow:0 4px 14px rgba(30,60,120,.08);transition:transform .2s,box-shadow .2s;padding:0!important;text-align:center}
  .products-block .product .p:hover{transform:translateY(-5px);box-shadow:0 14px 28px rgba(30,60,120,.18)}
  .products-block .product .image{display:block;background:#eaf1fc;margin:0!important;padding:0!important;overflow:hidden}
  .products-block .product .image img{width:100%!important;height:auto!important;display:block;transition:transform .35s}
  .products-block .product .p:hover .image img{transform:scale(1.04)}
  .products-block .product .p-in{display:flex;flex-direction:column;flex:1;padding:16px 18px 18px!important}
  .products-block .product .p-in-in{flex:1}
  .products-block .product a.name{display:block;margin:0 0 10px;font-family:'Barlow Semi Condensed',inherit,sans-serif;font-size:20px;font-weight:700;line-height:1.2;color:var(--jj-teal)!important;text-decoration:none!important}
  .products-block .product a.name:hover{color:var(--jj-green-d)!important}
  .products-block .product .prices,.products-block .product .price-final{margin:6px 0 12px!important}
  .products-block .product .price-final strong,.products-block .product .price strong{font-size:30px;font-weight:700;color:var(--jj-navy)}
  .products-block .product .p-bottom{margin-top:auto}
  .products-block .product .add-to-cart-button,.products-block .product button.btn-cart{
    background:var(--jj-green)!important;color:#fff!important;border:0!important;border-radius:12px!important;font-size:18px!important;font-weight:700!important;
    padding:12px 22px!important;box-shadow:0 4px 0 var(--jj-green-d);cursor:pointer;transition:transform .15s,box-shadow .15s;min-height:46px}
  .products-block .product .add-to-cart-button:hover{transform:translateY(2px);box-shadow:0 2px 0 var(--jj-green-d)}
  .products-block .product .availability,.products-block .product .ratings-wrapper,.products-block .product .p-code,.products-block .product .code{display:none!important}

  /* ---------- Počet kusů ---------- */
  .jj-qty-row{display:flex;flex-wrap:wrap;align-items:stretch;justify-content:center;gap:10px;margin-top:6px}
  .jj-qty{display:inline-flex;align-items:stretch;border:2px solid #cfdbe9;border-radius:12px;overflow:hidden;background:#fff}
  .jj-qty button{width:38px;border:0;background:#eef4fb;color:var(--jj-teal);font-size:24px;font-weight:700;cursor:pointer;line-height:1;padding:0}
  .jj-qty button:hover{background:#d9e7f6}
  .jj-qty input{width:48px;border:0!important;text-align:center;font-weight:700;font-size:18px;padding:0!important;margin:0!important;height:auto!important;
    box-shadow:none!important;background:#fff!important;color:var(--jj-navy)!important;-moz-appearance:textfield}
  .jj-qty input::-webkit-outer-spin-button,.jj-qty input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}
  .jj-qty-row .add-to-cart-button,.jj-qty-row button.btn-cart{flex:1 1 auto}
  `;

  function addStyle() {
    if (document.getElementById('jj-style')) return;
    var s = document.createElement('style');
    s.id = 'jj-style'; s.textContent = css;
    document.head.appendChild(s);
  }

  /* ===== HOMEPAGE ===== */
  function isHome() {
    return document.body.classList.contains('in-index') || location.pathname === '/' || location.pathname === '/index.php';
  }

  function insertAtTop(el) {
    var targets = ['.homepage-box', '#content .content-wrapper-in', '#content-wrapper', '#content', 'main'];
    for (var i = 0; i < targets.length; i++) {
      var t = document.querySelector(targets[i]);
      if (t) { t.insertBefore(el, t.firstChild); return true; }
    }
    return false;
  }

  function buildHome() {
    if (!isHome() || document.getElementById('jj-home')) return;

    var wrap = document.createElement('div');
    wrap.id = 'jj-home';
    wrap.className = 'jj';

    var ribbon = CFG.ribbon ? '<div class="jj-hero__ribbon">' + CFG.ribbon + '</div>' : '';

    wrap.innerHTML =
      '<section class="jj-hero">' + ribbon +
        '<span class="jj-hero__flake" style="top:8%;left:48%;font-size:44px">❄</span>' +
        '<span class="jj-hero__flake" style="bottom:10%;left:40%;font-size:30px">❄</span>' +
        '<span class="jj-hero__flake" style="top:50%;right:2%;font-size:54px">❄</span>' +
        '<div class="jj-hero__in">' +
          '<div>' +
            '<h2 class="jj-hero__title">Dárek pro děti<br>i dospělé</h2>' +
            '<p class="jj-hero__lead">Celodenní vstup do našeho rodinného centra ocení všichni, kteří chtějí prožít se svými dětmi spoustu zábavy…</p>' +
            '<a class="jj-btn" href="' + CFG.category + '">Vybrat dárkový poukaz</a>' +
            '<div class="jj-hero__note">Dárkové poukazy do Jojo Parku Ostrava</div>' +
          '</div>' +
          '<a class="jj-hero__art" href="' + CFG.category + '" aria-label="Dárkové poukazy">' +
            '<img class="jj-v jj-v1" src="' + IMG + 'detsky-po-pa.webp" alt="Dárkový poukaz – dětský vstup Po–Pá">' +
            '<img class="jj-v jj-v2" src="' + IMG + 'detsky-so-ne.webp" alt="Dárkový poukaz – dětský vstup So, Ne, svátky">' +
            '<img class="jj-v jj-v3" src="' + IMG + 'rodinny-2p2-po-pa.webp" alt="Rodinná vstupenka 2+2">' +
            '<img class="jj-v jj-v4" src="' + IMG + 'rodinny-1p2-so-ne.webp" alt="Rodinná vstupenka 1+2">' +
            '<img class="jj-mascot" src="' + IMG + 'mascot.webp" alt="">' +
          '</a>' +
        '</div>' +
      '</section>' +

      '<section class="jj-sec">' +
        '<h2 class="jj-sec__h">Jak to funguje</h2>' +
        '<div class="jj-steps">' +
          '<div class="jj-step"><b>Vyberte poukaz</b>Zvolte typ vstupu a počet kusů.</div>' +
          '<div class="jj-step"><b>Objednejte a zaplaťte</b>Celý nákup proběhne online v pár klikech.</div>' +
          '<div class="jj-step"><b>Poukaz dorazí online</b>Můžete ho mít připravený k předání během chvilky.</div>' +
        '</div>' +
      '</section>';

    // banner nahoru, kroky pod výpis produktů
    var steps = wrap.querySelector('.jj-sec');
    var hero = wrap.querySelector('.jj-hero');
    var top = document.createElement('div'); top.id = 'jj-home'; top.className = 'jj';
    top.appendChild(hero);
    insertAtTop(top);
    if (steps) {
      var list = document.querySelector('.products-block, .products');
      var box = document.createElement('div'); box.id = 'jj-steps'; box.className = 'jj';
      box.appendChild(steps);
      if (list && list.parentNode) list.parentNode.insertBefore(box, list.nextSibling);
      else top.appendChild(steps);
    }
  }

  /* ===== POČET KUSŮ ===== */
  function clamp(v) {
    v = parseInt(v, 10);
    return isNaN(v) || v < 1 ? 1 : Math.min(v, CFG.maxQty);
  }

  function enhanceForm(form) {
    if (form.dataset.jjQty) return;
    var btn = form.querySelector('.add-to-cart-button, button[type="submit"], input[type="submit"]');
    if (!btn) return;
    // Detail produktu už počet kusů má → necháme Shoptet
    if (form.querySelector('.quantity, .amount-wrapper, input.amount[type="number"], input[name="amount"][type="text"]')) { form.dataset.jjQty = 'native'; return; }
    form.dataset.jjQty = '1';

    var input = form.querySelector('input[name="amount"]');
    if (!input) { input = document.createElement('input'); input.name = 'amount'; }
    input.type = 'number'; input.min = '1'; input.max = String(CFG.maxQty); input.value = '1';
    input.setAttribute('inputmode', 'numeric'); input.setAttribute('aria-label', 'Počet kusů');
    input.setAttribute('autocomplete', 'off');

    var box = document.createElement('span'); box.className = 'jj-qty';
    var minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', 'Ubrat kus');
    var plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', 'Přidat kus');
    minus.onclick = function () { input.value = clamp((+input.value || 1) - 1); };
    plus.onclick = function () { input.value = clamp((+input.value || 1) + 1); };
    input.addEventListener('change', function () { input.value = clamp(input.value); });
    // Enter v poli = přidat do košíku
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); btn.click(); } });
    box.appendChild(minus); box.appendChild(input); box.appendChild(plus);

    var row = document.createElement('div'); row.className = 'jj-qty-row';
    btn.parentNode.insertBefore(row, btn);
    row.appendChild(box); row.appendChild(btn);
  }

  function enhanceProducts() {
    var forms = document.querySelectorAll('.products .product form, .product form.pr-action, form.pr-action');
    Array.prototype.forEach.call(forms, enhanceForm);
  }

  /* ===== OBRÁZKY PRODUKTŮ ===== */
  var COVERS = [
    ['1-dospely-2-deti--pondeli-patek', 'rodinny-1plus2-po-pa'],
    ['1-dospely-2-deti--vikendy-a-svatky', 'rodinny-1plus2-so-ne'],
    ['2-dospeli-2-deti--pondeli-patek', 'rodinny-2plus2-po-pa'],
    ['2-dospeli-2-deti--vikendy-a-svatky', 'rodinny-2plus2-so-ne'],
    ['detsky-celodenni-vstup-pondeli-patek', 'darkovy-poukaz-detsky-po-pa'],
    ['detsky-celodenni-vstup-vikendy-a-svatky', 'darkovy-poukaz-detsky-so-ne'],
    ['dospely', 'darkovy-poukaz-dospely']
  ];
  function swapImages() {
    if (!CFG.swapImages) return;
    var links = document.querySelectorAll('.products .product a.image');
    Array.prototype.forEach.call(links, function (a) {
      var img = a.querySelector('img');
      if (!img || img.dataset.jjSwap) return;
      var href = a.getAttribute('href') || '';
      for (var i = 0; i < COVERS.length; i++) {
        if (href.indexOf(COVERS[i][0]) !== -1) {
          img.dataset.jjSwap = '1';
          img.removeAttribute('srcset'); img.removeAttribute('data-src'); img.removeAttribute('data-srcset');
          img.src = BASE + 'product-covers/' + COVERS[i][1] + '.jpg';
          img.alt = (a.getAttribute('title') || img.alt || 'Dárkový poukaz');
          img.removeAttribute('width'); img.removeAttribute('height');
          break;
        }
      }
    });
  }

  /* ===== start ===== */
  function init() { addStyle(); buildHome(); swapImages(); enhanceProducts(); }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  document.addEventListener('ShoptetDOMPageContentLoaded', init);
  document.addEventListener('ShoptetDOMContentLoaded', init);
})();
