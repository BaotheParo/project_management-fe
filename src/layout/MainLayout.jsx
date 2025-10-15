import React from 'react'
import Sidebar from '../components/Sidebar'

export default function MainLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-800 min-h-screen">{children}</main>
    </div>
  )
}
