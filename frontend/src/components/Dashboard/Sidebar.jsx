import {
  FaHome,
  FaProjectDiagram,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = ({ onLogout }) => {
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="text-2xl font-bold p-6 border-b border-gray-700">
        DevHub
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800">
          <FaHome />
          Dashboard
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800">
          <FaProjectDiagram />
          Projects
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800">
          <FaUser />
          Profile
        </button>
      </nav>

      <button
        onClick={onLogout}
        className="flex items-center gap-3 p-6 text-red-400 hover:text-red-500"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;