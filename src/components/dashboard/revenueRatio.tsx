"use client";

import React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
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

// ✅ Description
export const description = "A single area chart with custom gradient fill";

// ✅ Fallback chart data
const defaultChartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

// ✅ Chart configuration
const chartConfig = {
  desktop: {
    label: "Revenue",
    color: "#499FC0",
  },
} satisfies ChartConfig;

// ✅ Types for props
interface RevenueDataItem {
  month: number; // e.g., 1 for January
  revenue: number;
}

interface RevenueRatioProps {
  data?: {
    monthlyRevenue?: RevenueDataItem[];
  } | null;
}

export const RevenueRatio: React.FC<RevenueRatioProps> = ({ data }) => {
  // ✅ Transform API data into chart format
  const chartData =
    data?.monthlyRevenue?.map((item) => ({
      month: new Date(0, item.month - 1).toLocaleString("default", {
        month: "long",
      }),
      desktop: item.revenue ?? 0,
    })) ?? defaultChartData;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Ratio</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart
            data={chartData}
            margin={{ left: 12, right: 12 }}
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

            {/* ✅ Gradient for smooth color fill */}
            <defs>
              <linearGradient id="customGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#499FC0" stopOpacity={1} />
                <stop offset="80%" stopColor="#E9F3FF" stopOpacity={1} />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity={1} />
              </linearGradient>
            </defs>

            {/* ✅ Area line */}
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#customGradient)"
              stroke={chartConfig.desktop.color}
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
