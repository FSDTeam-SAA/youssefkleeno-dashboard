"use client"
import { useState } from "react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
    Button
} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ImagePlus, X } from "lucide-react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

const formSchema = z.object({
    vehicleName: z.string().min(1, "Vehicle name is required"),
    vehicleImage: z
        .any()
        .refine((file) => file instanceof File, { message: "Please upload a vehicle image" }),
})

export default function AddoneTimewash() {
    const [preview, setPreview] = useState<string | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log(values)
            toast.success("Vehicle saved successfully!")
        } catch (error) {
            console.error("Form submission error", error)
            toast.error("Failed to submit the form. Please try again.")
        }
    }

    return (
        <Card className='pt-8 px-6'>
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
                        <BreadcrumbPage>Add One Time Vehicle</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8  mx-auto py-10"
                    >
                        {/* Vehicle Name */}
                        <FormField
                            control={form.control}
                            name="vehicleName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Vehicle name</FormLabel>
                                    <FormControl>
                                        <Input className="py-5" placeholder="Enter a name" type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Vehicle Image */}
                        <FormField
                            control={form.control}
                            name="vehicleImage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Add Vehicle Image</FormLabel>
                                    <FormControl>
                                        <div
                                            className="w-full h-96 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer relative"
                                            onClick={() =>
                                                document.getElementById("vehicleImageInput")?.click()
                                            }
                                        >
                                            {preview ? (
                                                <Image
                                                    width={200}
                                                    height={200}
                                                    src={preview}
                                                    alt="Preview"
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
                                                        field.onChange(file)
                                                        setPreview(URL.createObjectURL(file))
                                                    }
                                                }}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Buttons */}
                        <div className="flex justify-center gap-4">
                            <Button
                                type="button"
                                variant="ghost"
                                className="text-[#499FC0] hover:text-[#499FC0]/90"
                                onClick={() => form.reset()}
                            >
                                <X />  Cancel
                            </Button>
                            <Button type="submit" className="bg-btnPrimary hover:bg-btnPrimary/90">
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
