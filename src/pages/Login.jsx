import { useState } from 'react'
import '../App.css'
import './Login.css'

export default function Login({ onForgot }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    // For now just log - replace with real auth later
    console.log('login', { email, password })
  }

  return (
    <div className="login-root">
      <div className="login-left">
        <div className="brand">
          <img src="/logo.png" alt="ELV logo" className="brand-logo" />
          <span className="brand-text">ELV</span>
        </div>
        <div className="hero-image" />
      </div>

      <div className="login-right">
        <div className="login-card">
          <h1>Welcome back to ELV</h1>
          <p className="subtitle">Warranty management system</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <label className="field">
              <div className="field-label">Email</div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </label>

            <label className="field">
              <div className="field-label">Password</div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
              />
            </label>

            <div
              className="forgot"
              role="button"
              tabIndex={0}
              onClick={() => onForgot && onForgot(email)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onForgot && onForgot(email)}
            >
              Forgot password ?
            </div>

            <button className="submit" type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}
