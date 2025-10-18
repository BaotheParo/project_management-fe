import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Imports for Sc-Technician
import scTechnicianRoutes from './scTechnicianRoutes'
import SCTechnicianLayout from '../layout/SCTechnicianLayout';

// Imports for Sc-Staff
import scStaffRoutes from './scStaffRoutes';
import SCStaffLayout from '../layout/SCStaffLayout';

// Imports for EVM Staff
import evmStaffRoutes from './evmStaffRoutes';
import EVMStaffLayout from '../layout/EVMStaffLayout';

// Imports for Admin
import AdminLayout from '../layout/AdminLayout';
import adminRoutes from './adminRoutes';

// Imports for Login
import LoginLayout from '../layout/LoginLayout';
import LoginRoutes from './LoginRoutes';

export default function AppRouter() {
  return (
    <Routes>

      {/* Route with Login Layout */}
      <Route path="/login" element={<LoginLayout />} />
      {LoginRoutes}

      {/* Route with SC-Technician Layout */}
      <Route path="/sc-technician" element={<SCTechnicianLayout />} />
      {scTechnicianRoutes}

      {/* Route with SC-Staff Layout */}
      <Route path="/sc-staff" element={<SCStaffLayout />} />
      {scStaffRoutes}

      {/* Route with EVM-Staff Layout */}
      <Route path="/evm-staff" element={<EVMStaffLayout />} />
      {evmStaffRoutes}

      {/* Route with Admin Layout */}
      <Route path="/admin" element={<AdminLayout />} />
      {adminRoutes}

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
