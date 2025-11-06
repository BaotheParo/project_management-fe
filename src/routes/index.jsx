import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import SCTechnicianLayout from "../layout/SCTechnicianLayout";
import Loader from "../components/Loader";
import NotFound from "../components/NotFound";
import RoleRoute from "./RoleRoute";
import SCStaffLayout from "../layout/SCStaffLayout";
import Unauthorized from "../components/Unauthorized";
import EVMStaffLayout from "../layout/EVMStaffLayout";

// Lazy load pages
const LoginPage = lazy(() => import("../features/auth/pages/Login"));
const ForgotPasswordPage = lazy(() =>
  import("../features/auth/pages/ForgotPassword")
);

// Sc-Technician
const SCTechnicianDashboardPage = lazy(() =>
  import("../features/dashboard/sc-technician/pages/DashboardPage")
);
const SCTechnicianClaimRequestsPage = lazy(() =>
  import("../features/dashboard/sc-technician/pages/ClaimRequestsPage")
);
const SCTechnicianEditClaimRequestsPage = lazy(() =>
  import("../features/dashboard/sc-technician/pages/EditClaimRequestPage")
);
const SCTechnicianCreateClaimRequestsPage = lazy(() =>
  import("../features/dashboard/sc-technician/pages/CreateClaimRequestPage")
);
// Campaigns for SC-Technician
const SCTechnicianCampaignsPage = lazy(() =>
  import("../features/dashboard/sc-technician/pages/CampaignsPage")
);
const SCTechnicianCampaignDetailPage = lazy(() =>
  import("../features/dashboard/sc-technician/pages/CampaignDetailPage")
);
const SCTechnicianTodoWorksPage = lazy(() =>
  import("../features/dashboard/sc-technician/pages/WorksPage")
);
const SCTechnicianTodoWorksDetailPage = lazy(() =>
  import("../features/dashboard/sc-technician/pages/WorkDetails")
);
const SCTechnicianProfilePage = lazy(() =>
  import("../features/dashboard/sc-technician/pages/ProfilePage")
);

// Sc-Staff
const SCStaffDashboardPage = lazy(() =>
  import("../features/dashboard/sc-staff/pages/Dashboard")
);
const SCStaffRequestDetailPage = lazy(() =>
  import("../features/dashboard/sc-staff/pages/WarrantyRequestDetail")
);
const SCStaffAssignWorkerPage = lazy(() =>
  import("../features/dashboard/sc-staff/pages/AssignWorker")
);
const SCStaffReportPage = lazy(() =>
  import("../features/dashboard/sc-staff/pages/WarrantyReport")
);
const SCStaffPartRequestPage = lazy(() =>
  import("../features/dashboard/sc-staff/pages/PartRequests")
);
const SCStaffBillPage = lazy(() =>
  import("../features/dashboard/sc-staff/pages/BillOfCharge")
);
const SCStaffProfilePage = lazy(() =>
  import("../features/dashboard/sc-staff/pages/Profile")
);

