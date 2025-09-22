
"use client";

import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  title?: string;
}

export function Breadcrumbs({ items, title }: BreadcrumbsProps) {
  return (
    <div className="mb-4">
      {title && (
        <h2 className="text-2xl font-semibold text-[#2F2F2F] leading-[120%] mb-4">
          {title}
        </h2>
      )}
      <nav className="flex items-center gap-2 text-base font-normal text-[#666666] leading-[120%]">
        {items.map((item, index) => (
          <span key={index} className="flex items-center gap-2">
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-gray-900 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-base font-normal text-[#666666] leading-[120%]">{item.label}</span>
            )}
            {index < items.length - 1 && (
              <span className="mx-1 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="21"
                  viewBox="0 0 18 21"
                  fill="none"
                >
                  <path
                    d="M6.75 15.5L11.25 10.5L6.75 5.5"
                    stroke="#666666"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            )}
          </span>
        ))}
      </nav>
    </div>
  );
}
