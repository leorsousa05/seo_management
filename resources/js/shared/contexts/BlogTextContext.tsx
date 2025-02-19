import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useAuth } from "@/shared/contexts/AuthContext";
import { BlogText } from "../../blogs/components/types";

interface BlogTextContextData {
  blogTexts: BlogText[];
  fetchBlogTexts: (siteId: number) => Promise<void>;
  addBlogText: (data: Omit<BlogText, "id" | "created_at" | "updated_at">) => Promise<void>;
  updateBlogText: (blogText: BlogText) => Promise<void>;
  deleteBlogText: (id: number) => Promise<void>;
}

const BlogTextContext = createContext<BlogTextContextData>({
  blogTexts: [],
  fetchBlogTexts: async () => {},
  addBlogText: async () => {},
  updateBlogText: async () => {},
  deleteBlogText: async () => {},
});

export const BlogTextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  const [blogTexts, setBlogTexts] = useState<BlogText[]>([]);

  const fetchBlogTexts = async (siteId: number) => {
    try {
      const response = await axios.get("/api/v1/blog-texts", {
        params: { site_id: siteId },
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogTexts(response.data);
    } catch (error) {
      console.error("Erro ao buscar textos de blog:", error);
    }
  };

  const addBlogText = async (data: Omit<BlogText, "id" | "created_at" | "updated_at">) => {
    try {
      const response = await axios.post("/api/v1/blog-texts", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogTexts((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Erro ao criar texto de blog:", error);
    }
  };

  const updateBlogText = async (blogText: BlogText) => {
    try {
      const response = await axios.put(`/api/v1/blog-texts/${blogText.id}`, blogText, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogTexts((prev) =>
        prev.map((bt) => (bt.id === blogText.id ? response.data : bt))
      );
    } catch (error) {
      console.error("Erro ao atualizar texto de blog:", error);
    }
  };

  const deleteBlogText = async (id: number) => {
    try {
      await axios.delete(`/api/v1/blog-texts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogTexts((prev) => prev.filter((bt) => bt.id !== id));
    } catch (error) {
      console.error("Erro ao remover texto de blog:", error);
    }
  };

  return (
    <BlogTextContext.Provider
      value={{ blogTexts, fetchBlogTexts, addBlogText, updateBlogText, deleteBlogText }}
    >
      {children}
    </BlogTextContext.Provider>
  );
};

export const useBlogTexts = () => useContext(BlogTextContext);

