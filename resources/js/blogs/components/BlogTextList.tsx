import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { BlogText } from "../components/types";

interface BlogTextListProps {
  blogTexts: BlogText[];
  onDelete: (id: number) => Promise<void>;
}

export const BlogTextList: React.FC<BlogTextListProps> = ({ blogTexts, onDelete }) => {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleRow = (id: number) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter((rowId) => rowId !== id));
    } else {
      setExpandedRows([...expandedRows, id]);
    }
  };

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full table-fixed bg-[#24242a] border border-[#24242a]">
        <thead className="bg-[#16161a] text-white">
          <tr>
            <th className="w-1/4 py-2 px-4 border-b border-[#24242a] text-left">Título</th>
            <th className="w-1/4 py-2 px-4 border-b border-[#24242a] text-left">Slug</th>
            <th className="w-1/4 py-2 px-4 border-b border-[#24242a] text-left">Conteúdo</th>
            <th className="w-1/4 py-2 px-4 border-b border-[#24242a] text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {blogTexts.map((text) => (
            <React.Fragment key={text.id}>
              <tr className="hover:bg-[#16161a]">
                <td className="py-2 px-4 border-b border-[#24242a] text-left text-white">
                  {text.title}
                </td>
                <td className="py-2 px-4 border-b border-[#24242a] text-left text-white">
                  {text.slug}
                </td>
                <td className="py-2 px-4 border-b border-[#24242a] text-left text-white">
                  {text.content && text.content.length > 50
                    ? `${text.content.substring(0, 50)}...`
                    : text.content}
                </td>
                <td className="py-2 px-4 border-b border-[#24242a] text-center">
                  <button
                    onClick={() => toggleRow(text.id)}
                    className="text-[#7f5af0] hover:text-white mr-2"
                  >
                    <Icon
                      icon={
                        expandedRows.includes(text.id)
                          ? "mdi:chevron-up"
                          : "mdi:chevron-down"
                      }
                      className="w-5 h-5"
                    />
                  </button>
                  <button
                    onClick={() => onDelete(text.id)}
                    className="text-[#7f5af0] hover:text-white"
                  >
                    <Icon icon="mdi:delete" className="w-5 h-5" />
                  </button>
                </td>
              </tr>
              {expandedRows.includes(text.id) && text.content && (
                <tr className="bg-[#1f1f27]">
                  <td colSpan={4} className="py-2 px-4 text-white">
                    {text.content}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
          {blogTexts.length === 0 && (
            <tr>
              <td colSpan={4} className="py-4 text-center text-white">
                Nenhum texto encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

