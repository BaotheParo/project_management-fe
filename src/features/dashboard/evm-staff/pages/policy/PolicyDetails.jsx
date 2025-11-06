import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeftIcon, // Icon "Back to Policies"
  PencilSimpleIcon, // Icon "Edit Policy"
  TrashIcon, // Icon "Delete Policy"
  CaretDownIcon, // Icon cho dropdowns
  CubeIcon, // Icon "Part Name"
  CalendarCheckIcon, // Icon "Expiry Date"
} from "@phosphor-icons/react";

// ===================================
// HELPER COMPONENTS (để code chính gọn gàng hơn)
// ===================================

// Component cho các trường chỉ đọc (màu xám) trong thẻ "Dates & References"
const ReadOnlyField = ({ label, value }) => (
  <div>
    <label className="block text-xs font-medium text-gray-500">{label}</label>
    <div className="mt-1 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
      {value}
    </div>
  </div>
);

// Component cho các cặp thông tin (Label + Value) trong thẻ "Basic Information"
const InfoPair = ({ label, value }) => (
  <div>
    <label className="block text-xs font-medium text-gray-500">{label}</label>
    <p className="mt-1 text-sm font-medium text-gray-900">{value}</p>
  </div>
);

// Component Dropdown (cho "All Part Types", "All Status")
const FilterDropdown = ({ label }) => (
  <div className="relative">
    <select className="appearance-none border border-gray-300 rounded-md py-2 px-3 pr-8 text-sm font-medium text-gray-700 bg-white cursor-pointer hover:border-gray-400">
      <option>{label}</option>
    </select>
    <CaretDownIcon
      size={14}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
    />
  </div>
);

// Component Warranty Timeline (từ yêu cầu trước của bạn)
const WarrantyTimeline = () => {
  const progressPercent = 80; // Đặt 80% để giống hệt ảnh

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Warranty Timeline
      </h2>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">
          Warranty Progress
        </span>
        <span className="text-sm font-medium text-gray-600">
          8 months remaining
        </span>
      </div>
      <div className="relative pt-8 mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <div
          className="absolute flex flex-col items-center"
          style={{
            left: `${progressPercent}%`,
            top: "24px",
            transform: "translateX(-50%)",
          }}
        >
          <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow"></div>
          <span className="text-xs text-gray-600 mt-2 whitespace-nowrap">
            Current: Oct 4, 2024
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>Jan 15, 2024</span>
        <span>Jan 15, 2026</span>
      </div>
    </div>
  );
};

// ===================================
// COMPONENT TRANG CHÍNH
// ===================================
const PolicyDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. TOP HEADER (Thanh trắng "EV Warranty...") */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-xl font-semibold text-gray-900">
            EV Warranty Management System
          </h1>
        </div>
      </header>

      {/* 2. MAIN CONTENT AREA (Nền xám) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 2a. Page Toolbar (Back, Title, Buttons) */}
        <div className="flex justify-between items-center mb-4">
          {/* Left side: Back link, Title, Status */}
          <div className="flex items-center space-x-3">
            <button
              className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full p-2"
              onClick={() => navigate("/evm-staff/policy")}
            >
              <ArrowLeftIcon size={16} className="mr-1.5" />
              Back to Policies
            </button>
            <span className="text-gray-300">|</span>
            <h2 className="text-2xl font-bold text-gray-900">Policy Details</h2>
            <span className="px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">
              Active
            </span>
          </div>

          {/* Right side: Buttons */}
          <div className="flex space-x-2">
            <button
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 text-sm font-medium"
              onClick={() => navigate(`/evm-staff/policy/${id}/edit`)}
            >
              <PencilSimpleIcon size={16} weight="fill" className="mr-1.5" />
              Edit Policy
            </button>
            <button className="flex items-center bg-red-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-700 text-sm font-medium">
              <TrashIcon size={16} weight="fill" className="mr-1.5" />
              Delete Policy
            </button>
          </div>
        </div>

        {/* 2b. Filter Bar (Dropdowns) */}
        <div className="flex space-x-4 mb-6">
          <FilterDropdown label="All Part Types" />
          <FilterDropdown label="All Status" />
        </div>

        {/* 2c. Main Cards (Grid 2 cột) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Card 1: Basic Information (chiếm 2/3) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
              {/* Part Name */}
              <div>
                <label className="block text-xs font-medium text-gray-500">
                  Part Name
                </label>
                <div className="flex items-center mt-2">
                  <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full">
                    <CubeIcon size={20} className="text-blue-600" />
                  </div>
                  <span className="ml-3 text-base font-semibold text-gray-900">
                    Lithium Battery Pack
                  </span>
                </div>
              </div>
              <div></div> {/* Ô trống để giữ layout */}
              {/* Description (chiếm 2 cột) */}
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-500">
                  Description
                </label>
                <p className="mt-1 text-sm text-gray-700">
                  High-performance lithium-ion battery pack with advanced
                  thermal management system for electric vehicles.
                </p>
              </div>
              {/* Duration & Condition */}
              <InfoPair label="Duration" value="24 months" />
              <InfoPair label="Condition" value="Manufacturing defects only" />
            </div>
          </div>

          {/* Card 2: Dates & References (chiếm 1/3) */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Dates & References
            </h3>
            <div className="space-y-5">
              {/* Dates (Flex) */}
              <div className="flex justify-between">
                {/* Effective Date */}
                <div>
                  <label className="block text-xs font-medium text-gray-500">
                    Effective Date
                  </label>
                  <div className="flex items-center mt-2">
                    <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                      Active
                    </span>
                    <span className="ml-2 text-sm font-medium text-gray-900">
                      Jan 15, 2024
                    </span>
                  </div>
                </div>
                {/* Expiry Date */}
                <div>
                  <label className="block text-xs font-medium text-gray-500">
                    Expiry Date
                  </label>
                  <div className="flex items-center mt-2">
                    <CalendarCheckIcon size={16} className="text-green-600" />
                    <span className="ml-2 text-sm font-medium text-gray-900">
                      Jan 15, 2026
                    </span>
                  </div>
                </div>
              </div>

              {/* Read-only fields */}
              <ReadOnlyField label="Vehicle ID" value="EV-2024-001234" />
              <ReadOnlyField label="Report ID" value="RPT-BAT-2024-0456" />
            </div>
          </div>
        </div>

        {/* 2d. Timeline Card (Full width) */}
        <WarrantyTimeline />
      </main>
    </div>
  );
};

export default PolicyDetails;
