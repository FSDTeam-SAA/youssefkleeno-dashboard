"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import logo from "@/public/images/logo.png";
import {
  LayoutDashboard,
  DollarSign,
  FileText,
  LogOut,
  ShoppingCart,
  Grip,
  ShoppingBasket,
  Scissors,
  // Bell,
} from "lucide-react";
import Image from "next/image";
// import logoImage from "@/public/images/logo.svg";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Product", href: "/product", icon: Grip },
  { name: "Sub Category", href: "/sub-category", icon: ShoppingBasket },
  { name: "Order", href: "/orders", icon: ShoppingCart },
  { name: "Fabric", href: "/fabric", icon: FileText },
  // { name: "Message", href: "/message", icon: MessageSquare },
  { name: "Style", href: "/style", icon: Scissors },
  {
    name: "Accents",
    href: "/accents",
    icon: DollarSign,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen sticky bottom-0 top-0 w-[280px] flex-col shadow-[0px_16px_48px_0px_#00000029] bg-[#FFFFFF] z-50">
     
      <div className="h-[80px] flex items-center justify-start mt-7 mb-16  px-4">
        <Image
          src={logo}
          alt="Company Logo"
          height={60} // Adjust height to fit navbar
          width={150} // Adjust width proportionally
          className="object-contain"
          priority // for faster loading
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-6 flex flex-col items-center justify-start  overflow-y-auto mt-3">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex w-[90%] mx-auto items-center justify-start gap-2 space-y-1 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-[#499FC01A] "
                  : " hover:bg-[#499FC01A]/20 hover:text-black"
              )}
            >
              <item.icon
                className={cn(
                  "h-6 w-6 transition-colors duration-200",
                  isActive ? "text-[#499FC0]" : ""
                )}
              />
              <span
                className={cn(
                  "font-normal text-base leading-[120%] transition-colors duration-200 text-center",
                  isActive ? "text-[#499FC0] font-medium" : ""
                )}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Logout fixed at bottom */}
      <div className="p-3">
        <div className="flex items-center gap-2 justify-start space-y-1 rounded-lg px-3 py-2 text-sm font-medium text-[#D90202] transition-all duration-200 hover:bg-[#499FC01A]/20 hover:text-black  cursor-pointer">
          <LogOut className="h-5 w-5" />
          <span className="font-normal text-base leading-[120%]">Log Out</span>
        </div>
      </div>
    </div>
  );
}
