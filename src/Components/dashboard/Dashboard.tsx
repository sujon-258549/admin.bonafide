import { useState } from "react";
import {
  faDollarSign,
  faShoppingCart,
  faBoxOpen,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

import RevenueChart from "../charts/dashboard/RevenueChart";
import OrdersChart from "../charts/dashboard/OrdersChart";
import CategorySalesChart from "../charts/dashboard/CategorySalesChart";
import DateFilter, { type FilterType } from "../filter/DateFilter";

import KpiCard from "./cards/KpiCard";
import OrderPipelineCard from "./cards/OrderPipelineCard";
import TopProductsCard from "./cards/TopProductsCard";
import TopLocationsCard from "./cards/TopLocationsCard";
import LowStockCard from "./cards/LowStockCard";
import RecentOrdersTable from "./tables/RecentOrdersTable";
import TakaIcon from "../ui/TakaIcon";

import { themeColors } from "../../lib/themeColors";

const Dashboard = () => {
  const [globalFilter, setGlobalFilter] = useState<FilterType>("this-week");

  const handleGlobalFilterChange = (
    type: FilterType,
    range: [string, string],
  ) => {
    setGlobalFilter(type);
    console.log("Global Dashboard Filter:", type, range);
  };

  const colors = themeColors();

  const kpis = [
    {
      label: "Total Revenue",
      value: (
        <>
          <TakaIcon className="mr-1.5 text-xl align-baseline" />
          12,48,500
        </>
      ),
      icon: faDollarSign,
      trend: "12.5%",
      trendUp: true,
      accentColor: colors.primary,
      meta: (
        <>
          vs. <TakaIcon className="mx-0.5" />
          11,10,200 last period
        </>
      ),
    },
    {
      label: "Total Orders",
      value: "8,420",
      icon: faShoppingCart,
      trend: "8.2%",
      trendUp: true,
      accentColor: colors.chart4 || "#10B981",
      meta: "1,248 new this week",
    },
    {
      label: "Total Products",
      value: "1,245",
      icon: faBoxOpen,
      trend: "4.1%",
      trendUp: true,
      accentColor: colors.chart3 || "#1F2937",
      meta: "1,108 active · 137 draft",
    },
    {
      label: "Total Customers",
      value: "5,840",
      icon: faUsers,
      trend: "5.4%",
      trendUp: true,
      accentColor: colors.chart5 || "#6366F1",
      meta: "+128 new this week",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            E-commerce Overview
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Real-time performance across sales, products and customers.
          </p>
        </div>
        <DateFilter
          onFilterChange={handleGlobalFilterChange}
          activeFilter={globalFilter}
        />
      </div>

      {/* Row 1 — Top 4 KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </div>

      {/* Row 2 — Revenue trend (wide) + Category donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RevenueChart externalFilter={globalFilter} />
        </div>
        <div>
          <CategorySalesChart />
        </div>
      </div>

      {/* Row 3 — Order pipeline (narrow) + Orders bar chart (wide) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div>
          <OrderPipelineCard />
        </div>
        <div className="lg:col-span-2">
          <OrdersChart externalFilter={globalFilter} />
        </div>
      </div>

      {/* Row 4 — Three custom widget cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <TopProductsCard />
        <TopLocationsCard />
        <LowStockCard />
      </div>

      {/* Row 5 — Recent orders table (full width for breathing room) */}
      <div>
        <RecentOrdersTable externalFilter={globalFilter} />
      </div>
    </div>
  );
};

export default Dashboard;
