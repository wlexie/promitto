"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
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
  { day: "Sun", number: 186 },
  { day: "Mon", number: 305 },
  { day: "Tue", number: 237 },
  { day: "Wed", number: 73 },
  { day: "Thur", number: 209 },
  { day: "Fri", number: 214 },
  { day: "Sat", number: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(43.3 96.4% 56.3%)",
  },
} satisfies ChartConfig;

function AreaGraph() {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-xl">Transaction Volume</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="number"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
export default AreaGraph;
