import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
// 1. Import API
import campaignAPI from "../../../../../api/campaignAPI";
import { ArrowLeftIcon } from "@phosphor-icons/react";

// 2. Hàm helper để "phiên dịch" dữ liệu
const statusToNumber = (statusString) => {
  if (statusString === "Active") return 0;
  if (statusString === "Completed") return 1;
  if (statusString === "Pending") return 2;
  return 0; // Mặc định là Active
};

const statusToString = (statusNumber) => {
  if (statusNumber === 0) return "Active";
  if (statusNumber === 1) return "Completed";
  if (statusNumber === 2) return "Pending";
  return "Unknown";
};

// Hàm helper để format ngày cho <input type="date">
const formatDateForInput = (isoString) => {
  if (!isoString) return "";
  try {
    return new Date(isoString).toISOString().split("T")[0];
  } catch (e) {
    return ""; // Trả về rỗng nếu ngày không hợp lệ
  }
};

export default function EditCampaign() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // 3. Cập nhật state (tên trường phải khớp với form)
  const [form, setForm] = useState({
    campaignName: "", // Đổi 'title' thành 'campaignName'
    status: "Active",
    startDate: "",
    endDate: "",
    description: "",
  });

  // State cho loading và error
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // 4. useEffect này GẮN API GET (lấy dữ liệu)
  useEffect(() => {
    // Hàm để điền data vào form
    const populateForm = (campaignData) => {
      setForm({
        campaignName: campaignData.campaignName || "",
        status: statusToString(campaignData.status), // Phiên dịch số -> chữ
        startDate: formatDateForInput(campaignData.startDate), // Format ngày
        endDate: formatDateForInput(campaignData.endDate), // Format ngày
        description: campaignData.description || "",
      });
    };

    const incoming = location.state?.campaign;

    if (incoming) {
      // Nếu có data từ 'state', dùng nó (nhanh)
      populateForm(incoming);
      setLoading(false);
    } else {
      // Nếu không (ví dụ: F5), fetch data từ API
      const fetchCampaign = async () => {
        try {
          setLoading(true);
          const campaignData = await campaignAPI.getCampaignById(id);
          populateForm(campaignData);
          setError(null);
        } catch (err) {
          setError(err.message || "Failed to fetch campaign data");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchCampaign();
    }
  }, [id, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    // Quay lại trang trước đó (là trang View)
    navigate(-1);
  };

  // 5. HÀM NÀY GẮN API UPDATE (cập nhật)
  const handleSave = async (e) => {
    e.preventDefault();

    // Kiểm tra ngày
    if (new Date(form.endDate) < new Date(form.startDate)) {
      setError("End date cannot be earlier than start date.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Dữ liệu để gửi cho API
    const dataToSave = {
      ...form,
      status: statusToNumber(form.status), // Phiên dịch chữ -> số
    };

    try {
      // *** ĐÂY LÀ DÒNG GỌI API UPDATE ***
      const updatedCampaign = await campaignAPI.updateCampaign(id, dataToSave);

      alert("Save changes successful!");

      // Quay lại trang View, gửi kèm data đã cập nhật
      navigate(`/evm-staff/campaign/${id}/view`, {
        state: { campaign: updatedCampaign },
      });
    } catch (err) {
      console.error("Save failed:", err);
      setError(err.message || "Failed to save changes.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ----- JSX (với xử lý loading/error) -----

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading form...</div>;
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Edit Campaign</h1>
          <p className="text-gray-500">
            Edit details for campaign:{" "}
            <span className="font-semibold text-lg text-red-700">
              {form.campaignName}
            </span>
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSave}
        className="bg-white rounded-2xl border-2 border-gray-200 p-8"
      >
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Campaign Name
            </label>
            <input
              type="text"
              name="campaignName" // Sửa name
              value={form.campaignName} // Sửa value
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">Status</label>
            <select
              name="status"
              value={form.status} // Value đã là chữ
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg p-3"
              required
            >
              {/* Sửa lại cho khớp với logic 'statusToString' */}
              <option>Active</option>
              <option>Pending</option>
              <option>Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={form.startDate} // Value đã được format
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">End Date</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate} // Value đã được format
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg p-3"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            className="w-full border border-gray-200 rounded-lg p-3"
          />
        </div>

        {/* Hiển thị lỗi (nếu có) */}
        {error && (
          <div className="text-red-600 font-medium mb-4">Error: {error}</div>
        )}

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-200"
            disabled={isSubmitting} // Vô hiệu hóa khi đang submit
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-700 disabled:bg-indigo-300"
            disabled={isSubmitting} // Vô hiệu hóa khi đang submit
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
