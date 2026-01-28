import { useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";

function getPreferredTheme(): Theme {
  if (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
}

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return getPreferredTheme();
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = useMemo(
    () => () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    [],
  );

  return { theme, toggle };
}

