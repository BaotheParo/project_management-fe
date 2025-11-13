/**
 * Ticket Status Constants
 */

export const TICKET_STATUS = {
  PURCHASED: 'PURCHASED',
  CANCELLED: 'CANCELLED',
};

export const TICKET_STATUS_LABELS = {
  [TICKET_STATUS.PURCHASED]: 'Đã mua',
  [TICKET_STATUS.CANCELLED]: 'Đã hủy',
};

export const TICKET_STATUS_STYLES = {
  [TICKET_STATUS.PURCHASED]: 'bg-green-100 text-green-800',
  [TICKET_STATUS.CANCELLED]: 'bg-red-100 text-red-800',
};

export const getTicketStatusBadge = (status) => {
  return {
    label: TICKET_STATUS_LABELS[status] || status,
    className: TICKET_STATUS_STYLES[status] || 'bg-gray-100 text-gray-800'
  };
};
