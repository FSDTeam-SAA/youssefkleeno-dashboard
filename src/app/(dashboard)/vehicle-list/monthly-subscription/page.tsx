import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Listofvehicle from '../_components/listofvehicle'

const page = () => {
  return (
    <div className='bg-[#FAFAFA] space-y-7 py-8 px-6 rounded-lg shadow-[0px_4px_5px_0px_#0000001A]'>
      <Breadcrumb>
        <p className='text-[#2F2F2F] font-semibold text-[24px] mb-4'>Vehicle List</p>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Monthly Subscription list</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Button className='flex items-center gap-2 bg-btnPrimary'><Plus /> Add Vehicle</Button>
      <Listofvehicle />
    </div>
  )
}

export default page