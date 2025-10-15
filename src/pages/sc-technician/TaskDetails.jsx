import React from 'react'
import { useParams } from 'react-router-dom'

export default function TaskDetails() {
  const { id } = useParams()

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Task Details</h1>
      <p>Viewing details for task ID: {id}</p>
    </div>
  )
}


