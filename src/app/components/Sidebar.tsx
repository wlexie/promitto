import { FC } from "react";
import { HomeIcon } from "lucide-react";

const Sidebar: FC = () => {
  return (
    <div className="w-70 max-h-full bg-white border-r border-gray-200 flex flex-col ">
      <div className="flex items-center justify-center py-6">
        <img
          src="/promitto_logo.png"
          alt="Logo"
          className="w-30 h-22 px-2 py-2"
        />
      </div>
      <nav className="flex flex-col gap-4 px-4">
        <a
          href="/dashboard"
          className="flex items-center gap-4 px-4 py-2 rounded-lg text-secondary bg-gray-100"
        >
          <img src="/dashboard.png" className="w-6 h-6" /> Dashboard
        </a>
        <a
          href="/all-transactions"
          className="flex items-center gap-4 px-4 py-2 rounded-lg text-secondary hover:bg-gray-100"
        >
          <img src="/event.png" className="w-6 h-6" />
          All Transactions
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
