// import React, { useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ArrowLeftIcon } from "@phosphor-icons/react";
// import { useWarrantyClaims } from "../../../../../api/useWarrantyClaims";
// import Loader from "../../../../../components/Loader";

// const DashboardClaim = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const claimId = id;

//   useEffect(() => {
//     if (id) {
//       fetchClaimById(id);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);
  
//   const { row, fetchClaimById, loading, error } = useWarrantyClaims();

//   const handleBack = () => {
//     navigate("/evm-staff");
//   };

//   if (loading) return <Loader />;
//   if (error)
//     return (
//       <p className="text-red-500">Error loading claims: {error.message}</p>
//     );

//   // Get parts array from row and filter out null/undefined items
//   const parts = (row.parts || []).filter(part => part !== null && part !== undefined);

//   return (
//     <div className="w-full">
//       <div className="flex items-start justify-between mb-6">
//         <div>
//           <h1 className="text-3xl font-bold mb-2">Claim Details</h1>
//           <p className="text-gray-500">Review and process claim request.</p>
//         </div>
//       </div>

//       <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div className="rounded-2xl border-2 border-gray-200 p-6">
//           <h2 className="text-xl font-semibold text-gray-800 mb-6">
//             Basic Information
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
//             <div>
//               <div className="text-sm font-medium text-gray-500 mb-1">
//                 Claim ID
//               </div>
//               <div className="text-lg font-medium text-gray-900">{row.claimId}</div>
//             </div>
//             <div>
//               <div className="text-sm font-medium text-gray-500 mb-1">
//                 Claim Date
//               </div>
//               <div className="text-lg font-medium text-gray-900">
//                 {row.claimDate}
//               </div>
//             </div>
//             <div>
//               <div className="text-sm font-medium text-gray-500 mb-1">
//                 Created By
//               </div>
//               <div className="text-lg font-medium text-gray-900">
//                 {row.technicianName}
//               </div>
//             </div>
//             <div>
//               <div className="text-sm font-medium text-gray-500 mb-1">
//                 Service Center
//               </div>
//               <div className="text-lg font-medium text-gray-900">
//                 {row.serviceCenterName}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="rounded-2xl border-2 border-gray-200 p-6">
//           <h3 className="text-xl font-semibold text-gray-800 mb-6">
//             Vehicle Information
//           </h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <div className="text-sm font-medium text-gray-500 mb-1">
//                 VIN Code
//               </div>
//               <div className="text-lg font-medium text-gray-900">
//                 {row.vin}
//               </div>
//             </div>
//             <div>
//               <div className="text-sm font-medium text-gray-500 mb-1">
//                 Vehicle Name
//               </div>
//               <div className="text-lg font-medium text-gray-900">
//                 {row.vehicleName}
//               </div>
//             </div>
//             <div>
//               <div className="text-sm font-medium text-gray-500 mb-1">
//                 Current Mileage (km)
//               </div>
//               <div className="text-lg font-medium text-gray-900">
//                 {row.mileAge}
//               </div>
//             </div>
//             <div>
//               <div className="text-sm font-medium text-gray-500 mb-1">
//                 Purchase Date of Vehicle
//               </div>
//               <div className="text-lg font-medium text-gray-900">
//                 {row.purchaseDate}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Parts Information - Now displays all parts from API */}
//         <div className="rounded-2xl border-2 border-gray-200 p-6 md:col-span-2">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-xl font-semibold text-gray-800">
//               Parts Information
//             </h3>
//             <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full">
//               {parts.length} {parts.length === 1 ? 'Part' : 'Parts'}
//             </span>
//           </div>
//           {parts.length === 0 ? (
//             <div className="text-center py-8 text-gray-500">
//               No parts associated with this claim
//             </div>
//           ) : (
//             <div className="space-y-3">
//               {parts.map((part, index) => (
//                 <div
//                   key={part.partItemId || index}
//                   className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-indigo-300 transition-colors"
//                 >
//                   <div className="flex items-start gap-4">
//                     <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
//                       <span className="text-indigo-700 font-semibold text-sm">
//                         #{index + 1}
//                       </span>
//                     </div>
//                     <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
//                       <div>
//                         <div className="text-xs font-medium text-gray-500 mb-1">
//                           Part Name
//                         </div>
//                         <div className="text-sm font-semibold text-gray-900">
//                           {part.partName || "N/A"}
//                         </div>
//                       </div>
//                       <div>
//                         <div className="text-xs font-medium text-gray-500 mb-1">
//                           Part Number
//                         </div>
//                         <div className="text-sm font-medium text-gray-900">
//                           {part.partNumber || "N/A"}
//                         </div>
//                       </div>
//                       <div>
//                         <div className="text-xs font-medium text-gray-500 mb-1">
//                           Part ID
//                         </div>
//                         <div className="text-sm font-medium text-gray-600 truncate" title={part.partId}>
//                           {part.partId ? `${part.partId.substring(0, 20)}...` : "N/A"}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="rounded-2xl border-2 border-gray-200 p-6">
//           <h3 className="text-xl font-semibold text-gray-800 mb-6">
//             Issue Details
//           </h3>
//           <div>
//             <div className="text-sm font-medium text-gray-500 mb-2">
//               Issue Description
//             </div>
//             <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
//               <p className="text-base text-gray-700 leading-relaxed">
//                 {row.issueDescription}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="rounded-2xl border-2 border-gray-200 p-6">
//           <h3 className="text-xl font-semibold text-gray-800 mb-6">
//             Evidence Upload
//           </h3>
//           <div>
//             <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
//               <p className="text-base text-gray-600">Images/Attachments</p>
//             </div>
//           </div>
//         </div>

