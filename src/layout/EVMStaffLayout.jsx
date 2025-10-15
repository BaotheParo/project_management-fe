import React from 'react'

export default function EVMStaffLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-4 bg-white shadow">EVM Staff header</header>
      <main className="p-6">{children}</main>
    </div>
  )
}
