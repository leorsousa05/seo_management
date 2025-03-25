import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useWebsites, Website } from "@/shared/contexts/WebsiteContext";
import { useAuth } from "@/shared/contexts/AuthContext";
import Snackbar from "@/shared/components/Snackbar";
import { Modal } from "@/shared/components/Modal";
import { BlogText, BlogCategory } from "../components/types";
import { useBlogTexts } from "@/shared/contexts/BlogTextContext";
import { BlogTextList } from "../components/BlogTextList";
import { BlogTextForm } from "../components/BlogTextForm";

type View = "select" | "blogs";

export const BlogTextsPage: React.FC = () => {
  const { websites } = useWebsites();
  const { token } = useAuth();
  const { blogTexts, fetchBlogTexts, addBlogText, deleteBlogText } = useBlogTexts();

  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);
  const [blogCategories, setBlogCategories] = useState<BlogCategory[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const [view, setView] = useState<View>("select");

  const fetchBlogCategories = async (siteId: string) => {
    try {
      const response = await axios.get("/api/v1/blog-categories", {
        params: { site_id: siteId },
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogCategories(response.data);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  const handleSiteSelect = (siteId: string) => {
    setSelectedSiteId(siteId);
    fetchBlogTexts(Number(siteId));
    fetchBlogCategories(siteId);
    setView("blogs");
    console.log(siteId);
  };

  const handleCreateBlogText = async (
    data: Omit<BlogText, "id" | "created_at" | "updated_at">
  ) => {
    if (!selectedSiteId) return;
    try {
      await addBlogText({ ...data, site_id: Number(selectedSiteId) });
      showSnackbar("Texto de blog criado com sucesso!", "success");
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao criar texto de blog:", error);
      showSnackbar("Erro ao criar texto de blog.", "error");
    }
  };

  const handleDeleteBlogText = async (id: number) => {
    try {
      await deleteBlogText(id);
      showSnackbar("Texto de blog removido com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao remover texto de blog:", error);
      showSnackbar("Erro ao remover texto de blog.", "error");
    }
  };

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbar({ open: true, message, severity });
    setTimeout(() => {
      setSnackbar((prev) => ({ ...prev, open: false }));
    }, 3000);
  };

  const containerVariants = {
    initial: (direction: number) => ({ x: direction * 300, opacity: 0 }),
    animate: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction * -300, opacity: 0 }),
  };

  const handleBack = () => {
    setView("select");
    setSelectedSiteId(null);
  };

  const selectedSite: Website | undefined = websites.find(
    (site) => site.id === selectedSiteId
  );

  return (
    <div className="p-4 bg-[#16161a] text-[#fffffe] h-[calc(100vh-61px)] relative overflow-hidden">
      <AnimatePresence custom={view === "select" ? 1 : -1}>
        {view === "select" && (
          <motion.div
            key="select"
            custom={1}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="absolute inset-0 p-4"
          >
            <h3 className="text-xl mb-4">Selecione o site com o blog</h3>
            <table className="min-w-full divide-y divide-[#24242a]">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left">Nome do Website</th>
                  <th className="px-6 py-3 text-left">Domínio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#24242a]">
                {websites.map((site) => (
                  <tr
                    key={site.id}
                    onClick={() => handleSiteSelect(site.id)}
                    className="cursor-pointer hover:bg-[#7f5af0]/20 transition-colors"
                  >
                    <td className="px-6 py-4">{site.name}</td>
                    <td className="px-6 py-4">{site.domain}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {view === "blogs" && (
          <motion.div
            key="blogs"
            custom={-1}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="absolute inset-0 p-4"
          >
            <div className="mb-4 flex items-center justify-between">
              <button
                onClick={handleBack}
                className="bg-[#24242a] text-white px-4 py-2 rounded hover:bg-[#7f5af0] transition-colors"
              >
                Voltar
              </button>
              {selectedSite && (
                <div className="flex items-center">
                  <span className="ml-2 font-medium">{selectedSite.name}</span>
                </div>
              )}
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-[#7f5af0] text-white px-4 py-2 rounded hover:bg-[#5f3dc4] mb-6 transition-colors"
            >
              Criar Texto de Blog
            </button>
            <BlogTextList blogTexts={blogTexts} onDelete={handleDeleteBlogText} />
          </motion.div>
        )}
      </AnimatePresence>

      {modalOpen && (
        <Modal title="Novo Texto de Blog" onClose={() => setModalOpen(false)}>
          <BlogTextForm
            websiteId={Number(selectedSiteId)}
            blogCategories={blogCategories}
            onSubmit={handleCreateBlogText}
            onCreateCategory={async (name: string, slug: string) => {
              const response = await axios.post(
                "/api/v1/blog-categories",
                {
                  site_id: selectedSiteId,
                  name,
                  slug,
                },
                { headers: { Authorization: `Bearer ${token}` } }
              );
              setBlogCategories((prev) => [...prev, response.data]);
              return response.data;
            }}
            onDeleteCategory={(id: number) =>
              setBlogCategories((prev) => prev.filter((cat) => cat.id !== id))
            }
          />
        </Modal>
      )}

      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
};

