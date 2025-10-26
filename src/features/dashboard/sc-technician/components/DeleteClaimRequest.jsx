// Delete confirmation modal (rendered at bottom)
function DeleteModal({ row, onCancel, onConfirm }) {
  if (!row) return null;
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-[640px] p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-500">
            Delete warranty request for {row.id}/{row.vehicle}
          </div>
          <button onClick={onCancel} className="text-gray-400 cursor-pointer">
            ✕
          </button>
        </div>

        <div className="text-center py-6">
          <div className="text-3xl mb-2">🚗</div>
          <div className="font-semibold text-lg mb-1">
            {row.id}/{row.vehicle}
          </div>
          <div className="text-sm text-gray-500 mb-4">Car Owner: Jso</div>
          <button
            onClick={onConfirm}
            className="mt-2 bg-indigo-600 text-white px-6 py-2 rounded-full cursor-pointer hover:bg-indigo-700 transition-all"
          >
            I want to delete this request
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;