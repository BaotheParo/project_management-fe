import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sc-technician/Sidebar'
import Header from '../components/Header'

export default function SCTechnicianLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 flex-1 bg-gray-50 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}


