import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import React from "react";

const MonthlySubscription = () => {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/" },
    { label: "Booking List", href: "/booking/monthly-subscription" },
    { label: "Monthly Subscription list" },
  ];
  return (
    <div>
      <Breadcrumbs title="Booking" items={breadcrumbItems} />
    </div>
  );
};

export default MonthlySubscription;
