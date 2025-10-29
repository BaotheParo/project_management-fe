import React, { useMemo, useState } from 'react'
import {
  CheckCircleIcon,
  CalendarBlankIcon,
  IdentificationBadgeIcon,
  UserIcon,
  DotsThreeCircleIcon,
  SpinnerIcon,
  MagnifyingGlassIcon,
  InfoIcon,
  CarProfileIcon,
  ClockIcon,
  ListDashesIcon,
} from "@phosphor-icons/react";
import StatusCard from '../components/StatusCard';
import { useTodoWorksApi } from '../../../../api/useTodoWorksApi';
import Loader from '../../../../components/Loader';
import WorkStatusDot from '../components/WorkStatusDot';
import WorkPriority from '../components/WorkPriority';
import { useNavigate } from 'react-router-dom';

export default function TodoWorks() {
  const navigate = useNavigate();

  const { rows, loading, error } = useTodoWorksApi();

  const filters = ["All", "Pending", "InProgress", "Completed", "Overdue"];

  // Filter orders based on active filter and search term
  // const filteredOrders = useMemo(() => {
  //   return rows.filter(order => {
  //     const matchesFilter = activeFilter === 'All' || order.status === activeFilter
  //     const matchesSearch = searchTerm === '' ||
  //       order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       order.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  //     return matchesFilter && matchesSearch
  //   })
  // }, [rows, activeFilter, searchTerm])

  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');

  const visibleCards = useMemo(() => {
    return rows.filter(
      (r) =>
        (filter === 'All' ? true : r.status === filter) &&
        (r.vehicleName.toLowerCase().includes(query.toLowerCase()) ||
          r.id.toLowerCase().includes(query.toLowerCase()))
    );
  }, [rows, filter, query])

  const totalWorks = rows.length;
  const pendingWorks = rows.filter(r => r.status === "Pending").length;
  const inProgressWorks = rows.filter(r => r.status === "InProgress").length;
  const completedWorks = rows.filter(r => r.status === "Completed").length;
  const overduedWorks = rows.filter(r => r.status === "Overdue").length;

  if (loading) return <Loader />;
  if (error)
    return (
      <p className="text-red-500">Error loading works: {error.message}</p>
    );

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

      {/* Stats Cards */}
      <div className="flex flex-wrap gap-6 mt-20 mb-12">
        <StatusCard
          title="Total Claims"
          titleColor="text-indigo-600"
          count={totalWorks}
          description="Currently in your queue"
          icon={ListDashesIcon}
          iconColor={"#4f39f8"}
        />
        <StatusCard
          title="Pending"
          titleColor="text-gray-500"
          count={pendingWorks}
          description="Awaiting assignment"
          icon={DotsThreeCircleIcon}
          iconColor={"#979AA3"}
        />
        <StatusCard
          title="In-Progress"
          titleColor="text-yellow-500"
          count={inProgressWorks}
          description="Being worked on"
          icon={SpinnerIcon}
          iconColor={"#EBB80F"}
        />
        <StatusCard
          title="Completed"
          titleColor="text-green-600"
          count={completedWorks}
          description="Finished today"
          icon={CheckCircleIcon}
          iconColor={"#00a63e"}
        />
        <StatusCard
          title="Overdue"
          titleColor="text-red-500"
          count={overduedWorks}
          description="Currently in your queue"
          icon={ClockIcon}
          iconColor={"#fb2c36"}
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[25px] font-semibold mb-6">Work Orders (8)</h2>
      </div>

      <div className="flex gap-5 flex-wrap w-full justify-between mb-4">
        <div className="bg-gray-100 rounded-full inline-flex gap-2 p-2 overflow-auto">
          {filters.map(
            (f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-sm px-3 py-2 rounded-full text-nowrap ${filter === f
                  ? "bg-indigo-600 text-white font-semibold transition-all cursor-pointer"
                  : "text-black font-semibold hover:bg-white transition-all cursor-pointer"
                  }`}
              >
                {f}
              </button>
            )
          )}
        </div>
        <div className="flex items-center gap-2 bg-[#F1F3F4] rounded-full px-4 py-2">
          <MagnifyingGlassIcon size={20} weight="bold" color="#929594" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="bg-transparent outline-none text-sm font-semibold text-black placeholder-[#929594] flex-1"
          />
        </div>
      </div>

      {visibleCards.length === 0 ? (
        <div className="w-full bg-gray-100 rounded-md p-8 flex items-center justify-center">
          <div className="text-center">
            <InfoIcon size={28} className="mx-auto text-gray-500 mb-3" />
            <div className="font-semibold text-lg mb-1">No Order Found</div>
            <div className="text-sm text-gray-500">
              Try adjusting your search or filters
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleCards.map((r) => (
            <div
              key={r.id}
              className="bg-white border border-[#d8dadf] rounded-2xl shadow-[0_4px_16px_3px_rgba(173,173,173,0.12)] overflow-hidden p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#e1e3ff] flex items-center justify-center text-indigo-600">
                    <CarProfileIcon size={25} weight="bold" color="#4f39f6" />
                  </div>
                  <div>
                    <div className="font-semibold">{r.vehicleName}</div>
                    <div className="text-xs text-gray-500">ID: {r.id}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center">
                    <WorkStatusDot status={r.status} />
                    <span className='font-medium text-[13px]'>{r.status}</span>
                  </div>
                  <div className="">
                    <WorkPriority status={r.priorityDisplay} label={r.priority} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <UserIcon size={16} className="text-gray-500" />
                  {r.customerName || r.customer}
                </div>
                <div className="text-right flex items-center justify-end gap-2">
                  <IdentificationBadgeIcon
                    size={16}
                    className="text-gray-500"
                  />
                  {r.vin}
                </div>
                <div className="flex items-center gap-2">
                  <CalendarBlankIcon size={16} className="text-gray-500" />
                  {r.startDate}
                </div>
                <div className="text-right flex items-center justify-end gap-2">
                  <ClockIcon size={16} className="text-gray-500" />
                  {r.estimateHour ? `${r.estimateHour} hours` : r.eta}
                </div>
              </div>

              <div className="text-sm text-gray-700 mb-4 bg-gray-50 p-3 rounded-md">
                {r.description || r.issue}
              </div>

              <div className="flex items-center justify-end">
                <button
                  onClick={() => navigate(`view-detail/${r.id}`)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white rounded-full cursor-pointer"
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