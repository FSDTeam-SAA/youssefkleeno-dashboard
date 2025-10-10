"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  serviceName: z.string().min(1, "Service name is required"),
  price: z.string().min(1, "Price is required"),
  note: z.string().optional(),
  serviceImage: z.any().refine((file) => file instanceof File, {
    message: "Please upload a service image",
  }),
});

export default function AddMonthlyServiceForm() {
  const [preview, setPreview] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();

  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGJmZjg3NzIwZmZmYTNiYjA2ZjEyMDYiLCJlbWFpbCI6Im5pbG95QGV4YW1wbGUuY29tIiwiaWF0IjoxNzU5NzI5MTQ3LCJleHAiOjE3NTk4MTU1NDd9.SHo5_-R3RJczCS2A6m4HHgAsHuRvFVDB3oaAYXHkXgI";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const addServiceMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/service`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
        body: data,
      });
      if (!res.ok) throw new Error("Failed to create service");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Service created successfully!");
      form.reset();
      setPreview(null);
      queryClient.invalidateQueries({ queryKey: ["services"] });
      router.push("/services/monthly-subscription");
    },
    onError: () => {
      toast.error("Failed to create service. Try again.");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("serviceName", values.serviceName);
    formData.append("price", values.price);
    formData.append("washType", "Monthly Subscription"); // always fixed
    if (values.note) formData.append("note", values.note);
    if (values.serviceImage) formData.append("serviceImage", values.serviceImage);

    addServiceMutation.mutate(formData);
  }

  return (
    <Card className="pt-8 px-6">
      <Breadcrumb>
        <p className="text-[#2F2F2F] font-semibold text-[24px] mb-4">
          Add Services
        </p>
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
            <BreadcrumbLink href="/">Add Monthly Subscription</BreadcrumbLink>
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
            className="space-y-6 mx-auto py-8"
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
                      <Input
                        className="py-5"
                        placeholder="Enter a name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="py-5"
                        placeholder="Enter price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Note */}
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem className="col-span-2">
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
                            const file = e.target.files?.[0];
                            if (file) {
                              field.onChange(file);
                              setPreview(URL.createObjectURL(file));
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

            {/* Buttons */}
            <div className="flex justify-center gap-4">
              <Button
                type="button"
                variant="ghost"
                className="text-[#499FC0] hover:text-[#499FC0]/90"
                onClick={() => form.reset()}
                disabled={addServiceMutation.isPending}
              >
                <X /> Cancel
              </Button>
              <Button
                type="submit"
                className="bg-btnPrimary hover:bg-btnPrimary/90"
                disabled={addServiceMutation.isPending}
              >
                {addServiceMutation.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
