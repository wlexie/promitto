"use client";

import React, { useState, useEffect } from "react";
import { Search, ArrowRight } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import DateFilter from "../components/DateFilter";
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
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaCalendarAlt } from "react-icons/fa";

export interface Transaction {
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
  ];

  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);

  const [searchTerm, setSearchTerm] = useState("");
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
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
  // const exportData = () => {
  //   let dataToExport;
  //   if (exportType === "all") {
  //     dataToExport = initialTransactions;
  //   } else {
  //     dataToExport = transactions; // This will be the filtered transactions
  //   }
  //   if (fileType === "csv") {
  //     console.log("Exporting data as CSV...");
  //   } else {
  //     exportToExcel(dataToExport, dateRange);
  //   }
  //   closeExportModal();
  // };

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

  const handleDateChange = (startDate: Date, endDate: Date) => {
    const filteredTransactions = initialTransactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
    setTransactions(filteredTransactions);
    setShowDateFilter(false);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  const exportToExcel = (dataToExport: any, dateRange: any) => {
    let fileName = "Transactions.xlsx"; // Default name for "All Transactions"

    if (exportType === "filtered" && dateRange) {
      const startDateStr = dateRange.startDate
        .toLocaleDateString()
        .replace(/\//g, "-");
      const endDateStr = dateRange.endDate
        .toLocaleDateString()
        .replace(/\//g, "-");
      fileName = `Transactions_${startDateStr}_to_${endDateStr}.xlsx`;
    }

    const worksheet = XLSX.utils.json_to_sheet(
      dataToExport.map((transaction: any) => ({
        Customer: transaction.customer,
        "Transaction ID": transaction.transactionId,
        Amount: transaction.amount,
        Origin: transaction.origin,
        Channel: transaction.channel,
        Status: transaction.status,
        Date: new Date(transaction.date).toLocaleString(),
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.writeFile(workbook, fileName);
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

  const handleDownloadReceipt = async () => {
    const receiptElement = document.getElementById("receipt");
    if (!receiptElement) {
      console.error("Receipt element not found in the DOM");
      return;
    }

    try {
      // Clone receipt to avoid UI distortion
      const clonedReceipt = receiptElement.cloneNode(true) as HTMLElement;
      clonedReceipt.style.opacity = "1";
      clonedReceipt.style.position = "static";
      clonedReceipt.style.pointerEvents = "auto";
      clonedReceipt.style.transform = "scale(1)";

      // Style adjustments for proper A4 layout
      clonedReceipt.style.width = "700px"; // Wider layout for better spacing
      clonedReceipt.style.padding = "40px"; // Adds space on the sides
      clonedReceipt.style.margin = "auto"; // Centers content
      clonedReceipt.style.background = "white"; // Ensure background visibility

      // Append cloned receipt to a hidden container
      const hiddenContainer = document.createElement("div");
      hiddenContainer.style.position = "fixed";
      hiddenContainer.style.top = "-9999px"; // Moves it out of view
      hiddenContainer.style.width = "100%";
      hiddenContainer.style.display = "flex";
      hiddenContainer.style.justifyContent = "center"; // Centers horizontally
      hiddenContainer.appendChild(clonedReceipt);
      document.body.appendChild(hiddenContainer);

      // Wait for fonts & images to load
      await document.fonts.ready;

      // Capture the receipt
      const canvas = await html2canvas(clonedReceipt, {
        scale: 2,
        useCORS: true,
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm

      // Calculate proper scaling
      const imgWidth = pdfWidth - 40; // Leaving margin on sides
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Centered placement on A4
      const xOffset = (pdfWidth - imgWidth) / 2;
      const yOffset = (pdfHeight - imgHeight) / 2;

      // Add image to PDF
      pdf.addImage(
        canvas.toDataURL("image/png"),
        "PNG",
        xOffset,
        yOffset,
        imgWidth,
        imgHeight
      );
      pdf.save(`Receipt_${selectedTransaction?.transactionId}.pdf`);

      console.log("PDF downloaded successfully");

      // Remove cloned receipt from the DOM
      document.body.removeChild(hiddenContainer);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-8 space-y-8 ml-80">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">All transactions</h1>
          <div className="flex items-center gap-6">
            <div className="relative w-[300px] sm:w-[400px] md:w-[500px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 flex-wrap" />
              <input
                type="text"
                placeholder="Search by name, ID, or channel..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-gray-500 focus:border-gray-500"
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setShowDateFilter(!showDateFilter)}
                className="px-4 py-2 text-gray-700 rounded-md hover:bg-gray-400 border border-gray-300"
              >
                <FaCalendarAlt /> Filter by Date
              </button>
              {/* Date Filter Component as a Popover */}
              {showDateFilter && (
                <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg p-4 z-10">
                  <DateFilter onChange={handleDateChange} />
                </div>
              )}
            </div>
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
              className="bg-black bg-opacity-30 w-full h-full"
              onClick={closeExportModal}
            ></div>

            {/* Modal */}
            <div
              className="bg-white w-96 h-full shadow-lg p-6 overflow-y-auto relative transform transition-transform duration-300 translate-x-full"
              style={{ transform: "translateX(0)" }}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
                onClick={closeExportModal}
              >
                &times;
              </button>

              {/* Title */}
              <h2 className="text-lg font-bold text-gray-900">
                Export Transactions
              </h2>

              {/* Transaction Selection */}
              <div className="mt-4 space-y-4">
                <label className="flex justify-between items-center py-3 border-b border-gray-200 cursor-pointer">
                  <span className="text-gray-700 text-sm">
                    All Transactions
                  </span>
                  <input
                    type="radio"
                    name="transactionType"
                    value="all"
                    className="form-checkbox text-green-500"
                  />
                </label>
                <label className="flex justify-between items-center py-3 border-b border-gray-200 cursor-pointer">
                  <span className="text-gray-700 text-sm">
                    Filtered Transactions
                  </span>
                  <input
                    type="radio"
                    name="transactionType"
                    value="filtered"
                    className="form-checkbox text-green-500"
                  />
                </label>
              </div>

              {/* Export Type */}
              <h3 className="mt-6 text-sm font-bold text-gray-900">
                Export as:
              </h3>
              <div className="mt-4 space-y-4">
                <label className="flex justify-between items-center py-3 border-b border-gray-200 cursor-pointer">
                  <span className="text-gray-700 text-sm">CSV</span>
                  <input
                    type="radio"
                    name="fileType"
                    value="csv"
                    className="form-checkbox text-green-500"
                  />
                </label>
                <label className="flex justify-between items-center py-3 border-b border-gray-200 cursor-pointer">
                  <span className="text-gray-700 text-sm">Excel</span>
                  <input
                    type="radio"
                    name="fileType"
                    value="excel"
                    className="form-checkbox text-green-500"
                  />
                </label>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={closeExportModal}
                  className="px-6 py-2 border border-yellow-500 text-yellow-500 text-sm font-semibold rounded-md hover:bg-yellow-50"
                >
                  Cancel
                </button>
                <button
                  // onClick={exportData}
                  className="px-6 py-2 bg-yellow-500 text-white text-sm font-semibold rounded-md hover:bg-yellow-600"
                >
                  Export
                </button>
              </div>
            </div>
          </div>
        )}

        {/* {isDatePickerOpen && (
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
        )} */}

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
                  <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="60"
                      height="60"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#048020"
                        fill-rule="evenodd"
                        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-1.177-7.86l-2.765-2.767L7 12.431l3.119 3.121a1 1 0 0 0 1.414 0l5.952-5.95l-1.062-1.062z"
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

                <div className="mt-8 border-t pt-4 text-center">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">
                    Sender
                  </h4>
                  <div className="flex flex-col items-center space-y-4">
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
                      {/* Phone number */}
                      <p className="text-gray-500 text-lg">+254 721533799</p>
                    </div>
                  </div>
                </div>

                {/* Download Receipt */}
                <div className="mt-8 text-center">
                  <button
                    className="flex items-center justify-center gap-2 text-yellow-500 font-semibold hover:text-yellow-600 mx-auto"
                    onClick={handleDownloadReceipt}
                  >
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
                </div>

                {/* Hidden Receipt for PDF Generation */}
                <div
                  id="receipt"
                  style={{
                    opacity: 0,
                    position: "absolute",
                    pointerEvents: "none",
                  }}
                  className="bg-white max-w-[400px] mx-auto p-6 shadow-lg rounded-lg text-gray-700"
                >
                  {/* Logo */}
                  <div className="text-center">
                    <img
                      src="/logoimage.png"
                      className="w-8 h-8 mx-auto mt-1"
                    />
                  </div>

                  {/* Amount */}
                  <h2 className="text-2xl font-bold text-black text-center mt-2">
                    KES {selectedTransaction.amount}
                  </h2>

                  {/* Success Message */}
                  <p className="text-gray-500 text-center ">
                    Successfully sent to{" "}
                    <span className="font-semibold text-black">
                      Promitto LTD
                    </span>
                  </p>
                  <p className="text-gray-400 text-center">
                    on{" "}
                    <span className="font-semibold text-black">
                      {selectedTransaction.date}
                    </span>
                  </p>

                  {/* Receiver Details */}
                  <div className="bg-gray-100 p-4 rounded-lg mt-3">
                    <h3 className="font-semibold text-black">Receiver</h3>
                    <div className="mt-4 text-sm">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-500">Transaction ID</span>
                        <span className="text-black">
                          #{selectedTransaction.transactionId}
                        </span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-500">Channel</span>
                        <span>{selectedTransaction.channel}</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-500">
                          Purpose of payment
                        </span>
                        <span>Deposit</span>
                      </div>
                      <div className="flex justify-between  mb-1">
                        <span className="text-gray-500">Payment Method</span>
                        <span>Bank Transfer</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-500">Origin</span>
                        <span>UK - KE</span>
                      </div>
                      <div className="border-t border-gray-300 my-2"></div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-500">Transaction Fee</span>
                        <span>0.00</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-500">Exchange Rate</span>
                        <span>1 GBP = KES 150 </span>
                      </div>
                    </div>
                  </div>

                  {/* Sender Details */}
                  <div className="bg-gray-100 p-4 rounded-lg mt-3">
                    <h3 className="font-semibold text-black">Sender</h3>
                    <div className="mt-1 text-sm">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-500">Sender Name</span>
                        <span className="text-black">
                          {selectedTransaction.customer}
                        </span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-500">Phone Number</span>
                        <span>+254 712 455 667</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="text-center text-sm mt-2">
                    <p className="font-semibold">Thank you for using Tuma!</p>
                    <p className="text-gray-500 italic">
                      For inquiries or assistance, contact us:
                    </p>
                    <p className="text-gray-500">support@tuma.com</p>
                    <p className="text-gray-500">+447-778-024-995</p>
                    <a
                      href="https://tuma.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div>
                        <p className="text-blue-500">tuma.com</p>
                      </div>
                    </a>
                  </div>
                </div>
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
