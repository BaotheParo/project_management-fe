import { useState, useEffect } from "react";

const AssignTechnicianModal = ({
  isOpen,
  onClose,
  selectedOrder,
  availableTechnicians,
  onAssign,
}) => {
  const [selectedTechnicianId, setSelectedTechnicianId] = useState(null);

  // Pre-select the current technician when modal opens
  useEffect(() => {
    if (isOpen && selectedOrder && selectedOrder.technician) {
      // Find the technician by name and pre-select them
      const currentTech = availableTechnicians.find(
        (tech) => tech.name === selectedOrder.technician
      );
      if (currentTech) {
        setSelectedTechnicianId(currentTech.id);
      }
    }
  }, [isOpen, selectedOrder, availableTechnicians]);

  if (!isOpen || !selectedOrder) return null;

  const isReassigning = selectedOrder.status !== 'Pending';

  const handleAssign = () => {
    if (selectedTechnicianId) {
      const selectedTech = availableTechnicians.find(
        (t) => t.id === selectedTechnicianId
      );
      onAssign(selectedOrder, selectedTech);
      setSelectedTechnicianId(null);
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedTechnicianId(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-3xl p-6 w-full max-w-md mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {isReassigning ? 'Reassign' : 'Assign'} Technician for order {selectedOrder.id}
          </h3>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M15 5L5 15M5 5L15 15"
                stroke="#929594"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Vehicle Info */}
        <div className="bg-[#FFE4E4] rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#E1E3FF] flex items-center justify-center">
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                <path
                  d="M23.0469 10.5469H20.8008L16.6826 6.43165C16.5017 6.24966 16.2866 6.10537 16.0495 6.00714C15.8125 5.90891 15.5583 5.85869 15.3018 5.85938H4.71485C4.39329 5.85944 4.07672 5.93889 3.79324 6.09068C3.50977 6.24247 3.26815 6.4619 3.08985 6.7295L0.195315 11.0684C0.0674461 11.2611 -0.000511898 11.4874 2.90329e-06 11.7188V16.4063C2.90329e-06 16.9243 0.205778 17.421 0.57206 17.7873C0.938342 18.1536 1.43513 18.3594 1.95313 18.3594H3.27149C3.48013 19.0383 3.90098 19.6325 4.47224 20.0545C5.0435 20.4766 5.73505 20.7044 6.44532 20.7044C7.15558 20.7044 7.84713 20.4766 8.41839 20.0545C8.98965 19.6325 9.4105 19.0383 9.61914 18.3594H15.3809C15.5895 19.0383 16.0104 19.6325 16.5816 20.0545C17.1529 20.4766 17.8444 20.7044 18.5547 20.7044C19.265 20.7044 19.9565 20.4766 20.5278 20.0545C21.099 19.6325 21.5199 19.0383 21.7285 18.3594H23.0469C23.5649 18.3594 24.0617 18.1536 24.4279 17.7873C24.7942 17.421 25 16.9243 25 16.4063V12.5C25 11.982 24.7942 11.4852 24.4279 11.1189C24.0617 10.7527 23.5649 10.5469 23.0469 10.5469Z"
                  fill="#626AE7"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-base">
                {selectedOrder.vehicle}
              </h4>
              <p className="text-xs text-[#929594]">{selectedOrder.issue}</p>
            </div>
          </div>
        </div>

        {/* Available Technicians */}
        <div className="mb-4">
          <p className="text-sm font-semibold mb-3">
            Available Technicians ({availableTechnicians.length} active)
          </p>
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {availableTechnicians.map((tech) => (
              <label
                key={tech.id}
                htmlFor={`tech-${tech.id}`}
                className="flex items-center gap-3 p-3 border border-[#E5E5E5] rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <input
                  type="radio"
                  name="technician"
                  id={`tech-${tech.id}`}
                  value={tech.id}
                  checked={selectedTechnicianId === tech.id}
                  onChange={(e) =>
                    setSelectedTechnicianId(e.target.value)
                  }
                  className="w-5 h-5 appearance-none border-2 border-gray-300 rounded-full checked:border-[#626AE7] checked:border-[6px] transition-all cursor-pointer"
                />
                <div className="w-10 h-10 rounded-full bg-[#E1E3FF] flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M10 10C11.3261 10 12.5979 9.47322 13.5355 8.53553C14.4732 7.59785 15 6.32608 15 5C15 3.67392 14.4732 2.40215 13.5355 1.46447C12.5979 0.526784 11.3261 0 10 0C8.67392 0 7.40215 0.526784 6.46447 1.46447C5.52678 2.40215 5 3.67392 5 5C5 6.32608 5.52678 7.59785 6.46447 8.53553C7.40215 9.47322 8.67392 10 10 10ZM10 12.5C6.66 12.5 0 14.175 0 17.5V20H20V17.5C20 14.175 13.34 12.5 10 12.5Z"
                      fill="#626AE7"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{tech.name}</div>
                  <div className="text-xs text-[#929594]">{tech.role}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 py-3 border border-[#E5E5E5] rounded-2xl text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedTechnicianId}
            className={`flex-1 py-3 rounded-2xl text-sm font-semibold transition-colors ${
              selectedTechnicianId
                ? "bg-[#626AE7] text-white hover:bg-[#5159d6]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isReassigning ? 'Reassign' : 'Assign'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignTechnicianModal;
