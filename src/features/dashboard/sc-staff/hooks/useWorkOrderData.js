import { useState, useEffect, useCallback } from 'react'
import axiosInstance from '../../../../api/axiousInstance'
import { useAuth } from '../../../../app/AuthProvider'

/**
 * Custom hook to fetch work orders for a service center
 * Uses the /api/work-orders/by-center/{centerId} endpoint
 */
export function useWorkOrderData() {
  const { user } = useAuth()
  const [workOrders, setWorkOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refetchTrigger, setRefetchTrigger] = useState(0)

  const serviceCenterId = user?.serviceCenterId || null

  useEffect(() => {
    const fetchWorkOrders = async () => {
      if (!serviceCenterId) {
        console.log('useWorkOrderData - No serviceCenterId available')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        console.log('useWorkOrderData - Fetching work orders for service center:', serviceCenterId)
        
        const response = await axiosInstance.get(`/work-orders/by-center/${serviceCenterId}`)
        const workOrdersData = Array.isArray(response) ? response : [];

        console.log('useWorkOrderData - Received work orders:', workOrdersData)

        // Map work orders to the format expected by components
        const mappedWorkOrders = workOrdersData.map((workOrder) => ({
          id: workOrder.workOrderId || workOrder.id,
          claimId: workOrder.claimId || workOrder.claim?.claimId || workOrder.claim?.id, // Add claimId for filtering
          claimNumber: `RO-${workOrder.workOrderId?.slice(0, 8).toUpperCase() || 'Unknown'}`,
          vehicle: workOrder.vehicleName || workOrder.vehicle || 'Unknown Vehicle',
          status: mapWorkOrderStatus(workOrder.status),
          priority: determinePriority(workOrder),
          vin: workOrder.vin || 'N/A',
          customer: workOrder.technicianName || workOrder.technician?.name || 'Unassigned',
          date: formatDate(workOrder.createdDate || workOrder.createdAt),
          issue: workOrder.description || workOrder.issueDescription || 'No description provided',
          technician: workOrder.technicianName || workOrder.technician?.name || null,
          mileage: workOrder.mileage || 0,
          totalCost: workOrder.totalCost || workOrder.estimatedCost || 0,
          parts: workOrder.parts || [],
        }))

        console.log('useWorkOrderData - Mapped work orders:', mappedWorkOrders)
        setWorkOrders(mappedWorkOrders)
      } catch (err) {
        console.error('useWorkOrderData - Error fetching work orders:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchWorkOrders()
  }, [serviceCenterId, refetchTrigger])

  const refetch = useCallback(() => {
    console.log('useWorkOrderData - Triggering refetch')
    setRefetchTrigger(prev => prev + 1)
  }, [])

  return {
    workOrders,
    loading,
    error,
    refetch,
  }
}

/**
 * Map work order status to display status strings
 * Based on WorkOrderStatus enum from the API
 */
function mapWorkOrderStatus(status) {
  // Handle both string and number status values
  if (typeof status === 'string') {
    return status; // Already a string, return as-is
  }
  
  // Handle numeric status codes if API returns numbers
  switch (status) {
    case 0:
      return 'Pending'
    case 1:
      return 'Assigned'
    case 2:
      return 'In Progress'
    case 3:
      return 'Completed'
    default:
      return 'Pending'
  }
}

/**
 * Determine priority based on work order data
 * This is a placeholder - adjust based on your business logic
 */
function determinePriority(workOrder) {
  // Example logic: base priority on cost or urgency
  const cost = workOrder.totalCost || workOrder.estimatedCost || 0
  
  if (cost > 10000) return 'HIGH'
  if (cost > 5000) return 'MEDIUM'
  return 'LOW'
}

/**
 * Format date to readable string
 */
function formatDate(dateString) {
  if (!dateString) return 'N/A'
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  } catch {
    return 'Invalid Date'
  }
}
