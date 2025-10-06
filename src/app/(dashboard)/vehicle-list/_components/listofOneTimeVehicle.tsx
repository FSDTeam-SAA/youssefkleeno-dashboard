"use client"

import React, { useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Bike, Pencil, Trash2 } from "lucide-react"
import YoussefkleenoPagination from "@/components/ui/YoussefkleenoPagination"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

// 🔹 API Response Types
interface Vehicle {
    _id: string
    vehicleName: string
    createdAt: string
    updatedAt: string
    washType: string
    vehicleImage?: {
        url: string
        public_id: string
    }
}

interface VehicleResponse {
    success: boolean
    message: string
    data: Vehicle[]
    total?: number // if backend returns total count
}

const ListofOneTimeVehicle: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const itemsPerPage = 10 // প্রতি পেজে কত data backend দেয়

    // 🔹 Fetch API with type safety
    const { data: vehicleData, isLoading, error } = useQuery<VehicleResponse>({
        queryKey: ["vehicle", currentPage],
        queryFn: async (): Promise<VehicleResponse> => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/vehicle?washType=One-time Wash&page=${currentPage}&limit=${itemsPerPage}`
            )
            if (!res.ok) {
                throw new Error("Failed to fetch vehicles")
            }
            return res.json()
        },
    })


    

    if (isLoading) {
        return <p className="text-center py-10">Loading...</p>
    }

    if (error) {
        return <p className="text-center text-red-500 py-10">Error loading data</p>
    }

    const vehicles: Vehicle[] = vehicleData?.data || []

    // ✅ Dynamic total pages calculation
    const totalItems = vehicleData?.total ?? vehicles.length
    const totalPages = totalItems > 0 ? Math.ceil(totalItems / itemsPerPage) : 1

    return (
        <div className="w-full overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow className="bg-[#f1efef]">
                        <TableHead className="text-center py-5 text-[#2F2F2F] font-medium w-[150px] text-lg">
                            Vehicle ID
                        </TableHead>
                        <TableHead className="text-center py-5 text-[#2F2F2F] font-medium w-[150px] text-lg">
                            Vehicle Name
                        </TableHead>
                        <TableHead className="text-center py-5 text-[#2F2F2F] font-medium w-[150px] text-lg">
                            Add Date
                        </TableHead>
                        <TableHead className="text-center py-5 text-[#2F2F2F] font-medium w-[150px] text-lg">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {vehicles.map((v) => (
                        <TableRow key={v._id} className="hover:bg-muted/20">
                            {/* Vehicle ID */}
                            <TableCell className="font-medium text-center py-10 text-lg text-[#2F2F2F]">
                                {v._id}
                            </TableCell>

                            {/* Vehicle Name with Icon */}
                            <TableCell>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                        <Bike className="w-4 h-4 text-[#499FC0]" />
                                    </div>
                                    <span className="text-[#1F2937] text-lg">{v.vehicleName}</span>
                                </div>
                            </TableCell>

                            {/* Add Date */}
                            <TableCell className="text-center text-lg font-medium text-[#2F2F2F]">
                                {new Date(v.createdAt).toLocaleDateString()}
                            </TableCell>

                            {/* Actions */}
                            <TableCell>
                                <div className="flex justify-center items-center gap-3">
                                   <Link href={`/vehicle-list/edit-one-time-wash/${v?._id}`}><Pencil className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-blue-600" /></Link>
                                    <Trash2 className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-red-600" />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* ✅ Pagination শুধু তখনই show হবে যখন totalItems >= itemsPerPage */}
            {totalItems > itemsPerPage && (
                <div>
                    <div className="bg-white flex items-center justify-between py-[20px] px-[50px]">
                        <p className="text-xl font-normal leading-[120%] text-[#707070]">
                            Showing page {currentPage} of {totalPages} — Total {totalItems} results
                        </p>

                        <div>
                            <YoussefkleenoPagination
                                totalPages={totalPages}
                                currentPage={currentPage}
                                onPageChange={(page: number) => setCurrentPage(page)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ListofOneTimeVehicle
