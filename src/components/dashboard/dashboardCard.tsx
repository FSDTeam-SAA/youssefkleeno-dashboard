"use client";

import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import cardImage1 from "@/public/images/cardImage1.png";
import cardImage2 from "@/public/images/cardImage2.png";
import cardImage3 from "@/public/images/cardImage3.png";
import cardImage4 from "@/public/images/cardImage4.png";

// ✅ Define prop types for better safety
type DashboardData = {
  revenue?: number;
  totalUsers?: number;
  subscriptionUsers?: number;
  oneTimeUsers?: number;
};

interface DashboardCardProps {
  data?: DashboardData | null;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ data }) => {
  return (
    <div className="pt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Revenue */}
        <Card className="py-4">
          <CardContent className="flex justify-between items-center h-full">
            <div>
              <p className="text-gray-600">Revenue</p>
              <p className="text-2xl font-bold">
                ${data?.revenue?.toLocaleString() ?? "0"}
              </p>
            </div>
            <Image
              src={cardImage1}
              alt="revenue"
              width={148}
              height={100}
              priority
            />
          </CardContent>
        </Card>

        {/* Total Users */}
        <Card className="py-4">
          <CardContent className="flex justify-between items-center h-full">
            <div>
              <p className="text-gray-600">Total Users</p>
              <p className="text-2xl font-bold">{data?.totalUsers ?? 0}</p>
            </div>
            <Image
              src={cardImage2}
              alt="total users"
              width={148}
              height={100}
              priority
            />
          </CardContent>
        </Card>

        {/* Subscription Users */}
        <Card className="py-4">
          <CardContent className="flex justify-between items-center h-full">
            <div>
              <p className="text-gray-600">Subscription Users</p>
              <p className="text-2xl font-bold">
                {data?.subscriptionUsers ?? 0}
              </p>
            </div>
            <Image
              src={cardImage3}
              alt="subscription users"
              width={148}
              height={100}
              priority
            />
          </CardContent>
        </Card>

        {/* One-Time Users */}
        <Card className="py-4">
          <CardContent className="flex justify-between items-center h-full">
            <div>
              <p className="text-gray-600">One-Time Users</p>
              <p className="text-2xl font-bold">{data?.oneTimeUsers ?? 0}</p>
            </div>
            <Image
              src={cardImage4}
              alt="one-time users"
              width={148}
              height={100}
              priority
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardCard;
