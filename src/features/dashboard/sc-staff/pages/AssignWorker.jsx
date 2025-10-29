import StatusCard from "../../../../components/StatusCard";
import WorkOrderCard from "../components/WorkOrderCard";
import FilterTabs from "../components/FilterTabs";
import SearchBar from "../components/SearchBar";
import AssignTechnicianModal from "../components/AssignTechnicianModal";
import EmptyState from "../components/EmptyState";
import PageHeader from "../components/PageHeader";
import PriorityFilter from "../components/PriorityFilter";
import { MOCK_TECHNICIANS } from "../constants/mockData";
import { WORK_ORDER_FILTERS, PRIORITY_OPTIONS } from "../constants/statusConstants";
import { useWorkOrders } from "../hooks/useWorkOrders";
import { useModal } from "../hooks/useModal";

export default function AssignWorker() {
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
  } = useWorkOrders();

  const {
    isOpen: showAssignModal,
    selectedItem: selectedOrder,
    openModal: openAssignModal,
    closeModal: closeAssignModal,
  } = useModal();

  const availableTechnicians = MOCK_TECHNICIANS;
  const filters = WORK_ORDER_FILTERS;

  // Handle technician assignment
  const handleAssignTechnician = (order, technician) => {
    assignTechnician(order, technician);
    closeAssignModal();
  };

  // Handle opening assignment modal
  const handleAssignClick = (order) => {
    openAssignModal(order);
  };

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
        availableTechnicians={availableTechnicians}
        onAssign={handleAssignTechnician}
      />
    </div>
  );
}
