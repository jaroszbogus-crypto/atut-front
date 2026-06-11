import type { Metadata } from "next";
import { notFound } from "next/navigation";

const DRUPAL = process.env.DRUPAL_BASE_URL;

// --- Typ sektora (lokalny, na potrzeby tej podstrony) ---
interface SektorData {
  title: string;
  podtytul: string;
  lead: string;
  opisHtml: string;
  zastWstepHtml: string;
  zdjecie: { url: string; alt: string } | null;
  galeria: { url: string; alt: string }[];
  zastosowania: { tytul: string; punktyHtml: string; opisHtml: string; wyroznienie: boolean }[];
  alias: string;
}

// --- Pobieranie pojedynczego sektora po aliasie /sektory/[slug] ---
async function getSektor(slug: string): Promise<SektorData | null> {
  try {
    const alias = `/sektory/${slug}`;
    const res = await fetch(
      `${DRUPAL}/jsonapi/node/sektor?include=field_sektor_zdjecie,field_sektor_galeria,field_sektor_zastosowania`,
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

    // Zastosowania (Paragraphs) — kolejność wg pola, treść z included
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
      zdjecie,
      galeria,
      zastosowania,
      alias: node.attributes.path?.alias || alias,
    };
  } catch {
    return null;
  }
}

// --- Lista slugów do pre-renderowania (SEO + wydajność) ---
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

// --- SEO: title + description z Drupala ---
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

// --- Strona ---
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
      {/* HERO */}
      <section className="relative pt-32 pb-16 px-6 max-w-6xl mx-auto">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-red-600">
          {sektor.podtytul}
        </span>
        <h1 className="heading-display text-3xl md:text-5xl lg:text-6xl uppercase text-[var(--atut-navy)] mt-4 leading-[0.95]">
          {sektor.title}
        </h1>
        {sektor.lead && (
          <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed">
            {sektor.lead}
          </p>
        )}
        <div className="w-16 h-[3px] bg-red-600 mt-8" />
      </section>

      {/* ZDJĘCIE GŁÓWNE */}
      {sektor.zdjecie && (
        <section className="max-w-6xl mx-auto px-6 mb-16">
          <img
            src={sektor.zdjecie.url}
            alt={sektor.zdjecie.alt}
            className="w-full h-auto border border-gray-200"
            loading="eager"
          />
        </section>
      )}

      {/* OPIS */}
      {sektor.opisHtml && (
        <section className="max-w-4xl mx-auto px-6 mb-20">
          <div
            className="sektor-opis text-gray-800 leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: sektor.opisHtml }}
          />
        </section>
      )}

      {/* ZASTOSOWANIA */}
      {sektor.zastosowania.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-red-600">
            // Zastosowanie
          </span>
          <h2 className="heading-display text-2xl md:text-4xl uppercase text-[var(--atut-navy)] mt-2 mb-6">
            Gdzie pracuje system
          </h2>
          {sektor.zastWstepHtml && (
            <div
              className="sektor-opis text-gray-700 text-base leading-relaxed mb-10 space-y-4"
              dangerouslySetInnerHTML={{ __html: sektor.zastWstepHtml }}
            />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 border border-gray-200">
            {sektor.zastosowania.map((z, i) => (
              <article
                key={i}
                className={`relative overflow-hidden p-6 md:p-8 ${
                  z.wyroznienie ? "bg-gray-200" : "bg-[var(--atut-paper)]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="heading-display pointer-events-none absolute -top-2 -left-2 text-[5rem] leading-none text-[var(--atut-navy)] opacity-[0.03] select-none"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-mono text-xs text-red-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-bold text-lg text-[var(--atut-navy)] leading-tight">
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

      {/* GALERIA — prosta siatka na MVP */}
      {sektor.galeria.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-red-600">
            // Galeria
          </span>
          <h2 className="heading-display text-2xl md:text-4xl uppercase text-[var(--atut-navy)] mt-2 mb-8">
            Realizacja
          </h2>
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
    </main>
  );
}