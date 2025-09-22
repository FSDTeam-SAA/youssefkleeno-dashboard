import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import ListOfOneTimeServices from '../_components/listOfOneTimeServices'
// import AddoneTimewash from '../_components/add-oneTime-wash'

const page = () => {
    return (
        <div className='bg-[#FAFAFA] flex flex-col gap-8 py-8 px-6 rounded-lg shadow-[0px_4px_5px_0px_#0000001A]'>
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
                        <BreadcrumbPage> One-time Wash list</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Link href="/services/add-one-time-wash"><Button className='flex items-center gap-2 bg-btnPrimary hover:bg-btnPrimary/90'><Plus /> Add Services</Button></Link>
            <ListOfOneTimeServices />
        </div>
    )
}

export default page