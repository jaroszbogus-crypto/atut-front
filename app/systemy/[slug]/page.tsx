import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BackButton from "../../components/ui/BackButton";
import HeroMedia from "../../components/shared/HeroMedia";
import Breadcrumbs from "../../components/shared/Breadcrumbs";

const DRUPAL = process.env.DRUPAL_BASE_URL;

interface Kafelek {
  tytul: string;
  opisHtml: string;
  punktyHtml: string;
  wyroznienie: boolean;
}

interface SystemData {
  title: string;
  podtytul: string;
  lead: string;
  opisHtml: string;
  funkcjeTytul: string;
  zastTytul: string;
  zdjecie: { url: string; alt: string } | null;
  wideo: string | null;
  galeria: { url: string; alt: string }[];
  dokumenty: { nazwa: string; url: string; rozmiar: string }[];
  funkcje: Kafelek[];
  zastosowania: Kafelek[];
  parametry: { nazwa: string; wartosc: string }[];
  alias: string;
}

const INCLUDE =
  "field_sys_zdjecie.field_media_image,field_sys_wideo,field_sys_funkcje,field_sys_zastosowania,field_sys_parametry,field_sys_dokumenty,field_sys_galeria.field_media_image";

async function getSystem(slug: string): Promise<SystemData | null> {
  try {
    const alias = `/systemy/${slug}`;
    const res = await fetch(
      `${DRUPAL}/jsonapi/node/system?include=${INCLUDE}`,
      { next: { revalidate: 0 } },
    );
    if (!res.ok) return null;

    const json = await res.json();
    const node = (json.data || []).find(
      (n: any) => n.attributes.path?.alias === alias,
    );
    if (!node) return null;

    const incById = (id: string) =>
      json.included?.find((i: any) => i.id === id);

    const mediaToImg = (mediaId: string): { url: string; alt: string } | null => {
      const media = incById(mediaId);
      if (!media) return null;
      const fileRel = media.relationships?.field_media_image?.data;
      if (!fileRel) return null;
      const file = incById(fileRel.id);
      if (!file) return null;
      return {
        url: `${DRUPAL}${file.attributes.uri.url}`,
        alt: fileRel.meta?.alt || "",
      };
    };

    const readZastosowanie = (ref: any): Kafelek | null => {
      const para = incById(ref.id);
      if (!para) return null;
      return {
        tytul: para.attributes.field_zast_tytul || "",
        opisHtml: para.attributes.field_zast_opis?.processed || "",
        punktyHtml: para.attributes.field_zast_punkty?.processed || "",
        wyroznienie: para.attributes.field_zast_wyroznienie === true,
      };
    };

    let zdjecie = null;
    const zRel = node.relationships.field_sys_zdjecie?.data;
    if (zRel) zdjecie = mediaToImg(zRel.id);

    let wideo: string | null = null;
    const wRel = node.relationships.field_sys_wideo?.data;
    if (wRel) {
      const f = incById(wRel.id);
      if (f) wideo = `${DRUPAL}${f.attributes.uri.url}`;
    }

    const galeria: { url: string; alt: string }[] = [];
    const gRel = node.relationships.field_sys_galeria?.data || [];
    for (const g of gRel) {
      const img = mediaToImg(g.id);
      if (img) galeria.push(img);
    }

    const formatRozmiar = (bajty: number) => {
      if (!bajty) return "";
      const mb = bajty / (1024 * 1024);
      if (mb >= 1) return `${mb.toFixed(1).replace(".", ",")} MB`;
      const kb = bajty / 1024;
      return `${Math.round(kb)} KB`;
    };
    const dokumenty: { nazwa: string; url: string; rozmiar: string }[] = [];
    const dRel = node.relationships.field_sys_dokumenty?.data || [];
    for (const d of dRel) {
      const f = incById(d.id);
      if (f) {
        dokumenty.push({
          nazwa: f.attributes.filename || "Dokument",
          url: `${DRUPAL}${f.attributes.uri.url}`,
          rozmiar: formatRozmiar(f.attributes.filesize),
        });
      }
    }

    const funkcje: Kafelek[] = [];
    const fRel = node.relationships.field_sys_funkcje?.data || [];
    for (const ref of fRel) {
      const para = incById(ref.id);
      if (para) {
        funkcje.push({
          tytul: para.attributes.field_fun_tytul || "",
          opisHtml: para.attributes.field_fun_opis?.processed || "",
          punktyHtml: para.attributes.field_fun_punkty?.processed || "",
          wyroznienie: para.attributes.field_fun_wyroznienie === true,
        });
      }
    }

    const zastosowania: Kafelek[] = [];
    const zaRel = node.relationships.field_sys_zastosowania?.data || [];
    for (const ref of zaRel) {
      const k = readZastosowanie(ref);
      if (k) zastosowania.push(k);
    }

    const parametry: { nazwa: string; wartosc: string }[] = [];
    const pRel = node.relationships.field_sys_parametry?.data || [];
    for (const ref of pRel) {
      const para = incById(ref.id);
      if (para) {
        parametry.push({
          nazwa: para.attributes.field_par_nazwa || "",
          wartosc: para.attributes.field_par_wartosc || "",
        });
      }
    }

    return {
      title: node.attributes.title,
      podtytul: node.attributes.field_sys_podtytul || "",
      lead: node.attributes.field_sys_lead || "",
      opisHtml: node.attributes.field_sys_opis?.processed || "",
      funkcjeTytul: node.attributes.field_sys_funkcje_tytul || "Możliwości systemu",
      zastTytul: node.attributes.field_sys_zast_tytul || "Przeznaczenie systemu",
      zdjecie,
      wideo,
      galeria,
      dokumenty,
      funkcje,
      zastosowania,
      parametry,
      alias: node.attributes.path?.alias || alias,
    };
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${DRUPAL}/jsonapi/node/system`, {
      next: { revalidate: 0 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data || [])
      .map((n: any) => n.attributes.path?.alias)
      .filter(Boolean)
      .map((alias: string) => ({ slug: alias.replace("/systemy/", "") }));
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
  const system = await getSystem(slug);
  if (!system) return { title: "System — ATUT" };

  return {
    title: `${system.title} — ATUT`,
    description: system.lead.slice(0, 160),
    openGraph: {
      title: system.title,
      description: system.lead.slice(0, 160),
      images: system.zdjecie ? [system.zdjecie.url] : [],
    },
    alternates: { canonical: `https://atutnet.com${system.alias}` },
  };
}

