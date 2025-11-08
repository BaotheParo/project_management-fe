import { useState, useMemo, useEffect } from "react";
import { useWorkOrderData } from "./useWorkOrderData";
import { WORK_ORDER_STATUS, PRIORITY } from "../constants/statusConstants";
import axiosInstance from "../../../../api/axiousInstance";

import {
  CheckCircleIcon,
  SpinnerIcon,
  ListDashesIcon,
  UserCirclePlusIcon,
} from "@phosphor-icons/react";

export function useWorkOrders() {
  // Fetch real data from API
  const { workOrders: apiWorkOrders, loading: apiLoading, error: apiError, refetch: refetchWorkOrders } = useWorkOrderData();
  
  const [orders, setOrders] = useState([]);
  const [activeFilter, setActiveFilter] = useState(WORK_ORDER_STATUS.ALL);
  const [selectedPriority, setSelectedPriority] = useState(PRIORITY.ALL);
  const [searchTerm, setSearchTerm] = useState("");

  // Update orders when API data changes
  useEffect(() => {
    if (apiWorkOrders && apiWorkOrders.length > 0) {
      setOrders(apiWorkOrders);
    }
  }, [apiWorkOrders]);

  // Calculate stats from orders
  const stats = useMemo(() => {
    const pendingCount = orders.filter((o) => o.status === "Pending").length;
    const assignedCount = orders.filter((o) => o.status === "Assigned").length;
    const inProgressCount = orders.filter(
      (o) => o.status === "In Progress"
    ).length;
    const completedCount = orders.filter(
      (o) => o.status === "Completed"
    ).length;

    return {
      counts: { pendingCount, assignedCount, inProgressCount, completedCount },
      cards: [
        {
          count: pendingCount.toString(),
          label: "Pending",
          icon: ListDashesIcon,
          description: "Awaiting assignment",
        },
        {
          count: assignedCount.toString(),
          label: "Assigned",
          icon: UserCirclePlusIcon,
          iconColor: "#0FC3EB",
          description: "Ready to start",
        },
        {
          count: inProgressCount.toString(),
          label: "In Progress",
          icon: SpinnerIcon,
          iconColor: "#EBB80F",
          description: "Being worked on",
        },
        {
          count: completedCount.toString(),
          label: "Completed",
          icon: CheckCircleIcon,
          iconColor: "#00a63e",
          description: "Finished today",
        },
      ],
    };
  }, [orders]);

  // Filter orders based on active filter and search term
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesFilter =
        activeFilter === "All" || order.status === activeFilter;
      const matchesPriority =
        selectedPriority === "All Priority" || order.priority === selectedPriority;
      const matchesSearch =
        searchTerm === "" ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesPriority && matchesSearch;
    });
  }, [orders, activeFilter, searchTerm, selectedPriority]);

  // Helper function to get filter count
  const getFilterCount = (filter) => {
    if (filter === WORK_ORDER_STATUS.ALL) return orders.length;
    if (filter === WORK_ORDER_STATUS.PENDING) return stats.counts.pendingCount;
    if (filter === WORK_ORDER_STATUS.ASSIGNED) return stats.counts.assignedCount;
    if (filter === WORK_ORDER_STATUS.IN_PROGRESS) return stats.counts.inProgressCount;
    if (filter === WORK_ORDER_STATUS.COMPLETED) return stats.counts.completedCount;
    return 0;
  };

  // Handle technician assignment
  const assignTechnician = async (order, technician) => {
    try {
      console.log('Assigning technician:', { orderId: order.id, technicianId: technician.id });
      
      // Call API to assign technician to work order
      await axiosInstance.patch(`/work-orders/${order.id}/assign`, {
        technicianId: technician.id
      });

      console.log('Technician assigned successfully');

      // Refetch work orders from API to get updated data
      refetchWorkOrders();
    } catch (error) {
      console.error('Error assigning technician:', error);
      // You might want to show an error notification to the user here
      throw error; // Re-throw to let the caller handle it if needed
    }
  };

  return {
    orders,
    setOrders,
    activeFilter,
    setActiveFilter,
    searchTerm,
    setSearchTerm,
    filteredOrders,
    selectedPriority,
    setSelectedPriority,
    stats: stats.cards,
    getFilterCount,
    assignTechnician,
    refetch: refetchWorkOrders, // Add refetch function
    loading: apiLoading,
    error: apiError,
  };
}
