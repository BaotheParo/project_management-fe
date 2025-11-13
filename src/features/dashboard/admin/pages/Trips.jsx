import React, { useState } from 'react';
import { Plus, PencilSimple, Trash, X, CaretLeft, CaretRight, Eye } from 'phosphor-react';
import { useTripsApi } from '../../../../api/useTripsApi';
import { useBusTypesApi } from '../../../../api/useBusTypesApi';
import Loader from '../../../../components/Loader';

const TripModal = ({ isOpen, onClose, trip, busTypes, onSubmit, mode = 'create' }) => {
  const [formData, setFormData] = useState(trip ? {
    ...trip,
    departurePoint: trip.departurePoint || trip.departureLocation || '',
    destination: trip.destination || trip.arrivalLocation || '',
    durationMinutes: trip.durationMinutes || 0,
    tripSchedule: trip.tripSchedule || [],
    salesStart: trip.salesStart || '',
    salesEnd: trip.salesEnd || ''
  } : {
    routeName: '',
    departurePoint: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    durationMinutes: 0,
    basePrice: 0,
    busTypeId: '',
    tripSchedule: [],
    salesStart: '',
    salesEnd: '',
    status: 'DRAFT'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calculate duration in minutes if not set
    let finalData = { ...formData };
    if (formData.departureTime && formData.arrivalTime && !formData.durationMinutes) {
      const start = new Date(formData.departureTime);
      const end = new Date(formData.arrivalTime);
      finalData.durationMinutes = Math.round((end - start) / (1000 * 60));
    }
    
    // Auto-generate tripSchedule if empty
    if (!formData.tripSchedule || formData.tripSchedule.length === 0) {
      const depTime = new Date(formData.departureTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
      const arrTime = new Date(formData.arrivalTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
      finalData.tripSchedule = [
        `${depTime} - ${formData.departurePoint}`,
        `${arrTime} - ${formData.destination}`
      ];
    }
    
    onSubmit(finalData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: (name === 'basePrice' || name === 'durationMinutes') ? parseFloat(value) || 0 : value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl p-8 w-full max-w-3xl my-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-black">
            {mode === 'create' ? 'Tạo Chuyến Đi Mới' : 'Chỉnh Sửa Chuyến Đi'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên Tuyến Đường *
            </label>
            <input
              type="text"
              name="routeName"
              value={formData.routeName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="VD: Hà Nội - Sài Gòn"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Điểm Đi *
              </label>
              <input
                type="text"
                name="departurePoint"
                value={formData.departurePoint}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="VD: Bến xe Miền Đông"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Điểm Đến *
              </label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="VD: Bến xe Đà Lạt"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Giờ Khởi Hành *
              </label>
              <input
                type="datetime-local"
                name="departureTime"
                value={formData.departureTime}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Giờ Đến *
              </label>
              <input
                type="datetime-local"
                name="arrivalTime"
                value={formData.arrivalTime}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loại Xe *
              </label>
              <select
                name="busTypeId"
                value={formData.busTypeId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">-- Chọn loại xe --</option>
                {busTypes.map((busType) => (
                  <option key={busType.id} value={busType.id}>
                    {busType.name} ({busType.numDecks * busType.seatsPerDeck} ghế)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Giá Cơ Bản (VNĐ) *
              </label>
              <input
                type="number"
                name="basePrice"
                value={formData.basePrice}
                onChange={handleChange}
                required
                min="0"
                step="1000"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="500000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thời Gian (phút)
              </label>
              <input
                type="number"
                name="durationMinutes"
                value={formData.durationMinutes}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Tự động tính"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bắt Đầu Bán Vé
              </label>
              <input
                type="datetime-local"
                name="salesStart"
                value={formData.salesStart}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kết Thúc Bán Vé
              </label>
              <input
                type="datetime-local"
                name="salesEnd"
                value={formData.salesEnd}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trạng Thái *
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="DRAFT">Nháp</option>
              <option value="PUBLISHED">Đã Xuất Bản</option>
              <option value="COMPLETED">Hoàn Thành</option>
              <option value="CANCELLED">Đã Hủy</option>
            </select>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700"
            >
              {mode === 'create' ? 'Tạo Chuyến Đi' : 'Cập Nhật'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const TripDetailsModal = ({ isOpen, onClose, trip }) => {
  if (!isOpen || !trip) return null;

  const formatDateTime = (dateTime) => {
    if (!dateTime) return 'N/A';
    return new Date(dateTime).toLocaleString('vi-VN');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl p-8 w-full max-w-4xl my-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-black">Chi Tiết Chuyến Đi</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold mb-3">Thông Tin Cơ Bản</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-600">Tên Tuyến:</span>
                <p className="font-semibold">{trip.routeName}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Trạng Thái:</span>
                <p className="font-semibold">{trip.status}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Điểm Đi:</span>
                <p className="font-semibold">{trip.departurePoint || trip.departureLocation}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Điểm Đến:</span>
                <p className="font-semibold">{trip.destination || trip.arrivalLocation}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Giờ Khởi Hành:</span>
                <p className="font-semibold">{formatDateTime(trip.departureTime)}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Giờ Đến:</span>
                <p className="font-semibold">{formatDateTime(trip.arrivalTime)}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Thời Gian:</span>
                <p className="font-semibold">{trip.durationMinutes ? `${trip.durationMinutes} phút` : 'N/A'}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Giá Cơ Bản:</span>
                <p className="font-semibold text-indigo-600">{formatPrice(trip.basePrice)}</p>
              </div>
              {trip.salesStart && (
                <div>
                  <span className="text-sm text-gray-600">Bắt Đầu Bán:</span>
                  <p className="font-semibold">{formatDateTime(trip.salesStart)}</p>
                </div>
              )}
              {trip.salesEnd && (
                <div>
                  <span className="text-sm text-gray-600">Kết Thúc Bán:</span>
                  <p className="font-semibold">{formatDateTime(trip.salesEnd)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Decks Info */}
          {trip.decks && trip.decks.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Thông Tin Tầng Xe</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {trip.decks.map((deck) => (
                  <div key={deck.id} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-bold">Tầng {deck.label}</h4>
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                        ×{deck.priceFactor}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tổng ghế:</span>
                        <span className="font-semibold">{deck.totalSeats}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Còn trống:</span>
                        <span className="font-semibold text-green-600">
                          {deck.remainingCount ?? deck.totalSeats}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Giá:</span>
                        <span className="font-semibold text-indigo-600">
                          {formatPrice(trip.basePrice * deck.priceFactor)}
                        </span>
                      </div>
                    </div>
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

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, tripName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-black mb-4">Xác Nhận Xóa</h2>
        <p className="text-gray-600 mb-6">
          Bạn có chắc chắn muốn xóa chuyến đi <strong>"{tripName}"</strong>?
        </p>
        <p className="text-sm text-red-600 mb-6">
          ⚠️ Tất cả thông tin về tầng xe và ghế sẽ bị xóa vĩnh viễn
        </p>
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default function TripsPage() {
  const { trips, pagination, loading, error, fetchTrips, createTrip, updateTrip, deleteTrip, getTripById } = useTripsApi();
  const { busTypes } = useBusTypesApi();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [selectedTripDetails, setSelectedTripDetails] = useState(null);
  const [modalMode, setModalMode] = useState('create');

  const handleCreateClick = () => {
    setSelectedTrip(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleEditClick = (trip) => {
    setSelectedTrip(trip);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleViewDetails = async (trip) => {
    try {
      const details = await getTripById(trip.id);
      setSelectedTripDetails(details);
      setIsDetailsModalOpen(true);
    } catch (error) {
      console.error('Failed to load trip details:', error);
      alert('Không thể tải chi tiết chuyến đi');
    }
  };

  const handleDeleteClick = (trip) => {
    setSelectedTrip(trip);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (modalMode === 'create') {
        await createTrip(formData);
      } else {
        await updateTrip(selectedTrip.id, formData);
      }
      setIsModalOpen(false);
      setSelectedTrip(null);
    } catch (err) {
      alert(err.message || 'Có lỗi xảy ra');
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteTrip(selectedTrip.id);
      setIsDeleteModalOpen(false);
      setSelectedTrip(null);
    } catch (err) {
      alert(err.message || 'Không thể xóa chuyến đi này');
    }
  };

  const handlePageChange = (newPage) => {
    fetchTrips(newPage, pagination.size);
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return 'N/A';
    return new Date(dateTime).toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getStatusBadge = (status) => {
    const styles = {
      DRAFT: 'bg-yellow-100 text-yellow-800',
      PUBLISHED: 'bg-blue-100 text-blue-800',
      COMPLETED: 'bg-gray-100 text-gray-800',
      CANCELLED: 'bg-red-100 text-red-800'
    };
    
    const labels = {
      DRAFT: 'Nháp',
      PUBLISHED: 'Đã Xuất Bản',
      COMPLETED: 'Hoàn Thành',
      CANCELLED: 'Đã Hủy'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || ''}`}>
        {labels[status] || status}
      </span>
    );
  };

  if (loading && trips.length === 0) return <Loader />;

  return (
    <div className="p-12 w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[30px] font-semibold text-black mb-1">Quản Lý Chuyến Đi</h1>
          <p className="text-xl font-semibold text-[#929594]">
            Tạo và quản lý các chuyến xe
          </p>
        </div>
        <button
          onClick={handleCreateClick}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700"
        >
          <Plus size={20} weight="bold" />
          Tạo Chuyến Đi Mới
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg text-red-800">
          ⚠️ {error}
        </div>
      )}

      <div className="border-[3px] border-[#EBEBEB] rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-[#DEE1E6] bg-[#FAFAFA]">
              <th className="text-left px-6 py-4 text-sm font-semibold text-[#686262]">Tuyến Đường</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-[#686262]">Khởi Hành</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-[#686262]">Đến</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-[#686262]">Giá</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-[#686262]">Trạng Thái</th>
              <th className="text-center px-6 py-4 text-sm font-semibold text-[#686262]">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip) => (
              <tr key={trip.id} className="border-b-2 border-[#DEE1E6] bg-white hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold text-black">{trip.routeName}</p>
                    <p className="text-xs text-gray-500">
                      {trip.departurePoint || trip.departureLocation} → {trip.destination || trip.arrivalLocation}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {formatDateTime(trip.departureTime)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {formatDateTime(trip.arrivalTime)}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-indigo-600">
                  {formatPrice(trip.basePrice)}
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(trip.status)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleViewDetails(trip)}
                      className="p-2 hover:bg-blue-50 rounded-lg text-blue-600"
                      title="Xem chi tiết"
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      onClick={() => handleEditClick(trip)}
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                      title="Chỉnh sửa"
                    >
                      <PencilSimple size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(trip)}
                      className="p-2 hover:bg-red-50 rounded-lg text-red-600"
                      title="Xóa"
                    >
                      <Trash size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {trips.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Chưa có chuyến đi nào</p>
            <button
              onClick={handleCreateClick}
              className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700"
            >
              Tạo Chuyến Đi Đầu Tiên
            </button>
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-8 py-6 bg-white border-t-2 border-[#DEE1E6]">
            <span className="text-sm text-gray-600">
              Hiển thị {trips.length} / {pagination.totalElements} chuyến đi
            </span>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 0}
                className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CaretLeft size={16} />
                Trước
              </button>
              
              <div className="flex items-center gap-2">
                {[...Array(pagination.totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium ${
                      pagination.page === index
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page >= pagination.totalPages - 1}
                className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sau
                <CaretRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      <TripModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTrip(null);
        }}
        trip={selectedTrip}
        busTypes={busTypes}
        onSubmit={handleSubmit}
        mode={modalMode}
      />

      <TripDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedTripDetails(null);
        }}
        trip={selectedTripDetails}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedTrip(null);
        }}
        onConfirm={handleConfirmDelete}
        tripName={selectedTrip?.routeName}
      />
    </div>
  );
}
