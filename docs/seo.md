# SEO techniczne i wielojęzyczne — checklista

Stosuj przy każdej stronie i przy metadanych.

- Każda strona: unikalny <title> i meta description przez generateMetadata(), zasilane z pól Drupala.
- Architektura wielojęzyczna: tłumaczenia w Drupalu (moduły core Language + Content Translation; AI przez TMGMT później). Nigdy nie tłumacz w runtime frontendu.
- Każdy język na własnym URL; emituj hreflang (z x-default) dla wszystkich wersji; atrybut lang strony zgodny z treścią.
- Canonical na każdej stronie; brak duplikacji treści między wariantami języka/ścieżki.
- Open Graph + Twitter cards z danych Drupala.
- schema.org JSON-LD: Organization w całym serwisie, Product na stronach systemów/urządzeń, BreadcrumbList z okruszkami.
- Dynamiczny sitemap.ts obejmujący wszystkie języki; robots.ts z sensownymi regułami.
- Semantyczny HTML; opisowy tekst linków (nigdy „kliknij tutaj").
- Terminologia techniczna/bezpieczeństwa (ATEX, IEC, Ex): tłumaczenia AI sprawdzone przez człowieka przed publikacją.
- Przy propozycji strony opisz, jak obsłużone są title, description, hreflang i canonical.
