import React from 'react'

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-4 bg-white shadow">Admin header</header>
      <main className="p-6">{children}</main>
    </div>
  )
}
