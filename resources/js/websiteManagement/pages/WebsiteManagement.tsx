import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Website, WebsiteTable } from "../components/WebsiteTable";
import { WebsiteForm } from "../components/WebsiteForm";
import { Modal } from "@/shared/components/Modal";
import Snackbar from "@/shared/components/Snackbar";
import { useWebsites } from "@/shared/contexts/WebsiteContext";

export const WebsiteManagement: React.FC = () => {
  const { websites, addWebsite, updateWebsite, deleteWebsite } = useWebsites();
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentWebsite, setCurrentWebsite] = useState<Website>({
    id: "",
    user_id: 0,
    name: "",
    domain: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenAdd = () => {
    setCurrentWebsite({ id: "", user_id: 0, name: "", domain: "" });
    setEditMode(false);
    setOpenDialog(true);
  };

  const handleOpenEdit = (website: Website) => {
    setCurrentWebsite(website);
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDelete = async (id: string) => {
    await deleteWebsite(id);
    showSnackbar("Website removido com sucesso!", "success");
  };

  const handleSubmit = async () => {
    if (editMode) {
      await updateWebsite(currentWebsite);
      showSnackbar("Website atualizado com sucesso!", "success");
    } else {
      await addWebsite({
        name: currentWebsite.name,
        domain: currentWebsite.domain,
      });
      showSnackbar("Website adicionado com sucesso!", "success");
    }
    setOpenDialog(false);
  };

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbar({ open: true, message, severity });
    setTimeout(() => setSnackbar({ ...snackbar, open: false }), 3000);
  };

  const filteredWebsites = websites.filter(
    (website) =>
      website.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      website.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 bg-[#16161a] text-[#fffffe] h-[calc(100vh-61px)]">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h2 className="text-2xl font-bold mb-4 md:mb-0">Gerenciar Websites</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Pesquisar websites"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-[#24242a] bg-[#24242a] text-[#fffffe] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#7f5af0] placeholder-[#94a1b2]"
          />
          <button
            onClick={handleOpenAdd}
            className="bg-[#7f5af0] text-[#fffffe] px-4 py-2 rounded hover:bg-[#5f3dc4] flex items-center gap-2"
          >
            <Icon icon="mdi:plus" className="w-5 h-5" />
            Adicionar Website
          </button>
        </div>
      </div>
      <WebsiteTable
        websites={filteredWebsites}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />
      {openDialog && (
        <Modal
          title={editMode ? "Editar Website" : "Novo Website"}
          onClose={handleCloseDialog}
        >
          <WebsiteForm website={currentWebsite} onChange={setCurrentWebsite} />
          <div className="flex justify-end mt-6 space-x-4">
            <button
              onClick={handleCloseDialog}
              className="px-4 py-2 border border-[#24242a] text-[#fffffe] rounded hover:bg-[#24242a]"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={!currentWebsite.name || !currentWebsite.domain}
              className="bg-[#7f5af0] text-[#fffffe] px-4 py-2 rounded hover:bg-[#5f3dc4] disabled:opacity-50"
            >
              {editMode ? "Salvar Alterações" : "Adicionar"}
            </button>
          </div>
        </Modal>
      )}
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </div>
  );
};

