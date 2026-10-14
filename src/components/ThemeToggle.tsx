import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "daniela-theme";
type ThemeChoice = "light" | "dark";

function getPreferredTheme(): ThemeChoice {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  // Dark is the default theme; light only when the visitor has switched to it.
  return stored === "light" ? "light" : "dark";
}

function applyTheme(theme: ThemeChoice) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeChoice>("dark");

  useEffect(() => {
    const preferred = getPreferredTheme();
    setTheme(preferred);
    applyTheme(preferred);
  }, []);

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
      onClick={() => {
        setTheme(nextTheme);
        window.localStorage.setItem(STORAGE_KEY, nextTheme);
        applyTheme(nextTheme);
      }}
      className="h-10 w-10 border-border-strong bg-card text-foreground shadow-none hover:border-link hover:bg-secondary hover:text-link"
    >
      {theme === "dark" ? (
        <Sun aria-hidden className="h-4 w-4" strokeWidth={1.6} />
      ) : (
        <Moon aria-hidden className="h-4 w-4" strokeWidth={1.6} />
      )}
    </Button>
  );
}
