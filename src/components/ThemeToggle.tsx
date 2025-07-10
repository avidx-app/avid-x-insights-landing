import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="w-12 h-7 bg-muted rounded-full flex items-center px-1 transition-colors" />
    );
  }

  const isDark = theme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      tabIndex={0}
      onClick={handleToggle}
      className={`w-12 h-7 flex items-center px-1 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-muted ${isDark ? 'justify-end' : 'justify-start'}`}
    >
      <span className="relative w-full h-full flex items-center justify-between">
        <Sun
          className={`w-4 h-4 text-yellow-400 transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-100'}`}
          aria-hidden="true"
        />
        <Moon
          className={`w-4 h-4 text-blue-500 transition-opacity duration-300 ${isDark ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden="true"
        />
      </span>
      <span
        className={`absolute left-1 top-1 w-5 h-5 rounded-full bg-background shadow transition-transform duration-300 ${isDark ? 'translate-x-5' : 'translate-x-0'}`}
        aria-hidden="true"
      />
    </button>
  );
}; 