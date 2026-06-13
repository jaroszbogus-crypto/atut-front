import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BackButton from "../../components/ui/BackButton";

const DRUPAL = process.env.DRUPAL_BASE_URL;

interface SektorData {
  title: string;
  podtytul: string;
  lead: string;
  opisHtml: string;
  zastWstepHtml: string;
  zastTytul: string;
  zdjecie: { url: string; alt: string } | null;
  galeria: { url: string; alt: string }[];
  dokumenty: { nazwa: string; url: string; rozmiar: string }[];
  zastosowania: { tytul: string; punktyHtml: string; opisHtml: string; wyroznienie: boolean }[];
  alias: string;
}

async function getSektor(slug: string): Promise<SektorData | null> {
  try {
    const alias = `/sektory/${slug}`;
    const res = await fetch(
      `${DRUPAL}/jsonapi/node/sektor?include=field_sektor_zdjecie,field_sektor_galeria,field_sektor_zastosowania,field_sektor_dokumenty`,
      { next: { revalidate: 0 } },
    );
    if (!res.ok) return null;

    const json = await res.json();
    const node = (json.data || []).find(
      (n: any) => n.attributes.path?.alias === alias,
    );
    if (!node) return null;

    const fileById = (id: string) =>
      json.included?.find((i: any) => i.id === id);

    let zdjecie = null;
    const zRel = node.relationships.field_sektor_zdjecie?.data;
    if (zRel) {
      const f = fileById(zRel.id);
      if (f) zdjecie = { url: `${DRUPAL}${f.attributes.uri.url}`, alt: zRel.meta?.alt || "" };
    }

    const galeria: { url: string; alt: string }[] = [];
    const gRel = node.relationships.field_sektor_galeria?.data || [];
    for (const g of gRel) {
      const f = fileById(g.id);
      if (f) galeria.push({ url: `${DRUPAL}${f.attributes.uri.url}`, alt: g.meta?.alt || "" });
    }

    const formatRozmiar = (bajty: number) => {
      if (!bajty) return "";
      const mb = bajty / (1024 * 1024);
      if (mb >= 1) return `${mb.toFixed(1).replace(".", ",")} MB`;
      const kb = bajty / 1024;
      return `${Math.round(kb)} KB`;
    };
    const dokumenty: { nazwa: string; url: string; rozmiar: string }[] = [];
    const dRel = node.relationships.field_sektor_dokumenty?.data || [];
    for (const d of dRel) {
      const f = fileById(d.id);
      if (f) {
        dokumenty.push({
          nazwa: f.attributes.filename || "Dokument",
          url: `${DRUPAL}${f.attributes.uri.url}`,
          rozmiar: formatRozmiar(f.attributes.filesize),
        });
      }
    }

    const zastosowania: { tytul: string; punktyHtml: string; opisHtml: string; wyroznienie: boolean }[] = [];
    const zastRel = node.relationships.field_sektor_zastosowania?.data || [];
    for (const ref of zastRel) {
      const para = json.included?.find((i: any) => i.id === ref.id);
      if (para) {
        zastosowania.push({
          tytul: para.attributes.field_zast_tytul || "",
          punktyHtml: para.attributes.field_zast_punkty?.processed || "",
          opisHtml: para.attributes.field_zast_opis?.processed || "",
          wyroznienie: para.attributes.field_zast_wyroznienie === true,
        });
      }
    }

    return {
      title: node.attributes.title,
      podtytul: node.attributes.field_sektor_podtytul || "",
      lead: node.attributes.field_sektor_lead || "",
      opisHtml: node.attributes.field_sektor_opis?.processed || "",
      zastWstepHtml: node.attributes.field_sektor_zast_wstep?.processed || "",
      zastTytul: node.attributes.field_sektor_zast_tytul || "Przeznaczenie systemu",
      zdjecie,
      galeria,
      dokumenty,
      zastosowania,
      alias: node.attributes.path?.alias || alias,
    };
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${DRUPAL}/jsonapi/node/sektor`, {
      next: { revalidate: 0 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data || [])
      .map((n: any) => n.attributes.path?.alias)
      .filter(Boolean)
      .map((alias: string) => ({ slug: alias.replace("/sektory/", "") }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sektor = await getSektor(slug);
  if (!sektor) return { title: "Sektor — ATUT" };

  return {
    title: `${sektor.title} — ATUT`,
    description: sektor.lead.slice(0, 160),
    openGraph: {
      title: sektor.title,
      description: sektor.lead.slice(0, 160),
      images: sektor.zdjecie ? [sektor.zdjecie.url] : [],
    },
    alternates: { canonical: `https://atutnet.com${sektor.alias}` },
  };
}

