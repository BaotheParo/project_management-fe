import React from 'react'
import { Route } from 'react-router-dom'
import SCTechnicianLayout from '../layout/SCTechnicianLayout'
import Dashboard from '../pages/sc-technician/Dashboard'
import TaskList from '../pages/sc-technician/TaskList'
import TaskDetails from '../pages/sc-technician/TaskDetails'

export default (
  <Route path="/sc-technician" element={<SCTechnicianLayout />} key="sc-technician-root">
    <Route index element={<Dashboard />} />
    <Route path="tasks" element={<TaskList />} />
    <Route path="tasks/:id" element={<TaskDetails />} />
  </Route>
)


