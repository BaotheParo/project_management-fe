
// // export default function EVMStaffDashboard() {
// //   return <div>EVM Staff Dashboard</div>
// // }
// import React from 'react'
// import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'
// import { useNavigate } from 'react-router-dom'

// const stats = [
//   { id: 1, title: 'Total Incoming Claims', value: '237', subtitle: 'Pending review' },
//   { id: 2, title: 'Approved Claims', value: '1,842', subtitle: 'This month' },
//   { id: 3, title: 'Rejected Claims', value: '156', subtitle: 'This month' },
//   { id: 4, title: 'Active Campaigns', value: '12', subtitle: 'Currently running' },
// ]

// const sampleRows = Array.from({ length: 10 }).map((_, i) => ({
//   orderId: `RO-00${i + 1}`,
//   vehicle: 'VinFast VF-3',
//   vin: 'LSV1E7AL0MC123456',
//   status: ['On hold', 'Done', 'On hold', 'Overdue', 'In Progress', 'On hold', 'On hold', 'Done', 'On hold', 'In Progress'][i],
//   claimDate: '2024-07-21',
// }))
// const titleColorMap = {
//   1: 'text-gray-400',   // ID 1: Màu xám
//   2: 'text-green-600',  // ID 2: Màu xanh lá cây
//   3: 'text-red-600',    // ID 3: Màu đỏ
//   4: 'text-blue-600',   // ID 4: Màu xanh dương
// };

// export default function Dashboard() {
//   const navigate = useNavigate();

//   // handleClaimClick removed as we now handle click in the View button

//   return (
//     <div className="w-full">
//       <div className="flex items-start justify-between mb-6">
//         <div>
//           <h1 className=" text-black text-3xl font-bold">Hello, EVM staff</h1>
//           <p className="text-gray-500">An overview of your works.</p>
//         </div>
//         <div className="flex items-center text-sm text-gray-600">
//                     <span>18 May, 2025</span>
//                     {/* <span><CalendarDots size={32} color="#393c3b" /></span> */}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//         {stats.map((s) => (
//           <div
//             key={s.id}
//             className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex justify-between items-center"
//           >
//             <div>
//               <div className={`${titleColorMap[s.id]} font-medium mb-2`}>
//                 {s.title}
//               </div>
//               <div className="text-3xl font-bold">{s.value}</div>
//               <div className="text-gray-600 text-sm mt-2">{s.subtitle}</div>
//             </div>
//             {/* <div className="text-gray-300">
//               {s.id === 2 ? (
//                 <CheckCircle size={27} color="#686262" weight="bold" />
//               ) : (
//                 <span>
//                   <Wrench size={27} color="#686262" weight="bold" />
//                 </span>
//               )}
//             </div> */}
//           </div>
//         ))}
//       </div>
      
//       <h2 className="text-xl font-semibold mb-4">Recent Claim Requests</h2>  
//       <div className="bg-white rounded-2xl p-6 border border-gray-200">
        

//         <div className="overflow-x-auto">
//           <table className="w-full table-fixed text-sm">
//             <thead>
//               <tr className="text-left text-gray-500 border-b">
//                 <th className="py-3 px-4 w-1/6">Order ID</th>
//                 <th className="py-3 px-4 w-1/4">Vehicle</th>
//                 <th className="py-3 px-4 w-1/3">Vin ID</th>
//                 <th className="py-3 px-4 w-1/6">Status</th>
//                 <th className="py-3 px-4 w-1/6">Claim Date</th>
//                 <th className="py-3 px-4 w-1/6">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {sampleRows.map((r) => (
//                 <tr 
//                   key={r.orderId} 
//                   className="border-b hover:bg-gray-50"
//                 >
//                   <td className="py-3 px-4">{r.orderId}</td>
//                   <td className="py-3 px-4">{r.vehicle}</td>
//                   <td className="py-3 px-4">{r.vin}</td>
                  
