import React, { useMemo, useState } from 'react'
import { Car, PlusCircleIcon, CalendarBlankIcon, WarningCircle, Wrench, Info, User, IdentificationBadge, Clock, IdentificationBadgeIcon, UserIcon, CarIcon } from '@phosphor-icons/react'

const sampleCards = Array.from({ length: 8 }).map((_, i) => ({
  id: `RO-00${i + 1}`,
  vehicle: 'VinFast VF-3',
  vin: 'LSV1E7AL0MC123456',
  owner: 'Andrew',
  date: 'July 21, 2025',
  eta: '3-4 hours',
  status: ['In Progress', 'Completed', 'Pending', 'In Progress', 'Overdue'][i % 5],
  priority: ['High', 'Low', 'Medium'][i % 3],
  excerpt: 'Battery thermal management system showing error codes. Customer reports reduced range and charging speed.',
}))

function StatusBadge({ status }) {
  const color =
    status === 'Completed' ? 'bg-green-100 text-green-700' : status === 'Overdue' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
  return <span className={`px-2 py-1 text-xs rounded-full font-semibold ${color}`}>{status}</span>
}

export default function TodoWorks() {
  const [cards] = useState(sampleCards)
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)

  const visible = useMemo(() => {
    return cards.filter((c) => (filter === 'All' ? true : c.status === filter) && (c.vehicle.toLowerCase().includes(query.toLowerCase()) || c.id.toLowerCase().includes(query.toLowerCase())))
  }, [cards, filter, query])

  return (
    <div className="w-full">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Todo Works</h1>
          <p className="text-gray-400 mt-1">
            Manage and track warranty claim requests
          </p>
        </div>
        <div />
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="px-4 py-2 bg-white border rounded-full text-sm text-gray-700">
          Total Works: <span className="font-semibold">254</span>
        </div>
        <div className="px-4 py-2 bg-white border rounded-full text-sm text-gray-700">
          In-Queue: <span className="font-semibold">200</span>
        </div>
        <div className="px-4 py-2 bg-white border rounded-full text-sm text-gray-700">
          Working: <span className="font-semibold text-yellow-600">50</span>
        </div>
        <div className="px-4 py-2 bg-white border rounded-full text-sm text-gray-700">
          Completed: <span className="font-semibold text-green-600">03</span>
        </div>
        <div className="px-4 py-2 bg-white border rounded-full text-sm text-gray-700">
          Overdue: <span className="font-semibold text-red-500">01</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Work Orders (8)</h2>
        <div className="flex items-center gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="px-3 py-2 border rounded-full text-sm w-56"
          />
        </div>
      </div>

      <div className="mb-4">
        <div className="bg-gray-100 rounded-full inline-flex p-1">
          {["All", "Pending", "In Progress", "Completed", "Overdue"].map(
            (f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-sm px-3 py-2 rounded-full ${
                  filter === f ? "bg-indigo-600 text-white" : "text-gray-700"
                }`}
              >
                {f}
              </button>
            )
          )}
        </div>
      </div>

      {selected ? (
        <WorkOrderDetails row={selected} onClose={() => setSelected(null)} />
      ) : visible.length === 0 ? (
        <div className="w-full bg-gray-100 rounded-md p-8 flex items-center justify-center">
          <div className="text-center">
            <Info size={28} className="mx-auto text-gray-500 mb-3" />
            <div className="font-semibold text-lg mb-1">No Order Found</div>
            <div className="text-sm text-gray-500">
              Try adjusting your search or filters
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((c) => (
            <div
              key={c.id}
              className="bg-white border rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <CarIcon size={20} />
                  </div>
                  <div>
                    <div className="font-semibold">{c.vehicle}</div>
                    <div className="text-xs text-gray-500">ID: {c.id}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <StatusBadge status={c.status} />
                  <div className="text-xs text-gray-400">{c.priority}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <UserIcon size={16} className="text-gray-500" />
                  {c.owner}
                </div>
                <div className="text-right flex items-center justify-end gap-2">
                  <IdentificationBadgeIcon size={16} className="text-gray-500" />
                  {c.vin}
                </div>
                <div className="flex items-center gap-2">
                  <CalendarBlankIcon size={16} className="text-gray-500" />
                  {c.date}
                </div>
                <div className="text-right flex items-center justify-end gap-2">
                  <Clock size={16} className="text-gray-500" />
                  {c.eta}
                </div>
              </div>

              <div className="text-sm text-gray-700 mb-4 bg-gray-50 p-3 rounded-md">
                {c.excerpt}
              </div>

              <div className="flex items-center justify-end">
                <button
                  onClick={() => setSelected(c)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-full"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function WorkOrderDetails({ row, onClose }) {
if (!row) return null
return (
  <div className="w-full">
    <h2 className="text-xl font-semibold mb-1">Work Orders #{row.id}</h2>
    <div className="text-sm text-gray-500 mb-6">{row.vehicle} - {row.owner}</div>

    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 space-y-4">
        <div className="bg-white rounded-md p-4 border">
          <div className="text-sm text-indigo-600 font-medium mb-2 flex items-center gap-2"><Car size={16} /> Vehicle Information</div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-xs text-gray-500">Make & Model</div>
              <div className="font-semibold">{row.vehicle}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Purchase Date of Vehicle</div>
              <div className="font-semibold">July 12, 2022</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">VIN</div>
              <div className="font-semibold">{row.vin}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Mileage</div>
              <div className="font-semibold">1,922 km</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md p-4 border">
          <div className="text-sm text-indigo-600 font-medium mb-2 flex items-center gap-2"><WarningCircle size={16} /> Issue Details</div>
          <div className="text-sm">
            <div className="text-xs text-gray-500 mb-2">Issue Overview</div>
            <div className="mb-4">Battery thermal management system showing error codes.</div>
            <div className="text-xs text-gray-500 mb-2">Issue Description</div>
            <div>Battery thermal management system showing error codes. Customer reports reduced range and charging speed. Regenerative braking system intermittent failure during highway driving.</div>
          </div>
        </div>

        <div className="bg-white rounded-md p-4 border">
          <div className="text-sm text-indigo-600 font-medium mb-2 flex items-center gap-2"><Wrench size={16} /> Work Details</div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-xs text-gray-500">Priority</div>
              <div className="font-semibold">Medium</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Estimated Hours</div>
              <div className="font-semibold">3-4 hours</div>
            </div>
            <div className="col-span-2">
              <div className="text-xs text-gray-500">Parts Required</div>
              <div className="font-semibold">Brake control module, Brake sensor</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-md p-4 border">
          <div className="text-sm text-indigo-600 font-medium mb-2 flex items-center gap-2"><User size={16} /> Customer Information</div>
          <div className="text-sm">
            <div className="text-xs text-gray-500">Name</div>
            <div className="font-semibold">{row.owner}</div>
            <div className="text-xs text-gray-500 mt-3">Phone</div>
            <div>09223447364</div>
            <div className="text-xs text-gray-500 mt-3">Email</div>
            <div>sme@gmail.com</div>
            <div className="text-xs text-gray-500 mt-3">Address</div>
            <div>21 Liverpool Street, England</div>
          </div>
        </div>

        <div className="bg-white rounded-md p-4 border">
          <div className="text-sm text-indigo-600 font-medium mb-2 flex items-center gap-2"><CalendarBlankIcon size={16} /> Schedule</div>
          <div className="text-sm">
            <div className="text-xs text-gray-500">Schedule Date</div>
            <div className="font-semibold">August 3, 2025</div>
            <div className="text-xs text-gray-500 mt-3">Schedule Time</div>
            <div>3:12 PM</div>
          </div>
        </div>

        <div className="bg-white rounded-md p-4 border">
          <div className="text-sm text-indigo-600 font-medium mb-2">Actions</div>
          <div className="flex flex-col">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md mb-2">Complete Work</button>
            <button onClick={onClose} className="px-4 py-2 border rounded-md">Back</button>
          </div>
        </div>
      </div>
    </div>
  </div>
)
}