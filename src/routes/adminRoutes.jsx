export const adminRoutes = [
  { path: '/admin', component: () => import('../pages/admin/Dashboard') },
  { path: '/admin/users', component: () => import('../pages/admin/ManageUsers') },
  { path: '/admin/reports', component: () => import('../pages/admin/Reports') },
]
