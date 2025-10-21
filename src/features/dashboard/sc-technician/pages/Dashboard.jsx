import React, { useState } from 'react'
import { CheckCircleIcon, WrenchIcon, CaretLeftIcon, CaretRightIcon, CalendarBlankIcon } from '@phosphor-icons/react'

const StatsCard = ({ title, count, subtitle, icon: Icon }) => (
  <div className="border-[3px] border-[#EBEBEB] bg-white rounded-2xl p-8 min-w-[492px]">
    <div className="flex items-start justify-between mb-4">
      <h3 className="text-xl font-semibold text-indigo-600">{title}</h3>
      {Icon && <Icon size={27} className="text-[#686262]" />}
    </div>
    <div className="text-[30px] font-semibold text-black mb-2">{count}</div>
    <div className="text-base font-medium text-[#686262]">{subtitle}</div>
  </div>
)

const sampleRows = Array.from({ length: 10 }).map((_, i) => ({
  orderId: `RO-00${i + 1}`,
  vehicle: 'VinFast VF-3',
  vin: 'LSV1E7AL0MC123456',
  status: ['On hold', 'Done', 'On hold', 'Overdue', 'In Progress', 'On hold', 'On hold', 'Done', 'On hold', 'In Progress'][i],
  claimDate: '2024-07-21',
}))

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 4

  return (
    <div className="w-full">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className=" text-black text-3xl font-bold">Hello, Jso!</h1>
          <p className="text-gray-500">An overview of your works.</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[17px] font-semibold text-[#393C3B]">16 May, 2025</span>
          <div className="w-[45px] h-[45px] rounded-full bg-[#F1F3F4] flex items-center justify-center">
            <CalendarBlankIcon size={25} className="text-black" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20 mb-12">
        <StatsCard 
          title="Total Claims" 
          count="12" 
          subtitle="Currently in your queue" 
          icon={WrenchIcon}
        />
        <StatsCard 
          title="Accepted Requests" 
          count="04" 
          subtitle="Currently in your queue" 
          icon={CheckCircleIcon}
        />
      </div>

      <div>
        <h2 className="text-[25px] font-semibold text-black mb-6">Active Repair Orders</h2>

        <div className="border-[3px] border-[#EBEBEB] rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-[#DEE1E6] bg-[#FAFAFA]">
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">Order ID</th>
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">Vehicle</th>
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">Vin ID</th>
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">Status</th>
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">Claim Date</th>
              </tr>
            </thead>
            <tbody>
              {sampleRows.map((r) => (
                <tr key={r.orderId} className="border-b-2 border-[#DEE1E6] bg-white hover:bg-gray-50">
                  <td className="px-8 py-3 text-[13px] font-medium text-black">{r.orderId}</td>
                  <td className="px-8 py-3 text-[13px] font-medium text-black">{r.vehicle}</td>
                  <td className="px-8 py-3 text-[13px] font-medium text-black">{r.vin}</td>
                  <td className="px-8 py-3 text-[13px] font-medium text-black">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          r.status === "Done"
                            ? "bg-green-400"
                            : r.status === "Overdue"
                            ? "bg-red-400"
                            : r.status === "In Progress"
                            ? "bg-yellow-400"
                            : "bg-gray-300"
                        }`}
                      />
                      <span className="text-gray-600">{r.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-3 text-[13px] font-medium text-black">{r.claimDate}</td>
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
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-[#727674] hover:text-black'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button 
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
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



