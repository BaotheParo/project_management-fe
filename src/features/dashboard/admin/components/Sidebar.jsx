import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { HouseIcon, UsersThreeIcon, ChartBarIcon, ClipboardTextIcon, CurrencyDollarIcon, MinusCircleIcon, BusIcon, MapPinIcon, UserListIcon } from '@phosphor-icons/react'
import logo from '../../../../assets/group4.png'
import { useAuthApi } from '../../../../api/useAuthApi'
import { useAuth } from '../../../../app/AuthProvider'

const NavItem = ({ to, icon: Icon, label, end, onClick }) => {
  const commonClasses = ({ isActive }) =>
    `flex items-center gap-3 w-52 px-4 py-3 rounded-full justify-start cursor-pointer transition-colors ${
      isActive ? 'bg-indigo-600 text-white' : 'hover:bg-[#F1F3F4] text-gray-600'
    }`

  // Render a <button> if there's an onClick handler
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="flex items-center gap-3 w-52 px-4 py-3 rounded-full justify-start cursor-pointer transition-colors hover:bg-[#F1F3F4] text-gray-600"
      >
        <div className="flex items-center justify-center w-8 h-8 text-gray-500">
          <Icon size={18} weight="bold" />
        </div>
        <div className="text-sm font-medium">{label}</div>
      </button>
    )
  }

  return (
    <NavLink end={end} to={to} className={commonClasses}>
      {({ isActive }) => (
        <>
          <div className={`flex items-center justify-center w-8 h-8 ${isActive ? 'text-white' : 'text-gray-500'}`}>
            <Icon size={18} weight="bold" />
          </div>
          <div className="text-sm font-medium">{label}</div>
        </>
      )}
    </NavLink>
  )
}

export default function Sidebar() {
  const navigate = useNavigate()
  const { logout } = useAuthApi();
  const { user } = useAuth();
  
  const isOperator = user?.roles === 'ROLE_OPERATOR' || user?.roles?.includes('ROLE_OPERATOR');

  const handleLogout = () => {
    logout() // clear token, role, etc.
    navigate('/login', { replace: true }) // redirect to login page
  }

  return (
    <aside className="fixed w-64 h-screen border-r-2 border-gray-200 bg-white flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-center py-6">
          <img src={logo} alt="logo" className="w-24 h-24 object-contain" />
        </div>

        <nav className="pl-6 flex flex-col gap-3">
          <div className="pt-13">
            <NavItem end={true} to="/admin/dashboard" icon={HouseIcon} label="Dashboard" />
          </div>
          {!isOperator && (
            <div className="py-0">
              <NavItem to="/admin/users?view=customers" icon={UsersThreeIcon} label="Quản Lý Khách Hàng" />
            </div>
          )}
          <div className="py-0">
            <NavItem to="/admin/staff?view=staff" icon={UserListIcon} label="Quản Lý Nhân Viên" />
          </div>
          <div className="py-0">
            <NavItem to="/admin/bus-types" icon={BusIcon} label="Bus Types" />
          </div>
          <div className="py-0">
            <NavItem to="/admin/trips" icon={MapPinIcon} label="Trips" />
          </div>
          <div className="py-0">
            <NavItem to="/admin/reports" icon={ChartBarIcon} label="Reports" />
          </div>
          <div className="py-0">
            <NavItem to="/admin/warranty-report" icon={ClipboardTextIcon} label="Warranty Report" />
          </div>
          <div className="py-0">
            <NavItem to="/admin/bill" icon={CurrencyDollarIcon} label="Bill Of Charge" />
          </div>
        </nav>
      </div>

      <div className="px-6 py-6">
        <div className="py-0">
          <NavItem to="#" icon={MinusCircleIcon} label="Logout" onClick={handleLogout} />
        </div>
      </div>
    </aside>
  )
}
