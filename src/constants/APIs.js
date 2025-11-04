export const AUTH_API = {
    LOGIN: "/auth/login",
    AUTH_ME: "/auth/me",
    CHANGE_PASSWORD: "/auth/change-password",
    VALIDATE_TOKEN: "/auth/validate-token",
}

export const CLAIM_API = {
    GET_ALL_CLAIMS: "/claims",
    GET_BY_CLAIMID: "/claims/:claimId",
    GET_BY_SERVICE_CENTER: "/claims/service-center/:serviceCenterId",
    GET_BY_USER: "/claims/user/:userId",
    GET_BY_STATUS: "/claims/status/:status",
    CREATE_CLAIM: "/claims",
    DELETE_CLAIM: "/claims/:claimId",
    APPROVE_CLAIM: "/claims/:claimId/approve",
    REJECT_CLAIM: "/claims/:claimId/reject",
    UPDATE_STATUS: "/claims/:claimId/status",
}

export const TODO_WORK_API = {
    GETALL: "/claims",
    GETBYCLAIMID: "/claims/:claimId"
}

export const WORK_ORDER_API = {
    GET_ALL: "/work-orders",
    GET_BY_ID: "/work-orders/:id",
    GET_BY_USER: "/work-orders/user/:userId",
    GET_BY_CLAIM: "/work-orders/claim/:claimId",
    GET_BY_PRIORITY: "/work-orders/by-priority/:priority",
    GET_BY_CENTER: "/work-orders/by-center/:centerId",
    CREATE: "/work-orders",
    UPDATE: "/work-orders/:id",
    DELETE: "/work-orders/:id",
    UPDATE_STATUS: "/work-orders/:id/status",
    ASSIGN_TECHNICIAN: "/work-orders/:id/assign",
}

export const PART_API = {
    GET_ALL: "/parts",
    GET_BY_VIN: "/parts/by-vin/:vin",
    GET_BY_ID: "/parts/:partId",
}

export const PART_ITEM_API = {
    GET_ALL: "/partitems",
    GET_BY_ID: "/partitems/:id",
    GET_BY_PART: "/partitems/by-part/:partId",
    GET_BY_INVENTORY: "/partitems/by-inventory/:inventoryId",
    GET_BY_CLAIM: "/partitems/by-claim/:claimId",
    CREATE: "/partitems",
    UPDATE: "/partitems/:id",
    DELETE: "/partitems/:id",
    CHECK_EXISTS: "/partitems/:id/exists",
    CHECK_PARTNUMBER_EXISTS: "/partitems/partnumber-exists",
}

export const CAMPAIGN_API = {
    GET_ALL: "/campaigns",
    GET_BY_ID: "/campaigns/:id",
    GET_BY_USER: "/campaigns/user/:userId",
    GET_BY_TECHNICIAN: "/campaigns/technician/:technicianId",
    GET_BY_STATUS: "/campaigns/status/:status",
    CREATE: "/campaigns",
    UPDATE: "/campaigns/:id",
    DELETE: "/campaigns/:id",
    UPDATE_STATUS: "/campaigns/:id/status",
    ASSIGN_TECHNICIAN: "/campaigns/:id/assign",
}

export const USER_API = {
    GET_BY_CENTER: "/user/by-center/:centerId",
    GET_BY_ROLE: "/user/by-role/:role",
    GET_TECHNICIANS: "/user/technicians",
}

export const VEHICLE_API = {
    GET_ALL: "/vehicle/get-all",
    GET_BY_VIN: "/vehicle/get-by-vin/:vin",
    GET_BY_CUSTOMER_NAME: "/vehicle/get-by-customer-name",
    GET_BY_CUSTOMER_ID: "/vehicle/get-by-customer-id/:customerId",
}