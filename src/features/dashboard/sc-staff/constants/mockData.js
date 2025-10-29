// Mock data for work orders
export const MOCK_WORK_ORDERS = [
  {
    id: 'RO-002',
    vehicle: 'VinFast VF-3',
    status: 'Pending',
    priority: 'HIGH',
    vin: 'LSV1E7AL0MC123456',
    customer: 'Andrew',
    date: 'July 21, 2025',
    issue: 'Battery thermal management system showing error codes. Customer reports reduced range and charging speed.',
  },
  {
    id: 'RO-003',
    vehicle: 'VinFast VF-3',
    status: 'Completed',
    priority: 'HIGH',
    vin: 'LSV1E7AL0MC123456',
    customer: 'Andrew',
    date: 'July 21, 2025',
    issue: 'Battery thermal management system showing error codes. Customer reports reduced range and charging speed.',
    technician: 'Jso',
  },
  {
    id: 'RO-004',
    vehicle: 'VinFast VF-3',
    status: 'Assigned',
    priority: 'MEDIUM',
    vin: 'LSV1E7AL0MC123456',
    customer: 'Andrew',
    date: 'July 21, 2025',
    issue: 'Battery thermal management system showing error codes. Customer reports reduced range and charging speed.',
    technician: 'Jso',
  },
  {
    id: 'RO-005',
    vehicle: 'VinFast VF-3',
    status: 'Assigned',
    priority: 'MEDIUM',
    vin: 'LSV1E7AL0MC123456',
    customer: 'Andrew',
    date: 'July 21, 2025',
    issue: 'Battery thermal management system showing error codes. Customer reports reduced range and charging speed.',
    technician: 'Jso',
  },
  {
    id: 'RO-006',
    vehicle: 'VinFast VF-3',
    status: 'In Progress',
    priority: 'LOW',
    vin: 'LSV1E7AL0MC123456',
    customer: 'Andrew',
    date: 'July 21, 2025',
    issue: 'Battery thermal management system showing error codes. Customer reports reduced range and charging speed.',
    technician: 'Jso',
  },
  {
    id: 'RO-007',
    vehicle: 'VinFast VF-3',
    status: 'In Progress',
    priority: 'HIGH',
    vin: 'LSV1E7AL0MC123456',
    customer: 'Andrew',
    date: 'July 21, 2025',
    issue: 'Battery thermal management system showing error codes. Customer reports reduced range and charging speed.',
    technician: 'Jso',
  },
]

// Mock data for available technicians
export const MOCK_TECHNICIANS = [
  { id: 1, name: 'Jso', role: 'Engineer Repair' },
  { id: 2, name: 'Jso', role: 'Engineer Repair' },
  { id: 3, name: 'Jso', role: 'Engineer Repair' },
  { id: 4, name: 'Jso', role: 'Engineer Repair' },
  { id: 5, name: 'Jso', role: 'Engineer Repair' },
]

// Filter options
export const WORK_ORDER_FILTERS = ['All', 'Pending', 'Assigned', 'In Progress', 'Completed']

// Priority options
export const PRIORITY_OPTIONS = ['All Priority', 'HIGH', 'MEDIUM', 'LOW']