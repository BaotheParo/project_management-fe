import React, { useMemo, useState, useRef, useEffect } from "react";
import {
  PlusCircleIcon,
  DotsThreeVerticalIcon,
  CaretLeftIcon,
  CaretRightIcon,
  InfoIcon,
  CarIcon,
  PackageIcon,
  WarningCircleIcon,
  CameraIcon,
  BuildingsIcon,
  XCircleIcon,
  CheckCircleIcon,
  WrenchIcon,
  DotsThreeIcon,
} from "@phosphor-icons/react";

const StatsCard = ({ title, count, subtitle, statusColor, icon: Icon }) => (
  <div className="border-[3px] border-[#EBEBEB] bg-white rounded-2xl p-8 min-w-[292px]">
    <div className="flex items-start justify-between mb-4">
      <h3 className={`text-xl font-semibold ${statusColor}`}>{title}</h3>
      {Icon && <Icon size={27} className="text-[#686262]" />}
    </div>
    <div className="text-[30px] font-semibold text-black mb-2">{count}</div>
    <div className="text-base font-medium text-[#686262]">{subtitle}</div>
  </div>
)

const sampleRows = Array.from({ length: 10 }).map((_, i) => ({
  id: `RO-00${i + 1}`,
  vehicle: i === 1 ? "Neiro Green" : "VinFast VF-3",
  vin: "LSV1E7AL0MC123456",
  status: [
    "On hold",
    "Done",
    "On hold",
    "Overdue",
    "In Progress",
    "On hold",
    "On hold",
    "Done",
    "On hold",
    "In Progress",
  ][i],
  dueDate: "2024-07-21",
}));

function StatusDot({ status }) {
  const color =
    status === "Done"
      ? "bg-green-400"
      : status === "Overdue"
      ? "bg-red-400"
      : status === "In Progress"
      ? "bg-yellow-400"
      : "bg-gray-300";
  return <span className={`inline-block w-2 h-2 rounded-full mr-2 ${color}`} />;
}

