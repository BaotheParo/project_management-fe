import {
    BuildingsIcon,
    CameraIcon,
    CarIcon,
    CheckCircleIcon,
    CloudArrowUpIcon,
    InfoIcon,
    PackageIcon,
    WarningCircleIcon,
    XCircleIcon,
    TrashIcon,
} from "@phosphor-icons/react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../../../app/AuthProvider";
import { useCloudinaryUpload } from "../../../../hooks/useCloudinaryUpload";

export default function CreateClaimRequestsPage() {
    const [claimId] = useState(uuidv4()); // Generate once
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const { user } = useAuth();
    const displayName = user?.username || user?.name || user?.fullName || "User";

    // Cloudinary upload hook - Replace with your Cloudinary credentials
    const { uploadFile, error: uploadError } = useCloudinaryUpload(
        'hqhoangvuong', 
        'warranty_claims_upload'
    );

    // State for uploaded images
    const [uploadedImages, setUploadedImages] = useState([]);
    const [uploadingFiles, setUploadingFiles] = useState(false);

    // Handle file selection
    const handleFileSelect = async (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploadingFiles(true);
        
        try {
            // Upload each file to Cloudinary
            const uploadPromises = Array.from(files).map(async (file) => {
                const result = await uploadFile(file);
                return {
                    id: uuidv4(),
                    url: result.url,
                    publicId: result.publicId,
                    format: result.format,
                    resourceType: result.resourceType,
                    fileName: file.name,
                };
            });

            const results = await Promise.all(uploadPromises);
            setUploadedImages(prev => [...prev, ...results]);
        } catch (error) {
            console.error('Error uploading files:', error);
            alert('Failed to upload files: ' + error.message);
        } finally {
            setUploadingFiles(false);
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    // Handle removing an uploaded image
    const handleRemoveImage = (imageId) => {
        setUploadedImages(prev => prev.filter(img => img.id !== imageId));
    };

    // Handle drag and drop
    const handleDrop = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const files = e.dataTransfer.files;
        if (!files || files.length === 0) return;

        // Create a synthetic event object for handleFileSelect
        handleFileSelect({ target: { files } });
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    async function handleSubmit(e) {
        e.preventDefault();
        
        console.log('Uploaded images:', uploadedImages);
        // Add your form submission logic here
        // The uploadedImages array contains all the Cloudinary URLs
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
                <form className="space-y-10" onSubmit={handleSubmit}>
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
                                    defaultValue={claimId}
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">Claim Date</p>
                                <input
                                    className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Claim Date"
                                />
                            </div>
                            {/* <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">Service Center</p>
                                <input
                                    className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Service Center"
                                    defaultValue={row?.service || "WC-2003-9192332"}
                                />
                            </div> */}
                            <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">Created By</p>
                                <input
                                    readOnly={true}
                                    className="p-3 bg-[#F9FAFB] border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Created By"
                                    defaultValue={displayName}
                                />
                            </div>
                            {/* <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">Manufacturer</p>
                                <select className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none">
                                    <option>Select Manufacturer</option>
                                </select>
                            </div> */}
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
                                    className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="VIN code"
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">Vehicle Name</p>
                                <input
                                    className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Enter vehicle name"
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">
                                    Purchase Date of vehicle
                                </p>
                                <input
                                    className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Purchase Date of vehicle"
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">
                                    Current Mileage (km)
                                </p>
                                <input
                                    className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Current Mileage (km)"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                        <div className="text-md text-indigo-600 font-medium mb-6 flex items-center gap-2">
                            <PackageIcon size={20} weight="bold" /> Part Information
                        </div>
                        <div className="grid grid-cols-3 gap-10">
                            <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">Part Name</p>
                                <input
                                    className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Part Name"
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">Part Code</p>
                                <input
                                    className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Part Code"
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">Replacement Date</p>
                                <input
                                    className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Replacement Date"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                        <div className="text-md text-indigo-600 font-medium mb-6 flex items-center gap-2">
                            <WarningCircleIcon size={20} weight="bold" /> Issue Details
                        </div>
                        <div>
                            <p className="text-sm mb-2 text-[#6B716F]">Issue Description</p>
                            <textarea
                                className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none min-h-[120px]"
                                placeholder="Provide a detailed description of the issue..."
                            />
                        </div>
                    </div>

                    <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                        <div className="text-md text-indigo-600 font-medium mb-6 flex items-center gap-2">
                            <CameraIcon size={20} weight="bold" /> Evidence Upload
                        </div>
                        <div 
                            className="flex flex-col items-center justify-between border-dashed border-2 border-gray-200 rounded-md p-8 text-center"
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                        >
                            <CloudArrowUpIcon size={50} color="#9CA3AF" weight="fill" />
                            <div className="leading-1 mt-4 mb-10">
                                <p className="mb-3 text-xl font-medium">
                                    Upload Images or Videos
                                </p>
                                <p className="mb-3 text-md text-[#6B7280] font-medium">
                                    Drag and drop files here or click to browse
                                </p>
                            </div>

                            {/* Preview uploaded images */}
                            {uploadedImages.length > 0 && (
                                <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                                    {uploadedImages.map((image) => (
                                        <div key={image.id} className="relative group">
                                            <img 
                                                src={image.url} 
                                                alt={image.fileName}
                                                className="w-20 h-20 object-cover rounded-md border-2 border-gray-300"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(image.id)}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <TrashIcon size={14} weight="bold" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Show placeholder boxes if no images */}
                            {uploadedImages.length === 0 && (
                                <div className="flex items-center justify-center gap-3 mb-3">
                                    <div className="w-20 h-12 bg-gray-200 rounded-md" />
                                    <div className="w-20 h-12 bg-gray-200 rounded-md" />
                                    <div className="w-20 h-12 bg-gray-200 rounded-md" />
                                </div>
                            )}

                            <div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    accept="image/jpeg,image/jpg,image/png,image/gif,video/mp4,video/mov"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                    id="file-upload"
                                />
                                <label
                                    htmlFor="file-upload"
                                    className={`px-4 py-2 rounded-full ${
                                        uploadingFiles 
                                            ? 'bg-gray-400 cursor-not-allowed' 
                                            : 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'
                                    } transition-all text-white inline-block`}
                                >
                                    {uploadingFiles ? 'Uploading...' : 'Choose a file'}
                                </label>
                                <p className="mt-3 text-sm text-[#6B7280]">
                                    Max file size: 10MB per file. Supported formats: JPG, PNG, MP4, MOV
                                </p>
                                {uploadError && (
                                    <p className="mt-2 text-sm text-red-600">
                                        Error: {uploadError}
                                    </p>
                                )}
                                {uploadedImages.length > 0 && (
                                    <p className="mt-2 text-sm text-green-600">
                                        {uploadedImages.length} file(s) uploaded successfully
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
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-all text-white cursor-pointer"
                        >
                            <CheckCircleIcon size={18} />
                            <span>Submit Claim</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}