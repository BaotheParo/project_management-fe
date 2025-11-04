import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../features/dashboard/admin/components/Sidebar'

export default function AdminLayout() {
  return (
    <div className="h-screen">
      <Sidebar />
      <main className="ml-64 min-h-screen bg-gray-50">
        <Outlet />
      </main>
    </div>
  )
}
