"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

interface AddPolicyModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddPolicyModal({ isOpen, onClose }: AddPolicyModalProps) {
  const [policyDescription, setPolicyDescription] = useState("")

  const handleSave = () => {
    // Handle save logic here
    console.log("Policy saved:", policyDescription)
    onClose()
    setPolicyDescription("")
  }

  const handleCancel = () => {
    onClose()
    setPolicyDescription("")
  }

  if (!isOpen) return null

  return (
    <div className="">
      <div className="w-full ">
        <Card className="bg-white shadow-lg">
          <CardHeader className=" pb-4">
           
             <Breadcrumb>
                  <p className="text-[#2F2F2F] font-semibold text-[24px] mb-4">
                    Cancellation Policy
                  </p>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Cancellation Policy</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="policy-description" className="text-[18px] font-medium text-[#03090D]">
                  Policy Description
                </Label>
                <Textarea
                  id="policy-description"
                  placeholder="Add Policy description here..."
                  value={policyDescription}
                  onChange={(e) => setPolicyDescription(e.target.value)}
                  className="mt-2 min-h-[200px] resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-center gap-3 mt-6 pt-4 ">
              <Button
                variant="ghost"
                onClick={handleCancel}
                className="text-[#499FC0] hover:text-[#499FC0]/90 hover:bg-transparent"
              >
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-[#499FC0] h-[40px] w-[140px]  hover:bg-[#499FC0]/90 text-white px-6">
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
