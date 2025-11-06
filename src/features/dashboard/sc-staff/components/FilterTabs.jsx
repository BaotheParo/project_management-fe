const FilterTabs = ({ filters, activeFilter, onFilterChange, getFilterCount }) => {
  return (
    <div className="flex items-center gap-2 bg-[#F1F3F4] rounded-xl px-2 py-2 overflow-x-auto">
      {filters.map((filter) => {
        const count = getFilterCount(filter)
        
        return (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-3 py-1.5 rounded-md text-sm font-semibold whitespace-nowrap transition-colors ${
              activeFilter === filter
                ? 'bg-[#626AE7] text-white'
                : 'bg-transparent text-black hover:bg-white'
            }`}
          >
            {filter} {filter !== 'All' && `(${count})`}
          </button>
        )
      })}
    </div>
  )
}

export default FilterTabs