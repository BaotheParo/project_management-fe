import React, { useState, useEffect } from 'react';
import { Eye, X, Trash } from 'phosphor-react';
import { useTicketsApi } from '../../../../api/useTicketsApi';
import { useAuth } from '../../../../app/AuthProvider';
import { ROLES } from '../../../../constants/Roles';
import { getTicketStatusBadge, TICKET_STATUS } from '../../../../constants/TicketStatus';
import Loader from '../../../../components/Loader';
import Notification from '../../../../components/Notification';

// Ticket Details Modal
const TicketDetailsModal = ({ isOpen, onClose, ticket }) => {
  if (!isOpen || !ticket) return null;

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('vi-VN');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const statusBadge = getTicketStatusBadge(ticket.status);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl p-8 w-full max-w-3xl my-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-black">Chi Tiết Vé</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Thông tin vé */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Thông tin vé</h3>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <span className="text-sm text-gray-600">ID Vé:</span>
                <p className="font-semibold">{ticket.id?.slice(-8) || 'N/A'}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Ghế:</span>
                <p className="font-semibold">{ticket.deckLabel || ''}{ticket.selectedSeat || 'N/A'}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Giá vé:</span>
                <p className="font-semibold text-green-600">{formatCurrency(ticket.price || 0)}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Trạng thái:</span>
                <div className="mt-1">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge.className}`}>
                    {statusBadge.label}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Thông tin hành khách */}
          {ticket.purchaser && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Thông tin hành khách</h3>
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <span className="text-sm text-gray-600">Họ và Tên:</span>
                  <p className="font-semibold">{ticket.purchaser.firstname} {ticket.purchaser.lastname}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Email:</span>
                  <p className="font-semibold">{ticket.purchaser.email}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Username:</span>
                  <p className="font-semibold">{ticket.purchaser.username}</p>
                </div>
              </div>
            </div>
          )}

          {/* Thông tin chuyến đi */}
          {ticket.routeName && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Thông tin chuyến đi</h3>
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                <div className="col-span-2">
                  <span className="text-sm text-gray-600">Tuyến đường:</span>
                  <p className="font-semibold text-indigo-600">{ticket.routeName}</p>
                </div>
                {ticket.departureTime && (
                  <div>
                    <span className="text-sm text-gray-600">Giờ đi:</span>
                    <p className="font-semibold">{formatDateTime(ticket.departureTime)}</p>
                  </div>
                )}
                {ticket.arrivalTime && (
                  <div>
                    <span className="text-sm text-gray-600">Giờ đến:</span>
                    <p className="font-semibold">{formatDateTime(ticket.arrivalTime)}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Lịch sử xác thực */}
          {ticket.validations && ticket.validations.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Lịch sử xác thực</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 max-h-60 overflow-y-auto">
                {ticket.validations.map((validation, index) => (
                  <div key={index} className="text-sm border-b border-gray-200 pb-2 last:border-0">
                    <p className="font-medium text-gray-700">
                      {formatDateTime(validation.validatedAt)} - Quét QR
                    </p>
                    <p className="text-gray-600">
                      Trạng thái: <span className="font-semibold">{validation.status}</span>
                      {validation.message && ` - ${validation.message}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

