import React from 'react'

export default function PriorityFilter({ 
  selectedPriority = 'All Priority', 
  onPriorityChange = () => {},
  priorities = ['All Priority', 'HIGH', 'MEDIUM', 'LOW']
}) {
  return (
    <div className="flex rounded-xl">
      <select
        className="text-sm font-semibold"
        value={selectedPriority}
        onChange={(e) => onPriorityChange(e.target.value)}
        aria-label="Filter by priority"
      >
        {priorities.map((p) => (
          <option key={p} value={p} className="text-black">
            {p}
          </option>
        ))}
      </select>
    </div>
  )
}