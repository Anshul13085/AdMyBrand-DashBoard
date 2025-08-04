// components/DateRangeFilter.tsx
"use client";
import { useState } from "react";

export default function DateRangeFilter({ onChange }: { onChange: (range: { from: string; to: string }) => void }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  return (
    <div className="flex items-center space-x-4">
      <div>
        <label className="block text-sm font-medium mb-1">From:</label>
        <input
          type="date"
          value={from}
          onChange={(e) => {
            setFrom(e.target.value);
            onChange({ from: e.target.value, to });
          }}
          className="px-3 py-2 border rounded-md dark:bg-zinc-800 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">To:</label>
        <input
          type="date"
          value={to}
          onChange={(e) => {
            setTo(e.target.value);
            onChange({ from, to: e.target.value });
          }}
          className="px-3 py-2 border rounded-md dark:bg-zinc-800 dark:text-white"
        />
      </div>
    </div>
  );
}
