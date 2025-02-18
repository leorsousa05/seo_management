import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-[#16161a] text-[#fffffe] p-4 border-r border-[#24242a]">
      <ul>
        <li className="mb-2">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-[#24242a] transition"
          >
            <Icon icon="mdi:view-dashboard" width="24" height="24" />
            <span>Dashboard</span>
          </Link>
        </li>

        <li className="mb-2">
          <Link
            to="/blog-creation"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-[#24242a] transition"
          >
            <Icon icon="mdi:note-edit" width="24" height="24" />
            <span>Criação de Blogs</span>
          </Link>
        </li>

        <li className="mb-2">
          <Link
            to="/users"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-[#24242a] transition"
          >
            <Icon icon="mdi:users" width="24" height="24" />
            <span>Usuários</span>
          </Link>
        </li>

        <li className="mb-2">
          <Link
            to="/conversion-pages"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-[#24242a] transition"
          >
            <Icon icon="mdi:web" width="24" height="24" />
            <span>Páginas de Conversão</span>
          </Link>
        </li>

        <li className="mb-2">
          <Link
            to="/website-management"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-[#24242a] transition"
          >
            <Icon icon="mdi:cog-outline" width="24" height="24" />
            <span>Gerenciar Websites</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

