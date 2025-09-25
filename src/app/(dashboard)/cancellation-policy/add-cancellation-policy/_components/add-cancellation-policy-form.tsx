"use client"

import { Breadcrumbs } from "@/components/ui/Breadcrumbs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { X } from "lucide-react"
import QuillEditor from "@/components/ui/quill-editor"

const formSchema = z.object({
  message: z.string().min(1, {
    message: "Message is required.",
  }),
})

type FormSchema = z.infer<typeof formSchema>

const AddCancellationPolicyForm = () => {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/" },
    { label: "Cancellation Policy", href: "/cancellation-policy" },
    { label: "Add Cancellation Policy" },
  ]

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  })

  function onSubmit(values: FormSchema) {
    console.log(values)
  }

  return (
    <div className="py-[30px] shadow-[0px_4px_5px_0px_#0000001A] bg-white rounded-[16px] border-t mb-10">
      {/* breadcrumb */}
      <div className="flex items-center justify-between px-6">
        <Breadcrumbs title="Add Cancellation Policy" items={breadcrumbItems} />
      </div>

      {/* form */}
      <div className="mt-10 px-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground leading-tight">
                    Cancellation Policy Message
                  </FormLabel>
                  <FormControl>
                    <QuillEditor
                      id="message"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* buttons */}
            <div className="flex items-center justify-center gap-5 py-2">
              <Button
                className="h-[50px] flex items-center gap-2 text-lg font-medium leading-[120%] text-[#499FC0] bg-transparent rounded-[8px] px-[44px]"
                type="button"
              >
                <X className="w-5 h-5" /> Cancel
              </Button>
              <Button
                className="h-[54px] text-lg font-medium leading-[120%] text-white bg-[#499FC0] rounded-[8px] px-[79px]"
                type="submit"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default AddCancellationPolicyForm
