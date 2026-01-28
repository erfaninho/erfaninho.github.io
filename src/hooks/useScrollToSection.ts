import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
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

    const raf = requestAnimationFrame(() => scrollToId(target));
    return () => cancelAnimationFrame(raf);
  }, [location.search, param]);
}

