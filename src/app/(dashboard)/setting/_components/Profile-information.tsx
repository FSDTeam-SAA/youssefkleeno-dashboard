
"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useProfileInfoUpdate, useProfileQuery } from "@/hooks/ApiClling";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileUpdatePayload } from "@/lib/profileInfo";
import { Loader2 } from "lucide-react";

export function PersonalInformation() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGJmZjg3NzIwZmZmYTNiYjA2ZjEyMDYiLCJlbWFpbCI6Im5pbG95QGV4YW1wbGUuY29tIiwiaWF0IjoxNzU5Mzk3OTI1LCJleHAiOjE3NTk0ODQzMjV9.sLl3FujxPqzpHsnClunVYreoCFhjdl08nrnh1uVCf0s";
  const { data } = useProfileQuery(token);
  const profile = data?.data;
  const profileMutation = useProfileInfoUpdate(token);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Populate form when profile data is available
  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.name ?? "",
        email: profile.email ?? "",
        phone: profile.phone ?? "",
        dateOfBirth: profile.dob ?? "",
        streetAddress: profile.street ?? "",
        city: profile.city ?? "",
        state: profile.state ?? "",
        zipCode: profile.zip ?? "",
      });
      setPreviewUrl(profile?.avatar?.url || null);
    }
  }, [profile]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    const payload: ProfileUpdatePayload = {
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      dob: formData.dateOfBirth,
      street: formData.streetAddress,
      city: formData.city,
      state: formData.state,
      zip: formData.zipCode,
      avatar: selectedImage || undefined,
    };

    profileMutation.mutate(payload);
  };

  return (
    <Card className="!border-none">
      {/* Breadcrumb */}
      <Breadcrumb className="p-5">
        <p className="text-[#2F2F2F] font-semibold text-[24px] mb-4">
          Personal Information
        </p>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Overview</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header with avatar */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 !bg-white rounded-tl-[8px] rounded-tr-[8px] !shadow-none">
        <CardTitle className="text-[18px] font-semibold text-[#282828] flex items-center gap-4">
          <div className="relative">
            <Avatar
              className="w-24 h-24 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <AvatarImage src={previewUrl || ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </div>
          <div>
            <div>
              <span className="text-[#2F2F2F] font-semibold text-[18px]">
                {formData.fullName}
              </span>
            </div>
            <div>
              <span className="text-[#2F2F2F] font-semibold text-[14px]">
                {formData.email}
              </span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      {/* Form */}
      <CardContent className="space-y-6 bg-white pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-normal text-[#499FC0]">
              Full Name
            </Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className="border border-[#0000004D] rounded-[8px] h-[50px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-normal text-[#499FC0]">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              disabled
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="border border-[#0000004D] rounded-[8px] h-[50px]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-normal text-[#499FC0]">
              Phone Number
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="border border-[#0000004D] rounded-[8px] h-[50px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth" className="text-sm font-normal text-[#499FC0]">
              Date of Birth
            </Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              className="border border-[#0000004D] rounded-[8px] h-[50px]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="streetAddress" className="text-sm font-normal text-[#499FC0]">
            Street Address
          </Label>
          <Input
            id="streetAddress"
            value={formData.streetAddress}
            onChange={(e) => handleInputChange("streetAddress", e.target.value)}
            className="border border-[#0000004D] rounded-[8px] h-[50px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="city" className="text-sm font-normal text-[#499FC0]">
              City
            </Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              className="border border-[#0000004D] rounded-[8px] h-[50px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state" className="text-sm font-normal text-[#499FC0]">
              State
            </Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
              className="border border-[#0000004D] rounded-[8px] h-[50px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode" className="text-sm font-normal text-[#499FC0]">
              ZIP Code
            </Label>
            <Input
              id="zipCode"
              value={formData.zipCode}
              onChange={(e) => handleInputChange("zipCode", e.target.value)}
              className="border border-[#0000004D] rounded-[8px] h-[50px]"
            />
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <Button
            onClick={handleSave}
            className="bg-[#499FC0] hover:bg-[#499FC0]/90"
          >
            Update now {profileMutation.isPending && <Loader2 className="mr-2 spin-in animate-spin" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
