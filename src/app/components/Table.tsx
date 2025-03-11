import { FC, useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface Transaction {
  avatar: string;
  id: string;
  customer: string;
  amount: string;
  origin: string;
  destination: string;
  channel: string;
  status: string;
  date: string;
  purpose: string;
  senderPhone: string;
}

const Table: FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetch(
      "https://api.tuma-app.com/api/transfer/partner-transactions?page=1&size=5"
    )
      .then((response) => response.json())
      .then((data) => {
        const mappedTransactions = data.map((item: any) => ({
          avatar: "/avatar.png", // Default avatar
          id: item.transactionReference,
          customer: item.senderName,
          amount: `KES ${item.recipientAmount.toLocaleString()}`,
          origin: "UK",
          destination: item.receiverName,
          channel: item.transactionType,
          status: item.status === "SUCCESS" ? "Successful" : "Failed",
          date: new Date(item.date).toLocaleString(),
          purpose: "Transfer",
          senderPhone: item.senderPhone,
        }));
        setTransactions(mappedTransactions);
      })
      .catch((error) => console.error("Error fetching transactions:", error));
  });

  useEffect(() => {
    if (selectedTransaction) {
      setIsModalVisible(true);
    }
  }, [selectedTransaction]);

  const handleRowClick = (transaction: any) => {
    setSelectedTransaction(transaction);
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
      pdf.save(`Receipt_${selectedTransaction?.id}.pdf`);

      console.log("PDF downloaded successfully");

      // Remove cloned receipt from the DOM
      document.body.removeChild(hiddenContainer);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setSelectedTransaction(null);
    }, 420); // Matches the transition duration
  };

  return (
    <div className="bg-gray-100 p-4">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <h2 className="px-6 py-4 font-semibold text-gray-800 border-b">
          Latest Transactions
        </h2>
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-white ">
            <tr>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Transaction ID</th>
              <th className="px-6 py-3">Amount(KES)</th>
              <th className="px-6 py-3">Origin</th>
              <th className="px-6 py-3">Channel</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleRowClick(transaction)}
              >
                <td className="px-6 py-4 flex items-center">
                  <img
                    src={transaction.avatar}
                    alt={`${transaction.customer}'s Avatar`}
                    className="w-8 h-8 rounded-full mr-4"
                  />
                  {transaction.customer}
                </td>
                <td className="px-6 py-4">{transaction.id}</td>
                <td className="px-6 py-4">{transaction.amount}</td>
                <td className="px-6 py-4">{transaction.origin}</td>
                <td className="px-6 py-4">{transaction.channel}</td>
                <td
                  className={`px-6 py-4 font-medium ${
                    transaction.status === "Successful"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.status}
                </td>
                <td className="px-6 py-4">{transaction.date}</td>
              </tr>
            ))}
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
            className={`bg-white w-[28rem] h-svh shadow-lg p-8 overflow-y-auto fixed right-0 transform transition-transform duration-300 ${
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
                <div className=" mx-auto rounded-full flex items-center justify-center">
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
                  {selectedTransaction.amount}
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
                  <p>#{selectedTransaction.id}</p>
                  <p className="text-gray-400">Channel:</p>
                  <p>{selectedTransaction.channel}</p>
                  <p className="text-gray-400">Purpose:</p>
                  <p>{selectedTransaction.purpose}</p>
                  <p className="text-gray-400">Origin:</p>
                  <p>{selectedTransaction.origin}</p>
                  <p className="text-gray-400">Destination:</p>
                  <p>{selectedTransaction.destination}</p>
                  <p className="text-gray-400">Promitto Code:</p>
                  <p>PR098771</p>
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
              <div className="align-middle text-center justify-center">
                <div className="mt-8 border-t pt-4 ">
                  <h4 className="text-md font-bold text-gray-500 mb-4 ">
                    Sender
                  </h4>
                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full bg-gray-100 ml-40 align-middle justify-center mb-2">
                    <img
                      src={selectedTransaction.avatar}
                      alt="Sender Avatar"
                      className="w-full h-full rounded-full object-cover mr-6"
                    />
                  </div>
                  <div className="flex items-center align-middle justify-center">
                    {/* Sender Info */}
                    <div>
                      <p className="text-gray-700 font-semibold">
                        {selectedTransaction.customer}
                      </p>
                      {/*phone number*/}
                      <p className="text-gray-500 text-lg">
                        {selectedTransaction.senderPhone}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Download Receipt */}

                <div className="mt-8 flex items-center justify-center">
                  <button
                    onClick={handleDownloadReceipt}
                    className="flex items-center gap-2 text-yellow-500 font-semibold hover:text-yellow-600"
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
                    <span>Download Receipt</span>
                  </button>
                </div>
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
                  <img src="/logoimage.png" className="w-8 h-8 mx-auto mt-1" />
                </div>

                {/* Amount */}
                <h2 className="text-2xl font-bold text-black text-center mt-2">
                  KES {selectedTransaction.amount}
                </h2>

                {/* Success Message */}
                <p className="text-gray-500 text-center ">
                  Successfully sent to{" "}
                  <span className="font-semibold text-black">Promitto LTD</span>
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
                        #{selectedTransaction.id}
                      </span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-500">Channel</span>
                      <span>{selectedTransaction.channel}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-500">Purpose of payment</span>
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
    </div>
  );
};

export default Table;
