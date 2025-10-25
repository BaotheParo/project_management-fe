import { useState } from "react";

const ClaimForm = ({ initialData, onSubmit, onClose }) => {
  const [form, setForm] = useState(initialData || {
    id: "",
    vehicle: "",
    vin: "",
    status: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[400px] shadow-xl">
        <h2 className="text-lg font-semibold mb-4">
          {initialData ? "Edit Claim" : "Create Claim"}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
          }}
        >
          {["id", "vehicle", "vin", "status", "dueDate"].map((f) => (
            <input
              key={f}
              name={f}
              placeholder={f}
              value={form[f]}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded-md"
            />
          ))}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-600 hover:text-black"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-1.5 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClaimForm;
