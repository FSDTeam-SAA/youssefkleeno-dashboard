"use client"

import React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Bike, Pencil, Trash2 } from "lucide-react"

const Listofvehicle = () => {
    const vehicles = [
        { id: 102, name: "Motorcycle", date: "08/21/2025" },
        { id: 102, name: "Motorcycle", date: "08/21/2025" },
        { id: 102, name: "Motorcycle", date: "08/21/2025" },
        { id: 102, name: "Motorcycle", date: "08/21/2025" },
        { id: 102, name: "Motorcycle", date: "08/21/2025" },
        { id: 102, name: "Motorcycle", date: "08/21/2025" },
    ]

    return (
        <div className="w-full overflow-x-auto">
            <Table className="">
                <TableHeader>
                    <TableRow className="bg-[#f1efef]">
                        <TableHead className="text-center py-5 text-[#2F2F2F] font-medium  w-[150px] text-lg">
                            Vehicle ID
                        </TableHead>
                        <TableHead className="text-center py-5 text-[#2F2F2F] font-medium  w-[150px] text-lg">
                            Vehicle Name
                        </TableHead>
                        <TableHead className="text-center py-5 text-[#2F2F2F] font-medium  w-[150px] text-lg">
                            Add Date
                        </TableHead>
                        <TableHead className="text-center py-5 text-[#2F2F2F] font-medium  w-[150px] text-lg ">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {vehicles.map((v, i) => (
                        <TableRow key={i} className="hover:bg-muted/20">
                            {/* Vehicle ID */}
                            <TableCell className="font-medium text-center py-10">{v.id}</TableCell>

                            {/* Vehicle Name with Icon */}
                            <TableCell>
                                <div className="flex items-center justify-center gap-2 ">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                        <Bike className="w-4 h-4 text-[#499FC0]" />
                                    </div>
                                    <span className="text-[#1F2937] text-lg">{v.name}</span>
                                </div>
                            </TableCell>

                            {/* Add Date */}
                            <TableCell className="text-center text-lg font-medium text-[#2F2F2F]">{v.date}</TableCell>

                            {/* Actions */}
                            <TableCell>
                                <div className="flex justify-center items-center gap-3">
                                    <Pencil className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-blue-600" />
                                    <Trash2 className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-red-600" />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default Listofvehicle
