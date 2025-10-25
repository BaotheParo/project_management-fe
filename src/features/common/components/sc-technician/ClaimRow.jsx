import { useState, useRef, useEffect } from "react";
import { DotsThreeIcon } from "@phosphor-icons/react";
import StatusDot from "./StatusDot";

const ClaimRow = ({ row, onEdit, onDelete }) => {
  const [openActionFor, setOpenActionFor] = useState(false);
  const menuRef = useRef();

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenActionFor(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <tr className="border-b-2 border-[#DEE1E6] bg-white hover:bg-gray-50">
      <td className="px-8 py-3 text-[13px] font-medium text-black">{row.claimId}</td>
      <td className="px-8 py-3 text-[13px] font-medium text-black">{row.vehicle}</td>
      <td className="px-8 py-3 text-[13px] font-medium text-black">{row.vin}</td>
      <td className="px-8 py-3 text-[13px] font-medium text-black">
        <div className="flex items-center gap-2">
          <StatusDot status={row.status} />
          <span>{row.status}</span>
        </div>
      </td>
      <td className="px-8 py-3 text-[13px] font-medium text-black">{row.dueDate}</td>
      <td className="px-8 py-3 text-[13px] font-medium text-black relative">
        <div className="relative inline-block">
          <button onClick={() => setOpenActionFor(!openActionFor)} className="rounded-full hover:bg-gray-100 cursor-pointer">
            <DotsThreeIcon size={20} weight="bold" />
          </button>

          {openActionFor && (
            <div ref={menuRef} className="absolute -right-10 top-7 w-32 bg-white border border-[#DEE1E6] rounded-lg shadow-lg z-50">
              <button
                onClick={() => {
                  setOpenActionFor(false);
                  onEdit(row);
                }}
                className="w-full text-left px-3 py-2 hover:bg-gray-50"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setOpenActionFor(false);
                  onDelete(row);
                }}
                className="w-full text-left px-3 py-2 text-red-600 hover:bg-gray-50"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default ClaimRow;
