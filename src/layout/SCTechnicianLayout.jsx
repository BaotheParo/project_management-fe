import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../features/dashboard/sc-technician/components/Sidebar'
export default function SCTechnicianLayout() {
  return (
    <div className="h-screen">
      <Sidebar />
      <main className="p-14 flex-1 bg-white ml-[250px] overflow-y-auto min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}



