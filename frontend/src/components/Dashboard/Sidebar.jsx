import {
  FaHome,
  FaBox,
  FaTags,
  FaTruck,
  FaUsers,
  FaShoppingCart,
  FaReceipt,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink } from "react-router";


const Sidebar = ({ onLogout }) => {

  const menuItems = [

    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard",
    },

    {
      name: "Products",
      icon: <FaBox />,
      path: "/products",
    },

    {
      name: "Categories",
      icon: <FaTags />,
      path: "/categories",
    },

    {
      name: "Suppliers",
      icon: <FaTruck />,
      path: "/suppliers",
    },

    {
      name: "Customers",
      icon: <FaUsers />,
      path: "/customers",
    },

    {
      name: "Purchases",
      icon: <FaShoppingCart />,
      path: "/purchases",
    },

    {
      name: "Sales",
      icon: <FaReceipt />,
      path: "/sales",
    },

    {
      name: "Inventory",
      icon: <FaBox />,
      path: "/inventory",
    },

    // ============================================
    // REPORTS
    // ============================================

    {
      name: "Reports",
      icon: <FaReceipt />,
      path: "/reports",
    },

  ];


  return (

    <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col">

      {/* BRAND */}

      <div className="p-6 text-xl font-bold border-b border-gray-800">

        Business ERP

      </div>


      {/* NAVIGATION */}

      <nav className="flex-1 p-4 space-y-2">

        {menuItems.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive
                ? "bg-blue-600"
                : "hover:bg-gray-800"
              }`
            }
          >

            {item.icon}

            {item.name}

          </NavLink>

        ))}

      </nav>


      {/* LOGOUT */}

      <button
        onClick={onLogout}
        className="
                    flex
                    items-center
                    gap-3
                    p-6
                    text-red-400
                    hover:text-red-500
                "
      >

        <FaSignOutAlt />

        Logout

      </button>

    </aside>

  );

};


export default Sidebar;