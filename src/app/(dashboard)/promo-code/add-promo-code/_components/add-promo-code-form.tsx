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

const formSchema = z.object({
  code: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  discountPrice: z.string().min(1, {
    message: "Discount price is required.",
  }),
  startDate: z.date({
    message: "Please select a start date",
  }),
  expiryDate: z.date({
    message: "Please select a expiry date",
  }),
  status: z.string().min(1, {
    message: "Status is required.",
  }),
});

const AddPromoCodeForm = () => {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/" },
    { label: "Promo Code List", href: "/promo-code" },
    { label: "Add Promo Code" },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      discountPrice: "",
      startDate: undefined,
      expiryDate: undefined,
      status: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="py-[30px] shadow-[0px_4px_5px_0px_#0000001A] bg-white rounded-[16px] border-t mb-10">
      {/* breadcrumb and button here */}
      <div className="flex items-center justify-between px-6">
        <Breadcrumbs title="Add Promo Code" items={breadcrumbItems} />
      </div>

      {/* form  */}
      <div className="mt-10 px-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-[#03090D] leading-[120%]">
                      Code (5-10 chars, alphanumeric)
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-[56px] p-5 rounded-[6px] border border-[#00000033] placeholder:text-[#8D8D8D] text-lg font-medium leading-normal text-[#03090D]"
                        placeholder="write your code..."
                        {...field}
                      />
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
                    <FormLabel className="text-sm font-medium text-[#03090D] leading-[120%]">
                      Discount price
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-[56px] p-5 rounded-[6px] border border-[#00000033] placeholder:text-[#8D8D8D] text-lg font-medium leading-normal text-[#03090D]"
                        placeholder="enter your discount price..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Date Picker */}
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-sm font-medium text-[#03090D] leading-[120%] pb-[6px]">Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={`h-[56px] pl-3 text-left font-normal ${
                              !field.value && "text-muted-foreground"
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
                    <FormLabel className="text-sm font-medium text-[#03090D] leading-[120%] pb-[6px]">Expiry Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={`h-[56px] pl-3 text-left font-normal ${
                              !field.value && "text-muted-foreground"
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
                    <FormLabel className="text-sm font-medium text-[#03090D] leading-[120%]">
                      Status
                    </FormLabel>
                    <FormControl>
                      <Select  onValueChange={field.onChange}
          defaultValue={field.value}>
                        <SelectTrigger className="h-[56px] rounded-[6px] border border-[#00000033]">
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="schedule">Schedule</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            {/* button  */}
            <div className="flex items-center justify-center gap-5 py-2">
              <Button
                className="h-[50px] flex items-center gap-2 text-lg font-medium leading-[120%] text-[#499FC0] bg-transparent rounded-[8px] py-[14] px-[44px]"
                type="button"
              >
                <X className="w-5 h-5" /> Cancel
              </Button>
              <Button
                className="h-[54px] text-lg font-medium leading-[120%] text-white bg-[#499FC0] rounded-[8px] py-4 px-[79px]"
                type="submit"
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

export default AddPromoCodeForm;
