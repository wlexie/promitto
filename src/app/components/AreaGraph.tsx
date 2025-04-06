"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

// Define the expected API response type
type ApiResponse = {
  transactionVolume: {
    dayOfWeek: string;
    transactionCount: number;
  }[];
  // Other fields not used in this component
  [key: string]: any;
};

// Map full day names to abbreviations used in the chart
const dayAbbreviations: Record<string, string> = {
  SUNDAY: "Sun",
  MONDAY: "Mon",
  TUESDAY: "Tue",
  WEDNESDAY: "Wed",
  THURSDAY: "Thur",
  FRIDAY: "Fri",
  SATURDAY: "Sat",
};

// Default data in case API fails or while loading
const defaultChartData = [
  { day: "Sun", number: 0 },
  { day: "Mon", number: 0 },
  { day: "Tue", number: 0 },
  { day: "Wed", number: 0 },
  { day: "Thur", number: 0 },
  { day: "Fri", number: 0 },
  { day: "Sat", number: 0 },
];

function AreaGraph() {
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
        const transformedData = defaultChartData.map((defaultDay) => {
          // Find matching day in API response (case-insensitive)
          const apiDay = data.transactionVolume.find(
            (item) =>
              dayAbbreviations[item.dayOfWeek.toUpperCase()] === defaultDay.day
          );

          return {
            day: defaultDay.day,
            number: apiDay ? apiDay.transactionCount : 0,
          };
        });

        setChartData(transformedData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        // Keep the default data (all zeros) on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Find the day with the highest transactions for the reference line
  const highestTransactionDay = chartData.reduce(
    (max, current) => (current.number > max.number ? current : max),
    chartData[0]
  ).day;

  return (
    <Card className="bg-white">
      <CardHeader className="items-center pb-2">
        <CardTitle className="text-xl">Transaction Volume</CardTitle>
        <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-md">
          Daily
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
          >
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
              domain={[0, "dataMax + 5"]}
              tickCount={8}
            />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              fontSize={12}
            />
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              opacity={0.3}
            />
            <Tooltip
              cursor={{ stroke: "gray", strokeWidth: 1 }}
              contentStyle={{ borderRadius: 8 }}
            />
            <Area
              dataKey="number"
              type="monotone"
              stroke="#FFBF00"
              fill="#FFBF00"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default AreaGraph;
