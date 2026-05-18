import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const header = document.querySelector<HTMLElement>(".header");
  const offset = (header?.offsetHeight ?? 0) + 18;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

export function scrollToSectionSoon(id: string) {
  window.requestAnimationFrame(() => {
    scrollToSection(id);
    window.setTimeout(() => scrollToSection(id), 80);
  });
}

export default function useScrollToSectionParam(param = "s") {
  const location = useLocation();

  useEffect(() => {
    const search = new URLSearchParams(location.search);
    const target = search.get(param);
    if (!target) return;

    if (target === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const raf = requestAnimationFrame(() => scrollToSection(target));
    return () => cancelAnimationFrame(raf);
  }, [location.search, param]);
}
