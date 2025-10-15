import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/Login/Logo.png'
import car from '../assets/Login/car.png'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    console.log('login', { email, password })
  }

  return (
    <div className="w-screen h-screen flex overflow-hidden bg-white">
      {/* Left hero ~42.5% */}
      <div className="basis-[42.5%] min-w-[420px] relative bg-black flex items-start">
        <div className="absolute top-[39px] left-[50px] z-10 flex items-center gap-[17px]">
          <img src={logo} alt="ELV logo" />
        </div>
        <div
          className="absolute inset-0 bg-cover bg-left"
          style={{ backgroundImage: `url(${car})`, filter: 'brightness(0.95)' }}
        />
      </div>

      {/* Right form ~57.5% */}
      <div className="basis-[57.5%] flex items-center justify-center border-l border-gray-100">
        <div className="w-[520px] max-w-[92%] text-center px-6">
          <h1 className="text-base md:text-lg font-extrabold mb-2 whitespace-nowrap">Welcome back to ELV</h1>
          <p className="text-lg text-gray-500 mb-8">Warranty management system</p>

          <form onSubmit={handleSubmit} className="mx-auto max-w-[520px] text-left">
            <label className="block mb-4">
              <div className="text-xs text-gray-500 mb-2">Email</div>
              <input
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </label>

            <label className="block mb-4">
              <div className="text-xs text-gray-500 mb-2">Password</div>
              <input
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
              />
            </label>

            <Link
              className="text-sm text-indigo-600 mb-4 inline-block hover:underline"
              to="/forgot-password"
            >
              Forgot password ?
            </Link>

            <button
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold shadow-sm"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}