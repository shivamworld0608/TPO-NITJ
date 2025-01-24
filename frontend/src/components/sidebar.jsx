import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, LogOut } from "lucide-react";

const Sidebar = ({
  isSidebarExpanded,
  isMobile,
  menuItems,
  location,
  navigate,
  handleLogout,
  toggleSidebar,
}) => {
  const MenuItem = ({ item }) => (
    <button
      onClick={() => navigate(item.path)}
      className={`flex items-center ${
        !isMobile && !isSidebarExpanded ? "justify-center" : ""
      } w-full mt-1 px-4 py-2 rounded-lg transition-colors duration-200 ${
        location.pathname === item.path
          ? "bg-custom-blue text-white"
          : "text-gray-600 hover:bg-blue-50"
      }`}
    >
      <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
      {(isMobile || isSidebarExpanded) && <span className="ml-3">{item.label}</span>}
    </button>
  );

  return (
    <>
      <aside
        className={`fixed left-0 top-16 h-full bg-white border-r border-gray-200 overflow-y-auto transition-all duration-300 ${
          isSidebarExpanded ? "w-64" : "w-16"
        }`}
      >
        <nav className="p-4">
          {menuItems.map((item) => (
            <MenuItem key={item.path} item={item} />
          ))}
          <button
            onClick={handleLogout}
            className={`flex items-center w-full px-4 py-2 mt-4 text-red-500 hover:bg-red-50 rounded-lg ${
              !isSidebarExpanded ? "justify-center" : ""
            }`}
          >
            <LogOut className="w-5 h-5" />
            {isSidebarExpanded && <span className="ml-3">Logout</span>}
          </button>
        </nav>
      </aside>
      <button
        onClick={toggleSidebar}
        className={`fixed top-16 bg-white rounded-r p-2 shadow-md transition-all duration-300 hover:bg-gray-100 ${
          isSidebarExpanded ? "left-64" : "left-16"
        }`}
      >
        {isSidebarExpanded ? (
          <Menu/>
        ) : (
          <Menu/>
        )}
      </button>
    </>
  );
};

export default Sidebar;
