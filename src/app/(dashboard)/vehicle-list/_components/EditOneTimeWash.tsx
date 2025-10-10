"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Vehicle {
  _id: string;
  vehicleName: string;
  washType: string;
  vehicleImage?: {
    url: string;
    public_id: string;
  };
}

export default function EditOneTimeWash() {
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleImage, setVehicleImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();

  const params = useParams();
  const id = params.id as string;
  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGJmZjg3NzIwZmZmYTNiYjA2ZjEyMDYiLCJlbWFpbCI6Im5pbG95QGV4YW1wbGUuY29tIiwiaWF0IjoxNzU5NzI5MTQ3LCJleHAiOjE3NTk4MTU1NDd9.SHo5_-R3RJczCS2A6m4HHgAsHuRvFVDB3oaAYXHkXgI"; // ⚠️ Token replace করো

  const queryClient = useQueryClient();

  // Fetch vehicle
  const { data, isLoading, error } = useQuery({
    queryKey: ["singleOntimeWash", id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/vehicle/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch vehicle data");
      return res.json();
    },
    enabled: !!id,
  });

  const vehicle: Vehicle | undefined = data?.data;

  useEffect(() => {
    if (vehicle) {
      setVehicleName(vehicle.vehicleName);
      setPreview(vehicle.vehicleImage?.url || null);
    }
  }, [vehicle]);

  // 🔹 Update mutation
  const updateMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("vehicleName", vehicleName);
      if (vehicleImage) formData.append("vehicleImage", vehicleImage);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/vehicle/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Failed to update vehicle");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Vehicle updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["singleOntimeWash", id] });
      router.push("/vehicle-list/one-time-wash")
    },
    onError: () => {
      toast.error("Failed to update vehicle. Try again.");
    },
  });

  const handleSave = () => {
    updateMutation.mutate();
  };

  if (isLoading) {
    return (
      <p className="text-center py-10 text-lg">Loading vehicle details...</p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 py-10">
        Failed to load vehicle data
      </p>
    );
  }

  return (
    <Card className="pt-8 px-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <p className="text-[#2F2F2F] font-semibold text-[24px] mb-4">
          Vehicle List
        </p>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/vehicle-list">Vehicle List</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit One-time Vehicle</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <CardContent>
        <form
          className="space-y-8 mx-auto py-10"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          {/* Vehicle Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Vehicle name</label>
            <Input
              className="py-5"
              placeholder="Enter vehicle name"
              type="text"
              value={vehicleName}
              onChange={(e) => setVehicleName(e.target.value)}
            />
          </div>

          {/* Vehicle Image */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Vehicle Image</label>
            <div
              className="w-full h-96 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer relative"
              onClick={() =>
                document.getElementById("vehicleImageInput")?.click()
              }
            >
              {preview ? (
                <Image
                  src={preview}
                  alt="Preview"
                  width={200}
                  height={200}
                  className="h-full w-full object-contain rounded-md"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <ImagePlus className="w-10 h-10" />
                  <p className="text-sm mt-1">Click to upload</p>
                </div>
              )}
              <input
                id="vehicleImageInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setVehicleImage(file);
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              type="button"
              variant="ghost"
              className="text-[#499FC0] hover:text-[#499FC0]/90"
              onClick={() => {
                setVehicleName(vehicle?.vehicleName || "");
                setVehicleImage(null);
                setPreview(vehicle?.vehicleImage?.url || null);
              }}
            >
              <X /> Cancel
            </Button>
            <Button
              type="submit"
              className="bg-btnPrimary hover:bg-btnPrimary/90"
              disabled={updateMutation.isPending} // button disable during mutation
            >
              {updateMutation.isPending ? "Saving..." : "Save"}{" "}
              {/* loading text */}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
