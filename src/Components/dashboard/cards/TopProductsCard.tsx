import Button from "../../ui/Button";
import TakaIcon from "../../ui/TakaIcon";

const products = [
  {
    rank: 1,
    name: "Premium Silk Saree",
    category: "Saree",
    sold: 412,
    revenue: 824000,
    img: "🥻",
  },
  {
    rank: 2,
    name: "Cotton Lungi Classic",
    category: "Lungi",
    sold: 388,
    revenue: 232800,
    img: "🧵",
  },
  {
    rank: 3,
    name: "Poplin Shirt Fabric",
    category: "Fabric",
    sold: 305,
    revenue: 305000,
    img: "🧶",
  },
  {
    rank: 4,
    name: "Designer Three-Piece",
    category: "Three-Piece",
    sold: 244,
    revenue: 366000,
    img: "👗",
  },
  {
    rank: 5,
    name: "Embroidered Panjabi",
    category: "Panjabi",
    sold: 198,
    revenue: 198000,
    img: "👔",
  },
];

const rankBadge = (rank: number) => {
  if (rank === 1) return "bg-amber-100 text-amber-700";
  if (rank === 2) return "bg-gray-200 text-gray-700";
  if (rank === 3) return "bg-orange-100 text-orange-700";
  return "bg-gray-50 text-gray-500";
};

const TopProductsCard = () => (
  <div className="bg-white rounded-2xl border border-gray-200 p-6 h-full flex flex-col">
    <div className="flex items-start justify-between mb-5">
      <div>
        <h3 className="text-base font-bold text-gray-900">Top Selling</h3>
        <p className="text-xs text-gray-400 mt-0.5">Best performers</p>
      </div>
      <Button
        unstyled
        className="text-xs font-semibold text-primary hover:underline"
      >
        View All
      </Button>
    </div>

    <div className="space-y-2.5 flex-1">
      {products.map((p) => (
        <div
          key={p.rank}
          className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span
            className={`w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-bold ${rankBadge(p.rank)}`}
          >
            {p.rank}
          </span>
          <div className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-lg shrink-0">
            {p.img}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">
              {p.name}
            </p>
            <p className="text-[11px] text-gray-400">
              {p.category} · {p.sold} sold
            </p>
          </div>
          <span className="text-sm font-bold text-gray-900 whitespace-nowrap">
            <TakaIcon className="mr-1 text-xs" />
            {p.revenue.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default TopProductsCard;
