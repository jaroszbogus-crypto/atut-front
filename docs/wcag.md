# WCAG 2.1/2.2 AA — checklista (wymóg prawny, projekt UE)

Stosuj przy każdym komponencie i stronie z UI.

- Każdy element interaktywny: widoczny focus, obsługa klawiatury, aria-label gdy brak widocznego tekstu.
- Każdy obraz: sensowny tekst alt (lub alt="" jeśli czysto dekoracyjny).
- Animacje/wideo: respektuj prefers-reduced-motion; zapewnij statyczny fallback.
- Kontrast tekstu min. 4.5:1 (3:1 dla dużego tekstu) — weryfikuj przy każdym kolorze i zgłaszaj naruszenia.
- Hierarchia nagłówków bez przeskoków; dokładnie jeden h1 na stronę.
- Elementy auto-przewijane (slidery, karuzele): muszą być pauzowalne (WCAG 2.2.2).
- Formularze: każde pole ma powiązany <label>; błędy ogłaszane dostępnie.
- Ustaw poprawnie atrybut lang; zadbaj o logiczną kolejność DOM/tab.
- Przy propozycji UI zawsze opisz, jak spełnia powyższe kryteria.
