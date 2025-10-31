export const AUTH_API = {
    LOGIN: "/auth/login",
    AUTHE_DUSER: "/auth/me",
    FORGOT_PASSWORD: "/auth/change-password",
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
    CREATE: "/work-orders",
    UPDATE: "/work-orders/:id",
    DELETE: "/work-orders/:id",
    UPDATE_STATUS: "/work-orders/:id/status",
    ASSIGN_TECHNICIAN: "/work-orders/:id/assign",
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