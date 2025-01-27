"use client";

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  useNavigate,
} from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
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
  purpose: string;
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
      date: "07/10/2024, 10:00:00 AM",
      avatar: "/avatar.png",
      purpose: "Deposit",
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
      purpose: "Loan Repayment",
    },
    {
      customer: "Mike",
      transactionId: "TUM543211",
      amount: "500,000",
      origin: "US - Kenya",
      channel: "Bank Transfer",
      status: "Pending",
      date: "11/15/2024, 08:30:00 AM",
      avatar: "/avatar2.jpg",
      purpose: "Deposit",
    },
    {
      customer: "Reagan",
      transactionId: "TUM123469",
      amount: "30,000",
      origin: "UK - Kenya",
      channel: "MPESA",
      status: "Successful",
      date: "12/18/2024, 09:00:00 AM",
      avatar: "/avatar.png",
      purpose: "Loan Repayment",
    },
    {
      customer: "Alex",
      transactionId: "TUM543212",
      amount: "50,000",
      origin: "US - Kenya",
      channel: "Bank Transfer",
      status: "Pending",
      date: "04/10/2024, 10:00:00 AM",
      avatar: "/avatar2.jpg",
      purpose: "Loan Repayment",
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
      purpose: "Deposit",
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
      purpose: "Loan Repayment",
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
      purpose: "Loan Repayment",
    },
    {
      customer: "Reagan",
      transactionId: "TUM12346659",
      amount: "30,000",
      origin: "UK - Kenya",
      channel: "MPESA",
      status: "Successful",
      date: "07/10/2024, 10:00:00 AM",
      avatar: "/avatar.png",
      purpose: "Deposit",
    },
    {
      customer: "Alex",
      transactionId: "TUM5439910",
      amount: "50,000",
      origin: "US - Kenya",
      channel: "Bank Transfer",
      status: "Pending",
      date: "12/13/2024, 12:00:00 AM",
      avatar: "/avatar2.jpg",
      purpose: "Loan Repayment",
    },
    {
      customer: "Mike",
      transactionId: "TUM54321123",
      amount: "500,000",
      origin: "US - Kenya",
      channel: "Bank Transfer",
      status: "Pending",
      date: "11/15/2024, 08:30:00 AM",
      avatar: "/avatar2.jpg",
      purpose: "Deposit",
    },
    {
      customer: "Reagan",
      transactionId: "TUM123470",
      amount: "30,000",
      origin: "UK - Kenya",
      channel: "MPESA",
      status: "Successful",
      date: "12/18/2024, 09:00:00 AM",
      avatar: "/avatar.png",
      purpose: "Loan Repayment",
    },
    {
      customer: "Alex",
      transactionId: "TUM543223",
      amount: "50,000",
      origin: "US - Kenya",
      channel: "Bank Transfer",
      status: "Pending",
      date: "04/10/2024, 10:00:00 AM",
      avatar: "/avatar2.jpg",
      purpose: "Loan Repayment",
    },
    {
      customer: "Alice",
      transactionId: "TUM542289",
      amount: "50,000",
      origin: "US - Kenya",
      channel: "Bank Transfer",
      status: "Pending",
      date: "12/10/2024, 10:00:00 AM",
      avatar: "/avatar4.jpg",
      purpose: "Deposit",
    },
    {
      customer: "Alice",
      transactionId: "TUM5433235",
      amount: "50,000",
      origin: "US - Kenya",
      channel: "MPESA",
      status: "Pending",
      date: "12/10/2024, 10:00:00 AM",
      avatar: "/avatar4.jpg",
      purpose: "Loan Repayment",
    },
    {
      customer: "Zach",
      transactionId: "TUM5432196",
      amount: "50,000",
      origin: "US - Kenya",
      channel: "Bank Transfer",
      status: "Pending",
      date: "12/10/2024, 10:00:00 AM",
      avatar: "/avatar.png",
      purpose: "Loan Repayment",
    },
    {
      customer: "Reagan",
      transactionId: "TUM12346449",
      amount: "30,000",
      origin: "UK - Kenya",
      channel: "MPESA",
      status: "Successful",
      date: "07/10/2024, 10:00:00 AM",
      avatar: "/avatar.png",
      purpose: "Deposit",
    },
    {
      customer: "Alex",
      transactionId: "TUM5432008",
      amount: "50,000",
      origin: "US - Kenya",
      channel: "Bank Transfer",
      status: "Pending",
      date: "12/13/2024, 12:00:00 AM",
      avatar: "/avatar2.jpg",
      purpose: "Loan Repayment",
    },
    {
      customer: "Mike",
      transactionId: "TUM54321006",
      amount: "500,000",
      origin: "US - Kenya",
      channel: "Bank Transfer",
      status: "Pending",
      date: "11/15/2024, 08:30:00 AM",
      avatar: "/avatar2.jpg",
      purpose: "Deposit",
    },
    {
      customer: "Reagan",
      transactionId: "TUM12346859",
      amount: "30,000",
      origin: "UK - Kenya",
      channel: "MPESA",
      status: "Successful",
      date: "12/18/2024, 09:00:00 AM",
      avatar: "/avatar.png",
      purpose: "Loan Repayment",
    },
    {
      customer: "Alex",
      transactionId: "TUM54321253",
      amount: "50,000",
      origin: "US - Kenya",
      channel: "Bank Transfer",
      status: "Pending",
      date: "04/10/2024, 10:00:00 AM",
      avatar: "/avatar2.jpg",
      purpose: "Loan Repayment",
    },
    {
      customer: "Alice",
      transactionId: "TUM5422120",
      amount: "50,000",
      origin: "US - Kenya",
      channel: "Bank Transfer",
      status: "Pending",
      date: "12/10/2024, 10:00:00 AM",
      avatar: "/avatar4.jpg",
      purpose: "Deposit",
    },
    {
      customer: "Alice",
      transactionId: "TUM54332766",
      amount: "50,000",
      origin: "US - Kenya",
      channel: "MPESA",
      status: "Pending",
      date: "12/10/2024, 10:00:00 AM",
      avatar: "/avatar4.jpg",
      purpose: "Loan Repayment",
    },
    {
      customer: "Zach",
      transactionId: "TUM543210007",
      amount: "50,000",
      origin: "US - Kenya",
      channel: "Bank Transfer",
      status: "Pending",
      date: "12/10/2024, 10:00:00 AM",
      avatar: "/avatar.png",
      purpose: "Loan Repayment",
    },
    {
      customer: "Reagan",
      transactionId: "TUM123461222",
      amount: "30,000",
      origin: "UK - Kenya",
      channel: "MPESA",
      status: "Successful",
      date: "07/10/2024, 10:00:00 AM",
      avatar: "/avatar.png",
      purpose: "Deposit",
    },
    {
      customer: "Alex",
      transactionId: "TUM54321088",
      amount: "50,000",
      origin: "US - Kenya",
      channel: "Bank Transfer",
      status: "Pending",
      date: "12/13/2024, 12:00:00 AM",
      avatar: "/avatar2.jpg",
      purpose: "Loan Repayment",
    },
    {
      customer: "Mike",
      transactionId: "TUM54321541",
      amount: "500,000",
      origin: "US - Kenya",
      channel: "Bank Transfer",
      status: "Pending",
      date: "11/15/2024, 08:30:00 AM",
      avatar: "/avatar2.jpg",
      purpose: "Deposit",
    },
    {
      customer: "Reagan",
      transactionId: "TUM1234667",
      amount: "30,000",
      origin: "UK - Kenya",
      channel: "MPESA",
      status: "Successful",
      date: "12/18/2024, 09:00:00 AM",
      avatar: "/avatar.png",
      purpose: "Loan Repayment",
    },
    {
      customer: "Alex",
      transactionId: "TUM54321112",
      amount: "50,000",
      origin: "US - Kenya",
      channel: "Bank Transfer",
      status: "Pending",
      date: "04/10/2024, 10:00:00 AM",
      avatar: "/avatar2.jpg",
      purpose: "Loan Repayment",
    },
    {
      customer: "Alice",
      transactionId: "TUM54221765",
      amount: "50,000",
      origin: "US - Kenya",
      channel: "Bank Transfer",
      status: "Pending",
      date: "12/10/2024, 10:00:00 AM",
      avatar: "/avatar4.jpg",
      purpose: "Deposit",
    },
    {
      customer: "Alice",
      transactionId: "TUM5433210123",
      amount: "50,000",
      origin: "US - Kenya",
      channel: "MPESA",
      status: "Pending",
      date: "12/10/2024, 10:00:00 AM",
      avatar: "/avatar4.jpg",
      purpose: "Loan Repayment",
    },
    {
      customer: "Zach",
      transactionId: "TUM54321075",
      amount: "50,000",
      origin: "US - Kenya",
      channel: "Bank Transfer",
      status: "Pending",
      date: "12/10/2024, 10:00:00 AM",
      avatar: "/avatar.png",
      purpose: "Loan Repayment",
    },
    {
      customer: "Reagan",
      transactionId: "TUM123465923",
      amount: "30,000",
      origin: "UK - Kenya",
      channel: "MPESA",
      status: "Successful",
      date: "07/10/2024, 10:00:00 AM",
      avatar: "/avatar.png",
      purpose: "Deposit",
    },
    {
      customer: "Alex",
      transactionId: "TUM543210122",
      amount: "50,000",
      origin: "US - Kenya",
      channel: "Bank Transfer",
      status: "Pending",
      date: "12/13/2024, 12:00:00 AM",
      avatar: "/avatar2.jpg",
      purpose: "Loan Repayment",
    },
    {
      customer: "Mike",
      transactionId: "TUM543211333",
      amount: "500,000",
      origin: "US - Kenya",
      channel: "Bank Transfer",
      status: "Pending",
      date: "11/15/2024, 08:30:00 AM",
      avatar: "/avatar2.jpg",
      purpose: "Deposit",
    },
    {
      customer: "Reagan",
      transactionId: "TUM123469555",
      amount: "30,000",
      origin: "UK - Kenya",
      channel: "MPESA",
      status: "Successful",
      date: "12/18/2024, 09:00:00 AM",
      avatar: "/avatar.png",
      purpose: "Loan Repayment",
    },
    {
      customer: "Alex",
      transactionId: "TUM543212344",
      amount: "50,000",
      origin: "US - Kenya",
      channel: "Bank Transfer",
      status: "Pending",
      date: "04/10/2024, 10:00:00 AM",
      avatar: "/avatar2.jpg",
      purpose: "Loan Repayment",
    },
    {
      customer: "Alice",
      transactionId: "TUM542210876",
      amount: "50,000",
      origin: "US - Kenya",
      channel: "Bank Transfer",
      status: "Pending",
      date: "12/10/2024, 10:00:00 AM",
      avatar: "/avatar4.jpg",
      purpose: "Deposit",
    },
    {
      customer: "Alice",
      transactionId: "TUM5433210338",
      amount: "50,000",
      origin: "US - Kenya",
      channel: "MPESA",
      status: "Pending",
      date: "12/10/2024, 10:00:00 AM",
      avatar: "/avatar4.jpg",
      purpose: "Loan Repayment",
    },
    {
      customer: "Zach",
      transactionId: "TUM54321078765",
      amount: "50,000",
      origin: "US - Kenya",
      channel: "Bank Transfer",
      status: "Pending",
      date: "12/10/2024, 10:00:00 AM",
      avatar: "/avatar.png",
      purpose: "Loan Repayment",
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
  const [isExportModalVisible, setIsExportModalVisible] = useState(false);
  const [exportType, setExportType] = useState("all");
  const [fileType, setFileType] = useState("csv");
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(transactions.length / rowsPerPage);

  // Get transactions for the current page
  const currentTransactions = transactions.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageNavigation = (page: number) => {
    setCurrentPage(page);
  };
  const exportData = () => {
    if (fileType === "csv") {
      console.log("Exporting data as CSV...");
    } else {
      console.log("Exporting data as Excel...");
    }
    closeExportModal();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filteredTransactions = initialTransactions.filter(
      (transaction) =>
        transaction.customer.toLowerCase().includes(value) ||
        transaction.transactionId.toLowerCase().includes(value) ||
        transaction.channel.toLowerCase().includes(value)
    );
    setTransactions(filteredTransactions);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  const handleFilterByDate = () => {
    const { startDate, endDate } = dateRange;
    const filteredTransactions = initialTransactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
    setTransactions(filteredTransactions);
    setIsDatePickerOpen(false);
    setCurrentPage(1); // Reset to the first page after filtering
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    if (selectedTransaction) {
      setIsModalVisible(true);
    }
  }, [selectedTransaction]);

  const handleRowClick = (transaction: any) => {
    setSelectedTransaction(transaction);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setSelectedTransaction(null);
    }, 300); // Matches the transition duration
  };

  const openExportModal = () => {
    setIsExportModalVisible(true);
  };

  const closeExportModal = () => {
    setIsExportModalVisible(false);
  };

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
              onClick={openExportModal}
              className="px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
            >
              Export
            </button>
          </div>
        </div>

        {isExportModalVisible && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Background Overlay */}
            <div
              className="bg-black bg-opacity-50 w-full h-full"
              onClick={closeExportModal}
            ></div>

            {/* Modal with Slide-in Transition */}
            <div
              className="bg-white w-[36rem] h-full shadow-lg p-8 overflow-y-auto relative transform transition-transform duration-300 translate-x-full"
              style={{ transform: "translateX(0)" }}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
                onClick={closeExportModal}
              >
                &times;
              </button>

              <div className="mt-6 space-y-6">
                <h2 className="text-xl font-bold">Export Transactions</h2>

                <div>
                  <h3 className="font-semibold text-gray-700">Options:</h3>
                  <div className="mt-4 space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="transactionType"
                        className="form-radio text-yellow-500"
                      />
                      <span>All Transactions</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="transactionType"
                        className="form-radio text-yellow-500"
                      />
                      <span>Filtered Transactions</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">Export as:</h3>
                  <div className="mt-4 space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="fileType"
                        className="form-radio text-yellow-500"
                      />
                      <span>CSV</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="fileType"
                        className="form-radio text-yellow-500"
                      />
                      <span>Excel</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <button
                    onClick={closeExportModal}
                    className="px-4 py-2 border border-yellow-500 text-yellow-500 rounded-md hover:bg-yellow-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={exportToExcel}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                  >
                    Export
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
                currentTransactions.map((transaction) => (
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
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Background Overlay */}
            <div
              className="bg-black bg-opacity-50 w-full h-full"
              onClick={closeModal}
            ></div>

            {/* Modal with Slide-in Transition */}
            <div
              className={`bg-white w-[28rem] h-full shadow-lg p-8 overflow-y-auto fixed right-0 transform transition-transform duration-300 ${
                isModalVisible ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
                onClick={closeModal}
              >
                &times;
              </button>

              {/* Modal Content */}
              <div className="mt-6 space-y-8">
                {/* Confirmation Section */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-green-800"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mt-4">
                    KES {selectedTransaction.amount}
                  </h3>
                  <p className="text-gray-500 mt-1">
                    Successfully sent to{" "}
                    <span className="text-black font-semibold text-md">
                      Promitto LTD
                    </span>
                  </p>
                  <p className="text-md text-gray-400 mt-1">
                    on{" "}
                    <span className="text-black font-semibold">
                      {selectedTransaction.date}
                    </span>
                  </p>
                </div>

                {/* Transaction Details */}
                <div className="mt-6">
                  <div className="grid grid-cols-2 gap-y-4 text-gray-700">
                    <p className="text-gray-400">Transaction ID:</p>
                    <p>#{selectedTransaction.transactionId}</p>
                    <p className="text-gray-400">Channel:</p>
                    <p>{selectedTransaction.channel}</p>
                    <p className="text-gray-400">Purpose:</p>
                    <p>{selectedTransaction.purpose}</p>
                    <p className="text-gray-400">Origin:</p>
                    <p>{selectedTransaction.origin}</p>
                    <p className="text-gray-400">Destination:</p>
                    <p>Kenya</p>
                  </div>
                </div>

                {/* Exchange Rate */}
                <div>
                  <div className="grid grid-cols-2 gap-y-4 text-gray-700 border border-dotted py-2 px-2 border-gray-300">
                    <p className="text-gray-400">Exchange Rate:</p>
                    <p>1GBP = 100 KES</p>
                    <p className="text-gray-400">Transaction Fee:</p>
                    <p>0.00</p>
                  </div>
                </div>

                <div className="mt-8 border-t pt-4 ">
                  <h4 className="text-lg font-bold text-gray-800 mb-4 ">
                    Sender
                  </h4>
                  <div className="flex items-center space-x-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center">
                      <img
                        src={selectedTransaction.avatar}
                        alt="Sender Avatar"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    {/* Sender Info */}
                    <div>
                      <p className="text-gray-700 font-semibold">
                        {selectedTransaction.customer}
                      </p>
                      {/*phone number*/}
                      <p className="text-gray-500 text-lg">+254 721533799</p>
                    </div>
                  </div>
                </div>

                {/* Download Receipt */}

                {/* <div className="mt-8 text-center">
                    <button className="flex items-center justify-center gap-2 text-yellow-500 font-semibold hover:text-yellow-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Download Receipt
                    </button>
                  </div> */}
              </div>
            </div>
          </div>
        )}

        <Pagination className="text-xl mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() =>
                  handlePageNavigation(Math.max(currentPage - 1, 1))
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === index + 1}
                  onClick={() => handlePageNavigation(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  handlePageNavigation(Math.min(currentPage + 1, totalPages))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <Footer />
      </main>
    </div>
  );
}
