import { useNavigate } from 'react-router-dom'
import {
  ListDashesIcon,
  CheckCircleIcon,
} from "@phosphor-icons/react";
import StatusCard from '../../../../components/StatusCard';
import DashboardHeader from '../components/DashboardHeader'
import ClaimsTable from '../components/ClaimsTable'
import { usePagination } from '../hooks/usePagination'
import { useDropdown } from '../hooks/useDropdown'
import { useSCStaffClaims } from '../../../../api/useSCStaffClaims'
import { useAuth } from '../../../../app/AuthProvider'
import Loader from '../../../../components/Loader'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  
  // Debug: Log user data to understand the structure
  console.log('Dashboard - User object:', user)
  console.log('Dashboard - serviceCenterId from user:', user?.serviceCenterId)
  
  // Debug function to test /auth/me endpoint
  window.testAuthMe = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      console.log('Test /auth/me response:', data);
      return data;
    } catch (error) {
      console.error('Test /auth/me error:', error);
    }
  };
  
  // Get serviceCenterId from user data
  const serviceCenterId = user?.serviceCenterId || null
  
  // Fetch claims data using the custom hook
  const { claims, stats, loading, error } = useSCStaffClaims(serviceCenterId)
  
  // Use custom hooks
  const { currentPage, totalPages, goToPage } = usePagination(1, Math.ceil(claims.length / 10))
  const { toggleDropdown, closeDropdown, openDropdown } = useDropdown()

  const handleViewDetails = (claimId) => {
    navigate(`/sc-staff/warranty-request/${claimId}`)
    closeDropdown()
  }

  // Enhanced stats with icons
  const statsWithIcons = [
    { 
      title: "Total Claims",
      count: stats.totalClaims.toString().padStart(2, '0'),
      description: "Currently in your queue",
      icon: ListDashesIcon, 
      iconColor: "#4f39f8" 
    },
    { 
      title: "Accepted Claims",
      count: stats.acceptedClaims.toString().padStart(2, '0'),
      description: "Successfully processed",
      icon: CheckCircleIcon, 
      iconColor: "#4f39f8" 
    }
  ]

  // Paginate claims for display (show 10 per page)
  const itemsPerPage = 10
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedClaims = claims.slice(startIndex, endIndex)
  
  // Calculate showing text
  const totalClaims = claims.length
  const showingStart = totalClaims > 0 ? startIndex + 1 : 0
  const showingEnd = Math.min(endIndex, totalClaims)
  const showingText = `Showing ${showingStart} to ${showingEnd} of ${totalClaims} results`

  // Show loader while fetching
  if (loading) {
    return (
      <div className="p-12 w-full flex justify-center items-center min-h-[400px]">
        <Loader />
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="p-12 w-full">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-medium">Error loading claims data</p>
          <p className="text-red-500 text-sm mt-2">{error.message || 'Please try again later'}</p>
        </div>
      </div>
    )
  }

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
        {claims.length > 0 ? (
          <ClaimsTable 
            claims={paginatedClaims}
            openDropdown={openDropdown}
            onToggleDropdown={toggleDropdown}
            onViewDetails={handleViewDetails}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            showingText={showingText}
          />
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
            <p className="text-gray-500 text-lg">No claims found</p>
            <p className="text-gray-400 text-sm mt-2">Claims will appear here when they are submitted</p>
          </div>
        )}
      </div>
    </div>
  )
}
