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
import axiousInstance from "../../../../api/axiousInstance";
import profilePlaceholder from "../../../../assets/profile-placeholder.png";

// Normalize image src: if backend returns a relative path (e.g. "placeholder/.."),
// prefix with a sensible backend base URL. Prefer VITE_API_BASE_URL if defined,
// otherwise fall back to axiosInstance.defaults.baseURL (unless it's '/api')
// or window.location.origin.
const normalizeSrc = (src) => {
    if (!src) return src;
    // If already absolute (http/https), data or blob or root-relative, handle specially
    if (/^(https?:|data:|blob:)/.test(src)) return src;

    // If root-relative (starts with '/'), prefer backend URL over dev proxy '/api'
    const backendEnv = import.meta.env.VITE_API_BASE_URL;
    const axiosBase = axiousInstance.defaults.baseURL || '';

    // Determine backend host: prefer explicit env, then axiosBase if present, else in dev fallback to localhost:5081, else window.location.origin
    let backendHost;
    if (backendEnv) {
        backendHost = backendEnv.replace(/\/$/, '');
    } else if (axiosBase && axiosBase !== '/api') {
        backendHost = axiosBase.replace(/\/$/, '');
    } else if (import.meta.env.DEV) {
        backendHost = 'http://localhost:5081';
    } else {
        backendHost = window.location.origin.replace(/\/$/, '');
    }

    // If src already starts with '/', it's root-relative on backend host
    if (src.startsWith('/')) {
        return backendHost + src;
    }

    // Otherwise src is relative without leading slash
    return backendHost + '/' + src.replace(/^\//, '');
};

export default function EditClaimRequestsPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();
    const { row, fetchClaimById, updateClaim, loading, error } = useWarrantyClaims(user?.userId);
    
    // 🧩 Add dynamic parts state
    const [parts, setParts] = useState([]);
    
    // 📝 Form state for controlled inputs
    const [formData, setFormData] = useState({
        vin: "",
        vehicleName: "",
        purchaseDate: "",
        mileAge: "",
        issueDescription: "",
        claimDate: "",
        actionType: 0, // Service Center Request
    });
    
    // 📁 File upload state
    const [uploadedFiles, setUploadedFiles] = useState([]);
    
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
                actionType: row.actionType || 0, // Load actionType from data
            });
            
            // Load Evidence Upload (ClaimImages) from data
            if (row.claimImages && Array.isArray(row.claimImages) && row.claimImages.length > 0) {
                const existingFiles = row.claimImages.map((img, index) => ({
                    file: null, // No file object, just URL
                    preview: img.imageUrl || img.url || img, // Use URL as preview
                    name: img.fileName || img.name || `image-${index + 1}.jpg`,
                    size: 0,
                    url: img.imageUrl || img.url || img, // Store URL
                }));
                setUploadedFiles(existingFiles);
            } else if (row.evidenceUrls && Array.isArray(row.evidenceUrls) && row.evidenceUrls.length > 0) {
                // Fallback to evidenceUrls if claimImages doesn't exist
                const existingFiles = row.evidenceUrls.map((url, index) => ({
                    file: null,
                    preview: url,
                    name: `image-${index + 1}.jpg`,
                    size: 0,
                    url: url,
                }));
                setUploadedFiles(existingFiles);
            }
            
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
    
    // 📁 File upload handlers
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
                setNotification({
                    type: "error",
                    message: `File "${file.name}" exceeds 10MB limit`,
                });
                return;
            }

            // Check file type
            const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
            if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
                setNotification({
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
            
            setUploadedFiles((prev) => {
                const existing = new Set(prev.map(f => `${f.name}-${f.size}`));
                const unique = newFiles.filter(f => !existing.has(`${f.name}-${f.size}`));
                return [...prev, ...unique];
            });
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
            const fileToRemove = prev[index];
            if (fileToRemove?.preview?.startsWith('blob:')) {
                URL.revokeObjectURL(fileToRemove.preview);
            }
            return prev.filter((_, i) => i !== index);
        });
    };
    
    // Cleanup preview URLs on unmount
    useEffect(() => {
        return () => {
            uploadedFiles.forEach((file) => {
                if (file.preview && file.file) {
                    URL.revokeObjectURL(file.preview);
                }
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    // 🔘 Handle Service Center Request change
    const handleActionTypeChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            actionType: parseInt(e.target.value),
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
            
            // Upload new files if any
            let evidenceUrls = [];
            const newFiles = uploadedFiles.filter(f => f.file); // Only files that need upload
            if (newFiles.length > 0) {
                try {
                    const uploadEndpoints = ['/upload', '/files/upload', '/api/upload', '/files'];
                    
                    for (const fileObj of newFiles) {
                        let uploaded = false;
                        for (const endpoint of uploadEndpoints) {
                            try {
                                const formData = new FormData();
                                formData.append('file', fileObj.file);
                                const response = await axiousInstance.post(endpoint, formData);
                                const fileUrl = response?.url || response?.fileUrl || response?.data?.url || response?.data;
                                if (fileUrl && typeof fileUrl === 'string') {
                                    evidenceUrls.push(fileUrl);
                                    uploaded = true;
                                    break;
                                }
                            } catch (error) {
                                if (error.response?.status !== 404) continue;
                            }
                        }
                        if (!uploaded && fileObj.url) {
                            // Use existing URL if upload failed
                            evidenceUrls.push(fileObj.url);
                        }
                    }
                } catch (error) {
                    console.error("❌ File upload failed:", error);
                }
            }
            
            // Collect existing file URLs (files that were already uploaded)
            const existingUrls = uploadedFiles
                .filter(f => !f.file && f.url) // Files without file object but with URL
                .map(f => f.url);
            
            // Combine new and existing URLs
            const allUrls = [...existingUrls, ...evidenceUrls];
            
            // Format ClaimImages: backend expects array of objects
            let claimImages = [];
            if (allUrls.length > 0) {
                claimImages = allUrls.map(url => ({
                    imageUrl: url,
                    fileName: url.split('/').pop() || 'image.jpg'
                }));
            } else if (uploadedFiles.length > 0) {
                // Fallback: use file names if no URLs
                claimImages = uploadedFiles.map(f => ({
                    fileName: f.name,
                    imageUrl: f.url || `placeholder/${f.name}`
                }));
            }
            
            // Format payload according to API requirements
            // Note: Use same field names as CreateClaimRequestPage to satisfy backend validation
            const payload = {
                // Basic & vehicle info (include to avoid validation errors)
                ClaimDate: formData.claimDate ? new Date(formData.claimDate).toISOString() : row?.claimDate || null,
                CenterName: row?.serviceCenterName || null,
                VIN: formData.vin || row?.vin || null,
                VehicleName: formData.vehicleName || row?.vehicleName || null,
                Mileage: Number.parseInt(formData.mileAge || formData.mileage || row?.mileAge || row?.mileage || 0) || 0,
                PurchaseDate: formData.purchaseDate ? new Date(formData.purchaseDate).toISOString() : row?.purchaseDate || null,
                // Editable fields
                IssueDescription: formData.issueDescription && formData.issueDescription.trim() ? formData.issueDescription.trim() : undefined,
                ActionType: formData.actionType !== undefined ? formData.actionType : undefined,
            };

            // Format partItems - match CreateClaimRequestPage format
            const filteredParts = parts.filter(part => part && (part.partName || part.partCode || part.partNumber));
            if (filteredParts.length > 0) {
                payload.PartItems = filteredParts.map(part => {
                    const item = {
                        PartName: (part.partName || part.partName)?.trim() || "",
                        PartNumber: (part.partCode || part.partNumber || "").toString().trim(),
                        // Backend requires a valid DateTime; default to now when replacementDate missing
                        ReplacementDate: part.replacementDate
                            ? formatDateToISO(part.replacementDate)
                            : new Date().toISOString(),
                    };
                    // Only include partId if it exists
                    if (part.partId && part.partId.toString().trim()) {
                        item.PartId = part.partId.toString().trim();
                    }
                    return item;
                });
            }

            // Add ClaimImages
            if (claimImages.length > 0) {
                payload.ClaimImages = claimImages;
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
                                    readOnly={true}
                                    className="p-3 bg-[#F9FAFB] border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Claim Date"
                                    value={formData.claimDate}
                                    aria-disabled
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">Service Center</p>
                                <input
                                    readOnly={true}
                                    className="p-3 bg-[#F9FAFB] border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Service Center"
                                    defaultValue={row?.serviceCenterName}
                                    aria-disabled
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
                                    readOnly={true}
                                    className="p-3 bg-[#F9FAFB] border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="VIN code"
                                    value={formData.vin}
                                    aria-disabled
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">Vehicle Name</p>
                                <input
                                    type="text"
                                    name="vehicleName"
                                    readOnly={true}
                                    className="p-3 bg-[#F9FAFB] border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Enter vehicle name"
                                    value={formData.vehicleName}
                                    aria-disabled
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">
                                    Purchase Date of vehicle
                                </p>
                                <input
                                    type="date"
                                    name="purchaseDate"
                                    readOnly={true}
                                    className="p-3 bg-[#F9FAFB] border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Purchase Date of vehicle"
                                    value={formData.purchaseDate}
                                    aria-disabled
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">
                                    Current Mileage (km)
                                </p>
                                <input
                                    type="number"
                                    name="mileAge"
                                    readOnly={true}
                                    className="p-3 bg-[#F9FAFB] border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Current Mileage (km)"
                                    value={formData.mileAge}
                                    aria-disabled
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
                        <div 
                            className="flex flex-col items-center justify-between border-dashed border-2 border-gray-200 rounded-md p-8 text-center cursor-pointer hover:border-indigo-400 transition-colors"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onClick={() => document.getElementById('file-input-edit')?.click()}
                        >
                            <input
                                id="file-input-edit"
                                type="file"
                                multiple
                                accept="image/jpeg,image/jpg,image/png,video/mp4,video/quicktime,.jpg,.jpeg,.png,.mp4,.mov"
                                onChange={handleFileSelect}
                                className="hidden"
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
                                <div className="grid grid-cols-3 gap-4 mb-3">
                                    {uploadedFiles.map((file, index) => (
                                        <div key={`${file.name || 'file'}-${index}`} className="relative aspect-[16/9] rounded-xl overflow-hidden border border-gray-200">
                                            {file.preview ? (
                                                <img
                                                    src={file.preview.startsWith('blob:') ? file.preview : normalizeSrc(file.preview)}
                                                    alt={file.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                    <PackageIcon size={28} color="#6B7280" />
                                                </div>
                                            )}
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRemoveFile(index);
                                                }}
                                                className="absolute top-2 right-2 bg-white border border-gray-200 text-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-sm hover:bg-red-50"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-3 gap-4 mb-3">
                                    <div className="aspect-[16/9] rounded-xl bg-gray-100" />
                                    <div className="aspect-[16/9] rounded-xl bg-gray-100" />
                                    <div className="aspect-[16/9] rounded-xl bg-gray-100" />
                                </div>
                            )}
                            <div>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        document.getElementById('file-input-edit')?.click();
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
                                /> Request replacement part approval
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="actionType" 
                                    value="1"
                                    checked={formData.actionType === 1}
                                    onChange={handleActionTypeChange}
                                /> Request repair approval
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="actionType" 
                                    value="2"
                                    checked={formData.actionType === 2}
                                    onChange={handleActionTypeChange}
                                /> Request reimbursement (repair completed in advance)
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
