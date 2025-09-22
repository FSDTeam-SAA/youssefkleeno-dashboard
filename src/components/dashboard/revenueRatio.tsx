"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A single area chart with custom gradient fill"

const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#499FC0", // fallback stroke color
    },
} satisfies ChartConfig

export function RevenueRatio() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Revenue Ratio</CardTitle>
            </CardHeader>
            <CardContent>
                {/* 👇 must define a height */}
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{ left: 12, right: 12 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

                        {/* ✅ Custom gradient */}
                        <defs>
                            <linearGradient id="customGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="-24.77%" stopColor="#499FC0" stopOpacity={1} />
                                <stop offset="82.9%" stopColor="#E9F3FF" stopOpacity={1} />
                                <stop offset="100.09%" stopColor="#FFFFFF" stopOpacity={1} />
                            </linearGradient>
                        </defs>

                        {/* ✅ Single Area using the gradient */}
                        <Area
                            dataKey="desktop"
                            type="natural"
                            fill="url(#customGradient)"
                            stroke="#499FC0"
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
