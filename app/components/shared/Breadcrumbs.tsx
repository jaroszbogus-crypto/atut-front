import React from "react";

interface Crumb {
  label: string;        // co widać na ekranie (np. slug "at-visio")
  href: string | null;
  schemaLabel?: string; // co idzie do Google w schema.org (np. tytuł "AT-Visio 3.5"); domyślnie = label
}

interface BreadcrumbsProps {
  crumbs: Crumb[];
}

// Okruszki mono "// Strona główna / Sektory / at-visio".
// Na ekranie: label (slug dla bieżącej strony). Dla Google: schemaLabel (tytuł).
// schema.org BreadcrumbList używa schemaLabel, więc SEO dostaje czytelne nazwy.
export default function Breadcrumbs({ crumbs }: BreadcrumbsProps) {
  const SITE = "https://atutnet.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.schemaLabel || crumb.label,
      ...(crumb.href ? { item: `${SITE}${crumb.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Okruszki">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs uppercase tracking-[0.15em] text-[var(--atut-mono)]">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={i} className="flex items-center gap-x-2">
              {i === 0 && <span aria-hidden="true" className="text-[var(--atut-red-text)]">//</span>}
              {isLast || !crumb.href ? (
                <span aria-current="page" className="text-[var(--atut-navy)] font-bold">{crumb.label}</span>
              ) : (
                <a href={crumb.href} className="hover:text-[var(--atut-red-text)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--atut-red)]">{crumb.label}</a>
              )}
              {!isLast && <span aria-hidden="true" className="text-gray-400">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}