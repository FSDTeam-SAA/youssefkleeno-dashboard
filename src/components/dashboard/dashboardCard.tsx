import React from 'react'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import cardImage1 from '@/public/images/cardImage1.png'
import cardImage2 from '@/public/images/cardImage2.png'
import cardImage3 from '@/public/images/cardImage3.png'
import cardImage4 from '@/public/images/cardImage4.png'
const DashboardCard = () => {
    return (
        <div className='pt-10'>
            <div className='grid grid-cols-4 gap-4'>
                <Card className='py-4'>
                    <CardContent className='flex justify-between items-center  h-full'>
                        <div>
                            <p>Revenue</p>
                            <p className='text-2xl font-bold'>$12,345</p>
                        </div>
                        <Image src={cardImage1} alt="revenue" width={148} height={100} />
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className='flex justify-between items-center  h-full'>
                        <div>
                            <p>Revenue</p>
                            <p className='text-2xl font-bold'>$12,345</p>
                        </div>
                        <Image src={cardImage2} alt="revenue" width={148} height={100} />
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className='flex justify-between items-center  h-full'>
                        <div>
                            <p>Revenue</p>
                            <p className='text-2xl font-bold'>$12,345</p>
                        </div>
                        <Image src={cardImage3} alt="revenue" width={148} height={100} />
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className='flex justify-between items-center  h-full'>
                        <div>
                            <p>Revenue</p>
                            <p className='text-2xl font-bold'>$12,345</p>
                        </div>
                        <Image src={cardImage4} alt="revenue" width={148} height={100} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default DashboardCard