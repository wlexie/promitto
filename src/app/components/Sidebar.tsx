"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FC } from "react";

const Sidebar: FC = () => {
  const pathname = usePathname(); // Get current route

  return (
    <div className="fixed h-screen w-80 bg-amber-400 flex flex-col">
      <div className="flex items-center justify-center py-10">
        <img
          src="/promitto_logo.png"
          alt="Logo"
          className="w-14 h-14 px-2 py-2 -ml-24"
        />{" "}
        <span className="font-extrabold text-black text-2xl">
          &nbsp;&nbsp;PROMITTO
        </span>
      </div>
      <nav className="flex flex-col gap-4 px-4">
        <Link
          href="/dashboard"
          className={`flex items-center gap-4 px-4 py-2 rounded-lg ${
            pathname === "/dashboard"
              ? "bg-white text-black"
              : "text-secondary hover:bg-gray-100"
          }`}
        >
          <img src="/dashboard.png" className="w-6 h-6" />
          Dashboard 
        </Link>
        <Link
          href="/all-transactions"
          className={`flex items-center gap-4 px-4 py-2 rounded-lg ${
            pathname === "/all-transactions"
              ? "bg-white text-black"
              : "text-secondary hover:bg-gray-100"
          }`}
        >
          <img src="/event.png" className="w-6 h-6" />
          All Transactions
        </Link>
        <Link
          href="/campaigns" // Adjust this href to match your campaigns route
          className={`flex items-center gap-4 px-4 py-2 rounded-lg ${
            pathname === "/campaigns"
              ? "bg-white text-black"
              : "text-secondary hover:bg-gray-100"
          }`}
        >
          <img src="/campaign/bell.svg" className="w-7 h-7" />
          Campaigns
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;