import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <ul>
        {/* Dashboard */}
        <li className="mb-2">
          <Link
            to="/"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 transition"
          >
            <Icon icon="mdi:view-dashboard" width="24" height="24" />
            <span>Dashboard</span>
          </Link>
        </li>

        {/* Criação de Blogs */}
        <li className="mb-2">
          <Link
            to="/blog-creation"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 transition"
          >
            <Icon icon="mdi:note-edit-outline" width="24" height="24" />
            <span>Criação de Blogs</span>
          </Link>
        </li>

        {/* Páginas de Conversão */}
        <li className="mb-2">
          <Link
            to="/conversion-pages"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 transition"
          >
            <Icon icon="mdi:web" width="24" height="24" />
            <span>Páginas de Conversão</span>
          </Link>
        </li>

        {/* Gerenciar Websites */}
        <li className="mb-2">
          <Link
            to="/website-management"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 transition"
          >
            <Icon icon="mdi:cog-outline" width="24" height="24" />
            <span>Gerenciar Websites</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

