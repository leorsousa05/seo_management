import React from 'react';
import { Icon } from '@iconify/react';
import { User } from './UserForm';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

export const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-[#24242a] border border-[#24242a] table-auto">
        <thead className="bg-[#16161a] text-[#fffffe]">
          <tr>
            <th className="py-2 px-4 border-b border-[#24242a] text-left">Nome</th>
            <th className="py-2 px-4 border-b border-[#24242a] text-left">Email</th>
            <th className="py-2 px-4 border-b border-[#24242a] text-left">Função</th>
            <th className="py-2 px-4 border-b border-[#24242a] text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-[#16161a]">
              <td className="py-2 px-4 border-b border-[#24242a] text-left text-[#fffffe]">{user.name}</td>
              <td className="py-2 px-4 border-b border-[#24242a] text-left text-[#94a1b2]">{user.email}</td>
              <td className="py-2 px-4 border-b border-[#24242a] text-left text-[#94a1b2]">
                {user.role === 'admin' ? 'Admin' : 'Client'}
              </td>
              <td className="py-2 px-4 border-b border-[#24242a] text-center">
                <button onClick={() => onEdit(user)} className="text-[#7f5af0] hover:text-[#fffffe] mr-2">
                  <Icon icon="mdi:pencil" className="w-5 h-5" />
                </button>
                <button onClick={() => onDelete(user.id)} className="text-[#7f5af0] hover:text-[#fffffe]">
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

