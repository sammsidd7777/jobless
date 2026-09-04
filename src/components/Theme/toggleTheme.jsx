import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "dark";
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const ThemeToggle = ({ compact = false }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className={compact
        ? "flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70 transition hover:bg-white/[0.08] hover:text-white"
        : "relative flex h-8 w-14 items-center rounded-full border border-white/10 bg-white/[0.05] p-[3px] transition hover:bg-white/[0.08]"}
    >
      {compact ? (theme === "dark" ? <Moon size={16} /> : <Sun size={16} />) : (
        <>
          <span className={`flex h-6 w-6 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm transition-transform ${theme === "dark" ? "translate-x-6" : "translate-x-0"}`}>
            {theme === "dark" ? <Moon size={14} /> : <Sun size={14} />}
          </span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
