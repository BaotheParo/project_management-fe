import React, { useState, useEffect } from 'react';
import { Plus, PencilSimple, X, Eye, CheckCircle, XCircle } from 'phosphor-react';
import { useUsersApi } from '../../../../api/useUsersApi';
import Loader from '../../../../components/Loader';

// Staff Form Modal (Create/Edit)
const StaffFormModal = ({ isOpen, onClose, staff, onSubmit, mode = 'create' }) => {
  const [formData, setFormData] = useState(staff ? {
    ...staff,
    password: ''
  } : {
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    dateOfBirth: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Remove empty password on edit
    const dataToSubmit = { ...formData };
    if (mode === 'edit' && !dataToSubmit.password) {
      delete dataToSubmit.password;
    }
    
    onSubmit(dataToSubmit);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl p-8 w-full max-w-3xl my-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-black">
            {mode === 'create' ? 'Thêm Nhân Viên Mới' : 'Chỉnh Sửa Nhân Viên'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Họ *
              </label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Nguyễn Văn"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên *
              </label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="An"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username *
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                disabled={mode === 'edit'}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                placeholder="nguyenvanan"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mật Khẩu {mode === 'create' && '*'}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required={mode === 'create'}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder={mode === 'edit' ? 'Để trống nếu không đổi' : 'Nhập mật khẩu'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ngày Sinh
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
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
              {mode === 'create' ? 'Thêm Nhân Viên' : 'Cập Nhật'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Staff Details Modal
const StaffDetailsModal = ({ isOpen, onClose, staff }) => {
  if (!isOpen || !staff) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('vi-VN');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl p-8 w-full max-w-2xl my-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-black">Chi Tiết Nhân Viên</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-600">Họ và Tên:</span>
              <p className="font-semibold">{staff.firstname} {staff.lastname}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Username:</span>
              <p className="font-semibold">{staff.username}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Email:</span>
              <p className="font-semibold">{staff.email}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Ngày Sinh:</span>
              <p className="font-semibold">{formatDate(staff.dateOfBirth)}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Vai Trò:</span>
              <div className="mt-1">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                  Nhân Viên
                </span>
              </div>
            </div>
            <div>
              <span className="text-sm text-gray-600">Trạng Thái:</span>
              <div className="mt-1">
                {staff.isActive ? (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                    Đang Hoạt Động
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                    Đã Vô Hiệu
                  </span>
                )}
              </div>
            </div>
            <div>
              <span className="text-sm text-gray-600">Ngày Tạo:</span>
              <p className="font-semibold">{formatDateTime(staff.createdAt)}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Cập Nhật Lần Cuối:</span>
              <p className="font-semibold">{formatDateTime(staff.updatedAt)}</p>
            </div>
          </div>
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

// Main Component
const ManageStaff = () => {
  const {
    users,
    pagination,
    loading,
    error,
    fetchStaff,
    getStaffById,
    createStaff,
    updateStaff,
    deactivateStaff,
    reactivateStaff
  } = useUsersApi();

  const [filters, setFilters] = useState({
    isActive: '',
    search: ''
  });

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedStaffDetails, setSelectedStaffDetails] = useState(null);
  const [modalMode, setModalMode] = useState('create');

  useEffect(() => {
    loadStaff();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadStaff = async (page = 0) => {
    try {
      await fetchStaff(filters, page, pagination.size);
    } catch (error) {
      console.error('Failed to load staff:', error);
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
    loadStaff(0);
  };

  const handleCreateClick = () => {
    setSelectedStaff(null);
    setModalMode('create');
    setIsFormModalOpen(true);
  };

  const handleEditClick = (staff) => {
    setSelectedStaff(staff);
    setModalMode('edit');
    setIsFormModalOpen(true);
  };

  const handleViewDetails = async (staff) => {
    try {
      const details = await getStaffById(staff.id);
      setSelectedStaffDetails(details);
      setIsDetailsModalOpen(true);
    } catch (error) {
      console.error('Failed to load staff details:', error);
      alert('Không thể tải chi tiết nhân viên');
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (modalMode === 'create') {
        await createStaff(formData);
        alert('Thêm nhân viên thành công!');
      } else {
        await updateStaff(selectedStaff.id, formData);
        alert('Cập nhật nhân viên thành công!');
      }
      setIsFormModalOpen(false);
      setSelectedStaff(null);
      loadStaff(pagination.page);
    } catch (err) {
      alert(err.response?.data?.error || err.message || 'Có lỗi xảy ra');
    }
  };

  const handleToggleActive = async (staff) => {
    try {
      if (staff.isActive) {
        await deactivateStaff(staff.id);
        alert('Đã vô hiệu hóa nhân viên');
      } else {
        await reactivateStaff(staff.id);
        alert('Đã kích hoạt nhân viên');
      }
      loadStaff(pagination.page);
    } catch (err) {
      alert(err.response?.data?.error || err.message || 'Có lỗi xảy ra');
    }
  };

  const handlePageChange = (newPage) => {
    loadStaff(newPage);
  };

  if (loading && users.length === 0) return <Loader />;

  return (
    <div className="p-12 w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[30px] font-semibold text-black mb-1">Quản Lý Nhân Viên</h1>
          <p className="text-xl font-semibold text-[#929594]">
            Quản lý nhân viên của bạn
          </p>
        </div>
        <button
          onClick={handleCreateClick}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700"
        >
          <Plus size={20} weight="bold" />
          Thêm Nhân Viên
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 mb-6 border-2 border-[#EBEBEB]">
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Tìm kiếm theo tên, email, username..."
            className="col-span-2 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <select
            name="isActive"
            value={filters.isActive}
            onChange={handleFilterChange}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="true">Đang hoạt động</option>
            <option value="false">Đã vô hiệu</option>
          </select>
        </div>
        
        <div className="mt-4">
          <button
            onClick={handleApplyFilters}
            className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700"
          >
            Áp Dụng Lọc
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
              <th className="text-left px-6 py-4 text-sm font-semibold text-[#686262]">Họ và Tên</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-[#686262]">Email</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-[#686262]">Username</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-[#686262]">Trạng Thái</th>
              <th className="text-center px-6 py-4 text-sm font-semibold text-[#686262]">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((staff) => (
              <tr key={staff.id} className="border-b-2 border-[#DEE1E6] bg-white hover:bg-gray-50">
                <td className="px-6 py-4">
                  <p className="font-semibold text-black">{staff.firstname} {staff.lastname}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {staff.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {staff.username}
                </td>
                <td className="px-6 py-4">
                  {staff.isActive ? (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      Hoạt Động
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                      Vô Hiệu
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleViewDetails(staff)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                      title="Xem chi tiết"
                    >
                      <Eye size={20} className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleEditClick(staff)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                      title="Chỉnh sửa"
                    >
                      <PencilSimple size={20} className="text-green-600" />
                    </button>
                    <button
                      onClick={() => handleToggleActive(staff)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                      title={staff.isActive ? 'Vô hiệu hóa' : 'Kích hoạt'}
                    >
                      {staff.isActive ? (
                        <XCircle size={20} className="text-red-600" />
                      ) : (
                        <CheckCircle size={20} className="text-green-600" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && !loading && (
          <div className="text-center py-12 text-gray-500">
            Không có nhân viên nào
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
      <StaffFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setSelectedStaff(null);
        }}
        staff={selectedStaff}
        onSubmit={handleSubmit}
        mode={modalMode}
      />

      <StaffDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedStaffDetails(null);
        }}
        staff={selectedStaffDetails}
      />
    </div>
  );
};

export default ManageStaff;
