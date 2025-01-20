"use client";

import React, { useState } from "react";
import { Search, Calendar, ChevronDown, Star, ArrowRight } from "lucide-react";
import Sidebar from "../components/Sidebar";
import * as XLSX from "xlsx";

export default function AllTransactionsPage() {
  // Sample data for transactions
  const initialTransactions = [
    {
      customer: "Reagan",
      transactionId: "TUM123465",
      amount: "30,000",
      origin: "UK - Kenya",
      channel: "MPESA",
      status: "Successful",
      date: "2024-12-10T10:00:00",
      avatar: "/avatar.png", // Replace with your avatar path
    },
    {
      customer: "Alex",
      transactionId: "TUM543210",
      amount: "50,000",
      origin: "US - Kenya",
      channel: "Bank Transfer",
      status: "Pending",
      date: "2024-11-15T14:30:00",
      avatar: "/avatar2.jpg",
    },
    {
      customer: "Alice",
      transactionId: "TUM542210",
      amount: "50,000",
      origin: "US - Kenya",
      channel: "Bank Transfer",
      status: "Pending",
      date: "2024-11-15T14:30:00",
      avatar: "/avatar4.jpg",
    },
    {
      customer: "Alice",
      transactionId: "TUM543210",
      amount: "50,000",
      origin: "US - Kenya",
      channel: "Bank Transfer",
      status: "Pending",
      date: "2024-11-15T15:30:00",
      avatar: "/avatar4.jpg",
    },
    {
      customer: "Zach",
      transactionId: "TUM543210",
      amount: "50,000",
      origin: "US - Kenya",
      channel: "Bank Transfer",
      status: "Pending",
      date: "2024-11-15T14:30:00",
      avatar: "/avatar.png",
    },
    {
      customer: "Alice",
      transactionId: "TUM543210",
      amount: "5,000",
      origin: "US - Kenya",
      channel: "Bank Transfer",
      status: "Pending",
      date: "2024-11-15T14:30:00",
      avatar: "/avatar4.jpg",
    },
    {
      customer: "Mike",
      transactionId: "TUM543210",
      amount: "500,000",
      origin: "US - Kenya",
      channel: "Bank Transfer",
      status: "Pending",
      date: "2024-11-15T14:30:00",
      avatar: "/avatar2.jpg",
    },
  ];

  const [transactions, setTransactions] = useState(initialTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Handle search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filteredTransactions = initialTransactions.filter((transaction) =>
      transaction.customer.toLowerCase().includes(value)
    );
    setTransactions(filteredTransactions);
  };

  // Handle date range filtering
  const handleFilterByDate = () => {
    if (!startDate || !endDate) {
      alert("Please select a start and end date.");
      return;
    }

    const filteredTransactions = initialTransactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate >= new Date(startDate) &&
        transactionDate <= new Date(endDate)
      );
    });
    setTransactions(filteredTransactions);
  };

  const exportToExcel = () => {
    // Map the transactions to a simpler format (excluding avatar and formatting the date)
    const dataToExport = transactions.map((transaction) => ({
      Customer: transaction.customer,
      "Transaction ID": transaction.transactionId,
      Amount: transaction.amount,
      Origin: transaction.origin,
      Channel: transaction.channel,
      Status: transaction.status,
      Date: new Date(transaction.date).toLocaleString(),
    }));

    // Create a new workbook and add the data
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

    // Export the workbook to an Excel file
    XLSX.writeFile(workbook, "Transactions.xlsx");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">All transactions</h1>
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by customer name"
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-gray-500 focus:border-gray-500"
              />
            </div>

            {/* Filter by Date */}
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-500 focus:border-gray-500"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-500 focus:border-gray-500"
              />
              <button
                onClick={handleFilterByDate}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100"
              >
                Filter by Date
              </button>
            </div>

            {/* Export Button */}
            <button
              onClick={exportToExcel}
              className="px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
            >
              Export to excel
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="mt-6 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <table className="w-full table-auto text-left">
            <thead className="bg-white">
              <tr className="text-gray-400 font-light text-sm">
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">Amount (KES)</th>
                <th className="py-3 px-4">Origin</th>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <tr
                    key={index}
                    className="text-gray-700 text-sm hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 flex items-center gap-2">
                      <img
                        src={transaction.avatar}
                        alt={transaction.customer}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      {transaction.customer}
                    </td>
                    <td className="py-3 px-4">{transaction.transactionId}</td>
                    <td className="py-3 px-4">{transaction.amount}</td>
                    <td className="py-3 px-4">{transaction.origin}</td>
                    <td className="py-3 px-4">{transaction.channel}</td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 text-sm font-medium text-green-600 bg-green-100 rounded-full">
                        {transaction.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {new Date(transaction.date).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <ArrowRight className="h-5 w-5 text-gray-500" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="py-6 px-4 text-center text-gray-500"
                  >
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
