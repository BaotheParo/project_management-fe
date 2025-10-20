import React, { useState } from 'react'
import { CalendarBlank, DotsThree, CaretLeft, CaretRight } from 'phosphor-react'

const StatCard = ({ title, count, subtitle, color }) => (
  <div className="border-[3px] border-[#EBEBEB] rounded-2xl p-6 flex-1">
    <div className="flex items-center justify-between mb-4">
      <div className={`text-base font-medium ${color}`}>{title}</div>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.8125 3.75V16.25C17.8125 16.6644 17.6478 17.0618 17.3548 17.3549C17.0618 17.6479 16.6644 17.8125 16.25 17.8125H10.9375C10.6888 17.8125 10.4504 17.7137 10.2746 17.5379C10.0987 17.3621 9.99997 17.1236 9.99997 16.875C9.99997 16.6264 10.0987 16.3879 10.2746 16.2121C10.4504 16.0363 10.6888 15.9375 10.9375 15.9375H15.9375V4.0625H4.06247V10.9375C4.06247 11.1861 3.96369 11.4246 3.78788 11.6004C3.61206 11.7762 3.37361 11.875 3.12497 11.875C2.87633 11.875 2.63787 11.7762 2.46205 11.6004C2.28624 11.4246 2.18747 11.1861 2.18747 10.9375V3.75C2.18747 3.3356 2.35209 2.93817 2.64511 2.64515C2.93814 2.35212 3.33557 2.1875 3.74997 2.1875H16.25C16.6644 2.1875 17.0618 2.35212 17.3548 2.64515C17.6478 2.93817 17.8125 3.3356 17.8125 3.75ZM10.0382 11.8367C9.95115 11.7493 9.84766 11.68 9.7337 11.6327C9.61975 11.5853 9.49757 11.561 9.37418 11.561C9.2508 11.561 9.12862 11.5853 9.01467 11.6327C8.90071 11.68 8.79722 11.7493 8.71012 11.8367L4.99997 15.5469L3.78825 14.3367C3.70104 14.2495 3.59751 14.1803 3.48357 14.1331C3.36963 14.0859 3.24751 14.0617 3.12418 14.0617C3.00086 14.0617 2.87874 14.0859 2.7648 14.1331C2.65086 14.1803 2.54733 14.2495 2.46012 14.3367C2.37292 14.4239 2.30374 14.5275 2.25655 14.6414C2.20935 14.7553 2.18506 14.8775 2.18506 15.0008C2.18506 15.1241 2.20935 15.2462 2.25655 15.3602C2.30374 15.4741 2.37292 15.5776 2.46012 15.6648L4.33512 17.5398C4.42222 17.6272 4.52571 17.6966 4.63967 17.7439C4.75362 17.7912 4.8758 17.8156 4.99918 17.8156C5.12257 17.8156 5.24475 17.7912 5.3587 17.7439C5.47266 17.6966 5.57615 17.6272 5.66325 17.5398L10.0382 13.1648C10.1256 13.0777 10.195 12.9743 10.2423 12.8603C10.2896 12.7463 10.314 12.6242 10.314 12.5008C10.314 12.3774 10.2896 12.2552 10.2423 12.1413C10.195 12.0273 10.1256 11.9238 10.0382 11.8367Z" fill="#727674"/>
      </svg>
    </div>
    <div className="text-xl font-semibold text-black mb-1">{count}</div>
    <div className="text-[13px] font-medium text-[#686262]">{subtitle}</div>
  </div>
)

const StatusBadge = ({ status }) => {
  const statusConfig = {
    Pending: { color: '#CDD0D7', label: 'Pending' },
    Accepted: { color: '#7FD3B7', label: 'Accepted' },
    Rejected: { color: '#EB5757', label: 'Rejected' }
  }
  
  const config = statusConfig[status] || statusConfig.Pending
  
  return (
    <div className="flex items-center gap-2">
      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: config.color }} />
      <span className="text-xs font-medium text-black">{config.label}</span>
    </div>
  )
}

