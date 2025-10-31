import { useEffect, useState } from "react";
import axiousInstance from "./axiousInstance";
import { getWorkStatusLabel } from "../constants/WorkStatus";
import { getPriorityStatusLabel } from "../constants/WorkPriority";

export const useTodoWorksApi = (userId) => {
    const [workRows, setRows] = useState([]);
    const [workRow, setRow] = useState(null);
    const [workLoading, setLoading] = useState(true);
    const [workError, setError] = useState(null);

    // Fetch all Works for specific technician
    const fetchTodoWorks = async (userId) => {
        if (!userId) {
            // console.log("Cannot find userId");
            return;
        };
        try {
            setLoading(true);
            setError(null);
            const response = await axiousInstance.get(`/work-orders/user/${userId}`);

            // console.log("🔍 Fetching works for userId:", userId); // ADD THIS

            const data = Array.isArray(response.data)
            ? response.data
            : response.data || [];
            
            // console.log("📦 Raw API Response:", response.data); // ADD THIS
            // console.log("📊 Extracted data array:", data); // ADD THIS
            // console.log("📊 Data length:", data.length); // ADD THIS

            if (!Array.isArray(data)) {
                console.warn("Unexpected response structure: ", response.data.data);
                setRows([]);
                return;
            }

            const formattedTodoWorks = data.map((work) => ({
                workOrderId: work.workOrderId,
                description: work.description,
                startDate: work.startDate ? new Date(work.startDate).toLocaleDateString() : "N/A",
                endDate: work.endDate ? new Date(work.endDate).toLocaleDateString() : "N/A",
                estimateHour: work.estimateHour ? `${work.estimateHour} hours` : "N/A",
                status: work.status,
                statusDisplay: work.statusDisplay,
                priority: getPriorityStatusLabel(work.priority),
                priorityDisplay: work.priorityDisplay,
                claimId: work.claimId,
                technicianId: work.technicianId,
                technician: work.technicianName || "Unassigned",
                customerId: work.customerId,
                customerName: work.customerName || "N/A",
                customerPhone: work.customerPhone,
                customerEmail: work.customerEmail,
                vin: work.vin || "N/A",
                vehicleName: work.vehicleName || "Unknown Vehicle",
                model: work.model,
                mileAge: work.mileAge,
                purchaseDate: work.purchaseDate,
                serviceCenterId: work.serviceCenterId,
                serviceCenterName: work.serviceCenterName,
                parts: work.parts || [],
                partItems: work.partItems,
                createdAt: work.createdAt,
                updatedAt: work.updatedAt,
            }));

            // console.log("✅ Formatted works:", formattedTodoWorks); // ADD THIS
            setRows(formattedTodoWorks);
        } catch (err) {
            // console.error("❌ Fetch todo work failed", err); // UPDATED
            // console.error("❌ Error details:", err.response?.data); // ADD THIS
            setError(err);
            // fallback mock data
            setRows([
                {
                    workOrderId: "WO-000",
                    description: "No work orders available",
                    startDate: "N/A",
                    endDate: "N/A",
                    estimateHour: "N/A",
                    statusDisplay: "N/A",
                    priority: "N/A",
                    priorityDisplay: "N/A",
                    claimId: "N/A",
                    technicianId: "N/A",
                    technician: "Unassigned",
                    customerId: "N/A",
                    customerName: "N/A",
                    customerPhone: "N/A",
                    customerEmail: "N/A",
                    vin: "N/A",
                    vehicleName: "Unknown Vehicle",
                    model: "N/A",
                    mileAge: "N/A",
                    purchaseDate: "N/A",
                    serviceCenterId: "N/A",
                    serviceCenterName: "N/A",
                    parts: [],
                    partItems: [],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
            ]);
        } finally {
            // console.log("✅ fetchTodoWorks completed");
            setLoading(false);
        }
    };

    // Fetch work by Id
    const fetchWorkById = async (id) => {
        try {
            setLoading(true);
            setError(null);

            // console.log("Fetching work order with ID:", id);

            const response = await axiousInstance.get(`/work-orders/${id}`);

            // Log the full response for debugging
            // console.log("Full API Response:", response);
            // console.log("Response data:", response.data);

            // The work data is directly in response.data
            const work = response.data;

            // console.log("Work data:", work);

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
        if (userId) {  // Only fetch if userId exists
            fetchTodoWorks(userId);
        }
    }, [userId]);

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