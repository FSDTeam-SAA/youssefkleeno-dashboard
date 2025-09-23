"use client";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Plus } from "lucide-react";

const CancellationPolicyContainer = () => {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/" },
    { label: "Cancellation Policy" },
  ];

  return (
    <div className="py-[30px] shadow-[0px_4px_5px_0px_#0000001A] bg-white rounded-[16px] border-t mb-10">
      {/* breadcrumb and button here */}
      <div className="flex flex-col gap-8 px-6">
        <Breadcrumbs title="Cancellation Policy" items={breadcrumbItems} />
        <div>
            <button className="flex items-center gap-2 text-base font-normal leading-[120%] text-white py-[11px] px-[17px] rounded-[6px] bg-[#499FC0] "><Plus /> Add Policy</button>
        </div>
      </div>

      {/* data  */}
      <div className="px-6 pt-10">
        <p className=" text-xl font-normal text-black leading-[120%]">Our cancellation policy is as follows:</p>
        <ul className="list-disc list-inside pt-6">
            <li className="text-xl font-normal text-black leading-[120%]">More than 24 hours before: Full refund</li>
            <li className="text-xl font-normal text-black leading-[120%] py-4">12-24 hours before: 75% refund</li>
            <li className="text-xl font-normal text-black leading-[120%]">4-12 hours before: 50% refund</li>
            <li className="text-xl font-normal text-black leading-[120%] py-4">2-4 hours before: 25% refund</li>
            <li className="text-xl font-normal text-black leading-[120%]">Less than 2 hours before: No refund</li>
        </ul>
      </div>
    </div>
  );
};

export default CancellationPolicyContainer;
