import React from "react";
import { Icon } from "@iconify/react";

export interface Website {
  id: string;
  user_id: number;
  name: string;
  domain: string;
}

interface WebsiteTableProps {
  onEdit: (website: Website) => void;
  websites: Website[];
  onDelete: (id: string) => void;
}

export const WebsiteTable: React.FC<WebsiteTableProps> = ({ onEdit, websites, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-fixed bg-[#24242a] border border-[#24242a]">
        <thead className="bg-[#16161a] text-[#fffffe]">
          <tr>
            <th className="w-1/3 py-2 px-4 border-b border-[#24242a] text-left">
              Nome
            </th>
            <th className="w-1/3 py-2 px-4 border-b border-[#24242a] text-left">
              Domain
            </th>
            <th className="w-1/3 py-2 px-4 border-b border-[#24242a] text-center">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {websites.map((website) => (
            <tr key={website.id} className="hover:bg-[#16161a]">
              <td className="py-2 px-4 border-b border-[#24242a] text-[#fffffe] text-left">
                {website.name}
              </td>
              <td className="py-2 px-4 border-b border-[#24242a] text-left">
                <a
                  href={website.domain}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7f5af0] hover:underline"
                >
                  {website.domain}
                </a>
              </td>
              <td className="py-2 px-4 border-b border-[#24242a] text-center">
                <button
                  onClick={() => onEdit(website)}
                  className="text-[#7f5af0] hover:text-[#fffffe] mr-2"
                >
                  <Icon icon="mdi:pencil" className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete(website.id)}
                  className="text-[#7f5af0] hover:text-[#fffffe]"
                >
                  <Icon icon="mdi:delete" className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

