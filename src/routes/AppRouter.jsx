import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import scTechnicianRoutes from './scTechnicianRoutes'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/sc-technician" replace />} />
          {scTechnicianRoutes}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}
