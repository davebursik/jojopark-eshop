# Jojo Park eshop – úpravy pro Shoptet

- `jojopark.js` – banner, sekce na homepage, vzhled produktových karet, počet kusů (− 1 +)
- `img/` – obrázky pro banner (z vašich poukazů) – musí být ve stejné složce jako skript
- `product-covers/` – obrázky produktů 1200×900 px k nahrání do Shoptetu (názvy souborů odpovídají produktům)

## Vložení do Shoptetu
Administrace → Vzhled a obsah → Editor → Hlavička:

    <script src="https://cdn.jsdelivr.net/gh/TVUJ-UCET/NAZEV-REPA@main/jojopark.js" defer></script>

Po změně souborů na GitHubu je potřeba počkat na cache jsDelivr, nebo použít verzi (tag) např. `@v1.1`.
Odkaz na vyčištění cache: https://www.jsdelivr.com/tools/purge

Nastavení (stuha, kategorie, max. počet kusů) je nahoře v `jojopark.js` v objektu `CFG`.
