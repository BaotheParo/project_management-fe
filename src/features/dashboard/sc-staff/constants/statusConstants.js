// Centralized status and priority constants to avoid magic strings
export const WORK_ORDER_STATUS = {
  ALL: "All",
  PENDING: "Pending",
  ASSIGNED: "Assigned",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
};

export const WORK_ORDER_FILTERS = [
  WORK_ORDER_STATUS.ALL,
  WORK_ORDER_STATUS.PENDING,
  WORK_ORDER_STATUS.ASSIGNED,
  WORK_ORDER_STATUS.IN_PROGRESS,
  WORK_ORDER_STATUS.COMPLETED,
];

export const PRIORITY = {
  ALL: "All Priority",
  HIGH: "HIGH",
  MEDIUM: "MEDIUM",
  LOW: "LOW",
};

export const PRIORITY_OPTIONS = [
  PRIORITY.ALL,
  PRIORITY.HIGH,
  PRIORITY.MEDIUM,
  PRIORITY.LOW,
];

export default {
  WORK_ORDER_STATUS,
  WORK_ORDER_FILTERS,
  PRIORITY,
  PRIORITY_OPTIONS,
};
