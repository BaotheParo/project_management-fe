import { useEffect, useState } from "react";
import axiousInstance from "./axiousInstance";
import { getWorkStatusLabel } from "../constants/WorkStatus";
import { getPriorityStatusLabel } from "../constants/TodoWorkPriority";

export const useTodoWorksApi = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTodoWorks = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axiousInstance.get("/work-orders");

            const data = Array.isArray(response.data.items)
                ? response.data.items
                : response.data?.items || [];

            if (!Array.isArray(data)) {
                console.warn("Unexpected response structure: ", response.data.items);
                setRows([]);
                return;
            }

            const formattedTodoWorks = data.map((work) => ({
                id: work.workOrderId || `RO-${work.claimId}`,
                vehicle: work.vehicleName || "Unknown Vehicle",
                vin: work.vin || "N/A",
                customerName: work.customerName || "N/A",
                date: work.startDate ? new Date(work.startDate).toLocaleDateString() : "N/A",
                eta: work.estimateHour ? `${work.estimateHour}h` : "N/A",
                status: getWorkStatusLabel(work.workStatus),
                priority: getPriorityStatusLabel(work.workPriority),
                issue: work.description || "No description available",
                technician: work.technicianName || "Unassigned",
            }));

            setRows(formattedTodoWorks);
        } catch (err) {
            console.error("Fetch todo work failed", err)
            setError(err);
            // fallback mock data
            setRows([
                {
                    id: "RO-001",
                    description: "VinFast VF-3",
                    startDate: "LSV1E7AL0MC123456",
                    endDate: "In Progress",
                    estimateHour: "2025-10-25",
                    status: "Complete",
                    priority: "HIGH",
                    claimId: "OR-232",
                    technicianName: "Jso",
                    customerName: "Nhat",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const createWork = async (payload) => {
        await axiousInstance.post("/claims", payload);
        await fetchTodoWorks();
    };

    const updateWork = async (id, payload) => {
        await axiousInstance.put(`/claims/${id}`, payload);
        await fetchTodoWorks();
    };

    const deleteWork = async (id) => {
        await axiousInstance.delete(`/claims/${id}`);
        await fetchTodoWorks();
    };

    useEffect(() => {
        fetchTodoWorks();
    }, []);

    return { rows, loading, error, createWork, updateWork, deleteWork };
}