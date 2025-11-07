import React from "react";
import { useNavigate } from "react-router-dom";
import { CalendarIcon, ArrowLeftIcon } from "@phosphor-icons/react";

export default function CreateCampaign() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/evm-staff/campaign");
  };

  return (
    <div className="w-full">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <ArrowLeftIcon size={24} />
            </button>
            <h1 className="text-3xl font-bold">Create new Campaign</h1>
          </div>
          <p className="text-gray-500">
            Fill out the form below to submit a new campaign for cars
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
        <form className="space-y-8">
          {/* Campaign ID and Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Campaign ID
            </label>
            <input
              type="text"
              className="w-full max-w-md px-4 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 focus:outline-none focus:border-indigo-500"
              placeholder="Enter campaign ID"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Campaign Name
            </label>
            <input
              type="text"
              className="w-full max-w-md px-4 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 focus:outline-none focus:border-indigo-500"
              placeholder="Enter campaign name"
            />
          </div>

          {/* Campaign Dates */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Start Date
              </label>
              <div className="relative max-w-md">
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 focus:outline-none focus:border-indigo-500"
                />
                {/* <CalendarIcon className="right-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} /> */}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                End Date
              </label>
              <div className="relative max-w-md">
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 focus:outline-none focus:border-indigo-500"
                />
                {/* <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} /> */}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Description
            </label>
            <textarea
              rows={6}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 focus:outline-none focus:border-indigo-500"
              placeholder="Enter campaign description"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Create Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
