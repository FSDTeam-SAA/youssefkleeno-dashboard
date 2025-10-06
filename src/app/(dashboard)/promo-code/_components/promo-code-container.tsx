"use client";
import DeleteModal from "@/components/DeleteModal";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import YoussefkleenoPagination from "@/components/ui/YoussefkleenoPagination";
import { useDeletePromocode, useGetPromocode } from "@/hooks/ApiClling";
import { Plus, SquarePen, Trash } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
const PromoCodeContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [id, setId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...."; // demo token

  const promocode = useGetPromocode(token);
  const deletePromocode = useDeletePromocode(token, id);
  const promoCodeData = promocode.data?.data || [];
  const totalResults = promoCodeData.length;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalResults / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = promocode && promoCodeData?.slice(startIndex, endIndex);

  const breadcrumbItems = [
    { label: "Dashboard", href: "/" },
    { label: "Promo Code List" },
  ];

  // ✅ handle delete confirm
  const handleDeleteConfirm = async () => {
    await deletePromocode.mutateAsync();
  };

  return (
    <div className="py-[30px] shadow-[0px_4px_5px_0px_#0000001A] bg-white rounded-[16px] border-t mb-10">
      {/* breadcrumb and button */}
      <div className="flex flex-col items-start gap-4  px-6">
        <Breadcrumbs title="Promo Code List" items={breadcrumbItems} />
        <div>
          <Link href={"/promo-code/add-promo-code"}>
            <button className="flex items-center gap-1 bg-[#499FC0] py-[10px] px-[15px] rounded-[4px]">
              <Plus className="w-5 h-5 text-white" />
              <span className="text-lg font-think text-white leading-[120%]">
                Add Code
              </span>
            </button>
          </Link>
        </div>
      </div>

      {/* promo code table */}
      <table className="w-full rounded-[6px] mt-10">
        <thead className="bg-[#FAFAFA] ">
          <tr>
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
          {paginatedData.map((item) => (
            <tr key={item?._id} className="border border-[#0000000D]">
              <td className="text-lg font-medium text-[#2F2F2F] text-center py-7 pl-6">
                {item?.code}
              </td>
              <td className="text-lg font-normal text-[#2F2F2F] text-center py-7">
                {item?.discountPrice}
              </td>
              <td className="text-lg font-medium text-[#2F2F2F] text-center py-7">
                {item?.startDate}
              </td>
              <td className="text-lg font-medium text-[#2F2F2F] text-center py-7">
                {item?.expiryDate}
              </td>
              <td className="text-lg font-medium text-[#2F2F2F] text-center py-7">
                <button
                  className={`w-[150px] text-lg font-medium py-[7px] px-8 rounded-[29px] text-white ${
                    item?.status === "active" ? "bg-[#039A06]" : "bg-[#FACC15]"
                  }`}
                >
                  {item?.status}
                </button>
              </td>
              <td className="py-7 pr-6">
                <div className="flex items-center justify-center gap-6">
                  <Link href={`/promo-code/${item?._id}`}>
                    <button>
                      <SquarePen />
                    </button>
                  </Link>
                  <button
                    onClick={() => {
                      setId(item?._id);
                      setIsModalOpen(true);
                    }}
                  >
                    <Trash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* pagination */}
      {totalResults > itemsPerPage && (
        <div className="bg-white flex items-center justify-between py-[20px] px-[50px]">
          <p className="text-xl font-normal text-[#707070]">
            Showing {startIndex + 1} to{" "}
            {endIndex > totalResults ? totalResults : endIndex} of {totalResults} results
          </p>
          <YoussefkleenoPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}

      {/* ✅ Delete Modal */}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Promo Code"
        description="Are you sure you want to delete this promo code? This action cannot be undone."
      />
    </div>
  );
};

export default PromoCodeContainer;
