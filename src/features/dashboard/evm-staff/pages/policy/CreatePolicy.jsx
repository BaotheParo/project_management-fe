import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon, // Icon "Back"
  CalendarBlankIcon, // Icon ngày tháng
  CaretDownIcon, // Icon dropdown
  PlusIcon, // Icon "Create Policy"
} from "@phosphor-icons/react";

const CreatePolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Thanh Header xanh trên cùng */}
      <header className="bg-blue-600 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-xl font-semibold text-white">
            EV Warranty Management System
          </h1>
        </div>
      </header>

      {/* 2. Khu vực nội dung chính */}
      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* 2a. Nút Back và Tiêu đề trang */}
        <div className="mb-6">
          <button
            className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-full p-2 mb-2"
            onClick={() => navigate("/evm-staff/policy")}
          >
            <ArrowLeftIcon size={16} className="mr-1.5" />
            Back to Policy List
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Policy
          </h1>
          <p className="text-gray-600 mt-1">
            Define warranty policy parameters for EV components and services
          </p>
        </div>

        {/* 2b. Form chính (thẻ trắng) */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          {/* ----- SECTION: Policy Information ----- */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Policy Information
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Fill in the details below to create a new warranty policy
            </p>

            {/* Lưới 2 cột */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              {/* Cột trái */}
              <div className="space-y-5">
                {/* Part Name */}
                <div>
                  <label
                    htmlFor="partName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Part Name*
                  </label>
                  <input
                    type="text"
                    id="partName"
                    placeholder="Enter part name"
                    className="mt-1 w-full border border-gray-300 rounded-md p-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                {/* Duration */}
                <div className="relative">
                  <label
                    htmlFor="duration"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Duration (months)*
                  </label>
                  <input
                    type="number"
                    id="duration"
                    defaultValue="24"
                    className="mt-1 w-full border border-gray-300 rounded-md p-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                  <span className="absolute right-3 top-9 text-sm text-gray-400">
                    months
                  </span>
                </div>

                {/* Condition */}
                <div className="relative">
                  <label
                    htmlFor="condition"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Condition
                  </label>
                  <select
                    id="condition"
                    className="mt-1 w-full appearance-none border border-gray-300 rounded-md p-2.5 pr-8 text-sm bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  >
                    <option>Select condition</option>
                  </select>
                  <CaretDownIcon
                    size={16}
                    className="absolute right-3 top-9 text-gray-400 pointer-events-none"
                  />
                </div>

                {/* Vehicle ID */}
                <div className="relative">
                  <label
                    htmlFor="vehicleId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Vehicle ID
                  </label>
                  <select
                    id="vehicleId"
                    className="mt-1 w-full appearance-none border border-gray-300 rounded-md p-2.5 pr-8 text-sm bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  >
                    <option>Select vehicle</option>
                  </select>
                  <CaretDownIcon
                    size={16}
                    className="absolute right-3 top-9 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* Cột phải */}
              <div className="space-y-5">
                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="7"
                    placeholder="Enter detailed description of the policy coverage and terms"
                    className="mt-1 w-full border border-gray-300 rounded-md p-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
                  ></textarea>
                </div>

                {/* Effective Date */}
                <div className="relative">
                  <label
                    htmlFor="effectiveDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Effective Date*
                  </label>
                  <input
                    type="text"
                    id="effectiveDate"
                    placeholder="mm/dd/yyyy"
                    className="mt-1 w-full border border-gray-300 rounded-md p-2.5 pr-10 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                  <CalendarBlankIcon
                    size={18}
                    className="absolute right-3 top-9 text-gray-400 pointer-events-none"
                  />
                </div>

                {/* Expiry Date (Read-only) */}
                <div className="relative">
                  <label
                    htmlFor="expiryDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    placeholder="mm/dd/yyyy"
                    readOnly
                    className="mt-1 w-full border border-gray-300 rounded-md p-2.5 pr-10 text-sm bg-gray-50 text-gray-600 cursor-not-allowed"
                  />
                  <CalendarBlankIcon
                    size={18}
                    className="absolute right-3 top-9 text-gray-400 pointer-events-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Auto-calculated based on effective date and duration
                  </p>
                </div>

                {/* Report ID */}
                <div>
                  <label
                    htmlFor="reportId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Report ID <span className="text-gray-500">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="reportId"
                    placeholder="Enter report ID if applicable"
                    className="mt-1 w-full border border-gray-300 rounded-md p-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ----- SECTION: Additional Options ----- */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Additional Options
            </h2>
            <div className="mt-4 flex flex-col md:flex-row md:space-x-10 space-y-3 md:space-y-0">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoRenewal"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <label
                  htmlFor="autoRenewal"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Enable auto-renewal
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="sendEmail"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <label
                  htmlFor="sendEmail"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Send email notifications
                </label>
              </div>
            </div>
          </div>

          {/* ----- Form Footer: Buttons ----- */}
          <div className="flex justify-end items-center mt-10 pt-6 border-t border-gray-200 space-x-3">
            <button
              type="button"
              className="px-6 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => navigate("/evm-staff/policy")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center px-6 py-2.5 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 transition-colors text-sm font-medium"
            >
              <PlusIcon size={16} weight="bold" className="mr-1.5" />
              Create Policy
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreatePolicy;
