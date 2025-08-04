"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#6366f1", "#3b82f6", "#10b981", "#f59e0b"];

interface PieChartCardProps {
  title: string;
  data: { name: string; value: number }[];
}

const PieChartCard = ({ title, data }: PieChartCardProps) => (
  <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>

    <div>
      <h3 className="text-lg font-semibold text-zinc-700 dark:text-white mb-4">{title}</h3>
      <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
        {data.map((item, index) => (
          <li key={item.name} className="flex items-center">
            <span
              className="inline-block w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            {item.name}: {item.value}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default PieChartCard;
