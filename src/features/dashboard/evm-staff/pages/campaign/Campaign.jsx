import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CaretLeftIcon,
  CaretRightIcon,
  PlusCircleIcon,
  DotsThreeIcon,
} from "@phosphor-icons/react";
import ConfirmDialog from "../../components/ConfirmDialog.jsx";
import campaignAPI from "../../../../../api/campaignAPI";

const statusColorMap = {
  Active: "bg-green-100 text-green-700",
  Completed: "bg-blue-100 text-blue-700",
  Pending: "bg-yellow-100 text-yellow-700",
};

const cardColorMap = {
  1: "border-gray-200",
  2: "border-green-200",
  3: "border-blue-200",
  4: "border-yellow-200", // Sửa lỗi '4.' thành 4
};

const titleColorMap = {
  1: "text-gray-400",
  2: "text-green-600",
  3: "text-blue-600",
  4: "text-yellow-600", // Sửa lỗi '4.' thành 4
};

export default function Campaign() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    campaignId: null,
  });

  const [campaigns, setCampaigns] = useState([]);

  // 1. TẠO STATE MỚI CHO CÁC THẺ STATS
  const [campaignStats, setCampaignStats] = useState([]); // Dùng mảng rỗng

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleCreateCampaign = () => {
    navigate("/evm-staff/campaign/create");
  };

  const fetchCampaigns = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await campaignAPI.getAllCampaigns();

      // 2. LẤY DANH SÁCH CAMPAIGNS TỪ API
      // Thêm log này để xem chính xác API trả về cái gì
      console.log("Dữ liệu nhận được từ campaignAPI:", response);

      let fetchedCampaigns = [];

      // 1. Đảo ngược thứ tự: Ưu tiên kiểm tra xem bản thân 'response' có phải là mảng không
      //    (Vì campaignAPI.js đã trả về .data rồi)
      if (Array.isArray(response)) {
        fetchedCampaigns = response;
      }
      // 2. Nếu không, kiểm tra xem 'response' có key 'data' chứa mảng không
      //    (Trường hợp API trả về { data: { data: [...] } })
      else if (Array.isArray(response?.data)) {
        fetchedCampaigns = response.data;
      }
      // 3. (Tùy chọn) Thêm các trường hợp phổ biến khác nếu API trả về cấu trúc lạ
      else if (Array.isArray(response?.items)) {
        fetchedCampaigns = response.items;
      } else if (Array.isArray(response?.campaignList)) {
        fetchedCampaigns = response.campaignList;
      }
      // 4. Nếu tất cả đều sai
      else {
        console.error(
          "API response không phải là mảng hoặc cấu trúc không nhận diện được:",
          response
        );
        // Để mảng rỗng
      }

      setCampaigns(fetchedCampaigns); // Set state cho bảng

      // 3. TÍNH TOÁN DỮ LIỆU STATS TỪ DANH SÁCH
      // (Giả sử status 0=Active, 1=Completed, 2=Pending dựa theo logic bảng của bạn)
      const total = fetchedCampaigns.length;
      const active = fetchedCampaigns.filter((c) => c.status === 0).length;
      const completed = fetchedCampaigns.filter((c) => c.status === 1).length;
      const pending = fetchedCampaigns.filter((c) => c.status === 2).length;

      // 4. TẠO MẢNG STATS MỚI VÀ SET STATE
      const statsData = [
        {
          id: 1,
          title: "Total Campaigns",
          value: total.toString(),
          subtitle: "All time",
        },
        {
          id: 2,
          title: "Active Campaigns",
          value: active.toString(),
          subtitle: "Currently running",
        },
        {
          id: 3,
          title: "Completed Campaigns",
          value: completed.toString(),
          subtitle: "Finished",
        },
        {
          id: 4,
          title: "Pending Campaigns",
          value: pending.toString(),
          subtitle: "Awaiting start",
        },
      ];
      setCampaignStats(statsData); // Set state cho 4 thẻ stats
    } catch (err) {
      console.error(err);
      setError("Failed to load campaigns");
      setCampaigns([]);
      setCampaignStats([]); // Cũng reset stats nếu lỗi
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleView = (campaignId) => {
    setActiveMenu(null);
    navigate(`/evm-staff/campaign/${campaignId}/view`);
  };

  const handleDelete = (campaignId) => {
    setActiveMenu(null);
    setDeleteDialog({ isOpen: true, campaignId });
  };

  const confirmDelete = async () => {
    try {
      // TODO: Uncomment when campaignAPI is created
      // await campaignAPI.deleteCampaign(deleteDialog.campaignId);

      // Tạm thời chỉ xóa ở local
      setCampaigns((prev) =>
        prev.filter((c) => c.campaignId !== deleteDialog.campaignId)
      );

      // CẬP NHẬT LẠI STATS SAU KHI XÓA
      // (Cách tốt hơn là gọi lại fetchCampaigns() nếu API đã hoạt động)
      const newCampaigns = campaigns.filter(
        (c) => c.campaignId !== deleteDialog.campaignId
      );
      const total = newCampaigns.length;
      const active = newCampaigns.filter((c) => c.status === 0).length;
      const completed = newCampaigns.filter((c) => c.status === 1).length;
      const pending = newCampaigns.filter((c) => c.status === 2).length;

      setCampaignStats([
        {
          id: 1,
          title: "Total Campaigns",
          value: total.toString(),
          subtitle: "All time",
        },
        {
          id: 2,
          title: "Active Campaigns",
          value: active.toString(),
          subtitle: "Currently running",
        },
        {
          id: 3,
          title: "Completed Campaigns",
          value: completed.toString(),
          subtitle: "Finished",
        },
        {
          id: 4,
          title: "Pending Campaigns",
          value: pending.toString(),
          subtitle: "Awaiting start",
        },
      ]);

      setDeleteDialog({ isOpen: false, campaignId: null });
    } catch (err) {
      console.error("Delete failed", err);
      setDeleteDialog({ isOpen: false, campaignId: null });
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Campaign Management</h1>
        <p className="text-gray-500">
          View and manage all your marketing campaigns
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {campaignStats.map((stat) => (
          <div
            key={stat.id}
            className={
              "flex flex-col p-6 bg-white rounded-2xl border-2 " +
              cardColorMap[stat.id]
            }
          >
            <p className={"text-sm font-medium " + titleColorMap[stat.id]}>
              {stat.title}
            </p>
            <p className="text-2xl font-bold mt-2 mb-1">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Campaign List */}
      <div className="bg-white rounded-2xl border-2 border-gray-200">
        <div className="p-6 border-b-2 border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold">Campaign List</h2>
          <button
            onClick={handleCreateCampaign}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <PlusCircleIcon size={20} />
            <span>Create Campaign</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">
                  Campaign ID
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">
                  Name
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">
                  Start Date
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">
                  End Date
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    Loading campaigns...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-red-500">
                    {error}
                  </td>
                </tr>
              ) : campaigns.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    No campaigns found.
                  </td>
                </tr>
              ) : (
                campaigns.map((campaign) => {
                  const statusLabel = (() => {
                    if (campaign.status === 0) return "Active";
                    if (campaign.status === 1) return "Completed";
                    if (campaign.status === 2) return "Pending";
                    return "Unknown";
                  })();

                  const formatDate = (iso) => {
                    try {
                      return new Date(iso).toLocaleDateString();
                    } catch {
                      return iso || "-";
                    }
                  };

                  return (
                    <tr
                      key={campaign.campaignId || campaign.id}
                      className="hover:bg-gray-50"
                    >
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {campaign.campaignId || campaign.id}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium">
                        {campaign.campaignName || campaign.name}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {formatDate(campaign.startDate)}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {formatDate(campaign.endDate)}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={
                            "px-3 py-1 text-sm font-medium rounded-full " +
                            statusColorMap[statusLabel]
                          }
                        >
                          {statusLabel}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="relative" data-dropdown>
                          <button
                            onClick={() =>
                              setActiveMenu(
                                activeMenu ===
                                  (campaign.campaignId || campaign.id)
                                  ? null
                                  : campaign.campaignId || campaign.id
                              )
                            }
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <DotsThreeIcon
                              size={24}
                              className="text-gray-600"
                            />
                          </button>

                          {activeMenu ===
                            (campaign.campaignId || campaign.id) && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                              <button
                                onClick={() =>
                                  handleView(campaign.campaignId || campaign.id)
                                }
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg"
                              >
                                View Details
                              </button>
                              <button
                                onClick={() =>
                                  handleDelete(
                                    campaign.campaignId || campaign.id
                                  )
                                }
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          isOpen={deleteDialog.isOpen}
          onClose={() => setDeleteDialog({ isOpen: false, campaignId: null })}
          onConfirm={confirmDelete}
          title="Delete Campaign"
          message={`Are you sure you want to delete campaign ${deleteDialog.campaignId}? This action cannot be undone.`}
        />

        {/* Pagination */}
        <div className="p-6 border-t-2 border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">Showing 1-10 of 24 campaigns</p>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <CaretLeftIcon size={20} />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <CaretRightIcon size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
