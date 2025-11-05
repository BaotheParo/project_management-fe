import React from "react";
import { useNavigate } from "react-router-dom";
import {
  InfoIcon,
  XCircleIcon,
  CloudArrowUpIcon,
  CaretDownIcon,
  XIcon,
} from "@phosphor-icons/react";

// ===================================
// DỮ LIỆU MẪU (MOCK DATA)
// ===================================
const claimInfo = {
  id: "#CLM-2024-001547",
  vin: "1HDCM82633A123456",
  serviceCenter: "ElectroTech Service Center - Downtown",
  reportedIssue: "Battery charging intermittently fails after 18 months of use",
};

// Component phụ cho tiêu đề section
const SectionHeader = ({ icon: Icon, title, colorClass }) => (
  <div className="flex items-center mb-4">
    <Icon size={24} weight="fill" className={`mr-2 ${colorClass}`} />
    <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
  </div>
);

// Component phụ cho trường dữ liệu chỉ đọc
const ReadOnlyField = ({ label, value }) => (
  <div>
    <label className="block text-sm font-medium text-gray-500">{label}</label>
    <p className="mt-1 text-base font-medium text-gray-800 bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
      {value}
    </p>
  </div>
);

// ===================================
// COMPONENT CHÍNH
// ===================================

const RejectionForm = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* 1. Header (Phần tiêu đề trang) */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Parts supply</h1>
        <p className="text-gray-600 mt-1">
          Fill out the form below to submit a new warranty claim request for
          electric vehicle components.
        </p>
      </div>

      {/* 2. Thẻ Claim Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <SectionHeader
          icon={InfoIcon}
          title="Claim Information"
          colorClass="text-blue-600"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <ReadOnlyField label="Claim ID" value={claimInfo.id} />
          <ReadOnlyField label="Vehicle VIN" value={claimInfo.vin} />
          <ReadOnlyField
            label="Service Center"
            value={claimInfo.serviceCenter}
          />
          <ReadOnlyField
            label="Reported Issue"
            value={claimInfo.reportedIssue}
          />
        </div>
      </div>

      {/* 3. Thẻ Rejection Details */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <SectionHeader
          icon={XCircleIcon}
          title="Rejection Details"
          colorClass="text-red-600"
        />

        {/* Reason for Rejection */}
        <div className="mb-4">
          <label
            htmlFor="rejectionReason"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Reason for Rejection*
          </label>
          <div className="relative">
            <select
              id="rejectionReason"
              className="w-full appearance-none border border-gray-300 rounded-md py-2.5 px-3 pr-8 text-gray-700 bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            >
              <option value="">Select a reason</option>
              <option value="out_of_warranty">Out of Warranty</option>
              <option value="user_damage">User Induced Damage</option>
              <option value="no_fault_found">No Fault Found</option>
            </select>
            <CaretDownIcon
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>

        {/* Additional Notes */}
        <div className="mb-4">
          <label
            htmlFor="additionalNotes"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Additional Notes
          </label>
          <textarea
            id="additionalNotes"
            rows="4"
            placeholder="Provide additional details about the rejection..."
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          ></textarea>
          <p className="text-xs text-gray-500 mt-1">
            Optional: Add any additional context or instructions.
          </p>
        </div>

        {/* Supporting Documents */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Supporting Documents
          </label>
          <div className="mt-1 flex justify-center px-6 pt-10 pb-10 border-2 border-gray-300 border-dashed rounded-md bg-gray-50">
            <div className="text-center">
              <CloudArrowUpIcon size={48} className="mx-auto text-gray-400" />
              <div className="flex text-sm text-gray-600 justify-center mt-2">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"
                >
                  <span>Drop files here or click to upload</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    multiple
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                PDF, JPG, PNG up to 10MB
              </p>
              <button
                type="button"
                className="mt-4 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Choose Files
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Footer Buttons */}
      <div className="flex justify-end items-center mt-8 pt-6 border-t border-gray-200 space-x-3">
        {/* Cancel Button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-100"
        >
          <XIcon size={16} className="text-gray-600" />
          <span>Cancel</span>
        </button>

        {/* Confirm Button */}
        <button
          type="submit"
          className="flex items-center px-6 py-2.5 bg-red-600 text-white rounded-lg shadow-sm hover:bg-red-700 transition-colors text-sm font-medium"
        >
          <XCircleIcon size={16} weight="fill" className="mr-1.5" />
          Confirm Rejection
        </button>
      </div>
    </div>
  );
};

export default RejectionForm;
