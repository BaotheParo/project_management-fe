import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/Login/Logo.png'
import car from '../assets/Login/car.png'
import { CaretLeftIcon } from '@phosphor-icons/react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    console.log('Password reset requested for:', email)
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
          style={{ backgroundImage: `url(${car})`, filter: "brightness(0.95)" }}
        />
      </div>

      {/* Right form ~57.5% */}
      <div className="basis-[57.5%] flex items-center justify-center border-l border-gray-100">
        <div className="w-[520px] max-w-[92%] text-center px-6">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
            Send change password request
          </h1>
          <p className="text-lg text-gray-500 mb-8">
            Request password change to admin
          </p>

          <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-[520px] text-left"
          >
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

            <button
              className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-sm mt-5 cursor-pointer"
              type="submit"
            >
              Send
            </button>

            {/* Back to Login link as requested */}
            <div className='flex w-full justify-center'>
              <Link
                className="flex items-center gap-2 w-fit mt-5 text-center font-semibold text-indigo-600 text-md tracking-[0] leading-[normal] whitespace-nowrap"
                to="/login"
              >
                <CaretLeftIcon size={15} weight="bold" />
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}