import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { ConversionKeyword } from "./types";

interface ConversionKeywordListProps {
    conversionKeywords: ConversionKeyword[];
    onDelete: (id: number) => Promise<void>;
}

export const ConversionKeywordList: React.FC<ConversionKeywordListProps> = ({
    conversionKeywords,
    onDelete,
}) => {
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
                        <th className="w-1/4 py-2 px-4 border-b border-[#24242a] text-left">
                            Palavra-chave
                        </th>
                        <th className="w-1/4 py-2 px-4 border-b border-[#24242a] text-center">
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(conversionKeywords) ? (
                        conversionKeywords.map((keyword) => (
                            <React.Fragment key={keyword.id}>
                                <tr className="hover:bg-[#16161a]">
                                    <td className="py-2 px-4 border-b border-[#24242a] text-left text-white">
                                        {keyword.title}
                                    </td>
                                    <td className="py-2 px-4 border-b border-[#24242a] text-center">
                                        <button
                                            onClick={() =>
                                                toggleRow(keyword.id)
                                            }
                                            className="text-[#7f5af0] hover:text-white mr-2"
                                        >
                                            <Icon
                                                icon={
                                                    expandedRows.includes(
                                                        keyword.id,
                                                    )
                                                        ? "mdi:chevron-up"
                                                        : "mdi:chevron-down"
                                                }
                                                className="w-5 h-5"
                                            />
                                        </button>
                                        <button
                                            onClick={() => onDelete(keyword.id)}
                                            className="text-[#7f5af0] hover:text-white"
                                        >
                                            <Icon
                                                icon="mdi:delete"
                                                className="w-5 h-5"
                                            />
                                        </button>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={2}
                                className="py-4 text-center text-white"
                            >
                                Nenhuma palavra-chave encontrada.
                            </td>
                        </tr>
                    )}
                    {conversionKeywords.length === 0 && (
                        <tr>
                            <td
                                colSpan={2}
                                className="py-4 text-center text-white"
                            >
                                Nenhuma palavra-chave encontrada.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
