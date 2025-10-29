import {
    CalendarBlankIcon,
    CarIcon,
    UserIcon,
    WarningCircleIcon,
    WrenchIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTodoWorksApi } from "../../../../api/useTodoWorksApi";
import Loader from "../../../../components/Loader";
import WorkPriority from "../components/WorkPriority";
import WorkStatusDot from "../components/WorkStatusDot";

export default function WorkDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { row, fetchWorkById, updateWorkStatus, loading, error } =
        useTodoWorksApi();
    const [isUpdating, setIsUpdating] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(null);

    useEffect(() => {
        if (id) {
            fetchWorkById(id);
        }
    }, [id]);

    const statusOptions = [
        { value: 0, label: "Pending", color: "bg-gray-300" },
        { value: 1, label: "InProgress", color: "bg-yellow-400" },
        { value: 2, label: "Completed", color: "bg-green-400" },
        { value: 3, label: "Overdue", color: "bg-red-400" },
    ];

    const handleUpdateStatus = async (newStatus) => {
        if (!id) return;

        setIsUpdating(true);
        try {
            const result = await updateWorkStatus(id, newStatus);

            if (result.success) {
                alert("Work order status updated successfully!");
                setShowStatusModal(false);
            } else {
                alert("Failed to update status. Please try again.");
            }
        } catch (err) {
            console.error("Error updating status:", err);
            alert("An error occurred while updating the status.");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleCompleteWork = async () => {
        await handleUpdateStatus(2); // Status 2 = Completed
    };

    if (loading) return <Loader />;

    if (error) {
        return (
            <div className="w-full p-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600 font-semibold">Error loading work order</p>
                    <p className="text-red-500 text-sm mt-1">
                        {error.message || "An unexpected error occurred"}
                    </p>
                    <button
                        onClick={() => navigate(-1)}
                        className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg cursor-pointer"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    if (!row) {
        return (
            <div className="w-full p-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800">No work order found</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="mt-4 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

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

            <div className="mt-20 mb-6">
                <h2 className="text-xl font-semibold mb-1">Work Orders #{row.id}</h2>
                <div className="text-sm text-gray-500">
                    {row.customerName} - {row.customerPhone}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-4">
                    <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                        <div className="text-md text-indigo-600 font-medium mb-6 flex items-center gap-2">
                            <CarIcon size={20} weight="bold" /> Work Order Details
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <div className="text-xs text-gray-500">Order ID</div>
                                <div className="font-semibold">{row.id}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">Status</div>
                                <div className="font-semibold">
                                    <WorkStatusDot status={row.status} />
                                    {row.status}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">Priority</div>
                                <div className="font-semibold">
                                    <WorkPriority status={row.priority} label={row.priority} />
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">Estimated Hours</div>
                                <div className="font-semibold">{row.estimateHour}</div>
                            </div>
                            <div className="col-span-1">
                                <div className="text-xs text-gray-500 mb-2">Parts Required</div>
                                {row.parts && row.parts.length > 0 ? (
                                    <div className="space-y-2">
                                        {row.parts.map((part) => (
                                            <div key={part.partId} className="font-semibold">
                                                {part.partName} (Qty: {part.totalQuantity})
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="font-semibold">No parts required</div>
                                )}
                            </div>
                            <div>
                                {row.partItems && row.partItems.length > 0 && (
                                    <div className="col-span-2">
                                        <div className="text-xs text-gray-500 mb-2">Part Items</div>
                                        <div className="space-y-1">
                                            {row.partItems.map((item) => (
                                                <div key={item.partItemId} className="text-sm">
                                                    • {item.partNumber} - Qty: {item.quantity}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                        <div className="text-md text-indigo-600 font-medium mb-6 flex items-center gap-2">
                            <CarIcon size={20} weight="bold" /> Vehicle Information
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <div className="text-xs text-gray-500">Model</div>
                                <div className="font-semibold">{row.customerName}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">Owner</div>
                                <div className="font-semibold">{row.customerName}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">Warranty Date</div>
                                <div className="font-semibold">{row.startDate}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">Priority</div>
                                <div className="font-semibold">
                                    <WorkPriority status={row.priority} label={row.priority} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                        <div className="text-md text-indigo-600 font-medium mb-6 flex items-center gap-2">
                            <WarningCircleIcon size={20} weight="bold" /> Issue Details
                        </div>
                        <div className="text-sm">
                            <div className="text-xs text-gray-500 mb-2">
                                Issue Description
                            </div>
                            <div>{row.description}</div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                        <div className="text-md text-indigo-600 font-medium mb-2 flex items-center gap-2">
                            <UserIcon size={20} weight="bold" /> Customer Information
                        </div>
                        <div className="text-sm">
                            <div className="text-xs text-gray-500">Name</div>
                            <div className="font-semibold">{row.customerName}</div>
                            <div className="text-xs text-gray-500 mt-3">Phone</div>
                            <div>{row.customerPhone}</div>
                            <div className="text-xs text-gray-500 mt-3">Customer ID</div>
                            <div className="text-xs truncate">{row.customerId || "N/A"}</div>
                        </div>
                    </div>

                    <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                        <div className="text-md text-indigo-600 font-medium mb-2 flex items-center gap-2">
                            <CalendarBlankIcon size={20} weight="bold" /> Schedule
                        </div>
                        <div className="text-sm">
                            <div className="text-xs text-gray-500">Warranty Start Date</div>
                            <div className="font-semibold">{row.startDate}</div>
                            <div className="text-xs text-gray-500 mt-3">
                                Warranty End Date
                            </div>
                            <div>{row.endDate}</div>
                        </div>
                    </div>

                    <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                        <div className="text-md text-indigo-600 font-medium mb-2">
                            Technician
                        </div>
                        <div className="text-sm">
                            <div className="font-semibold">{row.technician}</div>
                            {row.technicianId && (
                                <div className="text-xs text-gray-500 mt-1 truncate">
                                    ID: {row.technicianId}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                        <div className="text-sm text-indigo-600 font-medium mb-2">
                            Actions
                        </div>
                        <div className="flex flex-col gap-5">
                            <button
                                onClick={handleCompleteWork}
                                disabled={isUpdating || row.status === "Completed"}
                                className={`px-4 py-2 transition-colors text-white rounded-full ${isUpdating || row.status === "Completed"
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-green-600 hover:bg-green-700 cursor-pointer"
                                    }`}
                            >
                                {isUpdating
                                    ? "Updating..."
                                    : row.status === "Completed"
                                        ? "Already Completed"
                                        : "Complete Work"}
                            </button>

                            <button
                                onClick={() => setShowStatusModal(true)}
                                disabled={isUpdating}
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white rounded-full cursor-pointer disabled:bg-gray-400"
                            >
                                Change Status
                            </button>

                            <button
                                onClick={() => navigate(-1)}
                                className="px-4 py-2 rounded-full bg-[#F1F3F4] hover:bg-[#dfe0e2] transition-all cursor-pointer"
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Status Change Modal */}
            {showStatusModal && (
                <div className="fixed inset-0 bg-black/10 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-96 max-w-md">
                        <h3 className="text-lg font-semibold mb-4">
                            Change Work Order Status
                        </h3>
                        <div className="space-y-2 mb-6">
                            {statusOptions.map((status) => (
                                <button
                                    key={status.value}
                                    onClick={() => setSelectedStatus(status.value)}
                                    className={`w-full p-3 rounded-lg border-2 transition-all cursor-pointer ${selectedStatus === status.value
                                            ? "border-indigo-600 bg-indigo-50"
                                            : "border-gray-200 hover:border-gray-300"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-3 h-3 rounded-full ${status.color}`}
                                        ></div>
                                        <span className="font-medium">{status.label}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    setShowStatusModal(false);
                                    setSelectedStatus(null);
                                }}
                                className="flex-1 px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-all cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() =>
                                    selectedStatus !== null && handleUpdateStatus(selectedStatus)
                                }
                                disabled={selectedStatus === null || isUpdating}
                                className="flex-1 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {isUpdating ? "Updating..." : "Update"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
