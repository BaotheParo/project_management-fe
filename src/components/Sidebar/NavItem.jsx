import { NavLink } from "react-router-dom";

const NavItem = ({ to, icon: Icon, label, end, onClick }) => {
    const commonClasses = ({ isActive }) =>
        `flex items-center gap-3 w-52 px-4 py-3 rounded-full justify-start cursor-pointer transition-colors ${isActive ? 'bg-indigo-600 text-white' : 'hover:bg-[#F1F3F4] text-gray-600'
        }`

    // Render a <button> if there's an onClick handler
    if (onClick) {
        return (
            <button
                onClick={onClick}
                className="flex items-center gap-3 w-52 px-4 py-3 rounded-full justify-start cursor-pointer transition-colors hover:bg-[#F1F3F4] text-gray-600"
            >
                <div className="flex items-center justify-center w-8 h-8 text-gray-500">
                    <Icon size={18} weight="bold" />
                </div>
                <div className="text-sm font-medium">{label}</div>
            </button>
        )
    }

    return (
        <NavLink end={end} to={to} className={commonClasses}>
            {({ isActive }) => (
                <>
                    <div className={`flex items-center justify-center w-8 h-8 ${isActive ? 'text-white' : 'text-gray-500'}`}>
                        <Icon size={18} weight="bold" />
                    </div>
                    <div className="text-sm font-medium">{label}</div>
                </>
            )}
        </NavLink>
    )
}

export default NavItem;