import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

export default function EditCampaign() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: id || "",
    title: "",
    status: "Active",
    startDate: "",
    endDate: "",
    description: "",
  });

  useEffect(() => {
    // If route state contains campaign data (from ViewCampaign), use it
    const incoming = location.state && location.state.campaign;
    if (incoming) {
      setForm((prev) => ({ ...prev, ...incoming }));
      return;
    }

    // Otherwise, mock-fetch by id (replace this with real API call)
    // Simulate a fetch and populate
    const mock = {
      id,
      title: "Summer Promotion",
      status: "Active",
      startDate: "2024-07-21",
      endDate: "2024-08-21",
      description: "This is a mocked campaign description fetched by ID.",
    };
    setForm(mock);
  }, [id, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    // Go back to view page
    navigate(-1);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: call API to save changes
    console.log("Saving campaign", form);
    // After save, navigate back to view page (or campaign list)
    navigate(`/evm-staff/campaign/${id}`, { state: { campaign: form } });
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Edit Campaign</h1>
          <p className="text-gray-500">
            Edit details for campaign id:{"  "}
            <span className="font-semibold text-2xl text-red-700">{id}</span>
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSave}
        className="bg-white rounded-2xl border-2 border-gray-200 p-8"
      >
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm text-gray-600 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg p-3"
            >
              <option>Active</option>
              <option>Paused</option>
              <option>Ended</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">End Date</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg p-3"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            className="w-full border border-gray-200 rounded-lg p-3"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-200"
          >
            Cancel
          </button>
          {/* Delete button removed - deletion moved to View page */}
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
