"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

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

export const description = "A multiple line chart"

const chartData = [
    { month: "January", desktop: 80, mobile: 80 },
    { month: "February", desktop: 5, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#499FC0",
    },
    mobile: {
        label: "Mobile",
        color: "#E4BA13",
    },
} satisfies ChartConfig

export function MonthlySubscriptionRatio() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-36">
                <CardTitle>Monthly Subscription Ratio</CardTitle>
                <div className="flex gap-4">
                    <div className="flex items-center justify-center gap-2 border p-2 rounded-md border-[#E5E5EF]">
                        <p className="h-2 w-2 rounded-full bg-[#499FC0]"></p>
                        <p>Subcription</p>
                    </div>
                    <div className="flex items-center justify-center gap-2 border p-2 rounded-md border-[#E5E5EF]">
                        <p className="h-2 w-2 rounded-full bg-[#E4BA13]"></p>
                        <p>user</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {/* 👇 MUST set a height */}
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
                            tickFormatter={(value) => value.slice(0, 3)}
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
    )
}
