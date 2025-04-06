"use client";

import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

// Define the expected API response type for revenue breakdown
type ApiResponse = {
  revenueBreakdown: {
    transactionTypeName: string;
    totalAmount: number;
    percentage: number;
  }[];
  // Other fields not used in this component
  [key: string]: any;
};

// Color palette for the pie chart
const COLORS = {
  CARD_TO_PAYBILL: "#FFBF00", // Yellow for M-PESA
  CARD_TO_BANK: "#031254", // Dark blue for Bank
};

// Default data in case API fails or while loading
const defaultChartData = [{ name: "Loading...", value: 100, fill: "#e2e8f0" }];

function PieGraph() {
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
        const transformedData = data.revenueBreakdown.map((item) => ({
          name: formatTransactionType(item.transactionTypeName),
          value: item.totalAmount,
          percentage: item.percentage,
          fill:
            COLORS[item.transactionTypeName as keyof typeof COLORS] ||
            "#8884d8",
        }));

        setChartData(transformedData);
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

  // Format transaction type for display with custom names
  const formatTransactionType = (type: string) => {
    switch (type) {
      case "CARD_TO_BANK":
        return "Bank";
      case "CARD_TO_PAYBILL":
        return "M-PESA";
      default:
        return type
          .split("_")
          .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
          .join(" ");
    }
  };

  return (
    <Card className="bg-white">
      <CardHeader className="items-center pb-2">
        <CardTitle className="text-xl">Revenue Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`KES ${value}`, "Amount"]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-4 mt-2">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center">
              <span
                className="inline-block w-3 h-3 mr-1 rounded-sm"
                style={{ backgroundColor: item.fill }}
              />
              <span className="text-sm">
                {item.name} KES {item.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default PieGraph;
