# CLAUDE.md

Wytyczne dla Claude Code przy pracy nad tym repozytorium.

## Czym jest projekt

Frontend (Next.js) w architekturze **Headless**: Drupal 11 jako backend/CMS
udostępniający dane przez **JSON:API**, Next.js jako warstwa prezentacji i UI.
Strona firmowa ATUT — systemy automatyki, bezpieczeństwa i monitoringu.
Język interfejsu i komentarzy w kodzie: **polski**.

## Stack technologiczny

- **Next.js 16** (App Router) — `next@16.2.6`
- **React 19** (`react@19.2.4`)
- **TypeScript** (strict, target ES2017, alias `@/*` → `./*`)
- **Tailwind CSS v4** (przez `@tailwindcss/postcss`, import w `app/globals.css`)
- **next-drupal** (`DrupalClient`) + bezpośredni `fetch` do JSON:API
- **Swiper** — slidery (HeroSlider)
- **framer-motion** — animacje
- **@phosphor-icons/react** — ikony
- **next/font/google** — Inter (body), JetBrains Mono (mono), Archivo Black (nagłówki)

## Komendy

- `npm run dev` — serwer dev (`next dev -H 0.0.0.0`, dostępny w sieci lokalnej)
- `npm run build` — build produkcyjny
- `npm run start` — serwer produkcyjny
- `npm run lint` — ESLint (`eslint-config-next`)

## Struktura katalogów

```
app/
  layout.tsx              # Root layout: fonty, <html lang="pl">, metadata globalne
  page.tsx                # Strona główna (Server Component, fetch slajdów z Drupala)
  globals.css             # Design system ATUT (zmienne CSS, grain overlay, reset)
  types.ts                # Interfejsy danych z Drupala (HeroSlide, Service, NewsItem…)
  sektory/[slug]/page.tsx # Dynamiczna podstrona sektora (Drupal + generateMetadata)
  components/
    layout/               # Header, Footer
    home/                 # Sekcje strony głównej (HeroSlider, ServicesGrid, …)
    ui/                   # Drobne elementy (FlagIcon, ScrollToTop)
drupal.ts                 # Instancja DrupalClient (next-drupal)
next.config.mjs           # remotePatterns dla obrazów + allowedDevOrigins
public/images/            # Statyczne grafiki (d-* desktop, m-* mobile)
public/videos/            # Klipy hero (hero-01.mp4 …) — niewersjonowane
```

## Konwencje architektoniczne

**Top-Down Data Flow.** Asynchroniczny `fetch` do JSON:API umieszczaj **wyłącznie
w serwerowych plikach podstron** (`app/**/page.tsx`). Komponenty wizualne są
„głupimi” odbiorcami danych przez `props`. Komponenty interaktywne oznaczaj
`"use client"` (np. HeroSlider).

**Drupal-first z fallbackiem.** Funkcje pobierające dane zwracają `T[] | null`.
Gdy Drupal nie odpowiada — `return null`, a komponent pokazuje dane domyślne.
Błędy łap w `try/catch`, loguj `console.warn`/`console.error`, nie przerywaj renderu.

**Mapowanie JSON:API.** Dane są zagnieżdżone w `data.attributes`; relacje (pliki,
referencje) w `data.relationships` + tablicy `included`. Do pobrania URL pliku
używaj wzorca-pomocnika `getFileUrl(relationship)` szukającego po `id` w `included`.
Media i referencje zawsze dołączaj przez `?include=` w endpoincie.

**SEO.** Strony statyczne — eksport obiektu `metadata`. Strony dynamiczne z Drupala
— `generateMetadata()` (title, description, Open Graph). Sektory pre-renderuj przez
`generateStaticParams()`.

**Dostępność (WCAG 2.1/2.2 AA).** Semantyczny HTML5, ARIA, obsługa
`prefers-reduced-motion`, `lang="pl"`.

## Zmienne środowiskowe

- `DRUPAL_BASE_URL` — serwerowy URL Drupala (używany w `fetch` w `page.tsx`)
- `NEXT_PUBLIC_DRUPAL_BASE_URL` — publiczny URL dla `DrupalClient` (`drupal.ts`)

Hosty obrazów Drupala muszą być dopisane w `next.config.mjs` → `images.remotePatterns`.

## Design system (globals.css)

Styl „Swiss Industrial Print + Tactical Telemetry”. Paleta i fonty jako zmienne CSS
(`--atut-paper`, `--atut-navy`, `--atut-red`, `--font-heading`…). Brak dark mode.
Globalny reset `border-radius: 0` na elementach przemysłowych; grain overlay na `body`.
Kolory i fonty bierz ze zmiennych CSS, nie hardkoduj wartości.

## Czego nie robić

- Nie umieszczaj `fetch` w komponentach prezentacyjnych — tylko w `page.tsx`.
- Nie zakładaj płaskiej struktury danych z Drupala — zawsze `data.attributes` + `included`.
- Nie hardkoduj URLi mediów — buduj je z `DRUPAL_BASE_URL` + `uri.url`.
- Nie commituj bezpośrednio na `main` — pracuj na osobnych branchach `feature/...`.
- Nie uruchamiaj destrukcyjnych komend git (`push --force`, `reset --hard`, usuwanie
  branchy) bez wyraźnego potwierdzenia użytkownika.

## Zasady edycji kodu

- Nie modyfikuj działającego kodu poza zakresem mojego żądania.
- Nie wprowadzaj niepowiązanych zmian ani nieproszonych refaktorów.
- Zachowuj wcześniej ustalone założenia architektoniczne i biznesowe.
- Domyślnie pokazuj tylko zmienione fragmenty kodu, nie całe pliki.
- Przed kodem podaj: cel zmiany, zakres, pliki objęte zmianą, czego nie zmieniasz, ryzyko efektów ubocznych.
- Jeśli zmiana może wpłynąć na istniejące działanie, najpierw pokaż: [IMPACT REPORT]: zmieniam [X], ponieważ [Y].
- Jeśli zauważysz problem poza zakresem zadania — zgłoś go, ale nie naprawiaj bez mojej zgody.

## Drupal-first (reguła absolutna)

Drupal jest jedynym źródłem prawdy.
- Każda nowa funkcja zaczyna się w Drupalu: content type → pole → endpoint JSON:API.
- Frontend KONSUMUJE dane z Drupala, nigdy ich nie tworzy ani nie zastępuje.
- Fallback w komponentach służy wyłącznie do podglądu UI, gdy DDEV jest wyłączony.
- Fallback nigdy nie zastępuje brakującego pola Drupala — najpierw dodaj pole w CMS.
- Nie umieszczaj nowych danych (tytułów, ścieżek, URLi, mapowań) na sztywno we frontendzie jako obejścia — najpierw dodaj je do Drupala.
- Jeśli proponujesz rozwiązanie omijające Drupala — STOP i przeprojektuj, by zaczynało się od Drupala.

## Dokumentacja uzupełniająca

- Przy pracy nad komponentami i stronami z UI stosuj checklistę z `docs/wcag.md`.
- Przy stronach, metadanych i routingu stosuj checklistę z `docs/seo.md`.
