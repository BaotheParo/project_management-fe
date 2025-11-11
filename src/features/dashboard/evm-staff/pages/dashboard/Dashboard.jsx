import React, {
  useMemo,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import {
  CaretLeftIcon,
  CaretRightIcon,
  XCircleIcon,
  CheckCircleIcon,
  DotsThreeIcon,
  ListDashesIcon,
  DotsThreeCircleIcon,
  ClockIcon,
  PlusIcon,
} from "@phosphor-icons/react";
import { useNavigate, useLocation } from "react-router-dom";
import StatusCard from "../../../../../components/StatusCard";
// ✅ ĐÃ XÓA IMPORT ClaimStatusDot VÌ KHÔNG CẦN NỮA
import Loader from "../../../../../components/Loader";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../../../../components/Notification";
import { useAuth } from "../../../../../app/AuthProvider";

import claimAPI from "../../../../../api/claimAPI";

// ✅ TẠO MAP ĐỂ DỊCH STATUS (0, 1, 2)
const statusMap = {
  1: { text: "Approved", color: "bg-green-500" }, // 1 = Approved (Green)
  2: { text: "Rejected", color: "bg-red-500" }, // 2 = Rejected (Red)
  0: { text: "Pending", color: "bg-yellow-500" }, // 0 = Pending (Yellow)
};

export default function Dashboard() {
  const [openActionFor, setOpenActionFor] = useState(null);
  const menuRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const [notification, setNotification] = useState(null);

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenActionFor(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  const total = 247;
  const perPage = 10;
  const totalPages = Math.ceil(total / perPage);
  const pages = useMemo(() => [1, 2, 3, 4], []);

  const fetchClaims = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const responseData = await claimAPI.getAllClaims();
      console.log("DEBUG: Cấu trúc API response:", responseData);

      let claimsArray = [];

      if (Array.isArray(responseData)) {
        claimsArray = responseData;
      } else if (responseData && Array.isArray(responseData.data)) {
        claimsArray = responseData.data;
      } else if (responseData && Array.isArray(responseData.claims)) {
        claimsArray = responseData.claims;
      } else if (responseData && Array.isArray(responseData.results)) {
        claimsArray = responseData.results;
      } else {
        console.warn(
          "API response không phải là mảng hoặc cấu trúc không xác định.",
          responseData
        );
      }

      setRows(claimsArray);
    } catch (err) {
      setError(err);
      console.error("❌ [Dashboard] Failed to fetch claims:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.userId) {
      fetchClaims();
    }
  }, [user?.userId, fetchClaims]);

  useEffect(() => {
    if (location.state?.refresh && user?.userId) {
      console.log("🔄 [Dashboard] Refreshing claims list after edit...");
      setTimeout(async () => {
        try {
          await fetchClaims();
        } catch (err) {
          console.error("❌ [Dashboard] Failed to refresh claims:", err);
        }
      }, 300);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, user?.userId, fetchClaims, navigate, location.pathname]);

  if (loading) return <Loader />;

  if (error)
    return (
      <p className="text-red-500">
        Error loading claims: {error.message || "Something went wrong"}
      </p>
    );

  // ✅ SỬA LOGIC TÍNH TOÁN CHO STATUS CARD
  const totalClaims = rows.filter((r) => r.isActive === true).length;
  const approvedClaims = rows.filter(
    (r) => r.claimStatus === 1 && r.isActive === true // Sửa thành số 1
  ).length;
  const rejectedClaims = rows.filter(
    (r) => r.claimStatus === 2 && r.isActive === true // Sửa thành số 2
  ).length;

  // PHẦN JSX
  return (
    <div className="w-full">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Hi, {user?.username}</h1>
          <p className="text-gray-500">
            Manage and track warranty claim requests
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 mt-20 mb-12">
        <StatusCard
          title="Total Incoming Requests"
          titleColor="text-indigo-600"
          count={totalClaims}
          description="Currently in your queue"
          icon={ListDashesIcon}
          iconColor={"#4f39f8"}
        />
        <StatusCard
          title="Approved Claims"
          titleColor="text-green-600"
          count={approvedClaims}
          description="Accepted"
          icon={CheckCircleIcon}
          iconColor={"#00a63e"}
        />
        <StatusCard
          title="Rejected Claims"
          titleColor="text-red-500"
          count={rejectedClaims}
          description="Currently in your queue"
          icon={XCircleIcon}
          iconColor={"#fb2c36"}
        />
        <StatusCard
          title="Active Campaigns"
          titleColor="text-blue-500"
          count={"3"}
          description="Currently in your queue"
          icon={ClockIcon}
          iconColor={"#3b82f6"}
        />
      </div>

      <div className="bg-white rounded-2xl">
        <div className="flex justify-between">
          <h2 className="text-[25px] font-semibold text-black">
            Recent Claim Requests
          </h2>
        </div>

        <div className="border-[3px] border-[#EBEBEB] rounded-2xl overflow-visible mt-6">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-[#DEE1E6] bg-[#FAFAFA]">
                <th className="text-left rounded-tl-2xl px-8 py-3 text-base font-medium text-[#686262]">
                  Claim ID
                </th>
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">
                  Vehicle
                </th>
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">
                  Vin ID
                </th>
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">
                  Requester
                </th>
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">
                  Status
                </th>
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">
                  Request Date
                </th>
                <th className="text-left rounded-tr-2xl px-8 py-3 text-base font-medium text-[#686262]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? (
                rows
                  .filter((r) => r.isActive)
                  .map((r) => {
                    // ✅ LẤY THÔNG TIN STATUS TỪ MAP
                    // Mặc định là Pending (0) nếu data bị sai
                    const statusInfo = statusMap[r.claimStatus] || statusMap[0];

                    return (
                      <tr
                        key={r.claimId}
                        className="border-b-2 border-[#DEE1E6] bg-white hover:bg-gray-50"
                      >
                        <td className="px-8 py-3 text-[13px] font-medium text-black">
                          {r.claimId}
                        </td>
                        <td className="px-8 py-3 text-[13px] font-medium text-black">
                          {r.vehicleName}
                        </td>
                        <td className="px-8 py-3 text-[13px] font-medium text-black">
                          {r.vin}
                        </td>
                        <td className="px-8 py-3 text-[13px] font-medium text-black">
                          {r.technicianName}
                        </td>

                        {/* ✅ SỬA LẠI HOÀN TOÀN Ô STATUS */}
                        <td className="px-8 py-3 text-[13px] font-medium text-black">
                          <div className="flex items-center gap-2">
                            {/* Cái chấm tròn màu */}
                            <div
                              className={`w-3 h-3 rounded-full ${statusInfo.color}`}
                            ></div>
                            {/* Tên status */}
                            <span>{statusInfo.text}</span>
                          </div>
                        </td>

                        <td className="px-8 py-3 text-[13px] font-medium text-black">
                          {r.claimDate}
                        </td>
                        <td className="px-8 py-3 text-[13px] font-medium text-black relative">
                          <div className="relative inline-block">
                            <button
                              onClick={() => {
                                setOpenActionFor(
                                  openActionFor === r.claimId ? null : r.claimId
                                );
                              }}
                              className="rounded-full hover:bg-gray-100 cursor-pointer"
                            >
                              <DotsThreeIcon size={20} weight="bold" />
                            </button>

                            {openActionFor === r.claimId && (
                              <div
                                ref={menuRef}
                                className="absolute -right-10 top-7 w-32 bg-white border border-[#DEE1E6] rounded-lg shadow-lg z-50 pointer-events-auto"
                              >
                                <button
                                  onClick={() => {
                                    setOpenActionFor(null);
                                    navigate(`/evm-staff/claim/${r.claimId}`);
                                  }}
                                  className="w-full text-left rounded-tl-lg rounded-tr-lg transition-all px-3 py-2 hover:bg-gray-50 cursor-pointer"
                                >
                                  View Detail
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
              ) : (
                // Hiển thị khi không có data
                <tr>
                  <td colSpan="7" className="text-center py-10 text-gray-500">
                    No claim requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
          <div>Showing 1 to 10 of {total} results</div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-3 py-1 cursor-pointer rounded-md hover:text-indigo-600 disabled:opacity-40"
            >
              <CaretLeftIcon size={12} /> Previous
            </button>

            <div className="flex items-center gap-2">
              {pages.map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-8 h-8 rounded-full text-[12px] font-medium flex items-center justify-center cursor-pointer ${
                    currentPage === p
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-[#727674] hover:text-black"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-3 py-1 cursor-pointer rounded-md hover:text-indigo-600 disabled:opacity-40"
            >
              Next <CaretRightIcon size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Notification logic */}
      {notification?.type === "success" && (
        <SuccessNotification
          message={notification.message}
          subText={notification.subText}
          actionText="Close"
          onAction={() => setNotification(null)}
        />
      )}

      {notification?.type === "error" && (
        <ErrorNotification
          message={notification.message}
          subText={notification.subText}
          actionText="Close"
          onAction={() => setNotification(null)}
        />
      )}
    </div>
  );
}
