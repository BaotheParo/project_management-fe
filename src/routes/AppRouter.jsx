import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import scTechnicianRoutes from './scTechnicianRoutes'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/sc-technician" element={<Navigate to="/sc-technician" replace />} />
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          {scTechnicianRoutes}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}
