import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
// import Card from "@/app/components/Card";
import Chart from "@/app/components/Chart";
import Table from "@/app/components/Table";

import AreaChart from "@/app/components/AreaGraph";
import PieChart from "@/app/components/PieGraph";

const Card = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="p-2 bg-yellow-100 rounded-md text-xl">{icon}</div>
      <div>
        <p className="text-xl font-semibold text-gray-800">{value}</p>
        <p className="text-lg text-gray-500">{title}</p>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 space-y-8 ">
        <Header />
        {/* <div className="grid grid-cols-3 gap-4 text-lg font-bold">
          <Card
            icon={
              <img
                src="/icon1.svg"
                alt="Custom Icon"
                className="rounded-md bg-white "
              />
            }
            title="Total amount transacted"
            value="KES 450,000.98"
          />

          <Card
            icon={
              <img
                src="/icon2.svg"
                alt="Custom Icon"
                className="h-18 rounded-md "
              />
            }
            title="Count of Transactions"
            value="450"
          />
          <Card
            title="Total Unique Customers"
            value="200"
            icon={
              <img
                src="/icon3.svg"
                alt="custom icon"
                className="h-18 rounded-md "
              />
            }
          />
        </div> */}
        <div className=" gap-4 grid grid-cols-3 text-lg">
          <Card
            icon={
              <img src="/icon1.svg" alt="Custom Icon" className="w-12 h-12" />
            }
            title="Total Amount Transacted"
            value="KES 450,000.98"
          />
          <Card
            icon={
              <img src="/icon2.svg" alt="Custom Icon" className="w-12 h-12" />
            }
            title="Count of Transactions"
            value="450"
          />
          <Card
            icon={
              <img src="/icon3.svg" alt="Custom Icon" className="w-12 h-12" />
            }
            title="Total Unique Customers"
            value="200"
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <AreaChart />
          <Chart />
          <PieChart />
        </div>
        <Table />
      </main>
    </div>
  );
}
