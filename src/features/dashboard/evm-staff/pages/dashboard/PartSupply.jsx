import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CheckIcon,
  XIcon,
  InfoIcon,
  GearIcon,
  TruckIcon,
  CalendarBlankIcon,
  CarIcon,
} from "@phosphor-icons/react";

export default function PartSupply() {
  const navigate = useNavigate();
  const { claimId } = useParams();
  // const [formData, setFormData] = useState({
  //   partName: 'Engine Control Module',
  //   description: 'Comprehensive warranty coverage for engine control module including diagnostic and replacement services under manufacturer specifications.',
  //   duration: '36',
  //   condition: 'Valid for vehicles under 100,000 miles',
  //   effectiveDate: '2024-01-01',
  //   expiryDate: '2027-01-01'
  // })
  const FormSection = ({ icon: Icon, title, colorClass }) => (
    <h2 className="flex items-center text-xl font-semibold text-gray-800 mb-6 mt-8 pt-4 border-t border-gray-200 first:mt-0 first:pt-0 first:border-t-0">
      <Icon size={24} weight="fill" className={`mr-3 ${colorClass}`} />
      {title}
    </h2>
  );
  // handleSubmit removed (unused). Navigation is handled inline by buttons.

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <div className="w-full flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Part Supply</h1>
            <p className="text-gray-500">
              Fill out the form below to submit a new warranty claim request for
              electric vehicle components.
            </p>
            <p className="text-gray-500">Claim ID: {claimId}</p>
          </div>
        </div>
      </div>
      {/* part supply notepad */}

      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-2xl border-2 border-gray-200 p-6">
          <h2 className="flex items-center text-xl font-semibold text-gray-800 mb-6">
            <CarIcon size={20} className="text-blue-600 mr-2" />
            Vehicle Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">
                Vin Code
              </div>
              <div className="text-lg font-medium text-gray-900">
                LSV1E7AL0MC123458
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">
                Vehicle Name
              </div>
              <div className="text-lg font-medium text-gray-900">
                VinFast VF-3
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">
                Current Mileage (km)
              </div>
              <div className="text-lg font-medium text-gray-900">8,433</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">
                Purchase Date of Vehicle
              </div>
              <div className="text-lg font-medium text-gray-900">
                12/23/2012
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-gray-200 p-6">
          <h2 className="flex items-center text-xl font-semibold text-gray-800 mb-6">
            <TruckIcon size={20} className="text-orange-600 mr-2" />
            Supply Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">
                Vin Code
              </div>
              <div className="text-lg font-medium text-gray-900">
                LSV1E7AL0MC123458
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">
                Vehicle Name
              </div>
              <div className="text-lg font-medium text-gray-900">
                VinFast VF-3
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">
                Current Mileage (km)
              </div>
              <div className="text-lg font-medium text-gray-900">8,433</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">
                Purchase Date of Vehicle
              </div>
              <div className="text-lg font-medium text-gray-900">
                12/23/2012
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-gray-200 p-6">
          <h2 className="flex items-center text-xl font-semibold text-gray-800 mb-6">
            <GearIcon size={20} className="text-green-600 mr-2" />
            Part Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">
                Part Name
              </div>
              <div className="text-lg font-medium text-gray-900">Battery</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">
                Part Code
              </div>
              <div className="text-lg font-medium text-gray-900">
                PIN12334SD
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">
                Quantity
              </div>
              <div className="text-lg font-medium text-gray-900">5</div>
            </div>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-end gap-4">
        <button
          onClick={() => navigate(`/evm-staff/claim/${claimId}`)}
          className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
        >
          <XIcon size={20} />
          <span>Cancel</span>
        </button>
        <button
          onClick={() => {
            // Add confirmation logic here
            alert("Part supply request confirmed!");
            navigate(`/evm-staff/claim/${claimId}`);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <CheckIcon size={20} />
          <span>Confirm</span>
        </button>
      </div>
    </div>
  );
}
