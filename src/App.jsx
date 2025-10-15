import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import { Routes, Route, Navigate } from 'react-router-dom'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
