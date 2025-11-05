import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@phosphor-icons/react";

const DashboardClaim = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // Use the ID from URL
  const claimId = id;

  const handleBack = () => {
    navigate("/evm-staff");
  };

  return (
    <div className="w-full">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Claim Details</h1>
          <p className="text-gray-500">Review and process claim request.</p>
        </div>
      </div>

      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-2xl border-2 border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">
                Claim ID
              </div>
              <div className="text-lg font-medium text-gray-900">{claimId}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">
                Claim Date
              </div>
              <div className="text-lg font-medium text-gray-900">
                02/12/2025
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">
                Created By
              </div>
              <div className="text-lg font-medium text-gray-900">Jso</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">
                Service Center
              </div>
              <div className="text-lg font-medium text-gray-900">
                WC-2003-9192332
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">
                Manufacturer
              </div>
              <div className="text-lg font-medium text-gray-900">VinFast</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Vehicle Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">
                VIN Code
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
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Part Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                Replacement Date
              </div>
              <div className="text-lg font-medium text-gray-900">
                05/16/2025
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Issue Details
          </h3>
          <div>
            <div className="text-sm font-medium text-gray-500 mb-2">
              Issue Description
            </div>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-base text-gray-700 leading-relaxed">
                My car cannot start like normal, when start the engine the sound
                is noisy as hell.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Evidence Upload
          </h3>
          <div>
            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
              <p className="text-base text-gray-600">Images/Attachments</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Service Center Request
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                className="w-4 h-4 text-indigo-600 rounded border-gray-300"
              />
              <span className="text-base text-gray-700">
                Request replacement part approval
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                className="w-4 h-4 text-indigo-600 rounded border-gray-300"
              />
              <span className="text-base text-gray-700">
                Request repair approval
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                className="w-4 h-4 text-indigo-600 rounded border-gray-300"
              />
              <span className="text-base text-gray-700">
                Request reimbursement (repair completed in advance)
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Action Required
          </h3>
          <div className="space-y-4">
            <p className="text-gray-600">
              Please review the claim details carefully before taking any
              action.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() =>
                  navigate(`/evm-staff/claim/${claimId}/part-supply`)
                }
                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Approve Claim
              </button>
              <button
                onClick={() => navigate(`/evm-staff/claim/${claimId}/reject`)}
                className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Reject Claim
              </button>
            </div>
          </div>
        </div>

        <div className="col-span-full flex justify-center mt-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-6 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeftIcon size={20} />
            Back to Dashboard
          </button>
        </div>
      </section>
    </div>
  );
};

export default DashboardClaim;
