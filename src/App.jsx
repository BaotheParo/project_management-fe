import { useState } from 'react'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'

export default function App() {
  const [view, setView] = useState('login') // 'login' | 'forgot'
  const [email, setEmail] = useState('')

  if (view === 'forgot') {
    return (
      <ForgotPassword
        initialEmail={email}
        onBack={() => setView('login')}
      />
    )
  }

  return (
    <Login
      onForgot={(eMail) => {
        if (eMail) setEmail(eMail)
        setView('forgot')
      }}
    />
  )
}
