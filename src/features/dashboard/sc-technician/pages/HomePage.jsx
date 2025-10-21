import React from 'react'
import { House } from 'phosphor-react'

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
        <House size={48} weight="bold" className="mx-auto text-indigo-600" />
        <h1 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">Welcome</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Tailwind, Phosphor icons, and React Router are set up.</p>
      </div>
    </div>
  )
}
