import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@phosphor-icons/react";

export default function ViewDetailInvoice() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="w-full p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-1.5 rounded-lg"
      >
        <ArrowLeftIcon size={18} />
        Back
      </button>

      <h1 className="text-3xl font-bold mb-2">Invoice Details</h1>
      <p className="text-gray-500 mb-6">Invoice ID: {id}</p>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <p className="text-gray-700">Details content goes here.</p>
      </div>
    </div>
  );
}

