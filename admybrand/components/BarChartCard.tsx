"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { tableData } from "@/lib/tableData";

export default function CampaignBarChart() {
  return (
    <div className="bg-card rounded-2xl p-4 shadow-md w-full h-[300px]">
      <h2 className="text-xl font-semibold mb-4">Clicks per Campaign</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={tableData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="campaign" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="clicks" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
