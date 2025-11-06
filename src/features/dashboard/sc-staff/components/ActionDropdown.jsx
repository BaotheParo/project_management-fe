import { DotsThree } from 'phosphor-react'

export default function ActionDropdown({ 
  isOpen, 
  onToggle, 
  onViewDetails
}) {
  return (
    <div className="relative">
      <button 
        onClick={onToggle}
        className="p-2 hover:bg-gray-100 rounded bg-transparent border-none cursor-pointer"
      >
        <DotsThree size={24} weight="bold" className="text-gray-700" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-12 z-10">
          <button
            className="px-4 py-2 border border-[#E5E5E5] rounded-xl bg-white shadow-md text-[12px] font-medium text-black hover:bg-gray-50 whitespace-nowrap"
            onClick={onViewDetails}
          >
            View Details
          </button>
        </div>
      )}
    </div>
  )
}