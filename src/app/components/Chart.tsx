"use client";

//import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis, Tooltip, Label } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const chartData = [
  { transactionID: "TRX1004", amount: 370000 },
  { transactionID: "TRX1001", amount: 260000 },
  { transactionID: "TRX1009", amount: 225000 },
  { transactionID: "TRX1006", amount: 170000 },
  { transactionID: "TRX10012", amount: 120000 },
];

function Chart() {
  return (
    <Card className="bg-white shadow-md p-4 rounded-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Top 5 Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <BarChart
          width={400}
          height={300}
          data={chartData}
          layout="vertical"
          margin={{ top: 20, right: 60, left: 0, bottom: 20 }}
        >
          {/* X-Axis */}
          <XAxis
            type="number"
            tick={{
              fill: "#828282",
              fontSize: 12,
            }}
            tickFormatter={(value: number) => `${value / 1000}K`}
            axisLine={false}
            tickLine={false}
          >
            <Label
              value="Transactions in KES"
              position="bottom"
              offset={10}
              style={{
                textAnchor: "middle",
                fontSize: "14px",
                fill: "#333",
              }}
            />
          </XAxis>

          {/* Y-Axis */}
          <YAxis
            dataKey="transactionID"
            type="category"
            tick={{
              fill: "#333",
              fontSize: 12,
            }}
            tickLine={false}
            axisLine={false}
          ></YAxis>

          <Tooltip
            cursor={{ fill: "rgba(255, 191, 0, 0.2)" }}
            formatter={(value: number) => [
              `KES ${value.toLocaleString()}`,
              "Amount",
            ]}
          />
          <Bar dataKey="amount" fill="#FFBF00" radius={[0, 10, 10, 0]} />
        </BarChart>
      </CardContent>
    </Card>
  );
}

export default Chart;
