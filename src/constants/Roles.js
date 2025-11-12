/**
 * Role Constants
 * Backend roles từ API: http://localhost:8080/api/v1
 */

export const ROLES = {
  // Admin - Quản trị viên hệ thống
  OPERATOR: "ROLE_OPERATOR",
  
  // Nhân viên SC (Service Center) - Quản lý claim, warranty
  STAFF: "ROLE_STAFF",
  
  // Hành khách - Người dùng cuối
  PASSENGER: "ROLE_PASSENGER",
};

/**
 * Map role to dashboard route
 */
export const ROLE_ROUTES = {
  [ROLES.OPERATOR]: "/admin/dashboard",
  [ROLES.STAFF]: "/sc-staff/dashboard",
  [ROLES.PASSENGER]: "/evm-staff/dashboard",
};

/**
 * Role display names (Vietnamese)
 */
export const ROLE_NAMES = {
  [ROLES.OPERATOR]: "Quản trị viên",
  [ROLES.STAFF]: "Nhân viên",
  [ROLES.PASSENGER]: "Hành khách",
};

/**
 * Check if role is valid
 */
export const isValidRole = (role) => {
  return Object.values(ROLES).includes(role);
};

/**
 * Get dashboard route for role
 */
export const getDashboardRoute = (role) => {
  return ROLE_ROUTES[role] || "/";
};
