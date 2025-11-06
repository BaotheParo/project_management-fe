import { useState } from "react";
import StatusCard from "../../../../components/StatusCard";
import WorkOrderCard from "../components/WorkOrderCard";
import FilterTabs from "../components/FilterTabs";
import SearchBar from "../components/SearchBar";
import AssignTechnicianModal from "../components/AssignTechnicianModal";
import EmptyState from "../components/EmptyState";
import PageHeader from "../components/PageHeader";
import PriorityFilter from "../components/PriorityFilter";
import Loader from "../../../../components/Loader";
import { SuccessNotification, ErrorNotification } from "../../../../components/Notification";
import { WORK_ORDER_FILTERS, PRIORITY_OPTIONS } from "../constants/statusConstants";
import { useWorkOrders } from "../hooks/useWorkOrders";
import { useModal } from "../hooks/useModal";
import { useTechnicians } from "../hooks/useTechnicians";

export default function AssignWorker() {
  const [notification, setNotification] = useState(null);
  // Use custom hooks
  const {
    orders,
    activeFilter,
    setActiveFilter,
    searchTerm,
    setSearchTerm,
    filteredOrders,
    stats,
    getFilterCount,
    assignTechnician,
    selectedPriority,
    setSelectedPriority,
    loading: workOrdersLoading,
    error: workOrdersError,
  } = useWorkOrders();

  const {
    technicians,
    loading: techniciansLoading,
    error: techniciansError,
  } = useTechnicians();

  const {
    isOpen: showAssignModal,
    selectedItem: selectedOrder,
    openModal: openAssignModal,
    closeModal: closeAssignModal,
  } = useModal();

  const filters = WORK_ORDER_FILTERS;

  // Handle technician assignment
  const handleAssignTechnician = async (order, technician) => {
    try {
      await assignTechnician(order, technician);
      closeAssignModal();
      
      // Show success notification
      setNotification({
        type: 'success',
        message: 'Technician assigned successfully!',
        subText: `${technician.name} has been assigned to ${order.claimNumber || order.id}`
      });
    } catch (error) {
      console.error('Failed to assign technician:', error);
      
      // Show error notification
      setNotification({
        type: 'error',
        message: 'Failed to assign technician',
        subText: error.response?.data?.message || 'Please try again later'
      });
    }
  };

  // Handle opening assignment modal
  const handleAssignClick = (order) => {
    openAssignModal(order);
  };

  // Show loading state
  if (workOrdersLoading || techniciansLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  // Show error state
  if (workOrdersError || techniciansError) {
    return (
      <div className="min-h-screen bg-white p-6 md:p-12">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error loading data</p>
          <p>{workOrdersError?.message || techniciansError?.message || 'An error occurred'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6 md:p-12">
      {/* Header */}
      <PageHeader />

      {/* Stats Cards */}
      <div className="flex flex-wrap gap-4 mb-8">
        {stats.map((stat, index) => (
          <StatusCard key={index} {...stat} />
        ))}
      </div>

      {/* Work Orders Section */}
      <div className="mb-6">
        <h2 className="text-[25px] font-semibold mb-6">
          Work Orders ({orders.length})
        </h2>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Filter Tabs */}
          <FilterTabs
            filters={filters}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            getFilterCount={getFilterCount}
          />

          {/* Priority Filter */}
          <PriorityFilter
            selectedPriority={selectedPriority}
            onPriorityChange={setSelectedPriority}
            priorities={PRIORITY_OPTIONS}
          />

          {/* Search */}
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search..."
          />
        </div>

        {/* Work Order Cards Grid or Empty State */}
        {filteredOrders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map((order, index) => (
              <WorkOrderCard
                key={index}
                order={order}
                onAssignClick={handleAssignClick}
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>

      {/* Assign Technician Modal */}
      <AssignTechnicianModal
        isOpen={showAssignModal}
        onClose={closeAssignModal}
        selectedOrder={selectedOrder}
        availableTechnicians={technicians}
        onAssign={handleAssignTechnician}
      />

      {/* Notifications */}
      {notification?.type === 'success' && (
        <SuccessNotification
          message={notification.message}
          subText={notification.subText}
          onClose={() => setNotification(null)}
        />
      )}
      {notification?.type === 'error' && (
        <ErrorNotification
          message={notification.message}
          subText={notification.subText}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}
