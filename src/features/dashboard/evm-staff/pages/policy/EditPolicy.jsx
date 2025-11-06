import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CalendarIcon, CaretLeftIcon } from "@phosphor-icons/react";

// Sample data - replace with actual data later
const samplePolicy = {
  id: "P-001",
  partName: "Engine Control Module",
  description:
    "Comprehensive warranty coverage for engine control module including diagnostic and replacement services under manufacturer specifications.",
  duration: "36",
  condition: "Valid for vehicles under 100,000 miles",
  effectiveDate: "2024-01-01",
  expiryDate: "2027-01-01",
};

export default function EditPolicy() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add save logic here
    navigate(`/evm-staff/policy/${id}`);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(`/evm-staff/policy/${id}`)}
          className="flex items-center gap-2 text-indigo-500 font-medium mb-4 hover:text-indigo-900 hover:bg-indigo-100 rounded-full p-2"
        >
          <CaretLeftIcon size={20} />
          <span>Back to Policy Details</span>
        </button>
        <h1 className="text-3xl font-bold">Edit Policy</h1>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl border-2 border-gray-200">
        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Part Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Part Name
                </label>
                <input
                  type="text"
                  defaultValue={samplePolicy.partName}
                  className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  defaultValue={samplePolicy.description}
                  className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (months)
                </label>
                <input
                  type="number"
                  defaultValue={samplePolicy.duration}
                  className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              {/* Condition */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition
                </label>
                <input
                  type="text"
                  defaultValue={samplePolicy.condition}
                  className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Effective Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Effective Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    defaultValue={samplePolicy.effectiveDate}
                    className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-indigo-500 focus:outline-none"
                  />
                  <CalendarIcon
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                </div>
              </div>

              {/* Expiry Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    defaultValue={samplePolicy.expiryDate}
                    className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-indigo-500 focus:outline-none"
                  />
                  <CalendarIcon
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8 pt-6 border-t-2 border-gray-200">
            <button
              type="button"
              onClick={() => navigate(`/evm-staff/policy/${id}`)}
              className="px-6 py-2 rounded-lg border-2 border-gray-200 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
