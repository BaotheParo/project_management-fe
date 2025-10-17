import React from 'react'
import Sidebar from '../components/sc-technician/Sidebar'

export default function MainLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 ml-[250px] float-end min-h-screen">{children}</main>
    </div>
  )
}
