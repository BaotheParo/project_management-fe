import ActionDropdown from './ActionDropdown'
import Pagination from './Pagination'

export default function ClaimsTable({ 
  claims, 
  openDropdown, 
  onToggleDropdown, 
  onViewDetails,
  // Pagination props
  currentPage,
  totalPages,
  onPageChange,
  showingText
}) {
  return (
    <div className="border-[3px] border-[#EBEBEB] rounded-2xl overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-[#DEE1E6] bg-[#FAFAFA]">
            <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">Claim ID</th>
            <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">Vehicle</th>
            <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">Vin ID</th>
            <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">Requester</th>
            <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">Status</th>
            <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">Sent Date</th>
            <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim, index) => (
            <tr key={index} className="border-b-2 border-[#DEE1E6] bg-white hover:bg-gray-50">
              <td className="px-8 py-3 text-[13px] font-medium text-black">{claim.id}</td>
              <td className="px-8 py-3 text-[13px] font-medium text-black">{claim.vehicle}</td>
              <td className="px-8 py-3 text-[13px] font-medium text-black">{claim.vin}</td>
              <td className="px-8 py-3 text-[13px] font-medium text-black">{claim.requester}</td>
              <td className="px-8 py-3">
                <span className={`px-3 py-1 rounded-full text-[11px] font-semibold ${
                  claim.statusCode === 0 ? 'bg-[#FFF1C9] text-[#E29A00]' :
                  claim.statusCode === 1 ? 'bg-[#E8F5E9] text-[#54C020]' :
                  claim.statusCode === 2 ? 'bg-[#FFE4E4] text-[#FF3232]' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {claim.status}
                </span>
              </td>
              <td className="px-8 py-3 text-[13px] font-medium text-black">{claim.date}</td>
              <td className="px-8 py-3">
                <ActionDropdown
                  isOpen={openDropdown === index}
                  onToggle={() => onToggleDropdown(index)}
                  onViewDetails={() => onViewDetails(claim.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Pagination */}
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        showingText={showingText}
      />
    </div>
  )
}