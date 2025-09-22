"use client";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import YoussefkleenoPagination from "@/components/ui/YoussefkleenoPagination";
import { Plus, SquarePen, Trash } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const PromoCodeContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const breadcrumbItems = [
    { label: "Dashboard", href: "/" },
    { label: "Promo Code List" },
  ];

  const promoCodeData = [
    {
      codeId: "JEOFG23",
      discountPrice: "$2",
      startDate: "09/09/25",
      endDate: "25/09/25",
      status: "Active",
    },
    {
      codeId: "JEOFG23",
      discountPrice: "$2",
      startDate: "09/09/25",
      endDate: "25/09/25",
      status: "Schedule",
    },
    {
      codeId: "JEOFG23",
      discountPrice: "$2",
      startDate: "09/09/25",
      endDate: "25/09/25",
      status: "Schedule",
    },
    {
      codeId: "JEOFG23",
      discountPrice: "$2",
      startDate: "09/09/25",
      endDate: "25/09/25",
      status: "Active",
    },
    {
      codeId: "JEOFG23",
      discountPrice: "$2",
      startDate: "09/09/25",
      endDate: "25/09/25",
      status: "Active",
    },
    {
      codeId: "JEOFG23",
      discountPrice: "$2",
      startDate: "09/09/25",
      endDate: "25/09/25",
      status: "Schedule",
    },
    {
      codeId: "JEOFG23",
      discountPrice: "$2",
      startDate: "09/09/25",
      endDate: "25/09/25",
      status: "Schedule",
    },
  ];
  return (
    <div className="py-[30px] shadow-[0px_4px_5px_0px_#0000001A] bg-white rounded-[16px] border-t mb-10">
      {/* breadcrumb and button here */}
      <div className="flex flex-col items-start gap-4  px-6">
        <Breadcrumbs title="Promo Code List" items={breadcrumbItems} />
        <div>
          <Link href={"/promo-code/add-promo-code"}>
            <button className="flex items-center gap-1 bg-[#499FC0] py-[10px] px-[15px] rounded-[4px]">
              <span>
                <Plus className="w-5 h-5 text-white" />
              </span>{" "}
              <span className="text-lg font-think text-white leading-[120%]">
                Add Code
              </span>
            </button>
          </Link>
        </div>
      </div>
      {/* booking table here */}
      <table className="w-full rounded-[6px] mt-10">
        <thead className="bg-[#FAFAFA] ">
          <tr className="">
            <th className="text-lg font-medium text-[#2F2F2F] leading-[120%] py-[21px] pl-6">
              Code ID
            </th>
            <th className="text-lg font-medium text-[#2F2F2F] leading-[120%] py-[21px]">
              Discount Price
            </th>
            <th className="text-lg font-medium text-[#2F2F2F] leading-[120%] py-[21px]">
              Start Date
            </th>
            <th className="text-lg font-medium text-[#2F2F2F] leading-[120%] py-[21px]">
              End Date
            </th>
            <th className="text-lg font-medium text-[#2F2F2F] leading-[120%] py-[21px]">
              Status
            </th>
            <th className="text-lg font-medium text-[#2F2F2F] leading-[120%] py-[21px] pr-6">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {promoCodeData?.map((item) => {
            return (
              <tr key={item?.codeId} className="border border-[#0000000D]">
                <td className="text-lg font-medium text-[#2F2F2F] leading-[120%] text-center py-7 pl-6">
                  {item?.codeId}
                </td>
                <td className="text-lg font-normal text-[#2F2F2F] leading-[120%] text-center py-7">
                  {item?.discountPrice}
                </td>
                <td className="text-lg font-medium text-[#2F2F2F] leading-[150%] text-center py-7">
                  {item?.startDate}
                </td>
                <td className="text-lg font-medium text-[#2F2F2F] leading-[150%] text-center py-7">
                  {item?.endDate}
                </td>
                <td className="text-lg font-medium text-[#2F2F2F] leading-[150%] text-center py-7">
                  <button
                    className={`w-[150px] text-lg font-medium leading-[120%] text-[#F1F1F1] py-[7px] px-8 rounded-[29px] ${
                      item?.status === "Active"
                        ? "bg-[#039A06]"
                        : "bg-[#FACC15]"
                    }`}
                  >
                    {item?.status}
                  </button>
                </td>
                <td className="py-7 pr-6 ">
                  <div className="flex items-center justify-center gap-6">
                    <button>
                      <SquarePen />
                    </button>
                    <button>
                      <Trash />
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

export default PromoCodeContainer;
