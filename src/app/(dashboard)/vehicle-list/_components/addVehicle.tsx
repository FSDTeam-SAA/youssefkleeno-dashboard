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
import Image from "next/image"

const formSchema = z.object({
    vehicleName: z.string().min(1, "Vehicle name is required"),
    vehicleImage: z
        .any()
        .refine((file) => file instanceof File || (Array.isArray(file) && file.length > 0), {
            message: "Please upload a vehicle image",
        }),
})

export default function AddVehicle() {
    const [preview, setPreview] = useState<string | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log(values)
            toast(
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(values, null, 2)}
                    </code>
                </pre>
            )
        } catch (error) {
            console.error("Form submission error", error)
            toast.error("Failed to submit the form. Please try again.")
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 max-w-3xl mx-auto py-10"
            >
                {/* Vehicle Name */}
                <FormField
                    control={form.control}
                    name="vehicleName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Vehicle name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter a name" type="text" {...field} />
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
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        if (file) {
                                            field.onChange(file)
                                            setPreview(URL.createObjectURL(file))
                                        }
                                    }}
                                />
                            </FormControl>
                            {preview && (
                                <div className="mt-3">
                                    <Image
                                        width={100}
                                        height={100}
                                        src={preview}
                                        alt="Preview"
                                        className="h-24 w-24 rounded-md object-cover border"
                                    />
                                </div>
                            )}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
