import React from "react";
import { Outlet } from "react-router-dom";
import EVMSidebar from "../features/dashboard/evm-staff/components/EVMSidebar";

export default function EVMStaffLayout() {
  return (
    <div className="min-h-screen">
      <EVMSidebar />
      <main className="p-14 flex-1 bg-white ml-[250px] overflow-y-auto min-h-screen">
        {/* Header inside content area*/}
        <Outlet />
      </main>
    </div>
  );
}
