import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Listofvehicle from '../_components/listofvehicle'
import Link from 'next/link'

const page = () => {
  return (
    <div className='bg-[#FAFAFA]   rounded-lg shadow-[0px_4px_5px_0px_#0000001A]'>
     <div className='py-8 px-6 flex flex-col gap-8'>
      <Breadcrumb>
        <p className='text-[#2F2F2F] font-semibold text-[24px] mb-4'>Vehicle List</p>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Vehicle List</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Monthly Subscription list</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Link href="/vehicle-list/add-monthly-vehicle">
        <Button className='flex items-center gap-2 bg-btnPrimary hover:bg-btnPrimary/90'><Plus /> Add Vehicle</Button>
      </Link>
     </div>
      <Listofvehicle />
    </div>
  )
}

export default page