// Status codes from API
export const PRIORITY_STATUS_CODE = {
    HIGH: 0,
    MEDIUM: 1,
    LOW: 2,
};

// Status labels for display
export const PRIORITY_STATUS_LABEL = {
    [PRIORITY_STATUS_CODE.HIGH]: "HIGH",
    [PRIORITY_STATUS_CODE.MEDIUM]: "MEDIUM",
    [PRIORITY_STATUS_CODE.LOW]: "LOW",
};

// Colors for each status
export const PRIORITY_STATUS_COLORS = {
    "HIGH": "bg-[#FFE4E4] text-[#FF3232]",
    "MEDIUM": "bg-[#FFF1C9] text-[#E29A00]",
    "LOW": "bg-[#EFEFEF] text-[#717171]",
};

// Helper function to get status label from code
export const getPriorityStatusLabel = (statusCode) => {
    return PRIORITY_STATUS_LABEL[statusCode] || "Unknown";
};

// Helper function to get color from label
export const getPriorityStatusColor = (statusLabel) => {
    return PRIORITY_STATUS_COLORS[statusLabel] || "bg-gray-300";
};