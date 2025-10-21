import React, { useMemo, useState, useRef, useEffect } from 'react'
import {
  CalendarBlankIcon,
  PlusCircleIcon,
  DotsThreeVerticalIcon,
  CaretLeftIcon,
  CaretRightIcon,
  XCircle,
  CheckCircle,
  Info,
  Car,
  Package,
  WarningCircle,
  Camera,
  Buildings,
} from '@phosphor-icons/react'

const sampleRows = Array.from({ length: 10 }).map((_, i) => ({
  id: `RO-00${i + 1}`,
  vehicle: i === 1 ? 'Neiro Green' : 'VinFast VF-3',
  vin: 'LSV1E7AL0MC123456',
  status: [
    'On hold',
    'Done',
    'On hold',
    'Overdue',
    'In Progress',
    'On hold',
    'On hold',
    'Done',
    'On hold',
    'In Progress',
  ][i],
  dueDate: '2024-07-21',
}))

function StatusDot({ status }) {
  const color =
    status === 'Done'
      ? 'bg-green-400'
      : status === 'Overdue'
      ? 'bg-red-400'
      : status === 'In Progress'
      ? 'bg-yellow-400'
      : 'bg-gray-300'
  return <span className={`inline-block w-2 h-2 rounded-full mr-2 ${color}`} />
}

