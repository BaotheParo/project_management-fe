import React, { useState } from "react"; // 1. Thêm useState
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@phosphor-icons/react";
// 2. Import campaignAPI
import campaignAPI from "../../../../../api/campaignAPI";

export default function CreateCampaign() {
  const navigate = useNavigate();

  // 3. Tạo state để lưu dữ liệu form
  const [formData, setFormData] = useState({
    campaignName: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  // 4. State cho loading và báo lỗi
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleBack = () => {
    navigate("/evm-staff/campaign");
  };

  // 5. Hàm cập nhật state khi người dùng nhập
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 6. Hàm xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn trang reload

    // Kiểm tra ngày
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      setError("End date cannot be earlier than start date.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Chuẩn bị dữ liệu để gửi đi
    // API của bạn (`image_f71666.png`) chỉ cần 4 trường này
    const campaignData = {
      campaignName: formData.campaignName,
      startDate: formData.startDate,
      endDate: formData.endDate,
      description: formData.description,
    };

    try {
      // Gọi API
      await campaignAPI.createCampaign(campaignData);

      // Nếu thành công
      alert("Campaign created successfully!");
      navigate("/evm-staff/campaign"); // Quay về trang danh sách
    } catch (err) {
      // Nếu thất bại
      console.error("Failed to create campaign:", err);
      setError(err.message || "An error occurred while creating the campaign.");
    } finally {
      // Dừng loading
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-start justify-between mb-6">
        {/* ... (Phần header và nút Back không đổi) ... */}
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
        {/* 7. Thêm onSubmit vào form */}
        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* 8. Đã loại bỏ ô 'Campaign ID' */}

          {/* Campaign Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Campaign Name
            </label>
            <input
              type="text"
              name="campaignName" // Thêm name
              value={formData.campaignName} // Thêm value
              onChange={handleChange} // Thêm onChange
              className="w-full max-w-md px-4 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 focus:outline-none focus:border-indigo-500"
              placeholder="Enter campaign name"
              required // Thêm required
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
                  name="startDate" // Thêm name
                  value={formData.startDate} // Thêm value
                  onChange={handleChange} // Thêm onChange
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                End Date
              </label>
              <div className="relative max-w-md">
                <input
                  type="date"
                  name="endDate" // Thêm name
                  value={formData.endDate} // Thêm value
                  onChange={handleChange} // Thêm onChange
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 focus:outline-none focus:border-indigo-500"
                  required
                />
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
              name="description" // Thêm name
              value={formData.description} // Thêm value
              onChange={handleChange} // Thêm onChange
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 focus:outline-none focus:border-indigo-500"
              placeholder="Enter campaign description"
            />
          </div>

          {/* Hiển thị lỗi (nếu có) */}
          {error && (
            <div className="text-red-600 font-medium">Error: {error}</div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSubmitting} // 9. Thêm 'disabled'
              className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-300"
            >
              {/* 10. Thay đổi text khi đang gửi */}
              {isSubmitting ? "Creating..." : "Create Campaign"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
