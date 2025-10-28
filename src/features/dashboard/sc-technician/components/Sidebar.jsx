import React from 'react'
import { useNavigate } from 'react-router-dom'
import { HouseIcon, ListIcon, ClipboardTextIcon, UserIcon, MinusCircleIcon, CaretDownIcon } from '@phosphor-icons/react'
import logo from '../../../../assets/group4.png'
import { useAuthApi } from '../../../../api/useAuthApi'
import NavItem from '../../../../components/Sidebar/NavItem'
import { useAuth } from '../../../../app/AuthProvider'

export default function Sidebar() {
  const navigate = useNavigate()
  const { logout } = useAuthApi();

  const { user } = useAuth();
  const displayName = user?.username || user?.name || user?.fullName || "User";
  const displayUsername = user?.name;
  const displayCoverImage = user?.coverImage;

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true }) // redirect to login page
  }

  return (
    <aside className="fixed w-64 h-screen border-r-2 border-gray-200 bg-white flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-center py-6">
          <img src={logo} alt="logo" className="w-24 h-24 object-contain" />
        </div>

        <nav className="pl-6 flex flex-col gap-3">
          <div className="pt-13">
            <NavItem end={true} to="/sc-technician/dashboard" icon={HouseIcon} label="Dashboard" />
          </div>
          <div className="py-0">
            <NavItem to="/sc-technician/claims" icon={ClipboardTextIcon} label="Claim Requests" />
          </div>
          <div className="py-0">
            <NavItem to="/sc-technician/todos" icon={ListIcon} label="Todo Works" />
          </div>
        </nav>
      </div>

      <div className="px-6 py-6">
        <div className="py-0">
          <button
            onClick={() => {
              navigate('/sc-technician/profile');
            }}
            className='flex items-center gap-4 w-52 px-4 py-3 rounded-full justify-start cursor-pointer transition-colors hover:bg-[#F1F3F4] text-gray-600'
          >
            <img
              src={displayCoverImage}
              alt="Claim cover"
              className="w-[25px] h-[25px] object-cover rounded-full"
            />
            <span className="text-sm font-medium text-[#393C3B]">
              {displayUsername}
            </span>
          </button>
        </div>
        <div className="py-0">
          <NavItem to="#" icon={MinusCircleIcon} label="Logout" onClick={handleLogout} />
        </div>
      </div>
    </aside>
  )
}



