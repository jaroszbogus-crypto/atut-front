"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
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
      aria-label="Wróć do poprzedniej strony"
    >
      <span aria-hidden="true" className="transition-transform group-hover:-translate-x-1">←</span>
      Powrót
    </button>
  );
}