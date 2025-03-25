import React, { useState } from "react";
import {
    Editor,
    EditorState,
    RichUtils,
    DefaultDraftBlockRenderMap,
    AtomicBlockUtils,
    ContentBlock,
} from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import Immutable from "immutable";
import "draft-js/dist/Draft.css";
import { BlogText, BlogCategory } from "../components/types";
import { useBlogCategories } from "@/shared/contexts/BlogCategoriesContext";

const customBlockRenderMap = DefaultDraftBlockRenderMap.merge(
    Immutable.Map({
        "header-three": { element: "h3" },
        "header-four": { element: "h4" },
    }),
);

// Função de estilo para blocos específicos
const blockStyleFn = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();
    switch (type) {
        case "header-one":
            return "custom-header-one";
        case "header-two":
            return "custom-header-two";
        case "header-three":
            return "custom-header-three";
        case "header-four":
            return "custom-header-four";
        default:
            return "";
    }
};

// Componente para renderizar mídias (imagens)
const Media = (props: any) => {
    const entity = props.contentState.getEntity(props.block.getEntityAt(0));
    const type = entity.getType();

    if (type === "IMAGE") {
        return (
            <img
                src={entity.getData().src}
                alt="Inserted"
                style={{ maxWidth: "100%", margin: "10px 0" }}
            />
        );
    }

    // Caso existissem outros tipos de mídia, poderíamos tratar aqui
    return null;
};

// Define como o editor lida com blocos "atomic"
const blockRendererFn = (contentBlock: ContentBlock) => {
    if (contentBlock.getType() === "atomic") {
        return {
            component: Media,
            editable: false,
        };
    }
    return null;
};

interface BlogTextFormProps {
    websiteId: number;
    blogCategories: BlogCategory[];
    onSubmit: (
        data: Omit<BlogText, "id" | "created_at" | "updated_at">,
    ) => Promise<void>;
    onCreateCategory?: (name: string, slug: string) => Promise<BlogCategory>;
    onDeleteCategory?: (id: number) => void;
}

