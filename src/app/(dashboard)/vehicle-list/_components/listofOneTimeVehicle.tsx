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
import { Bike, Pencil, Trash2 } from "lucide-react";
import YoussefkleenoPagination from "@/components/ui/YoussefkleenoPagination";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "sonner";
import DeleteConfirmDialog from "@/components/modal/DeleteConfirmDialog";

// 🔹 API Response Types
interface Vehicle {
  _id: string;
  vehicleName: string;
  createdAt: string;
  updatedAt: string;
  washType: string;
  vehicleImage?: {
    url: string;
    public_id: string;
  };
}

interface VehicleResponse {
  success: boolean;
  message: string;
  data: {
    vehicles: Vehicle[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const ListofOneTimeVehicle: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(
    null
  );
  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGJmZjg3NzIwZmZmYTNiYjA2ZjEyMDYiLCJlbWFpbCI6Im5pbG95QGV4YW1wbGUuY29tIiwiaWF0IjoxNzU5NzI5MTQ3LCJleHAiOjE3NTk4MTU1NDd9.SHo5_-R3RJczCS2A6m4HHgAsHuRvFVDB3oaAYXHkXgI";


  const queryClient = useQueryClient();

  // 🔹 Fetch API with type safety
  const {
    data: vehicleData,
    isLoading,
    error,
  } = useQuery<VehicleResponse>({
    queryKey: ["vehicle", currentPage],
    queryFn: async (): Promise<VehicleResponse> => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/vehicle?washType=One-time Wash&page=${currentPage}&limit=${itemsPerPage}`
      );
      if (!res.ok) throw new Error("Failed to fetch vehicles");
      return res.json();
    },
  });

  // 🔹 Delete Mutation with token
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/vehicle/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to delete vehicle");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Vehicle deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["vehicle", currentPage] });
      setOpenDialog(false);
    },
    onError: () => {
      toast.error("Failed to delete vehicle. Please try again.");
      setOpenDialog(false);
    },
  });

  const handleDeleteClick = (id: string) => {
    setSelectedVehicleId(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedVehicleId) {
      deleteMutation.mutate(selectedVehicleId);
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500 py-10">Error loading data</p>;

  const vehicles: Vehicle[] = vehicleData?.data?.vehicles || [];
  const totalItems = vehicleData?.data?.total ?? vehicles.length;
  const totalPages = totalItems > 0 ? Math.ceil(totalItems / itemsPerPage) : 1;

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#ffffff] shadow-[0px_-2px_4px_0px_#00000014]">
            <TableHead className="text-center py-5 text-[#2F2F2F] font-medium w-[150px] text-lg">
              Vehicle ID
            </TableHead>
            <TableHead className="text-center py-5 text-[#2F2F2F] font-medium w-[150px] text-lg">
              Vehicle Name
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
          {vehicles.length > 0 ? (
            vehicles.map((v) => (
              <TableRow key={v._id} className="hover:bg-muted/20">
                <TableCell className="font-medium text-center py-10 text-lg text-[#2F2F2F]">
                  {v._id}
                </TableCell>

                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Bike className="w-4 h-4 text-[#499FC0]" />
                    </div>
                    <span className="text-[#1F2937] text-lg">
                      {v.vehicleName}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="text-center text-lg font-medium text-[#2F2F2F]">
                  {new Date(v.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell>
                  <div className="flex justify-center items-center gap-3">
                    <Link href={`/vehicle-list/edit-one-time-wash/${v._id}`}>
                      <Pencil className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-blue-600" />
                    </Link>
                    <Trash2
                      onClick={() => handleDeleteClick(v._id)}
                      className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-red-600"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-10 text-lg text-gray-500"
              >
                No vehicles found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {totalItems > itemsPerPage && (
        <div className="bg-white flex items-center justify-between py-[20px] px-[50px]">
          <p className="text-xl font-normal leading-[120%] text-[#707070]">
            Showing page {currentPage} of {totalPages} — Total {totalItems}{" "}
            results
          </p>

          <YoussefkleenoPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
        </div>
      )}

      {/* Delete Dialog */}
      <DeleteConfirmDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        title="Delete Vehicle"
        description="Are you sure you want to delete this vehicle? This action cannot be undone."
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ListofOneTimeVehicle;
