import { CarIcon, UserIcon, WarningCircleIcon, WrenchIcon } from "@phosphor-icons/react";


export default function WorkDetails({ row, onClose }) {
    if (!row) return null

    return (
        <div className="w-full">
            <h2 className="text-xl font-semibold mb-1">Work Orders #{row.id}</h2>
            <div className="text-sm text-gray-500 mb-6">
                {row.vehicle} - {row.owner}
            </div>

            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-4">
                    <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                        <div className="text-sm text-indigo-600 font-medium mb-2 flex items-center gap-2">
                            <CarIcon size={16} /> Vehicle Information
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <div className="text-xs text-gray-500">Make & Model</div>
                                <div className="font-semibold">{row.vehicle}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">
                                    Purchase Date of Vehicle
                                </div>
                                <div className="font-semibold">July 12, 2022</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">VIN</div>
                                <div className="font-semibold">{row.vin}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">Mileage</div>
                                <div className="font-semibold">1,922 km</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                        <div className="text-sm text-indigo-600 font-medium mb-2 flex items-center gap-2">
                            <WarningCircleIcon size={16} /> Issue Details
                        </div>
                        <div className="text-sm">
                            <div className="text-xs text-gray-500 mb-2">Issue Overview</div>
                            <div className="mb-4">
                                Battery thermal management system showing error codes.
                            </div>
                            <div className="text-xs text-gray-500 mb-2">
                                Issue Description
                            </div>
                            <div>
                                Battery thermal management system showing error codes.
                                Customer reports reduced range and charging speed.
                                Regenerative braking system intermittent failure during
                                highway driving.
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                        <div className="text-sm text-indigo-600 font-medium mb-2 flex items-center gap-2">
                            <WrenchIcon size={16} /> Work Details
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <div className="text-xs text-gray-500">Priority</div>
                                <div className="font-semibold">Medium</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500">Estimated Hours</div>
                                <div className="font-semibold">3-4 hours</div>
                            </div>
                            <div className="col-span-2">
                                <div className="text-xs text-gray-500">Parts Required</div>
                                <div className="font-semibold">
                                    Brake control module, Brake sensor
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                        <div className="text-sm text-indigo-600 font-medium mb-2 flex items-center gap-2">
                            <UserIcon size={16} /> Customer Information
                        </div>
                        <div className="text-sm">
                            <div className="text-xs text-gray-500">Name</div>
                            <div className="font-semibold">{row.owner}</div>
                            <div className="text-xs text-gray-500 mt-3">Phone</div>
                            <div>09223447364</div>
                            <div className="text-xs text-gray-500 mt-3">Email</div>
                            <div>sme@gmail.com</div>
                            <div className="text-xs text-gray-500 mt-3">Address</div>
                            <div>21 Liverpool Street, England</div>
                        </div>
                    </div>

                    <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                        <div className="text-sm text-indigo-600 font-medium mb-2 flex items-center gap-2">
                            <CalendarBlankIcon size={16} /> Schedule
                        </div>
                        <div className="text-sm">
                            <div className="text-xs text-gray-500">Schedule Date</div>
                            <div className="font-semibold">August 3, 2025</div>
                            <div className="text-xs text-gray-500 mt-3">Schedule Time</div>
                            <div>3:12 PM</div>
                        </div>
                    </div>

                    <div className="bg-white border-[3px] border-[#EBEBEB] rounded-2xl p-10">
                        <div className="text-sm text-indigo-600 font-medium mb-2">
                            Actions
                        </div>
                        <div className="flex flex-col">
                            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white rounded-full cursor-pointer mb-2">
                                Complete Work
                            </button>
                            <button
                                onClick={onClose}
                                className="px-4 py-2 rounded-full bg-[#F1F3F4] hover:bg-[#dfe0e2] transition-all cursor-pointer"
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}