function KafelkiGrid({ kafelki }: { kafelki: Kafelek[] }) {
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 border-t border-l border-gray-200">
      {kafelki.map((k, i) => (
        <article
          key={i}
          className={`relative overflow-hidden p-6 md:p-8 border-r border-b border-gray-200 ${
            k.wyroznienie
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
            <h3
              className={`text-lg text-[var(--atut-navy)] leading-tight ${
                k.wyroznienie ? "font-extrabold" : "font-bold"
              }`}
            >
              {k.tytul}
            </h3>
          </div>
          {k.opisHtml && (
            <div
              className="text-gray-700 text-sm leading-relaxed mb-3"
              dangerouslySetInnerHTML={{ __html: k.opisHtml }}
            />
          )}
          {k.punktyHtml && (
            <div
              className="sektor-zast text-gray-700 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: k.punktyHtml }}
            />
          )}
        </article>
      ))}
    </div>
  );
}

export default async function SystemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const system = await getSystem(slug);
  if (!system) notFound();

  const breadcrumbs = [
    { label: "Strona główna", href: "/" },
    { label: "Systemy", href: "/systemy" },
    { label: system.title, href: null },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: system.title,
    description: system.lead,
    ...(system.zdjecie ? { image: system.zdjecie.url } : {}),
    brand: { "@type": "Brand", name: "ATUT" },
  };

  return (
    <main className="bg-[var(--atut-paper)] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="pt-32 pb-16 md:pb-24 px-6 max-w-6xl mx-auto">
        <Breadcrumbs crumbs={breadcrumbs} />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--atut-red-text)]">
          {system.podtytul}
        </span>
        <h1 className="heading-display text-3xl md:text-5xl lg:text-6xl uppercase text-[var(--atut-navy)] mt-4 leading-[0.95]">
          {system.title}
        </h1>
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-4">
            {system.lead && (
              <p className="text-lg text-gray-700 leading-relaxed">
                {system.lead}
              </p>
            )}
            <div className="w-16 h-[3px] bg-[var(--atut-red)] mt-8" />
          </div>
          {(system.zdjecie || system.wideo) && (
            <figure className="lg:col-span-8">
              <HeroMedia
                image={system.zdjecie?.url || null}
                imageAlt={system.zdjecie?.alt || system.title}
                video={system.wideo}
              />
            </figure>
          )}
        </div>
      </section>

      {system.opisHtml && (
        <section className="max-w-6xl mx-auto px-6 pb-16 md:pb-24">
          <div className="border-t border-gray-300 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--atut-red-text)]">
                // Charakterystyka
              </span>
            </div>
            <div
              className="sektor-opis lg:col-span-8 text-gray-800 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: system.opisHtml }}
            />
          </div>
        </section>
      )}

      {system.funkcje.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-16 md:pb-24">
          <div className="border-t border-gray-300 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <header className="lg:col-span-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--atut-red-text)]">
                // Funkcje
              </span>
              <h2 className="heading-display text-2xl md:text-3xl uppercase text-[var(--atut-navy)] mt-2 leading-tight">
                {system.funkcjeTytul}
              </h2>
            </header>
          </div>
          <KafelkiGrid kafelki={system.funkcje} />
        </section>
      )}

      {system.zastosowania.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-16 md:pb-24">
          <div className="border-t border-gray-300 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <header className="lg:col-span-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--atut-red-text)]">
                // Zastosowanie
              </span>
              <h2 className="heading-display text-2xl md:text-3xl uppercase text-[var(--atut-navy)] mt-2 leading-tight">
                {system.zastTytul}
              </h2>
            </header>
          </div>
          <KafelkiGrid kafelki={system.zastosowania} />
        </section>
      )}

      {system.parametry.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-16 md:pb-24">
          <div className="border-t border-gray-300 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <header className="lg:col-span-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--atut-red-text)]">
                // Parametry
              </span>
              <h2 className="heading-display text-2xl md:text-3xl uppercase text-[var(--atut-navy)] mt-2 leading-tight">
                Dane techniczne
              </h2>
            </header>
            <div className="lg:col-span-8">
              <dl className="border-t border-gray-300">
                {system.parametry.map((p, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-2 gap-4 border-b border-gray-300 py-3"
                  >
                    <dt className="font-mono text-xs uppercase tracking-wider text-[var(--atut-mono)]">
                      {p.nazwa}
                    </dt>
                    <dd className="font-mono text-sm text-[var(--atut-navy)] font-bold">
                      {p.wartosc}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      )}

      {system.dokumenty.length > 0 && (
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
              {system.dokumenty.map((doc, i) => (
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

      {system.galeria.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-16 md:pb-24">
          <div className="border-t border-gray-300 pt-10 mb-10">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--atut-red-text)]">
              // Galeria
            </span>
            <h2 className="heading-display text-2xl md:text-3xl uppercase text-[var(--atut-navy)] mt-2 leading-tight">
              Zdjęcia
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {system.galeria.map((img, i) => (
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
