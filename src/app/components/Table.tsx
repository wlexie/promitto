import { FC, useState, useEffect } from "react";

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
}

const Table: FC = () => {
  const transactions: Transaction[] = [
    {
      avatar: "/avatar.png",
      id: "TUM123465",
      customer: "Alice Smith",
      amount: "30,000",
      origin: "UK",
      destination: "Kenya",
      channel: "MPESA",
      status: "Successful",
      date: "12/16/2024, 10:00:00 AM",
      purpose: "Deposit",
    },
    {
      avatar: "/avatar.png",
      id: "TUM123466",
      customer: "Reagan",
      amount: "30,000",
      origin: "UK",
      destination: "Kenya",
      channel: "MPESA",
      status: "Successful",
      date: "12/10/2024, 10:00:00 AM",
      purpose: "Loan repayment",
    },
    {
      avatar: "/avatar.png",
      id: "TUM123467",
      customer: "Reagan",
      amount: "30,000",
      origin: "UK",
      destination: "Kenya",
      channel: "MPESA",
      status: "Successful",
      date: "11/11/2024, 10:00:00 AM",
      purpose: "Loan repayment",
    },
    {
      avatar: "/avatar3.jpg",
      id: "TUM123468",
      customer: "Mike",
      amount: "30,000",
      origin: "UK",
      destination: "Kenya",
      channel: "MPESA",
      status: "Successful",
      date: "12/12/2024, 10:00:00 AM",
      purpose: "Loan repayment",
    },
    {
      avatar: "/avatar4.jpg",
      id: "TUM123469",
      customer: "Zach",
      amount: "30,000",
      origin: "UK",
      destination: "Kenya",
      channel: "MPESA",
      status: "Successful",
      date: "12/10/2024, 10:00:00 AM",
      purpose: "Loan repayment",
    },
  ];

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
                  <p>#{selectedTransaction.id}</p>
                  <p className="text-gray-400">Channel:</p>
                  <p>{selectedTransaction.channel}</p>
                  <p className="text-gray-400">Purpose:</p>
                  <p>{selectedTransaction.purpose}</p>
                  <p className="text-gray-400">Origin:</p>
                  <p>{selectedTransaction.origin}</p>
                  <p className="text-gray-400">Destination:</p>
                  <p>{selectedTransaction.destination}</p>
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
    </div>
  );
};

export default Table;
