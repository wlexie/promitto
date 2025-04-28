import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import Chart from "@/app/components/Chart";
import Table from "@/app/components/Table";
import AreaChart from "@/app/components/AreaGraph";
import PieChart from "@/app/components/PieGraph";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

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
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm text-lg">
      <div className="p-2 bg-yellow-100 rounded-md text-xl">{icon}</div>
      <div>
        <p className="text-xl font-semibold text-gray-800">{value}</p>
        <p className="text-lg text-gray-500">{title}</p>
      </div>
    </div>
  );
};

export default function Home() {
  const [analyticsData, setAnalyticsData] = useState({
    uniqueCustomers: 0,
    transactionCount: 0,
    totalAmountTransacted: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await fetch(
          "https://api.tuma-app.com/api/transfer/get-partner-analytics"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch analytics data");
        }
        const data = await response.json();
        setAnalyticsData(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Error fetching analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-8 space-y-8 ml-80">
          <Header />

          {/* Cards Loading Skeleton */}
          <div className="gap-4 grid grid-cols-3 text-lg">
            <div className="animate-pulse bg-gray-200 rounded-lg h-24"></div>
            <div className="animate-pulse bg-gray-200 rounded-lg h-24"></div>
            <div className="animate-pulse bg-gray-200 rounded-lg h-24"></div>
          </div>

          {/* Charts Loading Skeleton */}
          <div className="grid grid-cols-3 gap-4">
            <div className="animate-pulse bg-gray-200 rounded-lg h-80"></div>
            <div className="animate-pulse bg-gray-200 rounded-lg h-80"></div>
            <div className="animate-pulse bg-gray-200 rounded-lg h-80"></div>
          </div>

          {/* Table Loading Skeleton */}
          <div className="animate-pulse bg-gray-200 rounded-lg h-96"></div>

          {/* Footer Loading Skeleton */}
          <div className="animate-pulse bg-gray-200 rounded-lg h-16"></div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-8 space-y-8 ml-80">
          <Header />
          <div className="text-red-500 p-4 bg-red-50 rounded-lg">
            Error loading analytics: {error}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <AreaChart />
            <Chart />
            <PieChart />
          </div>
          <Table />
          <Footer />
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 space-y-8 ml-80">
        <Header />
        <div className="gap-4 grid grid-cols-3 text-lg">
          <Card
            icon={
              <img src="/icon1.svg" alt="Custom Icon" className="w-12 h-12" />
            }
            title="Total Amount Transacted"
            value={`KES ${analyticsData.totalAmountTransacted.toLocaleString(
              "en-US",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )}`}
          />
          <Card
            icon={
              <img src="/icon2.svg" alt="Custom Icon" className="w-12 h-12" />
            }
            title="Count of Transactions"
            value={analyticsData.transactionCount.toString()}
          />
          <Card
            icon={
              <img src="/icon3.svg" alt="Custom Icon" className="w-12 h-12" />
            }
            title="Total Unique Customers"
            value={analyticsData.uniqueCustomers.toString()}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <AreaChart />
          <Chart />
          <PieChart />
        </div>
        <Table />
        <Footer />
      </main>
    </div>
  );
}
