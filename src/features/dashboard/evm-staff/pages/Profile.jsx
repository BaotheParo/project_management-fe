import React, { useState, useEffect } from "react";
import { CalendarIcon } from "@phosphor-icons/react";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    avatar: "",
  });

  useEffect(() => {
    // TODO: Replace with actual API call
    // Mock data for now
    setUserData({
      name: "Timmy",
      role: "Lead Staff",
      email: "sme@gmail.com",
      phone: "+84 123 456 789",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&q=80",
    });
  }, []);

  return (
    // 1. Main Container (Nền trắng, có padding)
    <div className="p-8 bg-white min-h-screen">
      {/* Giới hạn chiều rộng nội dung */}
      <div className="max-w-3xl mx-auto">
        {/* 2. Page Header */}
        <div className="flex justify-between items-start mb-10">
          {/* Tiêu đề */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <p className="text-gray-500 mt-1">
              Manage and track warranty claim requests
            </p>
          </div>
          {/* Ngày tháng */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">
              16 May, 2025
            </span>
            <button className="p-2 rounded-lg hover:bg-gray-100 border border-gray-300">
              <CalendarIcon size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* 3. User Info Block */}
        <div className="flex justify-between items-center mb-12 py-6 border-b border-gray-200">
          {/* Avatar và Tên */}
          <div className="flex items-center">
            <img
              // Bạn có thể thay bằng avatar thật
              src={userData.avatar}
              alt="Profile Avatar"
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {userData.name}
              </h2>
              <p className="text-gray-500">{userData.role}</p>
            </div>
          </div>
          {/* Nút Change Password */}
          <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg shadow-sm hover:bg-indigo-700 transition-colors font-medium">
            Change Password
          </button>
        </div>

        {/* 4. Contact Details */}
        <div className="space-y-6">
          {/* Email Field (Dạng read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Email
            </label>
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <span className="text-gray-800 font-medium">
                {userData.email}
              </span>
            </div>
          </div>

          {/* Phone Number Field (Dạng read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Phone Number
            </label>
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <span className="text-gray-800 font-medium">
                {userData.phone}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
