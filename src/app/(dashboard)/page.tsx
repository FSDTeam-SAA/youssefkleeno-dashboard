import DashboardCard from '@/components/dashboard/dashboardCard'
import { MonthlySubscriptionRatio } from '@/components/dashboard/monthlySubscriptionRatio'
import { RevenueRatio } from '@/components/dashboard/revenueRatio'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import React from 'react'

function page() {
  return (
    <div>
      <Breadcrumb>
        <p className='text-[#2F2F2F] font-semibold text-[24px] mb-4'>Overview</p>
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
      <div className='space-y-[40px]'>
        <DashboardCard />
        <MonthlySubscriptionRatio />
        <RevenueRatio />
      </div>
    </div>
  )
}

export default page