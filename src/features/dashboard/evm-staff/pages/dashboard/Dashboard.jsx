import React, { useEffect, useState } from "react";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import claimAPI from "../../../../../api/claimAPI";

const stats = [
  {
    id: 1,
    title: "Total Incoming Claims",
    value: "237",
    subtitle: "Pending review",
  },
  { id: 2, title: "Approved Claims", value: "1,842", subtitle: "This month" },
  { id: 3, title: "Rejected Claims", value: "156", subtitle: "This month" },
  {
    id: 4,
    title: "Active Campaigns",
    value: "12",
    subtitle: "Currently running",
  },
];

// 1. Xóa 'sampleRows' vì chúng ta sẽ dùng dữ liệu từ API
// const sampleRows = Array.from({ length: 10 }).map((_, i) => ({ ... }));

const titleColorMap = {
  1: "text-gray-400", // ID 1: Màu xám
  2: "text-green-600", // ID 2: Màu xanh lá cây
  3: "text-red-600", // ID 3: Màu đỏ
  4: "text-blue-600", // ID 4: Màu xanh dương
};

export default function Dashboard() {
  const navigate = useNavigate();

  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedClaims = await claimAPI.getAllClaims();
        setClaims(fetchedClaims);
        setError(null);
        console.log("Fetched claims:", fetchedClaims);
      } catch (error) {
        setError(error);
        console.error("Error fetching claims:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full">
      {/* ...Phần tiêu đề và stats (không đổi) ... */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className=" text-black text-3xl font-bold">Hello, EVM staff</h1>
          <p className="text-gray-500">An overview of your works.</p>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span>18 May, 2025</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((s) => (
          <div
            key={s.id}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex justify-between items-center"
          >
            <div>
              <div className={`${titleColorMap[s.id]} font-medium mb-2`}>
                {s.title}
              </div>
              <div className="text-3xl font-bold">{s.value}</div>
              <div className="text-gray-600 text-sm mt-2">{s.subtitle}</div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">Recent Claim Requests</h2>
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-3 px-4 w-1/6">Claim ID</th>
                <th className="py-3 px-4 w-1/4">Vehicle name</th>
                <th className="py-3 px-4 w-1/3">Vin ID</th>
                <th className="py-3 px-4 w-1/6">Status</th>
                <th className="py-3 px-4 w-1/6">Claim Date</th>
                <th className="py-3 px-4 w-1/6">Action</th>
              </tr>
            </thead>

            {/* 2. Cập nhật <tbody> để render dựa trên state */}
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    Loading claims...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-red-500">
                    Error fetching data: {error.message}
                  </td>
                </tr>
              ) : claims.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No recent claims found.
                  </td>
                </tr>
              ) : (
                // 3. Dùng 'claims.map' thay vì 'sampleRows.map'
                //    'r' bây giờ là một object claim từ API
                claims.map((r) => (
                  <tr key={r.claimId} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{r.claimId}</td>
                    <td className="py-3 px-4">{r.vehicleName}</td>
                    <td className="py-3 px-4">{r.vin}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            r.claimStatus === "0"
                              ? "bg-green-400"
                              : "bg-red-400"
                          }`}
                        />
                        {/* <span className="text-gray-600">{r.claimStatus}</span> */}
                      </div>
                    </td>
                    <td className="py-3 px-4">{r.claimDate}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          // Giả sử API trả về 'claimId' cho mỗi claim
                          navigate(`/evm-staff/claim/${r.claimId}`, {
                            state: { claim: r },
                          });
                        }}
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ...Phần Pagination (không đổi) ... */}
        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <div>Showing 1 to 10 of 247 results</div>
          <div className="flex items-center gap-3">
            <button className="flex gap-1 items-center px-3 py-1 rounded-full bg-transparent border text-gray-600">
              <CaretLeftIcon size={15} />
              Previous
            </button>
            <button className="px-3 py-1 rounded-full bg-indigo-600 text-white">
              1
            </button>
            <button className="px-3 py-1 rounded-full bg-transparent border text-gray-600">
              2
            </button>
            <button className="px-3 py-1 rounded-full bg-transparent border text-gray-600">
              3
            </button>
            <button className="px-3 py-1 rounded-full bg-transparent border text-gray-600">
              4
            </button>
            <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-transparent border text-gray-600">
              Next
              <CaretRightIcon size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
