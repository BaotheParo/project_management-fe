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
} from "@phosphor-icons/react";
import { useWarrantyClaims } from "../../../../api/useWarrantyClaims";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../../components/Loader";

export default function EditClaimRequestsPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { row, fetchClaimById, loading, error } = useWarrantyClaims();

    useEffect(() => {
        fetchClaimById(id);
    }, [id]);

    if (loading) return <Loader />;
    if (error)
        return (
            <p className="text-red-500">Error loading claims: {error.message}</p>
        );

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
                                    defaultValue={row?.id || ""}
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">Claim Date</p>
                                <input
                                    className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Claim Date"
                                    defaultValue={row?.claimDate || "03/12/2004"}
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
                                    defaultValue={row?.name || ""}
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
                                    defaultValue={row?.vin || ""}
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">Vehicle Name</p>
                                <input
                                    className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Enter vehicle name"
                                    defaultValue={row?.vehicle || ""}
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">
                                    Purchase Date of vehicle
                                </p>
                                <input
                                    className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Purchase Date of vehicle"
                                    defaultValue={row?.purchaseDate || ""}
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-sm mb-2 text-[#6B716F]">
                                    Current Mileage (km)
                                </p>
                                <input
                                    className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                    placeholder="Current Mileage (km)"
                                    defaultValue={row?.mileAge || ""}
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
                                defaultValue={
                                    row?.issueDescription || ""
                                }
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
                            // onClick={saveChanges}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-all text-white cursor-pointer"
                        >
                            <CheckCircleIcon size={18} />
                            <span>{row ? "Save Changes" : "Submit Claim"}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
