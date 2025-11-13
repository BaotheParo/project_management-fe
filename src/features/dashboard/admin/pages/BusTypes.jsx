import React, { useState } from 'react';
import { Plus, PencilSimple, Trash, X } from 'phosphor-react';
import { useBusTypesApi } from '../../../../api/useBusTypesApi';
import Loader from '../../../../components/Loader';

const BusTypeModal = ({ isOpen, onClose, busType, onSubmit, mode = 'create' }) => {
  const [formData, setFormData] = useState(busType || {
    name: '',
    description: '',
    numDecks: 1,
    seatsPerDeck: 20,
    priceFactor: 1.0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'numDecks' || name === 'seatsPerDeck' 
        ? parseInt(value) 
        : name === 'priceFactor' 
          ? parseFloat(value) 
          : value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-black">
            {mode === 'create' ? 'Tạo Loại Xe Mới' : 'Chỉnh Sửa Loại Xe'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên Loại Xe *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="VD: Xe Limousine"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mô Tả
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="VD: Xe cao cấp 3 tầng"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số Tầng *
              </label>
              <input
                type="number"
                name="numDecks"
                value={formData.numDecks}
                onChange={handleChange}
                required
                min="1"
                max="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số Ghế/Tầng *
              </label>
              <input
                type="number"
                name="seatsPerDeck"
                value={formData.seatsPerDeck}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hệ Số Giá *
            </label>
            <input
              type="number"
              name="priceFactor"
              value={formData.priceFactor}
              onChange={handleChange}
              required
              min="0.1"
              step="0.1"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Hệ số nhân với giá cơ bản (VD: 1.5 = 150% giá gốc)
            </p>
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
              {mode === 'create' ? 'Tạo Mới' : 'Cập Nhật'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, busTypeName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-black mb-4">Xác Nhận Xóa</h2>
        <p className="text-gray-600 mb-6">
          Bạn có chắc chắn muốn xóa loại xe <strong>"{busTypeName}"</strong>?
        </p>
        <p className="text-sm text-red-600 mb-6">
          ⚠️ Các chuyến xe sử dụng loại xe này sẽ được chuyển sang loại "UNDEFINED_BUS"
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

export default function BusTypesPage() {
  const { busTypes, loading, error, createBusType, updateBusType, deleteBusType } = useBusTypesApi();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBusType, setSelectedBusType] = useState(null);
  const [modalMode, setModalMode] = useState('create');

  const handleCreateClick = () => {
    setSelectedBusType(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleEditClick = (busType) => {
    setSelectedBusType(busType);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDeleteClick = (busType) => {
    setSelectedBusType(busType);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (modalMode === 'create') {
        await createBusType(formData);
      } else {
        await updateBusType(selectedBusType.id, formData);
      }
      setIsModalOpen(false);
      setSelectedBusType(null);
    } catch (err) {
      alert(err.message || 'Có lỗi xảy ra');
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteBusType(selectedBusType.id);
      setIsDeleteModalOpen(false);
      setSelectedBusType(null);
    } catch (err) {
      alert(err.message || 'Không thể xóa loại xe này');
    }
  };

  if (loading && busTypes.length === 0) return <Loader />;

  return (
    <div className="p-12 w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[30px] font-semibold text-black mb-1">Quản Lý Loại Xe</h1>
          <p className="text-xl font-semibold text-[#929594]">
            Tạo và quản lý các loại xe buýt
          </p>
        </div>
        <button
          onClick={handleCreateClick}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700"
        >
          <Plus size={20} weight="bold" />
          Tạo Loại Xe Mới
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg text-red-800">
          ⚠️ {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {busTypes.map((busType) => (
          <div
            key={busType.id}
            className="border-[3px] border-[#EBEBEB] rounded-2xl p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-black mb-1">
                  {busType.name}
                  {busType.isDefault && (
                    <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      Mặc định
                    </span>
                  )}
                </h3>
                <p className="text-sm text-gray-600">{busType.description}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Số tầng:</span>
                <span className="font-semibold">{busType.numDecks} tầng</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Ghế/tầng:</span>
                <span className="font-semibold">{busType.seatsPerDeck} ghế</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tổng ghế:</span>
                <span className="font-semibold text-indigo-600">
                  {busType.numDecks * busType.seatsPerDeck} ghế
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Hệ số giá:</span>
                <span className="font-semibold">×{busType.priceFactor}</span>
              </div>
            </div>

            {busType.defaultDecks && busType.defaultDecks.length > 0 && (
              <div className="mb-4 pt-4 border-t border-gray-200">
                <p className="text-xs font-medium text-gray-500 mb-2">Cấu hình tầng:</p>
                <div className="flex gap-2">
                  {busType.defaultDecks.map((deck) => (
                    <div
                      key={deck.id}
                      className="px-3 py-1 bg-gray-100 rounded-lg text-xs"
                    >
                      <span className="font-semibold">{deck.label}</span>
                      <span className="text-gray-600 ml-1">
                        ({deck.totalSeats} ghế, ×{deck.priceFactor})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => handleEditClick(busType)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50"
              >
                <PencilSimple size={18} />
                Sửa
              </button>
              <button
                onClick={() => handleDeleteClick(busType)}
                disabled={busType.isDefault}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-red-300 rounded-xl text-red-600 font-medium hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash size={18} />
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>

      {busTypes.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Chưa có loại xe nào</p>
          <button
            onClick={handleCreateClick}
            className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700"
          >
            Tạo Loại Xe Đầu Tiên
          </button>
        </div>
      )}

      <BusTypeModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedBusType(null);
        }}
        busType={selectedBusType}
        onSubmit={handleSubmit}
        mode={modalMode}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedBusType(null);
        }}
        onConfirm={handleConfirmDelete}
        busTypeName={selectedBusType?.name}
      />
    </div>
  );
}
