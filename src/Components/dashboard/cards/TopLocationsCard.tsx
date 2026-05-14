import { MapPin } from "lucide-react";

const locations = [
  { city: "Dhaka", orders: 3420, pct: 41 },
  { city: "Chittagong", orders: 1850, pct: 22 },
  { city: "Sylhet", orders: 1240, pct: 15 },
  { city: "Rajshahi", orders: 980, pct: 12 },
  { city: "Khulna", orders: 720, pct: 9 },
];

const TopLocationsCard = () => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 h-full flex flex-col">
    <div className="flex items-start justify-between mb-5">
      <div>
        <h3 className="text-base font-bold text-gray-900">Top Locations</h3>
        <p className="text-xs text-gray-400 mt-0.5">By order volume</p>
      </div>
      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
        <MapPin size={14} />
      </div>
    </div>

    <div className="space-y-4 flex-1">
      {locations.map((loc) => (
        <div key={loc.city}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-semibold text-gray-700">
              {loc.city}
            </span>
            <span className="text-xs text-gray-500">
              <span className="font-bold text-gray-900">
                {loc.orders.toLocaleString()}
              </span>{" "}
              <span className="text-gray-400">orders</span>
            </span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${loc.pct}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TopLocationsCard;
