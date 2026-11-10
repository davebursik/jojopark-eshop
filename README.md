# Jojo Park eshop – úpravy pro Shoptet

- `jojopark.js` – vzhled eshopu: banner s vouchery, karty produktů, počet kusů (trvalé)
- `mikulas.js` – hero Mikulášská nadílka 2026 (dočasné, před vouchery; po 7. 12. 2026 se samo vypne)
- `img/` – obrázky pro bannery (musí ležet vedle skriptů)
- `product-covers/` – obrázky produktů pro vouchery

## Shoptet → Vzhled a obsah → Editor → Záhlaví

    <script src="https://cdn.jsdelivr.net/gh/davebursik/jojopark-eshop@main/jojopark.js" defer></script>
    <script src="https://cdn.jsdelivr.net/gh/davebursik/jojopark-eshop@main/mikulas.js" defer></script>

Po akci smaž jen druhý řádek (mikulas.js). Soubory z GitHubu mazat nemusíš.
Po změně souborů na GitHubu vyčisti cache: https://www.jsdelivr.com/tools/purge
