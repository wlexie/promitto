import { FC, useState } from "react";

const Table: FC = () => {
  const transactions = [
    {
      avatar: "/avatar.png",
      id: "TUM123465",
      customer: "Alice Smith",
      amount: "30,000",
      origin: "UK",
      destination: "Kenya",
      channel: "MPESA",
      status: "Successful",
      date: "12/10/24, 10:00am",
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
      date: "12/10/24, 10:00am",
      purpose: "Loan repayment",
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
      date: "12/10/24, 10:00am",
      purpose: "Loan repayment",
    },
    {
      avatar: "/avatar3.jpg",
      id: "TUM123466",
      customer: "Mike",
      amount: "30,000",
      origin: "UK",
      destination: "Kenya",
      channel: "MPESA",
      status: "Successful",
      date: "12/10/24, 10:00am",
      purpose: "Loan repayment",
    },
    {
      avatar: "/avatar4.jpg",
      id: "TUM123466",
      customer: "Zach",
      amount: "30,000",
      origin: "UK",
      destination: "Kenya",
      channel: "MPESA",
      status: "Successful",
      date: "12/10/24, 10:00am",
      purpose: "Loan repayment",
    },
  ];

  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleRowClick = (transaction: any) => {
    setSelectedTransaction(transaction);
  };

  const closeModal = () => setSelectedTransaction(null);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
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
                  #{selectedTransaction.id}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedTransaction.date}
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
                    <p>{selectedTransaction.purpose}</p>
                    <p className="text-gray-400">Status:</p>
                    <p className="font-semibold text-green-600">
                      {selectedTransaction.status}
                    </p>
                    <p className="text-gray-400">Origin:</p>
                    <p>{selectedTransaction.origin}</p>
                    <p className="text-gray-400">Destination:</p>
                    <p>{selectedTransaction.destination}</p>
                  </div>
                </div>

                {/* Rates Section */}
                <div className="mb-6">
                  <p className="text-lg font-bold text-gray-800 mb-4">Rates</p>
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
    </div>
  );
};

export default Table;
