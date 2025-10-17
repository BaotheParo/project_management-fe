import React from 'react'
import { Route } from 'react-router-dom'
import SCTechnicianLayout from '../layout/SCTechnicianLayout'
import Dashboard from '../pages/sc-technician/Dashboard'
import TodoWorks from '../pages/sc-technician/TodoWorks'
import ClaimRequests from '../pages/sc-technician/ClaimRequests'
import Profile from '../pages/sc-technician/Profile'

export default (
  <Route path="/sc-technician" element={<SCTechnicianLayout />} key="sc-technician-root">
    <Route index element={<Dashboard />} />
    <Route path="tasks" element={<TodoWorks />} />
    <Route path="claims" element={<ClaimRequests />} />
    <Route path="profile" element={<Profile />} />
  </Route>
)



