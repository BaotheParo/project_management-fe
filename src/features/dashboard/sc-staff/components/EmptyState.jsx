const EmptyState = ({ 
  title = "No Order Found", 
  message = "Try adjusting your search or filters",
  icon 
}) => {
  const DefaultIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="2" fill="#727674"/>
      <circle cx="16" cy="10" r="1.5" fill="#727674"/>
      <circle cx="16" cy="22" r="1.5" fill="#727674"/>
    </svg>
  )

  return (
    <div className="flex flex-col items-center justify-center py-20 bg-[#F8F9FA] rounded-2xl">
      <div className="w-16 h-16 rounded-full bg-[#E5E5E5] flex items-center justify-center mb-4">
        {icon || <DefaultIcon />}
      </div>
      <h3 className="text-xl font-semibold text-black mb-2">{title}</h3>
      <p className="text-sm text-[#929594]">{message}</p>
    </div>
  )
}

export default EmptyState