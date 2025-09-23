import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import ListOfMonthlyServices from '../_components/listOfMonthlyServices'

const page = () => {
  return (
    <div className='bg-[#FAFAFA] flex flex-col  rounded-lg shadow-[0px_4px_5px_0px_#0000001A]'>
      <div className='flex flex-col gap-8 px-6 py-8'>
        <Breadcrumb>
          <p className='text-[#2F2F2F] font-semibold text-[24px] mb-4'>Services List</p>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Services List</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Monthly Subscription list</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Link href="/services/add-monthly-sevices">
          <Button className='flex items-center gap-2 bg-btnPrimary hover:bg-btnPrimary/90'><Plus /> Add Services</Button>
        </Link>
      </div>
      <ListOfMonthlyServices />
    </div>
  )
}

export default page