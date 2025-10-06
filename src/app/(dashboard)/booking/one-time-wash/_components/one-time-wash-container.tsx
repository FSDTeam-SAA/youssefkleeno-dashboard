"use client";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import YoussefkleenoPagination from "@/components/ui/YoussefkleenoPagination";
import { useGetBooking } from "@/hooks/ApiClling";
import Image from "next/image";
import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const OneTimeWashContainer = () => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....";
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  const { data, isLoading, error } = useGetBooking(token, currentPage, limit, "one-time");

  const breadcrumbItems = [
    { label: "Dashboard", href: "/" },
    { label: "Booking List", href: "/booking/one-time-wash" },
    { label: "One-time Wash" },
  ];

  const bookings = data?.data?.bookings || [];
  const totalPages = data?.data?.totalPages || 1;
  const totalResults = data?.data?.total || 0;

  if (error) return <p>Error loading bookings</p>;

  return (
    <div className="py-[30px] shadow-[0px_4px_5px_0px_#0000001A] bg-white rounded-[16px] border-t mb-10">
      {/* Breadcrumb & Date Button */}
      <div className="flex items-center justify-between px-6">
        <Breadcrumbs title="Booking" items={breadcrumbItems} />
        {/* <button className="flex items-center gap-1 bg-[#499FC0] py-[10px] px-[15px] rounded-[4px]">
          <Calendar className="w-5 h-5 text-white" />
          <span className="text-lg font-think text-white leading-[120%]">Date</span>
        </button> */}
      </div>

      {/* Booking Table */}
      <table className="w-full rounded-[6px] mt-10">
        <thead className="bg-[#FAFAFA]">
          <tr>
            <th className="text-lg font-medium text-[#2F2F2F] leading-[120%] py-[21px] pl-6">Booking ID</th>
            <th className="text-lg font-medium text-[#2F2F2F] leading-[120%] py-[21px]">User Name</th>
            <th className="text-lg font-medium text-[#2F2F2F] leading-[120%] py-[21px]">Email</th>
            <th className="text-lg font-medium text-[#2F2F2F] leading-[120%] py-[21px]">License Plate</th>
            <th className="text-lg font-medium text-[#2F2F2F] leading-[120%] py-[21px]">Wash Type</th>
            <th className="text-lg font-medium text-[#2F2F2F] leading-[120%] py-[21px]">Date & Slot</th>
            <th className="text-lg font-medium text-[#2F2F2F] leading-[120%] py-[21px]">Address</th>
            <th className="text-lg font-medium text-[#2F2F2F] leading-[120%] py-[21px]">Price</th>
            <th className="text-lg font-medium text-[#2F2F2F] leading-[120%] py-[21px] pr-6">Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            // ShadCN Skeleton Rows
            Array.from({ length: limit }).map((_, index) => (
              <tr key={index} className="border border-[#0000000D]">
                {Array.from({ length: 9 }).map((__, i) => (
                  <td key={i} className="py-7 px-6">
                    <Skeleton className="h-6 w-full" />
                  </td>
                ))}
              </tr>
            ))
          ) : bookings.length === 0 ? (
            <tr>
              <td colSpan={9} className="text-center py-10 text-lg font-medium text-[#707070]">
                Data not found
              </td>
            </tr>
          ) : (
            bookings.map((booking) => {
              const dateObj = booking.dates[0];
              return (
                <tr key={booking._id} className="border border-[#0000000D]">
                  <td className="text-center py-7 pl-6 text-lg font-medium text-[#2F2F2F]">{booking._id.slice(0, 8)}</td>
                  <td className="flex items-center justify-center gap-[14px] text-lg font-normal text-[#1F2937] py-7">
                    <Image
                      src="/assets/images/booking_user.jpg"
                      alt="profile"
                      width={40}
                      height={40}
                      className="w-11 h-11 rounded-full"
                    />
                    {booking.user.name}
                  </td>
                  <td className="text-center py-7 text-lg font-normal text-[#2F2F2F]">{booking.user.email}</td>
                  <td className="text-center py-7 text-lg font-normal text-[#2F2F2F]">{booking.licensePlate}</td>
                  <td className="text-center py-7 text-lg font-medium text-[#2F2F2F] leading-[150%]">{dateObj?.wash_type?.serviceName}</td>
                  <td className="text-center py-7 text-lg font-medium text-[#2F2F2F]">{new Date(dateObj?.date).toLocaleDateString()} <br /> {dateObj?.slot}</td>
                  <td className="text-center py-7 text-lg font-medium text-[#2F2F2F]">{booking.location?.address}</td>
                  <td className="text-center py-7 text-lg font-medium text-[#2F2F2F]">${booking.price}</td>
                  <td className="text-center py-7 text-lg font-medium text-[#2F2F2F] pr-6">{booking.payment_status}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* Conditional Pagination */}
      {!isLoading && bookings.length > 0 && totalResults > limit && (
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
    </div>
  );
};

export default OneTimeWashContainer;
