import React, { useMemo, useState, useRef, useEffect } from "react";
import {
  PlusCircleIcon,
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
  CloudArrowUpIcon,
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

  const [showClaimRequest, setClaimRequest] = useState(null);
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
        <div className="flex justify-between">
          <h2 className="text-[25px] font-semibold text-black">
            {showCreateForm
              ? editingRow
                ? "Edit Warranty Claim"
                : "Create New Warranty Claim"
              : "Requested Claim"}
          </h2>
          {!showCreateForm && (
            <button
              onClick={() => {
                setEditingRow(null);
                setShowCreateForm(true);
              }}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition-all text-white px-4 py-2 rounded-full cursor-pointer"
            >
              <PlusCircleIcon size={16} />
              <span>Create request</span>
            </button>
          )}
        </div>
        <p className="text-sm text-gray-500">
          {showCreateForm
            ? editingRow
              ? "Fill out the form below to submit or edit a warranty claim."
              : "Fill out the form below to submit a new warranty claim request for electric vehicle components."
            : ""}
        </p>

        {showCreateForm ? (
          <div className="mb-6 mt-9">
            <div className="space-y-10">
              <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                <div className="text-md text-indigo-600 font-medium mb-6 flex items-center gap-2">
                  <InfoIcon size={20} weight="bold"/>{" "}
                  {editingRow ? "Edit Warranty Claim" : "Basic Information"}
                </div>
                <div className="grid grid-cols-3 gap-10">
                  <div className="w-full">
                    <p className="text-sm mb-2 text-[#6B716F]">Claim Id</p>
                    <input
                      readOnly="true"
                      className="p-3 bg-[#F9FAFB] border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                      placeholder="Claim ID"
                      aria-disabled
                      defaultValue={editingRow?.id || "WC-2003-9192332"}
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-sm mb-2 text-[#6B716F]">Claim Date</p>
                    <input
                      className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                      placeholder="Claim Date"
                      defaultValue={editingRow ? "02/12/2025" : ""}
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-sm mb-2 text-[#6B716F]">Service Center</p>
                    <input
                      className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                      placeholder="Service Center"
                      defaultValue={editingRow ? "WC-2003-9192332" : ""}
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-sm mb-2 text-[#6B716F]">Created By</p>
                    <input
                      readOnly="true"
                      className="p-3 bg-[#F9FAFB] border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                      placeholder="Created By"
                      defaultValue={editingRow ? "Jso" : ""}
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-sm mb-2 text-[#6B716F]">Manufacturer</p>
                    <select className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none">
                      <option>Select Manufacturer</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                <div className="text-md text-indigo-600 font-medium mb-6 flex items-center gap-2">
                  <CarIcon size={20} weight="bold" /> Vehicle Information
                </div>
                <div className="grid grid-cols-3 gap-10">
                  <div className="w-full">
                    <p className="text-sm mb-2 text-[#6B716F]">VIN code</p>
                    <input
                      className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                      placeholder="VIN code"
                      defaultValue={editingRow?.vin || ""}
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-sm mb-2 text-[#6B716F]">Vehicle Name</p>
                    <input
                      className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                      placeholder="Enter vehicle name"
                      defaultValue={editingRow?.vehicle || ""}
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-sm mb-2 text-[#6B716F]">Purchase Date of vehicle</p>
                    <input
                      className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                      placeholder="Purchase Date of vehicle"
                      defaultValue={editingRow ? "12/23/2012" : ""}
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-sm mb-2 text-[#6B716F]">Current Mileage (km)</p>
                    <input
                      className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                      placeholder="Current Mileage (km)"
                      defaultValue={editingRow ? "8,433" : ""}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                <div className="text-md text-indigo-600 font-medium mb-6 flex items-center gap-2">
                  <PackageIcon size={20} weight="bold" /> Part Information
                </div>
                <div className="grid grid-cols-3 gap-10">
                  <div className="w-full">
                    <p className="text-sm mb-2 text-[#6B716F]">Part Name</p>
                    <input
                      className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                      placeholder="Part Name"
                      defaultValue={editingRow ? "Battery" : ""}
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-sm mb-2 text-[#6B716F]">Part Code</p>
                    <input
                      className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                      placeholder="Part Code"
                      defaultValue={editingRow ? "PIN12334SD" : ""}
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-sm mb-2 text-[#6B716F]">Replacement Date</p>
                    <input
                      className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                      placeholder="Replacement Date"
                      defaultValue={editingRow ? "05/16/2025" : ""}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                <div className="text-md text-indigo-600 font-medium mb-6 flex items-center gap-2">
                  <WarningCircleIcon size={20} weight="bold" /> Issue Details
                </div>
                <div>
                  <p className="text-sm mb-2 text-[#6B716F]">Issue Description</p>
                  <textarea
                  className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none min-h-[120px]"
                  placeholder="Provide a detailed description of the issue..."
                  defaultValue={
                    editingRow
                      ? "My car cannot start like normal, when start the engine the sound is noisy as hell."
                      : ""
                  }
                />
                </div>
              </div>

              <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                <div className="text-md text-indigo-600 font-medium mb-6 flex items-center gap-2">
                  <CameraIcon size={20} weight="bold" /> Evidence Upload
                </div>
                <div className="flex flex-col items-center justify-between border-dashed border-2 border-gray-200 rounded-md p-8 text-center">
                  <CloudArrowUpIcon size={50} color="#9CA3AF" weight="fill" />
                  <div className="leading-1 mt-4 mb-10">
                    <p className="mb-3 text-xl font-medium">Upload Images or Videos</p>
                    <p className="mb-3 text-md text-[#6B7280] font-medium">
                      Drag and drop files here or click to browse
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="w-20 h-12 bg-gray-200 rounded-md" />
                    <div className="w-20 h-12 bg-gray-200 rounded-md" />
                    <div className="w-20 h-12 bg-gray-200 rounded-md" />
                  </div>
                  <div>
                    <button className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-all text-white cursor-pointer">
                      Choose a file
                    </button>
                    <p className="mt-3 text-sm text-[#6B7280]">
                      Max file size: 10MB per file. Supported formats: JPG, PNG,MP4, MOV
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                <div className="text-md text-indigo-600 font-medium mb-6 flex items-center gap-2">
                  <BuildingsIcon size={20} weight="bold" /> Service Center Request
                </div>
                <div className="space-y-2 text-md">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="service" /> Request replacement
                    part approval
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="service" /> Request repair
                    approval
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="service" /> Request reimbursement
                    (repair completed in advance)
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  onClick={closeForm}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F1F3F4] hover:bg-[#dfe0e2] transition-all cursor-pointer"
                >
                  <XCircleIcon size={18} />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={saveChanges}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-all text-white cursor-pointer"
                >
                  <CheckCircleIcon size={18} />
                  <span>{editingRow ? "Save Changes" : "Submit Claim"}</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="border-[3px] border-[#EBEBEB] rounded-2xl overflow-visible mt-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-[#DEE1E6] bg-[#FAFAFA]">
                    <th className="text-left rounded-tl-2xl px-8 py-3 text-base font-medium text-[#686262]">
                      Claim ID
                    </th>
                    <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">
                      Vehicle
                    </th>
                    <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">
                      Vin ID
                    </th>
                    <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">
                      Status
                    </th>
                    <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">
                      Claim Date
                    </th>
                    <th className="text-left rounded-tr-2xl px-8 py-3 text-base font-medium text-[#686262]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr
                      key={r.id}
                      className="border-b-2 border-[#DEE1E6] bg-white hover:bg-gray-50"
                    >
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
                        <div className="relative inline-block">
                          <button
                            onClick={() => {
                              setOpenActionFor(
                                openActionFor === r.id ? null : r.id
                              );
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

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
              <div>Showing 1 to 10 of {total} results</div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-3 py-1 cursor-pointer rounded-md hover:text-indigo-600 disabled:opacity-40"
                >
                  <CaretLeftIcon size={12} /> Previous
                </button>

                <div className="flex items-center gap-2">
                  {pages.map((p) => (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      className={`w-8 h-8 rounded-full text-[12px] font-medium flex items-center justify-center cursor-pointer ${
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
                  className="flex items-center gap-2 px-3 py-1 cursor-pointer rounded-md hover:text-indigo-600 disabled:opacity-40"
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
