import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../features/dashboard/admin/components/Sidebar'

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Outlet />
      </div>
    </div>
  )
}