// EVM-Staff
const EVMDashboardPage = lazy(() =>
  import("../features/dashboard/evm-staff/pages/dashboard/Dashboard")
);
const EVMDashboardClaimPage = lazy(() =>
  import("../features/dashboard/evm-staff/pages/dashboard/DashboardClaim")
);
const PartSupplyPage = lazy(() =>
  import("../features/dashboard/evm-staff/pages/dashboard/PartSupply")
);
const RejectClaimPage = lazy(() =>
  import("../features/dashboard/evm-staff/pages/dashboard/RejectClaim")
);
const EVMPaymentPage = lazy(() =>
  import("../features/dashboard/evm-staff/pages/payment/Payment")
);
const EVMViewAllInvoicePage = lazy(() =>
  import("../features/dashboard/evm-staff/pages/payment/ViewAllInvoice")
);
const EVMViewDetailInvoicePage = lazy(() =>
  import("../features/dashboard/evm-staff/pages/payment/ViewDetailInvoice")
);
const EVMConfirmPaymentPage = lazy(() =>
  import("../features/dashboard/evm-staff/pages/payment/ConfirmPayment")
);
const EVMCampaignPage = lazy(() =>
  import("../features/dashboard/evm-staff/pages/campaign/Campaign")
);
const EVMCreateCampaignPage = lazy(() =>
  import("../features/dashboard/evm-staff/pages/campaign/CreateCampaign")
);
const EVMPolicyPage = lazy(() =>
  import("../features/dashboard/evm-staff/pages/policy/Policy")
);
const EVMPolicyDetailsPage = lazy(() =>
  import("../features/dashboard/evm-staff/pages/policy/PolicyDetails")
);
const EVMEditPolicyPage = lazy(() =>
  import("../features/dashboard/evm-staff/pages/policy/EditPolicy")
);
const EVMCreatePolicyPage = lazy(() =>
  import("../features/dashboard/evm-staff/pages/policy/CreatePolicy")
);
const EVMProfilePage = lazy(() =>
  import("../features/dashboard/evm-staff/pages/Profile")
);

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
    element: <Unauthorized />,
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
      {
        index: true,
        path: "dashboard",
        element: (
          <Suspense fallback={<Loader />}>
            <SCTechnicianDashboardPage />
          </Suspense>
        ),
      },
      {
        path: "claims",
        element: (
          <Suspense fallback={<Loader />}>
            <SCTechnicianClaimRequestsPage />
          </Suspense>
        ),
      },
      {
        path: "campaigns",
        element: (
          <Suspense fallback={<Loader />}>
            <SCTechnicianCampaignsPage />
          </Suspense>
        ),
      },
      {
        path: "campaigns/view-detail/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <SCTechnicianCampaignDetailPage />
          </Suspense>
        ),
      },
      {
        path: "claims/create",
        element: (
          <Suspense fallback={<Loader />}>
            <SCTechnicianCreateClaimRequestsPage />
          </Suspense>
        ),
      },
      {
        path: "claims/edit/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <SCTechnicianEditClaimRequestsPage />
          </Suspense>
        ),
      },
      {
        path: "todos",
        element: (
          <Suspense fallback={<Loader />}>
            <SCTechnicianTodoWorksPage />
          </Suspense>
        ),
      },
      {
        path: "todos/view-detail/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <SCTechnicianTodoWorksDetailPage />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<Loader />}>
            <SCTechnicianProfilePage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/sc-staff",
    element: (
      <ProtectedRoute>
        <RoleRoute allowedRoles={["SCStaff", "0"]}>
          <SCStaffLayout />
        </RoleRoute>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        path: "dashboard",
        element: (
          <Suspense fallback={<Loader />}>
            <SCStaffDashboardPage />
          </Suspense>
        ),
      },
      {
        path: "assign-worker",
        element: (
          <Suspense fallback={<Loader />}>
            <SCStaffAssignWorkerPage />
          </Suspense>
        ),
      },
      {
        path: "part-request",
        element: (
          <Suspense fallback={<Loader />}>
            <SCStaffPartRequestPage />
          </Suspense>
        ),
      },
      {
        path: "report",
        element: (
          <Suspense fallback={<Loader />}>
            <SCStaffReportPage />
          </Suspense>
        ),
      },
      {
        path: "bill",
        element: (
          <Suspense fallback={<Loader />}>
            <SCStaffBillPage />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<Loader />}>
            <SCStaffProfilePage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/evm-staff",
    element: (
      <ProtectedRoute>
        <RoleRoute allowedRoles={["EVMStaff", "2"]}>
          <EVMStaffLayout />
        </RoleRoute>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<Loader />}>
            <EVMDashboardPage />
          </Suspense>
        ),
      },
      {
        path: "claim/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <EVMDashboardClaimPage />
          </Suspense>
        ),
      },
      {
        path: "claim/:id/part-supply",
        element: (
          <Suspense fallback={<Loader />}>
            <PartSupplyPage />
          </Suspense>
        ),
      },
      {
        path: "claim/:id/reject",
        element: (
          <Suspense fallback={<Loader />}>
            <RejectClaimPage />
          </Suspense>
        ),
      },
      {
        path: "payment",
        element: (
          <Suspense fallback={<Loader />}>
            <EVMPaymentPage />
          </Suspense>
        ),
      },
      {
        path: "payment/invoices",
        element: (
          <Suspense fallback={<Loader />}>
            <EVMViewAllInvoicePage />
          </Suspense>
        ),
      },
      {
        path: "payment/invoices/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <EVMViewDetailInvoicePage />
          </Suspense>
        ),
      },
      {
        path: "payment/confirm/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <EVMConfirmPaymentPage />
          </Suspense>
        ),
      },
      {
        path: "campaign",
        element: (
          <Suspense fallback={<Loader />}>
            <EVMCampaignPage />
          </Suspense>
        ),
      },
      {
        path: "campaign/create",
        element: (
          <Suspense fallback={<Loader />}>
            <EVMCreateCampaignPage />
          </Suspense>
        ),
      },
      {
        path: "policy",
        element: (
          <Suspense fallback={<Loader />}>
            <EVMPolicyPage />
          </Suspense>
        ),
      },
      {
        path: "policy/create",
        element: (
          <Suspense fallback={<Loader />}>
            <EVMCreatePolicyPage />
          </Suspense>
        ),
      },
      {
        path: "policy/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <EVMPolicyDetailsPage />
          </Suspense>
        ),
      },
      {
        path: "policy/:id/edit",
        element: (
          <Suspense fallback={<Loader />}>
            <EVMEditPolicyPage />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<Loader />}>
            <EVMProfilePage />
          </Suspense>
        ),
      },
    ],
  },

  // Default route
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <LoginPage />
      </Suspense>
    ),
  },

  // Fallback route
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router; // 👈 THIS export is critical
