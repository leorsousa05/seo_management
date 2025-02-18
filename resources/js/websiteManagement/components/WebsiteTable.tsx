import React from 'react';
import { Icon } from '@iconify/react';

export interface Website {
  id: string;
  name: string;
  url: string;
  description: string;
}

interface WebsiteTableProps {
  websites: Website[];
  onEdit: (website: Website) => void;
  onDelete: (id: string) => void;
}

export const WebsiteTable: React.FC<WebsiteTableProps> = ({ websites, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-[#24242a] border border-[#24242a]">
        <thead className="bg-[#16161a] text-[#fffffe]">
          <tr>
            <th className="py-2 px-4 border-b border-[#24242a]">Nome</th>
            <th className="py-2 px-4 border-b border-[#24242a]">URL</th>
            <th className="py-2 px-4 border-b border-[#24242a]">Descrição</th>
            <th className="py-2 px-4 border-b border-[#24242a] text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {websites.map((website) => (
            <tr key={website.id} className="hover:bg-[#16161a]">
              <td className="py-2 px-4 border-b border-[#24242a] text-[#fffffe]">{website.name}</td>
              <td className="py-2 px-4 border-b border-[#24242a]">
                <a
                  href={website.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7f5af0] hover:underline"
                >
                  {website.url}
                </a>
              </td>
              <td className="py-2 px-4 border-b border-[#24242a] text-[#94a1b2]">{website.description}</td>
              <td className="py-2 px-4 border-b border-[#24242a] text-center">
                <button onClick={() => onEdit(website)} className="text-[#7f5af0] hover:text-[#fffffe] mr-2">
                  <Icon icon="mdi:pencil" className="w-5 h-5" />
                </button>
                <button onClick={() => onDelete(website.id)} className="text-[#7f5af0] hover:text-[#fffffe]">
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

