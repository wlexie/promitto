import { FC } from "react";
import { FilterIcon } from "lucide-react";

const Header: FC = () => {
  return (
    <header className="flex justify-between items-center py-4 px-8 bg-none shadow-0">
      <h1 className="text-3xl font-bold text-secondary">Dashboard</h1>
      {/* <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 bg-transparent px-4 py-2 rounded-lg text-gray-600 border">
          <FilterIcon className="w-5 h-5" /> Filter by Date
        </button>
      </div> */}
    </header>
  );
};

export default Header;
