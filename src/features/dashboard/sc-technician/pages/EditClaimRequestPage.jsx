export default function EditClaimRequestsPage() {
    return (
        <div className="mb-6 mt-9">
            <div className="space-y-10">
                <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                    <div className="text-md text-indigo-600 font-medium mb-6 flex items-center gap-2">
                        <InfoIcon size={20} weight="bold" />{" "}
                        {editingRow ? "Edit Warranty Claim" : "Basic Information"}
                    </div>
                    <div className="grid grid-cols-3 gap-10">
                        <div className="w-full">
                            <p className="text-sm mb-2 text-[#6B716F]">Claim Id</p>
                            <input
                                readOnly="true"
                                className="p-3 bg-[#F9FAFB] border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                placeholder="Claim ID"
                                aria-disabled
                                defaultValue={editingRow?.id || "WC-2003-9192332"}
                            />
                        </div>
                        <div className="w-full">
                            <p className="text-sm mb-2 text-[#6B716F]">Claim Date</p>
                            <input
                                className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                placeholder="Claim Date"
                                defaultValue={editingRow ? "02/12/2025" : ""}
                            />
                        </div>
                        <div className="w-full">
                            <p className="text-sm mb-2 text-[#6B716F]">Service Center</p>
                            <input
                                className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                placeholder="Service Center"
                                defaultValue={editingRow ? "WC-2003-9192332" : ""}
                            />
                        </div>
                        <div className="w-full">
                            <p className="text-sm mb-2 text-[#6B716F]">Created By</p>
                            <input
                                readOnly="true"
                                className="p-3 bg-[#F9FAFB] border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                placeholder="Created By"
                                defaultValue={editingRow ? "Jso" : ""}
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
                                className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                placeholder="VIN code"
                                defaultValue={editingRow?.vin || ""}
                            />
                        </div>
                        <div className="w-full">
                            <p className="text-sm mb-2 text-[#6B716F]">Vehicle Name</p>
                            <input
                                className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                placeholder="Enter vehicle name"
                                defaultValue={editingRow?.vehicle || ""}
                            />
                        </div>
                        <div className="w-full">
                            <p className="text-sm mb-2 text-[#6B716F]">
                                Purchase Date of vehicle
                            </p>
                            <input
                                className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                placeholder="Purchase Date of vehicle"
                                defaultValue={editingRow ? "12/23/2012" : ""}
                            />
                        </div>
                        <div className="w-full">
                            <p className="text-sm mb-2 text-[#6B716F]">
                                Current Mileage (km)
                            </p>
                            <input
                                className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                placeholder="Current Mileage (km)"
                                defaultValue={editingRow ? "8,433" : ""}
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
                                defaultValue={editingRow ? "Battery" : ""}
                            />
                        </div>
                        <div className="w-full">
                            <p className="text-sm mb-2 text-[#6B716F]">Part Code</p>
                            <input
                                className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                placeholder="Part Code"
                                defaultValue={editingRow ? "PIN12334SD" : ""}
                            />
                        </div>
                        <div className="w-full">
                            <p className="text-sm mb-2 text-[#6B716F]">Replacement Date</p>
                            <input
                                className="p-3 bg-white border-[3px] border-[#EBEBEB] rounded-2xl w-full focus:border-[#c6d2ff] focus:outline-none"
                                placeholder="Replacement Date"
                                defaultValue={editingRow ? "05/16/2025" : ""}
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
                                editingRow
                                    ? "My car cannot start like normal, when start the engine the sound is noisy as hell."
                                    : ""
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
                        onClick={closeForm}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F1F3F4] hover:bg-[#dfe0e2] transition-all cursor-pointer"
                    >
                        <XCircleIcon size={18} />
                        <span>Cancel</span>
                    </button>
                    <button
                        onClick={saveChanges}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-all text-white cursor-pointer"
                    >
                        <CheckCircleIcon size={18} />
                        <span>{editingRow ? "Save Changes" : "Submit Claim"}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
