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
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../../components/Loader";
import { SuccessNotification, ErrorNotification } from "../../../../components/Notification";
import { useAuth } from "../../../../app/AuthProvider";

export default function EditClaimRequestsPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();
    const { row, fetchClaimById, updateClaim, loading, error } = useWarrantyClaims(user?.userId);
    
    // 🧩 Add dynamic parts state
    const [parts, setParts] = useState([]);
    
    // 🖼️ Images state
    const [uploadedImages, setUploadedImages] = useState([]);
    
    // �️ Modal state for image preview
    const [selectedImage, setSelectedImage] = useState(null);
    
    // �📝 Form state for controlled inputs
    const [formData, setFormData] = useState({
        vin: "",
        vehicleName: "",
        purchaseDate: "",
        mileAge: "",
        issueDescription: "",
        claimDate: "",
    });
    
    // 🔄 Loading state for submit
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // 🔔 Notification state
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        if (id) {
            console.log("🔄 Fetching claim by ID:", id);
            fetchClaimById(id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    // When data loads, set initial form data and parts
    useEffect(() => {
        if (row) {
            // Format dates for date input (YYYY-MM-DD)
            const formatDateForInput = (dateString) => {
                if (!dateString) return "";
                try {
                    const date = new Date(dateString);
                    if (isNaN(date.getTime())) return "";
                    return date.toISOString().split('T')[0];
                } catch {
                    return dateString.split('T')[0] || dateString;
                }
            };
            
            setFormData({
                vin: row.vin || "",
                vehicleName: row.vehicleName || "",
                purchaseDate: formatDateForInput(row.purchaseDate),
                mileAge: row.mileAge || row.mileage || "",
                issueDescription: row.issueDescription || "",
                claimDate: formatDateForInput(row.claimDate),
            });
            
            // Handle parts - convert from API format to form format
            // Safety: Filter out null/undefined items and ensure valid array
            if (row.parts && Array.isArray(row.parts) && row.parts.length > 0) {
                const validParts = row.parts
                    .filter(part => part !== null && part !== undefined) // Filter out null/undefined
                    .map(part => ({
                        partName: part?.partName || "",
                        partCode: part?.partNumber || part?.partCode || "",
                        replacementDate: formatDateForInput(part?.replacementDate),
                        partId: part?.partId || "",
                        quantity: part?.quantity || 1,
                        price: part?.price || 0,
                    }));
                
                // If we have valid parts, use them; otherwise use empty array with default
                if (validParts.length > 0) {
                    setParts(validParts);
                } else {
                    setParts([
                        {
                            partName: "",
                            partCode: "",
                            replacementDate: "",
                            partId: "",
                            quantity: 1,
                            price: 0,
                        },
                    ]);
                }
            } else {
                // Default empty part if no parts exist
                setParts([
                    {
                        partName: "",
                        partCode: "",
                        replacementDate: "",
                        partId: "",
                        quantity: 1,
                        price: 0,
                    },
                ]);
            }
            
            // Handle images - populate from API response
            if (row.images && Array.isArray(row.images) && row.images.length > 0) {
                const validImages = row.images
                    .filter(img => img !== null && img !== undefined)
                    .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0)) // Sort by orderIndex
                    .map(img => ({
                        imageId: img.imageId,
                        url: img.imageUrl,
                        description: img.description || '',
                        orderIndex: img.orderIndex || 0,
                        isExisting: true, // Flag to identify existing images from API
                    }));
                
                setUploadedImages(validImages);
            } else {
                setUploadedImages([]);
            }
        }
    }, [row]);

    // ✏️ Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // ➕ Add new part
    const handleAddPart = () => {
        // Safety: Ensure parts is always an array
        const currentParts = Array.isArray(parts) ? parts : [];
        setParts([
            ...currentParts,
            { partName: "", partCode: "", replacementDate: "", partId: "", quantity: 1, price: 0 },
        ]);
    };

    // 🗑 Remove part
    const handleRemovePart = (index) => {
        // Safety: Ensure parts is array and filter safely
        if (!Array.isArray(parts)) {
            setParts([{ partName: "", partCode: "", replacementDate: "", partId: "", quantity: 1, price: 0 }]);
            return;
        }
        const filtered = parts.filter((_, i) => i !== index);
        // Ensure at least one part remains
        if (filtered.length === 0) {
            setParts([{ partName: "", partCode: "", replacementDate: "", partId: "", quantity: 1, price: 0 }]);
        } else {
            setParts(filtered);
        }
    };

    // ✏️ Update part field
    const handlePartChange = (index, field, value) => {
        // Safety: Ensure parts is array and index is valid
        if (!Array.isArray(parts) || index < 0 || index >= parts.length) {
            return;
        }
        const updated = [...parts];
        if (updated[index]) {
            updated[index] = {
                ...updated[index],
                [field]: value,
            };
            setParts(updated);
        }
    };

    // 💾 Save
    const handleSave = async (e) => {
        e.preventDefault();
        
        if (!id) {
            setNotification({
                type: "error",
                message: "Error",
                subText: "Claim ID is missing"
            });
            return;
        }

        setIsSubmitting(true);
        setNotification(null);

        try {
            // Helper to format date to ISO string
            const formatDateToISO = (dateString) => {
                if (!dateString) return null;
                try {
                    const date = new Date(dateString);
                    if (isNaN(date.getTime())) return null;
                    return date.toISOString();
                } catch {
                    return null;
                }
            };
            
            // Format payload according to API requirements
            // Note: Match format used in CreateClaimRequestPage
            const payload = {};
            
            // Only include non-empty fields
            if (formData.vin && formData.vin.trim()) {
                payload.vin = formData.vin.trim();
            }
            if (formData.issueDescription && formData.issueDescription.trim()) {
                payload.issueDescription = formData.issueDescription.trim();
            }
            if (formData.vehicleName && formData.vehicleName.trim()) {
                payload.vehicleName = formData.vehicleName.trim();
            }
            if (formData.purchaseDate) {
                const purchaseDate = formatDateToISO(formData.purchaseDate);
                if (purchaseDate) payload.purchaseDate = purchaseDate;
            }
            if (formData.mileAge) {
                const mileage = Number(formData.mileAge);
                if (!isNaN(mileage)) payload.mileage = mileage;
            }
            if (formData.claimDate) {
                const claimDate = formatDateToISO(formData.claimDate);
                if (claimDate) payload.claimDate = claimDate;
            }
            
            // Format partItems - match CreateClaimRequestPage format
            const filteredParts = parts.filter(part => part.partName && part.partCode);
            if (filteredParts.length > 0) {
                payload.partItems = filteredParts.map(part => {
                    const item = {
                        partName: part.partName.trim(),
                        partNumber: part.partCode.trim(),
                        quantity: Number(part.quantity) || 1,
                        price: Number(part.price) || 0,
                    };
                    // Only include partId if it exists
                    if (part.partId && part.partId.trim()) {
                        item.partId = part.partId.trim();
                    }
                    return item;
                });
            }

            // 🔍 Debug: Log API call details
            console.log("🔵 ===== API UPDATE CLAIM CALL =====");
            console.log("📤 Endpoint:", `PUT /claims/${id}`);
            console.log("📦 Payload:", JSON.stringify(payload, null, 2));
            console.log("🆔 Claim ID:", id);
            
            const startTime = Date.now();
            
            const response = await updateClaim(id, payload);
            
            const duration = Date.now() - startTime;
            console.log("✅ API call completed in", duration, "ms");
            console.log("📥 API Response:", JSON.stringify(response, null, 2));
            console.log("🔵 ===== END API CALL =====");
            
            // ⏳ Wait a bit to ensure backend has processed the update
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // 🔄 Refetch updated claim data to ensure we have latest data
            console.log("🔄 Refetching updated claim data...");
            await fetchClaimById(id);
            
            // 🔄 Also refetch claims list to update the list view
            console.log("🔄 Refetching claims list...");
            if (user?.userId) {
                // Use the fetchClaims from hook context - we need to get it
                // But we can't access it here, so we rely on the updateClaim to refetch
            }
            
            setNotification({
                type: "success",
                message: "Success",
                subText: "Claim updated successfully! Refreshing..."
            });
            
            // Navigate back after 1.5 seconds with refresh flag
            setTimeout(() => {
                // Force refresh by navigating with timestamp
                console.log("🔄 Navigating back to claims list with refresh flag...");
                navigate("/sc-technician/claims", { 
                    replace: true,
                    state: { refresh: true, timestamp: Date.now() } 
                });
            }, 1500);
            
        } catch (err) {
            console.error("Error updating claim:", err);
            
            // 🔍 Extract detailed validation errors
            let errorMessage = "Failed to update claim. Please try again.";
            const errorData = err.response?.data;
            
            if (errorData) {
                // ASP.NET Core validation error format
                if (errorData.errors) {
                    const validationErrors = Object.entries(errorData.errors)
                        .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
                        .join('\n');
                    errorMessage = `Validation errors:\n${validationErrors}`;
                    console.error("📋 Validation errors:", errorData.errors);
                } else if (errorData.title) {
                    errorMessage = errorData.title;
                } else if (errorData.message) {
                    errorMessage = errorData.message;
                }
                
                // Log full error details
                console.error("📋 Full error data:", JSON.stringify(errorData, null, 2));
            }
            
            setNotification({
                type: "error",
                message: "Update Failed",
                subText: errorMessage
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <Loader />;
    if (error)
        return (
            <p className="text-red-500">Error loading claims: {error.message}</p>
        );

    return (
        <div className="w-full">
            {/* Image Modal */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div 
                        className="relative max-w-5xl max-h-[90vh] bg-white rounded-lg overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors shadow-lg"
                        >
                            <XCircleIcon size={24} weight="bold" />
                        </button>
                        
                        {/* Image */}
                        <img 
                            src={selectedImage.url} 
                            alt={selectedImage.description || 'Evidence'}
                            className="max-w-full max-h-[80vh] object-contain"
                        />
                        
                        {/* Image info */}
                        <div className="p-4 bg-white border-t">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900">
                                        Image #{selectedImage.orderIndex + 1}
                                    </p>
                                    {selectedImage.description && (
                                        <p className="text-sm text-gray-600 mt-1">
                                            {selectedImage.description}
                                        </p>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                                        Order: {selectedImage.orderIndex + 1}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Notifications */}
            {notification && notification.type === "success" && (
                <SuccessNotification
                    message={notification.message}
                    subText={notification.subText}
                    onClose={() => setNotification(null)}
                />
            )}
            {notification && notification.type === "error" && (
                <ErrorNotification
                    message={notification.message}
                    subText={notification.subText}
                    onClose={() => setNotification(null)}
                />
            )}
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
                        Edit Claim Request
                    </h2>
                </div>
                <form className="space-y-10">
                    <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                        <div className="text-md text-indigo-600 font-medium mb-6 flex items-center gap-2">
                            <InfoIcon size={20} weight="bold" /> Basic Informations
                        </div>
                        <div className="grid grid-cols-3 gap-10">
                            <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">Claim Id</p>
                                <input
                                    readOnly={true}
                                    className="p-3 bg-[#F9FAFB] border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Claim ID"
                                    aria-disabled
                                    defaultValue={row?.claimId}
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">Claim Date</p>
                                <input
                                    type="date"
                                    name="claimDate"
                                    className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Claim Date"
                                    value={formData.claimDate}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">Service Center</p>
                                <input
                                    className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Service Center"
                                    defaultValue={row?.serviceCenterName}
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">Created By</p>
                                <input
                                    readOnly={true}
                                    className="p-3 bg-[#F9FAFB] border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Created By"
                                    defaultValue={row?.technicianName}
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">Manufacturer</p>
                                <select className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none">
                                    <option>Select Manufacturer</option>
                                </select>
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
                                <input
                                    type="text"
                                    name="vin"
                                    className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="VIN code"
                                    value={formData.vin}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">Vehicle Name</p>
                                <input
                                    type="text"
                                    name="vehicleName"
                                    className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Enter vehicle name"
                                    value={formData.vehicleName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">
                                    Purchase Date of vehicle
                                </p>
                                <input
                                    type="date"
                                    name="purchaseDate"
                                    className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Purchase Date of vehicle"
                                    value={formData.purchaseDate}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">
                                    Current Mileage (km)
                                </p>
                                <input
                                    type="number"
                                    name="mileAge"
                                    className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Current Mileage (km)"
                                    value={formData.mileAge}
                                    onChange={handleInputChange}
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                        <div className="text-md text-indigo-600 font-medium mb-6 flex items-center gap-2">
                            <div className="flex items-center justify-between w-full mb-6">
                                <div className="flex items-center gap-2">
                                    <PackageIcon size={20} weight="bold" /> Part Information
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
                        </div>

                        {parts && Array.isArray(parts) && parts.length > 0
                            ? parts
                                .filter(part => part !== null && part !== undefined) // Safety: filter null/undefined
                                .map((part, index) => {
                                    // Safety: Ensure part object exists
                                    if (!part) return null;
                                    
                                    return (
                                        <div
                                            key={index}
                                            className="grid grid-cols-3 gap-10 mb-6 relative border p-6 rounded-2xl"
                                        >
                                            <div className="absolute right-3 top-3">
                                                {parts.length > 1 && (
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
                                                <input
                                                    className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full"
                                                    placeholder="Part Name"
                                                    value={part?.partName || ""}
                                                    onChange={(e) =>
                                                        handlePartChange(index, "partName", e.target.value)
                                                    }
                                                />
                                            </div>

                                            <div className="w-full">
                                                <p className="text-sm mb-2 text-[#6B716F]">Part Code</p>
                                                <input
                                                    className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full"
                                                    placeholder="Part Code"
                                                    value={part?.partCode || ""}
                                                    onChange={(e) =>
                                                        handlePartChange(index, "partCode", e.target.value)
                                                    }
                                                />
                                            </div>

                                            <div className="w-full">
                                                <p className="text-sm mb-2 text-[#6B716F]">
                                                    Replacement Date
                                                </p>
                                                <input
                                                    type="date"
                                                    className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full"
                                                    value={part?.replacementDate || ""}
                                                    onChange={(e) =>
                                                        handlePartChange(index, "replacementDate", e.target.value)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    );
                                })
                            : (
                                // Fallback: Show at least one empty part if array is empty
                                <div className="grid grid-cols-3 gap-10 mb-6 relative border p-6 rounded-2xl">
                                    <div className="w-full">
                                        <p className="text-sm mb-2 text-[#6B716F]">Part Name</p>
                                        <input
                                            className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full"
                                            placeholder="Part Name"
                                            value=""
                                            readOnly
                                        />
                                    </div>
                                    <div className="w-full">
                                        <p className="text-sm mb-2 text-[#6B716F]">Part Code</p>
                                        <input
                                            className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full"
                                            placeholder="Part Code"
                                            value=""
                                            readOnly
                                        />
                                    </div>
                                    <div className="w-full">
                                        <p className="text-sm mb-2 text-[#6B716F]">Replacement Date</p>
                                        <input
                                            type="date"
                                            className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full"
                                            value=""
                                            readOnly
                                        />
                                    </div>
                                </div>
                            )}

                        {/* <div className="grid grid-cols-3 gap-10">
                            <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">Part Name</p>
                                <input
                                    className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Part Name"
                                    defaultValue={row?.partName || ""}
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">Part Code</p>
                                <input
                                    className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Part Code"
                                    defaultValue={row ? "PIN12334SD" : ""}
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">Replacement Date</p>
                                <input
                                    className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Replacement Date"
                                    defaultValue={row ? "05/16/2025" : ""}
                                />
                            </div>
                        </div> */}
                    </div>

                    <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                        <div className="text-md text-indigo-600 font-medium mb-6 flex items-center gap-2">
                            <WarningCircleIcon size={20} weight="bold" /> Issue Details
                        </div>
                        <div>
                            <p className="text-sm mb-2 text-[#6B716F]">Issue Description</p>
                            <textarea
                                name="issueDescription"
                                className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none min-h-[120px]"
                                placeholder="Provide a detailed description of the issue..."
                                value={formData.issueDescription}
                                onChange={handleInputChange}
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
                                    Uploaded Images
                                </p>
                                <p className="mb-3 text-md text-[#6B7280] font-medium">
                                    {uploadedImages.length > 0 
                                        ? `${uploadedImages.length} image(s) uploaded` 
                                        : 'No images uploaded yet'}
                                </p>
                            </div>
                            
                            {/* Display uploaded images */}
                            {uploadedImages.length > 0 ? (
                                <div className="w-full mb-6">
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {uploadedImages.map((image, index) => (
                                            <div key={image.imageId || index} className="relative group">
                                                <img 
                                                    src={image.url} 
                                                    alt={image.description || `Evidence ${index + 1}`}
                                                    className="w-full h-32 object-cover rounded-lg border-2 border-gray-300 hover:border-indigo-500 transition-colors cursor-pointer"
                                                    onClick={() => setSelectedImage(image)}
                                                />
                                                {image.description && (
                                                    <div className="mt-1 text-xs text-gray-600 text-left px-1 truncate">
                                                        {image.description}
                                                    </div>
                                                )}
                                                <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                                                    #{image.orderIndex + 1}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-3 mb-3">
                                    <div className="w-20 h-12 bg-gray-200 rounded-md" />
                                    <div className="w-20 h-12 bg-gray-200 rounded-md" />
                                    <div className="w-20 h-12 bg-gray-200 rounded-md" />
                                </div>
                            )}
                            
                            <div>
                                <p className="mt-3 text-sm text-[#6B7280]">
                                    Images from the original claim submission
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
                                <input type="radio" name="service" /> Request replacement part
                                approval
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="service" /> Request repair approval
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="service" /> Request reimbursement
                                (repair completed in advance)
                            </label>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 mt-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F1F3F4] hover:bg-[#dfe0e2] transition-all cursor-pointer"
                        >
                            <XCircleIcon size={18} />
                            <span>Cancel</span>
                        </button>
                        <button
                            type="submit"
                            onClick={handleSave}
                            disabled={isSubmitting}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-all text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <CheckCircleIcon size={18} />
                            <span>{isSubmitting ? "Saving..." : "Save Changes"}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
