"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import YoussefkleenoPagination from "@/components/ui/YoussefkleenoPagination";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { toast } from "sonner";
import DeleteConfirmDialog from "@/components/modal/DeleteConfirmDialog";
import Link from "next/link";

interface Service {
  _id: string;
  serviceName: string;
  price: number;
  washType: string;
  createdAt: string;
  serviceImage?: {
    url: string;
    public_id: string;
  };
}

interface ServiceResponse {
  success: boolean;
  message: string;
  data: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    services: Service[];
  };
}

const itemsPerPage = 5;

const ListOfOneTimeServices = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null
  );

  const queryClient = useQueryClient();
  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGJmZjg3NzIwZmZmYTNiYjA2ZjEyMDYiLCJlbWFpbCI6Im5pbG95QGV4YW1wbGUuY29tIiwiaWF0IjoxNzU5NzI5MTQ3LCJleHAiOjE3NTk4MTU1NDd9.SHo5_-R3RJczCS2A6m4HHgAsHuRvFVDB3oaAYXHkXgI";

  const { data, isLoading, error } = useQuery<ServiceResponse>({
    queryKey: ["oneTimeServices", currentPage],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/service?washType=One-time Wash&page=${currentPage}&limit=${itemsPerPage}`
      );
      if (!res.ok) throw new Error("Failed to fetch services");
      return res.json();
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/service/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to delete service");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Service deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["oneTimeServices", currentPage],
      });
      setOpenDialog(false);
    },
    onError: () => {
      toast.error("Failed to delete service");
    },
  });

  const handleDeleteClick = (id: string) => {
    setSelectedServiceId(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedServiceId) {
      deleteMutation.mutate(selectedServiceId);
    }
  };

  if (isLoading)
    return <p className="text-center py-10 text-lg">Loading services...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 py-10">Failed to load services</p>
    );

  const services = data?.data.services || [];
  const totalPages = data?.data.totalPages || 1;
  const totalItems = data?.data.total || 0;

  return (
    <div className="w-full overflow-x-auto">
      <Table className="">
        <TableHeader>
          <TableRow className="bg-[#f1efef]">
            <TableHead className="text-center py-5 text-[#2F2F2F] font-medium w-[150px] text-lg">
              Service ID
            </TableHead>
            <TableHead className="text-center py-5 text-[#2F2F2F] font-medium w-[150px] text-lg">
              Service Name
            </TableHead>
            <TableHead className="text-center py-5 text-[#2F2F2F] font-medium w-[150px] text-lg">
              Price ($)
            </TableHead>
            <TableHead className="text-center py-5 text-[#2F2F2F] font-medium w-[150px] text-lg">
              Add Date
            </TableHead>
            <TableHead className="text-center py-5 text-[#2F2F2F] font-medium w-[150px] text-lg">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {services.map((service) => (
            <TableRow key={service._id} className="hover:bg-muted/20">
              <TableCell className="font-medium text-center py-10 text-lg text-[#2F2F2F]">
                {service._id}
              </TableCell>

              <TableCell>
                <div className="flex items-center justify-center gap-2 ">
                  {service.serviceImage?.url && (
                    <Image
                      src={service.serviceImage.url}
                      alt={service.serviceName}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  )}
                  <span className="text-[#1F2937] text-lg">
                    {service.serviceName}
                  </span>
                </div>
              </TableCell>

              <TableCell className="text-center text-lg font-medium text-[#2F2F2F]">
                ${service.price}
              </TableCell>

              <TableCell className="text-center text-lg font-medium text-[#2F2F2F]">
                {new Date(service.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell>
                <div className="flex justify-center items-center gap-3">
                  <Link href={`/services/edit-oneTime-wash/${service._id}`}><Pencil className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-blue-600" /></Link>
                  <Trash2
                    className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-red-600"
                    onClick={() => handleDeleteClick(service._id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="">
        <div className="bg-white flex items-center justify-between py-[20px] px-[50px]">
          <p className="text-xl font-normal leading-[120%] text-[#707070]">
            Showing page {currentPage} of {totalPages} ({totalItems} results)
          </p>

          <div>
            <YoussefkleenoPagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>

      {/* Delete Dialog */}
      <DeleteConfirmDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        title="Delete Service"
        description="Are you sure you want to delete this service? This action cannot be undone."
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ListOfOneTimeServices;
