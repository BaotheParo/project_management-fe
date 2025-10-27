// Status codes from API
export const CLAIM_STATUS_CODE = {
    PENDING: 0,
    ACCEPTED: 1,
    REJECTED: 2,
    OVERDUE: 3,
};

// Status labels for display
export const CLAIM_STATUS_LABEL = {
    [CLAIM_STATUS_CODE.PENDING]: "Pending",
    [CLAIM_STATUS_CODE.ACCEPTED]: "Accepted",
    [CLAIM_STATUS_CODE.REJECTED]: "Rejected",
    [CLAIM_STATUS_CODE.OVERDUE]: "Overdue",
};

// Colors for each status
export const CLAIM_STATUS_COLORS = {
    "Pending": "bg-gray-300",
    "Accepted": "bg-green-400",
    "Rejected": "bg-red-400",
    "Overdue": "bg-red-400",
};

// Helper function to get status label from code
export const getClaimStatusLabel = (statusCode) => {
    return CLAIM_STATUS_LABEL[statusCode] || "Unknown";
};

// Helper function to get color from label
export const getClaimStatusColor = (statusLabel) => {
    return CLAIM_STATUS_COLORS[statusLabel] || "bg-gray-300";
};