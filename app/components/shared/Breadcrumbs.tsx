import React from "react";

interface Crumb {
  label: string;
  href: string | null;
}

interface BreadcrumbsProps {
  crumbs: Crumb[];
}

// Okruszki w stylu mono "// Strona główna / Systemy / AT-LOCATION".
// Server Component (tylko linki). Ostatni element nieklikalny (aria-current).
export default function Breadcrumbs({ crumbs }: BreadcrumbsProps) {
  return (
    <nav aria-label="Okruszki" className="mb-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs uppercase tracking-[0.15em] text-[var(--atut-mono)]">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={i} className="flex items-center gap-x-2">
              {i === 0 && <span aria-hidden="true" className="text-[var(--atut-red-text)]">//</span>}
              {isLast || !crumb.href ? (
                <span aria-current="page" className="text-[var(--atut-navy)] font-bold">
                  {crumb.label}
                </span>
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