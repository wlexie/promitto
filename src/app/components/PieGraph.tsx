"use client";

import { Pie, PieChart, Cell } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const chartData = [
  { name: "M-PESA", value: 200000, fill: "#FFBF00" },
  { name: "Bank", value: 50000, fill: "#031254" },
];

function PieGraph() {
  return (
    <Card className="flex flex-col bg-white">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-xl">Revenue Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="mx-auto aspect-square max-h-[250px]">
          <PieChart width={250} height={250}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          <span
            className="inline-block h-4 w-4 rounded-sm"
            style={{ backgroundColor: "#FFBF00" }}
          ></span>
          M-PESA KES 200,000
        </div>
        <div className="flex items-center gap-2 font-medium leading-none">
          <span
            className="inline-block h-4 w-4 rounded-sm"
            style={{ backgroundColor: "#031254" }}
          ></span>
          Bank KES 50,000
        </div>
      </CardFooter>
    </Card>
  );
}

export default PieGraph;
