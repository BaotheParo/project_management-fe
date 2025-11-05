import React from "react";
import { Outlet } from "react-router-dom";
import EVMSidebar from "../features/dashboard/evm-staff/components/EVMSidebar";

export default function EVMStaffLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <EVMSidebar />
      <main className="ml-64 p-6">
        {/* Header inside content area*/}

        <Outlet />
      </main>
    </div>
  );
}
