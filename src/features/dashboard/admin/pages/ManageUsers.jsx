import React, { useState } from 'react'
import { DotsThree, CalendarBlank, CaretLeft, CaretRight, MagnifyingGlass, Plus, PencilSimple, Power, X } from 'phosphor-react'
import { useAdminApi } from '../../../../api/useAdminApi'
import Loader from '../../../../components/Loader'

const StatsCard = ({ title, count, subtitle, color }) => (
  <div className="border-[3px] border-[#EBEBEB] rounded-2xl p-8 flex-1">
    <div className="flex items-start justify-between mb-4">
      <h3 className="text-xl font-medium text-[#626AE7]">{title}</h3>
    </div>
    <div className={`text-[30px] font-semibold mb-2 ${color}`}>{count}</div>
    <div className="text-base font-medium text-[#686262]">{subtitle}</div>
  </div>
)

const AddUserModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'SC Staff',
    status: 'Active'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'SC Staff',
      status: 'Active'
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-black">Add New User</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-[#EBEBEB] rounded-xl focus:outline-none focus:border-[#626AE7] transition-colors"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-[#EBEBEB] rounded-xl focus:outline-none focus:border-[#626AE7] transition-colors"
              placeholder="user@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-3 border-2 border-[#EBEBEB] rounded-xl focus:outline-none focus:border-[#626AE7] transition-colors"
              placeholder="Min. 6 characters"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role *
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-[#EBEBEB] rounded-xl focus:outline-none focus:border-[#626AE7] transition-colors bg-white"
            >
              <option value="Admin">Admin</option>
              <option value="SC Staff">SC Staff</option>
              <option value="EVM Staff">EVM Staff</option>
              <option value="Technician">Technician</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status *
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-[#EBEBEB] rounded-xl focus:outline-none focus:border-[#626AE7] transition-colors bg-white"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-[#EBEBEB] text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#626AE7] text-white rounded-xl font-medium hover:bg-[#5159c9] transition-colors"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function ManageUsers() {
  const { users, stats, loading, toggleUserActive } = useAdminApi()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')
  const [openDropdown, setOpenDropdown] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [notification, setNotification] = useState(null)
  const totalPages = 3

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index)
  }

  const handleAddUser = async (newUserData) => {
    try {
      // Note: Backend doesn't have POST /users endpoint yet
      // This will be added when backend implements user creation
      console.log("Add user (not implemented yet):", newUserData)
      setIsAddModalOpen(false)
      
      setNotification({
        type: 'error',
        message: 'User creation not available yet (Backend endpoint pending)'
      })
      
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch {
      setNotification({
        type: 'error',
        message: 'Failed to add user. Please try again.'
      })
      
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  const handleToggleActive = async (userId, currentStatus) => {
    const action = currentStatus === 'Active' ? 'deactivate' : 'activate'
    if (window.confirm(`Are you sure you want to ${action} this user?`)) {
      try {
        await toggleUserActive(userId)
        setOpenDropdown(null)
        
        setNotification({
          type: 'success',
          message: `User ${action}d successfully!`
        })
        
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      } catch {
        setNotification({
          type: 'error',
          message: `Failed to ${action} user. Please try again.`
        })
        
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      }
    }
  }

  // Format users data for display
  const formattedUsers = users.map(user => ({
    id: user.id || user.userId,
    name: user.name || user.fullName || user.userName,
    email: user.email,
    role: user.role || user.roleName,
    status: user.status || (user.isActive ? 'Active' : 'Inactive'),
    joinDate: user.joinDate || user.createdAt ? new Date(user.joinDate || user.createdAt).toISOString().split('T')[0] : 'N/A'
  }))

  const filteredUsers = formattedUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'All' || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  if (loading) return <Loader />

  return (
    <div className="p-12 w-full">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 ${
          notification.type === 'success' ? 'bg-[#54C020] text-white' : 'bg-[#FF3232] text-white'
        }`}>
          <span className="font-medium">{notification.message}</span>
          <button 
            onClick={() => setNotification(null)}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Add User Modal */}
      <AddUserModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddUser}
      />

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-[30px] font-semibold text-black mb-1">Manage Users</h1>
          <p className="text-xl font-semibold text-[#929594]">View and manage all system users.</p>
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
          subtitle="Registered in system" 
          color="text-black"
        />
        <StatsCard 
          title="Active Users" 
          count={stats.activeUsers.toString()} 
          subtitle="Currently active" 
          color="text-[#54C020]"
        />
        <StatsCard 
          title="Inactive Users" 
          count={stats.inactiveUsers.toString()} 
          subtitle="Temporarily disabled" 
          color="text-[#FF3232]"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[25px] font-semibold text-black">All Users ({filteredUsers.length})</h2>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-[#626AE7] text-white rounded-xl font-medium hover:bg-[#5159c9] transition-colors"
          >
            <Plus size={20} weight="bold" />
            Add New User
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlass size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#929594]" />
            <input
              type="text"
              placeholder="Search by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-[#EBEBEB] rounded-xl text-sm focus:outline-none focus:border-[#626AE7]"
            />
          </div>
          
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-3 border-2 border-[#EBEBEB] rounded-xl text-sm font-medium focus:outline-none focus:border-[#626AE7]"
          >
            <option value="All">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="SC Staff">SC Staff</option>
            <option value="EVM Staff">EVM Staff</option>
            <option value="Technician">Technician</option>
          </select>
        </div>
        
        <div className="border-[3px] border-[#EBEBEB] rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-[#DEE1E6] bg-[#FAFAFA]">
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">User ID</th>
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">Name</th>
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">Email</th>
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">Role</th>
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">Status</th>
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">Join Date</th>
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index} className="border-b-2 border-[#DEE1E6] bg-white hover:bg-gray-50">
                  <td className="px-8 py-3 text-[13px] font-medium text-black">{user.id}</td>
                  <td className="px-8 py-3 text-[13px] font-medium text-black">{user.name}</td>
                  <td className="px-8 py-3 text-[13px] font-medium text-black">{user.email}</td>
                  <td className="px-8 py-3">
                    <span className="px-3 py-1 bg-[#E1E3FF] text-[#626AE7] rounded-full text-[11px] font-medium">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-3">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-medium ${
                      user.status === 'Active' 
                        ? 'bg-[#E8F5E9] text-[#54C020]' 
                        : 'bg-[#FFE4E4] text-[#FF3232]'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-8 py-3 text-[13px] font-medium text-black">{user.joinDate}</td>
                  <td className="px-8 py-3 relative">
                    <button 
                      onClick={() => toggleDropdown(index)}
                      className="p-2 hover:bg-gray-100 rounded bg-transparent border-none cursor-pointer"
                    >
                      <DotsThree size={24} weight="bold" className="text-gray-700" />
                    </button>
                    
                    {openDropdown === index && (
                      <div className="absolute right-8 top-12 z-10 bg-white border border-[#E5E5E5] rounded-xl shadow-lg py-2 min-w-[150px]">
                        <button className="w-full px-4 py-2 text-left text-[12px] font-medium text-black hover:bg-gray-50 flex items-center gap-2">
                          <PencilSimple size={16} />
                          Edit User
                        </button>
                        <button 
                          onClick={() => handleToggleActive(user.id, user.status)}
                          className={`w-full px-4 py-2 text-left text-[12px] font-medium hover:bg-gray-50 flex items-center gap-2 ${
                            user.status === 'Active' ? 'text-[#FF3232]' : 'text-[#54C020]'
                          }`}
                        >
                          <Power size={16} />
                          {user.status === 'Active' ? 'Deactivate User' : 'Activate User'}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="flex items-center justify-between px-8 py-6 bg-white">
            <span className="text-[12px] font-normal text-black">
              Showing {filteredUsers.length} of {stats.totalUsers} users
            </span>
            
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
