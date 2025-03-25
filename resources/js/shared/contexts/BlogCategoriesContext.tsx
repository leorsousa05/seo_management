import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useAuth } from '@/shared/contexts/AuthContext';

export interface BlogCategory {
  id: number;
  site_id: number;
  name: string;
  slug: string;
}

interface BlogCategoriesContextData {
  categories: BlogCategory[];
  fetchCategories: () => Promise<void>;
  createCategory: (data: { name: string; slug: string }) => Promise<BlogCategory>;
  deleteCategory: (categoryId: number) => Promise<void>;
}

interface BlogCategoriesProviderProps {
  children: React.ReactNode;
  siteId: number;
}

const BlogCategoriesContext = createContext<BlogCategoriesContextData | undefined>(undefined);

export const BlogCategoriesProvider: React.FC<BlogCategoriesProviderProps> = ({ children, siteId }) => {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const { token } = useAuth();

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`/api/v1/blog-categories?site_id=${siteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  const createCategory = async (data: { name: string; slug: string }) => {
    try {
      const payload = { site_id: siteId, ...data };
      const response = await axios.post('/api/v1/blog-categories', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories((prev) => [...prev, response.data]);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      throw error;
    }
  };

  const deleteCategory = async (categoryId: number) => {
    try {
      await axios.delete(`/api/v1/blog-categories/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
    } catch (error) {
      console.error('Erro ao deletar categoria:', error);
      throw error;
    }
  };

  return (
    <BlogCategoriesContext.Provider
      value={{ categories, fetchCategories, createCategory, deleteCategory }}
    >
      {children}
    </BlogCategoriesContext.Provider>
  );
};

export const useBlogCategories = (): BlogCategoriesContextData => {
  const context = useContext(BlogCategoriesContext);
  if (!context) {
    throw new Error('useBlogCategories deve ser utilizado dentro de um BlogCategoriesProvider');
  }
  return context;
};

