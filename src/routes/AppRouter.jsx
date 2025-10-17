import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import scTechnicianRoutes from './scTechnicianRoutes'


export default function AppRouter() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/sc-technician" element={<Navigate to="/sc-technician" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        {scTechnicianRoutes}
      </Routes>
    </MainLayout>

  );
}
