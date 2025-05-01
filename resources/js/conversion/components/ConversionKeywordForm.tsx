import React, { useState } from "react";
import { ConversionKeyword } from "./types";

interface ConversionKeywordFormProps {
    websiteId: number;
    onSubmit: (
        data: Omit<ConversionKeyword, "id" | "created_at" | "updated_at">,
    ) => Promise<void>;
}

export const ConversionKeywordForm: React.FC<ConversionKeywordFormProps> = ({
    websiteId,
    onSubmit,
}) => {
    const [keyword, setKeyword] = useState<string>("");

    const handleCreateConversionKeyword = async () => {
        try {
            await onSubmit({
                title: keyword,
                site_id: websiteId,
            });
            setKeyword("");
        } catch (error) {
            console.error("Failed to create conversion keyword:", error);
        }
    };

    return (
        <div className="p-4">
            <div className="flex flex-col gap-4">
                <div>
                    <label
                        htmlFor="keyword"
                        className="block text-sm font-medium text-white"
                    >
                        Palavra-chave
                    </label>
                    <input
                        id="keyword"
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded p-2 text-black"
                        required
                    />
                </div>

                <button
                    type="button"
                    onClick={handleCreateConversionKeyword}
                    className="bg-[#7f5af0] text-white px-4 py-2 rounded hover:bg-[#5f3dc4] w-full"
                >
                    Criar Palavra-chave
                </button>
            </div>
        </div>
    );
};
