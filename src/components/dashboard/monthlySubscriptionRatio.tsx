"use client";

import React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// ✅ Description for documentation
export const description = "A multiple line chart for monthly subscription ratio";

// ✅ Chart config with strong typing
const chartConfig = {
  desktop: {
    label: "Revenue",
    color: "#499FC0",
  },
  mobile: {
    label: "Users",
    color: "#E4BA13",
  },
} satisfies ChartConfig;

// ✅ Type definitions for data props
interface MonthlyDataItem {
  month: number; // 1–12
  revenue: number;
  users: number;
}

interface MonthlySubscriptionRatioProps {
  data?: {
    monthlySubscription?: MonthlyDataItem[];
  } | null;
}

export const MonthlySubscriptionRatio: React.FC<MonthlySubscriptionRatioProps> = ({
  data,
}) => {
  // ✅ Create all months baseline (Jan–Dec)
  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("default", { month: "long" })
  );

  // ✅ Merge API data with full month baseline
  const apiData = data?.monthlySubscription ?? [];
  const chartData = months.map((monthName, index) => {
    const apiMonth = apiData.find((item) => item.month === index + 1);
    return {
      month: monthName,
      desktop: apiMonth?.revenue ?? 0,
      mobile: apiMonth?.users ?? 0,
    };
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-4">
        <CardTitle>Monthly Subscription Ratio</CardTitle>

        {/* ✅ Legend */}
        <div className="flex gap-4">
          <div className="flex items-center justify-center gap-2 border p-2 rounded-md border-[#E5E5EF]">
            <span className="h-2 w-2 rounded-full bg-[#499FC0]" />
            <p>Revenue</p>
          </div>
          <div className="flex items-center justify-center gap-2 border p-2 rounded-md border-[#E5E5EF]">
            <span className="h-2 w-2 rounded-full bg-[#E4BA13]" />
            <p>Users</p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart
            data={chartData}
            margin={{ left: 12, right: 12, top: 20, bottom: 20 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="desktop"
              type="monotone"
              stroke={chartConfig.desktop.color}
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="mobile"
              type="monotone"
              stroke={chartConfig.mobile.color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
