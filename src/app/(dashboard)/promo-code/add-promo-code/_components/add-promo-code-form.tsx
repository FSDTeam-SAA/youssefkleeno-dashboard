"use client";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

const AddPromoCodeForm = () => {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/" },
    { label: "Promo Code List", href: "/promo-code" },
    { label: "Add Promo Code" }
  ];
  return (
    <div className="py-[30px] shadow-[0px_4px_5px_0px_#0000001A] bg-white rounded-[16px] border-t mb-10">
      {/* breadcrumb and button here */}
      <div className="flex items-center justify-between px-6">
        <Breadcrumbs title="Add Promo Code" items={breadcrumbItems} />
      </div>
    </div>
  );
};

export default AddPromoCodeForm;
