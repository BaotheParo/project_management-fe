import { useState } from 'react'
import './ForgotPassword.css'

export default function ForgotPassword({ initialEmail = '', onBack }) {
  const [email, setEmail] = useState(initialEmail)

  function handleSubmit(e) {
    e.preventDefault()
    console.log('send password change request for', email)
    // show a simple alert for now
    alert('Password change request sent for ' + email)
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
          <h1>Send change<br/>password request</h1>
          <p className="subtitle">Request password change to admin</p>

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

            <button className="submit" type="submit">Send</button>
            <div style={{height:12}} />
            <button type="button" className="link" onClick={onBack}>Back to login</button>
          </form>
        </div>
      </div>
    </div>
  )
}
