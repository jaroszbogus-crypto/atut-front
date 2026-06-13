"use client";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  href?: string;   // dokąd wrócić (nadrzędna strona). Brak -> cofnięcie w historii.
  label?: string;  // tekst przycisku (domyślnie "Powrót")
}

export default function BackButton({ href, label = "Powrót" }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (href) {
      // przewidywalny powrót do nadrzędnej strony (spójne z okruszkami)
      router.push(href);
    } else if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--atut-navy)] border border-[var(--atut-navy)] px-4 py-2 hover:bg-[var(--atut-navy)] hover:text-[var(--atut-paper)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
      aria-label={`Wróć: ${label}`}
    >
      <span aria-hidden="true" className="transition-transform group-hover:-translate-x-1">←</span>
      {label}
    </button>
  );
}