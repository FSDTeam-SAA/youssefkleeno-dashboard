"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Car,
  Plus,
  Calendar,
  Tag,
  Users,
  Clock,
  XCircle,
  List,
  Settings,
  ChevronDown,
  ChevronRight,
} from "lucide-react"

interface SubItem {
  name: string
  href: string
}

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  {
    name: "Vehicle List",
    href: "/vehicle-list",
    icon: Car,
    subItems: [
      { name: "Monthly Subscription", href: "/vehicle-list/monthly-subscription" },
      { name: "One-time Wash", href: "/vehicle-list/onetime" },
    ],
  },
  { name: "Add Services", href: "/add-services", icon: Plus },
  {
    name: "Booking",
    href: "/booking",
    icon: Calendar,
    subItems: [
      { name: "Monthly Subscription", href: "/booking/monthly-subscription" },
      { name: "One-time Wash", href: "/booking/one-time-wash" },
    ],
  },
  { name: "Promo Code", href: "/promo-code", icon: Tag },
  {
    name: "User Management",
    href: "/user-management",
    icon: Users,
    subItems: [
      { name: "All Users", href: "/user-management/all" },
      { name: "Premium Users", href: "/user-management/premium" },
    ],
  },
  { name: "Time Schedule", href: "/time-schedule", icon: Clock },
  { name: "Cancellation Policy", href: "/cancellation-policy", icon: XCircle },
  { name: "Cancelled list", href: "/cancelled-list", icon: List },
  { name: "Settings", href: "/setting", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([])

  const toggleDropdown = (itemName: string) => {
    setOpenDropdowns((prev) =>
      prev.includes(itemName) ? [] : [itemName]
    )
  }

  const isSubItemActive = (subItems: SubItem[]) => {
    return subItems.some((subItem) => pathname === subItem.href)
  }

  return (
    <div className="flex h-screen sticky bottom-0 top-0 w-[320px] flex-col shadow-[0px_16px_48px_0px_#00000029] bg-[#FFFFFF] z-50">
      <div className="h-[80px] flex items-center justify-center mt-7 mb-8 px-4">
        <div className="flex items-center gap-2">
          <Car className="h-8 w-8 text-[#499FC0]" />
          <span className="text-xl font-semibold text-[#499FC0]">CarWash</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 flex flex-col items-center justify-start overflow-y-auto px-3">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href)) ||
            (item.subItems && isSubItemActive(item.subItems))

          const isDropdownOpen = openDropdowns.includes(item.name)
          const hasSubItems = item.subItems && item.subItems.length > 0

          return (
            <div key={item.name} className="w-full">
              {hasSubItems ? (
                // Dropdown parent (no Link, only toggle)
                <div
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 cursor-pointer",
                    isActive || isDropdownOpen
                      ? "bg-[#E8F4F8]"
                      : "hover:bg-[#499FC01A]/20 hover:text-black",
                  )}
                  onClick={() => toggleDropdown(item.name)}
                >
                  <div className="flex items-center gap-3">
                    <item.icon
                      className={cn(
                        "h-5 w-5 transition-colors duration-200",
                        isActive || isDropdownOpen ? "text-[#499FC0]" : "text-gray-600",
                      )}
                    />
                    <span
                      className={cn(
                        "font-normal text-sm transition-colors duration-200",
                        isActive || isDropdownOpen ? "text-[#499FC0] font-medium" : "text-gray-700",
                      )}
                    >
                      {item.name}
                    </span>
                  </div>
                  <div className="ml-auto">
                    {isDropdownOpen ? (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </div>
              ) : (
                // Normal item with Link
                <Link
                  href={item.href}
                  className={cn(
                    "flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-[#E8F4F8] text-[#499FC0] font-medium"
                      : "text-gray-700 hover:bg-[#499FC01A]/20 hover:text-black",
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 mr-3",
                      isActive ? "text-[#499FC0]" : "text-gray-600",
                    )}
                  />
                  {item.name}
                </Link>
              )}

              {/* Sub Items */}
              {hasSubItems && isDropdownOpen && (
                <div className="ml-6 mt-1 space-y-1 border-l-2 border-[#2F2F2F] pl-4">
                  {item.subItems.map((subItem) => {
                    const isSubActive = pathname === subItem.href
                    return (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className={cn(
                          "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all duration-200",
                          isSubActive
                            ? "bg-[#E8F4F8] text-[#499FC0] font-medium"
                            : "text-gray-600 hover:bg-[#499FC01A]/20 hover:text-black",
                        )}
                      >
                        <span className="text-xs">•</span>
                        <span className="text-[14px] text-[#8D8D8D] font-medium">{subItem.name}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
}
