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

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaCalendarAlt, FaFileExport } from "react-icons/fa";

export interface Transaction {
  customer?: string;
  transactionId?: string;
  amount?: string;
  origin?: string;
  channel?: string;
  status?: string;
  date: string;
  purpose?: string;
  senderPhone?: string | null;
  exchangeRate?: number | null;
  transactionReference?: string | null;
  senderName?: string | null;
  recipientAmount?: number | null;
  transactionType?: string | null;
  receiverName?: string | null;
  rawDate: Date;
}

export default function AllTransactionsPage() {
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [isExportModalVisible, setIsExportModalVisible] = useState(false);
  const [exportType, setExportType] = useState<"all" | "filtered">("all");
  const [fileType, setFileType] = useState<"csv" | "excel">("csv");
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const rowsPerPage = 12;

  // Format date as DD/MM/YYYY
  const formatDate = (dateString: string | Date | undefined): string => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Format time in 24-hour format (EAT - UTC+3)
  const formatTimeEAT = (dateString: string | Date | undefined): string => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    // Convert to East Africa Time (UTC+3)
    date.setHours(date.getHours() + 3);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // Format date and time for table display
  const formatDateTimeForTable = (
    dateString: string | Date | undefined
  ): string => {
    if (!dateString) return "N/A";
    return `${formatDate(dateString)} ${formatTimeEAT(dateString)}`;
  };

  const formatChannelName = (channel: string): string => {
    if (!channel) return "Unknown";
    switch (channel.toUpperCase()) {
      case "CARD_TO_BANK":
        return "Bank";
      case "CARD_TO_PAYBILL":
        return "M-PESA";
      default:
        return channel;
    }
  };

  // Fetch transactions from API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.tuma-app.com/api/transfer/partner-transactions?page=${currentPage}&size=${rowsPerPage}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const transactionsData = Array.isArray(data)
          ? data
          : data.content || [];

        const mappedTransactions = transactionsData.map((item: any) => ({
          transactionId: item.transactionId || "N/A",
          customer: item.senderName || item.customer || "Unknown",
          amount: item.recipientAmount,
          origin: item.origin || "UK",
          destination: item.receiverName || "Unknown",
          channel: formatChannelName(item.channel) || "Unknown",
          status: item.status === "SUCCESS" ? "Successful" : "Failed",
          date: item.date ? formatDateTimeForTable(item.date) : "N/A",

          purpose: item.purpose || "Transfer",
          senderPhone: item.senderPhone || "N/A",
          exchangeRate: item.exchangeRate || 0,
          transactionReference: item.transactionReference || "N/A",
          senderName: item.senderName || "Unknown",
          recipientAmount: item.recipientAmount || 0,
          transactionType: item.transactionType || "Unknown",
          receiverName: item.receiverName || "Unknown",
          rawDate: item.date ? new Date(item.date) : new Date(),
        }));

        setAllTransactions(mappedTransactions);
        setFilteredTransactions(mappedTransactions);
        setTotalPages(
          data.totalPages || Math.ceil(data.length / rowsPerPage) || 1
        );
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setAllTransactions([]);
        setFilteredTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [currentPage]);

  // Filter transactions based on search term and date range

  useEffect(() => {
    let filtered = allTransactions;

    // Apply search filter
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase().trim();
      filtered = filtered.filter((transaction) => {
        return (
          transaction.transactionId?.toString().includes(query) ||
          transaction.customer?.toLowerCase().includes(query) ||
          transaction.receiverName?.toLowerCase().includes(query) ||
          transaction.amount?.toLowerCase().includes(query) ||
          transaction.channel?.toLowerCase().includes(query)
        );
      });
    }

    // Apply date filter if dates are selected
    if (dateRange.startDate && dateRange.endDate) {
      filtered = filtered.filter((transaction) => {
        if (!transaction.rawDate) return false;

        // Get time in milliseconds for comparison
        const transactionTime = transaction.rawDate.getTime();
        const startTime = dateRange.startDate!.getTime();
        const endTime = dateRange.endDate!.getTime();

        return transactionTime >= startTime && transactionTime <= endTime;
      });
    }

    setFilteredTransactions(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, allTransactions, dateRange.startDate, dateRange.endDate]);

  // Handle date filter changes
  const handleDateChange = (startDate: Date, endDate: Date) => {
    // If you want to include the time in your filtering:
    setDateRange({
      startDate: new Date(startDate.setHours(0, 0, 0, 0)),
      endDate: new Date(endDate.setHours(23, 59, 59, 999)),
    });
    console.log("Filtering from:", startDate, "to:", endDate);
  };

  // Clear date filters
  const clearDateFilter = () => {
    setDateRange({ startDate: null, endDate: null });
    console.log("Date filter cleared");
  };

  // Export data function
  const handleExport = () => {
    // Determine which data to export
    const dataToExport =
      exportType === "all" ? allTransactions : filteredTransactions;

    // Generate a filename based on the applied filters
    let fileName = "transactions";

    if (exportType === "filtered") {
      fileName += "_filtered";
    }

    if (dateRange.startDate && dateRange.endDate) {
      const start = dateRange.startDate.toISOString().split("T")[0];
      const end = dateRange.endDate.toISOString().split("T")[0];
      fileName += `_from_${start}_to_${end}`;
    }

    const formatDateTimeForExport = (
      dateString: string | undefined
    ): string => {
      if (!dateString) return "N/A";
      return `${formatDate(dateString)} ${formatTimeEAT(dateString)}`;
    };

    if (fileType === "excel") {
      // Prepare the data for Excel export
      const exportData = dataToExport.map((t) => ({
        "Transaction ID": t.transactionId,
        Customer: t.customer,
        "Amount (KES)": t.amount,
        Origin: t.origin,
        Destination: t.receiverName,
        Channel: t.channel,
        Status: t.status,
        Date: formatDateTimeForExport(t.date),
        Purpose: t.purpose,
        "Sender Phone": t.senderPhone,
        "Exchange Rate": t.exchangeRate,
        Reference: t.transactionReference,
      }));

      // Create worksheet and workbook
      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Transactions");

      // Export to Excel file
      XLSX.writeFile(wb, `${fileName}.xlsx`);
    } else {
      // Prepare the data for CSV export
      const headers = [
        "Transaction ID",
        "Customer",
        "Amount (KES)",
        "Origin",
        "Destination",
        "Channel",
        "Status",
        "Date",
        "Purpose",
        "Sender Phone",
        "Exchange Rate",
        "Reference",
      ];

      const rows = dataToExport.map((t) => [
        t.transactionId,
        t.customer,
        t.amount,
        t.origin,
        t.receiverName,
        t.channel,
        t.status,
        formatDateTimeForExport(t.date),
        t.purpose,
        t.senderPhone,
        t.exchangeRate,
        t.transactionReference,
      ]);

      // Create CSV content
      const csvContent = [
        headers.join(","),
        ...rows.map((row) => row.map((field) => `"${field}"`).join(",")),
      ].join("\n");

      // Create download link
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${fileName}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    // Close modal
    setIsExportModalVisible(false);
  };

  // Handle row click to show transaction details
  const handleRowClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  // Show modal when transaction is selected
  useEffect(() => {
    if (selectedTransaction) {
      setIsModalVisible(true);
    }
  }, [selectedTransaction]);

  // Close modal and clear selected transaction
  const closeModal = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setSelectedTransaction(null);
    }, 300);
  };

  // Download receipt as PDF
  const handleDownloadReceipt = async () => {
    if (!selectedTransaction) return;

    const receiptElement = document.getElementById("receipt");
    if (!receiptElement) return;

    try {
      const clonedReceipt = receiptElement.cloneNode(true) as HTMLElement;
      clonedReceipt.style.opacity = "1";
      clonedReceipt.style.position = "static";
      clonedReceipt.style.pointerEvents = "auto";
      clonedReceipt.style.transform = "scale(1)";
      clonedReceipt.style.width = "700px";
      clonedReceipt.style.padding = "40px";
      clonedReceipt.style.margin = "auto";
      clonedReceipt.style.background = "white";

      const hiddenContainer = document.createElement("div");
      hiddenContainer.style.position = "fixed";
      hiddenContainer.style.top = "-9999px";
      hiddenContainer.style.width = "100%";
      hiddenContainer.style.display = "flex";
      hiddenContainer.style.justifyContent = "center";
      hiddenContainer.appendChild(clonedReceipt);
      document.body.appendChild(hiddenContainer);

      await document.fonts.ready;

      const canvas = await html2canvas(clonedReceipt, {
        scale: 2,
        useCORS: true,
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = 210;
      const pdfHeight = 297;
      const imgWidth = pdfWidth - 40;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const xOffset = (pdfWidth - imgWidth) / 2;
      const yOffset = (pdfHeight - imgHeight) / 2;

      pdf.addImage(
        canvas.toDataURL("image/png"),
        "PNG",
        xOffset,
        yOffset,
        imgWidth,
        imgHeight
      );
      pdf.save(`Receipt_${selectedTransaction.transactionId}.pdf`);

      document.body.removeChild(hiddenContainer);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  // Render status icon for modal
  const renderStatusIcon = () => {
    if (selectedTransaction?.status === "Successful") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          viewBox="0 0 24 24"
        >
          <path
            fill="#048020"
            fillRule="evenodd"
            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-1.177-7.86l-2.765-2.767L7 12.431l3.119 3.121a1 1 0 0 0 1.414 0l5.952-5.95l-1.062-1.062z"
          />
        </svg>
      );
    } else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          viewBox="0 0 24 24"
        >
          <path
            fill="#ff0000"
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m3.707 12.293a1 1 0 1 1-1.414 1.414L12 13.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L10.586 12L8.293 9.707a1 1 0 0 1 1.414-1.414L12 10.586l2.293-2.293a1 1 0 0 1 1.414 1.414L13.414 12z"
          />
        </svg>
      );
    }
  };

  const renderStatusMessage = () => {
    if (!selectedTransaction) return null;

    const dateDisplay = selectedTransaction.date ? (
      <>
        <p className="text-md text-gray-400 mt-1">
          on{" "}
          <span className="text-black font-semibold">
            {selectedTransaction.date}
          </span>
        </p>
      </>
    ) : null;

    if (selectedTransaction.status === "Successful") {
      return (
        <>
          <p className="text-gray-500 mt-1">
            Successfully sent to{" "}
            <span className="text-black font-semibold text-md">
              {selectedTransaction.receiverName || "Promitto LTD"}
            </span>
          </p>
          {dateDisplay}
        </>
      );
    } else {
      return (
        <>
          <p className="text-gray-500 mt-1">
            Transaction failed to{" "}
            <span className="text-black font-semibold text-md">
              {selectedTransaction.receiverName || "Promitto LTD"}
            </span>
          </p>
          {dateDisplay}
        </>
      );
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
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-gray-500 focus:border-gray-500"
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setShowDateFilter(true)}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 rounded-md hover:bg-gray-400 border border-gray-300"
              >
                <FaCalendarAlt /> Filter by Date
              </button>
              {showDateFilter && (
                <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg p-4 z-10">
                  <DateFilter
                    isOpen={showDateFilter}
                    onClose={() => setShowDateFilter(false)}
                    onChange={handleDateChange}
                    onClear={clearDateFilter}
                    initialStartDate={dateRange.startDate}
                    initialEndDate={dateRange.endDate}
                  />
                  {dateRange.startDate && (
                    <button
                      onClick={clearDateFilter}
                      className="mt-2 text-sm text-blue-500 hover:text-blue-700"
                    >
                      Clear date filter
                    </button>
                  )}
                </div>
              )}
            </div>
            <button
              onClick={() => setIsExportModalVisible(true)}
              className="flex items-center gap-2 px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
            >
              <FaFileExport /> Export
            </button>
          </div>
        </div>

        {/* Date filter active indicator */}
        {dateRange.startDate && (
          <div className="text-sm text-gray-500">
            Showing transactions from {dateRange.startDate.toLocaleDateString()}{" "}
            to {dateRange.endDate?.toLocaleDateString()}
          </div>
        )}

        {/* Export Modal */}
        {isExportModalVisible && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div
              className="bg-black bg-opacity-30 w-full h-full"
              onClick={() => setIsExportModalVisible(false)}
            ></div>
            <div className="bg-white w-96 h-full shadow-lg p-6 overflow-y-auto relative transform transition-transform duration-300 translate-x-0">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
                onClick={() => setIsExportModalVisible(false)}
              >
                &times;
              </button>
              <h2 className="text-lg font-bold text-gray-900">
                Export Transactions
              </h2>
              <div className="mt-4 space-y-4">
                <label className="flex justify-between items-center py-3 border-b border-gray-200 cursor-pointer">
                  <span className="text-gray-700 text-sm">
                    All Transactions
                  </span>
                  <input
                    type="radio"
                    name="transactionType"
                    value="all"
                    checked={exportType === "all"}
                    onChange={() => setExportType("all")}
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
                    checked={exportType === "filtered"}
                    onChange={() => setExportType("filtered")}
                    className="form-checkbox text-green-500"
                  />
                </label>
              </div>
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
                    checked={fileType === "csv"}
                    onChange={() => setFileType("csv")}
                    className="form-checkbox text-green-500"
                  />
                </label>
                <label className="flex justify-between items-center py-3 border-b border-gray-200 cursor-pointer">
                  <span className="text-gray-700 text-sm">Excel</span>
                  <input
                    type="radio"
                    name="fileType"
                    value="excel"
                    checked={fileType === "excel"}
                    onChange={() => setFileType("excel")}
                    className="form-checkbox text-green-500"
                  />
                </label>
              </div>
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={() => setIsExportModalVisible(false)}
                  className="px-6 py-2 border border-yellow-500 text-yellow-500 text-sm font-semibold rounded-md hover:bg-yellow-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExport}
                  className="px-6 py-2 bg-yellow-500 text-white text-sm font-semibold rounded-md hover:bg-yellow-600"
                >
                  Export
                </button>
              </div>
            </div>
          </div>
        )}

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
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-6 px-4 text-center text-gray-500"
                  >
                    Loading transactions...
                  </td>
                </tr>
              ) : filteredTransactions.length > 0 ? (
                filteredTransactions
                  .slice(
                    (currentPage - 1) * rowsPerPage,
                    currentPage * rowsPerPage
                  )
                  .map((transaction) => (
                    <tr
                      key={transaction.transactionId}
                      className="text-gray-700 cursor-pointer text-sm hover:bg-gray-50"
                      onClick={() => handleRowClick(transaction)}
                    >
                      <td className="py-4 px-6">
                        {transaction.senderName || transaction.customer}
                      </td>
                      <td className="py-3 px-4">{transaction.transactionId}</td>
                      <td className="py-3 px-4">{transaction.amount}</td>
                      <td className="py-3 px-4">{transaction.origin}</td>
                      <td className="py-3 px-4">
                        {transaction.transactionType || transaction.channel}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 text-sm font-medium rounded-full ${
                            transaction.status === "Successful"
                              ? "text-green-600 bg-green-100"
                              : "text-red-600 bg-red-100"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{transaction.date}</td>
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

        {/* Pagination */}
        <Pagination className="text-xl mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  if (currentPage === 1) e.preventDefault();
                  else setCurrentPage(Math.max(currentPage - 1, 1));
                }}
                className={
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }
                aria-disabled={currentPage === 1}
              />
            </PaginationItem>

            {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
              const pageNumber = index + 1;
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === pageNumber}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(pageNumber);
                    }}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {totalPages > 5 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  if (currentPage === totalPages) e.preventDefault();
                  else setCurrentPage(Math.min(currentPage + 1, totalPages));
                }}
                className={
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }
                aria-disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        {/* Transaction Details Modal */}
        {selectedTransaction && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div
              className="bg-black bg-opacity-50 w-full h-full"
              onClick={closeModal}
            ></div>
            <div
              className={`bg-white w-[28rem] h-full shadow-lg p-8 overflow-y-auto fixed right-0 transform transition-transform duration-300 ${
                isModalVisible ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
                onClick={closeModal}
              >
                &times;
              </button>

              <div className="space-y-8">
                <div className="text-center mb-6">
                  <div className="mx-auto rounded-full flex items-center justify-center">
                    {renderStatusIcon()}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mt-4">
                    {selectedTransaction.amount}
                  </h3>
                  {renderStatusMessage()}
                </div>

                <div className="mt-6">
                  <div className="grid grid-cols-2 gap-y-4 text-gray-700">
                    <p className="text-gray-400">Transaction ID:</p>
                    <p>#{selectedTransaction.transactionId}</p>
                    <p className="text-gray-400">Channel:</p>
                    <p>
                      {selectedTransaction.transactionType ||
                        selectedTransaction.channel}
                    </p>
                    <p className="text-gray-400">Purpose:</p>
                    <p>{selectedTransaction.purpose}</p>
                    <p className="text-gray-400">Origin:</p>
                    <p>{selectedTransaction.origin}</p>
                    <p className="text-gray-400">Destination:</p>
                    <p>{selectedTransaction.receiverName || "Kenya"}</p>
                    <p className="text-gray-400">Reference Code:</p>
                    <p>{selectedTransaction.transactionReference}</p>
                  </div>
                </div>

                <div>
                  <div className="grid grid-cols-2 gap-y-4 text-gray-700 border border-dotted py-2 px-2 border-gray-300">
                    <p className="text-gray-400">Exchange Rate:</p>
                    <p>KES {selectedTransaction.exchangeRate}</p>
                    <p className="text-gray-400">Transaction Fee:</p>
                    <p>0.00</p>
                  </div>
                </div>

                <div className="mt-8 border-t pt-4 text-center">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">
                    Sender
                  </h4>
                  <div className="flex flex-col items-center space-y-4">
                    <div>
                      <p className="text-gray-700 font-semibold">
                        {selectedTransaction.senderName ||
                          selectedTransaction.customer}
                      </p>
                      <p className="text-gray-500 text-lg">
                        {selectedTransaction.senderPhone}
                      </p>
                    </div>
                  </div>
                </div>

                {selectedTransaction.status === "Successful" && (
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
                )}

                {/* Hidden receipt for PDF generation */}
                {selectedTransaction?.status === "Successful" && (
                  <div
                    id="receipt"
                    style={{
                      opacity: 0,
                      position: "absolute",
                      pointerEvents: "none",
                    }}
                    className="bg-white max-w-[400px] mx-auto p-6 shadow-lg rounded-lg text-gray-700"
                  >
                    <div className="text-center">
                      <img
                        src="/logoimage.png"
                        className="w-8 h-8 mx-auto mt-1"
                        alt="Company Logo"
                      />
                    </div>
                    <h2 className="text-2xl font-bold text-black text-center mt-2">
                      {selectedTransaction.amount}
                    </h2>
                    <p className="text-gray-500 text-center">
                      Successfully sent to{" "}
                      <span className="font-semibold text-black">
                        {selectedTransaction.receiverName || "Promitto LTD"}
                      </span>
                    </p>
                    <p className="text-gray-400 text-center">
                      on{" "}
                      <span className="font-semibold text-black">
                        {selectedTransaction.date}
                      </span>
                    </p>

                    <div className="bg-gray-100 p-4 rounded-lg mt-3">
                      <h3 className="font-semibold text-black">Receiver</h3>
                      <div className="mt-4 text-sm">
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-500">Transaction ID</span>
                          <span className="text-black">
                            {selectedTransaction.transactionId}
                          </span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-500">
                            Transaction Reference
                          </span>
                          <span className="text-black">
                            {selectedTransaction.transactionReference}
                          </span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-500">Channel</span>
                          <span>
                            {selectedTransaction.transactionType ||
                              selectedTransaction.channel}
                          </span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-500">
                            Purpose of payment
                          </span>
                          <span>{selectedTransaction.purpose}</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-500">Payment Method</span>
                          <span>
                            {selectedTransaction.transactionType ||
                              selectedTransaction.channel}
                          </span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-500">Origin</span>
                          <span>{selectedTransaction.origin}</span>
                        </div>
                        <div className="border-t border-gray-300 my-2"></div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-500">Transaction Fee</span>
                          <span>0.00</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-500">Exchange Rate</span>
                          <span>{selectedTransaction.exchangeRate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg mt-3">
                      <h3 className="font-semibold text-black">Sender</h3>
                      <div className="mt-1 text-sm">
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-500">Sender Name</span>
                          <span className="text-black">
                            {selectedTransaction.senderName ||
                              selectedTransaction.customer}
                          </span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-500">Phone Number</span>
                          <span>{selectedTransaction.senderPhone}</span>
                        </div>
                      </div>
                    </div>

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
                        <p className="text-blue-500">tuma.com</p>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <Footer />
      </main>
    </div>
  );
}
