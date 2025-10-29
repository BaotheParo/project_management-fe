import { useState, useMemo } from "react";
import { MOCK_WORK_ORDERS } from "../constants/mockData";
import { WORK_ORDER_STATUS, PRIORITY } from "../constants/statusConstants";

import {
  CheckCircleIcon,
  SpinnerIcon,
  ListDashesIcon,
  UserCirclePlusIcon,
} from "@phosphor-icons/react";

export function useWorkOrders() {
  const [orders, setOrders] = useState(MOCK_WORK_ORDERS);
  const [activeFilter, setActiveFilter] = useState(WORK_ORDER_STATUS.ALL);
  const [selectedPriority, setSelectedPriority] = useState(PRIORITY.ALL);
  const [searchTerm, setSearchTerm] = useState("");

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
  const assignTechnician = (order, technician) => {
    setOrders(
      orders.map((o) =>
        o.id === order.id
          ? { ...o, status: "Assigned", technician: technician.name }
          : o
      )
    );
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
  };
}
