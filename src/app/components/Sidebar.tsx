"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FC } from "react";

const Sidebar: FC = () => {
  const pathname = usePathname(); // Get current route

  return (
    <div className="w-70 max-h-full bg-white flex flex-col">
      <div className="flex items-center justify-center py-6">
        <img
          src="/promitto_logo.png"
          alt="Logo"
          className="w-16 h-16 px-2 py-2"
        />
      </div>
      <nav className="flex flex-col gap-4 px-4">
        <Link
          href="/dashboard"
          className={`flex items-center gap-4 px-4 py-2 rounded-lg ${
            pathname === "/dashboard"
              ? "bg-gray-200 text-black"
              : "text-secondary hover:bg-gray-100"
          }`}
        >
          <img src="/dashboard.png" className="w-6 h-6" /> Dashboard
        </Link>
        <Link
          href="/all-transactions"
          className={`flex items-center gap-4 px-4 py-2 rounded-lg ${
            pathname === "/all-transactions"
              ? "bg-gray-200 text-black"
              : "text-secondary hover:bg-gray-100"
          }`}
        >
          <img src="/event.png" className="w-6 h-6" />
          All Transactions
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
