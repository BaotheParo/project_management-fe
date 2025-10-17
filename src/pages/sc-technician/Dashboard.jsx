import React from 'react'
import { CheckCircleIcon, WrenchIcon, CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'

const stats = [
  { id: 1, title: 'Assigned Orders', value: '12', subtitle: 'Currently in your queue' },
  { id: 2, title: 'Completed Orders', value: '04', subtitle: 'Currently in your queue' },
]

const sampleRows = Array.from({ length: 10 }).map((_, i) => ({
  orderId: `RO-00${i + 1}`,
  vehicle: 'VinFast VF-3',
  vin: 'LSV1E7AL0MC123456',
  status: ['On hold', 'Done', 'On hold', 'Overdue', 'In Progress', 'On hold', 'On hold', 'Done', 'On hold', 'In Progress'][i],
  claimDate: '2024-07-21',
}))

export default function Dashboard() {
  return (
    <div className="w-full">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className=" text-black text-3xl font-bold">Hello, Jso!</h1>
          <p className="text-gray-500">An overview of your works.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {stats.map((s) => (
          <div
            key={s.id}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex justify-between items-center"
          >
            <div>
              <div className="text-indigo-600 font-medium mb-2">{s.title}</div>
              <div className="text-3xl font-bold">{s.value}</div>
              <div className="text-gray-400 text-sm mt-2">{s.subtitle}</div>
            </div>
            <div className="text-gray-300">
              {s.id === 2 ? (
                <CheckCircleIcon size={27} color="#686262" weight="bold" />
              ) : (
                <span>
                  <WrenchIcon size={27} color="#686262" weight="bold" />
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Active Repair Orders</h2>

        <div className="overflow-x-auto">
          <table className="w-full table-fixed text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-3 px-4 w-1/6">Order ID</th>
                <th className="py-3 px-4 w-1/4">Vehicle</th>
                <th className="py-3 px-4 w-1/3">Vin ID</th>
                <th className="py-3 px-4 w-1/6">Status</th>
                <th className="py-3 px-4 w-1/6">Claim Date</th>
              </tr>
            </thead>
            <tbody>
              {sampleRows.map((r) => (
                <tr key={r.orderId} className="border-b">
                  <td className="py-3 px-4">{r.orderId}</td>
                  <td className="py-3 px-4">{r.vehicle}</td>
                  <td className="py-3 px-4">{r.vin}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          r.status === "Done"
                            ? "bg-green-400"
                            : r.status === "Overdue"
                            ? "bg-red-400"
                            : r.status === "In Progress"
                            ? "bg-yellow-400"
                            : "bg-gray-300"
                        }`}
                      />
                      <span className="text-gray-600">{r.status}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{r.claimDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <div>Showing 1 to 10 of 247 results</div>
          <div className="flex items-center gap-3">
            <button className="flex gap-1 items-center px-3 py-1 rounded-full bg-transparent border text-gray-600">
              <CaretLeftIcon size={15} />
              Previous
            </button>
            <button className="px-3 py-1 rounded-full bg-indigo-600 text-white">
              1
            </button>
            <button className="px-3 py-1 rounded-full bg-transparent border text-gray-600">
              2
            </button>
            <button className="px-3 py-1 rounded-full bg-transparent border text-gray-600">
              3
            </button>
            <button className="px-3 py-1 rounded-full bg-transparent border text-gray-600">
              4
            </button>
            <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-transparent border text-gray-600">
              Next
              <CaretRightIcon size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



