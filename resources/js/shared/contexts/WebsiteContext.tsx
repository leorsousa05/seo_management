import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/shared/contexts/AuthContext";

export interface Website {
  id: string;
  user_id: number;
  name: string;
  domain: string;
}

interface WebsiteContextData {
  websites: Website[];
  fetchWebsites: () => Promise<void>;
  addWebsite: (website: Omit<Website, "id" | "user_id">) => Promise<void>;
  updateWebsite: (website: Website) => Promise<void>;
  deleteWebsite: (id: string) => Promise<void>;
}

const WebsiteContext = createContext<WebsiteContextData>({
  websites: [],
  fetchWebsites: async () => {},
  addWebsite: async () => {},
  updateWebsite: async () => {},
  deleteWebsite: async () => {},
});

export const WebsiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, user } = useAuth();
  const [websites, setWebsites] = useState<Website[]>([]);

  const fetchWebsites = async () => {
    try {
      const response = await axios.get("/api/v1/sites", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWebsites(response.data);
    } catch (error) {
      console.error("Erro ao buscar sites:", error);
    }
  };

  const addWebsite = async (website: Omit<Website, "id" | "user_id">) => {
    try {
      if (!user) throw new Error("Usuário não autenticado.");
      const websiteData = { ...website, user_id: user.id };
      const response = await axios.post("/api/v1/sites", websiteData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWebsites((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Erro ao adicionar site:", error);
    }
  };

  const updateWebsite = async (website: Website) => {
    try {
      const response = await axios.put(`/api/v1/sites/${website.id}`, website, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWebsites((prev) =>
        prev.map((w) => (w.id === website.id ? response.data : w))
      );
    } catch (error) {
      console.error("Erro ao atualizar site:", error);
    }
  };

  const deleteWebsite = async (id: string) => {
    try {
      await axios.delete(`/api/v1/sites/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWebsites((prev) => prev.filter((w) => w.id !== id));
    } catch (error) {
      console.error("Erro ao remover site:", error);
    }
  };

  useEffect(() => {
    if (token) fetchWebsites();
  }, [token]);

  return (
    <WebsiteContext.Provider
      value={{ websites, fetchWebsites, addWebsite, updateWebsite, deleteWebsite }}
    >
      {children}
    </WebsiteContext.Provider>
  );
};

export const useWebsites = () => useContext(WebsiteContext);

