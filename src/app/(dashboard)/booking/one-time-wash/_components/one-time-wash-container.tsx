"use client";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import YoussefkleenoPagination from "@/components/ui/YoussefkleenoPagination";
import { Calendar } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const OneTimeWashContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const breadcrumbItems = [
    { label: "Dashboard", href: "/" },
    { label: "Booking List", href: "/booking/one-time-wash" },
    { label: "Monthly Subscription list" },
  ];

  const bookingData = [
    {
      userId: 102,
      userName: "Alex Johnson",
      image: "/assets/images/booking_user.jpg",
      price: "$10",
      vehicleType: "Car",
      washType: "Dry Wash",
      dateAndTime: "08/21/2025, 08:00 AM",
      address: "123 Main Street San Francisco, CA 94105",
      phoneNumber: "(555) 123-4567",
    },
    {
      userId: 102,
      userName: "Alex Johnson",
      image: "/assets/images/booking_user.jpg",
      price: "$10",
      vehicleType: "Car",
      washType: "Dry Wash",
      dateAndTime: "08/21/2025, 08:00 AM",
      address: "123 Main Street San Francisco, CA 94105",
      phoneNumber: "(555) 123-4567",
    },
    {
      userId: 102,
      userName: "Alex Johnson",
      image: "/assets/images/booking_user.jpg",
      price: "$10",
      vehicleType: "Car",
      washType: "Dry Wash",
      dateAndTime: "08/21/2025, 08:00 AM",
      address: "123 Main Street San Francisco, CA 94105",
      phoneNumber: "(555) 123-4567",
    },
    {
      userId: 102,
      userName: "Alex Johnson",
      image: "/assets/images/booking_user.jpg",
      price: "$10",
      vehicleType: "Car",
      washType: "Dry Wash",
      dateAndTime: "08/21/2025, 08:00 AM",
      address: "123 Main Street San Francisco, CA 94105",
      phoneNumber: "(555) 123-4567",
    },
    {
      userId: 102,
      userName: "Alex Johnson",
      image: "/assets/images/booking_user.jpg",
      price: "$10",
      vehicleType: "Car",
      washType: "Dry Wash",
      dateAndTime: "08/21/2025, 08:00 AM",
      address: "123 Main Street San Francisco, CA 94105",
      phoneNumber: "(555) 123-4567",
    },
    {
      userId: 102,
      userName: "Alex Johnson",
      image: "/assets/images/booking_user.jpg",
      price: "$10",
      vehicleType: "Car",
      washType: "Dry Wash",
      dateAndTime: "08/21/2025, 08:00 AM",
      address: "123 Main Street San Francisco, CA 94105",
      phoneNumber: "(555) 123-4567",
    },
  ];
  return (
    <div className="py-[30px] shadow-[0px_4px_5px_0px_#0000001A] bg-white rounded-[16px] border-t mb-10">
      {/* breadcrumb and button here */}
      <div className="flex items-center justify-between px-6">
        <Breadcrumbs title="Booking" items={breadcrumbItems} />
        <div>
          <button className="flex items-center gap-1 text-lg font-medium text-white leading-[120%] bg-[#499FC0] py-[10px] px-[15px] rounded-[4px]">
            <span>
              <Calendar className="w-5 h-5" />
            </span>{" "}
            <span>Date</span>
          </button>
        </div>
      </div>
      {/* booking table here */}
      <table className="w-full rounded-[6px] mt-10">
        <thead className="bg-[#FAFAFA] ">
          <tr className="">
            <th className="text-lg font-medium text-[#2F2F2F] leading-[120%] py-[21px] pl-6">
              User ID
            </th>
            <th className="text-lg font-medium text-[#2F2F2F] leading-[120%] py-[21px]">
              User Name
            </th>
            <th className="text-lg font-medium text-[#2F2F2F] leading-[120%] py-[21px]">
              Wash Type
            </th>
            <th className="text-lg font-medium text-[#2F2F2F] leading-[120%] py-[21px]">
              Price
            </th>
            <th className="text-lg font-medium text-[#2F2F2F] leading-[120%] py-[21px]">
              Vehicle Type
            </th>

            <th className="text-lg font-medium text-[#2F2F2F] leading-[120%] py-[21px]">
              Date & Time
            </th>
            <th className="text-lg font-medium text-[#2F2F2F] leading-[120%] py-[21px]">
              Address
            </th>
            <th className="text-lg font-medium text-[#2F2F2F] leading-[120%] py-[21px]">
              Phone Number
            </th>
            <th className="text-lg font-medium text-[#2F2F2F] leading-[120%] py-[21px] pr-6">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {bookingData?.map((item) => {
            return (
              <tr key={item?.userId} className="border border-[#0000000D]">
                <td className="text-lg font-medium text-[#2F2F2F] leading-[120%] text-center py-7 pl-6">
                  {item?.userId}
                </td>
                <td className="flex items-center justify-center gap-[14px] text-lg font-normal text-[#1F2937] leading-[120%] py-7">
                  <Image
                    src={item?.image}
                    alt="profile"
                    width={40}
                    height={40}
                    className="w-11 h-11 rounded-full"
                  />{" "}
                  {item?.userName}
                </td>
                <td className="text-lg font-medium text-[#2F2F2F] leading-[150%] text-center py-7">
                  {item?.washType}
                </td>
                <td className="text-lg font-normal text-[#2F2F2F] leading-[120%] text-center py-7">
                  {item?.price}
                </td>
                <td className="text-lg font-normal text-[#2F2F2F] leading-[120%] text-center py-7">
                  {item?.vehicleType}
                </td>

                <td className="w-[150px] text-lg font-medium text-[#2F2F2F] leading-[150%] text-center py-7">
                  {item?.dateAndTime}
                </td>
                <td className="w-[220px] text-lg font-medium text-[#2F2F2F] leading-[150%] text-center py-7">
                  {item?.address}
                </td>
                <td className="text-lg font-medium text-[#2F2F2F] leading-[150%] text-center py-7">
                  {item?.phoneNumber}
                </td>
                <td className="py-7 pr-6 flex items-center justify-center">
                  <button
                    className="text-lg font-medium text-[#499FC0] leading-[120%] py-[9px] px-[36px] bg-[background: #499FC01A;
] rounded-[6px] border border-[#499FC04D]"
                  >
                    Approve
                  </button>
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

export default OneTimeWashContainer;