//         <div className="rounded-2xl border-2 border-gray-200 p-6">
//           <h3 className="text-xl font-semibold text-gray-800 mb-6">
//             Service Center Request
//           </h3>
//           <div className="space-y-4">
//             {row.actionDisplay && (
//               <div className="mb-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
//                 <p className="text-sm font-medium text-indigo-900">
//                   {row.actionDisplay}
//                 </p>
//               </div>
//             )}
//             <div className="flex items-center gap-3">
//               <input
//                 type="checkbox"
//                 checked={(row.action & 1) !== 0}
//                 disabled
//                 className="w-4 h-4 text-indigo-600 rounded border-gray-300"
//               />
//               <span className="text-base text-gray-700">
//                 Request replacement part approval
//               </span>
//             </div>
//             <div className="flex items-center gap-3">
//               <input
//                 type="checkbox"
//                 checked={(row.action & 2) !== 0}
//                 disabled
//                 className="w-4 h-4 text-indigo-600 rounded border-gray-300"
//               />
//               <span className="text-base text-gray-700">
//                 Request repair approval
//               </span>
//             </div>
//             <div className="flex items-center gap-3">
//               <input
//                 type="checkbox"
//                 checked={(row.action & 4) !== 0}
//                 disabled
//                 className="w-4 h-4 text-indigo-600 rounded border-gray-300"
//               />
//               <span className="text-base text-gray-700">
//                 Request reimbursement (repair completed in advance)
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="rounded-2xl border-2 border-gray-200 p-6">
//           <h3 className="text-lg font-semibold text-gray-700 mb-4">
//             Action Required
//           </h3>
//           <div className="space-y-4">
//             <p className="text-gray-600">
//               Please review the claim details carefully before taking any
//               action.
//             </p>
//             <div className="flex flex-col gap-3">
//               <button
//                 onClick={() =>
//                   navigate(`/evm-staff/claim/${claimId}/part-supply`)
//                 }
//                 className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium cursor-pointer"
//               >
//                 Approve Claim
//               </button>
//               <button
//                 onClick={() => navigate(`/evm-staff/claim/${claimId}/reject`)}
//                 className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
//               >
//                 Reject Claim
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="col-span-full flex justify-center mt-6">
//           <button
//             onClick={handleBack}
//             className="flex items-center gap-2 px-6 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <ArrowLeftIcon size={20} />
//             Back to Dashboard
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default DashboardClaim;

import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import { useWarrantyClaims } from "../../../../../api/useWarrantyClaims";
import Loader from "../../../../../components/Loader";

