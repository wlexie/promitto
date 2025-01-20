import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import Card from "@/app/components/Card";
import Chart from "@/app/components/Chart";
import Table from "@/app/components/Table";
import { CreditCard, RefreshCw, Users } from "lucide-react";
import AreaChart from "@/app/components/AreaGraph";
import PieChart from "@/app/components/PieGraph";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 space-y-8 ">
        <Header />
        <div className="grid grid-cols-3 gap-4 text-lg font-bold">
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
