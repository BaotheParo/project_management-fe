import React from "react";
import { NavLink } from "react-router-dom";
import {
  HouseIcon,
  CurrencyDollarIcon,
  CalendarCheckIcon,
  FileIcon,
  UserIcon,
  MinusCircleIcon,
} from "@phosphor-icons/react";
import logo from "../../../../assets/group4.png";

const NavItem = ({ to, icon: Icon, label, end }) => {
  return (
    <NavLink
      end={end}
      to={to}
      className={({ isActive }) => {
        // Special case: Dashboard should be active when on claim pages
        const currentPath = window.location.pathname;
        const shouldBeActive =
          isActive ||
          (to === "/evm-staff/dashboard" &&
            currentPath.startsWith("/evm-staff/claim"));

        return `flex items-center gap-3 w-52 px-4 py-3 rounded-full justify-start cursor-pointer transition-colors ${
          shouldBeActive
            ? "bg-indigo-600 text-white"
            : "hover:bg-[#F1F3F4] text-gray-600"
        }`;
      }}
    >
      {({ isActive }) => {
        // Special case: Dashboard should be active when on claim pages
        const currentPath = window.location.pathname;
        const shouldBeActive =
          isActive ||
          (to === "/evm-staff/dashboard" &&
            currentPath.startsWith("/evm-staff/claim"));

        return (
          <>
            <div
              className={`flex items-center justify-center w-8 h-8 ${
                shouldBeActive ? "text-white" : "text-gray-500"
              }`}
            >
              <Icon size={18} weight="bold" />
            </div>
            <div className="text-sm font-medium">{label}</div>
          </>
        );
      }}
    </NavLink>
  );
};

export default function EVMSidebar() {
  return (
    <aside className="fixed top-0 left-0 w-64 h-screen border-r-2 border-gray-200 bg-white flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-center py-6">
          <img src={logo} alt="logo" className="w-24 h-24 object-contain" />
        </div>

        <nav className="pl-6 flex flex-col gap-3">
          <div className="py-2">
            <NavItem
              end={true}
              to="/evm-staff/dashboard"
              icon={HouseIcon}
              label="Dashboard"
            />
          </div>
          <div className="py-2">
            <NavItem
              to="/evm-staff/payment"
              icon={CurrencyDollarIcon}
              label="Payment"
            />
          </div>
          <div className="py-2">
            <NavItem
              to="/evm-staff/campaign"
              icon={CalendarCheckIcon}
              label="Campaign"
            />
          </div>
          <div className="py-2">
            <NavItem to="/evm-staff/policy" icon={FileIcon} label="Policy" />
          </div>
          <div className="py-2">
            <NavItem to="/evm-staff/profile" icon={UserIcon} label="Profile" />
          </div>
        </nav>
      </div>

      <div className="px-6 py-6">
        <div className="py-0">
          <NavItem to="/login" icon={MinusCircleIcon} label="Logout" />
        </div>
      </div>
    </aside>
  );
}
