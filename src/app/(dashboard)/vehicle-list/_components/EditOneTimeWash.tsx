"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { ImagePlus, X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation"
// import { useQuery } from "@tanstack/react-query"

export default function EditOneTimeWash() {
    const [vehicleName, setVehicleName] = useState("")
    const [vehicleImage, setVehicleImage] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const params = useParams();
    const id = params.id;
    console.log(id);


    // const {data: singleOntimeVehicle} = useQuery({
    //     queryKey: ['singleOntimeWash'],
    //     queryFn: async () => {
    //         const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}`)
    //     }
    // })

    // 🔹 Save handler
    const handleSave = () => {
        console.log("Vehicle Name:", vehicleName)
        console.log("Vehicle Image:", vehicleImage)
    }

    return (
        <Card className='pt-8 px-6'>
            {/* 🔹 Breadcrumb */}
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
                        <BreadcrumbPage>Add Monthly Vehicle</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <CardContent>
                <form 
                    className="space-y-8 mx-auto py-10"
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSave()
                    }}
                >
                    {/* Vehicle Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Vehicle name</label>
                        <Input
                            className="py-5"
                            placeholder="Enter a name"
                            type="text"
                            value={vehicleName}
                            onChange={(e) => setVehicleName(e.target.value)}
                        />
                    </div>

                    {/* Vehicle Image */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Add Vehicle Image</label>
                        <div
                            className="w-full h-96 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer relative"
                            onClick={() => document.getElementById("vehicleImageInput")?.click()}
                        >
                            {preview ? (
                                <Image
                                    src={preview}
                                    alt="Preview"
                                    width={200}
                                    height={200}
                                    className="h-full w-full object-contain rounded-md"
                                />
                            ) : (
                                <div className="flex flex-col items-center text-gray-400">
                                    <ImagePlus className="w-10 h-10" />
                                    <p className="text-sm mt-1">Click to upload</p>
                                </div>
                            )}
                            <input
                                id="vehicleImageInput"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (file) {
                                        setVehicleImage(file)
                                        setPreview(URL.createObjectURL(file))
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-center gap-4">
                        <Button
                            type="button"
                            variant="ghost"
                            className="text-[#499FC0] hover:text-[#499FC0]/90"
                            onClick={() => {
                                setVehicleName("")
                                setVehicleImage(null)
                                setPreview(null)
                            }}
                        >
                            <X /> Cancel
                        </Button>
                        <Button type="submit" className="bg-btnPrimary hover:bg-btnPrimary/90">
                            Save
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