//                   <td className="py-3 px-4">
//                     <div className="flex items-center gap-2">
//                       <span
//                         className={`h-2 w-2 rounded-full ${
//                           r.status === "Done"
//                             ? "bg-green-400"
//                             : r.status === "Overdue"
//                             ? "bg-red-400"
//                             : r.status === "In Progress"
//                             ? "bg-yellow-400"
//                             : "bg-gray-300"
//                         }`}
//                       />
//                       <span className="text-gray-600">{r.status}</span>
//                     </div>
//                   </td>
//                   <td className="py-3 px-4">{r.claimDate}</td>
//                   <td className="py-3 px-4">
//                     <button 
//                       onClick={(e) => {
//                         e.preventDefault();
//                         navigate(`/evm-staff/claim/${r.orderId}`);
//                       }}
//                       className="text-indigo-600 hover:text-indigo-800 font-medium"
//                     >
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
//           <div>Showing 1 to 10 of 247 results</div>
//           <div className="flex items-center gap-3">
//             <button className="flex gap-1 items-center px-3 py-1 rounded-full bg-transparent border text-gray-600">
//               <CaretLeftIcon size={15} />
//               Previous
//             </button>
//             <button className="px-3 py-1 rounded-full bg-indigo-600 text-white">
//               1
//             </button>
//             <button className="px-3 py-1 rounded-full bg-transparent border text-gray-600">
//               2
//             </button>
//             <button className="px-3 py-1 rounded-full bg-transparent border text-gray-600">
//               3
//             </button>
//             <button className="px-3 py-1 rounded-full bg-transparent border text-gray-600">
//               4
//             </button>
//             <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-transparent border text-gray-600">
//               Next
//               <CaretRightIcon size={15} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useMemo, useState, useRef, useEffect } from "react";
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
import ClaimStatusDot from "../../../sc-technician/components/ClaimStatusDot";
import { useWarrantyClaims } from "../../../../../api/useWarrantyClaims";
import Loader from "../../../../../components/Loader";
import { ErrorNotification, SuccessNotification } from "../../../../../components/Notification";
import { useAuth } from "../../../../../app/AuthProvider";

export default function Dashboard() {
  const [openActionFor, setOpenActionFor] = useState(null);
  const menuRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  const [notification, setNotification] = useState(null);

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

  // ⚠️ CRITICAL: Declare user BEFORE using it in useEffect
  const { user } = useAuth();
  const { rows, loading, error, fetchClaims } = useWarrantyClaims(user?.userId);

  // 🔄 Refetch claims when returning from edit page
  useEffect(() => {
    if (location.state?.refresh && user?.userId && fetchClaims) {
      console.log("🔄 [ClaimRequestsPage] Refreshing claims list after edit...");
      console.log("🔄 [ClaimRequestsPage] Refresh timestamp:", location.state?.timestamp);
      
      // Delay slightly to ensure backend has processed
      setTimeout(async () => {
        try {
          await fetchClaims(user?.userId);
        } catch (err) {
          console.error("❌ [ClaimRequestsPage] Failed to refresh claims:", err);
        }
      }, 300);
      
      // Clear the refresh flag to prevent unnecessary refetches
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, user?.userId, fetchClaims, navigate, location.pathname]);

  const totalClaims = rows.filter(r => r.isActive === true).length;
  const approvedClaims = rows.filter((r) => r.claimStatus === "Accepted" && r.isActive === true).length;
  const rejectedClaims = rows.filter((r) => r.claimStatus === "Rejected" && r.isActive === true).length;

  if (loading) return <Loader />;
  if (error)
    return (
      <p className="text-red-500">Error loading claims: {error.message}</p>
    );

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
          icon={DotsThreeCircleIcon}
          iconColor={"#979AA3"}
        />
        <StatusCard
          title="Rejected Claims"
          titleColor="text-red-500"
          count={rejectedClaims}
          description="Currently in your queue"
          icon={CheckCircleIcon}
          iconColor={"#fb2c36"}
        />
        <StatusCard
          title="Active Campaigns"
          titleColor="text-red-500"
          count={"3"}
          description="Currently in your queue"
          icon={ClockIcon}
          iconColor={"#00a63e"}
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
              {rows
                .filter((r) => r.isActive)
                .map((r) => (
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
                  <td className="px-8 py-3 text-[13px] font-medium text-black">
                    <div className="flex items-center">
                      <ClaimStatusDot status={r.claimStatus} />
                      <span>{r.claimStatus}</span>
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
              ))}
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

      {/* Delete modal rendered here so it's inside component tree */}
      {/* <DeleteModal
        row={deletingRow}
        onCancel={() => setDeletingRow(null)}
        onSuccess={handleDeleteSuccess}
        onError={handleDeleteError}
      /> */}
      {/* ✅ Notification logic */}
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