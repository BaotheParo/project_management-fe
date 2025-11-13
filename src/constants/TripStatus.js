// Trip Status Enum - Must match backend TripStatusEnum
export const TRIP_STATUS = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

// Trip Status Labels (Vietnamese)
export const TRIP_STATUS_LABELS = {
  [TRIP_STATUS.DRAFT]: 'Nháp',
  [TRIP_STATUS.PUBLISHED]: 'Đã Xuất Bản',
  [TRIP_STATUS.COMPLETED]: 'Hoàn Thành',
  [TRIP_STATUS.CANCELLED]: 'Đã Hủy'
};

// Trip Status Badge Styles
export const TRIP_STATUS_STYLES = {
  [TRIP_STATUS.DRAFT]: 'bg-yellow-100 text-yellow-800',
  [TRIP_STATUS.PUBLISHED]: 'bg-blue-100 text-blue-800',
  [TRIP_STATUS.COMPLETED]: 'bg-gray-100 text-gray-800',
  [TRIP_STATUS.CANCELLED]: 'bg-red-100 text-red-800'
};
