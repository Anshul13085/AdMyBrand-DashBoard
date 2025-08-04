"use client";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") === "dark";
    setDark(saved);
    document.documentElement.classList.toggle("dark", saved);
  }, []);

  const toggleTheme = () => {
    const isDark = !dark;
    setDark(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDark);
  };

  return (
    <button onClick={toggleTheme} className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-700">
      {dark ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-800" />}
    </button>
  );
}
