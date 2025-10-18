// export const evmStaffRoutes = [
//   { path: '/evm', component: () => import('../pages/evm-staff/Dashboard') },
//   { path: '/evm/policies', component: () => import('../pages/evm-staff/ManagePolicies') },
//   { path: '/evm/campaigns', component: () => import('../pages/evm-staff/Campaigns') },
// ]

import React from 'react'
import { Route } from 'react-router-dom'
import EVMStaffLayout from '../layout/EVMStaffLayout'

export default (
  <Route path="/evm-staff" element={<EVMStaffLayout />} key="evm-staff-root">
    {/* <Route index element={<Dashboard />} />
    <Route path="payment" element={<TodoWorks />} />
    <Route path="campaign" element={<ClaimRequests />} />
    <Route path="policy" element={<Profile />} />
    <Route path="profile" element={<Profile />} /> */}
  </Route>
)
