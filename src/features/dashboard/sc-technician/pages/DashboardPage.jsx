import React, { useState } from 'react'
import { CheckCircleIcon, CaretLeftIcon, CaretRightIcon, CalendarBlankIcon, ListDashesIcon, ListIcon } from '@phosphor-icons/react'
import StatusCard from '../components/StatusCard'
import { useWarrantyClaims } from '../../../../api/useWarrantyClaims'
import Loader from '../../../../components/Loader'
import StatusDot from '../components/StatusDot'

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 4

  const { rows, loading, error } = useWarrantyClaims();
  
  const totalClaims = rows.length;
  const acceptedClaims = rows.filter(r => r.status === "Done").length;

  if (loading) return <Loader />;
  if (error) 
    return (
    <p className="text-red-500">
      Error loading claims: {error.message}
    </p>
  );

  return (
    <div className="w-full">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className=" text-black text-3xl font-bold">Hello, Jso!</h1>
          <p className="text-gray-500">An overview of your works.</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[17px] font-semibold text-[#393C3B]">
            16 May, 2025
          </span>
          <div className="w-[45px] h-[45px] rounded-full bg-[#F1F3F4] flex items-center justify-center">
            <CalendarBlankIcon size={25} className="text-black" />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 mt-20 mb-12">
        <StatusCard
          title="Total Requests"
          titleColor="text-indigo-600"
          count={totalClaims}
          description="Currently in your queue"
          icon={ListDashesIcon}
          iconColor={"#4f39f8"}
        />
        <StatusCard
          title="Accepted Requests"
          titleColor="text-indigo-600"
          count={acceptedClaims}
          description="Currently accepted"
          icon={CheckCircleIcon}
          iconColor={"#4f39f8"}
        />
        <StatusCard
          title="Total Works"
          titleColor="text-indigo-600"
          count="3"
          description="Currently in your queue"
          icon={ListIcon}
          iconColor={"#4f39f8"}
        />
      </div>

      <div>
        <h2 className="text-[25px] font-semibold text-black mb-6">
          Active Repair Orders
        </h2>

        <div className="border-[3px] border-[#EBEBEB] rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-[#DEE1E6] bg-[#FAFAFA]">
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">
                  Order ID
                </th>
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">
                  Vehicle
                </th>
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">
                  Vin ID
                </th>
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">
                  Status
                </th>
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">
                  Claim Date
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.orderId}
                  className="border-b-2 border-[#DEE1E6] bg-white hover:bg-gray-50"
                >
                  <td className="px-8 py-3 text-[13px] font-medium text-black">
                    {r.orderId}
                  </td>
                  <td className="px-8 py-3 text-[13px] font-medium text-black">
                    {r.vehicle}
                  </td>
                  <td className="px-8 py-3 text-[13px] font-medium text-black">
                    {r.vin}
                  </td>
                  <td className="px-8 py-3 text-[13px] font-medium text-black">
                    <div className="flex items-center">
                      <StatusDot status={r.status} />
                      <span>{r.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-3 text-[13px] font-medium text-black">
                    {r.claimDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-8 text-sm text-gray-600">
          <div>Showing 1 to 10 of 247 results</div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 bg-white text-[12px] font-semibold text-black hover:text-indigo-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <CaretLeftIcon size={12} />
              Previous
            </button>

            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-full text-[12px] font-medium flex items-center justify-center transition-colors cursor-pointer ${
                    currentPage === page
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-[#727674] hover:text-black"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 bg-white text-[12px] font-medium text-black hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <CaretRightIcon size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



