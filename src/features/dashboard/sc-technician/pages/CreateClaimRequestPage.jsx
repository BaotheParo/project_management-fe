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
    TrashIcon,
} from "@phosphor-icons/react";
import { useWarrantyClaims } from "../../../../api/useWarrantyClaims";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../../../components/Loader";
import { useAuth } from "../../../../app/AuthProvider";
import { useVehicleApi } from "../../../../api/useVehicleApi";
import { usePartApi } from "../../../../api/usePartApi";
import { ErrorNotification, SuccessNotification } from "../../../../components/Notification";
import axiousInstance from "../../../../api/axiousInstance";

export default function CreateClaimRequestsPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [successNotification, setSuccessNotification] = useState(null);
    const [failNotification, setFailNotification] = useState(null);
    const [errorNotification, setErrorNotification] = useState(null);
    const { createClaim } = useWarrantyClaims(user?.userId);
    const { vehicles, vehicleLoading, vehicleError } = useVehicleApi();
    const { fetchPartsByVin, fetchParts, parts, partLoading } = usePartApi();

    const displayName = user?.username || user?.name || user?.fullName || "User";
    const [availableParts, setAvailableParts] = useState([]); // Store parts fetched from API
    const [uploadedFiles, setUploadedFiles] = useState([]); // Store uploaded files
    const [fileInputRef, setFileInputRef] = useState(null);
    
    // Debug: Log availableParts changes
    useEffect(() => {
        console.log("🔄 availableParts state changed:", availableParts.length, "items");
        if (availableParts.length > 0) {
            console.log("📋 Available parts:", availableParts);
        }
    }, [availableParts]);

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
                availablePartNumbers: [],
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
                        availablePartNumbers: [],
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
                console.log("🔍 Fetching parts for VIN:", selectedVin);
                
                let partData = null;
                
                // Try to fetch parts by VIN first
                try {
                    partData = await fetchPartsByVin(selectedVin);
                    console.log("✅ Fetched parts by VIN:", partData);
                    
                    // If returned empty array, it might be 404 - try fallback
                    if (!partData || (Array.isArray(partData) && partData.length === 0)) {
                        console.warn("⚠️ fetchPartsByVin returned empty array, trying fallback...");
                        throw new Error("Empty result from fetchPartsByVin");
                    }
                } catch (vinError) {
                    // If endpoint doesn't exist (404), fallback to fetch all parts and filter by VIN
                    console.warn("⚠️ Endpoint /parts/by-vin not available (404), fetching all parts and filtering...");
                    console.warn("⚠️ Error:", vinError.response?.status, vinError.message);
                    
                    // Fetch all parts
                    await fetchParts();
                    
                    // Get parts from state after fetch
                    // Note: We need to wait for state update, so we'll use a workaround
                    // by calling fetchParts which returns the data
                    const allPartsResponse = await axiousInstance.get("/parts");
                    let allPartsData = null;
                    
                    if (Array.isArray(allPartsResponse)) {
                        allPartsData = allPartsResponse;
                    } else if (Array.isArray(allPartsResponse?.data)) {
                        allPartsData = allPartsResponse.data;
                    } else if (allPartsResponse?.data?.data && Array.isArray(allPartsResponse.data.data)) {
                        allPartsData = allPartsResponse.data.data;
                    }
                    
                    if (allPartsData && Array.isArray(allPartsData)) {
                        console.log("📋 All parts fetched:", allPartsData.length, "total parts");
                        console.log("🔍 Filtering by VIN:", selectedVin);
                        
                        // Filter parts by VIN and format them
                        // Normalize VIN for comparison (remove spaces, convert to lowercase)
                        const normalizeVin = (vin) => vin?.toString().trim().toLowerCase() || "";
                        const normalizedSelectedVin = normalizeVin(selectedVin);
                        
                        console.log("🔍 Normalized VIN for comparison:", normalizedSelectedVin);
                        
                        const filteredParts = allPartsData.filter(part => {
                            const partVin = part.vin || part.VIN || part.vehicleVin;
                            const normalizedPartVin = normalizeVin(partVin);
                            const matches = normalizedPartVin === normalizedSelectedVin;
                            
                            if (partVin) {
                                console.log(`   Part VIN: "${partVin}" (normalized: "${normalizedPartVin}") ${matches ? '✅ MATCHES' : '❌ does not match'} "${normalizedSelectedVin}"`);
                            }
                            return matches;
                        });
                        
                        console.log("✅ Found", filteredParts.length, "parts matching VIN");
                        
                        // Format parts to match the expected structure
                        partData = filteredParts.map(part => {
                            const partNumbersArray = part.partNumber || part.partNumbers || [];
                            const numbersArray = Array.isArray(partNumbersArray) ? partNumbersArray : [];
                            
                            return {
                                partId: part.partId,
                                partName: part.partName,
                                partNumber: numbersArray,
                                partNumbers: numbersArray,
                                partDescription: part.partDescription,
                                vehiclePartId: part.vehiclePartId,
                                status: part.status,
                                vin: part.vin,
                                vehicleName: part.vehicleName || "Unknown",
                                model: part.model || "",
                                quantity: part.quantity || 0,
                            };
                        });
                        
                        console.log("✅ Filtered and formatted", partData.length, "parts by VIN from", allPartsData.length, "total parts");
                    } else {
                        partData = [];
                        console.warn("⚠️ Could not fetch or filter parts");
                        console.warn("⚠️ allPartsData:", allPartsData);
                    }
                }

                console.log("📦 Received part data:", partData);
                console.log("📦 Part data type:", typeof partData);
                console.log("📦 Is array:", Array.isArray(partData));
                console.log("📦 Part data length:", partData?.length);

                if (partData && Array.isArray(partData) && partData.length > 0) {
                    console.log("✅ Processing", partData.length, "parts");
                    console.log("📋 Parts data:", partData);

                    // Store available parts for dropdown
                    setAvailableParts(partData);
                    console.log("✅ Available parts set:", partData.length, "items");

                    // Initialize form with one empty part item for user to select
                    setFormData((prev) => ({
                        ...prev,
                        partItems: [
                            {
                                partNumber: "",
                                partName: "",
                                replacementDate: new Date().toISOString().split("T")[0],
                                availablePartNumbers: [],
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
                                availablePartNumbers: [],
                            },
                        ],
                    }));
                }
            } catch (error) {
                console.error("❌ Failed to fetch parts for VIN:", error);
                console.error("❌ Error details:", error.response?.data || error.message);
                // Keep default part item if fetch fails
                setAvailableParts([]);
                setFormData((prev) => ({
                    ...prev,
                    partItems: [
                        {
                            partNumber: "",
                            partName: "",
                            replacementDate: new Date().toISOString().split("T")[0],
                            availablePartNumbers: [],
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
                // Handle both partNumber (array) and partNumbers (array) from API
                const partNumbersArray = selectedPart.partNumber || selectedPart.partNumbers || [];
                // Ensure it's an array
                const numbersArray = Array.isArray(partNumbersArray) ? partNumbersArray : [];
                
                console.log("🔧 Selected Part:", selectedPart);
                console.log("🔢 Part Numbers Array:", numbersArray);
                
                // Auto-select first part number if available
                const autoSelectedPartNumber = numbersArray.length > 0 ? numbersArray[0] : "";
                
                updatedParts[index] = {
                    ...updatedParts[index],
                    partName: value,
                    partNumber: autoSelectedPartNumber, // Auto-fill first part number
                    availablePartNumbers: numbersArray, // Auto-fill available part numbers
                };
            } else {
                // If part not found, reset available part numbers
                updatedParts[index] = {
                    ...updatedParts[index],
                    partName: value,
                    partNumber: "",
                    availablePartNumbers: [],
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
                { 
                    partName: "", 
                    partNumber: "", 
                    replacementDate: new Date().toISOString().split("T")[0],
                    availablePartNumbers: [],
                },
            ],
        }));
    };

    const handleRemovePart = (index) => {
        setFormData((prev) => ({
            ...prev,
            partItems: prev.partItems.filter((_, i) => i !== index),
        }));
    };

    // File upload handlers
    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        handleFiles(files);
    };

    const handleFiles = (files) => {
        const validFiles = [];
        const maxSize = 10 * 1024 * 1024; // 10MB
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4', 'video/quicktime'];
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.mp4', '.mov'];

        files.forEach((file) => {
            // Check file size
            if (file.size > maxSize) {
                setErrorNotification({
                    type: "error",
                    message: `File "${file.name}" exceeds 10MB limit`,
                });
                return;
            }

            // Check file type
            const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
            if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
                setErrorNotification({
                    type: "error",
                    message: `File "${file.name}" is not a supported format (JPG, PNG, MP4, MOV)`,
                });
                return;
            }

            validFiles.push(file);
        });

        if (validFiles.length > 0) {
            const newFiles = validFiles.map((file) => ({
                file: file,
                preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
                name: file.name,
                size: file.size,
            }));
            setUploadedFiles((prev) => [...prev, ...newFiles]);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    };

    const handleRemoveFile = (index) => {
        setUploadedFiles((prev) => {
            const newFiles = [...prev];
            if (newFiles[index].preview) {
                URL.revokeObjectURL(newFiles[index].preview);
            }
            newFiles.splice(index, 1);
            return newFiles;
        });
    };

    // Cleanup preview URLs on unmount
    useEffect(() => {
        return () => {
            uploadedFiles.forEach((file) => {
                if (file.preview) {
                    URL.revokeObjectURL(file.preview);
                }
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleActionTypeChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            actionType: parseInt(e.target.value),
        }));
    };

    // Upload files to API
    const uploadFiles = async (files) => {
        const uploadedUrls = [];
        
        for (const fileObj of files) {
            try {
                const formData = new FormData();
                formData.append('file', fileObj.file);
                
                // Upload file to API
                // Note: axiousInstance interceptor returns response.data, so response is already the data
                const response = await axiousInstance.post('/upload', formData);
                
                // Get file URL from response (response is already data due to interceptor)
                const fileUrl = response?.url || response?.fileUrl || response?.data?.url || response?.data;
                if (fileUrl && typeof fileUrl === 'string') {
                    uploadedUrls.push(fileUrl);
                    console.log(`✅ File ${fileObj.name} uploaded, URL:`, fileUrl);
                } else {
                    console.warn('⚠️ No file URL in response:', response);
                    // If response is a string URL directly
                    if (typeof response === 'string') {
                        uploadedUrls.push(response);
                    }
                }
            } catch (error) {
                console.error(`❌ Failed to upload file ${fileObj.name}:`, error);
                // Continue with other files even if one fails
            }
        }
        
        return uploadedUrls;
    };

    async function handleSubmit(e) {
        e.preventDefault();

        const id = user?.userId;
        
        // Upload files first if any
        let evidenceUrls = [];
        if (uploadedFiles.length > 0) {
            try {
                console.log("📤 Uploading", uploadedFiles.length, "file(s)...");
                evidenceUrls = await uploadFiles(uploadedFiles);
                console.log("✅ Uploaded files, URLs:", evidenceUrls);
            } catch (error) {
                console.error("❌ File upload failed:", error);
                setErrorNotification({
                    type: "error",
                    message: "Failed to upload files.",
                    subText: error.message || "Please try again later."
                });
                return;
            }
        }
        
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
            evidenceUrls: evidenceUrls, // Add uploaded file URLs
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
                                    value={formData.vin || ""}
                                    onChange={handleVinChange}
                                    className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    required
                                    disabled={vehicleLoading || partLoading}
                                    autoComplete="off"
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
                                        className={`p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none ${
                                            !formData.vin || partLoading 
                                                ? 'cursor-not-allowed opacity-50' 
                                                : 'cursor-pointer'
                                        }`}
                                        value={part.partName || ""}
                                        onChange={(e) => handlePartChange(index, e)}
                                        required
                                        disabled={!formData.vin || partLoading}
                                        style={{ 
                                            pointerEvents: (!formData.vin || partLoading) ? 'none' : 'auto' 
                                        }}
                                    >
                                        <option value="">
                                            {partLoading
                                                ? "Loading parts..."
                                                : !formData.vin
                                                ? "Select a VIN first"
                                                : availableParts.length === 0
                                                ? "No parts available for this VIN"
                                                : "Select Part Name"}
                                        </option>
                                        {availableParts.length > 0 && availableParts.map((availablePart) => (
                                            <option
                                                key={availablePart.partId || availablePart.partName || Math.random()}
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
                                        className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none cursor-pointer"
                                        value={part.partNumber}
                                        onChange={(e) => handlePartChange(index, e)}
                                        required
                                        disabled={!part.availablePartNumbers || part.availablePartNumbers.length === 0}
                                    >
                                        {(!part.availablePartNumbers || part.availablePartNumbers.length === 0) ? (
                                            <option value="">Select Part Name first</option>
                                        ) : (
                                            part.availablePartNumbers.map((num, i) => (
                                            <option key={i} value={num}>
                                                {num}
                                            </option>
                                            ))
                                        )}
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
                        <div 
                            className="flex flex-col items-center justify-between border-dashed border-2 border-gray-200 rounded-md p-8 text-center cursor-pointer hover:border-indigo-400 transition-colors"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onClick={() => document.getElementById('file-input')?.click()}
                        >
                            <input
                                id="file-input"
                                type="file"
                                multiple
                                accept="image/jpeg,image/jpg,image/png,video/mp4,video/quicktime,.jpg,.jpeg,.png,.mp4,.mov"
                                onChange={handleFileSelect}
                                className="hidden"
                                ref={(ref) => setFileInputRef(ref)}
                            />
                            <CloudArrowUpIcon size={50} color="#9CA3AF" weight="fill" />
                            <div className="leading-1 mt-4 mb-10">
                                <p className="mb-3 text-xl font-medium">
                                    Upload Images or Videos
                                </p>
                                <p className="mb-3 text-md text-[#6B7280] font-medium">
                                    Drag and drop files here or click to browse
                                </p>
                            </div>
                            {uploadedFiles.length > 0 ? (
                                <div className="flex items-center justify-center gap-3 mb-3 flex-wrap">
                                    {uploadedFiles.map((file, index) => (
                                        <div key={index} className="relative">
                                            {file.preview ? (
                                                <img 
                                                    src={file.preview} 
                                                    alt={file.name}
                                                    className="w-20 h-12 object-cover rounded-md border-2 border-gray-300"
                                                />
                                            ) : (
                                                <div className="w-20 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                                                    <PackageIcon size={20} color="#6B7280" />
                                                </div>
                                            )}
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRemoveFile(index);
                                                }}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                            <div className="flex items-center justify-center gap-3 mb-3">
                                <div className="w-20 h-12 bg-gray-200 rounded-md" />
                                <div className="w-20 h-12 bg-gray-200 rounded-md" />
                                <div className="w-20 h-12 bg-gray-200 rounded-md" />
                            </div>
                            )}
                            <div>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        document.getElementById('file-input')?.click();
                                    }}
                                    className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-all text-white cursor-pointer">
                                    Choose a file
                                </button>
                                <p className="mt-3 text-sm text-[#6B7280]">
                                    Max file size: 10MB per file. Supported formats: JPG, PNG, MP4, MOV
                                </p>
                                {uploadedFiles.length > 0 && (
                                    <p className="mt-2 text-sm text-green-600">
                                        {uploadedFiles.length} file(s) selected
                                    </p>
                                )}
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