const DashboardClaim = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const claimId = id;
  
  // ✅ Hook must be called BEFORE useEffect
  const { row, fetchClaimById, loading, error } = useWarrantyClaims();

  useEffect(() => {
    console.log("DashboardClaim mounted with id:", id);
    if (id) {
      console.log("Fetching claim by ID:", id);
      fetchClaimById(id);
    }
  }, [id]); // Removed fetchClaimById from dependencies

  const handleBack = () => {
    navigate("/evm-staff");
  };

  console.log("DashboardClaim render - loading:", loading, "error:", error, "row:", row);

  if (loading) return <Loader />;
  if (error)
    return (
      <p className="text-red-500">Error loading claims: {error.message}</p>
    );

  if (!row) {
    return (
      <div className="p-8">
        <p className="text-gray-600">No claim data found.</p>
        <button
          onClick={handleBack}
          className="mt-4 px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  // Get parts array from row and filter out null/undefined items
  const parts = (row.parts || []).filter(part => part !== null && part !== undefined);

  return (
    <div className="w-full">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Claim Details</h1>
          <p className="text-gray-500">Review and process claim request.</p>
        </div>
      </div>

      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-2xl border-2 border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">
                Claim ID
              </div>
              <div className="text-lg font-medium text-gray-900">{row.claimId}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">
                Claim Date
              </div>
              <div className="text-lg font-medium text-gray-900">
                {row.claimDate}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">
                Created By
              </div>
              <div className="text-lg font-medium text-gray-900">
                {row.technicianName}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">
                Service Center
              </div>
              <div className="text-lg font-medium text-gray-900">
                {row.serviceCenterName}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Vehicle Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">
                VIN Code
              </div>
              <div className="text-lg font-medium text-gray-900">
                {row.vin}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">
                Vehicle Name
              </div>
              <div className="text-lg font-medium text-gray-900">
                {row.vehicleName}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">
                Current Mileage (km)
              </div>
              <div className="text-lg font-medium text-gray-900">
                {row.mileAge}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">
                Purchase Date of Vehicle
              </div>
              <div className="text-lg font-medium text-gray-900">
                {row.purchaseDate}
              </div>
            </div>
          </div>
        </div>

        {/* Parts Information - Now displays all parts from API */}
        <div className="rounded-2xl border-2 border-gray-200 p-6 md:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Parts Information
            </h3>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full">
              {parts.length} {parts.length === 1 ? 'Part' : 'Parts'}
            </span>
          </div>
          {parts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No parts associated with this claim
            </div>
          ) : (
            <div className="space-y-3">
              {parts.map((part, index) => (
                <div
                  key={part.partItemId || index}
                  className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-indigo-300 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <span className="text-indigo-700 font-semibold text-sm">
                        #{index + 1}
                      </span>
                    </div>
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs font-medium text-gray-500 mb-1">
                          Part Name
                        </div>
                        <div className="text-sm font-semibold text-gray-900">
                          {part.partName || "N/A"}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500 mb-1">
                          Part Number
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {part.partNumber || "N/A"}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500 mb-1">
                          Part ID
                        </div>
                        <div className="text-sm font-medium text-gray-600 truncate" title={part.partId}>
                          {part.partId ? `${part.partId.substring(0, 20)}...` : "N/A"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border-2 border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Issue Details
          </h3>
          <div>
            <div className="text-sm font-medium text-gray-500 mb-2">
              Issue Description
            </div>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-base text-gray-700 leading-relaxed">
                {row.issueDescription}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Evidence Upload
          </h3>
          <div>
            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
              <p className="text-base text-gray-600">Images/Attachments</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Service Center Request
          </h3>
          <div className="space-y-4">
            {row.actionDisplay && (
              <div className="mb-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                <p className="text-sm font-medium text-indigo-900">
                  {row.actionDisplay}
                </p>
              </div>
            )}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={(row.action & 1) !== 0}
                disabled
                className="w-4 h-4 text-indigo-600 rounded border-gray-300"
              />
              <span className="text-base text-gray-700">
                Request replacement part approval
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={(row.action & 2) !== 0}
                disabled
                className="w-4 h-4 text-indigo-600 rounded border-gray-300"
              />
              <span className="text-base text-gray-700">
                Request repair approval
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={(row.action & 4) !== 0}
                disabled
                className="w-4 h-4 text-indigo-600 rounded border-gray-300"
              />
              <span className="text-base text-gray-700">
                Request reimbursement (repair completed in advance)
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Action Required
          </h3>
          <div className="space-y-4">
            <p className="text-gray-600">
              Please review the claim details carefully before taking any
              action.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  console.log("Navigating to part-supply with claimId:", claimId);
                  navigate(`/evm-staff/claim/part-supply/${claimId}`);
                }}
                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium cursor-pointer"
              >
                Approve Claim
              </button>
              <button
                onClick={() => navigate(`/evm-staff/claim/${claimId}/reject`)}
                className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Reject Claim
              </button>
            </div>
          </div>
        </div>

        <div className="col-span-full flex justify-center mt-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-6 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeftIcon size={20} />
            Back to Dashboard
          </button>
        </div>
      </section>
    </div>
  );
};

export default DashboardClaim;