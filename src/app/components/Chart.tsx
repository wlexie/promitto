"use client";

import { Bar, BarChart, XAxis, YAxis, Tooltip, Label } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

// Define the expected API response type for top transactions
type ApiResponse = {
  topTransactions: {
    transactionReference: string;
    senderAmount: number;
    receiverAmount: number;
    createdAt: string;
  }[];
  // Other fields not used in this component
  [key: string]: any;
};

// Default data in case API fails or while loading
const defaultChartData = [
  { transactionID: "TRX0001", amount: 0 },
  { transactionID: "TRX0002", amount: 0 },
  { transactionID: "TRX0003", amount: 0 },
  { transactionID: "TRX0004", amount: 0 },
  { transactionID: "TRX0005", amount: 0 },
];

function Chart() {
  const [chartData, setChartData] = useState(defaultChartData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.tuma-app.com/api/transfer/get-partner-analytics"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();

        // Transform the API data to match the chart format
        const transformedData = data.topTransactions
          .slice(0, 5) // Take top 5 transactions
          .map((transaction, index) => ({
            transactionID: transaction.transactionReference,
            amount: transaction.receiverAmount,
            // Include additional data that might be useful for tooltip
            senderAmount: transaction.senderAmount,
            date: new Date(transaction.createdAt).toLocaleDateString(),
          }));

        // If we have fewer than 5 transactions, fill the rest with defaults
        while (transformedData.length < 5) {
          transformedData.push({
            transactionID: `TRX${1000 + transformedData.length + 1}`,
            amount: 0,
            senderAmount: 0,
            date: "",
          });
        }

        setChartData(transformedData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        // Keep the default data on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="bg-white">
      <CardHeader className="items-center pb-2">
        <CardTitle className="text-xl">Top 5 Transactions</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[300px]">
          <BarChart
            width={400}
            height={300}
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis
              type="number"
              tickFormatter={(value) => `${(value / 1000).toFixed(2)}K`}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              dataKey="transactionID"
              type="category"
              width={80}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              formatter={(value) => [`KES ${value.toLocaleString()}`, "Amount"]}
            />
            <Bar dataKey="amount" fill="#FFBF00" radius={[0, 4, 4, 0]} />
          </BarChart>
        </div>
      </CardContent>
    </Card>
  );
}

export default Chart;
