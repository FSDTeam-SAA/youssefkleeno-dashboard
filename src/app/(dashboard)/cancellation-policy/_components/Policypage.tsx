"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader,  } from "@/components/ui/card";
import { AddPolicyModal } from "./AddPolicyFrom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function CancellationPolicyPage() {
  const [isAddPolicyOpen, setIsAddPolicyOpen] = useState(false);
  const [policies, setPolicies] = useState([
    "More than 24 hours before: Full refund",
    "12-24 hours before: 75% refund",
    "4-12 hours before: 50% refund",
    "2-4 hours before: 25% refund",
    "Less than 2 hours before: No refund",
  ]);

console.log(setPolicies)

  return (
    <div className="min-h-screen bg-white ">
      <div className="w-full mx-auto">
        {!isAddPolicyOpen && (
          <Card className="bg-white shadow-sm">
            <CardHeader className=" pb-4">
              <div className="flex items-center justify-between">
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
              </div>
              <div className="pt-7">
              <Button
                onClick={() => setIsAddPolicyOpen(true)}
                className="w-[140px] bg-[#499FC0] hover:bg-[#499FC0]/90 text-white px-4 py-2 text-sm font-medium "
              >
                + Add Policy
              </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <p className="text-gray-700 mb-4">
                Our cancellation policy is as follows:
              </p>
              <ul className="space-y-2">
                {policies.map((policy, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-[#000000] text-xl font-normal">{policy}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      <AddPolicyModal
        isOpen={isAddPolicyOpen}
        onClose={() => setIsAddPolicyOpen(false)}
        // onAddPolicy={handleAddPolicy}
      />
    </div>
  );
}
