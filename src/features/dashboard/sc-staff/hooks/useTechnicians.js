import { useState, useEffect } from 'react'
import axiosInstance from '../../../../api/axiousInstance'

/**
 * Custom hook to fetch technicians list
 * Uses the /api/user/technicians endpoint
 */
export function useTechnicians() {
  const [technicians, setTechnicians] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        setLoading(true)
        setError(null)

        console.log('useTechnicians - Fetching technicians list')
        
        const response = await axiosInstance.get('/users/technicians')
        const techList = Array.isArray(response) ? response : []

        console.log('useTechnicians - Received technicians:', techList)

        // Map technicians to the format expected by components
        const mappedTechnicians = techList.map((tech) => ({
          id: tech.userId || tech.id,
          name: tech.name || tech.userName || 'Unknown',
          assignedTasks: tech.assignedTasksCount || 0,
          avatar: tech.avatarUrl || null,
          status: tech.status || 'Available',
        }))

        console.log('useTechnicians - Mapped technicians:', mappedTechnicians)
        setTechnicians(mappedTechnicians)
      } catch (err) {
        console.error('useTechnicians - Error fetching technicians:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTechnicians()
  }, [])

  const refetch = () => {
    setLoading(true)
    // The effect will re-run
  }

  return {
    technicians,
    loading,
    error,
    refetch,
  }
}
