import { FC, useState } from "react";

const Table: FC = () => {
  const transactions = [
    {
      avatar: "/avatar.png",
      id: "TUM123465",
      customer: "Reagan",
      amount: "30,000",
      origin: "UK - Kenya",
      channel: "MPESA",
      status: "Successful",
      date: "12/10/24, 10:00am",
      purpose: "Deposit",
    },
    {
      avatar: "/avatar.png",
      id: "TUM123466",
      customer: "Alice",
      amount: "30,000",
      origin: "UK - Kenya",
      channel: "MPESA",
      status: "Successful",
      date: "12/10/24, 10:00am",
      purpose: "Loan repayment",
    },
    {
      avatar: "/avatar.png",
      id: "TUM123466",
      customer: "Alice",
      amount: "30,000",
      origin: "UK - Kenya",
      channel: "MPESA",
      status: "Successful",
      date: "12/10/24, 10:00am",
      purpose: "Loan repayment",
    },
    {
      avatar: "/avatar.png",
      id: "TUM123466",
      customer: "Alice",
      amount: "30,000",
      origin: "UK - Kenya",
      channel: "MPESA",
      status: "Successful",
      date: "12/10/24, 10:00am",
      purpose: "Loan repayment",
    },
    {
      avatar: "/avatar.png",
      id: "TUM123465",
      customer: "Regan",
      amount: "30,000",
      origin: "UK - Kenya",
      channel: "MPESA",
      status: "Successful",
      date: "12/10/24, 10:00am",
      purpose: "Loan repayment",
    },
    // Add more rows as needed
  ];

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleRowClick = (customer: string) => {
    const customerTransactions = transactions.filter(
      (t) => t.customer === customer
    );
    setSelectedCustomer(customerTransactions);
  };

  const closeModal = () => setSelectedCustomer(null);

  return (
    <div>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <h2 className="px-3 font-semibold py-3 ">Latest Transactions</h2>
        <table className="w-full">
          <thead className="bg-white ">
            <tr>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Transaction ID</th>
              <th className="px-4 py-2 text-left">Amount(KES)</th>
              <th className="px-4 py-2 text-left">Origin</th>
              <th className="px-4 py-2 text-left">Channel</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr
                key={t.id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleRowClick(t.customer)}
              >
                <td className="px-4 py-2 flex items-center">
                  <img
                    src={t.avatar}
                    alt={`${t.customer}'s Avatar`}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  {t.customer}
                </td>
                <td className="px-4 py-2">{t.id}</td>
                <td className="px-4 py-2">{t.amount}</td>
                <td className="px-4 py-2">{t.origin}</td>
                <td className="px-4 py-2">{t.channel}</td>
                <td className="px-4 py-2 text-green-500">{t.status}</td>
                <td className="px-4 py-2">{t.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-80 rounded-md">
          <div className="bg-white rounded-lg w-3/4 max-w-8xl p-12 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <div className="flex items-center mb-6 justify-between">
              <div className="flex items-center">
                <img
                  src={selectedCustomer[0]?.avatar}
                  alt={selectedCustomer[0]?.customer}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-bold text-lg">
                    {selectedCustomer[0]?.customer}
                  </h3>
                  <p>ID/Pass: {selectedCustomer[0]?.id}</p>
                </div>
              </div>

              <div className="text-right -ml-20">
                <div>
                  <h3 className="font-bold text-lg ">
                    <h3>Joined on</h3>
                  </h3>
                  <p>Date: {selectedCustomer[0]?.date}</p>
                </div>
              </div>
            </div>

            <h4 className="font-semibold text-lg mb-4">All Transactions</h4>
            <table className="w-full">
              <thead className="bg-white text-md text-gray-400 font-light">
                <tr>
                  <th className="px-4 py-2 text-left">Transac. ID</th>
                  <th className="px-4 py-2 text-left">Amount(KES)</th>
                  <th className="px-4 py-2 text-left">Origin</th>
                  <th className="px-4 py-2 text-left">Channel</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Purpose</th>
                </tr>
              </thead>
              <tbody className="text-lg mb-4">
                {selectedCustomer.map((t) => (
                  <tr key={t.id}>
                    <td className="px-4 py-2">{t.id}</td>
                    <td className="px-4 py-2">{t.amount}</td>
                    <td className="px-4 py-2">{t.origin}</td>
                    <td className="px-4 py-2">{t.channel}</td>
                    <td className="px-4 py-2 text-green-500">{t.status}</td>
                    <td className="px-4 py-2">{t.date}</td>
                    <td className="px-4 py-2">{t.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
