import React, { useEffect, useState } from "react";
// 1. Thêm useLocation
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeftIcon } from "@phosphor-icons/react";
// 2. Import claimAPI (Giả sử bạn đã có file này)
import claimAPI from "../../../../../api/claimAPI";

const DashboardClaim = () => {
  const navigate = useNavigate();
  const { claimId } = useParams();

  // 3. Lấy location để truy cập 'state'
  const location = useLocation();

  // 4. Ưu tiên dùng dữ liệu 'state' được truyền qua
  //    Nếu không có (do refresh), dùng 'null'
  const [claim, setClaim] = useState(location.state?.claim || null);

  // 5. Vẫn giữ loading/error, nhưng 'loading' có thể là false nếu đã có state
  const [loading, setLoading] = useState(location.state?.claim ? false : true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedClaim = await claimAPI.getClaimById(claimId);
        setClaim(fetchedClaim);
        setError(null);
        console.log("Fetched claim:", fetchedClaim);
      } catch (error) {
        setError(error);
        console.error("Error fetching claim:", error);
      } finally {
        setLoading(false);
      }
    };

    // 6. Quyết định khi nào cần fetch
    // Nếu chưa có claim (do refresh trang), phải fetch
    // Hoặc nếu claimId trên URL không khớp với claimId trong state (do click link mới)
    if (!claim || claim.claimId !== claimId) {
      fetchData();
    }

    // 7. THAY ĐỔI QUAN TRỌNG NHẤT: Thêm [claimId] vào dependency
    //    Cũng thêm 'claim' và 'claimId' vào để logic bên trong được cập nhật
  }, [claimId, claim]);

  const handleBack = () => {
    navigate("/evm-staff");
  };

  // 8. Thêm trạng thái Loading và Error
  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading claim details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">Error: {error.message}</div>
    );
  }

  // 9. Thêm check nếu không có claim
  if (!claim) {
    return (
      <div className="p-6 text-center text-gray-500">Claim not found.</div>
    );
  }

  return (
    <div className="w-full">
      {/* ...Phần còn lại của JSX... */}
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
              <div className="text-lg font-medium text-gray-900">
                {/* 10. Dùng claim từ state an toàn hơn */}
                {claim.claimId || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">
                Claim Date
              </div>
              <div className="text-lg font-medium text-gray-900">
                {claim.claimDate || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">
                Created By
              </div>
              <div className="text-lg font-medium text-gray-900">Jso</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">
                Service Center
              </div>
              <div className="text-lg font-medium text-gray-900">
                WC-2003-9192332
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">
                Manufacturer
              </div>
              <div className="text-lg font-medium text-gray-900">
                {claim.manufacturer || "N/A"}
              </div>
            </div>
          </div>
        </div>

        {/* ... Các ô thông tin khác (Vehicle, Part, Issue)... */}
        {/* Đảm bảo tất cả đều dùng claim.PROPERTY */}
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
                {claim.vin || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">
                Vehicle Name
              </div>
              <div className="text-lg font-medium text-gray-900">
                {claim.vehicleName || "N/A"}
              </div>
            </div>
            {/* ... các trường vehicle khác ... */}
          </div>
        </div>

        <div className="rounded-2xl border-2 border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Part Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">
                Part Name
              </div>
              <div className="text-lg font-medium text-gray-900">
                {claim.partName || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">
                Part Code
              </div>
              <div className="text-lg font-medium text-gray-900">
                {claim.partId || "N/A"}
              </div>
            </div>
            {/* ... các trường part khác ... */}
          </div>
        </div>

        {/* ... Các phần còn lại không đổi ... */}

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
                onClick={() =>
                  navigate(`/evm-staff/claim/${claimId}/part-supply`)
                }
                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
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
