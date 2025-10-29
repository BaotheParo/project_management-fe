import { useState, useMemo } from "react";
import { MOCK_WORK_ORDERS } from "../constants/mockData";

export function useWorkOrders() {
  const [orders, setOrders] = useState(MOCK_WORK_ORDERS);
  const [activeFilter, setActiveFilter] = useState("All");
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
          description: "Awaiting assignment",
          color: "text-[#979AA3]",
        },
        {
          count: assignedCount.toString(),
          label: "Assigned",
          description: "Ready to start",
          color: "text-[#0FC3EB]",
        },
        {
          count: inProgressCount.toString(),
          label: "In Progress",
          description: "Being worked on",
          color: "text-[#EBB80F]",
        },
        {
          count: completedCount.toString(),
          label: "Completed",
          description: "Finished today",
          color: "text-[#54C020]",
        },
      ],
    };
  }, [orders]);

  // Filter orders based on active filter and search term
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesFilter =
        activeFilter === "All" || order.status === activeFilter;
      const matchesSearch =
        searchTerm === "" ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [orders, activeFilter, searchTerm]);

  // Helper function to get filter count
  const getFilterCount = (filter) => {
    if (filter === "All") return orders.length;
    if (filter === "Pending") return stats.counts.pendingCount;
    if (filter === "Assigned") return stats.counts.assignedCount;
    if (filter === "In Progress") return stats.counts.inProgressCount;
    if (filter === "Completed") return stats.counts.completedCount;
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
    stats: stats.cards,
    getFilterCount,
    assignTechnician,
  };
}
