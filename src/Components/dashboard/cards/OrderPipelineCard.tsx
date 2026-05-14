import { Clock, Loader2, Truck, CheckCircle2 } from "lucide-react";

const stages = [
  { label: "Pending", count: 146, color: "#F59E0B", icon: Clock },
  { label: "Processing", count: 84, color: "#3B82F6", icon: Loader2 },
  { label: "Shipped", count: 242, color: "#8B5CF6", icon: Truck },
  { label: "Delivered", count: 7948, color: "#10B981", icon: CheckCircle2 },
];

const OrderPipelineCard = () => {
  const total = stages.reduce((sum, s) => sum + s.count, 0);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 h-full flex flex-col">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-gray-900">Order Pipeline</h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Live status breakdown
          </p>
        </div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
          Today
        </span>
      </div>

      <div className="space-y-4 flex-1">
        {stages.map((stage) => {
          const pct = Math.round((stage.count / total) * 100);
          const Icon = stage.icon;
          return (
            <div key={stage.label}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${stage.color} 14%, transparent)`,
                      color: stage.color,
                    }}
                  >
                    <Icon size={14} />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    {stage.label}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-900">
                    {stage.count.toLocaleString()}
                  </span>
                  <span className="text-[11px] font-semibold text-gray-400 ml-1.5">
                    {pct}%
                  </span>
                </div>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: stage.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderPipelineCard;
