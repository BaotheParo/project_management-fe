export const evmStaffRoutes = [
  { path: '/evm', component: () => import('../pages/evm-staff/Dashboard') },
  { path: '/evm/policies', component: () => import('../pages/evm-staff/ManagePolicies') },
  { path: '/evm/campaigns', component: () => import('../pages/evm-staff/Campaigns') },
]
