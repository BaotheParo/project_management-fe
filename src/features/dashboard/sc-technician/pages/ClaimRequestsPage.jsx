import React, { useMemo, useState, useRef, useEffect } from "react";
import {
  PlusCircleIcon,
  CaretLeftIcon,
  CaretRightIcon,
  XCircleIcon,
  CheckCircleIcon,
  DotsThreeIcon,
  ListDashesIcon,
  DotsThreeCircleIcon,
  ClockIcon,
} from "@phosphor-icons/react";
import StatusCard from "../components/StatusCard";
import StatusDot from "../components/StatusDot";
import DeleteModal from "../components/DeleteClaimRequest";
import { useWarrantyClaims } from "../../../../api/useWarrantyClaims";
import Loader from "../../../../components/Loader";
import { useNavigate } from "react-router-dom";

export default function ClaimRequestsPage() {
  const [editingRow, setEditingRow] = useState(null);
  const [openActionFor, setOpenActionFor] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const menuRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenActionFor(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  const total = 247;
  const perPage = 10;
  const totalPages = Math.ceil(total / perPage);

  const pages = useMemo(() => [1, 2, 3, 4], []);

  const [deletingRow, setDeletingRow] = useState(null);

  function confirmDelete() {
    setDeletingRow(null);
  }
  
  const { rows, loading, error } = useWarrantyClaims();

  const totalClaims = rows.length;
  const pendingClaims = rows.filter(r => r.status === "Pending").length;
  const acceptedClaims = rows.filter(r => r.status === "Accepted").length;
  const rejectedClaims = rows.filter(r => r.status === "Rejected").length;
  const overdueClaims = rows.filter(r => r.status === "Overdue").length;

  if (loading) return <Loader />;
  if (error) 
    return (
    <p className="text-red-500">
      Error loading claims: {error.message}
    </p>
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

      <div className="flex flex-wrap gap-6 mt-20 mb-12">
        <StatusCard
          title="Total Requests"
          titleColor="text-indigo-600"
          count={totalClaims}
          description="Currently in your queue"
          icon={ListDashesIcon}
          iconColor={"#4f39f8"}
        />
        <StatusCard
          title="Pending"
          titleColor="text-gray-500"
          count={pendingClaims}
          description="Waiting accepted"
          icon={DotsThreeCircleIcon}
          iconColor={"#979AA3"}
        />
        <StatusCard
          title="Accepted"
          titleColor="text-green-600"
          count={acceptedClaims}
          description="Currently in your queue"
          icon={CheckCircleIcon}
          iconColor={"#00a63e"}
        />
        <StatusCard
          title="Rejected"
          titleColor="text-red-500"
          count={rejectedClaims}
          description="Currently in your queue"
          icon={XCircleIcon}
          iconColor={"#fb2c36"}
        />
        <StatusCard
          title="Overdue"
          titleColor="text-red-500"
          count={overdueClaims}
          description="Currently in your queue"
          icon={ClockIcon}
          iconColor={"#fb2c36"}
        />
      </div>

      <div className="bg-white rounded-2xl">
        <div className="flex justify-between">
          <h2 className="text-[25px] font-semibold text-black">
            {showCreateForm
              ? editingRow
                ? "Edit Warranty Claim"
                : "Create New Warranty Claim"
              : "Requested Claim"}
          </h2>
          {!showCreateForm && (
            <button
              onClick={() => {
                setEditingRow(null);
                setShowCreateForm(true);
              }}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition-all text-white px-4 py-2 rounded-full cursor-pointer"
            >
              <PlusCircleIcon size={16} />
              <span>Create request</span>
            </button>
          )}
        </div>
        <p className="text-sm text-gray-500">
          {showCreateForm
            ? editingRow
              ? "Fill out the form below to submit or edit a warranty claim."
              : "Fill out the form below to submit a new warranty claim request for electric vehicle components."
            : ""}
        </p>

        <div className="border-[3px] border-[#EBEBEB] rounded-2xl overflow-visible mt-6">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-[#DEE1E6] bg-[#FAFAFA]">
                <th className="text-left rounded-tl-2xl px-8 py-3 text-base font-medium text-[#686262]">
                  Claim ID
                </th>
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">
                  Vehicle
                </th>
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">
                  Vin ID
                </th>
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">
                  Status
                </th>
                <th className="text-left px-8 py-3 text-base font-medium text-[#686262]">
                  Claim Date
                </th>
                <th className="text-left rounded-tr-2xl px-8 py-3 text-base font-medium text-[#686262]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.id}
                  className="border-b-2 border-[#DEE1E6] bg-white hover:bg-gray-50"
                >
                  <td className="px-8 py-3 text-[13px] font-medium text-black">
                    {r.id}
                  </td>
                  <td className="px-8 py-3 text-[13px] font-medium text-black">
                    {r.vehicle}
                  </td>
                  <td className="px-8 py-3 text-[13px] font-medium text-black">
                    {r.vin}
                  </td>
                  <td className="px-8 py-3 text-[13px] font-medium text-black">
                    <div className="flex items-center">
                      <StatusDot status={r.status} />
                      <span>{r.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-3 text-[13px] font-medium text-black">
                    {r.claimDate}
                  </td>
                  <td className="px-8 py-3 text-[13px] font-medium text-black relative">
                    <div className="relative inline-block">
                      <button
                        onClick={() => {
                          setOpenActionFor(
                            openActionFor === r.id ? null : r.id
                          );
                        }}
                        className="rounded-full hover:bg-gray-100 cursor-pointer"
                      >
                        <DotsThreeIcon size={20} weight="bold" />
                      </button>

                      {openActionFor === r.id && (
                        <div
                          ref={menuRef}
                          className="absolute -right-10 top-7 w-32 bg-white border border-[#DEE1E6] rounded-lg shadow-lg z-50 pointer-events-auto"
                        >
                          <button
                            onClick={() => {
                              setOpenActionFor(null);
                              navigate(`${r.id}`);
                            }}
                            className="w-full text-left rounded-tl-lg rounded-tr-lg transition-all px-3 py-2 hover:bg-gray-50 cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setOpenActionFor(null);
                              setDeletingRow(r);
                            }}
                            className="w-full text-left rounded-bl-lg rounded-br-lg transition-all px-3 py-2 text-red-600 hover:bg-gray-50 cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
          <div>Showing 1 to 10 of {total} results</div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-3 py-1 cursor-pointer rounded-md hover:text-indigo-600 disabled:opacity-40"
            >
              <CaretLeftIcon size={12} /> Previous
            </button>

            <div className="flex items-center gap-2">
              {pages.map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-8 h-8 rounded-full text-[12px] font-medium flex items-center justify-center cursor-pointer ${
                    currentPage === p
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-[#727674] hover:text-black"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-3 py-1 cursor-pointer rounded-md hover:text-indigo-600 disabled:opacity-40"
            >
              Next <CaretRightIcon size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Delete modal rendered here so it's inside component tree */}
      <DeleteModal
        row={deletingRow}
        onCancel={() => setDeletingRow(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}