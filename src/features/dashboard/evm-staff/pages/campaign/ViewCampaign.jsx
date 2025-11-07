import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import ConfirmDialog from "../../components/ConfirmDialog.jsx";

export default function ViewCampaign() {
  const { id } = useParams(); // Lấy id từ URL
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/evm-staff/campaign");
  };

  // Sample campaign data shown on this page. In real app, fetch by id.
  const campaignData = {
    id,
    title: "Summer Promotion",
    status: "Active",
    startDate: "July 21, 2024",
    endDate: "August 21, 2024",
    description:
      "Campaign description will be displayed here. You can fetch the actual campaign data using the ID.",
  };

  const handleEdit = () => {
    // Navigate to edit page and pass campaign data in route state
    navigate(`/evm-staff/campaign/${id}/edit`, {
      state: { campaign: campaignData },
    });
  };

  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    campaignId: id,
  });

  const handleDeleteClick = () => {
    setDeleteDialog({ isOpen: true, campaignId: id });
  };

  const confirmDelete = () => {
    // TODO: call delete API here
    console.log("Deleting campaign from View page:", deleteDialog.campaignId);
    setDeleteDialog({ isOpen: false, campaignId: null });
    // After delete, navigate back to campaign list
    navigate("/evm-staff/campaign");
  };

  return (
    <>
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
              <h1 className="text-3xl font-bold">Campaign Details</h1>
            </div>
            <p className="text-gray-500">Viewing details for Campaign {id}</p>
          </div>

          {/* Edit and Delete buttons on the right */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleEdit}
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-indigo-700 transition-colors font-medium"
            >
              Edit Campaign
            </button>
            <button
              onClick={handleDeleteClick}
              className="px-4 py-2 rounded-lg border border-red-300 text-red-600 bg-white hover:bg-red-50 transition-colors font-medium"
            >
              Delete Campaign
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
          {/* Basic Info Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Basic Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Campaign ID</p>
                <p className="font-medium">{campaignData.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-700">
                  {campaignData.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Start Date</p>
                <p className="font-medium">{campaignData.startDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">End Date</p>
                <p className="font-medium">{campaignData.endDate}</p>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Description</h2>
            <p className="text-gray-600">
              {campaignData.description} ID: {campaignData.id}
            </p>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, campaignId: null })}
        onConfirm={confirmDelete}
        title="Delete Campaign"
        message={`Are you sure you want to delete campaign ${deleteDialog.campaignId}? This action cannot be undone.`}
      />
    </>
  );
}
