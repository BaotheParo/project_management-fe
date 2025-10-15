import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import Dashboard from '../pages/Dashboard'
import ClaimRequests from '../pages/ClaimRequests'
import TodoWorks from '../pages/TodoWorks'
import Profile from '../pages/Profile'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/claims" element={<ClaimRequests />} />
          <Route path="/todos" element={<TodoWorks />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}
