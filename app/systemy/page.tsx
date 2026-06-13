import type { Metadata } from "next";
import BreadcrumbsBar from "../components/shared/BreadcrumbsBar";

const DRUPAL = process.env.DRUPAL_BASE_URL;

interface SystemRow {
  title: string;
  podtytul: string;
  alias: string;
  waga: number;
}

async function getSystemy(): Promise<SystemRow[]> {
  try {
    const res = await fetch(`${DRUPAL}/jsonapi/node/system`, {
      next: { revalidate: 0 },
    });
    if (!res.ok) return [];

    const json = await res.json();
    const rows: SystemRow[] = (json.data || [])
      .map((n: any) => ({
        title: n.attributes.title || "",
        podtytul: n.attributes.field_sys_podtytul || "",
        alias: n.attributes.path?.alias || "",
        // puste pole wagi -> duża liczba, żeby trafiło na koniec listy
        waga:
          n.attributes.field_waga === null ||
          n.attributes.field_waga === undefined
            ? 9999
            : n.attributes.field_waga,
      }))
      .filter((r: SystemRow) => r.alias); // tylko węzły z aliasem

    // sortowanie rosnąco po wadze (mniejsza = wyżej), remis -> alfabetycznie
    rows.sort((a, b) => {
      if (a.waga !== b.waga) return a.waga - b.waga;
      return a.title.localeCompare(b.title, "pl");
    });

    return rows;
  } catch {
    return [];
  }
}

export const metadata: Metadata = {
  title: "Systemy — ATUT",
  description:
    "Systemy automatyki, bezpieczeństwa i monitoringu ATUT dla środowisk safety-critical. Pełna oferta systemów dla przemysłu.",
  alternates: { canonical: "https://atutnet.com/systemy" },
};

export default async function SystemyPage() {
  const systemy = await getSystemy();

  const breadcrumbs = [
    { label: "Strona główna", href: "/" },
    { label: "Systemy", href: null },
  ];

  return (
    <main className="bg-[var(--atut-paper)] min-h-screen">
      <section className="pt-32 pb-16 md:pb-24 px-6 max-w-6xl mx-auto">
        <div className="mb-10">
          <BreadcrumbsBar crumbs={breadcrumbs} />
        </div>

        {/* Nagłówek strony — lewa szyna jako tytuł rejestru */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <header className="lg:col-span-7">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--atut-red-text)]">
              // Rejestr systemów
            </span>
            <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl uppercase text-[var(--atut-navy)] mt-4 leading-[0.95]">
              Systemy
            </h1>
          </header>
          <div className="lg:col-span-5">
            <p className="text-lg text-gray-700 leading-relaxed">
              Projektujemy i produkujemy systemy automatyki, bezpieczeństwa i
              monitoringu dla środowisk, gdzie nie ma miejsca na kompromis.
            </p>
            <div className="w-16 h-[3px] bg-[var(--atut-red)] mt-8" />
          </div>
        </div>
      </section>

      {/* Rejestr — lista wierszy */}
      <section className="max-w-6xl mx-auto px-6 pb-24 md:pb-32">
        {systemy.length > 0 ? (
          <ol className="border-t border-gray-300">
            {systemy.map((sys, i) => (
              <li key={sys.alias} className="border-b border-gray-300">
                <a href={sys.alias} className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-8 py-6 md:py-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--atut-red)]">
                  {/* duży numer — Archivo, stały rozmiar na wysokość bloku */}
                  <span
                    aria-hidden="true"
                    className="heading-display text-7xl md:text-8xl leading-none text-gray-300 group-hover:text-[var(--atut-red)] transition-colors w-20 md:w-32 shrink-0"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* linia mono (podtytuł · URL) nad tytułem */}
                  <span className="min-w-0">
                    <span className="block font-mono text-xs md:text-sm text-[var(--atut-mono)] mb-0.2 truncate">
                      {sys.podtytul}
                      {sys.podtytul && " · "}
                      {sys.alias}
                    </span>
                    <span className="block heading-display text-xl md:text-3xl uppercase text-[var(--atut-navy)] leading-tight group-hover:text-[var(--atut-red)] transition-colors">
                      {sys.title}
                    </span>
                  </span>

                  {/* strzałka */}
                  <span
                    aria-hidden="true"
                    className="font-mono text-2xl md:text-3xl text-gray-400 group-hover:text-[var(--atut-red)] group-hover:translate-x-1 transition-all shrink-0"
                  >
                    →
                  </span>
                </a>
              </li>
            ))}
          </ol>
        ) : (
          <p className="border-t border-gray-300 pt-10 font-mono text-sm text-[var(--atut-mono)]">
            // Brak systemów do wyświetlenia.
          </p>
        )}
      </section>
    </main>
  );
}
