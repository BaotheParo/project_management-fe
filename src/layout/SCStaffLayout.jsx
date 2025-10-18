import React from 'react'
import Sidebar from '../components/sc-staff/Sidebar'

export default function SCStaffLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="p-6">{children}</main>
    </div>
  )
}
