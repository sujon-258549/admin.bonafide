import type { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { chartPalette } from "../../../lib/themeColors";

const CategorySalesChart = () => {
  const options: ApexOptions = {
    chart: { type: "pie" },
    labels: ["Saree", "Lungi", "Three-Piece", "Panjabi", "Fabric"],
    colors: chartPalette(),
    legend: { position: "bottom" },
    stroke: { show: false },
  };

  const series = [38, 24, 18, 12, 8];

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 ">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Category Sales</h3>
      <Chart options={options} series={series} type="pie" height={280} />
    </div>
  );
};

export default CategorySalesChart;


