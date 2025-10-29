import { useNavigate } from 'react-router-dom'
import { CheckCircle } from 'phosphor-react'
import StatusCard from '../components/StatusCard';
import DashboardHeader from '../components/DashboardHeader'
import ClaimsTable from '../components/ClaimsTable'
import { DASHBOARD_CLAIMS_DATA, DASHBOARD_STATS } from '../constants/dashboardData'
import { usePagination } from '../hooks/usePagination'
import { useDropdown } from '../hooks/useDropdown'

export default function Dashboard() {
  const navigate = useNavigate()
  
  // Use custom hooks
  const { currentPage, totalPages, goToPage } = usePagination(1, 4)
  const { toggleDropdown, closeDropdown, openDropdown } = useDropdown()

  const handleViewDetails = (claimId) => {
    navigate(`/sc-staff/warranty-request/${claimId}`)
    closeDropdown()
  }

  // Enhanced stats with icons
  const statsWithIcons = [
    { ...DASHBOARD_STATS[0] },
    { ...DASHBOARD_STATS[1], icon: CheckCircle }
  ]

  return (
    <div className="p-12 w-full">
      {/* Header */}
      <DashboardHeader />

      {/* Stats Cards */}
      <div className="flex gap-8 mb-12">
        {statsWithIcons.map((stat, index) => (
          <StatusCard key={index} {...stat} />
        ))}
      </div>

      {/* Claims Section */}
      <div>
        <h2 className="text-[25px] font-semibold text-black mb-6">Newest Received Claims</h2>
        
        {/* Claims Table with Pagination */}
        <ClaimsTable 
          claims={DASHBOARD_CLAIMS_DATA}
          openDropdown={openDropdown}
          onToggleDropdown={toggleDropdown}
          onViewDetails={handleViewDetails}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          showingText="Showing 1 to 10 of 247 results"
        />
      </div>
    </div>
  )
}
