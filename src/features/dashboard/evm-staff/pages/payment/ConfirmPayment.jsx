import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CaretRightIcon,
  ClockIcon,
  FilePdfIcon,
  ImageIcon,
  ArrowLeftIcon,
  CheckIcon,
} from "@phosphor-icons/react";

// ===================================
// DỮ LIỆU MẪU (MOCK DATA)
// ===================================

const invoiceId = "INV-2025-09-001";

const summaryData = {
  invoiceId: invoiceId,
  createdDate: "September 15, 2025",
  serviceCenter: "AutoTech Service Center",
  totalAmount: "$2,450.00",
  invoiceType: "Warranty",
  paymentPeriod: "September 2025",
};

const operationDetails = [
  {
    no: 1,
    code: "OP-001-BAT",
    vin: "1HGBH41JXMN109186",
    description: "Battery Pack Replacement",
    qty: 1,
    unitPrice: "$1,800.00",
    laborCost: "$350.00",
    total: "$2,150.00",
  },
  {
    no: 2,
    code: "OP-002-CHG",
    vin: "1HGBH41JXMN109186",
    description: "Charging Port Repair",
    qty: 1,
    unitPrice: "$200.00",
    laborCost: "$100.00",
    total: "$300.00",
  },
];

const totals = {
  parts: "$2,000.00", // Lưu ý: Dữ liệu này từ ảnh, không khớp 100% với cộng dồn các dòng
  labor: "$450.00",
  grandTotal: "$2,450.00",
};

const documents = [
  { name: "invoice_receipt.pdf", size: "2.2 MB", type: "pdf" },
  { name: "service_photo_1.jpg", size: "1.5 MB", type: "image" },
  { name: "service_photo_2.jpg", size: "2.1 MB", type: "image" },
];

// Helper component cho icon tài liệu
const DocumentIcon = ({ type }) => {
  if (type === "pdf") {
    return <FilePdfIcon size={48} className="text-red-500" />;
  }
  return <ImageIcon size={48} className="text-gray-400" />;
};

// ===================================
// COMPONENT CHÍNH
// ===================================

const InvoiceConfirmationPage = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* 1. Header: Title, Breadcrumbs, Status */}
        <div className="flex justify-between items-center mb-4">
          <div>
            {/* Breadcrumbs */}
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <span className="hover:text-gray-700 cursor-pointer">Home</span>
              <CaretRightIcon size={12} className="mx-1.5" />
              <span className="hover:text-gray-700 cursor-pointer">
                Payment
              </span>
              <CaretRightIcon size={12} className="mx-1.5" />
              <span className="hover:text-gray-700 cursor-pointer">
                Invoices
              </span>
              <CaretRightIcon size={12} className="mx-1.5" />
              <span className="font-medium text-gray-700">{invoiceId}</span>
            </div>
            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900">
              Invoice Detail - Confirm Payment
            </h1>
          </div>

          {/* Status Badge */}
          <div className="flex items-center bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1.5 rounded-full">
            <ClockIcon size={16} weight="fill" className="mr-1.5" />
            Pending
          </div>
        </div>

        {/* 2. Invoice Summary Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Invoice Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8">
            {/* Cột 1 */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Invoice ID
                </label>
                <p className="text-base font-semibold text-gray-900 mt-1">
                  {summaryData.invoiceId}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Created Date
                </label>
                <p className="text-base font-semibold text-gray-900 mt-1">
                  {summaryData.createdDate}
                </p>
              </div>
            </div>
            {/* Cột 2 */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Service Center Name
                </label>
                <p className="text-base font-semibold text-gray-900 mt-1">
                  {summaryData.serviceCenter}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Total Amount
                </label>
                <p className="text-2xl font-bold text-blue-600 mt-1">
                  {summaryData.totalAmount}
                </p>
              </div>
            </div>
            {/* Cột 3 */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Invoice Type
                </label>
                <p className="text-base font-semibold text-gray-900 mt-1">
                  {summaryData.invoiceType}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Payment Period
                </label>
                <p className="text-base font-semibold text-gray-900 mt-1">
                  {summaryData.paymentPeriod}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Operation Details Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-6">
          <h2 className="text-lg font-semibold text-gray-800 p-6 border-b border-gray-200">
            Operation Details
          </h2>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {[
                    "No.",
                    "Operation Code",
                    "Vehicle VIN",
                    "Part Description",
                    "Qty",
                    "Unit Price",
                    "Labor Cost",
                    "Total",
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
              <tbody className="bg-white divide-y divide-gray-200">
                {operationDetails.map((item) => (
                  <tr key={item.no}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {item.no}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {item.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {item.vin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {item.qty}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {item.unitPrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {item.laborCost}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer - Totals */}
          <div className="p-6 bg-gray-50 rounded-b-lg">
            <div className="max-w-xs ml-auto space-y-2">
              <div className="flex justify-between text-sm text-gray-700">
                <span>Total Parts Cost:</span>
                <span className="font-medium text-gray-900">
                  {totals.parts}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Total Labor Cost:</span>
                <span className="font-medium text-gray-900">
                  {totals.labor}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                <span>Grand Total:</span>
                <span className="text-blue-600">{totals.grandTotal}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Supporting Documents Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-6 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Supporting Documents
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {documents.map((doc) => (
              <div key={doc.name} className="cursor-pointer group">
                <div className="relative w-full h-32 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <DocumentIcon type={doc.type} />
                </div>
                <p className="text-sm font-medium text-gray-700 mt-2 truncate group-hover:text-blue-600">
                  {doc.name}
                </p>
                <p className="text-xs text-gray-500">{doc.size}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Footer Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          {/* Back Button */}
          <button
            onClick={() => navigate("/evm-staff/payment/invoices")}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-200 hover:border-gray-400 hover:rounded-full transition-colors"
          >
            <ArrowLeftIcon size={16} className="mr-1.5" />
            Back to all invoices
          </button>

          {/* Confirm Button */}
          <button className="flex items-center bg-indigo-600 text-white px-5 py-2.5 rounded-lg shadow-sm hover:bg-indigo-700 transition-colors font-medium">
            <CheckIcon size={16} className="mr-1.5" />
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceConfirmationPage;
