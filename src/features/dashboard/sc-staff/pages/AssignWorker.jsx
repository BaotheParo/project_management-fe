import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import {
  CheckCircleIcon,
  SpinnerIcon,
  ListDashesIcon,
  UserCirclePlusIcon,
} from "@phosphor-icons/react";
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
  const location = useLocation();
  const [notification, setNotification] = useState(null);
  
  // Use custom hooks
  const {
    orders,
    activeFilter,
    setActiveFilter,
    searchTerm,
    setSearchTerm,
    assignTechnician,
    selectedPriority,
    setSelectedPriority,
    refetch,
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
  
  // Refetch work orders when navigating from accept claim
  useEffect(() => {
    if (location.state?.refresh) {
      console.log('🔄 Refetching work orders after claim acceptance')
      refetch()
    }
  }, [location.state, refetch])
  
  // Filter work orders to only show those whose claims have been accepted by SC Staff
  const acceptedClaimIds = useMemo(() => {
    const stored = localStorage.getItem('acceptedClaimsBySCStaff')
    console.log('🔍 Reading from localStorage key "acceptedClaimsBySCStaff":', stored)
    const parsed = JSON.parse(stored || '[]')
    console.log('🔍 Parsed accepted claim IDs:', parsed)
    return parsed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]) // Re-read when navigation state changes
  
  // Map work orders with their claim IDs and filter
  const filteredOrdersByAcceptance = useMemo(() => {
    console.log('🔍 Accepted claim IDs (for filtering):', acceptedClaimIds)
    console.log('📋 All work orders count:', orders.length)
    console.log('📋 All work orders:', orders)
    
    // If no claims accepted yet, show empty
    if (acceptedClaimIds.length === 0) {
      console.log('⚠️ No accepted claims yet')
      return []
    }
    
    // Show all claimIds first
    console.log('📋 All claimIds in work orders:', orders.map(o => o.claimId))
    console.log('🔍 Looking for these accepted claimIds:', acceptedClaimIds)
    
    // Only show work orders for claims that SC Staff has accepted
    const filtered = orders.filter(order => {
      // Extract claim ID from work order
      const claimId = order.claimId
      const isAccepted = acceptedClaimIds.includes(claimId)
      
      console.log(`📋 Order ${order.id?.slice(0, 8)}: claimId="${claimId?.slice(0, 8)}...", accepted=${isAccepted}`)
      return isAccepted
    })
    
    console.log('✅ Filtered orders (should show):', filtered.length, 'orders')
    console.log('✅ Filtered order details:', filtered)
    return filtered
  }, [orders, acceptedClaimIds])
  
  // Override filteredOrders to use our acceptance filter
  const displayOrders = useMemo(() => {
    console.log('🎯 Computing displayOrders...')
    console.log('🎯 filteredOrdersByAcceptance:', filteredOrdersByAcceptance.length, 'orders')
    console.log('🎯 filteredOrdersByAcceptance details:', filteredOrdersByAcceptance)
    console.log('🎯 activeFilter:', activeFilter)
    console.log('🎯 selectedPriority:', selectedPriority)
    console.log('🎯 searchTerm:', searchTerm)
    
    // Apply status and priority filters on top of acceptance filter
    let result = filteredOrdersByAcceptance
    
    if (activeFilter !== 'All') {
      console.log('🎯 Filtering by status:', activeFilter)
      result = result.filter(o => {
        console.log(`   Order ${o.id?.slice(0, 8)}: status="${o.status}" === "${activeFilter}"? ${o.status === activeFilter}`)
        return o.status === activeFilter
      })
      console.log('🎯 After status filter:', result.length)
    }
    
    if (selectedPriority !== 'All Priority' && selectedPriority !== 'All') {
      console.log('🎯 Filtering by priority:', selectedPriority)
      result = result.filter(o => {
        console.log(`   Order ${o.id?.slice(0, 8)}: priority="${o.priority}" === "${selectedPriority}"? ${o.priority === selectedPriority}`)
        return o.priority === selectedPriority
      })
      console.log('🎯 After priority filter:', result.length)
    }
    
    if (searchTerm) {
      console.log('🎯 Filtering by search:', searchTerm)
      result = result.filter(o => 
        o.claimNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.vehicle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.vin?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      console.log('🎯 After search filter:', result.length)
    }
    
    console.log('🎯 Final displayOrders:', result.length, 'orders')
    console.log('🎯 Final displayOrders details:', result)
    return result
  }, [filteredOrdersByAcceptance, activeFilter, selectedPriority, searchTerm])
  
  // Calculate stats based on accepted orders only
  const acceptedStats = useMemo(() => {
    const pendingCount = filteredOrdersByAcceptance.filter((o) => o.status === "Pending").length;
    const assignedCount = filteredOrdersByAcceptance.filter((o) => o.status === "Assigned").length;
    const inProgressCount = filteredOrdersByAcceptance.filter((o) => o.status === "In Progress").length;
    const completedCount = filteredOrdersByAcceptance.filter((o) => o.status === "Completed").length;

    return [
      {
        count: pendingCount.toString(),
        label: "Awaiting assignment",
        icon: ListDashesIcon,
        description: "Awaiting assignment",
      },
      {
        count: assignedCount.toString(),
        label: "Ready to start",
        icon: UserCirclePlusIcon,
        iconColor: "#0FC3EB",
        description: "Ready to start",
      },
      {
        count: inProgressCount.toString(),
        label: "Being worked on",
        icon: SpinnerIcon,
        iconColor: "#EBB80F",
        description: "Being worked on",
      },
      {
        count: completedCount.toString(),
        label: "Finished today",
        icon: CheckCircleIcon,
        iconColor: "#00a63e",
        description: "Finished today",
      },
    ];
  }, [filteredOrdersByAcceptance])
  
  // Get filter count for accepted orders only
  const getAcceptedFilterCount = (filter) => {
    if (filter === "All") return filteredOrdersByAcceptance.length;
    if (filter === "Pending") return filteredOrdersByAcceptance.filter(o => o.status === "Pending").length;
    if (filter === "Assigned") return filteredOrdersByAcceptance.filter(o => o.status === "Assigned").length;
    if (filter === "In Progress") return filteredOrdersByAcceptance.filter(o => o.status === "In Progress").length;
    if (filter === "Completed") return filteredOrdersByAcceptance.filter(o => o.status === "Completed").length;
    return 0;
  }

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

      {/* Stats Cards - Only show stats for accepted work orders */}
      <div className="flex flex-wrap gap-4 mb-8">
        {acceptedStats.map((stat, index) => (
          <StatusCard key={index} {...stat} />
        ))}
      </div>

      {/* Work Orders Section */}
      <div className="mb-6">
        <h2 className="text-[25px] font-semibold mb-6">
          Work Orders ({displayOrders.length})
        </h2>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Filter Tabs - Only count accepted orders */}
          <FilterTabs
            filters={filters}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            getFilterCount={getAcceptedFilterCount}
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
        {displayOrders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayOrders.map((order, index) => (
              <WorkOrderCard
                key={index}
                order={order}
                onAssignClick={handleAssignClick}
              />
            ))}
          </div>
        ) : (
          <EmptyState 
            title="No Work Orders to Display"
            message="Accept claims from the View Detail page to see work orders here"
          />
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
