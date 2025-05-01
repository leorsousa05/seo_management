import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useWebsites, Website } from "@/shared/contexts/WebsiteContext";
import { useAuth } from "@/shared/contexts/AuthContext";
import Snackbar from "@/shared/components/Snackbar";
import { Modal } from "@/shared/components/Modal";
import { ConversionKeyword } from "../components/types";
import { ConversionKeywordList } from "../components/ConversionKeywordList";
import { ConversionKeywordForm } from "../components/ConversionKeywordForm";
import { useConversionKeywords } from "../contexts/ConversionKeywordContext";

type View = "select" | "keywords";

export const ConversionKeywordsPage: React.FC = () => {
    const { websites } = useWebsites();
    const { token } = useAuth();
    const {
        conversionKeywords,
        fetchConversionKeywords,
        addConversionKeyword,
        deleteConversionKeyword,
    } = useConversionKeywords();

    const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);

    const [modalOpen, setModalOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success" as "success" | "error",
    });
    const [view, setView] = useState<View>("select");

    const handleSiteSelect = (siteId: string) => {
        setSelectedSiteId(siteId);
        fetchConversionKeywords(Number(siteId));

        setView("keywords");
        console.log(siteId);
    };

    const handleCreateConversionKeyword = async (
        data: Omit<ConversionKeyword, "id" | "created_at" | "updated_at">,
    ) => {
        if (!selectedSiteId) return;
        try {
            await addConversionKeyword({
                ...data,
                site_id: Number(selectedSiteId),
            });
            showSnackbar(
                "Palavra-chave de conversão criada com sucesso!",
                "success",
            );
            setModalOpen(false);
        } catch (error) {
            console.error("Erro ao criar palavra-chave de conversão:", error);
            showSnackbar("Erro ao criar palavra-chave de conversão.", "error");
        }
    };

    const handleDeleteConversionKeyword = async (id: number) => {
        try {
            await deleteConversionKeyword(id);
            showSnackbar(
                "Palavra-chave de conversão removida com sucesso!",
                "success",
            );
        } catch (error) {
            console.error("Erro ao remover palavra-chave de conversão:", error);
            showSnackbar(
                "Erro ao remover palavra-chave de conversão.",
                "error",
            );
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
        (site) => site.id === selectedSiteId,
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
                        <h3 className="text-xl mb-4">
                            Selecione o site para palavras-chave de conversão
                        </h3>
                        <table className="min-w-full divide-y divide-[#24242a]">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left">
                                        Nome do Website
                                    </th>
                                    <th className="px-6 py-3 text-left">
                                        Domínio
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#24242a]">
                                {websites.map((site) => (
                                    <tr
                                        key={site.id}
                                        onClick={() =>
                                            handleSiteSelect(site.id)
                                        }
                                        className="cursor-pointer hover:bg-[#7f5af0]/20 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            {site.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {site.domain}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                )}

                {view === "keywords" && (
                    <motion.div
                        key="keywords"
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
                                    <span className="ml-2 font-medium">
                                        {selectedSite.name}
                                    </span>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => setModalOpen(true)}
                            className="bg-[#7f5af0] text-white px-4 py-2 rounded hover:bg-[#5f3dc4] mb-6 transition-colors"
                        >
                            Criar Palavra-chave de Conversão
                        </button>
                        <ConversionKeywordList
                            conversionKeywords={conversionKeywords}
                            onDelete={handleDeleteConversionKeyword}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {modalOpen && (
                <Modal
                    title="Nova Palavra-chave de Conversão"
                    onClose={() => setModalOpen(false)}
                >
                    <ConversionKeywordForm
                        websiteId={Number(selectedSiteId)}
                        onSubmit={handleCreateConversionKeyword}
                    />
                </Modal>
            )}

            <Snackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={() =>
                    setSnackbar((prev) => ({ ...prev, open: false }))
                }
            />
        </div>
    );
};