export default function ClaimRequests() {
  const [rows, setRows] = useState(sampleRows);
  const [currentPage, setCurrentPage] = useState(1);
  const [openActionFor, setOpenActionFor] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const menuRef = useRef(null);
  const closeTimerRef = useRef(null);
  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenActionFor(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  const total = 247;
  const perPage = 10;
  const totalPages = Math.ceil(total / perPage);

  const pages = useMemo(() => [1, 2, 3, 4], []);

  const [editingRow, setEditingRow] = useState(null);
  const [deletingRow, setDeletingRow] = useState(null);

  function openEditForm(row) {
    setEditingRow(row);
    setShowCreateForm(true);
    // Optionally populate form fields from `row`
  }

  function closeForm() {
    setEditingRow(null);
    setShowCreateForm(false);
  }

  function saveChanges() {
    // TODO: wire API/save logic
    setEditingRow(null);
    setShowCreateForm(false);
  }

  function confirmDelete() {
    // remove locally for now; TODO: call delete API
    if (deletingRow) {
      setRows((prev) => prev.filter((r) => r.id !== deletingRow.id));
    }
    setDeletingRow(null);
  }

  return (
    <div className="w-full">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Warranty Claim Requests</h1>
          <p className="text-gray-500">
            Manage and track warranty claim requests
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-20 mb-12">
        <StatsCard 
          title="Total Claims" 
          count="12" 
          subtitle="Currently in your queue"
          statusColor="text-indigo-600"
          icon={WrenchIcon}
        />
        <StatsCard 
          title="Pending" 
          count="04" 
          subtitle="Currently in your queue" 
          statusColor="text-gray-500"
          icon={CheckCircleIcon}
        />
        <StatsCard 
          title="In-Progress" 
          count="04" 
          subtitle="Currently in your queue" 
          statusColor="text-yellow-500"
          icon={CheckCircleIcon}
        />
        <StatsCard 
          title="Completed" 
          count="04" 
          subtitle="Currently in your queue" 
          statusColor="text-green-600"
          icon={CheckCircleIcon}
        />
        <StatsCard 
          title="Overdue" 
          count="04" 
          subtitle="Currently in your queue" 
          statusColor="text-red-500"
          icon={CheckCircleIcon}
        />
      </div>

      <div className="bg-white rounded-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-[25px] font-semibold text-black mb-6">Requested warranties</h2>
          {!showCreateForm && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition-all text-white px-4 py-2 mb-6 rounded-full cursor-pointer"
            >
              <PlusCircleIcon size={16} />
              <span>Create request</span>
            </button>
          )}
        </div>

        {showCreateForm ? (
          <div className="mb-6 bg-gray-50 p-6 border-[3px] border-[#EBEBEB] rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">
                  {editingRow
                    ? "Edit Warranty Claim"
                    : "Create New Warranty Claim"}
                </h3>
                <p className="text-sm text-gray-500">
                  Fill out the form below to submit a new warranty claim request
                  for electric vehicle components.
                </p>
              </div>
              <div />
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-md p-4 border">
                <div className="text-sm text-indigo-600 font-medium mb-2 flex items-center gap-2">
                  <InfoIcon size={16} />{" "}
                  {editingRow ? "Edit Warranty Claim" : "Basic Information"}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <input
                    className="p-3 border rounded-md"
                    placeholder="Claim ID"
                    defaultValue={editingRow?.id || "WC-2003-9192332"}
                  />
                  <input
                    className="p-3 border rounded-md"
                    placeholder="Claim Date"
                    defaultValue={editingRow ? "02/12/2025" : ""}
                  />
                  <input
                    className="p-3 border rounded-md"
                    placeholder="Service Center"
                    defaultValue={editingRow ? "WC-2003-9192332" : ""}
                  />
                  <input
                    className="p-3 border rounded-md"
                    placeholder="Created By"
                    defaultValue={editingRow ? "Jso" : ""}
                  />
                  <select className="p-3 border rounded-md">
                    <option>Select Manufacturer</option>
                  </select>
                </div>
              </div>

              <div className="bg-white rounded-md p-4 border">
                <div className="text-sm text-indigo-600 font-medium mb-2 flex items-center gap-2">
                  <CarIcon size={16} /> Vehicle Information
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <input
                    className="p-3 border rounded-md"
                    placeholder="VIN code"
                    defaultValue={editingRow?.vin || ""}
                  />
                  <input
                    className="p-3 border rounded-md"
                    placeholder="Enter vehicle name"
                    defaultValue={editingRow?.vehicle || ""}
                  />
                  <input
                    className="p-3 border rounded-md"
                    placeholder="Purchase Date of vehicle"
                    defaultValue={editingRow ? "12/23/2012" : ""}
                  />
                  <input
                    className="p-3 border rounded-md col-span-1"
                    placeholder="Current Mileage (km)"
                    defaultValue={editingRow ? "8,433" : ""}
                  />
                </div>
              </div>

              <div className="bg-white rounded-md p-4 border">
                <div className="text-sm text-indigo-600 font-medium mb-2 flex items-center gap-2">
                  <PackageIcon size={16} /> Part Information
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <input
                    className="p-3 border rounded-md"
                    placeholder="Part Name"
                    defaultValue={editingRow ? "Battery" : ""}
                  />
                  <input
                    className="p-3 border rounded-md"
                    placeholder="Part Code"
                    defaultValue={editingRow ? "PIN12334SD" : ""}
                  />
                  <input
                    className="p-3 border rounded-md"
                    placeholder="Replacement Date"
                    defaultValue={editingRow ? "05/16/2025" : ""}
                  />
                </div>
              </div>

              <div className="bg-white rounded-md p-4 border">
                <div className="text-sm text-indigo-600 font-medium mb-2 flex items-center gap-2">
                  <WarningCircleIcon size={16} /> Issue Details
                </div>
                <textarea
                  className="w-full p-3 border rounded-md min-h-[120px]"
                  placeholder="Provide a detailed description of the issue..."
                  defaultValue={
                    editingRow
                      ? "My car cannot start like normal, when start the engine the sound is noisy as hell."
                      : ""
                  }
                />
              </div>

              <div className="bg-white rounded-md p-4 border">
                <div className="text-sm text-indigo-600 font-medium mb-2 flex items-center gap-2">
                  <CameraIcon size={16} /> Evidence Upload
                </div>
                <div className="border-dashed border-2 border-gray-200 rounded-md p-8 text-center">
                  <div className="mb-3">Upload Images or Videos</div>
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="w-20 h-12 bg-gray-200 rounded-md" />
                    <div className="w-20 h-12 bg-gray-200 rounded-md" />
                    <div className="w-20 h-12 bg-gray-200 rounded-md" />
                  </div>
                  <button className="px-4 py-2 bg-white border rounded-md">
                    Choose a file
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-md p-4 border">
                <div className="text-sm text-indigo-600 font-medium mb-2 flex items-center gap-2">
                  <BuildingsIcon size={16} /> Service Center Request
                </div>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="service" /> Request replacement
                    part approval
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="service" /> Request repair
                    approval
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="service" /> Request reimbursement
                    (repair completed in advance)
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  onClick={closeForm}
                  className="flex items-center gap-2 px-4 py-2 rounded-md border bg-white"
                >
                  <XCircleIcon size={18} />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={saveChanges}
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white"
                >
                  <CheckCircleIcon size={18} />
                  <span>{editingRow ? "Save Changes" : "Submit Claim"}</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="border-[3px] border-[#EBEBEB] rounded-2xl overflow-visible">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-[#DEE1E6] bg-[#FAFAFA]">
                    <th className="text-left rounded-tl-2xl px-8 py-3 text-base font-medium text-[#686262]">Claim ID</th>
                    <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">Vehicle</th>
                    <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">Vin ID</th>
                    <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">Status</th>
                    <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">Claim Date</th>
                    <th className="text-left rounded-tr-2xl px-8 py-3 text-base font-medium text-[#686262]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className="border-b-2 border-[#DEE1E6] bg-white hover:bg-gray-50">
                      <td className="px-8 py-3 text-[13px] font-medium text-black">
                        {r.id}
                      </td>
                      <td className="px-8 py-3 text-[13px] font-medium text-black">
                        {r.vehicle}
                      </td>
                      <td className="px-8 py-3 text-[13px] font-medium text-black">
                        {r.vin}
                      </td>
                      <td className="px-8 py-3 text-[13px] font-medium text-black">
                        <div className="flex items-center">
                          <StatusDot status={r.status} />
                          <span>{r.status}</span>
                        </div>
                      </td>
                      <td className="px-8 py-3 text-[13px] font-medium text-black">
                        {r.dueDate}
                      </td>
                      <td className="px-8 py-3 text-[13px] font-medium text-black relative">
                        <div
                          className="relative inline-block"
                        >
                          <button
                            onClick={() => {
                              setOpenActionFor(openActionFor === r.id ? null : r.id)
                            }}
                            className="rounded-full hover:bg-gray-100 cursor-pointer"
                          >
                            <DotsThreeIcon size={20} weight="bold" />
                          </button>

                          {openActionFor === r.id && (
                            <div
                              ref={menuRef}
                              className="absolute -right-10 top-7 w-32 bg-white border border-[#DEE1E6] rounded-lg shadow-lg z-50 pointer-events-auto"
                            >
                              <button
                                onClick={() => {
                                  setOpenActionFor(null);
                                  openEditForm(r);
                                }}
                                className="w-full text-left rounded-tl-lg rounded-tr-lg transition-all px-3 py-2 hover:bg-gray-50 cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  setOpenActionFor(null);
                                  setDeletingRow(r);
                                }}
                                className="w-full text-left rounded-bl-lg rounded-br-lg transition-all px-3 py-2 text-red-600 hover:bg-gray-50 cursor-pointer"
                              >
                                Remove
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
              <div>Showing 1 to 10 of {total} results</div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-3 py-1 rounded-md hover:text-indigo-600 disabled:opacity-40"
                >
                  <CaretLeftIcon size={12} /> Previous
                </button>

                <div className="flex items-center gap-2">
                  {pages.map((p) => (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      className={`w-8 h-8 rounded-full text-[12px] font-medium flex items-center justify-center ${
                        currentPage === p
                          ? "bg-indigo-600 text-white"
                          : "bg-white text-[#727674] hover:text-black"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-3 py-1 rounded-md hover:text-indigo-600 disabled:opacity-40"
                >
                  Next <CaretRightIcon size={12} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      {/* Delete modal rendered here so it's inside component tree */}
      <DeleteModal
        row={deletingRow}
        onCancel={() => setDeletingRow(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

// Delete confirmation modal (rendered at bottom)
function DeleteModal({ row, onCancel, onConfirm }) {
  if (!row) return null;
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-white/10 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-[640px] p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-500">
            Delete warranty request for {row.id}/{row.vehicle}
          </div>
          <button onClick={onCancel} className="text-gray-400">
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
            className="mt-2 bg-indigo-600 text-white px-6 py-2 rounded-md"
          >
            I want to delete this request
          </button>
        </div>
      </div>
    </div>
  );
}
