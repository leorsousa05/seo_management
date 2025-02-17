// src/components/WebsiteTable.tsx
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

const WebsiteTable: React.FC<WebsiteTableProps> = ({ websites, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Nome</th>
            <th className="py-2 px-4 border-b">URL</th>
            <th className="py-2 px-4 border-b">Descrição</th>
            <th className="py-2 px-4 border-b text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {websites.map((website) => (
            <tr key={website.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{website.name}</td>
              <td className="py-2 px-4 border-b">
                <a
                  href={website.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {website.url}
                </a>
              </td>
              <td className="py-2 px-4 border-b">{website.description}</td>
              <td className="py-2 px-4 border-b text-center">
                <button onClick={() => onEdit(website)} className="text-yellow-600 hover:text-yellow-700 mr-2">
                  <Icon icon="mdi:pencil" className="w-5 h-5" />
                </button>
                <button onClick={() => onDelete(website.id)} className="text-red-600 hover:text-red-700">
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

export default WebsiteTable;

