"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

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
  { browser: "M-PESA", visitors: 200000, fill: "#FFBF00" },
  { browser: "BANK", visitors: 50000, fill: "#031254" },
];

const chartConfig = {
  visitors: {
    label: "M-PESA",
  },
  chrome: {
    label: "BANK",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

function PieGraph() {
  return (
    <Card className="flex flex-col bg-white">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Label List</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="visitors" hideLabel />}
            />
            <Pie data={chartData} dataKey="visitors">
              <LabelList
                dataKey="browser"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          <span className="inline-flex h-4 w-4 rounded-sm bg-[#e6bf7cfa]"></span>
          M-PESA
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          <span className="inline-flex h-4 w-4 rounded-sm bg-[#031254] mr-2"></span>
          Bank
        </div>
      </CardFooter>
    </Card>
  );
}
export default PieGraph;
