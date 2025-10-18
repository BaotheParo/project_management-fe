import React from 'react'

export default function SCStaffLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-4 bg-white shadow">SC Staff header</header>
      <main className="p-6">{children}</main>
    </div>
  )
}
