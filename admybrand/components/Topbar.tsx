// components/Topbar.tsx

import ThemeToggle from "@/components/ThemeToggle";

export default function Topbar() {
  return (
    <header className="w-full h-16 px-6 bg-white dark:bg-gray-900 shadow flex items-center justify-between">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-white">ADmyBRAND Dashboard</h1>
      <ThemeToggle />
    </header>
  );
}
