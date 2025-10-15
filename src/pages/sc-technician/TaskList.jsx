import React from 'react'
import { Link } from 'react-router-dom'

const mockTasks = [
  { id: 1, title: 'Inspect Unit A' },
  { id: 2, title: 'Repair Sensor B' },
]

export default function TaskList() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Task List</h1>
      <ul className="space-y-3">
        {mockTasks.map((t) => (
          <li key={t.id} className="p-4 bg-white rounded shadow-sm">
            <Link to={`/sc-technician/tasks/${t.id}`} className="text-indigo-600 font-medium">
              {t.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}