const partRequestsData = [
  { requestId: 'LSV1E7AL0MC123456', partCode: 'PIN12334SD', partName: 'Battery', status: 'Pending', requestDate: '2024-07-21' },
  { requestId: 'LSV1E7AL0MC123456', partCode: 'PIN12334SD', partName: 'Battery', status: 'Accepted', requestDate: '2024-07-21' },
  { requestId: 'LSV1E7AL0MC123456', partCode: 'PIN12334SD', partName: 'Battery', status: 'Pending', requestDate: '2024-07-21' },
  { requestId: 'LSV1E7AL0MC123456', partCode: 'PIN12334SD', partName: 'Battery', status: 'Rejected', requestDate: '2024-07-21' },
  { requestId: 'LSV1E7AL0MC123456', partCode: 'PIN12334SD', partName: 'Battery', status: 'Accepted', requestDate: '2024-07-21' },
  { requestId: 'LSV1E7AL0MC123456', partCode: 'PIN12334SD', partName: 'Battery', status: 'Accepted', requestDate: '2024-07-21' },
  { requestId: 'LSV1E7AL0MC123456', partCode: 'PIN12334SD', partName: 'Battery', status: 'Accepted', requestDate: '2024-07-21' },
  { requestId: 'LSV1E7AL0MC123456', partCode: 'PIN12334SD', partName: 'Battery', status: 'Pending', requestDate: '2024-07-21' },
  { requestId: 'LSV1E7AL0MC123456', partCode: 'PIN12334SD', partName: 'Battery', status: 'Pending', requestDate: '2024-07-21' },
  { requestId: 'LSV1E7AL0MC123456', partCode: 'PIN12334SD', partName: 'Battery', status: 'Pending', requestDate: '2024-07-21' },
  { requestId: 'LSV1E7AL0MC123456', partCode: 'PIN12334SD', partName: 'Battery', status: 'Pending', requestDate: '2024-07-21' },
]

export default function PartRequests() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 4
  const [openDropdown, setOpenDropdown] = useState(null)

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index)
  }

  return (
    <div className="p-12 w-full">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-[30px] font-semibold text-black mb-1">Hello, SC Staff!</h1>
          <p className="text-xl font-semibold text-[#929594]">An overview of your works.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-[17px] font-semibold text-[#393C3B]">16 May, 2025</span>
          <div className="w-[45px] h-[45px] rounded-full bg-[#F1F3F4] flex items-center justify-center">
            <CalendarBlank size={25} className="text-black" />
          </div>
        </div>
      </div>

      <div className="flex gap-6 mb-12">
        <StatCard 
          title="Pending" 
          count="3" 
          subtitle="Awaiting assignment"
          color="text-[#979AA3]"
        />
        <StatCard 
          title="Completed" 
          count="1" 
          subtitle="Being worked on"
          color="text-[#54C020]"
        />
        <StatCard 
          title="Rejected" 
          count="0" 
          subtitle="Finished today"
          color="text-[#EB5757]"
        />
      </div>

      <div>
        <h2 className="text-[25px] font-semibold text-black mb-6">Part Requests</h2>
        
        <div className="border-[3px] border-[#EBEBEB] rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-[#DEE1E6] bg-[#FAFAFA]">
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">Request ID</th>
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">Part Code</th>
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">Part Name</th>
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">Status</th>
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">Request Date</th>
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {partRequestsData.map((request, index) => (
                <tr key={index} className="border-b-2 border-[#DEE1E6] bg-white hover:bg-gray-50">
                  <td className="px-8 py-3 text-[13px] font-medium text-black">{request.requestId}</td>
                  <td className="px-8 py-3 text-[13px] font-medium text-black">{request.partCode}</td>
                  <td className="px-8 py-3 text-[13px] font-medium text-black">{request.partName}</td>
                  <td className="px-8 py-3">
                    <StatusBadge status={request.status} />
                  </td>
                  <td className="px-8 py-3 text-[13px] font-medium text-black">{request.requestDate}</td>
                  <td className="px-8 py-3 relative">
                    <button 
                      onClick={() => toggleDropdown(index)}
                      className="p-2 hover:bg-gray-100 rounded bg-transparent border-none cursor-pointer"
                    >
                      <DotsThree size={24} weight="bold" className="text-gray-700" />
                    </button>
                    
                    {openDropdown === index && (
                      <div className="absolute right-8 top-12 z-10">
                        <button 
                          className="px-4 py-2 border border-[#E5E5E5] rounded-xl bg-white shadow-md text-[12px] font-medium text-black hover:bg-gray-50"
                          onClick={() => {
                            console.log('View details for', request.requestId)
                            setOpenDropdown(null)
                          }}
                        >
                          View Details
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="flex items-center justify-between px-8 py-6 bg-white">
            <span className="text-xs font-normal text-black">Showing 1 to 10 of 247 results</span>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 bg-white text-xs font-medium text-black hover:text-[#626AE7] disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                <CaretLeft size={10} />
                Previous
              </button>
              
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-6 h-6 rounded-full text-xs font-medium flex items-center justify-center transition-colors ${
                      currentPage === page
                        ? 'bg-[#626AE7] text-white'
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
                className="flex items-center gap-1 bg-white text-xs font-medium text-black hover:text-[#626AE7] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <CaretRight size={10} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
