"use client";

import React, { useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import Sidebar from "../components/Sidebar";
import * as XLSX from "xlsx";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface Transaction {
  customer: string;
  transactionId: string;
  amount: string;
  origin: string;
  channel: string;
  status: string;
  date: string;
  avatar: string;
}

export default function AllTransactionsPage() {
  const initialTransactions: Transaction[] = [
    {
      customer: "Reagan",
      transactionId: "TUM1234659",
      amount: "30,000",
      origin: "UK - Kenya",
      channel: "MPESA",
      status: "Successful",
      date: "12/10/2024, 10:00:00 AM",
      avatar: "/avatar.png",
    },
    {
      customer: "Alex",
      transactionId: "TUM543210",
      amount: "50,000",
      origin: "US - Kenya",
      channel: "Bank Transfer",
      status: "Pending",
      date: "12/13/2024, 12:00:00 AM",
      avatar: "/avatar2.jpg",
    },
    {
      customer: "Mike",
      transactionId: "TUM543211",
      amount: "500,000",
      origin: "US - Kenya",
      channel: "Bank Transfer",
      status: "Pending",
      date: "11/15/2024, 14:30:00 PM",
      avatar: "/avatar2.jpg",
    },
    {
      customer: "Reagan",
      transactionId: "TUM123469",
      amount: "30,000",
      origin: "UK - Kenya",
      channel: "MPESA",
      status: "Successful",
      date: "12/18/2024, 09:00:00 AM",
      avatar: "/avatar.png", // Replace with your avatar path
    },
    {
      customer: "Alex",
      transactionId: "TUM543212",
      amount: "50,000",
      origin: "US - Kenya",
      channel: "Bank Transfer",
      status: "Pending",
      date: "12/10/2024, 10:00:00 AM",
      avatar: "/avatar2.jpg",
    },
    {
      customer: "Alice",
      transactionId: "TUM542210",
      amount: "50,000",
      origin: "US - Kenya",
      channel: "Bank Transfer",
      status: "Pending",
      date: "12/10/2024, 10:00:00 AM",
      avatar: "/avatar4.jpg",
    },
    {
      customer: "Alice",
      transactionId: "TUM5433210",
      amount: "50,000",
      origin: "US - Kenya",
      channel: "MPESA",
      status: "Pending",
      date: "12/10/2024, 10:00:00 AM",
      avatar: "/avatar4.jpg",
    },
    {
      customer: "Zach",
      transactionId: "TUM5432107",
      amount: "50,000",
      origin: "US - Kenya",
      channel: "Bank Transfer",
      status: "Pending",
      date: "12/10/2024, 10:00:00 AM",
      avatar: "/avatar.png",
    },
  ];

  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleSearch = (e: any) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filteredTransactions = initialTransactions.filter(
      (transaction) =>
        transaction.customer.toLowerCase().includes(value) ||
        transaction.transactionId.toLowerCase().includes(value) ||
        transaction.channel.toLowerCase().includes(value)
    );
    setTransactions(filteredTransactions);
  };

  const handleFilterByDate = () => {
    const { startDate, endDate } = dateRange;
    const filteredTransactions = initialTransactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
    setTransactions(filteredTransactions);
    setIsDatePickerOpen(false);
  };

  const exportToExcel = () => {
    const dataToExport = transactions.map((transaction) => ({
      Customer: transaction.customer,
      "Transaction ID": transaction.transactionId,
      Amount: transaction.amount,
      Origin: transaction.origin,
      Channel: transaction.channel,
      Status: transaction.status,
      Date: new Date(transaction.date).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.writeFile(workbook, "Transactions.xlsx");
  };

  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const handleRowClick = (transaction: any) => {
    setSelectedTransaction(transaction);
  };

  const closeModal = () => setSelectedTransaction(null);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">All transactions</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 flex-wrap" />
              <input
                type="text"
                placeholder="Search by name, ID, channel..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-gray-500 focus:border-gray-500"
              />
            </div>

            <button
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              className="px-4 py-2 text-gray-700 rounded-md hover:bg-gray-400 border border-gray-300"
            >
              Filter by Date
            </button>

            <button
              onClick={exportToExcel}
              className="px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
            >
              Export to excel
            </button>
          </div>
        </div>

        {isDatePickerOpen && (
          <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-md p-4">
            <DateRangePicker
              ranges={[dateRange]}
              onChange={(item: any) => setDateRange(item.selection)}
            />
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={() => setIsDatePickerOpen(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleFilterByDate}
                className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
              >
                Apply Filter
              </button>
            </div>
          </div>
        )}

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
                transactions.map((transaction) => (
                  <tr
                    key={transaction.transactionId}
                    className="text-gray-700 cursor-pointer text-sm hover:bg-gray-50"
                    onClick={() => handleRowClick(transaction)}
                  >
                    <td className="py-4 px-6 flex items-center gap-2">
                      <img
                        src={transaction.avatar}
                        alt={transaction.customer}
                        className="h-8 w-8 rounded-full object-cover "
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

        {/* Slide-In Modal */}
        {selectedTransaction && (
          <div className="fixed inset-0 flex justify-end z-50">
            <div
              className="bg-black bg-opacity-50 w-full h-full"
              onClick={closeModal}
            ></div>
            <div className="bg-white w-[40rem] h-full shadow-lg p-8 overflow-y-auto relative">
              {/* Header */}
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    #{selectedTransaction?.transactionId}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedTransaction?.date}
                  </p>
                </div>
                <button
                  className="text-gray-500 hover:text-gray-800 text-2xl absolute top-4 right-4"
                  onClick={closeModal}
                >
                  &times;
                </button>
              </div>

              {/* Content */}
              <div className="mt-6">
                {/* Yellow Line */}
                <div className="border-l-4 border-yellow-500 pl-6 mb-6">
                  {/* Customer Section */}

                  <div className="mb-6">
                    <div className="grid grid-cols-2 gap-y-4 text-lg text-gray-700">
                      <p className="text-lg font-bold text-gray-800 mb-4">
                        Customer
                      </p>
                      <img
                        src={selectedTransaction.avatar}
                        alt="Customer Avatar"
                        className="w-12 h-12 rounded-full object-cover text-right"
                      />

                      <p className="text-gray-400">Name:</p>
                      <p className="font-semibold">
                        {selectedTransaction.customer}
                      </p>
                      <p className="text-gray-400">Phone No.</p>
                      <p>+254 722999888</p>
                    </div>
                  </div>

                  {/* Transaction Section */}
                  <div className="mb-6">
                    <p className="text-lg font-bold text-gray-800 mb-4">
                      Transaction
                    </p>
                    <div className="grid grid-cols-2 gap-y-4 text-lg text-gray-700">
                      <p className="text-gray-400">Amount:</p>
                      <p className="font-semibold">
                        {selectedTransaction.amount}
                      </p>
                      <p className="text-gray-400">Channel:</p>
                      <p>{selectedTransaction.channel}</p>
                      <p className="text-gray-400">Purpose:</p>
                      <p>Deposit</p>
                      <p className="text-gray-400">Status:</p>
                      <p className="font-semibold text-green-600">
                        {selectedTransaction.status}
                      </p>
                      <p className="text-gray-400">Origin:</p>
                      <p>{selectedTransaction.origin}</p>
                      <p className="text-gray-400">Destination:</p>
                      <p>Kenya</p>
                    </div>
                  </div>

                  {/* Rates Section */}
                  <div className="mb-6">
                    <p className="text-lg font-bold text-gray-800 mb-4">
                      Rates
                    </p>
                    <div className="grid grid-cols-2 gap-y-4 text-lg text-gray-700">
                      <p className="text-gray-400">Exchange Rate:</p>
                      <p>1GBP = 100 KES</p>
                      <p className="text-gray-400">Transaction Fee:</p>
                      <p>0.00</p>
                    </div>
                  </div>

                  {/* Receiver Section */}
                  <div>
                    <p className="text-lg font-bold text-gray-800 mb-4">
                      Receiver
                    </p>
                    <div className="grid grid-cols-2 gap-y-4 text-lg text-gray-700">
                      <p className="text-gray-400">Name:</p>
                      <p>Promitto</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <Pagination className="text-xl mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="/all-transactions">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </main>
    </div>
  );
}
