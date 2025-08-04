// components/Sidebar.tsx

export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 dark:bg-gray-900 h-full p-4">
      <h2 className="text-lg font-bold mb-4">Sidebar</h2>
      <ul>
        <li className="mb-2">🏠 Dashboard</li>
        <li className="mb-2">📊 Analytics</li>
        <li className="mb-2">⚙️ Settings</li>
      </ul>
    </aside>
  );
}
