export const scStaffRoutes = [
  { path: '/sc', component: () => import('../pages/sc-staff/Dashboard') },
  { path: '/sc/create', component: () => import('../pages/sc-staff/CreateWarranty') },
  { path: '/sc/lookup', component: () => import('../pages/sc-staff/CustomerLookup') },
]
