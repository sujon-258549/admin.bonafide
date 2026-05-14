import type { ReactNode } from "react";

interface KpiCardProps {
  label: string;
  value: ReactNode;
  accentColor: string;
  meta?: ReactNode;
}

const KpiCard = ({ label, value, accentColor, meta }: KpiCardProps) => {
  return (
    <div className="relative bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-sm transition-shadow">
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: accentColor }}
      />
      <div className="p-5 pt-6">
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
