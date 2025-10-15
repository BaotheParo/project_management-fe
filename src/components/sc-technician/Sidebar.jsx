import React from 'react'
import { NavLink } from 'react-router-dom'
import { House, ClipboardText, List, User } from 'phosphor-react'
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
    <aside className="w-64 h-screen border-r-2 border-gray-200 bg-white flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-center py-6">
          <img src={logo} alt="logo" className="w-24 h-24 object-contain" />
        </div>

        <nav className="pl-6 flex flex-col gap-3">
          <div className="py-2">
            <NavItem end={true} to="/sc-technician" icon={House} label="Dashboard" />
          </div>
          <div className="py-2">
            <NavItem to="/sc-technician/tasks" icon={List} label="Task List" />
          </div>
          <div className="py-2">
            <NavItem to="/sc-technician/claims" icon={ClipboardText} label="Claim Requests" />
          </div>
          <div className="py-2">
            <NavItem to="/sc-technician/profile" icon={User} label="Profile" />
          </div>
        </nav>
      </div>

      <div className="px-6 py-6">
        <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-md text-gray-700">
          <User size={18} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </aside>
  )
}



