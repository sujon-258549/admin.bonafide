import { AlertTriangle } from "lucide-react";

const items = [
  { name: "Jamdani Silk Saree", category: "Saree", stock: 4, threshold: 20 },
  { name: "Premium Cotton Lungi", category: "Lungi", stock: 0, threshold: 25 },
  { name: "Poplin Shirt Fabric (White)", category: "Fabric", stock: 7, threshold: 30 },
  { name: "Embroidered Panjabi (XL)", category: "Panjabi", stock: 2, threshold: 15 },
  { name: "Designer Three-Piece Set", category: "Three-Piece", stock: 6, threshold: 18 },
];

const LowStockCard = () => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 h-full flex flex-col">
    <div className="flex items-start justify-between mb-5">
      <div>
        <h3 className="text-base font-bold text-gray-900">Stock Alerts</h3>
        <p className="text-xs text-gray-400 mt-0.5">Items needing attention</p>
      </div>
      <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center">
        <AlertTriangle size={14} />
      </div>
    </div>

    <div className="space-y-1 flex-1">
      {items.map((item) => (
        <div
          key={item.name}
          className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0"
        >
          <div className="flex-1 min-w-0 pr-3">
            <p className="text-sm font-semibold text-gray-800 truncate">
              {item.name}
            </p>
            <p className="text-[11px] text-gray-400">
              {item.category} · min {item.threshold}
            </p>
          </div>
          <span
            className={`text-[11px] font-bold px-2.5 py-1 rounded-md whitespace-nowrap ${
              item.stock === 0
                ? "bg-rose-50 text-rose-600"
                : "bg-amber-50 text-amber-600"
            }`}
          >
            {item.stock === 0 ? "Out of Stock" : `${item.stock} left`}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default LowStockCard;
