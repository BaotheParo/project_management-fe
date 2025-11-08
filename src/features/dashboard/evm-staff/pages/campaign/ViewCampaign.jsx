import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import ConfirmDialog from "../../components/ConfirmDialog.jsx";
import campaignAPI from "../../../../../api/campaignAPI";

export default function ViewCampaign() {
  const { id } = useParams(); // Lấy id từ URL
  const navigate = useNavigate();
  const location = useLocation();

  const [campaign, setCampaign] = useState(location.state?.campaign || null);
  const [loading, setLoading] = useState(!location.state?.campaign); // Chỉ loading nếu ko có data
  const [error, setError] = useState(null);

  useEffect(() => {
    // Chỉ fetch khi không có campaign
    // Hoặc khi 'id' trên URL không khớp với 'id' của campaign đang có
    if (!campaign || (campaign.campaignId || campaign.id) !== id) {
      const fetchCampaign = async () => {
        setLoading(true);
        try {
          const fetchedCampaign = await campaignAPI.getCampaignById(id);
          setCampaign(fetchedCampaign); // Lưu data vừa fetch
          setError(null);
        } catch (err) {
          console.error("Failed to fetch campaign:", err);
          setError(err.message || "Failed to load campaign data");
        } finally {
          setLoading(false);
        }
      };

      fetchCampaign();
    }
  }, [id, campaign]); // Chạy lại nếu 'id' trên URL thay đổi

  const handleBack = () => {
    navigate("/evm-staff/campaign");
  };

  // Sample campaign data shown on this page. In real app, fetch by id.

  const handleEdit = () => {
    navigate(`/evm-staff/campaign/${id}/edit`, {
      state: { campaign: campaign }, // Gửi đi data campaign (đã fetch hoặc từ state)
    });
  };

  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    campaignId: id,
  });

  const handleDeleteClick = () => {
    setDeleteDialog({ isOpen: true, campaignId: id });
  };

  const confirmDelete = async () => {
    // Thêm 'async'
    try {
      // 4. Gọi API delete
      await campaignAPI.deleteCampaign(deleteDialog.campaignId);

      // 5. Thông báo thành công (tùy chọn)
      alert(`Campaign ${deleteDialog.campaignId} đã được xóa thành công.`);

      // 6. Đóng hộp thoại
      setDeleteDialog({ isOpen: false, campaignId: null });

      // 7. Điều hướng về trang danh sách
      navigate("/evm-staff/campaign");
    } catch (err) {
      console.error("Delete failed", err);
      // 8. Báo lỗi và đóng hộp thoại
      alert(`Lỗi khi xóa campaign: ${err.message || "Unknown error"}`);
      setDeleteDialog({ isOpen: false, campaignId: null });
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading campaign details...
      </div>
    );
  }
  if (error) {
    return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  }
  if (!campaign) {
    return (
      <div className="p-6 text-center text-gray-500">Campaign not found.</div>
    );
  }
  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleDateString();
    } catch {
      return iso || "-";
    }
  };

  const getStatusLabel = (status) => {
    if (status === 0) return "Active";
    if (status === 1) return "Completed";
    if (status === 2) return "Pending";
    return "Unknown";
  };
  const statusLabel = getStatusLabel(campaign.status);
  const statusColorMap = {
    Active: "bg-green-100 text-green-700",
    Completed: "bg-blue-100 text-blue-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Unknown: "bg-gray-100 text-gray-700",
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
            <p className="text-gray-500">
              Viewing details for Campaign: {campaign.campaignName}
            </p>
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
                <p className="font-medium">
                  {campaign.campaignId || campaign.id}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${statusColorMap[statusLabel]}`}
                >
                  {statusLabel}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Start Date</p>
                <p className="font-medium">{formatDate(campaign.startDate)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">End Date</p>
                <p className="font-medium">{formatDate(campaign.endDate)}</p>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Description</h2>
            <p className="text-gray-600">
              {campaign.description || "No description provided."}
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
