import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sc-staff/Sidebar'

export default function SCStaffLayout() {
  return (
    <div className="h-screen">
      <Sidebar />
      <main className="ml-64 min-h-screen bg-white">
        <Outlet />
      </main>
    </div>
  )
}
