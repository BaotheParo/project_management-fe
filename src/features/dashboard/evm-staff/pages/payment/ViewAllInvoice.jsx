import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CaretRightIcon,
  CaretDownIcon,
  MagnifyingGlassIcon,
  CaretLeftIcon,
} from "@phosphor-icons/react";

// NOTE: Sidebar was removed from this page because the app-level layout already renders
// the shared sidebar; keeping another local Sidebar caused duplication in the UI.

// ===================================
// 2. COMPONENT NỘI DUNG (INVOICE MANAGEMENT)
// ===================================

// Dữ liệu mẫu (Mock Data)
const invoiceData = [
  {
    id: "INV-2024-001",
    type: "Warranty",
    serviceCenter: "Tesla Service NYC",
    amount: "$2,450.00",
    date: "Mar 15, 2024",
    status: "Pending",
  },
  {
    id: "INV-2024-002",
    type: "Campaign",
    serviceCenter: "Tesla Service NYC",
    amount: "$1,890.00",
    date: "Mar 14, 2024",
    status: "Confirmed",
  },
  {
    id: "INV-2024-003",
    type: "Warranty",
    serviceCenter: "Tesla Service NYC",
    amount: "$3,200.00",
    date: "Mar 13, 2024",
    status: "Paid",
  },
  {
    id: "INV-2024-004",
    type: "Campaign",
    serviceCenter: "Tesla Service NYC",
    amount: "$850.00",
    date: "Mar 12, 2024",
    status: "Pending",
  },
];

// Hàm lấy màu cho Status Badge
const getStatusClasses = (status) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Confirmed":
      return "bg-green-100 text-green-700";
    case "Paid":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const InvoiceManagement = () => {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/evm-staff/payment/confirm/${id}`);
  };

  const handleBack = () => {
    navigate("/evm-staff/payment");
  };

  return (
    // Container chính cho nội dung
    <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
      {/* 1. Header & Breadcrumbs */}
      <div className="flex justify-between items-center mb-4">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500">
          <span className="cursor-pointer hover:text-gray-700">Payment</span>
          <CaretRightIcon size={12} className="mx-1" />
          <span className="cursor-pointer hover:text-gray-700">Overview</span>
          <CaretRightIcon size={12} className="mx-1" />
          <span className="font-medium text-gray-800">Invoices</span>
        </div>

        {/* Date Selector */}
        <div className="relative">
          <select className="appearance-none border border-gray-300 rounded-md py-2 px-3 pr-8 text-sm font-medium text-gray-700 bg-white cursor-pointer">
            <option>September 2025</option>
            <option>August 2025</option>
          </select>
          <CaretDownIcon
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          />
        </div>
      </div>

      {/* 2. Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Payment Management - Invoices
      </h1>

      {/* 3. Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {/* Các Dropdown Filters */}
        {["Month", "Type", "Status", "Service Center"].map((label) => (
          <div key={label}>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              {label}
            </label>
            <select className="w-full appearance-none border border-gray-300 rounded-md py-2 px-3 pr-8 text-sm text-gray-700 bg-white">
              <option>All {label === "Month" ? "Months" : "Types"}</option>
            </select>
          </div>
        ))}

        {/* Search Bar */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Search
          </label>
          <div className="relative">
            <MagnifyingGlassIcon
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search Invoices..."
              className="w-full border border-gray-300 rounded-md py-2 pl-9 pr-3 text-sm"
            />
          </div>
        </div>
      </div>

      {/* 4. Table Area */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            {/* Table Header */}
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left w-12">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                {[
                  "Invoice ID",
                  "Type",
                  "Service Center",
                  "Total Amount",
                  "Date Submitted",
                  "Status",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="bg-white divide-y divide-gray-200">
              {invoiceData.map((item) => {
                const statusClasses = getStatusClasses(item.status);
                return (
                  <tr key={item.id}>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 cursor-pointer hover:underline">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {item.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {item.serviceCenter}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                      <button
                        onClick={() => handleView(item.id)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        Confirm
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Table Footer: Bulk Action & Pagination */}
      <div className="flex justify-between items-center mt-4">
        {/* Bulk Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-transparent border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-400"
          >
            Back
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-indigo-700">
            Bulk Confirm
          </button>
        </div>

        {/* Pagination */}
        <div className="flex items-center">
          <span className="text-sm text-gray-600 mr-4">
            Showing 1 to 4 of 24 results
          </span>
          <nav className="flex items-center space-x-1">
            <button className="p-2 rounded-md hover:bg-gray-100 text-gray-400">
              <CaretLeftIcon size={16} />
            </button>
            <button className="px-3 py-1 rounded-md bg-indigo-600 text-white text-sm font-medium">
              1
            </button>
            <button className="px-3 py-1 rounded-md hover:bg-gray-100 text-gray-600 text-sm">
              2
            </button>
            <button className="px-3 py-1 rounded-md hover:bg-gray-100 text-gray-600 text-sm">
              3
            </button>
            <button className="p-2 rounded-md hover:bg-gray-100 text-gray-600">
              <CaretRightIcon size={16} />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

// ===================================
// 3. COMPONENT LAYOUT CHÍNH (PAGE)
// =Sẽ kết hợp Sidebar và Nội dung
// ===================================

const ViewAllInvoice = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <InvoiceManagement />
    </div>
  );
};

// Export component chính của trang
export default ViewAllInvoice;
