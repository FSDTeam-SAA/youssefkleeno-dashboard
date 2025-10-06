"use client";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { CalendarIcon, X } from "lucide-react";
import { useEffect } from "react";
import { useEditPromocode, useGetSingelPromocode } from "@/hooks/ApiClling";

// ✅ Zod schema with discountPrice as number
const formSchema = z.object({
    code: z.string().min(2, {
        message: "Code must be at least 2 characters.",
    }),
    discountPrice: z.number().min(1, {
        message: "Discount price is required.",
    }),
    startDate: z.date({
        message: "Please select a start date",
    }),
    expiryDate: z.date({
        message: "Please select an expiry date",
    }),
    status: z.string().min(1, {
        message: "Status is required.",
    }),
});

const EditPromoCode = ({ id }: { id: string }) => {
    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGJmZjg3NzIwZmZmYTNiYjA2ZjEyMDYiLCJlbWFpbCI6Im5pbG95QGV4YW1wbGUuY29tIiwiaWF0IjoxNzU5Mzk3OTI1LCJleHAiOjE3NTk0ODQzMjV9.sLl3FujxPqzpHsnClunVYreoCFhjdl08nrnh1uVCf0s";

    const { data, isLoading } = useGetSingelPromocode(token, id);
    const editPromocode = useEditPromocode(token, id);

    const breadcrumbItems = [
        { label: "Dashboard", href: "/" },
        { label: "Promo Code List", href: "/promo-code" },
        { label: "Edit Promo Code" },
    ];

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            code: "",
            discountPrice: 0,
            startDate: undefined,
            expiryDate: undefined,
            status: "",
        },
    });

    
    useEffect(() => {
        if (data?.data) {
            form.reset({
                code: data.data.code,
                discountPrice: data.data.discountPrice,
                startDate: new Date(data.data.startDate),
                expiryDate: new Date(data.data.expiryDate),
                status: data.data.status,
            });
        }
    }, [data, form]);

 
    function onSubmit(values: z.infer<typeof formSchema>) {
        const payload = {
            code: values.code,
            discountPrice: Number(values.discountPrice),
            startDate: values.startDate,
            expiryDate: values.expiryDate,
            status: values.status,
        };
 
        editPromocode.mutate(payload);
    }

    if (isLoading) {
        return <div className="p-6">Loading promo code...</div>;
    }

    return (
        <div className="py-[30px] shadow-[0px_4px_5px_0px_#0000001A] bg-white rounded-[16px] border-t mb-10">
            {/* breadcrumb */}
            <div className="flex items-center justify-between px-6">
                <Breadcrumbs title="Promo Code" items={breadcrumbItems} />
            </div>

            {/* form */}
            <div className="mt-10 px-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {/* Code + Discount Price */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Code (5-10 chars, alphanumeric)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter code..." {...field} />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="discountPrice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Discount Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Enter discount price..."
                                                value={field.value ?? ""}
                                                onChange={(e) =>
                                                    field.onChange(e.target.value ? Number(e.target.value) : 0)
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Dates + Status */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Start Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        className={`h-[56px] pl-3 text-left font-normal ${!field.value && "text-muted-foreground"
                                                            }`}
                                                    >
                                                        {field.value
                                                            ? field.value.toLocaleDateString("en-US", {
                                                                day: "2-digit",
                                                                month: "long",
                                                                year: "numeric",
                                                            })
                                                            : "DD / MM / YYYY"}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="expiryDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Expiry Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        className={`h-[56px] pl-3 text-left font-normal ${!field.value && "text-muted-foreground"
                                                            }`}
                                                    >
                                                        {field.value
                                                            ? field.value.toLocaleDateString("en-US", {
                                                                day: "2-digit",
                                                                month: "long",
                                                                year: "numeric",
                                                            })
                                                            : "DD / MM / YYYY"}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="active">Active</SelectItem>
                                                        <SelectItem value="inactive">Inactive</SelectItem>
                                                        <SelectItem value="expired">Expired</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center justify-center gap-5 py-2">
                            <Button
                                type="button"
                                variant="outline"
                                className="h-[50px] flex items-center gap-2"
                                onClick={() => form.reset()}
                            >
                                <X className="w-5 h-5" /> Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="h-[54px] text-white bg-[#499FC0] rounded-[8px] px-10"
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default EditPromoCode;
