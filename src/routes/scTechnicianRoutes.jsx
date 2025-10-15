export const scTechnicianRoutes = [
  { path: '/tech', component: () => import('../pages/sc-technician/Dashboard') },
  { path: '/tech/tasks', component: () => import('../pages/sc-technician/TaskList') },
  { path: '/tech/tasks/:id', component: () => import('../pages/sc-technician/TaskDetails') },
]
