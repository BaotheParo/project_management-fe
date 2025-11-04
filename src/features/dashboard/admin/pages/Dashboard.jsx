import React, { useState } from 'react'
import { Users, Buildings, Wrench, DotsThree, CalendarBlank, CaretLeft, CaretRight } from 'phosphor-react'
import { useAdminApi } from '../../../../api/useAdminApi'
import Loader from '../../../../components/Loader'

const StatsCard = ({ title, count, subtitle, icon: Icon }) => (
  <div className="border-[3px] border-[#EBEBEB] rounded-2xl p-8 flex-1">
    <div className="flex items-start justify-between mb-4">
      <h3 className="text-xl font-medium text-[#626AE7]">{title}</h3>
      {Icon && <Icon size={27} className="text-[#686262]" />}
    </div>
    <div className="text-[30px] font-semibold text-black mb-2">{count}</div>
    <div className="text-base font-medium text-[#686262]">{subtitle}</div>
  </div>
)

export default function Dashboard() {
  const { users, stats, loading, error } = useAdminApi()
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 3
  const [openDropdown, setOpenDropdown] = useState(null)

  // Get recent users (last 7)
  const recentUsers = users.slice(0, 7).map(user => ({
    id: user.id || user.userId,
    name: user.name || user.fullName || user.userName,
    email: user.email,
    role: user.role || user.roleName,
    date: user.joinDate || user.createdAt ? new Date(user.joinDate || user.createdAt).toISOString().split('T')[0] : 'N/A'
  }))

  if (loading) return <Loader />
  
  // Log data source for debugging
  console.log("📊 Dashboard Data:", { 
    totalUsers: users.length, 
    hasError: !!error,
    dataSource: error ? "Mock Data (API Failed)" : "Backend API",
    stats 
  })

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index)
  }

  const handleViewDetails = (userId) => {
    // TODO: Implement user detail page
    console.log("View user details:", userId);
    alert(`User Details for ID: ${userId}\n\nUser detail page coming soon!`);
    setOpenDropdown(null);
  }

  return (
    <div className="p-12 w-full">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-[30px] font-semibold text-black mb-1">Hello, Admin!</h1>
          <p className="text-xl font-semibold text-[#929594]">Welcome to the System Dashboard.</p>
          {error && (
            <div className="mt-2 px-4 py-2 bg-yellow-100 border border-yellow-400 rounded-lg text-sm text-yellow-800 inline-flex items-center gap-2">
              ⚠️ Using Mock Data - Backend Connection Failed
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-[17px] font-semibold text-[#393C3B]">31 October, 2025</span>
          <div className="w-[45px] h-[45px] rounded-full bg-[#F1F3F4] flex items-center justify-center">
            <CalendarBlank size={25} className="text-black" />
          </div>
        </div>
      </div>

      <div className="flex gap-8 mb-12">
        <StatsCard 
          title="Total Users" 
          count={stats.totalUsers.toString()} 
          subtitle="Across all roles" 
          icon={Users}
        />
        <StatsCard 
          title="Service Centers" 
          count={stats.totalServiceCenters.toString()} 
          subtitle="Nationwide locations" 
          icon={Buildings}
        />
        <StatsCard 
          title="Total Policies" 
          count={stats.totalPolicies.toString()} 
          subtitle="Active warranty policies" 
          icon={Wrench}
        />
      </div>

      <div>
        <h2 className="text-[25px] font-semibold text-black mb-6">Recent User Registrations</h2>
        
        <div className="border-[3px] border-[#EBEBEB] rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-[#DEE1E6] bg-[#FAFAFA]">
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">User ID</th>
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">Name</th>
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">Email</th>
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">Role</th>
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">Join Date</th>
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user, index) => (
                <tr key={index} className="border-b-2 border-[#DEE1E6] bg-white hover:bg-gray-50">
                  <td className="px-8 py-3 text-[13px] font-medium text-black">{user.id}</td>
                  <td className="px-8 py-3 text-[13px] font-medium text-black">{user.name}</td>
                  <td className="px-8 py-3 text-[13px] font-medium text-black">{user.email}</td>
                  <td className="px-8 py-3 text-[13px] font-medium text-black">{user.role}</td>
                  <td className="px-8 py-3 text-[13px] font-medium text-black">{user.date}</td>
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
                          className="px-6 py-3 border border-[#E5E5E5] rounded-xl bg-white shadow-md text-sm font-medium text-black hover:bg-gray-50 whitespace-nowrap"
                          onClick={() => handleViewDetails(user.id)}
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
            <span className="text-[12px] font-normal text-black">Showing 1 to {recentUsers.length} of {stats.totalUsers} results</span>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 bg-white text-[12px] font-semibold text-black hover:text-[#626AE7] disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                <CaretLeft size={10} />
                Previous
              </button>
              
              <div className="flex items-center gap-2">
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-full text-[12px] font-medium flex items-center justify-center transition-colors ${
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
                className="flex items-center gap-1 bg-white text-[12px] font-medium text-black hover:text-[#626AE7] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
