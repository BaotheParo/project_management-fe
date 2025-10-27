import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import SCTechnicianLayout from "../layout/SCTechnicianLayout";
import Loader from "../components/Loader";
import NotFound from "../components/NotFound";
import RoleRoute from "./RoleRoute";
import SCStaffLayout from "../layout/SCStaffLayout";
import Unauthorized from "../components/Unauthorized";

// Lazy load pages
const LoginPage = lazy(() => import("../features/auth/pages/Login"));
const ForgotPasswordPage = lazy(() => import("../features/auth/pages/ForgotPassword"));

// Sc-Technician
const SCTechnicianDashboardPage = lazy(() => import("../features/dashboard/sc-technician/pages/Dashboard"));
const SCTechnicianTodoWorksPage = lazy(() => import("../features/dashboard/sc-technician/pages/TodoWorks"));
const SCTechnicianClaimRequestsPage = lazy(() => import("../features/dashboard/sc-technician/pages/ClaimRequests"));
const SCTechnicianProfilePage = lazy(() => import("../features/dashboard/sc-technician/pages/Profile"));

// Sc-Staff
const SCStaffDashboardPage = lazy(() => import("../features/dashboard/sc-staff/pages/Dashboard"));
const SCStaffRequestDetailPage = lazy(() => import("../features/dashboard/sc-staff/pages/WarrantyRequestDetail"))
const SCStaffAssignWorkerPage = lazy(() => import("../features/dashboard/sc-staff/pages/AssignWorker"));
const SCStaffReportPage = lazy(() => import("../features/dashboard/sc-staff/pages/WarrantyReport"));
const SCStaffPartRequestPage = lazy(() => import("../features/dashboard/sc-staff/pages/PartRequests"));
const SCStaffBillPage = lazy(() => import("../features/dashboard/sc-staff/pages/BillOfCharge"));
const SCStaffProfilePage = lazy(() => import("../features/dashboard/sc-staff/pages/Profile"));

const router = createBrowserRouter([
    {
        path: "/login",
        element: (
        <Suspense fallback={<Loader />}>
            <LoginPage />
        </Suspense>
        ),
    },
    {
        path: "/login/forgot-password",
        element: (
        <Suspense fallback={<Loader />}>
            <ForgotPasswordPage />
        </Suspense>
        ),
    },
    {
        path: "/unauthorized",
        element: <Unauthorized />
    },
    {
        path: "/sc-technician",
        element: (
            <ProtectedRoute>
                <RoleRoute allowedRoles={["SCTech", "1"]}>
                    <SCTechnicianLayout />
                </RoleRoute>
            </ProtectedRoute>
        ),
        children: [
            { index: true, path: "dashboard", element: <Suspense fallback={<Loader />}><SCTechnicianDashboardPage /></Suspense>},
            { path: "todos", element: <Suspense fallback={<Loader />}><SCTechnicianTodoWorksPage /></Suspense> },
            { path: "claims", element: <Suspense fallback={<Loader />}><SCTechnicianClaimRequestsPage /></Suspense> },
            { path: "profile", element: <Suspense fallback={<Loader />}><SCTechnicianProfilePage /></Suspense> },
        ],
    },
    {
        path: "/sc-staff",
        element: (
            <ProtectedRoute>
                <RoleRoute allowedRoles={["SCStaff"]}>
                    <SCStaffLayout />
                </RoleRoute>
            </ProtectedRoute>
        ),
        children: [
            { index: true, path: "dashboard", element: <Suspense fallback={<Loader />}><SCStaffDashboardPage /></Suspense> },
            { path: "assign-worker", element: <Suspense fallback={<Loader />}><SCStaffAssignWorkerPage /></Suspense> },
            { path: "part-request", element: <Suspense fallback={<Loader />}><SCStaffPartRequestPage /></Suspense> },
            { path: "report", element: <Suspense fallback={<Loader />}><SCStaffReportPage /></Suspense> },
            { path: "bill", element: <Suspense fallback={<Loader />}><SCStaffBillPage /></Suspense> },
            { path: "profile", element: <Suspense fallback={<Loader />}><SCStaffProfilePage /></Suspense> },
        ],
    },

    // Fallback route
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router; // 👈 THIS export is critical