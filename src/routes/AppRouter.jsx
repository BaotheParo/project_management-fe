import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Imports for Sc-Technician
import SCTechnicianLayout from '../layout/SCTechnicianLayout'
import SCTechDashboard from '../pages/sc-technician/Dashboard'
import SCTechTodoWorks from '../pages/sc-technician/TodoWorks'
import SCTechClaimRequests from '../pages/sc-technician/ClaimRequests'
import SCTechProfile from '../pages/sc-technician/Profile'

// Imports for Sc-Staff
import SCStaffLayout from '../layout/SCStaffLayout'
import SCStaffDashboard from '../pages/sc-staff/Dashboard'
import AssignWorker from '../pages/sc-staff/AssignWorker'
import PartRequests from '../pages/sc-staff/PartRequests'
import WarrantyReport from '../pages/sc-staff/WarrantyReport'
import WarrantyRequestDetail from '../pages/sc-staff/WarrantyRequestDetail'
import BillOfCharge from '../pages/sc-staff/BillOfCharge'
import SCStaffProfile from '../pages/sc-staff/Profile'

// Imports for EVM Staff
import EVMStaffLayout from '../layout/EVMStaffLayout'

// Imports for Admin
import AdminLayout from '../layout/AdminLayout'

// Imports for Login
import LoginLayout from '../layout/LoginLayout'
import Login from '../pages/Login'
import ForgotPassword from '../pages/ForgotPassword'

export default function AppRouter() {
  return (
    <Routes>
      {/* Route with Login Layout */}
      <Route path="/login" element={<LoginLayout />}>
        <Route index element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Route with SC-Technician Layout */}
      <Route path="/sc-technician" element={<SCTechnicianLayout />}>
        <Route index element={<SCTechDashboard />} />
        <Route path="todos" element={<SCTechTodoWorks />} />
        <Route path="claims" element={<SCTechClaimRequests />} />
        <Route path="profile" element={<SCTechProfile />} />
      </Route>

      {/* Route with SC-Staff Layout */}
      <Route path="/sc-staff" element={<SCStaffLayout />}>
        <Route index element={<SCStaffDashboard />} />
        <Route path="assign-worker" element={<AssignWorker />} />
        <Route path="part-requests" element={<PartRequests />} />
        <Route path="warranty-report" element={<WarrantyReport />} />
        <Route path="warranty-request/:id" element={<WarrantyRequestDetail />} />
        <Route path="bill-of-charge" element={<BillOfCharge />} />
        <Route path="profile" element={<SCStaffProfile />} />
      </Route>

      {/* Route with EVM-Staff Layout */}
      <Route path="/evm-staff" element={<EVMStaffLayout />}>
        {/* Add EVM Staff routes here */}
      </Route>

      {/* Route with Admin Layout */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* Add Admin routes here */}
      </Route>

      {/* Fallback route */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
