"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import categoryImage from "@/public/images/product.png";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

// Dummy category data
const dummyCategories = [
  {
    id: 1,
    productName: "Westwood Shirt Men's Black",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi diam lorem, mollis eget elit eu dolor.",
    image: categoryImage,
    sku: "JY18678C179",
    category: "Blazer Outfits",
    status: "In Stock",
    price: "$250",
    added: "2023-06-08",
  },
  {
    id: 2,
    productName: "Westwood Shirt Men's Black",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi diam lorem, mollis eget elit eu dolor.",
    image: categoryImage,
    sku: "JY18678C179",
    category: "Blazer Outfits",
    status: "Out Of Stock",
    price: "$250",
    added: "2023-06-08",
  },
  {
    id: 3,
    productName: "Westwood Shirt Men's Black",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi diam lorem, mollis eget elit eu dolor.",
    image: categoryImage,
    sku: "JY18678C179",
    category: "Blazer Outfits",
    status: "In Stock",
    price: "$250",
    added: "2023-06-08",
  },
  {
    id: 4,
    productName: "Westwood Shirt Men's Black",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi diam lorem, mollis eget elit eu dolor.",
    image: categoryImage,
    sku: "JY18678C179",
    category: "Blazer Outfits",
    status: "In Stock",
    price: "$250",
    added: "2023-06-08",
  },
  {
    id: 5,
    productName: "Westwood Shirt Men's Black",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi diam lorem, mollis eget elit eu dolor.",
    image: categoryImage,
    sku: "JY18678C179",
    category: "Blazer Outfits",
    status: "In Stock",
    price: "$250",
    added: "2023-06-08",
  },
  {
    id: 6,
    productName: "Westwood Shirt Men's Black",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi diam lorem, mollis eget elit eu dolor.",
    image: categoryImage,
    sku: "JY18678C179",
    category: "Blazer Outfits",
    status: "Out Of Stock",
    price: "$250",
    added: "2023-06-08",
  },
  {
    id: 7,
    productName: "Westwood Shirt Men's Black",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi diam lorem, mollis eget elit eu dolor.",
    image: categoryImage,
    sku: "JY18678C179",
    category: "Blazer Outfits",
    status: "Out Of Stock",
    price: "$250",
    added: "2023-06-08",
  },
];

const ProductList = () => {
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(dummyCategories.length / itemsPerPage);
  const paginatedCategories = dummyCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusBadge = (status: string) => {
    const isInStock = status === "In Stock";
    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          isInStock
            ? "bg-green-100 text-green-800 border border-green-200"
            : "bg-red-100 text-red-800 border border-red-200"
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="w-full bg-white rounded-xl  border border-gray-200 overflow-hidden">
      {/* Table Container */}
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-gray-50/80 border-b border-gray-200">
              <TableHead
                className="text-left px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider"
                style={{ width: "30%" }}
              >
                Product Name
              </TableHead>
              <TableHead
                className="text-center px-4 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider"
                style={{ width: "12%" }}
              >
                SKU
              </TableHead>
              <TableHead
                className="text-center px-4 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider"
                style={{ width: "12%" }}
              >
                Category
              </TableHead>
              <TableHead
                className="text-center px-4 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider"
                style={{ width: "12%" }}
              >
                Status
              </TableHead>
              <TableHead
                className="text-center px-4 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider"
                style={{ width: "10%" }}
              >
                Price
              </TableHead>
              <TableHead
                className="text-center px-4 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider"
                style={{ width: "12%" }}
              >
                Added
              </TableHead>
              <TableHead
                className="text-center px-4 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider"
                style={{ width: "12%" }}
              >
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedCategories.map((category, index) => (
              <TableRow
                key={category.id}
                className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                }`}
              >
                {/* Product Name Column */}
                <TableCell className="px-6 py-4" style={{ width: "30%" }}>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={category.image}
                        alt={category.productName}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover border border-gray-200 shadow-sm"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm mb-1 truncate">
                        {category.productName}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* SKU Column */}
                <TableCell
                  className="text-center px-4 py-4"
                  style={{ width: "12%" }}
                >
                  <span className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded-md">
                    {category.sku}
                  </span>
                </TableCell>

                {/* Category Column */}
                <TableCell
                  className="text-center px-4 py-4"
                  style={{ width: "12%" }}
                >
                  <span className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-medium">
                    {category.category}
                  </span>
                </TableCell>

                {/* Status Column */}
                <TableCell
                  className="text-center px-4 py-4"
                  style={{ width: "12%" }}
                >
                  {getStatusBadge(category.status)}
                </TableCell>

                {/* Price Column */}
                <TableCell
                  className="text-center px-4 py-4"
                  style={{ width: "10%" }}
                >
                  <span className="text-sm font-bold text-gray-900">
                    {category.price}
                  </span>
                </TableCell>

                {/* Added Column */}
                <TableCell
                  className="text-center px-4 py-4"
                  style={{ width: "12%" }}
                >
                  <span className="text-sm text-gray-600">
                    {category.added}
                  </span>
                </TableCell>

                {/* Actions Column */}
                <TableCell
                  className="text-center px-4 py-4"
                  style={{ width: "12%" }}
                >
                  <div className="flex justify-center items-center gap-1">
                    <Link href={`/products/edit/${category.id}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-green-50 hover:text-green-600 transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Enhanced Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-3 bg-gray-50 border-t gap-2">
        <p className="text-sm text-gray-600">
          Showing {paginatedCategories.length} of {dummyCategories.length}{" "}
          results
        </p>
        <div className="flex space-x-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border-gray-300 w-10 h-10 rounded-[4px]"
          >
            &lt;
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              size="sm"
              onClick={() => handlePageChange(page)}
              variant={currentPage === page ? "default" : "outline"}
              className={
                currentPage === page
                  ? "bg-[#EF1A26] w-10 h-10 rounded-[4px] text-white"
                  : "w-10 rounded-[4px] h-10"
              }
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="border-gray-300 w-10 h-10 rounded-[4px]"
          >
            &gt;
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
