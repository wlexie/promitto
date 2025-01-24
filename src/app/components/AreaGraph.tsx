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

const chartData = [
  { day: "Sun", number: 10 },
  { day: "Mon", number: 35 },
  { day: "Tue", number: 20 },
  { day: "Wed", number: 10 },
  { day: "Thur", number: 15 },
  { day: "Fri", number: 25 },
  { day: "Sat", number: 10 },
];

function AreaGraph() {
  return (
    <Card className="bg-white">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-xl">Transaction Volume</CardTitle>
        <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-md">
          Daily
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 20,
              left: 10,
              bottom: 20,
            }}
          >
            {/* Y-Axis */}
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
              label={{
                value: "No. of Transactions",
                angle: -90,
                position: "insideLeft",
                fontSize: 12,
              }}
              domain={[0, 40]}
            />
            {/* X-Axis */}
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              fontSize={12}
              label={{
                value: "Days",
                position: "insideBottom",
                offset: -10,
                fontSize: 12,
              }}
            />
            {/* Horizontal Grid Lines */}
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              opacity={0.3}
            />
            {/* Tooltip */}
            <Tooltip
              cursor={{ stroke: "gray", strokeWidth: 1 }}
              contentStyle={{ borderRadius: 8 }}
            />
            {/* Highlighted Reference Line */}
            <ReferenceLine x="Mon" strokeDasharray="4 4" stroke="#A0AEC0" />
            {/* Area Chart */}
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
