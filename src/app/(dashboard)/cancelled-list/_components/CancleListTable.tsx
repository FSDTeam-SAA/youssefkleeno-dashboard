"use client";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import YoussefkleenoPagination from "@/components/ui/YoussefkleenoPagination";
import React, { useState } from "react";

const CancelledListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const breadcrumbItems = [
    { label: "Dashboard", href: "/" },
    { label: "Cancelled list" },
  ];

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
  return (
    <div className="py-[30px] shadow-[0px_4px_5px_0px_#0000001A] bg-white rounded-[16px] border-t mb-10">
      {/* breadcrumb and button here */}
      <div className="flex items-center justify-between px-6">
        <Breadcrumbs title="Cancelled list" items={breadcrumbItems} />
      </div>
      {/* booking table here */}
      <table className="w-full rounded-[6px] mt-10">
        <thead className="bg-[#FAFAFA] ">
          <tr className="">
            <th className="text-lg font-medium text-[#2F2F2F] leading-[120%] py-[21px] pl-6">
              User ID
            </th>
            <th className="text-lg font-medium text-[#2F2F2F] leading-[120%] py-[21px]">
              Phone Number
            </th>
            <th className="text-lg font-medium text-[#2F2F2F] leading-[120%] py-[21px]">
              Refund Amount
            </th>
            <th className="text-lg font-medium text-[#2F2F2F] leading-[120%] py-[21px]">
              Order Date
            </th>
            <th className="text-lg font-medium text-[#2F2F2F] leading-[120%] py-[21px]">
              Cancel Date
            </th>
            <th className="text-lg font-medium text-[#2F2F2F] leading-[120%] py-[21px] pr-6">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {cancelledOrders?.map((item) => {
            return (
              <tr key={item?.userId} className="border border-[#0000000D]">
                <td className="text-lg font-medium text-[#2F2F2F] leading-[120%] text-center py-7 pl-6">
                  {item?.userId}
                </td>
                <td className="text-lg font-medium text-[#2F2F2F] leading-[120%] text-center py-7">
                  {item?.phoneNumber}
                </td>
                <td className="text-lg font-medium text-[#2F2F2F] leading-[150%] text-center py-7">
                  {item?.refundAmount}
                </td>
                <td className="w-[150px] text-lg font-medium text-[#2F2F2F] leading-[150%] text-center py-7">
                  {item?.orderDate}
                </td>
                <td className="w-[220px] text-lg font-medium text-[#2F2F2F] leading-[150%] text-center py-7">
                  {item?.cancelDate}
                </td>
                <td className="w-[350px] py-7 pr-6 ">
                  <div className="flex items-center justify-center gap-4">
                    <button
                      className="text-lg font-medium bg-[#499FC01A] text-[#499FC0] leading-[120%] py-[9px] px-[36px] bg-[background: #499FC01A;
] rounded-[6px] border border-[#499FC04D]"
                    >
                      Approve
                    </button>
                    <button
                      className="text-lg font-medium bg-[#D902021A] text-[#D90202] leading-[120%] py-[9px] px-[45px] bg-[background: #499FC01A;
] rounded-[6px] border border-[#D902024D]"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="">
        <div className="bg-white flex items-center justify-between py-[20px] px-[50px]">
          <p className="text-xl font-normal leading-[120%] text-[#707070]">
            Showing {currentPage} to 5 of 12 results
          </p>

          <div>
            <YoussefkleenoPagination
              totalPages={8}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelledListPage;
