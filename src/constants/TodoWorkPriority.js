// Status codes from API
export const PRIORITY_STATUS_CODE = {
    HIGH: 0,
    MEDIUM: 1,
    LOW: 2,
};

// Status labels for display
export const PRIORITY_STATUS_LABEL = {
    [PRIORITY_STATUS_CODE.HIGH]: "HIGH",
    [PRIORITY_STATUS_CODE.ACCEPTED]: "MEDIUM",
    [PRIORITY_STATUS_CODE.REJECTED]: "LOW",
};

// Colors for each status
export const PRIORITY_STATUS_COLORS = {
    "HIGH": "bg-red-400",
    "MEDIUM": "bg-yellow-400",
    "LOW": "bg-gray-300",
};

// Helper function to get status label from code
export const getPriorityStatusLabel = (statusCode) => {
    return PRIORITY_STATUS_LABEL[statusCode] || "Unknown";
};

// Helper function to get color from label
export const getPriorityStatusColor = (statusLabel) => {
    return PRIORITY_STATUS_COLORS[statusLabel] || "bg-gray-300";
};