import { useState } from "react";
import { useWarrantyClaims } from "../../../../api/useWarrantyClaims";

// Delete confirmation modal (rendered at bottom)
function DeleteModal({ row, onCancel, onSuccess, onError }) {
  const { deleteClaim } = useWarrantyClaims();
  const [loading, setLoading] = useState(false);

  if (!row) return null;
  
  const handleConfirm = async () => {
    setLoading(true);
    try {
      const result = await deleteClaim(row.claimId);
      if (result.success) {
        onSuccess();
      } else {
        onError("Server returned an error response.");
      }
    } catch (err) {
      onError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-[640px] p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-500">
            Remove warranty request for {row.claimId}/{row.vehicleName}
          </div>
          <button onClick={onCancel} className="text-gray-400 cursor-pointer">
            ✕
          </button>
        </div>

        <div className="text-center py-6">
          <div className="text-3xl mb-2">🚗</div>
          <div className="font-semibold text-lg mb-1">
            {row.claimId}/{row.vehicleName}
          </div>
          <div className="text-sm text-gray-500 mb-4">Car Owner: {row.customerName}</div>
          <button
            onClick={handleConfirm}
            className="mt-2 bg-indigo-600 text-white px-6 py-2 rounded-full cursor-pointer hover:bg-indigo-700 transition-all"
          >
            {loading ? "Removing..." : "I want to remove this request"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;