import { useEffect, useState } from "react";
import axiousInstance from "./axiousInstance";
import { getWorkStatusLabel } from "../constants/WorkStatus";
import { getPriorityStatusLabel } from "../constants/WorkPriority";

export const useTodoWorksApi = () => {
    const [workRows, setRows] = useState([]);
    const [workRow, setRow] = useState(null);
    const [workLoading, setLoading] = useState(true);
    const [workError, setError] = useState(null);

    // Fetch all Works
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
                id: work.workOrderId,
                vehicleName: work.vehicleName || "Unknown Vehicle",
                vin: work.vin || "N/A",
                customerName: work.customerName || "N/A",
                startDate: work.startDate ? new Date(work.startDate).toLocaleDateString() : "N/A",
                endDate: work.endDate ? new Date(work.endDate).toLocaleTimeString() : "N/A",
                estimateHour: work.estimateHour ? `${work.estimateHour} hours` : "N/A",
                status: work.statusDisplay,
                priority: getPriorityStatusLabel(work.priority),
                priorityDisplay: work.priorityDisplay,
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
                    id: "N/A",
                    vehicleName: "N/A",
                    vin: "N/A",
                    customerName: "N/A",
                    date: "N/A",
                    estimateHour: "N/A",
                    status: "N/A",
                    priority: "N/A",
                    issue: "N/A",
                    technician: "N/A",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch work by Id
    const fetchWorkById = async (id) => {
        try {
            setLoading(true);
            setError(null);

            console.log("Fetching work order with ID:", id);
            
            const response = await axiousInstance.get(`/work-orders/${id}`);
            
            // Log the full response for debugging
            console.log("Full API Response:", response);
            console.log("Response data:", response.data);

            // The work data is directly in response.data
            const work = response.data;

            console.log("Work data:", work);

            if (!work || !work.workOrderId) {
                throw new Error("Work order data not found in response");
            }

            const formattedWork = {
                id: work.workOrderId,
                description: work.description || "No description available",
                startDate: work.startDate
                    ? new Date(work.startDate).toLocaleDateString()
                    : "N/A",
                endDate: work.endDate
                    ? new Date(work.endDate).toLocaleDateString()
                    : "N/A",
                estimateHour: work.estimateHour
                    ? `${work.estimateHour} hours`
                    : "N/A",
                status: work.statusDisplay || getWorkStatusLabel(work.status),
                priority: getPriorityStatusLabel(work.priority),
                priorityDisplay: work.priorityDisplay,
                customerName: work.customerName || "N/A",
                customerPhone: work.customerPhone || "N/A",
                technician: work.technicianName || "Unassigned",
                parts: work.parts || [],
                partItems: work.partItems || [],
                // Additional fields from API
                claimId: work.claimId,
                technicianId: work.technicianId,
                customerId: work.customerId,
            };

            console.log("Formatted work:", formattedWork);
            setRow(formattedWork);
        } catch (err) {
            console.error("Fetch work by ID failed: ", err);
            console.error("Error details:", err.response?.data || err.message);
            setError(err);
            setRow(null);
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

    const updateWorkStatus = async (id, status) => {
        try {
            // First, get the current work order data
            const response = await axiousInstance.get(`/work-orders/${id}`);
            const work = response.data;
            
            if (!work) {
                throw new Error("Work order not found");
            }
            
            // Prepare the update payload with all required fields
            const payload = {
                description: work.description,
                startDate: work.startDate,
                endDate: work.endDate,
                estimateHour: work.estimateHour,
                status: status, // Update only the status
                priority: work.priority,
                technicianId: work.technicianId,
                partIds: work.parts ? work.parts.map(part => part.partId) : []
            };
            
            // Update the work order
            await axiousInstance.put(`/work-orders/${id}`, payload);
            
            // Refresh the work order details after update
            await fetchWorkById(id);
            return { success: true };
        } catch (err) {
            console.error("Update work status failed: ", err);
            console.error("Error details:", err.response?.data || err.message);
            return { success: false, error: err };
        }
    };

    const deleteWork = async (id) => {
        await axiousInstance.delete(`/claims/${id}`);
        await fetchTodoWorks();
    };

    useEffect(() => {
        fetchTodoWorks();
    }, []);

    return { 
        workRows, 
        workRow, 
        workLoading, 
        workError, 
        fetchTodoWorks, 
        fetchWorkById, 
        createWork, 
        updateWork, 
        updateWorkStatus,
        deleteWork 
    };
}