"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Eye, Trash2 } from "lucide-react"

// Dummy data matching the image
const userData = [
  {
    id: 102,
    name: "Alex Johnson",
    avatar: "/professional-headshot-alex-johnson.png",
    address: "123 Main Street San Francisco, CA 94105",
    phone: "(555) 123-4567",
  },
  {
    id: 102,
    name: "Alex Johnson",
    avatar: "/professional-headshot-alex-johnson.png",
    address: "123 Main Street San Francisco, CA 94105",
    phone: "(555) 123-4567",
  },
  {
    id: 102,
    name: "Alex Johnson",
    avatar: "/professional-headshot-alex-johnson.png",
    address: "123 Main Street San Francisco, CA 94105",
    phone: "(555) 123-4567",
  },
  {
    id: 102,
    name: "Alex Johnson",
    avatar: "/professional-headshot-alex-johnson.png",
    address: "123 Main Street San Francisco, CA 94105",
    phone: "(555) 123-4567",
  },
  {
    id: 102,
    name: "Alex Johnson",
    avatar: "/professional-headshot-alex-johnson.png",
    address: "123 Main Street San Francisco, CA 94105",
    phone: "(555) 123-4567",
  },
  {
    id: 102,
    name: "Alex Johnson",
    avatar: "/professional-headshot-alex-johnson.png",
    address: "123 Main Street San Francisco, CA 94105",
    phone: "(555) 123-4567",
  },
]

export function UserManagementTable() {
  return (
    <div className="">
      <div className=" w-full">
        {/* Main content card */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-0">
            {/* Header with breadcrumb */}
            <Breadcrumb className="p-5">
              <p className="text-[#2F2F2F] font-semibold text-[24px] mb-4">
                User Management
              </p>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>User Management</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>One-time Wash User</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <Table className="mt-10">
              <TableHeader className="bg-[#FAFAFA]">
                <TableRow className="">
                  <TableHead className="text-[#2F2F2F] font-medium py-4 px-6">
                    User ID
                  </TableHead>
                  <TableHead className="text-[#2F2F2F] font-medium py-4 px-6">
                    User Name
                  </TableHead>
                  <TableHead className="text-[#2F2F2F] font-medium py-4 px-6">
                    Address
                  </TableHead>
                  <TableHead className="text-[#2F2F2F] font-medium py-4 px-6">
                    Phone Number
                  </TableHead>
                  <TableHead className="text-[#2F2F2F] font-medium py-4 px-6">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userData.map((user, index) => (
                  <TableRow
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50/50"
                  >
                    <TableCell className="py-4 px-6 text-[#2F2F2F]">
                      {user.id}
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback className="bg-orange-100 text-orange-600">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-[#2F2F2F] font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-[#2F2F2F]">
                      {user.address}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-[#2F2F2F]">
                      {user.phone}
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-[#2F2F2F] hover:text-[#2F2F2F]/80"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-[#2F2F2F] hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        {/* <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-500">Showing 1 to 5 of 12 results</div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
            >
              1
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 text-gray-500 border-gray-300 hover:bg-gray-50 bg-transparent"
            >
              2
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 text-gray-500 border-gray-300 hover:bg-gray-50 bg-transparent"
            >
              3
            </Button>
            <span className="px-2 text-gray-400">...</span>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 text-gray-500 border-gray-300 hover:bg-gray-50 bg-transparent"
            >
              8
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 text-gray-500 border-gray-300 hover:bg-gray-50 bg-transparent"
            >
              {"›"}
            </Button>
          </div>
        </div> */}
      </div>
    </div>
  )
}