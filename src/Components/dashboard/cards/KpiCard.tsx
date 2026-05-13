import type { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface KpiCardProps {
  label: string;
  value: ReactNode;
  icon: IconDefinition;
  trend: string;
  trendUp: boolean;
  accentColor: string;
  meta?: ReactNode;
}

const KpiCard = ({
  label,
  value,
  icon,
  trend,
  trendUp,
  accentColor,
  meta,
}: KpiCardProps) => {
  return (
    <div className="relative bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-sm transition-shadow">
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: accentColor }}
      />
      <div className="p-5 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{
              backgroundColor: `color-mix(in srgb, ${accentColor} 12%, transparent)`,
              color: accentColor,
            }}
          >
            <FontAwesomeIcon icon={icon} className="text-base" />
          </div>
          <span
            className="text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1"
            style={{
              backgroundColor: trendUp
                ? "rgba(16, 185, 129, 0.1)"
                : "rgba(244, 63, 94, 0.1)",
              color: trendUp ? "#059669" : "#e11d48",
            }}
          >
            <span>{trendUp ? "↑" : "↓"}</span>
            {trend}
          </span>
        </div>
        <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
          {label}
        </h4>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          {value}
        </h2>
        {meta && <p className="text-xs text-gray-400 mt-1.5">{meta}</p>}
      </div>
    </div>
  );
};

export default KpiCard;
