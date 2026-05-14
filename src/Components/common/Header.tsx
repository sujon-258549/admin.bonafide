import { Menu, Search } from "lucide-react";
import { useState } from "react";
import SearchInput from "../ui/SearchInput";
import Button from "../ui/Button";
import NotificationDropdown from "../dropdown/NotificationDropdown";
import ProfileDropdown from "../dropdown/ProfileDropdown";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const handleSearch = (value: string) => console.log(value);

  return (
    <header className="h-16 sm:h-20 bg-white border-b border-gray-200 sticky top-0 z-40 px-3 sm:px-4 lg:px-6 flex items-center justify-between gap-3">
      {/* Left: Toggle & Search */}
      <div className="flex items-center gap-3 sm:gap-6 flex-1 max-w-xl min-w-0">
        <Button
          unstyled
          onClick={onMenuClick}
          className="p-1.5 hover:bg-gray-200 rounded-sm transition-colors border border-gray-200 shrink-0 flex items-center justify-center"
        >
          <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
        </Button>

        {/* Desktop search */}
        <div className="w-full hidden md:block">
          <SearchInput
            placeholder="Search keywords..."
            onSearch={handleSearch}
          />
        </div>

        {/* Mobile search trigger */}
        <Button
          unstyled
          onClick={() => setMobileSearchOpen((v) => !v)}
          className="md:hidden p-1.5 hover:bg-gray-200 rounded-sm transition-colors border border-gray-200 shrink-0 flex items-center justify-center"
        >
          <Search className="w-5 h-5 text-gray-500" />
        </Button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <NotificationDropdown />
        <ProfileDropdown />
      </div>

      {/* Mobile search drawer */}
      {mobileSearchOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 px-3 py-3 shadow-sm">
          <SearchInput
            placeholder="Search keywords..."
            onSearch={(v) => {
              handleSearch(v);
              setMobileSearchOpen(false);
            }}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
