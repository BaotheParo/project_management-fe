import {
    BuildingsIcon,
    CameraIcon,
    CarIcon,
    CheckCircleIcon,
    CloudArrowUpIcon,
    InfoIcon,
    PackageIcon,
    PlusCircleIcon,
    TrashIcon,
    WarningCircleIcon,
    XCircleIcon,
} from "@phosphor-icons/react";
import { useWarrantyClaims } from "../../../../api/useWarrantyClaims";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../../../components/Loader";
import { useAuth } from "../../../../app/AuthProvider";
import { useVehicleApi } from "../../../../api/useVehicleApi";
import { usePartApi } from "../../../../api/usePartApi";
import { ErrorNotification, SuccessNotification } from "../../../../components/Notification";

export default function CreateClaimRequestsPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [successNotification, setSuccessNotification] = useState(null);
    const [failNotification, setFailNotification] = useState(null);
    const [errorNotification, setErrorNotification] = useState(null);
    const { createClaim } = useWarrantyClaims(user?.userId);
    const { vehicles, vehicleLoading, vehicleError } = useVehicleApi();
    const { fetchPartsByVin, partLoading } = usePartApi();

    const displayName = user?.username || user?.name || user?.fullName || "User";
    const [availableParts, setAvailableParts] = useState([]); // Store parts fetched from API

    const [formData, setFormData] = useState({
        claimDate: new Date().toISOString().split("T")[0],
        centerName: user?.serviceCenterName || "",
        vin: "",
        issueDescription: "",
        vehicleName: "",
        purchaseDate: "",
        mileage: "",
        partItems: [
            {
                partNumber: "",
                partName: "",
                replacementDate: new Date().toISOString().split("T")[0],
            },
        ],
        actionType: 0,
    });

    // 🔹 When VIN changes, auto-fill vehicle info AND parts info
    const handleVinChange = async (e) => {
        const selectedVin = e.target.value;
        setFormData((prev) => ({ ...prev, vin: selectedVin }));

        if (!selectedVin) {
            // Reset form if VIN is cleared
            setFormData((prev) => ({
                ...prev,
                vin: "",
                vehicleName: "",
                purchaseDate: "",
                mileage: "",
                partItems: [
                    {
                        partNumber: "",
                        partName: "",
                        replacementDate: new Date().toISOString().split("T")[0],
                    },
                ],
            }));
            return;
        }

        // Find selected vehicle
        const selectedVehicle = vehicles.find((v) => v.vin === selectedVin);

        if (selectedVehicle) {
            // Update vehicle information
            setFormData((prev) => ({
                ...prev,
                vin: selectedVin,
                vehicleName: selectedVehicle.vehicleName || "",
                purchaseDate: selectedVehicle.purchaseDate
                    ? new Date(selectedVehicle.purchaseDate)
                        .toISOString()
                        .split("T")[0]
                    : "",
                mileage: selectedVehicle.mileAge || "",
            }));

            // Fetch and auto-fill parts information
            try {
                console.log("🔍 Calling fetchPartsByVin for:", selectedVin);
                const partData = await fetchPartsByVin(selectedVin);

                console.log("📦 Received part data:", partData);
                console.log("📦 Part data type:", typeof partData);
                console.log("📦 Is array:", Array.isArray(partData));
                console.log("📦 Part data length:", partData?.length);

                if (partData && Array.isArray(partData) && partData.length > 0) {
                    console.log("✅ Processing", partData.length, "parts");

                    // Store available parts for dropdown
                    setAvailableParts(partData);

                    // Initialize form with one empty part item for user to select
                    setFormData((prev) => ({
                        ...prev,
                        partItems: [
                            {
                                partNumber: "",
                                partName: "",
                                replacementDate: new Date().toISOString().split("T")[0],
                            },
                        ],
                    }));

                    console.log("✅ Available parts stored for dropdown");
                } else {
                    console.warn("⚠️ No parts data or empty array received");
                    // No parts found, keep one empty part item
                    setAvailableParts([]);
                    setFormData((prev) => ({
                        ...prev,
                        partItems: [
                            {
                                partNumber: "",
                                partName: "",
                                replacementDate: new Date().toISOString().split("T")[0],
                            },
                        ],
                    }));
                }
            } catch (error) {
                console.error("❌ Failed to fetch parts for VIN:", error);
                // Keep default part item if fetch fails
                setAvailableParts([]);
                setFormData((prev) => ({
                    ...prev,
                    partItems: [
                        {
                            partNumber: "",
                            partName: "",
                            replacementDate: new Date().toISOString().split("T")[0],
                        },
                    ],
                }));
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePartChange = (index, e) => {
        const { name, value } = e.target;
        const updatedParts = [...formData.partItems];

        if (name === "partName") {
            const selectedPart = availableParts.find(p => p.partName === value);
            if (selectedPart) {
                updatedParts[index] = {
                    ...updatedParts[index],
                    partName: value,
                    partNumber: "",
                    availablePartNumbers: selectedPart.partNumbers || [],
                };
            }
        } else if (name === "partNumber") {
            updatedParts[index] = {
                ...updatedParts[index],
                partNumber: value,
            };
        } else {
            updatedParts[index][name] = value;
        }

        setFormData((prev) => ({ ...prev, partItems: updatedParts }));
    };

    const handleAddPart = () => {
        setFormData((prev) => ({
            ...prev,
            partItems: [
                ...prev.partItems,
                { partName: "", partNumber: "", replacementDate: new Date().toISOString().split("T")[0] },
            ],
        }));
    };

    const handleRemovePart = (index) => {
        setFormData((prev) => ({
            ...prev,
            partItems: prev.partItems.filter((_, i) => i !== index),
        }));
    };

    const handleActionTypeChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            actionType: parseInt(e.target.value),
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault();

        const id = user?.userId;
        const payload = {
            claimDate: new Date(formData.claimDate).toISOString(),
            centerName: formData.centerName,
            vin: formData.vin,
            vehicleName: formData.vehicleName,
            mileage: Number.parseInt(formData.mileage) || 0,
            purchaseDate: new Date(formData.purchaseDate).toISOString(),
            issueDescription: formData.issueDescription,
            partItems: formData.partItems.map((item) => ({
                partName: item.partName,
                partNumber: item.partNumber,
                replacementDate: item.replacementDate
                    ? new Date(item.replacementDate).toISOString()
                    : new Date().toISOString(),
            })),
            actionType: formData.actionType,
        };

        try {
            const result = await createClaim(id, payload);
            if (result.success) {
                setSuccessNotification({
                    type: "success",
                    message: "Request created successfully!",
                    subText: new Date().toLocaleString(),
                });
                navigate("/sc-technician/claims");
            } else {
                setFailNotification({
                    type: "failed",
                    message: "Failed to create claim request.",
                });
            }
        } catch (err) {
            setErrorNotification({
                type: "error",
                message: "Failed to create claim request.",
                subText: err || "Please try again later."
            });
        }
    }

    return (
        <div className="w-full">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Warranty Claim Requests</h1>
                    <p className="text-gray-500">
                        Manage and track warranty claim requests
                    </p>
                </div>
            </div>

            <div className="mb-6 mt-20">
                <div className="mt-20 mb-6">
                    <h2 className="text-xl font-semibold mb-1">
                        Create new Claim Request
                    </h2>
                </div>

                <form className="space-y-10" onSubmit={handleSubmit}>
                    <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                        <div className="text-md text-indigo-600 font-medium mb-6 flex items-center gap-2">
                            <InfoIcon size={20} weight="bold" /> Basic Informations
                        </div>
                        <div className="grid grid-cols-3 gap-10">
                            <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">Claim Date</p>
                                <input
                                    type="date"
                                    name="claimDate"
                                    value={formData.claimDate}
                                    onChange={handleChange}
                                    className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Claim Date"
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">Service Center</p>
                                <input
                                    name="centerName"
                                    value={formData.centerName}
                                    onChange={handleChange}
                                    className="p-3 bg-[#F9FAFB] border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Service Center"
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">Created By</p>
                                <input
                                    readOnly={true}
                                    className="p-3 bg-[#F9FAFB] border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Created By"
                                    defaultValue={displayName}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                        <div className="text-md text-indigo-600 font-medium mb-6 flex items-center gap-2">
                            <CarIcon size={20} weight="bold" /> Vehicle Information
                        </div>

                        <div className="grid grid-cols-3 gap-10">
                            <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">VIN code</p>
                                <select
                                    name="vin"
                                    value={formData.vin}
                                    onChange={handleVinChange}
                                    className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    required
                                    disabled={vehicleLoading || partLoading}
                                >
                                    <option value="">
                                        {vehicleLoading ? "Loading vehicles..." :
                                            partLoading ? "Loading parts..." :
                                                "Select VIN"}
                                    </option>
                                    {!vehicleLoading && vehicles && vehicles.length === 0 && (
                                        <option value="" disabled>No vehicles available</option>
                                    )}
                                    {vehicles && vehicles.length > 0 && vehicles.map((v) => (
                                        <option key={v.vin} value={v.vin}>
                                            {v.vin} - {v.vehicleName} ({v.model}) - {v.fullName}
                                        </option>
                                    ))}
                                </select>
                                {vehicleError && (
                                    <p className="text-sm text-red-500 mt-1">
                                        Error loading vehicles: {vehicleError.message}
                                    </p>
                                )}
                            </div>
                            <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">Vehicle Name</p>
                                <input
                                    name="vehicleName"
                                    value={formData.vehicleName}
                                    readOnly
                                    className="p-3 bg-[#F9FAFB] border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Enter vehicle name"
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">
                                    Purchase Date of vehicle
                                </p>
                                <input
                                    type="date"
                                    name="purchaseDate"
                                    value={formData.purchaseDate}
                                    readOnly
                                    className="p-3 bg-[#F9FAFB] border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Purchase Date of vehicle"
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">
                                    Current Mileage (km)
                                </p>
                                <input
                                    name="mileage"
                                    value={formData.mileage}
                                    readOnly
                                    className="p-3 bg-[#F9FAFB] border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Current Mileage (km)"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                        <div className="flex items-center justify-between w-full mb-6">
                            <div className="text-md text-indigo-600 font-medium flex items-center gap-2">
                                <PackageIcon size={20} weight="bold" /> Part Information
                                {partLoading && (
                                    <span className="text-sm text-gray-500 ml-2">(Loading parts...)</span>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={handleAddPart}
                                className="flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-all cursor-pointer"
                            >
                                <PlusCircleIcon size={20} weight="bold" />
                                Add Part
                            </button>
                        </div>
                        {formData.partItems.map((part, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-3 gap-10 mb-6 relative border p-6 rounded-2xl"
                            >
                                <div className="absolute right-3 top-3">
                                    {formData.partItems.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemovePart(index)}
                                            className="text-red-500 hover:text-red-700 cursor-pointer"
                                        >
                                            <TrashIcon size={20} weight="bold" />
                                        </button>
                                    )}
                                </div>

                                <div className="w-full">
                                    <p className="text-sm mb-2 text-[#6B716F]">Part Name</p>
                                    <select
                                        name="partName"
                                        className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full"
                                        value={part.partName}
                                        onChange={(e) => handlePartChange(index, e)}
                                        required
                                        disabled={availableParts.length === 0}
                                    >
                                        <option value="">
                                            {availableParts.length === 0
                                                ? "Select a VIN first"
                                                : "Select Part Name"}
                                        </option>
                                        {availableParts.map((availablePart) => (
                                            <option
                                                key={availablePart.partId}
                                                value={availablePart.partName}
                                            >
                                                {availablePart.partName}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="w-full">
                                    <p className="text-sm mb-2 text-[#6B716F]">Part Number</p>
                                    <select
                                        name="partNumber"
                                        className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full"
                                        value={part.partNumber}
                                        onChange={(e) => handlePartChange(index, e)}
                                        required
                                        disabled={!part.availablePartNumbers || part.availablePartNumbers.length === 0}
                                    >
                                        <option value="">
                                            {(!part.availablePartNumbers || part.availablePartNumbers.length === 0)
                                                ? "Select Part Name first"
                                                : "Select Part Number"}
                                        </option>
                                        {part.availablePartNumbers?.map((num, i) => (
                                            <option key={i} value={num}>
                                                {num}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="w-full">
                                    <p className="text-sm mb-2 text-[#6B716F]">
                                        Replacement Date
                                    </p>
                                    <input
                                        type="date"
                                        name="replacementDate"
                                        className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full"
                                        value={part.replacementDate}
                                        onChange={(e) => handlePartChange(index, e)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                        <div className="text-md text-indigo-600 font-medium mb-6 flex items-center gap-2">
                            <WarningCircleIcon size={20} weight="bold" /> Issue Details
                        </div>
                        <div>
                            <p className="text-sm mb-2 text-[#6B716F]">Issue Description</p>
                            <textarea
                                name="issueDescription"
                                value={formData.issueDescription}
                                onChange={handleChange}
                                className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none min-h-[120px]"
                                placeholder="Provide a detailed description of the issue..."
                                required
                            />
                        </div>
                    </div>

                    <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                        <div className="text-md text-indigo-600 font-medium mb-6 flex items-center gap-2">
                            <CameraIcon size={20} weight="bold" /> Evidence Upload
                        </div>
                        <div className="flex flex-col items-center justify-between border-dashed border-2 border-gray-200 rounded-md p-8 text-center">
                            <CloudArrowUpIcon size={50} color="#9CA3AF" weight="fill" />
                            <div className="leading-1 mt-4 mb-10">
                                <p className="mb-3 text-xl font-medium">
                                    Upload Images or Videos
                                </p>
                                <p className="mb-3 text-md text-[#6B7280] font-medium">
                                    Drag and drop files here or click to browse
                                </p>
                            </div>
                            <div className="flex items-center justify-center gap-3 mb-3">
                                <div className="w-20 h-12 bg-gray-200 rounded-md" />
                                <div className="w-20 h-12 bg-gray-200 rounded-md" />
                                <div className="w-20 h-12 bg-gray-200 rounded-md" />
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-all text-white cursor-pointer">
                                    Choose a file
                                </button>
                                <p className="mt-3 text-sm text-[#6B7280]">
                                    Max file size: 10MB per file. Supported formats: JPG, PNG,MP4,
                                    MOV
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                        <div className="text-md text-indigo-600 font-medium mb-6 flex items-center gap-2">
                            <BuildingsIcon size={20} weight="bold" /> Service Center Request
                        </div>
                        <div className="space-y-2 text-md">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="actionType"
                                    value="0"
                                    checked={formData.actionType === 0}
                                    onChange={handleActionTypeChange}
                                />
                                Request replacement part approval
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="actionType"
                                    value="1"
                                    checked={formData.actionType === 1}
                                    onChange={handleActionTypeChange}
                                />
                                Request repair approval
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="actionType"
                                    value="2"
                                    checked={formData.actionType === 2}
                                    onChange={handleActionTypeChange}
                                />
                                Request reimbursement (repair completed in advance)
                            </label>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F1F3F4] hover:bg-[#dfe0e2] transition-all cursor-pointer"
                        >
                            <XCircleIcon size={18} />
                            <span>Cancel</span>
                        </button>
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-all text-white cursor-pointer"
                        >
                            <CheckCircleIcon size={18} />
                            <span>Submit Claim</span>
                        </button>
                    </div>
                </form>
            </div>
            {/* ✅ Notification logic */}
            {successNotification?.type === "success" && (
                <SuccessNotification
                    message={successNotification.message}
                    subText={successNotification.subText}
                    actionText="Close"
                    onAction={() => setSuccessNotification(null)}
                />
            )}

            {failNotification?.type === "failed" && (
                <ErrorNotification
                    message={failNotification.message}
                    subText={failNotification.subText}
                    actionText="Close"
                    onAction={() => setFailNotification(null)}
                />
            )}

            {errorNotification?.type === "error" && (
                <ErrorNotification
                    message={errorNotification.message}
                    subText={errorNotification.subText}
                    actionText="Close"
                    onAction={() => setErrorNotification(null)}
                />
            )}
        </div>
    );
}