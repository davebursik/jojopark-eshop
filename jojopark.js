/*!
 * Jojo Park eshop – vlastní vzhled pro Shoptet (styl vánočního banneru)
 * - banner na homepage ze skutečných poukazů, maskota a nadpisu
 * - hravé produktové karty + obrázky podle produktu
 * - volba počtu kusů (− 1 +)
 */
(function () {
  'use strict';

  /* ===== NASTAVENÍ ===== */
  var CFG = {
    category: '/darkove-poukazy/',
    ribbon: 'Vánoční inspirace',   // '' = bez červené stuhy
    maxQty: 20,
    swapImages: true               // obrázky karet z /product-covers; po nahrání do Shoptetu dej false
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
  :root{--jj-sky1:#4a78dd;--jj-sky2:#6b9be9;--jj-teal:#1c7c94;--jj-cyan:#29b6d9;--jj-green:#78c828;--jj-green-d:#4e8a14;
    --jj-navy:#2a2368;--jj-pink:#e91e8c;--jj-pink-d:#a8135f;--jj-orange:#f39200;--jj-orange-d:#b86d00}
  .jj *{box-sizing:border-box}
  .jj{font-family:'Barlow Semi Condensed','Arial Narrow',Arial,sans-serif}

  /* ---------- Banner ---------- */
  .jj-hero{position:relative;overflow:hidden;margin:0 0 34px;border-radius:26px;color:#fff;isolation:isolate;
    background:linear-gradient(180deg,var(--jj-sky1) 0%,var(--jj-sky2) 55%,#8fb4f1 100%);
    box-shadow:0 14px 34px rgba(35,70,140,.28)}
  .jj-hill{position:absolute;left:0;right:0;bottom:0;width:100%;height:120px;z-index:0;display:block}
  .jj-flake{position:absolute;z-index:0;pointer-events:none;animation:jjfloat 7s ease-in-out infinite}
  .jj-hero__ribbon{position:absolute;z-index:6;top:40px;left:-68px;width:270px;padding:7px 0 7px 14px;text-align:center;
    background:linear-gradient(#e8180f,#c4130c);color:#fff;font-weight:700;font-size:17px;letter-spacing:.3px;
    transform:rotate(-37deg);box-shadow:0 3px 8px rgba(0,0,0,.3)}
  .jj-hero__in{position:relative;z-index:2;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center;gap:6px;padding:46px 36px 60px 84px}
  .jj-hero__title{margin:0 0 18px;line-height:0}
  .jj-hero__title img{width:100%;max-width:490px;height:auto;display:block;filter:drop-shadow(0 3px 0 rgba(20,40,120,.25))}
  .jj-hero__lead{margin:0 0 26px;max-width:500px;font-style:italic;font-weight:600;font-size:clamp(20px,2.1vw,28px);line-height:1.22;color:var(--jj-navy)}
  .jj-btn{display:inline-block;padding:15px 36px;border-radius:14px;background:var(--jj-green);color:#fff!important;
    font-weight:700;font-size:23px;text-decoration:none!important;box-shadow:0 6px 0 var(--jj-green-d),0 12px 20px rgba(0,0,0,.2);
    transition:transform .15s,box-shadow .15s}
  .jj-btn:hover{transform:translateY(4px);box-shadow:0 2px 0 var(--jj-green-d),0 6px 10px rgba(0,0,0,.2)}
  .jj-hero__art{position:relative;display:block;width:100%;max-width:660px;justify-self:end;aspect-ratio:1.42/1}
  .jj-v{position:absolute;display:block;height:auto;filter:drop-shadow(0 9px 12px rgba(15,30,90,.38));
    transform:rotate(var(--r));animation:jjdrop .7s cubic-bezier(.2,1.3,.4,1) both;animation-delay:var(--d)}
  .jj-v1{left:0;top:2%;width:41%;--r:-4deg;--d:.05s;z-index:1}
  .jj-v2{left:14%;top:0;width:41%;--r:3deg;--d:.15s;z-index:2}
  .jj-v3{left:0;top:53%;width:39%;--r:-3deg;--d:.25s;z-index:1}
  .jj-v4{left:14%;top:61%;width:39%;--r:2deg;--d:.35s;z-index:2}
  .jj-v5{left:55%;top:36%;width:41%;--r:-5deg;--d:.45s;z-index:1}
  .jj-v6{left:62%;top:50%;width:41%;--r:3deg;--d:.55s;z-index:2}
  .jj-mascot{position:absolute;left:58%;top:-3%;width:34%;height:auto;z-index:4;transform-origin:50% 60%;animation:jjwiggle 3.6s ease-in-out infinite;filter:drop-shadow(0 6px 8px rgba(15,30,90,.3))}
  @keyframes jjdrop{from{opacity:0;transform:translateY(-34px) rotate(var(--r))}to{opacity:1;transform:rotate(var(--r))}}
  @keyframes jjwiggle{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(4deg) translateY(-4px)}}
  @keyframes jjfloat{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(8px) rotate(12deg)}}
  @media (prefers-reduced-motion:reduce){.jj-v,.jj-mascot,.jj-flake{animation:none}}
  @media (max-width:900px){
    .jj-hero{border-radius:18px}
    .jj-hero__in{grid-template-columns:1fr;padding:70px 18px 74px;gap:6px}
    .jj-hero__art{max-width:520px;justify-self:center;margin-top:14px}
    .jj-hero__title img{max-width:440px}
    .jj-hero__ribbon{top:30px;left:-78px;width:250px;font-size:14px}
    .jj-btn{display:block;text-align:center}
  }

  /* ---------- Nadpisy a kroky ---------- */
  body.in-index #content h1{font-family:'Amatic SC','Barlow Semi Condensed',sans-serif!important;font-weight:700;font-size:clamp(38px,5vw,60px)!important;
    text-transform:uppercase;letter-spacing:1px;color:var(--jj-teal)!important;text-align:center;line-height:1.05;margin:10px 0 8px!important}
  body.in-index #content h1+*,body.in-index #content .homepage-box h2{text-align:center}
  .jj-sec{margin:10px 0 40px}
  .jj-sec__h{margin:0 0 22px;text-align:center;font-family:'Amatic SC','Barlow Semi Condensed',sans-serif;font-size:clamp(36px,4.4vw,56px);
    font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--jj-teal)}
  .jj-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
  .jj-step{position:relative;padding:24px 20px 22px 92px;border-radius:22px;font-size:19px;line-height:1.3;color:#3b3b4f;
    background:linear-gradient(180deg,#eaf2ff,#f6f9ff);border:2px solid #dbe7fb}
  .jj-step::before{content:attr(data-n);position:absolute;left:20px;top:50%;transform:translateY(-50%) rotate(-6deg);width:54px;height:54px;border-radius:50%;
    color:#fff;font-size:34px;font-weight:700;display:flex;align-items:center;justify-content:center;
    background:var(--c);box-shadow:0 4px 0 var(--cd),inset -4px -4px 0 rgba(0,0,0,.12)}
  .jj-step b{display:block;font-size:23px;color:var(--jj-navy);margin-bottom:2px}
  @media (max-width:900px){.jj-steps{grid-template-columns:1fr}}

  /* ---------- Produktové karty ---------- */
  .products-block.products,.products.products-block,.products-page .products{display:flex;flex-wrap:wrap;gap:26px;margin:0 0 34px!important;padding:0!important}
  .products-block .product{float:none!important;margin:0!important;padding:0!important;min-width:260px;flex:1 1 calc(33.333% - 18px);max-width:calc(33.333% - 18px);width:calc(33.333% - 18px)!important}
  @media (max-width:991px){.products-block .product{flex-basis:calc(50% - 13px);max-width:calc(50% - 13px);width:calc(50% - 13px)!important}}
  @media (max-width:560px){.products-block .product{flex-basis:100%;max-width:100%;width:100%!important}}
  .products-block .product .p{position:relative;display:flex;flex-direction:column;height:100%;background:#fff;border:3px solid #fff;border-radius:26px;overflow:hidden;
    box-shadow:0 8px 22px rgba(35,70,140,.16),0 0 0 1px #dbe7fb;transition:transform .25s cubic-bezier(.2,1.4,.4,1),box-shadow .25s;padding:0!important;text-align:center}
  .products-block .product:nth-child(3n+1) .p:hover{transform:translateY(-8px) rotate(-1.2deg)}
  .products-block .product:nth-child(3n+2) .p:hover{transform:translateY(-8px) rotate(1deg)}
  .products-block .product:nth-child(3n) .p:hover{transform:translateY(-8px) rotate(-.8deg)}
  .products-block .product .p:hover{box-shadow:0 18px 34px rgba(35,70,140,.26),0 0 0 1px #c3d6f5}
  .products-block .product .image{position:relative;display:block;background:var(--jj-sky2);margin:0!important;padding:0!important;overflow:hidden;border-radius:22px 22px 0 0}
  .products-block .product .image img{width:100%!important;height:auto!important;display:block;transition:transform .4s}
  .products-block .product .p:hover .image img{transform:scale(1.05)}
  .jj-pill{position:absolute;left:12px;bottom:12px;z-index:2;padding:6px 14px;border-radius:999px;color:#fff;font-weight:700;font-size:16px;letter-spacing:.2px;
    background:var(--c);box-shadow:0 3px 0 var(--cd);transform:rotate(-3deg)}
  .products-block .product .p-in{display:flex;flex-direction:column;flex:1;padding:16px 18px 20px!important}
  .products-block .product .p-in-in{flex:1}
  .products-block .product a.name{display:block;margin:0 0 8px;font-family:'Barlow Semi Condensed',inherit,sans-serif;font-size:21px;font-weight:700;line-height:1.18;color:var(--jj-navy)!important;text-decoration:none!important}
  .products-block .product a.name:hover{color:var(--jj-teal)!important}
  .products-block .product .prices,.products-block .product .price-final{margin:4px 0 14px!important}
  .products-block .product .price-final strong,.products-block .product .price strong{font-size:36px;font-weight:700;line-height:1;color:var(--jj-pink)}
  .products-block .product .p-bottom{margin-top:auto}
  .products-block .product .add-to-cart-button,.products-block .product button.btn-cart{
    background:var(--jj-green)!important;color:#fff!important;border:0!important;border-radius:14px!important;font-size:20px!important;font-weight:700!important;
    padding:12px 22px!important;box-shadow:0 5px 0 var(--jj-green-d);cursor:pointer;transition:transform .15s,box-shadow .15s;min-height:50px;text-transform:none}
  .products-block .product .add-to-cart-button:hover{transform:translateY(3px);box-shadow:0 2px 0 var(--jj-green-d)}
  .products-block .product .availability,.products-block .product .ratings-wrapper,.products-block .product .p-code,.products-block .product .code{display:none!important}

  /* ---------- Počet kusů ---------- */
  .jj-qty-row{display:flex;flex-wrap:wrap;align-items:stretch;justify-content:center;gap:10px;margin-top:6px}
  .jj-qty{display:inline-flex;align-items:stretch;border:3px solid #dbe7fb;border-radius:14px;overflow:hidden;background:#fff}
  .jj-qty button{width:40px;border:0;background:#eaf2ff;color:var(--jj-teal);font-size:26px;font-weight:700;cursor:pointer;line-height:1;padding:0}
  .jj-qty button:hover{background:#d3e4fb}
  .jj-qty input{width:48px;border:0!important;text-align:center;font-weight:700;font-size:20px;padding:0!important;margin:0!important;height:auto!important;
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

  /* ===== SNĚHOVÉ VLOČKY + KOPEC ===== */
  function flake(size, left, top, op, delay) {
    var arm = '<path d="M0,0V-9M-2.6,-6.6L0,-4L2.6,-6.6"/>';
    var g = '';
    for (var a = 0; a < 360; a += 60) g += '<g transform="rotate(' + a + ')">' + arm + '</g>';
    return '<svg class="jj-flake" viewBox="-10 -10 20 20" width="' + size + '" height="' + size + '" style="left:' + left + ';top:' + top +
      ';opacity:' + op + ';animation-delay:' + delay + 's" fill="none" stroke="#fff" stroke-width="1.3" stroke-linecap="round">' + g + '</svg>';
  }
  var HILL = '<svg class="jj-hill" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="jjh" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#dbe8fc"/></linearGradient></defs>' +
    '<path d="M0,70 C160,20 330,86 560,58 C800,28 960,70 1200,34 L1200,120 L0,120Z" fill="url(#jjh)"/></svg>';

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
  function v(cls, img, alt) {
    return '<img class="jj-v ' + cls + '" src="' + IMG + img + '.webp" alt="' + alt + '" loading="eager">';
  }

  function buildHome() {
    if (!isHome() || document.getElementById('jj-home')) return;

    var ribbon = CFG.ribbon ? '<div class="jj-hero__ribbon">' + CFG.ribbon + '</div>' : '';
    var top = document.createElement('div');
    top.id = 'jj-home'; top.className = 'jj';
    top.innerHTML =
      '<section class="jj-hero">' + HILL + ribbon +
        flake(46, '47%', '7%', .55, 0) + flake(30, '41%', '58%', .4, 1.5) + flake(64, '90%', '44%', .45, .8) +
        flake(38, '4%', '66%', .4, 2.2) + flake(26, '70%', '8%', .5, 3) +
        '<div class="jj-hero__in">' +
          '<div>' +
            '<h2 class="jj-hero__title"><img src="' + IMG + 'title.webp" alt="Dárek pro děti i dospělé" width="818" height="123"></h2>' +
            '<p class="jj-hero__lead">Celodenní vstup do našeho rodinného centra ocení všichni, kteří chtějí prožít se svými dětmi spoustu zábavy…</p>' +
            '<a class="jj-btn" href="' + CFG.category + '">Vybrat dárkový poukaz</a>' +
          '</div>' +
          '<a class="jj-hero__art" href="' + CFG.category + '" aria-label="Dárkové poukazy">' +
            v('jj-v1', 'detsky-po-pa', 'Dárkový poukaz – dětský vstup Po–Pá') +
            v('jj-v2', 'detsky-so-ne', 'Dárkový poukaz – dětský vstup So, Ne, svátky') +
            v('jj-v3', 'rodinny-2p2-po-pa', 'Rodinná vstupenka 2+2 Po–Pá') +
            v('jj-v4', 'rodinny-2p2-so-ne', 'Rodinná vstupenka 2+2 So, Ne, svátky') +
            v('jj-v5', 'rodinny-1p2-po-pa', 'Rodinná vstupenka 1+2 Po–Pá') +
            v('jj-v6', 'rodinny-1p2-so-ne', 'Rodinná vstupenka 1+2 So, Ne, svátky') +
            '<img class="jj-mascot" src="' + IMG + 'mascot.webp" alt="" width="358" height="315">' +
          '</a>' +
        '</div>' +
      '</section>';
    insertAtTop(top);

    // „Jak to funguje“ pod výpis produktů
    var steps = document.createElement('div');
    steps.id = 'jj-steps'; steps.className = 'jj';
    steps.innerHTML =
      '<section class="jj-sec"><h2 class="jj-sec__h">Jak to funguje</h2><div class="jj-steps">' +
        '<div class="jj-step" data-n="1" style="--c:var(--jj-green);--cd:var(--jj-green-d)"><b>Vyberte poukaz</b>Zvolte typ vstupu a počet kusů.</div>' +
        '<div class="jj-step" data-n="2" style="--c:var(--jj-orange);--cd:var(--jj-orange-d)"><b>Objednejte a zaplaťte</b>Celý nákup proběhne online v pár klikech.</div>' +
        '<div class="jj-step" data-n="3" style="--c:var(--jj-pink);--cd:var(--jj-pink-d)"><b>Poukaz dorazí online</b>Můžete ho mít připravený k předání během chvilky.</div>' +
      '</div></section>';
    var list = document.querySelector('.products-block, .products');
    if (list && list.parentNode) list.parentNode.insertBefore(steps, list.nextSibling);
    else top.appendChild(steps);
  }

  /* ===== KARTY: obrázky + štítek dne ===== */
  var COVERS = [
    ['1-dospely-2-deti--pondeli-patek', 'rodinny-1plus2-po-pa'],
    ['1-dospely-2-deti--vikendy-a-svatky', 'rodinny-1plus2-so-ne'],
    ['2-dospeli-2-deti--pondeli-patek', 'rodinny-2plus2-po-pa'],
    ['2-dospeli-2-deti--vikendy-a-svatky', 'rodinny-2plus2-so-ne'],
    ['detsky-celodenni-vstup-pondeli-patek', 'darkovy-poukaz-detsky-po-pa'],
    ['detsky-celodenni-vstup-vikendy-a-svatky', 'darkovy-poukaz-detsky-so-ne'],
    ['dospely', 'darkovy-poukaz-dospely']
  ];

  function decorateCards() {
    var cards = document.querySelectorAll('.products .product');
    Array.prototype.forEach.call(cards, function (card) {
      var a = card.querySelector('a.image');
      if (!a) return;
      var img = a.querySelector('img');
      var href = a.getAttribute('href') || '';

      if (CFG.swapImages && img && !img.dataset.jjSwap) {
        for (var i = 0; i < COVERS.length; i++) {
          if (href.indexOf(COVERS[i][0]) !== -1) {
            img.dataset.jjSwap = '1';
            ['srcset', 'data-src', 'data-srcset', 'width', 'height'].forEach(function (n) { img.removeAttribute(n); });
            img.src = BASE + 'product-covers/' + COVERS[i][1] + '.jpg';
            img.alt = a.getAttribute('title') || 'Dárkový poukaz';
            break;
          }
        }
      }

      if (!a.querySelector('.jj-pill')) {
        var nm = (card.querySelector('a.name') || a).textContent + ' ' + href;
        var pill = document.createElement('span'); pill.className = 'jj-pill';
        if (/v[ií]kend|vikendy|svatk|svátk/i.test(nm)) { pill.textContent = 'So · Ne · svátky'; pill.style.cssText = '--c:#78c828;--cd:#4e8a14'; }
        else if (/pondeli|pondělí|Po–P|patek|pátek/i.test(nm)) { pill.textContent = 'Po – Pá'; pill.style.cssText = '--c:#29b6d9;--cd:#1c7c94'; }
        else pill = null;
        if (pill) a.appendChild(pill);
      }
    });
  }

  /* ===== POČET KUSŮ ===== */
  function clamp(x) {
    x = parseInt(x, 10);
    return isNaN(x) || x < 1 ? 1 : Math.min(x, CFG.maxQty);
  }
  function enhanceForm(form) {
    if (form.dataset.jjQty) return;
    var btn = form.querySelector('.add-to-cart-button, button[type="submit"], input[type="submit"]');
    if (!btn) return;
    if (form.querySelector('.quantity, .amount-wrapper, input.amount[type="number"], input[name="amount"][type="text"]')) { form.dataset.jjQty = 'native'; return; }
    form.dataset.jjQty = '1';

    var input = form.querySelector('input[name="amount"]');
    if (!input) { input = document.createElement('input'); input.name = 'amount'; }
    input.type = 'number'; input.min = '1'; input.max = String(CFG.maxQty); input.value = '1';
    input.setAttribute('inputmode', 'numeric'); input.setAttribute('aria-label', 'Počet kusů'); input.setAttribute('autocomplete', 'off');

    var box = document.createElement('span'); box.className = 'jj-qty';
    var minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', 'Ubrat kus');
    var plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', 'Přidat kus');
    minus.onclick = function () { input.value = clamp((+input.value || 1) - 1); };
    plus.onclick = function () { input.value = clamp((+input.value || 1) + 1); };
    input.addEventListener('change', function () { input.value = clamp(input.value); });
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); btn.click(); } });
    box.appendChild(minus); box.appendChild(input); box.appendChild(plus);

    var row = document.createElement('div'); row.className = 'jj-qty-row';
    btn.parentNode.insertBefore(row, btn);
    row.appendChild(box); row.appendChild(btn);
  }
  function enhanceProducts() {
    Array.prototype.forEach.call(document.querySelectorAll('.products .product form, .product form.pr-action, form.pr-action'), enhanceForm);
  }

  /* ===== start ===== */
  function init() { addStyle(); buildHome(); decorateCards(); enhanceProducts(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  document.addEventListener('ShoptetDOMPageContentLoaded', init);
  document.addEventListener('ShoptetDOMContentLoaded', init);
})();
