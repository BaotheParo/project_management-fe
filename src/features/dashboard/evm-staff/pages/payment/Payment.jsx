// import React from 'react'
// import {
//   CurrencyDollarIcon,
//   TagIcon,
//   BellSimpleIcon,
//   CheckCircleIcon,
//   ArrowUpRightIcon,
//   ArrowDownRighIcon,
//   EyeIcon
// } from '@phosphor-icons/react';
// import { useNavigate } from 'react-router-dom'

// const stats = [
//   { id: 1, title: 'Total Payment Amount', value: '$2,847,350', stat: ' +12,5%' },
//   { id: 2, title: 'Waranty Payment Amount', value: '$1,945,200', stat: '+8,3%' },
//   { id: 3, title: 'Campaign Payment Amount', value: '$902,150', stat: '-2,1%' },
//   { id: 4, title: 'Pending Invoices', value: '127', stat: '+5' },
//   { id: 5, title: 'Paid Invoices', value: '2,843', stat: '-89' },
// ]

// // const titleColorMap = {
// //   1: 'text-gray-400',   // ID 1: Màu xám
// //   2: 'text-green-600',  // ID 2: Màu xanh lá cây
// //   3: 'text-red-600',    // ID 3: Màu đỏ
// //   4: 'text-blue-600',   // ID 4: Màu xanh dương
// // };
// const sampleRows = Array.from({ length: 10 }).map((_, i) => ({
//   orderId: `RO-00${i + 1}`,
//   vehicle: 'VinFast VF-3',
//   vin: 'LSV1E7AL0MC123456',
//   status: ['On hold', 'Done', 'On hold', 'Overdue', 'In Progress', 'On hold', 'On hold', 'Done', 'On hold', 'In Progress'][i],
//   claimDate: '2024-07-21',
// }))

// export default function Payment() {
//   return (
//     <div>
//     <div>
//       <h2 className="text-2xl font-semibold mb-4">Payment</h2>
//       <p>Payment...</p>
//     </div>

//      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
//         {stats.map((s) => (
//           <div
//             key={s.id}
//             className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex justify-between items-center"
//           >
//             <div>
//               {/* <div className={`${titleColorMap[s.id]} font-medium mb-2`}> */}
//                 <div className=" font-medium mb-2">
//                 {s.title}
//               </div>
//               <div className="text-3xl font-bold">{s.value}</div>
//               <div className="text-gray-600 text-sm mt-2">{s.stat}</div>
//             </div>

//           </div>
//         ))}
//       </div>

//             <div className="bg-white rounded-2xl p-6 border border-gray-200">
//               <h2 className="text-xl font-semibold mb-4">Top Pending Invoices</h2>
//               <h3 className="mb-10">Recent Invoices Requiring Attention</h3>
//               <div className="overflow-x-auto">
//                 <table className="w-full table-fixed text-sm">
//                   <thead>
//                     <tr className="text-left text-gray-500 border-b">
//                       <th className="py-3 px-4 w-1/6">Order ID</th>
//                       <th className="py-3 px-4 w-1/4">Vehicle</th>
//                       <th className="py-3 px-4 w-1/3">Vin ID</th>
//                       <th className="py-3 px-4 w-1/6">Status</th>
//                       <th className="py-3 px-4 w-1/6">Claim Date</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {sampleRows.map((r) => (
//                       <tr
//                         key={r.orderId}
//                         className="border-b cursor-pointer hover:bg-gray-50"
//                         onClick={() => handleClaimClick(r.orderId)}
//                       >
//                         <td className="py-3 px-4">{r.orderId}</td>
//                         <td className="py-3 px-4">{r.vehicle}</td>
//                         <td className="py-3 px-4">{r.vin}</td>
//                         <td className="py-3 px-4">
//                           <div className="flex items-center gap-2">
//                             <span
//                               className={`h-2 w-2 rounded-full ${
//                                 r.status === "Done"
//                                   ? "bg-green-400"
//                                   : r.status === "Overdue"
//                                   ? "bg-red-400"
//                                   : r.status === "In Progress"
//                                   ? "bg-yellow-400"
//                                   : "bg-gray-300"
//                               }`}
//                             />
//                             <span className="text-gray-600">{r.status}</span>
//                           </div>
//                         </td>
//                         <td className="py-3 px-4">{r.claimDate}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
//                 <div>Showing 1 to 10 of 247 results</div>
//                 <div className="flex items-center gap-3">
//                   <button className="flex gap-1 items-center px-3 py-1 rounded-full bg-transparent border text-gray-600">
//                     <CaretLeftIcon size={15} />
//                     Previous
//                   </button>
//                   <button className="px-3 py-1 rounded-full bg-indigo-600 text-white">
//                     1
//                   </button>
//                   <button className="px-3 py-1 rounded-full bg-transparent border text-gray-600">
//                     2
//                   </button>
//                   <button className="px-3 py-1 rounded-full bg-transparent border text-gray-600">
//                     3
//                   </button>
//                   <button className="px-3 py-1 rounded-full bg-transparent border text-gray-600">
//                     4
//                   </button>
//                   <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-transparent border text-gray-600">
//                     Next
//                     <CaretRightIcon size={15} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//       </div>
//   )
// }
import React from "react";
import {
  CurrencyDollarIcon,
  ShieldCheckIcon,
  MegaphoneIcon,
  FileIcon,
  CheckCircleIcon,
  EyeIcon,
} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
// Dữ liệu giả (mock data) cho các thẻ thống kê
const statsData = [
  {
    title: "Total Payment Amount",
    amount: "$2,847,350",
    percentage: "+12.5%",
    percentageColor: "text-green-500",
    // Icon đã đổi sang <Dollar />
    icon: <CurrencyDollarIcon className="w-6 h-6 text-blue-600" />,
    iconBgColor: "bg-blue-100",
  },
  {
    title: "Warranty Payment Amount",
    amount: "$1,945,200",
    percentage: "+8.3%",
    percentageColor: "text-green-500",
    // Icon đã đổi sang <ShieldCheck /> và thêm weight="fill"
    icon: <ShieldCheckIcon weight="fill" className="w-6 h-6 text-green-600" />,
    iconBgColor: "bg-green-100",
  },
  {
    title: "Campaign Payment Amount",
    amount: "$902,150",
    percentage: "-2.1%",
    percentageColor: "text-red-500",
    // Icon đã đổi sang <Megaphone /> và thêm weight="fill"
    icon: <MegaphoneIcon weight="fill" className="w-6 h-6 text-purple-600" />,
    iconBgColor: "bg-purple-100",
  },
  {
    title: "Pending Invoices",
    amount: "127",
    percentage: "+5",
    percentageColor: "text-orange-500",
    // Icon đã đổi sang <File /> và thêm weight="fill"
    icon: <FileIcon weight="fill" className="w-6 h-6 text-orange-600" />,
    iconBgColor: "bg-orange-100",
  },
  {
    title: "Paid Invoices",
    amount: "2,843",
    percentage: "+89",
    percentageColor: "text-cyan-500",
    // Icon đã đổi sang <CheckCircle /> và thêm weight="fill"
    icon: <CheckCircleIcon weight="fill" className="w-6 h-6 text-cyan-600" />,
    iconBgColor: "bg-cyan-100",
  },
];