export const BlogTextForm: React.FC<BlogTextFormProps> = ({
    websiteId,
    blogCategories,
    onSubmit,
    onCreateCategory,
    onDeleteCategory,
}) => {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [blogCategoryId, setBlogCategoryId] = useState<number | null>(null);
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty(),
    );

    const [showNewCategory, setShowNewCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCategorySlug, setNewCategorySlug] = useState("");

    // Estados para inserção de imagem
    const [showImageInput, setShowImageInput] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const { deleteCategory } = useBlogCategories();

    const filteredCategories = blogCategories.filter(
        (cat) => cat.site_id === websiteId,
    );

    // Atualiza o estado do editor
    const handleEditorChange = (newEditorState: EditorState) => {
        setEditorState(newEditorState);
    };

    // Aplica estilos inline (negrito, itálico, sublinhado)
    const toggleInlineStyle = (style: string) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    };

    // Aplica estilos de bloco (H1, H2, H3, H4, listas)
    const toggleBlockType = (blockType: string) => {
        setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    };

    const currentStyle = editorState.getCurrentInlineStyle();
    const currentBlockType = RichUtils.getCurrentBlockType(editorState);

    // Mostra/esconde input para inserir imagem
    const handleInsertImage = () => {
        setShowImageInput(!showImageInput);
    };

    // Insere imagem no editor
    const handleConfirmInsertImage = () => {
        if (imageUrl.trim()) {
            const contentState = editorState.getCurrentContent();
            const contentStateWithEntity = contentState.createEntity(
                "IMAGE",
                "IMMUTABLE",
                { src: imageUrl },
            );
            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            const newEditorState = EditorState.set(editorState, {
                currentContent: contentStateWithEntity,
            });
            setEditorState(
                AtomicBlockUtils.insertAtomicBlock(
                    newEditorState,
                    entityKey,
                    " ",
                ),
            );
            setImageUrl("");
        }
        setShowImageInput(false);
    };

    // Salva o texto do blog
    const handleCreateBlogText = async () => {
        const contentState = editorState.getCurrentContent();
        const htmlContent = stateToHTML(contentState);

        await onSubmit({
            title,
            slug,
            content: htmlContent,
            site_id: websiteId,
            blog_category_id: blogCategoryId ?? null,
        });

        // Limpa formulário e editor
        setTitle("");
        setSlug("");
        setBlogCategoryId(null);
        setEditorState(EditorState.createEmpty());
    };

    // Cria nova categoria
    const handleCreateCategory = async () => {
        if (!onCreateCategory) {
            console.error("Função onCreateCategory não foi fornecida.");
            return;
        }
        try {
            const newCat = await onCreateCategory(
                newCategoryName,
                newCategorySlug,
            );
            setBlogCategoryId(newCat.id);
            setNewCategoryName("");
            setNewCategorySlug("");
            setShowNewCategory(false);
        } catch (error) {
            console.error("Erro ao criar nova categoria:", error);
        }
    };

    // Exclui categoria
    const handleDeleteCategory = async () => {
        if (blogCategoryId !== null) {
            await deleteCategory(blogCategoryId);
            if (onDeleteCategory) {
                onDeleteCategory(blogCategoryId);
            }
            setBlogCategoryId(null);
        }
    };

    // Barra de ferramentas do editor
    const toolbar = (
        <div className="flex flex-wrap gap-2 mb-2">
            <button
                type="button"
                onClick={() => toggleInlineStyle("BOLD")}
                className={`px-2 py-1 border rounded ${
                    currentStyle.has("BOLD")
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                }`}
            >
                <strong>B</strong>
            </button>
            <button
                type="button"
                onClick={() => toggleInlineStyle("ITALIC")}
                className={`px-2 py-1 border rounded ${
                    currentStyle.has("ITALIC")
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                }`}
            >
                <em>I</em>
            </button>
            <button
                type="button"
                onClick={() => toggleInlineStyle("UNDERLINE")}
                className={`px-2 py-1 border rounded ${
                    currentStyle.has("UNDERLINE")
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                }`}
            >
                <u>U</u>
            </button>
            <button
                type="button"
                onClick={() => toggleBlockType("header-one")}
                className={`px-2 py-1 border rounded ${
                    currentBlockType === "header-one"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                }`}
            >
                H1
            </button>
            <button
                type="button"
                onClick={() => toggleBlockType("header-two")}
                className={`px-2 py-1 border rounded ${
                    currentBlockType === "header-two"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                }`}
            >
                H2
            </button>
            <button
                type="button"
                onClick={() => toggleBlockType("header-three")}
                className={`px-2 py-1 border rounded ${
                    currentBlockType === "header-three"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                }`}
            >
                H3
            </button>
            <button
                type="button"
                onClick={() => toggleBlockType("header-four")}
                className={`px-2 py-1 border rounded ${
                    currentBlockType === "header-four"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                }`}
            >
                H4
            </button>
            <button
                type="button"
                onClick={() => toggleBlockType("unordered-list-item")}
                className={`px-2 py-1 border rounded ${
                    currentBlockType === "unordered-list-item"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                }`}
            >
                UL
            </button>
            <button
                type="button"
                onClick={() => toggleBlockType("ordered-list-item")}
                className={`px-2 py-1 border rounded ${
                    currentBlockType === "ordered-list-item"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                }`}
            >
                OL
            </button>
            <button
                type="button"
                onClick={handleInsertImage}
                className="px-2 py-1 border rounded bg-gray-200 text-black"
            >
                Imagem
            </button>
        </div>
    );

    return (
        <div className="p-4">
            <div className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-medium text-white">
                        Título
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded p-2 text-black"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-white">
                        Slug
                    </label>
                    <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded p-2 text-black"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-white">
                        Categoria
                    </label>
                    <select
                        value={blogCategoryId || ""}
                        onChange={(e) =>
                            setBlogCategoryId(
                                e.target.value ? Number(e.target.value) : null,
                            )
                        }
                        className="mt-1 block w-full border border-gray-300 rounded p-2 text-black"
                    >
                        <option value="">Selecione uma categoria</option>
                        {filteredCategories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    <div className="flex items-center gap-4 mt-2">
                        <button
                            type="button"
                            onClick={() => setShowNewCategory((prev) => !prev)}
                            className="text-blue-500 underline"
                        >
                            {showNewCategory
                                ? "Cancelar"
                                : "Criar nova categoria"}
                        </button>
                        {blogCategoryId !== null && (
                            <button
                                type="button"
                                onClick={handleDeleteCategory}
                                className="text-red-500 underline"
                            >
                                Remover Categoria
                            </button>
                        )}
                    </div>

                    {showNewCategory && (
                        <div className="mt-2 flex flex-col gap-2 border border-gray-300 rounded p-2">
                            <input
                                type="text"
                                value={newCategoryName}
                                onChange={(e) =>
                                    setNewCategoryName(e.target.value)
                                }
                                placeholder="Nome da categoria"
                                className="block w-full border border-gray-300 rounded p-2 text-black"
                            />
                            <input
                                type="text"
                                value={newCategorySlug}
                                onChange={(e) =>
                                    setNewCategorySlug(e.target.value)
                                }
                                placeholder="Slug da categoria"
                                className="block w-full border border-gray-300 rounded p-2 text-black"
                            />
                            <button
                                type="button"
                                onClick={handleCreateCategory}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Salvar Categoria
                            </button>
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-white mb-2">
                        Conteúdo
                    </label>
                    <div className="border border-gray-300 rounded p-2 text-black bg-white min-h-[300px] max-h-[600px] overflow-auto">
                        {toolbar}
                        {showImageInput && (
                            <div className="flex items-center gap-2 mb-2">
                                <input
                                    type="text"
                                    placeholder="URL da imagem"
                                    value={imageUrl}
                                    onChange={(e) =>
                                        setImageUrl(e.target.value)
                                    }
                                    className="p-1 border border-gray-300 rounded text-black w-full"
                                />
                                <button
                                    type="button"
                                    onClick={handleConfirmInsertImage}
                                    className="px-2 py-1 border rounded bg-gray-200 text-black"
                                >
                                    Inserir
                                </button>
                            </div>
                        )}
                        <Editor
                            editorState={editorState}
                            onChange={handleEditorChange}
                            placeholder="Digite o conteúdo aqui..."
                            blockRenderMap={customBlockRenderMap}
                            blockStyleFn={blockStyleFn}
                            blockRendererFn={blockRendererFn}
                        />
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleCreateBlogText}
                    className="bg-[#7f5af0] text-white px-4 py-2 rounded hover:bg-[#5f3dc4] w-full"
                >
                    Criar Texto
                </button>
            </div>
        </div>
    );
};
