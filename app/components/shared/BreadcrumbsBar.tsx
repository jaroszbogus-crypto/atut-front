import React from "react";
import Breadcrumbs from "./Breadcrumbs";
import BackButton from "../ui/BackButton";

interface Crumb {
  label: string;
  href: string | null;
  schemaLabel?: string;
}

interface BreadcrumbsBarProps {
  crumbs: Crumb[];
}

// Pasek nawigacji: okruszki po lewej + Powrót po prawej w jednym rzędzie,
// pod nimi przerywana czerwona linia. Powrót prowadzi do nadrzędnej strony
// (przedostatni okruszek), spójnie ze strukturą okruszków.
export default function BreadcrumbsBar({ crumbs }: BreadcrumbsBarProps) {
  // rodzic = przedostatni okruszek z href (ostatni to bieżąca strona, href=null)
  const parent = crumbs.length >= 2 ? crumbs[crumbs.length - 2] : null;
  const backHref = parent?.href || undefined;

  return (
    <div>
      <div className="flex items-end justify-between gap-4 mb-4">
        <Breadcrumbs crumbs={crumbs} />
        <BackButton href={backHref} />
      </div>
      {/* przerywana czerwona linia — separator techniczny */}
      <div
        aria-hidden="true"
        className="border-t border-dashed border-[var(--atut-red)]"
      />
    </div>
  );
}