// Dữ liệu giả cho bảng hoá đơn
const invoicesData = [
  {
    id: "INV-2025-001847",
    type: "Warranty",
    serviceCenter: "Tesla Service Center North",
    amount: "$24,850.00",
    status: "Pending",
    date: "Sep 15, 2025",
  },
  {
    id: "INV-2025-001846",
    type: "Campaign",
    serviceCenter: "EV Solutions Downtown",
    amount: "$18,200.00",
    status: "Paid",
    date: "Sep 14, 2025",
  },
  {
    id: "INV-2025-001845",
    type: "Warranty",
    serviceCenter: "AutoTech Service Hub",
    amount: "$31,450.00",
    status: "Pending",
    date: "Sep 13, 2025",
  },
  {
    id: "INV-2025-001844",
    type: "Campaign",
    serviceCenter: "Green Motors West",
    amount: "$12,750.00",
    status: "Pending",
    date: "Sep 12, 2025",
  },
  {
    id: "INV-2025-001843",
    type: "Warranty",
    serviceCenter: "Electric Care Center",
    amount: "$22,900.00",
    status: "Paid",
    date: "Sep 11, 2025",
  },
];

// Component con cho Thẻ Trạng thái (Pending/Paid)
const StatusTag = ({ status }) => {
  const styles = {
    Pending: "bg-orange-100 text-orange-700",
    Paid: "bg-green-100 text-green-700",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
};

// Component con cho Thẻ Loại (Warranty/Campaign)
const TypeTag = ({ type }) => {
  const styles = {
    Warranty: "bg-blue-100 text-blue-700",
    Campaign: "bg-purple-100 text-purple-700",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${styles[type]}`}
    >
      {type}
    </span>
  );
};

// Component con cho Thẻ Thống kê
const StatCard = ({
  title,
  amount,
  percentage,
  percentageColor,
  icon,
  iconBgColor,
}) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        <div className={`p-2 rounded-lg ${iconBgColor}`}>{icon}</div>
      </div>
      <p className="text-3xl font-bold text-gray-800">{amount}</p>
      <span className={`text-xs font-medium ${percentageColor}`}>
        {percentage}
      </span>
    </div>
  );
};

// Component Bảng Hoá đơn
const InvoiceTable = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header của bảng */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Top Pending Invoices
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Recent invoices requiring attention
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-max">
          {/* Table Head */}
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service Center Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Created
              </th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="divide-y divide-gray-200">
            {invoicesData.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                  {invoice.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <TypeTag type={invoice.type} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {invoice.serviceCenter}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                  {invoice.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusTag status={invoice.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {invoice.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer của bảng */}
      <div className="p-4 flex justify-between items-center border-t border-gray-200">
        <span className="text-sm text-gray-500">
          Showing 5 of 127 pending invoices
        </span>
        <button
          onClick={() => navigate("/evm-staff/payment/invoices")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {/* Icon đã đổi sang <Eye /> */}
          <EyeIcon className="w-4 h-4" />
          View All Invoices
        </button>
      </div>
    </div>
  );
};

// Component Dashboard chính
export default function Payment() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Payment Management</h1>
        <p className="text-gray-500">
          Monitor and manage all payment activities
        </p>
      </div>
      {/* Hàng các thẻ thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            amount={stat.amount}
            percentage={stat.percentage}
            percentageColor={stat.percentageColor}
            icon={stat.icon}
            iconBgColor={stat.iconBgColor}
          />
        ))}
      </div>

      {/* Bảng hoá đơn */}
      <InvoiceTable />
    </div>
  );
}
