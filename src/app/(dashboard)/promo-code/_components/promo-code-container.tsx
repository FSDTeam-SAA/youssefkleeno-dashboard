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
  const [limit] = useState(10);
  const [id, setId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....";
  const { data: promoResponse, isLoading } = useGetPromocode(token, currentPage, limit);
  const deletePromocode = useDeletePromocode(token, id);

  const promoData = promoResponse?.data?.promoCodes || [];
  const total = promoResponse?.data?.total || 0;
  const page = promoResponse?.data?.page || 1;
  const totalPages = promoResponse?.data?.totalPages || 1;

  const breadcrumbItems = [
    { label: "Dashboard", href: "/" },
    { label: "Promo Code List" },
  ];

  const handleDeleteConfirm = async () => {
    await deletePromocode.mutateAsync();
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20 text-gray-500 text-lg">
        Loading promo codes...
      </div>
    );
  }

  return (
    <div className="py-[30px] shadow-[0px_4px_5px_0px_#0000001A] bg-white rounded-[16px] border-t mb-10">

      <div className="flex flex-col items-start gap-4 px-6">
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

      <table className="w-full rounded-[6px] mt-10">
        <thead className="bg-[#FAFAFA]">
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
          {promoData.length > 0 ? (
            promoData.map((item) => (
              <tr key={item._id} className="border border-[#0000000D]">
                <td className="text-lg font-medium text-[#2F2F2F] text-center py-7 pl-6">
                  {item.code}
                </td>
                <td className="text-lg font-normal text-[#2F2F2F] text-center py-7">
                  {item.discountPrice}
                </td>
                <td className="text-lg font-medium text-[#2F2F2F] text-center py-7">
                  {new Date(item.startDate).toLocaleDateString()}
                </td>
                <td className="text-lg font-medium text-[#2F2F2F] text-center py-7">
                  {new Date(item.expiryDate).toLocaleDateString()}
                </td>
                <td className="text-lg font-medium text-[#2F2F2F] text-center py-7">
                  <button
                    className={`w-[150px] text-lg font-medium py-[7px] px-8 rounded-[29px] text-white ${item.status === "active"
                      ? "bg-[#039A06]"
                      : item.status === "inactive"
                        ? "bg-[#FACC15]"
                        : "bg-gray-400"
                      }`}
                  >
                    {item.status}
                  </button>
                </td>
                <td className="py-7 pr-6">
                  <div className="flex items-center justify-center gap-6">
                    <Link href={`/promo-code/${item._id}`}>
                      <button>
                        <SquarePen />
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        setId(item._id);
                        setIsModalOpen(true);
                      }}
                    >
                      <Trash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="text-center py-10 text-gray-500 text-lg"
              >
                No promo codes found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="bg-white border-t flex items-center justify-between py-[20px] px-[50px]">
          <p className="text-xl font-normal text-[#707070]">
            Showing page {page} of {totalPages}, total {total} results
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
