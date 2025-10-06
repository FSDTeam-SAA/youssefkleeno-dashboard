"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
// import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import YoussefkleenoPagination from "@/components/ui/YoussefkleenoPagination"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetUser } from "@/hooks/ApiClling"
// import { Trash2 } from "lucide-react"
import { useState } from "react"

export function OneTimeUserTable() {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGJmZjg3NzIwZmZmYTNiYjA2ZjEyMDYiLCJlbWFpbCI6Im5pbG95QGV4YW1wbGUuY29tIiwiaWF0IjoxNzU5NzI5NTcyLCJleHAiOjE3NTk4MTU5NzJ9.0eKSIKhBGZ9k9B1NcwybhfoBCBZUXa8yeOA2JTg4JME"
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 10

  const { data, isLoading } = useGetUser(token, currentPage, limit, "one-time")

  const users = data?.data || []
  const totalResults = users.length
  const totalPages = Math.ceil(totalResults / limit)

  return (
    <div className="">
      <div className="w-full">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-0">
            {/* Breadcrumb */}
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
                  <BreadcrumbPage>One Time Wash User</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Table */}
            {isLoading ? (
              <Table className="mt-10">
                <TableHeader className="bg-[#FAFAFA]">
                  <TableRow>
                    <TableHead className="py-4 px-6">User ID</TableHead>
                    <TableHead className="py-4 px-6">User Name</TableHead>
                    <TableHead className="py-4 px-6">Address</TableHead>
                    <TableHead className="py-4 px-6">Phone Number</TableHead>
                    {/* <TableHead className="py-4 px-6">Action</TableHead> */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: limit }).map((_, idx) => (
                    <TableRow key={idx} className="border-b border-gray-100">
                      <TableCell className="py-4 px-6">
                        <Skeleton className="h-4 w-16" />
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <Skeleton className="h-4 w-64" />
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <Skeleton className="h-4 w-32" />
                      </TableCell>
                      {/* <TableCell className="py-4 px-6">
                        <Skeleton className="h-8 w-8 rounded" />
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : users.length === 0 ? (
              <div className="p-6 text-center text-gray-500 text-lg">
                No users found.
              </div>
            ) : (
              <>
                <Table className="mt-10">
                  <TableHeader className="bg-[#FAFAFA]">
                    <TableRow>
                      <TableHead className="text-[#2F2F2F] font-medium py-4 px-6">User ID</TableHead>
                      <TableHead className="text-[#2F2F2F] font-medium py-4 px-6">User Name</TableHead>
                      <TableHead className="text-[#2F2F2F] font-medium py-4 px-6">Address</TableHead>
                      <TableHead className="text-[#2F2F2F] font-medium py-4 px-6">Phone Number</TableHead>
                      {/* <TableHead className="text-[#2F2F2F] font-medium py-4 px-6">Action</TableHead> */}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user._id} className="border-b border-gray-100 hover:bg-gray-50/50">
                        <TableCell className="py-4 px-6 text-[#2F2F2F]">{user._id}</TableCell>
                        <TableCell className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={user.avatar?.url || "/placeholder.svg"} alt={user.name} />
                              <AvatarFallback className="bg-orange-100 text-orange-600">
                                {user.name?.split(" ").map((n: string) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-[#2F2F2F] font-medium">{user.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4 px-6 text-[#2F2F2F]">
                          {`${user.street}, ${user.city}, ${user.state}, ${user.zip}`}
                        </TableCell>
                        <TableCell className="py-4 px-6 text-[#2F2F2F]">{user.phone}</TableCell>
                        {/* <TableCell className="py-4 px-6">
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Pagination */}
                {totalResults > limit && (
                  <div className="bg-white flex items-center justify-between py-[20px] px-[50px]">
                    <p className="text-xl font-normal leading-[120%] text-[#707070]">
                      Showing page {currentPage} of {totalPages}, total {totalResults} results
                    </p>
                    <div className="flex justify-end">
                      <YoussefkleenoPagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={(page) => setCurrentPage(page)}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
