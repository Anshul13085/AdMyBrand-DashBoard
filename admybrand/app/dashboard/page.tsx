"use client";

import { useState, useEffect } from "react";
import Card from "@/components/Card";
import { DollarSign, Users, TrendingUp, Percent } from "lucide-react";
import ChartCard from "@/components/ChartCard";
import PieChartCard from "@/components/PieChartCard";
import ThemeToggle from "@/components/ThemeToggle";
import DateRangeFilter from "@/components/DateRangeFilter";
import ExportButtons from "@/components/ExportButtons";
import { revenueData, conversionsByPlatform } from "@/lib/data";
import DataTable from "@/components/DataTable";
import CampaignBarChart from "@/components/BarChartCard";
import Skeleton from "@/components/LoadingSkeleton";

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [isLoading, setIsLoading] = useState(true);

  const [metrics, setMetrics] = useState({
    revenue: 120000,
    users: 10240,
    conversions: 1245,
    growth: 5.3,
  });

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        revenue: +(prev.revenue + Math.random() * 1000 - 500).toFixed(2),
        users: Math.max(0, prev.users + Math.floor(Math.random() * 20 - 10)),
        conversions: Math.max(0, prev.conversions + Math.floor(Math.random() * 10 - 5)),
        growth: +(prev.growth + (Math.random() * 0.5 - 0.25)).toFixed(2),
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <ThemeToggle />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <DateRangeFilter onChange={setDateRange} />
        <ExportButtons />
      </div>

      {isLoading ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card
            title="Revenue"
            value={`$${metrics.revenue.toLocaleString()}`}
            icon={<DollarSign className="h-6 w-6" />}
            delta="+12.4%"
          />
          <Card
            title="Users"
            value={metrics.users.toLocaleString()}
            icon={<Users className="h-6 w-6" />}
            delta="+8.2%"
          />
          <Card
            title="Conversions"
            value={metrics.conversions.toLocaleString()}
            icon={<TrendingUp className="h-6 w-6" />}
            delta="+3.7%"
          />
          <Card
            title="Growth"
            value={`${metrics.growth.toFixed(1)}%`}
            icon={<Percent className="h-6 w-6" />}
            delta={metrics.growth >= 0 ? "+0.5%" : "-0.5%"}
            deltaColor={metrics.growth >= 0 ? "green" : "red"}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="Revenue Over Time" data={revenueData} />
        <PieChartCard
          title="Conversions by Platform"
          data={conversionsByPlatform.map(({ platform, value }) => ({
            name: platform,
            value,
          }))}
        />
      </div>

      <CampaignBarChart />
      <DataTable />
    </div>
  );
}