export default function ClaimRequests() {
  const [rows, setRows] = useState(sampleRows)
  const [currentPage, setCurrentPage] = useState(1)
  const [openActionFor, setOpenActionFor] = useState(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const menuRef = useRef(null)
  const closeTimerRef = useRef(null)
  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenActionFor(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuRef])

  const total = 247
  const perPage = 10
  const totalPages = Math.ceil(total / perPage)

  const pages = useMemo(() => [1, 2, 3, 4], [])

  const [editingRow, setEditingRow] = useState(null)
  const [deletingRow, setDeletingRow] = useState(null)

  function openEditForm(row) {
    setEditingRow(row)
    setShowCreateForm(true)
    // Optionally populate form fields from `row`
  }

  function closeForm() {
    setEditingRow(null)
    setShowCreateForm(false)
  }

  function saveChanges() {
    // TODO: wire API/save logic
    setEditingRow(null)
    setShowCreateForm(false)
  }

  function confirmDelete() {
    // remove locally for now; TODO: call delete API
    if (deletingRow) {
      setRows((prev) => prev.filter((r) => r.id !== deletingRow.id))
    }
    setDeletingRow(null)
  }

  return (
    <div className="w-full">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Warranty Claim Requests</h1>
          <p className="text-gray-500">Manage and track warranty claim requests</p>
        </div>


      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="px-4 py-2 bg-white border rounded-full text-sm text-gray-700">Total Claim: <span className="font-semibold">254</span></div>
        <div className="px-4 py-2 bg-white border rounded-full text-sm text-gray-700">Pending: <span className="font-semibold">200</span></div>
        <div className="px-4 py-2 bg-white border rounded-full text-sm text-gray-700">In Progress: <span className="font-semibold">50</span></div>
        <div className="px-4 py-2 bg-white border rounded-full text-sm text-gray-700">Completed: <span className="font-semibold text-green-600">03</span></div>
        <div className="px-4 py-2 bg-white border rounded-full text-sm text-gray-700">Overdue: <span className="font-semibold text-red-500">01</span></div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-[#EBEBEB]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Requested warranties</h2>
          {!showCreateForm && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              <PlusCircleIcon size={16} />
              <span>Create request</span>
            </button>
          )}
        </div>

        {showCreateForm ? (
          <div className="mb-6 bg-gray-50 p-6 rounded-lg border">
            <div className="flex items-center justify-between mb-4">
    <div>
      
      
                <h3 className="text-lg font-semibold">{editingRow ? 'Edit Warranty Claim' : 'Create New Warranty Claim'}</h3>
                <p className="text-sm text-gray-500">Fill out the form below to submit a new warranty claim request for electric vehicle components.</p>
              </div>
              <div />
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-md p-4 border">
                <div className="text-sm text-indigo-600 font-medium mb-2 flex items-center gap-2"><Info size={16} /> {editingRow ? 'Edit Warranty Claim' : 'Basic Information'}</div>
                <div className="grid grid-cols-3 gap-3">
                  <input className="p-3 border rounded-md" placeholder="Claim ID" defaultValue={editingRow?.id || 'WC-2003-9192332'} />
                  <input className="p-3 border rounded-md" placeholder="Claim Date" defaultValue={editingRow ? '02/12/2025' : ''} />
                  <input className="p-3 border rounded-md" placeholder="Service Center" defaultValue={editingRow ? 'WC-2003-9192332' : ''} />
                  <input className="p-3 border rounded-md" placeholder="Created By" defaultValue={editingRow ? 'Jso' : ''} />
                  <select className="p-3 border rounded-md">
                    <option>Select Manufacturer</option>
                  </select>
                </div>
              </div>

              <div className="bg-white rounded-md p-4 border">
                <div className="text-sm text-indigo-600 font-medium mb-2 flex items-center gap-2"><Car size={16} /> Vehicle Information</div>
                <div className="grid grid-cols-3 gap-3">
                  <input className="p-3 border rounded-md" placeholder="VIN code" defaultValue={editingRow?.vin || ''} />
                  <input className="p-3 border rounded-md" placeholder="Enter vehicle name" defaultValue={editingRow?.vehicle || ''} />
                  <input className="p-3 border rounded-md" placeholder="Purchase Date of vehicle" defaultValue={editingRow ? '12/23/2012' : ''} />
                  <input className="p-3 border rounded-md col-span-1" placeholder="Current Mileage (km)" defaultValue={editingRow ? '8,433' : ''} />
                </div>
              </div>

              <div className="bg-white rounded-md p-4 border">
                <div className="text-sm text-indigo-600 font-medium mb-2 flex items-center gap-2"><Package size={16} /> Part Information</div>
                <div className="grid grid-cols-3 gap-3">
                  <input className="p-3 border rounded-md" placeholder="Part Name" defaultValue={editingRow ? 'Battery' : ''} />
                  <input className="p-3 border rounded-md" placeholder="Part Code" defaultValue={editingRow ? 'PIN12334SD' : ''} />
                  <input className="p-3 border rounded-md" placeholder="Replacement Date" defaultValue={editingRow ? '05/16/2025' : ''} />
                </div>
              </div>

              <div className="bg-white rounded-md p-4 border">
                <div className="text-sm text-indigo-600 font-medium mb-2 flex items-center gap-2"><WarningCircle size={16} /> Issue Details</div>
                <textarea className="w-full p-3 border rounded-md min-h-[120px]" placeholder="Provide a detailed description of the issue..." defaultValue={editingRow ? 'My car cannot start like normal, when start the engine the sound is noisy as hell.' : ''} />
              </div>

              <div className="bg-white rounded-md p-4 border">
                <div className="text-sm text-indigo-600 font-medium mb-2 flex items-center gap-2"><Camera size={16} /> Evidence Upload</div>
                <div className="border-dashed border-2 border-gray-200 rounded-md p-8 text-center">
                  <div className="mb-3">Upload Images or Videos</div>
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="w-20 h-12 bg-gray-200 rounded-md" />
                    <div className="w-20 h-12 bg-gray-200 rounded-md" />
                    <div className="w-20 h-12 bg-gray-200 rounded-md" />
                  </div>
                  <button className="px-4 py-2 bg-white border rounded-md">Choose a file</button>
                </div>
              </div>

              <div className="bg-white rounded-md p-4 border">
                <div className="text-sm text-indigo-600 font-medium mb-2 flex items-center gap-2"><Buildings size={16} /> Service Center Request</div>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center gap-2"><input type="radio" name="service" /> Request replacement part approval</label>
                  <label className="flex items-center gap-2"><input type="radio" name="service" /> Request repair approval</label>
                  <label className="flex items-center gap-2"><input type="radio" name="service" /> Request reimbursement (repair completed in advance)</label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6">
                <button onClick={closeForm} className="flex items-center gap-2 px-4 py-2 rounded-md border bg-white">
                  <XCircle size={18} />
                  <span>Cancel</span>
                </button>
                <button onClick={saveChanges} className="flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white">
                  <CheckCircle size={18} />
                  <span>{editingRow ? 'Save Changes' : 'Submit Claim'}</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto overflow-visible">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FAFAFA]">
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">Claim ID</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">Vehicle</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">Vin ID</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">Status</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">Due Date</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">{r.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{r.vehicle}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{r.vin}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <div className="flex items-center">
                          <StatusDot status={r.status} />
                          <span>{r.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{r.dueDate}</td>
                      <td className="px-6 py-4 text-sm text-gray-700 relative">
                        <div className="relative inline-block" onMouseEnter={() => { clearCloseTimer(); setOpenActionFor(r.id); }} onMouseLeave={() => { clearCloseTimer(); closeTimerRef.current = setTimeout(() => setOpenActionFor(null), 200); }}>
                          <button onClick={() => { clearCloseTimer(); setOpenActionFor(r.id); }} className="p-2 rounded-full hover:bg-gray-100">
                            <DotsThreeVerticalIcon size={16} />
                          </button>

                          {openActionFor === r.id && (
                            <div ref={menuRef} onMouseEnter={() => clearCloseTimer()} onMouseLeave={() => { clearCloseTimer(); closeTimerRef.current = setTimeout(() => setOpenActionFor(null), 200); }} className="absolute right-0 top-10 w-32 bg-white border rounded-lg shadow-md z-50 pointer-events-auto">
                              <button onClick={() => { setOpenActionFor(null); openEditForm(r); }} className="w-full text-left px-3 py-2 hover:bg-gray-50">Edit</button>
                              <button onClick={() => { setOpenActionFor(null); setDeletingRow(r); }} className="w-full text-left px-3 py-2 text-red-600 hover:bg-gray-50">Remove</button>
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
                <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="flex items-center gap-2 px-3 py-1 rounded-md hover:text-indigo-600 disabled:opacity-40">
                  <CaretLeftIcon size={12} /> Previous
                </button>

                <div className="flex items-center gap-2">
                  {pages.map((p) => (
                    <button key={p} onClick={() => setCurrentPage(p)} className={`w-8 h-8 rounded-full text-[12px] font-medium flex items-center justify-center ${currentPage === p ? 'bg-indigo-600 text-white' : 'bg-white text-[#727674] hover:text-black'}`}>
                      {p}
                    </button>
                  ))}
                </div>

                <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="flex items-center gap-2 px-3 py-1 rounded-md hover:text-indigo-600 disabled:opacity-40">
                  Next <CaretRightIcon size={12} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      {/* Delete modal rendered here so it's inside component tree */}
      <DeleteModal row={deletingRow} onCancel={() => setDeletingRow(null)} onConfirm={confirmDelete} />
    </div>
  )
}

// Delete confirmation modal (rendered at bottom)
function DeleteModal({ row, onCancel, onConfirm }) {
  if (!row) return null
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-white/10 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-[640px] p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-500">Delete warranty request for {row.id}/{row.vehicle}</div>
          <button onClick={onCancel} className="text-gray-400">✕</button>
        </div>

        <div className="text-center py-6">
          <div className="text-3xl mb-2">🚗</div>
          <div className="font-semibold text-lg mb-1">{row.id}/{row.vehicle}</div>
          <div className="text-sm text-gray-500 mb-4">Car Owner: Jso</div>
          <button onClick={onConfirm} className="mt-2 bg-indigo-600 text-white px-6 py-2 rounded-md">I want to delete this request</button>
        </div>
      </div>
    </div>
  )
}