import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CaretDownIcon, // Icon cho dropdown
  PlusIcon, // Icon "Add Policy"
  EyeIcon, // Icon Action View
  TrashIcon, // Icon Action Delete
  DotsThreeIcon, // Icon menu 3 chấm
  CaretLeftIcon, // Icon Pagination
  CaretRightIcon, // Icon Pagination
  BatteryChargingIcon, // Icon Part
  GearIcon, // Icon Part
  CpuIcon, // Icon Part
  CubeIcon, // Icon Part (thay thế)
} from "@phosphor-icons/react";

// ===================================
// DỮ LIỆU MẪU (MOCK DATA)
// ===================================

// Component phụ cho Icon của Part
const PartIcon = ({ icon: Icon, bgColor }) => (
  <div className={`flex-shrink-0 p-2 rounded-lg ${bgColor}`}>
    <Icon size={20} weight="fill" className="text-white" />
  </div>
);

const policyData = [
  {
    id: "BAT-001",
    name: "Lithium Ion Battery Pack",
    icon: BatteryChargingIcon,
    bgColor: "bg-green-500",
    duration: "8 Years / 160,000 km",
    conditions: "Manufacturing defects only",
  },
  {
    id: "MOT-002",
    name: "Electric Drive Motor",
    icon: GearIcon,
    bgColor: "bg-blue-500",
    duration: "5 Years / 100,000 km",
    conditions: "Electrical & mechanical failure",
  },
  {
    id: "CTR-003",
    name: "Motor Controller Unit",
    icon: CpuIcon,
    bgColor: "bg-cyan-500",
    duration: "3 Years / 60,000 km",
    conditions: "Software & hardware defects",
  },
  {
    id: "BRK-004",
    name: "Regenerative Brake System",
    icon: CubeIcon, // Dùng tạm Cube, bạn có thể đổi icon khác
    bgColor: "bg-yellow-500",
    duration: "2 Years / 40,000 km",
    conditions: "Wear parts excluded",
  },
  {
    id: "CHG-005",
    name: "Onboard Charger",
    icon: BatteryChargingIcon, // Tái sử dụng icon
    bgColor: "bg-purple-500",
    duration: "4 Years / 80,000 km",
    conditions: "Electrical failure only",
  },
];

// Component Dropdown (cho "All Part Types", "All Status")
const FilterDropdown = ({ label, options }) => (
  <div className="relative">
    <label className="block text-xs font-medium text-gray-500 mb-1">
      {label}
    </label>
    <select className="appearance-none border border-gray-300 rounded-md py-2 px-3 pr-8 text-sm font-medium text-gray-700 bg-white cursor-pointer hover:border-gray-400">
      {options.map((opt) => (
        <option key={opt}>{opt}</option>
      ))}
    </select>
    <CaretDownIcon
      size={14}
      className="absolute right-3 bottom-2.5 text-gray-500 pointer-events-none"
    />
  </div>
);

// ===================================
// COMPONENT TRANG CHÍNH
// ===================================
const Policy = () => {
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = React.useState(null);

  const toggleMenu = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  const handleView = (id) => {
    navigate(`/evm-staff/policy/${id}`);
    setOpenMenuId(null);
  };

  const handleDelete = (id) => {
    // TODO: Gắn API xoá nếu cần
    // Hiện tại chỉ log/id placeholder
    console.log("Delete policy:", id);
    setOpenMenuId(null);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. TOP HEADER (Thanh trắng "EV Warranty...") */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-xl font-semibold text-gray-900">
            EV Warranty Management System
          </h1>
        </div>
      </header>

      {/* 2. MAIN CONTENT AREA (Nền xám) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 2a. Page Title & Subtitle */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Warranty Policies for EV Spare Parts
          </h2>
          <p className="text-gray-600 mt-1">
            Manage warranty policies and access controls for electric vehicle
            spare parts.
          </p>
        </div>

        {/* 2b. Toolbar & Filters */}
        <div className="flex justify-between items-end mb-6">
          {/* Filters */}
          <div className="flex space-x-4">
            <FilterDropdown
              label="Part Type"
              options={["All Parts", "Battery", "Motor"]}
            />
            <FilterDropdown
              label="Role Access"
              options={["All Roles", "Admin", "Staff"]}
            />
          </div>

          {/* Add Button */}
          <button
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 text-sm font-medium"
            onClick={() => navigate("/evm-staff/policy/create")}
          >
            <PlusIcon size={16} weight="bold" className="mr-1.5" />
            Add Policy
          </button>
        </div>

        {/* 2c. Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/5">
                  Part ID | Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Warranty Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Warranty Conditions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {policyData.map((policy) => (
                <tr key={policy.id}>
                  {/* Part ID Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <PartIcon icon={policy.icon} bgColor={policy.bgColor} />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {policy.id}
                        </div>
                        <div className="text-sm text-gray-500">
                          {policy.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  {/* Duration Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {policy.duration}
                  </td>
                  {/* Conditions Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {policy.conditions}
                  </td>
                  {/* Actions Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium relative">
                    <button
                      className="text-gray-600 hover:text-gray-800 p-1 rounded-md hover:bg-gray-100"
                      title="Actions"
                      onClick={() => toggleMenu(policy.id)}
                    >
                      <DotsThreeIcon size={20} weight="bold" />
                    </button>

                    {openMenuId === policy.id && (
                      <div className="absolute z-10 right-4 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg py-1">
                        <button
                          className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => handleView(policy.id)}
                        >
                          <EyeIcon size={16} className="mr-2 text-blue-600" />
                          View
                        </button>
                        <button
                          className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(policy.id)}
                        >
                          <TrashIcon size={16} className="mr-2" />
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 2d. Pagination Footer */}
        <div className="flex justify-between items-center mt-4">
          <div>{/* Có thể thêm text "Showing 1-5 of 10" ở đây */}</div>
          <nav className="flex items-center space-x-1">
            <button className="px-3 py-1 rounded-md hover:bg-gray-200 text-gray-600 text-sm">
              <CaretLeftIcon size={16} />
            </button>
            <button className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm font-medium">
              1
            </button>
            <button className="px-3 py-1 rounded-md hover:bg-gray-200 text-gray-600 text-sm">
              2
            </button>
            <button className="px-3 py-1 rounded-md hover:bg-gray-200 text-gray-600 text-sm">
              <CaretRightIcon size={16} />
            </button>
          </nav>
        </div>
      </main>
    </div>
  );
};

export default Policy;
