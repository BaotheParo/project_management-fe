// export const scStaffRoutes = [
//   { path: '/sc', component: () => import('../pages/sc-staff/Dashboard') },
//   { path: '/sc/create', component: () => import('../pages/sc-staff/CreateWarranty') },
//   { path: '/sc/lookup', component: () => import('../pages/sc-staff/CustomerLookup') },
// ]

import React from 'react'
import { Route } from 'react-router-dom'
import Dashboard from '../pages/sc-technician/Dashboard'
import TodoWorks from '../pages/sc-technician/TodoWorks'
import ClaimRequests from '../pages/sc-technician/ClaimRequests'
import Profile from '../pages/sc-technician/Profile'
import SCStaffLayout from '../layout/SCStaffLayout'

export default (
  <Route path="/sc-staff" element={<SCStaffLayout />} key="sc-staff-root">
    <Route index element={<Dashboard />} />
    {/* <Route path="assign-worker" element={<TodoWorks />} />
    <Route path="warranty-report" element={<ClaimRequests />} />
    <Route path="bill-of-charge" element={<Profile />} />
    <Route path="profile" element={<Profile />} /> */}
  </Route>
)