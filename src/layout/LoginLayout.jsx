import React from 'react'
import { Outlet } from 'react-router-dom'

export default function LoginLayout() {
  return (
    <div className="h-screen">
      <main className=" flex-1 bg-gray-50 min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}