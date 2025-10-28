import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../../assets/Login/Logo.png'
import car from '../../../assets/Login/car.png'
import Notification from "../../../components/ErrorNotification";
import Loader from '../../../components/Loader';
import { useAuth } from '../../../app/AuthProvider';

export default function Login() {
  const { login, loading } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const credentials = { username, password };

    try {
      const data = await login(credentials);
      const role = String(data.role);
      let validRole = true;
      
      switch (role) {
        case "SCTech":
        case "1":
          navigate("/sc-technician/dashboard");
          break;
        case "SCStaff":
        case "0":
          navigate("/sc-staff/dashboard");
          break;
        case "EVM":
        case "2":
          navigate("/evm/dashboard");
          break;
        case "Admin":
        case "3":
          navigate("/admin/dashboard");
          break;
        default:
          validRole = false;
          console.error("Invalid role !!!");
          setNotification({
            message: "Login failed",
            subText: `Invalid user role: ${role}. Please contact administrator.`,
            actionText: "Retry",
            onAction: () => { setNotification(null) },
          });
      }

      if (validRole) {
        setNotification({
          message: "Login successful",
          subText: new Date().toLocaleString(),
          actionText: "Close",
          onAction: () => { setNotification(null) },
        });
      }
    } catch (err) {
      setNotification({
        message: "Login failed",
        subText: err.message || "Username or Password is incorrect",
        actionText: "Retry",
        onAction: () => { setNotification(null) },
      });
    }

    if (loading) {
      return (
        <div className="flex items-center justify-center h-screen bg-white">
          <Loader />
        </div>
      );
    }
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
              <Notification
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