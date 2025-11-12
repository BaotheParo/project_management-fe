import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../../assets/Login/Logo.png'
import car from '../../../assets/Login/car.png'
import Loader from '../../../components/Loader';
import { useAuth } from '../../../app/AuthProvider';
import { ErrorNotification } from '../../../components/Notification';
import { ROLES } from '../../../constants/Roles';

export default function Login() {
  const { login, logout, loading } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setNotification(null);

    const credentials = { username, password };

    try {
      const userInfo = await login(credentials);
      
      console.log("🎯 [Login] Received user info:", userInfo);
      console.log("🎯 [Login] User roles:", userInfo?.roles);
      console.log("🎯 [Login] User roles type:", typeof userInfo?.roles);

      if (!userInfo || !userInfo.roles) {
        logout();
        setNotification({
          message: "Đăng nhập thất bại",
          subText: "Tài khoản không có quyền truy cập.",
          actionText: "Thử lại",
          onAction: () => { setNotification(null) },
        });
        return;
      }

      // Normalize roles to array of strings
      let userRoles = [];
      if (typeof userInfo.roles === 'string') {
        // Single role as string: "ROLE_OPERATOR"
        userRoles = [userInfo.roles];
      } else if (Array.isArray(userInfo.roles)) {
        // Array of roles: ["ROLE_OPERATOR", "ROLE_STAFF"] or [{name: "ROLE_OPERATOR"}]
        userRoles = userInfo.roles.map(r => {
          if (typeof r === 'string') return r;
          if (r.name) return r.name;
          if (r.authority) return r.authority;
          return null;
        }).filter(Boolean);
      }

      console.log("🎯 [Login] Normalized roles:", userRoles);

      if (userRoles.length === 0) {
        logout();
        setNotification({
          message: "Đăng nhập thất bại",
          subText: "Tài khoản không có quyền truy cập.",
          actionText: "Thử lại",
          onAction: () => { setNotification(null) },
        });
        return;
      }

      // Check if user has allowed role
      const allowedRoles = [ROLES.OPERATOR, ROLES.STAFF, ROLES.PASSENGER];
      const hasAllowedRole = userRoles.some(role => allowedRoles.includes(role));

      console.log("🎯 [Login] Has allowed role?", hasAllowedRole);

      if (!hasAllowedRole) {
        logout();
        setNotification({
          message: "Đăng nhập thất bại",
          subText: "Tài khoản không có quyền truy cập hệ thống này.",
          actionText: "Thử lại",
          onAction: () => { setNotification(null) },
        });
        return;
      }

      // Determine dashboard route based on first valid role
      let dashboardRoute = "/";
      if (userRoles.includes(ROLES.OPERATOR)) {
        dashboardRoute = "/admin/dashboard";
      } else if (userRoles.includes(ROLES.STAFF)) {
        dashboardRoute = "/sc-staff/dashboard";
      } else if (userRoles.includes(ROLES.PASSENGER)) {
        dashboardRoute = "/evm-staff/dashboard";
      }

      console.log("🎯 [Login] Navigating to:", dashboardRoute);

      setNotification({
        message: "Đăng nhập thành công!",
        subText: `Chào mừng ${userInfo.firstname || userInfo.username}`,
        actionText: "Đóng",
        onAction: () => { setNotification(null) },
      });

      // Navigate after a short delay to show notification
      setTimeout(() => {
        navigate(dashboardRoute, { replace: true });
      }, 500);

    } catch (error) {
      console.error("❌ Login error:", error);
      setNotification({
        message: "Đăng nhập thất bại",
        subText: error.message || "Username hoặc Password không đúng",
        actionText: "Thử lại",
        onAction: () => { setNotification(null) },
      });
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex overflow-hidden bg-white">
      {/* Left hero ~32.5% */}
      <div className="basis-[32.5%] min-w-[420px] relative bg-black flex items-start">
        <div className="absolute top-[39px] left-[50px] z-10 flex items-center gap-[17px]">
          <img src={logo} alt="ELV logo" />
        </div>
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${car})`, filter: "brightness(1)" }}
        />
      </div>

      {/* Right form ~57.5% */}
      <div className="basis-[67.5%] flex items-center justify-center border-l border-gray-100">
        <div className="w-[520px] max-w-[92%] text-center px-6">
          <h1 className="text-4xl font-extrabold mb-2 whitespace-nowrap">
            Welcome back to ELV
          </h1>
          <p className="text-lg text-gray-500 mb-8">
            Warranty management system
          </p>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-16 max-w-[520px] text-left"
          >
            <label className="block mb-4">
              <div className="text-xs text-gray-500 mb-2">Username</div>
              <input
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
            </label>

            <label className="block mb-4">
              <div className="text-xs text-gray-500 mb-2">Password</div>
              <input
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
              />
            </label>

            <Link
              className="text-md font-semibold text-indigo-600 mb-4 inline-block hover:underline"
              to="/login/forgot-password"
            >
              Forgot password ?
            </Link>

            <button
              className="w-full mt-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-sm cursor-pointer"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* ✅ Error notification */}
            {notification && (
              <ErrorNotification
                message={notification.message}
                subText={notification.subText}
                actionText={notification.actionText}
                onAction={notification.onAction}
                onClose={() => setNotification(null)}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
}