"use client";
import React, { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Przycisk pojawia się po przewinięciu o 100px
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Jeśli isVisible jest false, komponent nie renderuje nic (przycisk jest niewidoczny)
  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "40px",
        right: "40px",
        zIndex: "999999",
      }}
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          padding: "12px",
          backgroundColor: "#dc2626",
          color: "white",
          borderRadius: "8px",
          cursor: "pointer",
          border: "none",
          boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "48px",
          height: "48px",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#991b1b";
          e.currentTarget.style.transform = "translateY(-5px)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "#dc2626";
          e.currentTarget.style.transform = "translateY(0)";
        }}
        aria-label="Wróć na górę"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}
