import React from 'react'
import { NavLink } from 'react-router-dom'
import { HouseIcon, ListIcon, ClipboardTextIcon, UserIcon, MinusCircleIcon } from '@phosphor-icons/react'
import logo from '../../assets/group4.png'

const NavItem = ({ to, icon: Icon, label, end }) => (
  <NavLink end={end} to={to} className={({ isActive }) => `flex items-center gap-3 w-52 px-4 py-3 rounded-full justify-start cursor-pointer transition-colors ${isActive ? 'bg-indigo-600 text-white' : 'text-gray-600'}`}>
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

export default function Sidebar() {
  return (
    <aside className="fixed w-64 h-screen border-r-2 border-gray-200 bg-white flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-center py-6">
          <img src={logo} alt="logo" className="w-24 h-24 object-contain" />
        </div>

        <nav className="pl-6 flex flex-col gap-3">
          <div className="pt-13">
            <NavItem end={true} to="/sc-technician" icon={HouseIcon} label="Dashboard" />
          </div>
          <div className="py-0">
            <NavItem to="/sc-technician/todos" icon={ListIcon} label="Task List" />
          </div>
          <div className="py-0">
            <NavItem to="/sc-technician/claims" icon={ClipboardTextIcon} label="Claim Requests" />
          </div>
          <div className="py-0">
            <NavItem to="/sc-technician/profile" icon={UserIcon} label="Profile" />
          </div>
        </nav>
      </div>

      <div className="px-6 py-6">
        <div className="py-0">
            <NavItem to="/login" icon={MinusCircleIcon} label="Logout" />
        </div>
      </div>
    </aside>
  )
}



