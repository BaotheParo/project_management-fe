import React, { useState, useEffect } from 'react';
import { Plus, PencilSimple, X, Eye, CheckCircle, XCircle } from 'phosphor-react';
import { useSearchParams } from 'react-router-dom';
import { useUsersApi } from '../../../../api/useUsersApi';
import { useAuth } from '../../../../app/AuthProvider';
import Loader from '../../../../components/Loader';
import Notification from '../../../../components/Notification';

// User Form Modal (Create/Edit)
const UserFormModal = ({ isOpen, onClose, user, onSubmit, mode = 'create', operators = [], isOperator = false }) => {
  const [formData, setFormData] = useState(user ? {
    ...user,
    password: ''
  } : {
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    dateOfBirth: '',
    roles: 'ROLE_PASSENGER',
    managedByOperatorId: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
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

  const isStaff = formData.roles === 'ROLE_STAFF';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl p-8 w-full max-w-3xl my-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-black">
            {isOperator 
              ? (mode === 'create' ? 'Thêm Nhân Viên Mới' : 'Chỉnh Sửa Nhân Viên')
              : (mode === 'create' ? 'Tạo Người Dùng Mới' : 'Chỉnh Sửa Người Dùng')
            }
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Họ *</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Tên *</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Username *</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Ngày Sinh</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {!isOperator && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vai Trò *</label>
                <select
                  name="roles"
                  value={formData.roles}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="ROLE_PASSENGER">Hành Khách (Passenger)</option>
                  <option value="ROLE_STAFF">Nhân Viên (Staff)</option>
                  <option value="ROLE_OPERATOR">Nhà Điều Hành (Operator)</option>
                </select>
              </div>

              {isStaff && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Thuộc Nhà Điều Hành *</label>
                  <select
                    name="managedByOperatorId"
                    value={formData.managedByOperatorId}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">-- Chọn Operator --</option>
                    {operators.map((op) => (
                      <option key={op.id} value={op.id}>
                        {op.firstname} {op.lastname} ({op.username})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

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
              {isOperator
                ? (mode === 'create' ? 'Thêm Nhân Viên' : 'Cập Nhật')
                : (mode === 'create' ? 'Tạo Người Dùng' : 'Cập Nhật')
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// User Details Modal
const UserDetailsModal = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('vi-VN');
  };

  const getRoleBadge = (role) => {
    const styles = {
      ROLE_PASSENGER: 'bg-blue-100 text-blue-800',
      ROLE_STAFF: 'bg-green-100 text-green-800',
      ROLE_OPERATOR: 'bg-purple-100 text-purple-800'
    };

    const labels = {
      ROLE_PASSENGER: 'Hành Khách',
      ROLE_STAFF: 'Nhân Viên',
      ROLE_OPERATOR: 'Nhà Điều Hành'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[role] || 'bg-gray-100 text-gray-800'}`}>
        {labels[role] || role}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl p-8 w-full max-w-2xl my-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-black">Chi Tiết Người Dùng</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-600">Họ và Tên:</span>
              <p className="font-semibold">{user.firstname} {user.lastname}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Username:</span>
              <p className="font-semibold">{user.username}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Email:</span>
              <p className="font-semibold">{user.email}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Ngày Sinh:</span>
              <p className="font-semibold">{formatDate(user.dateOfBirth)}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Vai Trò:</span>
              <div className="mt-1">{getRoleBadge(user.roles)}</div>
            </div>
            <div>
              <span className="text-sm text-gray-600">Trạng Thái:</span>
              <div className="mt-1">
                {(user.active !== undefined ? user.active : user.isActive) ? (
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
              <p className="font-semibold">{formatDateTime(user.createdAt)}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Cập Nhật Lần Cuối:</span>
              <p className="font-semibold">{formatDateTime(user.updatedAt)}</p>
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
const ManageUsers = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  
  const {
    users,
    pagination,
    loading,
    error,
    fetchUsers,
    fetchStaff,
    getUserById,
    getStaffById,
    createUser,
    createStaff,
    updateUser,
    updateStaff,
    deactivateUser,
    deactivateStaff,
    reactivateUser,
    reactivateStaff
  } = useUsersApi();

  // Determine view mode from URL params and user role
  const viewType = searchParams.get('view') || 'customers'; // 'customers' or 'staff'
  const isOperator = user?.roles === 'ROLE_OPERATOR' || user?.roles?.includes('ROLE_OPERATOR');
  const isStaffView = viewType === 'staff';
  
  // Set initial filter based on view type
  const getInitialFilter = () => {
    if (isOperator) {
      // Operator can only see staff, no role filter needed
      return { isActive: '', search: '' };
    } else {
      // Admin can see all users with role filter
      return {
        role: isStaffView ? 'ROLE_STAFF' : 'ROLE_PASSENGER',
        isActive: '',
        search: ''
      };
    }
  };

  const [filters, setFilters] = useState(getInitialFilter());
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);
  const [modalMode, setModalMode] = useState('create');
  const [operators, setOperators] = useState([]);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000);
  };

  useEffect(() => {
    loadUsers();
    if (!isOperator) {
      loadOperators();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Reload when view type changes
  useEffect(() => {
    setFilters(getInitialFilter());
    loadUsers(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewType]);

  const loadUsers = async (page = 0) => {
    try {
      if (isOperator) {
        // Operator uses /operator/staff endpoint
        await fetchStaff(filters, page, pagination.size);
      } else {
        // Admin uses /admin/users endpoint
        await fetchUsers(filters, page, pagination.size);
      }
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  const loadOperators = async () => {
    try {
      const response = await fetchUsers({ role: 'ROLE_OPERATOR' }, 0, 100);
      if (response.content) {
        setOperators(response.content);
      }
    } catch (error) {
      console.error('Failed to load operators:', error);
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
    loadUsers(0);
  };

  const handleCreateClick = () => {
    setSelectedUser(null);
    setModalMode('create');
    setIsFormModalOpen(true);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setModalMode('edit');
    setIsFormModalOpen(true);
  };

  const handleViewDetails = async (user) => {
    try {
      const details = isOperator 
        ? await getStaffById(user.id)
        : await getUserById(user.id);
      setSelectedUserDetails(details);
      setIsDetailsModalOpen(true);
    } catch (error) {
      console.error('Failed to load user details:', error);
      showNotification(
        isOperator ? 'Không thể tải chi tiết nhân viên' : 'Không thể tải chi tiết người dùng',
        'error'
      );
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (isOperator) {
        // Operator uses staff endpoints
        if (modalMode === 'create') {
          await createStaff(formData);
          showNotification('Thêm nhân viên thành công!', 'success');
        } else {
          await updateStaff(selectedUser.id, formData);
          showNotification('Cập nhật nhân viên thành công!', 'success');
        }
      } else {
        // Admin uses user endpoints
        if (modalMode === 'create') {
          await createUser(formData);
          showNotification('Tạo người dùng thành công!', 'success');
        } else {
          await updateUser(selectedUser.id, formData);
          showNotification('Cập nhật người dùng thành công!', 'success');
        }
      }
      setIsFormModalOpen(false);
      setSelectedUser(null);
      loadUsers(pagination.page);
    } catch (err) {
      showNotification(err.response?.data?.error || err.message || 'Có lỗi xảy ra', 'error');
    }
  };

  const handleToggleActive = async (user) => {
    try {
      const isActive = user.active !== undefined ? user.active : user.isActive;
      
      if (isOperator) {
        // Operator uses staff endpoints
        if (isActive) {
          await deactivateStaff(user.id);
          showNotification('Đã vô hiệu hóa nhân viên', 'success');
        } else {
          await reactivateStaff(user.id);
          showNotification('Đã kích hoạt nhân viên', 'success');
        }
      } else {
        // Admin uses user endpoints
        if (isActive) {
          await deactivateUser(user.id);
          showNotification('Đã vô hiệu hóa người dùng', 'success');
        } else {
          await reactivateUser(user.id);
          showNotification('Đã kích hoạt người dùng', 'success');
        }
      }
      loadUsers(pagination.page);
    } catch (err) {
      showNotification(err.response?.data?.error || err.message || 'Có lỗi xảy ra', 'error');
    }
  };

  const handlePageChange = (newPage) => {
    loadUsers(newPage);
  };

  const getRoleBadge = (role) => {
    const styles = {
      ROLE_PASSENGER: 'bg-blue-100 text-blue-800',
      ROLE_STAFF: 'bg-green-100 text-green-800',
      ROLE_OPERATOR: 'bg-purple-100 text-purple-800'
    };

    const labels = {
      ROLE_PASSENGER: 'Hành Khách',
      ROLE_STAFF: 'Nhân Viên',
      ROLE_OPERATOR: 'Nhà Điều Hành'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[role] || 'bg-gray-100 text-gray-800'}`}>
        {labels[role] || role}
      </span>
    );
  };

  if (loading && users.length === 0) return <Loader />;

  return (
    <div className="p-12 w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[30px] font-semibold text-black mb-1">
            {isOperator ? 'Quản Lý Nhân Viên' : 'Quản Lý Người Dùng'}
          </h1>
          <p className="text-xl font-semibold text-[#929594]">
            {isOperator 
              ? 'Quản lý nhân viên của bạn'
              : isStaffView
              ? 'Quản lý tất cả nhân viên trong hệ thống'
              : 'Quản lý tất cả khách hàng trong hệ thống'
            }
          </p>
        </div>
        <button
          onClick={handleCreateClick}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700"
        >
          <Plus size={20} weight="bold" />
          {isOperator || isStaffView ? 'Thêm Nhân Viên' : 'Thêm Người Dùng'}
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 mb-6 border-2 border-[#EBEBEB]">
        <div className={`grid ${isOperator ? 'grid-cols-3' : 'grid-cols-4'} gap-4`}>
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Tìm kiếm theo tên, email, username..."
            className="col-span-2 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          
          {!isOperator && (
            <select
              name="role"
              value={filters.role}
              onChange={handleFilterChange}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Tất cả vai trò</option>
              <option value="ROLE_PASSENGER">Hành Khách</option>
              <option value="ROLE_STAFF">Nhân Viên</option>
              <option value="ROLE_OPERATOR">Nhà Điều Hành</option>
            </select>
          )}

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
              {!isOperator && <th className="text-left px-6 py-4 text-sm font-semibold text-[#686262]">Vai Trò</th>}
              <th className="text-left px-6 py-4 text-sm font-semibold text-[#686262]">Trạng Thái</th>
              <th className="text-center px-6 py-4 text-sm font-semibold text-[#686262]">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b-2 border-[#DEE1E6] bg-white hover:bg-gray-50">
                <td className="px-6 py-4">
                  <p className="font-semibold text-black">{user.firstname} {user.lastname}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{user.username}</td>
                {!isOperator && <td className="px-6 py-4">{getRoleBadge(user.roles)}</td>}
                <td className="px-6 py-4">
                  {(user.active !== undefined ? user.active : user.isActive) ? (
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
                      onClick={() => handleViewDetails(user)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                      title="Xem chi tiết"
                    >
                      <Eye size={20} className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleEditClick(user)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                      title="Chỉnh sửa"
                    >
                      <PencilSimple size={20} className="text-green-600" />
                    </button>
                    <button
                      onClick={() => handleToggleActive(user)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                      title={(user.active !== undefined ? user.active : user.isActive) ? 'Vô hiệu hóa' : 'Kích hoạt'}
                    >
                      {(user.active !== undefined ? user.active : user.isActive) ? (
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
            {isOperator || isStaffView ? 'Không có nhân viên nào' : 'Không có người dùng nào'}
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
      <UserFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onSubmit={handleSubmit}
        mode={modalMode}
        operators={operators}
        isOperator={isOperator}
      />

      <UserDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedUserDetails(null);
        }}
        user={selectedUserDetails}
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

export default ManageUsers;