export default async function SektorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sektor = await getSektor(slug);
  if (!sektor) notFound();

  return (
    <main className="bg-[var(--atut-paper)] min-h-screen">
      <section className="pt-32 pb-16 md:pb-24 px-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <BackButton />
        </div>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--atut-red-text)]">
          {sektor.podtytul}
        </span>
        <h1 className="heading-display text-3xl md:text-5xl lg:text-6xl uppercase text-[var(--atut-navy)] mt-4 leading-[0.95]">
          {sektor.title}
        </h1>
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-4">
            {sektor.lead && (
              <p className="text-lg text-gray-700 leading-relaxed">
                {sektor.lead}
              </p>
            )}
            <div className="w-16 h-[3px] bg-[var(--atut-red)] mt-8" />
          </div>
          {sektor.zdjecie && (
            <figure className="lg:col-span-8">
              <img
                src={sektor.zdjecie.url}
                alt={sektor.zdjecie.alt}
                className="w-full h-auto border border-gray-200"
                loading="eager"
              />
            </figure>
          )}
        </div>
      </section>

      {sektor.opisHtml && (
        <section className="max-w-6xl mx-auto px-6 pb-16 md:pb-24">
          <div className="border-t border-gray-300 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--atut-red-text)]">
                // Charakterystyka
              </span>
            </div>
            <div
              className="sektor-opis lg:col-span-8 text-gray-800 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: sektor.opisHtml }}
            />
          </div>
        </section>
      )}

      {sektor.zastosowania.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-16 md:pb-24">
          <div className="border-t border-gray-300 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <header className="lg:col-span-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--atut-red-text)]">
                // Zastosowanie
              </span>
              <h2 className="heading-display text-2xl md:text-3xl uppercase text-[var(--atut-navy)] mt-2 leading-tight">
                {sektor.zastTytul}
              </h2>
            </header>
            {sektor.zastWstepHtml && (
              <div
                className="sektor-opis lg:col-span-8 text-gray-700 text-base leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: sektor.zastWstepHtml }}
              />
            )}
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 border-t border-l border-gray-200">
            {sektor.zastosowania.map((z, i) => (
              <article
                key={i}
                 className={`relative overflow-hidden p-6 md:p-8 border-r border-b border-gray-200 ${
                  z.wyroznienie
                    ? "bg-gray-200 ring-1 ring-inset ring-gray-400"
                    : "bg-[var(--atut-paper)]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="heading-display pointer-events-none absolute -top-0 right-3 text-[6rem] leading-none text-[var(--atut-navy)] opacity-[0.03] select-none"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-mono text-sm font-bold text-[var(--atut-red-text)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className={`text-lg text-[var(--atut-navy)] leading-tight ${z.wyroznienie ? "font-extrabold" : "font-bold"}`}>
                    {z.tytul}
                  </h3>
                </div>
                {z.opisHtml && (
                  <div
                    className="text-gray-700 text-sm leading-relaxed mb-3"
                    dangerouslySetInnerHTML={{ __html: z.opisHtml }}
                  />
                )}
                {z.punktyHtml && (
                  <div
                    className="sektor-zast text-gray-700 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: z.punktyHtml }}
                  />
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {sektor.dokumenty.length > 0 && (
        <section className="bg-[var(--atut-navy)] mb-16 md:mb-24">
          <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <header className="lg:col-span-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--atut-mono-dark)]">
                // Dokumenty
              </span>
              <h2 className="heading-display text-2xl md:text-3xl uppercase text-[var(--atut-paper)] mt-2 leading-tight">
                Do pobrania
              </h2>
            </header>
            <ul className="lg:col-span-8 border border-[var(--atut-paper)]/20 divide-y divide-[var(--atut-paper)]/20 self-start">
              {sektor.dokumenty.map((doc, i) => (
                <li key={i}>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 md:p-5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--atut-red)]">
                    <span
                      aria-hidden="true"
                      className="shrink-0 w-10 h-10 flex items-center justify-center border border-[var(--atut-paper)] text-[var(--atut-paper)] font-mono text-xs font-bold"
                    >
                      PDF
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-bold text-[var(--atut-paper)] truncate group-hover:text-white transition-colors">
                        {doc.nazwa}
                      </span>
                      {doc.rozmiar && (
                        <span className="block font-mono text-xs text-[var(--atut-mono-dark)] mt-0.5">
                          {doc.rozmiar}
                        </span>
                      )}
                    </span>
                    <span className="shrink-0 font-mono text-xs uppercase tracking-wider text-[var(--atut-paper)] border border-[var(--atut-paper)] px-4 py-2 group-hover:bg-[var(--atut-red)] group-hover:border-[var(--atut-red)] group-hover:text-white transition-colors">
                      Otwórz
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {sektor.galeria.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-16 md:pb-24">
          <div className="border-t border-gray-300 pt-10 mb-10">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--atut-red-text)]">
              // Galeria
            </span>
            <h2 className="heading-display text-2xl md:text-3xl uppercase text-[var(--atut-navy)] mt-2 leading-tight">
              Realizacja
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sektor.galeria.map((img, i) => (
              <figure key={i} className="border border-gray-200">
                <img
                  src={img.url}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-64 object-cover"
                />
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className="max-w-6xl mx-auto px-6 pb-16 md:pb-24">
        <div className="border-t border-gray-300 pt-12">
          <BackButton />
        </div>
      </section>
    </main>
  );
}
