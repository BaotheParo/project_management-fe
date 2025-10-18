import React from 'react'
import { Route } from 'react-router-dom'
import LoginLayout from '../layout/LoginLayout'
import Login from '../pages/Login'
import ForgotPassword from '../pages/ForgotPassword'

export default (
  <Route path="/login" element={<LoginLayout />} key="login-root">
    <Route index element={<Login />} />
    <Route path="forgot-password" element={<ForgotPassword />} />
  </Route>
)