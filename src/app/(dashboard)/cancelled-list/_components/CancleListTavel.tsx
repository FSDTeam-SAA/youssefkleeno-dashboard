import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Sample data matching the image
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
];

export default function CancelledListPage() {
  return (
    <div className="min-h-screen bg-white ">
      <div className="mx-auto w-full">
        {/* Main content card */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-0">
            {/* Header with breadcrumb */}
            <Breadcrumb className="p-5">
                  <p className="text-[#2F2F2F] font-semibold text-[24px] mb-4">
                  Cancelled list
                  </p>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Cancelled list</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
            <Table>
              <TableHeader className="bg-[#FAFAFA]">
                <TableRow className="">
                  <TableHead className="text-[#2F2F2F] font-medium py-4 px-6">
                    User ID
                  </TableHead>
                  <TableHead className="text-[#2F2F2F] font-medium py-4 px-6">
                    Phone Number
                  </TableHead>
                  <TableHead className="text-[#2F2F2F] font-medium py-4 px-6">
                    Refund Amount
                  </TableHead>
                  <TableHead className="text-[#2F2F2F] font-medium py-4 px-6">
                    Order Date
                  </TableHead>
                  <TableHead className="text-[#2F2F2F] font-medium py-4 px-6">
                    Cancel Date
                  </TableHead>
                  <TableHead className="text-[#2F2F2F] font-medium py-4 px-6">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cancelledOrders.map((order, index) => (
                  <TableRow
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50/50"
                  >
                    <TableCell className="py-4 px-6 text-[#2F2F2F]">
                      {order.userId}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-[#2F2F2F]">
                      {order.phoneNumber}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-[#2F2F2F]">
                      {order.refundAmount}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-[#2F2F2F]">
                      {order.orderDate}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-[#2F2F2F]">
                      {order.cancelDate}
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-[#499FC01A] text-[#499FC0] hover:bg-[#499FC0]/20 hover:text-[#499FC0] border-1  w-[140px]  h-[40px] text-sm font-medium  border-[#499FC0]"
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          className="bg-[#D902021A] text-[#D90202] hover:bg-red-200 border-0 w-[140px] h-[40px] text-sm font-medium"
                        >
                          Reject
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
  );
}