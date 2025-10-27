// Status codes from API
export const WORK_STATUS_CODE = {
    PENDING: 0,
    INPROGRESS: 1,
    COMPLETED: 2,
    OVERDUE: 3,
};

// Status labels for display
export const WORK_STATUS_LABEL = {
    [WORK_STATUS_CODE.PENDING]: "Pending",
    [WORK_STATUS_CODE.ACCEPTED]: "InProgress",
    [WORK_STATUS_CODE.REJECTED]: "Completed",
    [WORK_STATUS_CODE.OVERDUE]: "Overdue",
};

// Colors for each status
export const WORK_STATUS_COLORS = {
    "Pending": "bg-gray-300",
    "InProgress": "bg-yellow-400",
    "Completed": "bg-green-400",
    "Overdue": "bg-red-400",
};

// Helper function to get status label from code
export const getWorkStatusLabel = (statusCode) => {
    return WORK_STATUS_LABEL[statusCode] || "Unknown";
};

// Helper function to get color from label
export const getWorkStatusColor = (statusLabel) => {
    return WORK_STATUS_COLORS[statusLabel] || "bg-gray-300";
};