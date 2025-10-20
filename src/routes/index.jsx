import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import SCTechnicianLayout from "../layout/SCTechnicianLayout";
import Loader from "../components/Loader";
import NotFound from "../components/NotFound";
import RoleRoute from "./RoleRoute";

// Lazy load pages
const LoginPage = lazy(() => import("../features/auth/pages/Login"));
const ForgotPasswordPage = lazy(() => import("../features/auth/pages/ForgotPassword"));
const DashboardPage = lazy(() => import("../features/dashboard/sc-technician/pages/Dashboard"));
const TodoWorksPage = lazy(() => import("../features/dashboard/sc-technician/pages/TodoWorks"));
const ClaimRequestsPage = lazy(() => import("../features/dashboard/sc-technician/pages/ClaimRequests"));
const ProfilePage = lazy(() => import("../features/dashboard/sc-technician/pages/Profile"));


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
        path: "/forgot-password",
        element: (
        <Suspense fallback={<Loader />}>
            <ForgotPasswordPage />
        </Suspense>
        ),
    },
    {
        path: "/sc-technician",
        element: (
            <ProtectedRoute>
                <RoleRoute allowedRoles={["technician"]}>
                    <SCTechnicianLayout />
                </RoleRoute>
            </ProtectedRoute>
        ),
        children: [
            { index: true, path: "dashboard", element: <Suspense fallback={<Loader />}><DashboardPage /></Suspense>},
            { path: "todos", element: <Suspense fallback={<Loader />}><TodoWorksPage /></Suspense> },
            { path: "claims", element: <Suspense fallback={<Loader />}><ClaimRequestsPage /></Suspense> },
            { path: "profile", element: <Suspense fallback={<Loader />}><ProfilePage /></Suspense> },
        ],
    },

    // Fallback route
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router; // 👈 THIS export is critical