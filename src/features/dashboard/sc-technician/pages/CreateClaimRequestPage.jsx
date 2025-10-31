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
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../../../app/AuthProvider";

export default function CreateClaimRequestsPage() {
    const [claimId] = useState(uuidv4()); // Generate once
    const navigate = useNavigate();
    const { user } = useAuth();
    const { createClaim } = useWarrantyClaims(user?.userId);

    const displayName = user?.username || user?.name || user?.fullName || "User";

    const [formData, setFormData] = useState({
        claimId: "",
        claimDate: "",
        serviceCenterName: "",
        technicianName: "",
        vin: "",
        issueDescription: "",
        policyId: "",
        partItems: [
            {
                partId: "",
                partNumber: "",
                partName: "",
            },
        ],
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle part changes
    const handlePartChange = (index, e) => {
        const { name, value } = e.target;
        const updatedParts = [...formData.partItems];
        updatedParts[index][name] = value;
        setFormData((prev) => ({ ...prev, partItems: updatedParts }));
    };

    // ➕ Add new part
    const handleAddPart = () => {
        setFormData((prev) => ({
            ...prev,
            partItems: [
                ...prev.partItems,
                { partId: "", partName: "", partNumber: "", quantity: 1, price: 0 },
            ],
        }));
    };

    // 🗑 Remove part
    const handleRemovePart = (index) => {
        setFormData((prev) => ({
            ...prev,
            partItems: prev.partItems.filter((_, i) => i !== index),
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault();

        const payload = {
            claimDate: new Date().toISOString(),
            vin: formData.vin,
            issueDescription: formData.issueDescription,
            policyId: formData.policyId,
            partItems: formData.partItems.map((item) => ({
                partId: item.partId,
                partName: item.partName,
                quantity: Number(item.quantity),
                partNumber: item.partNumber,
                price: Number(item.price),
            })),
        };

        try {
            const result = await createClaim(payload);
            if (result.success) {
                alert("✅ Claim created successfully!");
                navigate("/claims");
            } else {
                alert("❌ Failed to create claim.");
            }
        } catch (err) {
            console.error("Error creating claim:", err);
            alert("❌ Something went wrong.");
        }
    };

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
                                    type="date"
                                    className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Claim Date"
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">Service Center</p>
                                <input
                                    className="p-3 bg-[#F9FAFB] border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Service Center"
                                    defaultValue={user?.serviceCenterName}
                                    disabled
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
                                {/* <input
                                    name="vin"
                                    className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="VIN code"
                                    value={formData.vin}
                                    onChange={handleChange}
                                    required
                                /> */}
                                <select 
                                    className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    required
                                >
                                    <option></option>
                                </select>
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
                                    type="date"
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
                                    <p className="text-sm mb-2 text-[#6B716F]">Part Id</p>
                                    <input
                                        name="partId"
                                        className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full"
                                        placeholder="Part Id"
                                        value={part.partId}
                                        onChange={(e) => handlePartChange(index, e)}
                                    />
                                </div>

                                <div className="w-full">
                                    <p className="text-sm mb-2 text-[#6B716F]">Part Name</p>
                                    <input
                                        name="partName"
                                        className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full"
                                        placeholder="Part Name"
                                        value={part.partName}
                                        onChange={(e) => handlePartChange(index, e)}
                                    />
                                </div>

                                <div className="w-full">
                                    <p className="text-sm mb-2 text-[#6B716F]">Part Number</p>
                                    <input
                                        name="partNumber"
                                        className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full"
                                        placeholder="Part Number"
                                        value={part.partNumber}
                                        onChange={(e) => handlePartChange(index, e)}
                                    />
                                </div>

                                {/* <div className="w-full">
                                    <p className="text-sm mb-2 text-[#6B716F]">
                                        Replacement Date
                                    </p>
                                    <input
                                        type="date"
                                        className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full"
                                        value={part.replacementDate}
                                    />
                                </div> */}
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
                                className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none min-h-[120px]"
                                placeholder="Provide a detailed description of the issue..."
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
                                <button className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-all text-white cursor-pointer">
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
