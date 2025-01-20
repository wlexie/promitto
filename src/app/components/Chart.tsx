"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { transactionID: "TRX23300", amount: 186000 },
  { transactionID: "TRX23200", amount: 305000 },
  { transactionID: "TDB12900", amount: 237000 },
  { transactionID: "TAX87800", amount: 73000 },
  { transactionID: "SZAY123B", amount: 209000 },
  { transactionID: "TBVSDC99", amount: 21400 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#FFBF00",
  },
} satisfies ChartConfig;

function Chart() {
  return (
    <Card className="bg-white ">
      <CardHeader>
        <CardTitle className="text-xl">Top 5 transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="amount" hide />
            <YAxis
              dataKey="transactionID"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="amount" fill="var(--color-desktop)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
export default Chart;
