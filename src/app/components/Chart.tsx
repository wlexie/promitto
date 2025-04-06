"use client";

import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Label,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

type ApiResponse = {
  topTransactions: {
    transactionReference: string;
    senderAmount: number;
    receiverAmount: number;
    createdAt: string;
  }[];
  [key: string]: any;
};

function Chart() {
  const [chartData, setChartData] = useState<
    Array<{
      transactionID: string;
      amount: number;
      senderAmount: number;
      date: string;
    }>
  >([]);
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

        // Take only the transactions from API (no filler transactions)
        const apiTransactions = data.topTransactions.map((transaction) => ({
          transactionID: transaction.transactionReference,
          amount: transaction.receiverAmount,
          senderAmount: transaction.senderAmount,
          date: new Date(transaction.createdAt).toLocaleDateString(),
        }));

        setChartData(apiTransactions);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
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
        {isLoading ? (
          <div className="h-[300px] flex items-center justify-center">
            <p>Loading transaction data...</p>
          </div>
        ) : error ? (
          <div className="h-[300px] flex items-center justify-center text-red-500">
            <p>Error: {error}</p>
          </div>
        ) : (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
                barCategoryGap={10}
              >
                <XAxis
                  type="number"
                  tickFormatter={(value) => `${(value / 1000).toFixed(2)}K`}
                  axisLine={false}
                  tickLine={false}
                >
                  <Label
                    value="Amount in KES"
                    position="insideBottom"
                    offset={-10}
                    style={{ textAnchor: "middle", fontSize: "12px" }}
                  />
                </XAxis>
                <YAxis
                  dataKey="transactionID"
                  type="category"
                  width={120}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10 }}
                  domain={[0, 4]} // Maintain space for 5 bars
                >
                  <Label
                    value="Reference Code"
                    angle={-90}
                    position="left"
                    style={{ textAnchor: "middle", fontSize: "12px" }}
                    offset={-15}
                  />
                </YAxis>
                <Tooltip
                  formatter={(value) => [
                    `KES ${value.toLocaleString()}`,
                    "Amount",
                  ]}
                  contentStyle={{ fontSize: "12px" }}
                />
                <Bar
                  dataKey="amount"
                  fill="#FFBF00"
                  radius={[0, 4, 4, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default Chart;