// Confirm Cancel Modal
const ConfirmCancelModal = ({ isOpen, onClose, onConfirm, ticketId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-black">Xác nhận hủy vé</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        <p className="text-gray-700 mb-6">
          Bạn có chắc muốn hủy vé <span className="font-semibold">[{ticketId?.slice(-8)}]</span>?
          <br />
          <span className="text-sm text-red-600">Vé sẽ được chuyển sang trạng thái Đã Hủy.</span>
        </p>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50"
          >
            Hủy bỏ
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700"
          >
            Đồng ý
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const ManageTickets = () => {
  const { user } = useAuth();
  // ROLE_ADMIN uses /admin/tickets, ROLE_OPERATOR uses /trips/operator/tickets
  const isAdmin = user?.roles === ROLES.ADMIN;
  const isOperator = user?.roles === ROLES.OPERATOR;

  const {
    tickets,
    pagination,
    loading,
    error,
    fetchTicketsAdmin,
    fetchTicketsOperator,
    getTicketByIdAdmin,
    getTicketByIdOperator,
    cancelTicketAdmin,
    cancelTicketOperator
  } = useTicketsApi();

  const [filters, setFilters] = useState({
    userEmail: '',
    tripId: '',
    status: ''
  });

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [ticketToCancel, setTicketToCancel] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000);
  };

  useEffect(() => {
    loadTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadTickets = async (page = 0) => {
    try {
      if (isAdmin) {
        // ROLE_ADMIN uses /admin/tickets
        await fetchTicketsAdmin(filters, page, pagination.size);
      } else if (isOperator) {
        // ROLE_OPERATOR uses /trips/operator/tickets
        await fetchTicketsOperator(filters, page, pagination.size);
      }
    } catch (error) {
      console.error('Failed to load tickets:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplyFilters = () => {
    loadTickets(0);
  };

  const handleViewDetails = async (ticket) => {
    try {
      let details;
      if (isAdmin) {
        // ROLE_ADMIN uses /admin/tickets/{id}
        details = await getTicketByIdAdmin(ticket.id);
      } else if (isOperator) {
        // ROLE_OPERATOR uses /trips/operator/tickets/{id}
        details = await getTicketByIdOperator(ticket.id);
      }
      setSelectedTicket(details);
      setIsDetailsModalOpen(true);
    } catch (error) {
      console.error('Failed to load ticket details:', error);
      showNotification('Không thể tải chi tiết vé', 'error');
    }
  };

  const handleCancelClick = (ticket) => {
    setTicketToCancel(ticket);
    setIsCancelModalOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (!ticketToCancel) return;

    try {
      if (isAdmin) {
        // ROLE_ADMIN uses /admin/tickets/{id}/cancel
        await cancelTicketAdmin(ticketToCancel.id);
      } else if (isOperator) {
        // ROLE_OPERATOR uses /trips/operator/tickets/{id}/cancel
        await cancelTicketOperator(ticketToCancel.id);
      }
      showNotification('Đã hủy vé thành công', 'success');
      setIsCancelModalOpen(false);
      setTicketToCancel(null);
      loadTickets(pagination.page);
    } catch (err) {
      showNotification(err.response?.data?.error || err.message || 'Không thể hủy vé', 'error');
    }
  };

  const handlePageChange = (newPage) => {
    loadTickets(newPage);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  if (loading && tickets.length === 0) return <Loader />;

  return (
    <div className="p-12 w-full">
      <div className="mb-8">
        <h1 className="text-[30px] font-semibold text-black mb-1">Quản Lý Vé</h1>
        <p className="text-xl font-semibold text-[#929594]">
          Giám sát và quản lý tất cả vé xe khách
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 mb-6 border-2 border-[#EBEBEB]">
        <div className="grid grid-cols-4 gap-4">
          <input
            type="text"
            name="userEmail"
            value={filters.userEmail}
            onChange={handleFilterChange}
            placeholder="Tìm theo email hành khách..."
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="text"
            name="tripId"
            value={filters.tripId}
            onChange={handleFilterChange}
            placeholder="ID Chuyến đi..."
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Tất cả trạng thái</option>
            <option value={TICKET_STATUS.PURCHASED}>Đã mua</option>
            <option value={TICKET_STATUS.CANCELLED}>Đã hủy</option>
          </select>

          <button
            onClick={handleApplyFilters}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700"
          >
            Lọc
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg text-red-800">
          ⚠️ {error}
        </div>
      )}

      {/* Table */}
      <div className="border-[3px] border-[#EBEBEB] rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-[#DEE1E6] bg-[#FAFAFA]">
              <th className="text-left px-6 py-4 text-sm font-semibold text-[#686262]">ID Vé</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-[#686262]">Chuyến đi</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-[#686262]">Hành khách</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-[#686262]">Ghế</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-[#686262]">Giá vé</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-[#686262]">Trạng thái</th>
              <th className="text-center px-6 py-4 text-sm font-semibold text-[#686262]">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => {
              const statusBadge = getTicketStatusBadge(ticket.status);
              return (
                <tr key={ticket.id} className="border-b-2 border-[#DEE1E6] bg-white hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-700">{ticket.id?.slice(-8) || 'N/A'}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-black">{ticket.routeName || 'N/A'}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-700">
                      {ticket.purchaser ? `${ticket.purchaser.firstname} ${ticket.purchaser.lastname}` : 'N/A'}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-indigo-600">
                      {ticket.deckLabel || ''}{ticket.selectedSeat || 'N/A'}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-green-600">{formatCurrency(ticket.price || 0)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge.className}`}>
                      {statusBadge.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleViewDetails(ticket)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                        title="Xem chi tiết"
                      >
                        <Eye size={20} className="text-blue-600" />
                      </button>
                      {ticket.status !== TICKET_STATUS.CANCELLED && (
                        <button
                          onClick={() => handleCancelClick(ticket)}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                          title="Hủy vé"
                        >
                          <Trash size={20} className="text-red-600" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {tickets.length === 0 && !loading && (
          <div className="text-center py-12 text-gray-500">
            Không có vé nào
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 0}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Trước
          </button>
          <span className="text-sm text-gray-600">
            Trang {pagination.page + 1} / {pagination.totalPages}
          </span>
          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page >= pagination.totalPages - 1}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Sau
          </button>
        </div>
      )}

      {/* Modals */}
      <TicketDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedTicket(null);
        }}
        ticket={selectedTicket}
      />

      <ConfirmCancelModal
        isOpen={isCancelModalOpen}
        onClose={() => {
          setIsCancelModalOpen(false);
          setTicketToCancel(null);
        }}
        onConfirm={handleConfirmCancel}
        ticketId={ticketToCancel?.id}
      />

      {/* Notification */}
      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ show: false, message: '', type: 'success' })}
        />
      )}
    </div>
  );
};

export default ManageTickets;
