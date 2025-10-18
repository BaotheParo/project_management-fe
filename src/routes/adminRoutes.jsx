// export const adminRoutes = [
//   { path: '/admin', component: () => import('../pages/admin/Dashboard') },
//   { path: '/admin/users', component: () => import('../pages/admin/ManageUsers') },
//   { path: '/admin/reports', component: () => import('../pages/admin/Reports') },
// ]

import React from 'react'
import { Route } from 'react-router-dom'
import AdminLayout from '../layout/AdminLayout'

export default (
  <Route path="/admin" element={<AdminLayout />} key="admin-root">
    {/* <Route index element={<Dashboard />} /> */}
  </Route>
)