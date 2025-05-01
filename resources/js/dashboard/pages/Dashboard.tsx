import React, { useEffect, useState } from "react";
import { useBlogTexts } from "@/shared/contexts/BlogTextContext";
import { useConversionKeywords } from "@/conversion/contexts/ConversionKeywordContext";

interface DashboardProps {
    siteId: number; // site selecionado (você pode passar via prop ou usar um contexto)
}

export const Dashboard: React.FC<DashboardProps> = ({ siteId }) => {
    const { blogTexts, fetchBlogTexts } = useBlogTexts();
    const { conversionKeywords, fetchConversionKeywords } =
        useConversionKeywords();

    const [recentBlogPosts, setRecentBlogPosts] = useState<any[]>([]);
    const [recentKeywords, setRecentKeywords] = useState<any[]>([]);

    useEffect(() => {
        // Buscar dados do site selecionado
        fetchBlogTexts(siteId);
        fetchConversionKeywords(siteId);
    }, [siteId]);

    useEffect(() => {
        const sortedPosts = [...blogTexts].sort(
            (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime(),
        );
        setRecentBlogPosts(sortedPosts.slice(0, 3));
    }, [blogTexts]);

    useEffect(() => {
        const sortedKeywords = [...conversionKeywords].sort(
            (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime(),
        );
        setRecentKeywords(sortedKeywords.slice(0, 3));
    }, [conversionKeywords]);

    return (
        <div className="p-6 bg-[#16161a] h-[calc(100vh-61px)] text-[#fffffe]">
            <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#24242a] p-6 rounded-lg">
                    <h3 className="text-xl mb-4">Posts de Blog Recentes</h3>
                    {recentBlogPosts.length > 0 ? (
                        <ul className="space-y-2">
                            {recentBlogPosts.map((post) => (
                                <li
                                    key={post.id}
                                    className="border-b border-gray-700 pb-2"
                                >
                                    <p className="font-semibold">
                                        {post.title}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {new Date(
                                            post.created_at,
                                        ).toLocaleDateString()}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Nenhum post encontrado.</p>
                    )}
                    <button className="mt-4 bg-[#7f5af0] px-4 py-2 rounded">
                        Ver mais
                    </button>
                </div>

                <div className="bg-[#24242a] p-6 rounded-lg">
                    <h3 className="text-xl mb-4">Palavras-Chave Recentes</h3>
                    {recentKeywords.length > 0 ? (
                        <ul className="space-y-2">
                            {recentKeywords.map((keyword) => (
                                <li
                                    key={keyword.id}
                                    className="border-b border-gray-700 pb-2"
                                >
                                    <p className="font-semibold">
                                        {keyword.title}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {new Date(
                                            keyword.created_at,
                                        ).toLocaleDateString()}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Nenhuma palavra-chave encontrada.</p>
                    )}
                    <button className="mt-4 bg-[#7f5af0] px-4 py-2 rounded">
                        Ver mais
                    </button>
                </div>
            </div>
        </div>
    );
};
