"use client";

import DashboardCard from "@/components/dashboard/dashboardCard";
import { MonthlySubscriptionRatio } from "@/components/dashboard/monthlySubscriptionRatio";
import { RevenueRatio } from "@/components/dashboard/revenueRatio";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useQuery } from "@tanstack/react-query";

export default function OverviewPage() {
  const {
    data: OverviewData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["overview"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/dashboard`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch overview data");
      }
      return res.json(); // ✅ Must return parsed data
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-10 text-lg text-gray-500">
        Loading overview data...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load overview data.
      </div>
    );
  }

  // ✅ Optional: log data or pass it to your components
  console.log("Overview Data:", OverviewData);

  return (
    <div>
      <Breadcrumb>
        <p className="text-[#2F2F2F] font-semibold text-[24px] mb-4">
          Overview
        </p>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Overview</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-[40px]">
        {/* You can pass OverviewData as props if needed */}
        <DashboardCard data={OverviewData?.data} />
        <MonthlySubscriptionRatio data={OverviewData?.data} />
        <RevenueRatio data={OverviewData?.data} />
      </div>
    </div>
  );
}
