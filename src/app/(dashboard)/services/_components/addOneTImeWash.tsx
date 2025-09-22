"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ImagePlus, X } from "lucide-react"
import Image from "next/image"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"

const formSchema = z.object({
    serviceName: z.string().min(1, "Service name is required"),
    serviceDescription: z.string().min(1, "Description is required"),
    note: z.string().optional(),
    color: z.string().min(1, "Pick a color"),
    serviceImage: z
        .any()
        .refine((file) => file instanceof File, {
            message: "Please upload a service image",
        }),
})

export default function AddOneTimeWash() {
    const [preview, setPreview] = useState<string | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Form values:", values)
    }

    return (
        <Card className='pt-8 px-6'>
            <Breadcrumb>
                <p className='text-[#2F2F2F] font-semibold text-[24px] mb-4'>Add Services</p>
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
                        <BreadcrumbLink href="/">Add One Time Wash</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Add Services</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6  mx-auto py-8"
                    >
                        <div className="grid grid-cols-2 gap-6">
                            {/* Service name */}
                            <FormField
                                control={form.control}
                                name="serviceName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Service name</FormLabel>
                                        <FormControl>
                                            <Input className="py-5" placeholder="Enter a name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Color Picker */}
                            <FormField
                                control={form.control}
                                name="color"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Set color for note</FormLabel>
                                        <FormControl>
                                            <Input type="color" {...field} className="w-full h-10 p-1" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Description */}
                            <FormField
                                control={form.control}
                                name="serviceDescription"
                                render={({ field }) => (
                                    <FormItem className="col-span-1">
                                        <FormLabel>Service Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter description here..."
                                                rows={15}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="space-y-5">

                                {/* Note */}
                                <FormField
                                    control={form.control}
                                    name="note"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Note</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Enter note here..."
                                                    rows={5}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Service Image */}
                                <FormField
                                    control={form.control}
                                    name="serviceImage"
                                    render={({ field }) => (
                                        <FormItem className="col-span-2">
                                            <FormLabel>Add Service Image</FormLabel>
                                            <FormControl>
                                                <div
                                                    className="w-full h-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer relative"
                                                    onClick={() =>
                                                        document.getElementById("serviceImageInput")?.click()
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
                                                            <ImagePlus className="w-8 h-8" />
                                                            <p className="text-sm mt-1">Click to upload</p>
                                                        </div>
                                                    )}
                                                    <input
                                                        id="serviceImageInput"
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
                            </div>

                        </div>

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
