import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { ConversionKeyword } from "../components/types";
import { useAuth } from "@/shared/contexts/AuthContext";

interface ConversionKeywordContextProps {
    conversionKeywords: ConversionKeyword[];
    fetchConversionKeywords: (siteId: number) => void;
    addConversionKeyword: (
        keyword: Omit<ConversionKeyword, "id" | "created_at" | "updated_at">,
    ) => Promise<void>;
    deleteConversionKeyword: (id: number) => Promise<void>;
}

const ConversionKeywordContext = createContext<
    ConversionKeywordContextProps | undefined
>(undefined);

export const useConversionKeywords = () => {
    const context = useContext(ConversionKeywordContext);
    if (!context) {
        throw new Error(
            "useConversionKeywords must be used within a ConversionKeywordProvider",
        );
    }
    return context;
};

export const ConversionKeywordProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const { token } = useAuth();
    const [conversionKeywords, setConversionKeywords] = useState<
        ConversionKeyword[]
    >([]);

    const fetchConversionKeywords = async (siteId: number) => {
        try {
            const response = await axios.get("/api/v1/keywords", {
                // Ajuste o endpoint
                params: { site_id: siteId },
                headers: { Authorization: `Bearer ${token}` },
            });
            setConversionKeywords(response.data);
        } catch (error) {
            console.error("Erro ao buscar palavras-chave de conversão:", error);
        }
    };

    const addConversionKeyword = async (
        keyword: Omit<ConversionKeyword, "id" | "created_at" | "updated_at">,
    ) => {
        try {
            const response = await axios.post(
                "/api/v1/keywords", // Ajuste o endpoint
                keyword,
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            setConversionKeywords((prev) => [...prev, response.data]);
        } catch (error) {
            console.error(
                "Erro ao adicionar palavra-chave de conversão:",
                error,
            );
        }
    };

    const deleteConversionKeyword = async (id: number) => {
        try {
            await axios.delete(`/api/v1/keywords/${id}`, {
                // Ajuste o endpoint
                headers: { Authorization: `Bearer ${token}` },
            });
            setConversionKeywords((prev) =>
                prev.filter((keyword) => keyword.id !== id),
            );
        } catch (error) {
            console.error("Erro ao deletar palavra-chave de conversão:", error);
        }
    };

    return (
        <ConversionKeywordContext.Provider
            value={{
                conversionKeywords,
                fetchConversionKeywords,
                addConversionKeyword,
                deleteConversionKeyword,
            }}
        >
            {children}
        </ConversionKeywordContext.Provider>
    );
};
