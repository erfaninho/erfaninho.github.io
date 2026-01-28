import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import useTheme from "../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const [isSwitching, setIsSwitching] = useState(false);

  useEffect(() => {
    if (!isSwitching) return;
    const t = window.setTimeout(() => setIsSwitching(false), 520);
    return () => window.clearTimeout(t);
  }, [isSwitching]);

  const onToggle = () => {
    setIsSwitching(true);
    toggle();
  };

  return (
    <button
      type="button"
      className={["iconButton", isSwitching ? "isSwitching" : ""].filter(Boolean).join(" ")}
      onClick={onToggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      title={theme === "dark" ? "Light theme" : "Dark theme"}
    >
      <span className="themeToggleIcon" aria-hidden="true">
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </span>
    </button>
  );
}
