"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Edit, Trash2 } from "lucide-react"
import { AddScheduleForm } from "./TimeSheduleFrom"



// Sample data matching the original
const cancelledOrders = [
  {
    userId: 102,
    phoneNumber: "(555) 123-4567",
    refundAmount: "$10",
    orderDate: "08/21/2025",
    cancelDate: "08/21/2025",
  },
  {
    userId: 102,
    phoneNumber: "(555) 123-4567",
    refundAmount: "$10",
    orderDate: "08/21/2025",
    cancelDate: "08/21/2025",
  },
  {
    userId: 102,
    phoneNumber: "(555) 123-4567",
    refundAmount: "$10",
    orderDate: "08/21/2025",
    cancelDate: "08/21/2025",
  },
  {
    userId: 102,
    phoneNumber: "(555) 123-4567",
    refundAmount: "$10",
    orderDate: "08/21/2025",
    cancelDate: "08/21/2025",
  },
  {
    userId: 102,
    phoneNumber: "(555) 123-4567",
    refundAmount: "$10",
    orderDate: "08/21/2025",
    cancelDate: "08/21/2025",
  },
]

export default function TimeSchedulePage() {
  const [showAddForm, setShowAddForm] = useState(false)

  if (showAddForm) {
    return <AddScheduleForm onBack={() => setShowAddForm(false)} />
  }

  return (
    <div className="min-h-screen">
      <Card className="w-full bg-white">
        {/* Header */}
        <Breadcrumb className="p-5">
          <p className="text-[#2F2F2F] font-semibold text-[24px] mb-4">
        Time Schedule List
          </p>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Time Schedule List</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
          <div className="pt-7">
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-[#499FC0] hover:bg-[#499FC0]/90 text-white w-[140px] h-[40px] rounded-md flex items-center gap-2"
            >
              <span className="text-lg">+</span>
              Add Schedule
            </Button>
          </div>
        </Breadcrumb>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">User ID</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Phone Number</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Refund Amount</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Order Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Cancel Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cancelledOrders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{order.userId}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.phoneNumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.refundAmount}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.orderDate}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.cancelDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}