import {
    CalendarBlankIcon,
    CarIcon,
    UserIcon,
    WarningCircleIcon,
    MegaphoneIcon,
    CheckCircleIcon,
    XCircleIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCampaignsApi } from "../../../../api/useCampaignsApi";
import Loader from "../../../../components/Loader";
import CampaignStatusDot from "../components/CampaignStatusDot";
import { SuccessNotification, ErrorNotification } from "../../../../components/Notification";
import { useAuth } from "../../../../app/AuthProvider";

export default function CampaignDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();
    const { campaign, fetchCampaignById, updateCampaignStatus, loading, error } = useCampaignsApi(user?.userId);
    const [isUpdating, setIsUpdating] = useState(false);
    const [successNotification, setSuccessNotification] = useState(null);
    const [errorNotification, setErrorNotification] = useState(null);

    useEffect(() => {
        if (id) {
            console.log("🔄 [CampaignDetailPage] Fetching campaign by ID:", id);
            fetchCampaignById(id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            const result = await updateCampaignStatus(id, newStatus);

            if (result.success) {
                setSuccessNotification({
                    message: "Campaign status updated successfully!",
                    subText: new Date().toLocaleString(),
                    actionText: "Close",
                    onAction: () => { setSuccessNotification(null) },
                });
                // Refetch campaign data
                await fetchCampaignById(id);
            } else {
                setErrorNotification({
                    message: "Failed to update status. Please try again.",
                    subText: new Date().toLocaleString(),
                    actionText: "Close",
                    onAction: () => { setErrorNotification(null) },
                });
            }
        } catch (err) {
            setErrorNotification({
                message: "An error occurred while updating the status.",
                subText: err.message || "Please try again later.",
                actionText: "Close",
                onAction: () => { setErrorNotification(null) },
            });
        } finally {
            setIsUpdating(false);
        }
    };

    const handleCompleteCampaign = async () => {
        await handleUpdateStatus(2); // Status 2 = Completed
    };

    if (loading) return <Loader />;

    if (error) {
        const is404 = error.response?.status === 404;
        return (
            <div className="w-full p-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600 font-semibold">Error loading campaign</p>
                    <p className="text-red-500 text-sm mt-1">
                        {error.message || "An unexpected error occurred"}
                    </p>
                    {is404 && (
                        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
                            <p className="text-yellow-800 text-sm font-semibold mb-2">⚠️ Backend Endpoint Not Found (404)</p>
                            <p className="text-yellow-700 text-xs">
                                The API endpoint <code className="bg-yellow-100 px-1 rounded">/campaigns/:id</code> does not exist yet.
                                <br />
                                Please check with backend team to confirm the correct endpoint path.
                            </p>
                        </div>
                    )}
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

    if (!campaign) {
        return (
            <div className="w-full p-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800">No campaign found</p>
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
            {/* Notifications */}
            {successNotification && (
                <SuccessNotification
                    message={successNotification.message}
                    subText={successNotification.subText}
                    onClose={() => setSuccessNotification(null)}
                />
            )}
            {errorNotification && (
                <ErrorNotification
                    message={errorNotification.message}
                    subText={errorNotification.subText}
                    onClose={() => setErrorNotification(null)}
                />
            )}

            <div className="flex items-start justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Campaign Details</h1>
                    <p className="text-gray-400 mt-1">
                        View and manage campaign information
                    </p>
                </div>
                <div />
            </div>

            <div className="mt-20 mb-6">
                <h2 className="text-xl font-semibold mb-1">Campaign: {campaign.campaignName}</h2>
                <div className="text-sm text-gray-500">
                    ID: {campaign.campaignId}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-4">
                    <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                        <div className="text-md text-indigo-600 font-medium mb-6 flex items-center gap-2">
                            <MegaphoneIcon size={20} weight="bold" /> Campaign Details
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <div className="text-xs text-gray-500">Campaign ID</div>
                                <div className="font-semibold">{campaign.campaignId}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">Status</div>
                                <div className="font-semibold flex items-center">
                                    <CampaignStatusDot status={campaign.statusDisplay} />
                                    {campaign.statusDisplay}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">Start Date</div>
                                <div className="font-semibold">{campaign.startDate}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">End Date</div>
                                <div className="font-semibold">{campaign.endDate}</div>
                            </div>
                            <div className="col-span-2">
                                <div className="text-xs text-gray-500 mb-2">Vehicles Count</div>
                                <div className="font-semibold">{campaign.vehicleCount} vehicles</div>
                            </div>
                        </div>
                    </div>

                    {campaign.vehicles && campaign.vehicles.length > 0 && (
                        <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                            <div className="text-md text-indigo-600 font-medium mb-6 flex items-center gap-2">
                                <CarIcon size={20} weight="bold" /> Vehicles in Campaign
                            </div>
                            <div className="space-y-3">
                                {campaign.vehicles.map((vehicle, index) => (
                                    <div key={vehicle.vehicleId || index} className="border border-gray-200 rounded-lg p-4">
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <div className="text-xs text-gray-500">Vehicle Name</div>
                                                <div className="font-semibold">{vehicle.vehicleName || vehicle.name || "N/A"}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500">VIN</div>
                                                <div className="font-semibold">{vehicle.vin || "N/A"}</div>
                                            </div>
                                            {vehicle.model && (
                                                <div>
                                                    <div className="text-xs text-gray-500">Model</div>
                                                    <div className="font-semibold">{vehicle.model}</div>
                                                </div>
                                            )}
                                            {vehicle.customerName && (
                                                <div>
                                                    <div className="text-xs text-gray-500">Customer</div>
                                                    <div className="font-semibold">{vehicle.customerName}</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                        <div className="text-md text-indigo-600 font-medium mb-6 flex items-center gap-2">
                            <WarningCircleIcon size={20} weight="bold" /> Description
                        </div>
                        <div className="text-sm">
                            <div className="text-xs text-gray-500 mb-2">
                                Campaign Description
                            </div>
                            <div>{campaign.description || "No description provided"}</div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                        <div className="text-md text-indigo-600 font-medium mb-2 flex items-center gap-2">
                            <UserIcon size={20} weight="bold" /> Technician Information
                        </div>
                        <div className="text-sm">
                            <div className="text-xs text-gray-500">Name</div>
                            <div className="font-semibold">{campaign.technicianName || "Unassigned"}</div>
                            {campaign.technicianId && (
                                <div className="text-xs text-gray-500 mt-3">Technician ID</div>
                            )}
                            {campaign.technicianId && (
                                <div className="text-xs truncate">{campaign.technicianId}</div>
                            )}
                        </div>
                    </div>

                    {campaign.serviceCenterName && (
                        <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                            <div className="text-md text-indigo-600 font-medium mb-2 flex items-center gap-2">
                                <CarIcon size={20} weight="bold" /> Service Center
                            </div>
                            <div className="text-sm">
                                <div className="font-semibold">{campaign.serviceCenterName}</div>
                                {campaign.serviceCenterId && (
                                    <div className="text-xs text-gray-500 mt-1 truncate">
                                        ID: {campaign.serviceCenterId}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                        <div className="text-md text-indigo-600 font-medium mb-2 flex items-center gap-2">
                            <CalendarBlankIcon size={20} weight="bold" /> Schedule
                        </div>
                        <div className="text-sm">
                            <div className="text-xs text-gray-500">Start Date</div>
                            <div className="font-semibold">{campaign.startDate}</div>
                            <div className="text-xs text-gray-500 mt-3">
                                End Date
                            </div>
                            <div>{campaign.endDate}</div>
                        </div>
                    </div>

                    <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                        <div className="text-sm text-indigo-600 font-medium mb-2">
                            Actions
                        </div>
                        <div className="flex flex-col gap-5">
                            <button
                                onClick={handleCompleteCampaign}
                                disabled={isUpdating || campaign.statusDisplay === "Completed"}
                                className={`px-4 py-2 transition-colors text-white rounded-full ${isUpdating || campaign.statusDisplay === "Completed"
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-green-600 hover:bg-green-700 cursor-pointer"
                                    }`}
                            >
                                {isUpdating
                                    ? "Updating..."
                                    : campaign.statusDisplay === "Completed"
                                        ? "Already Completed"
                                        : "Complete Campaign"}
                            </button>

                            {/* Only Complete Campaign button kept per request */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Status update modal removed — only Complete Campaign action is supported for SC-Technician */}
        </div>
    );
}

