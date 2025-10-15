import React from 'react'
import { Outlet } from 'react-router-dom'
export default function SCTechnicianLayout() {
  return (
    <div className="h-screen">
      <main className="p-6 flex-1 bg-gray-50 overflow-y-auto min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}



