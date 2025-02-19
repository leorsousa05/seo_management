import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, DefaultDraftBlockRenderMap } from 'draft-js';
import Immutable from 'immutable';
import 'draft-js/dist/Draft.css';
import { BlogCategory, BlogText } from '../components/types';

const customBlockRenderMap = DefaultDraftBlockRenderMap.merge(
  Immutable.Map({
    'header-three': { element: 'h3' },
    'header-four': { element: 'h4' },
  })
);

const blockStyleFn = (contentBlock: any) => {
  const type = contentBlock.getType();
  switch (type) {
    case 'header-one':
      return 'custom-header-one';
    case 'header-two':
      return 'custom-header-two';
    case 'header-three':
      return 'custom-header-three';
    case 'header-four':
      return 'custom-header-four';
    default:
      return '';
  }
};

interface BlogTextFormProps {
  blogCategories: BlogCategory[];
  onSubmit: (data: Omit<BlogText, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
}

export const BlogTextForm: React.FC<BlogTextFormProps> = ({ blogCategories, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [blogCategoryId, setBlogCategoryId] = useState<number | null>(null);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const handleEditorChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  const handleCreate = async () => {
    const contentState = editorState.getCurrentContent();
    // Aqui, para simplificar, usamos o texto puro. Para HTML, integre um exportador.
    const textContent = contentState.getPlainText();
    await onSubmit({
      title,
      slug,
      content: textContent,
      blog_category_id: blogCategoryId,
      site_id: 0,
    });
    setTitle('');
    setSlug('');
    setBlogCategoryId(null);
    setEditorState(EditorState.createEmpty());
  };

  const toggleInlineStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockType = (blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const currentStyle = editorState.getCurrentInlineStyle();
  const currentBlockType = RichUtils.getCurrentBlockType(editorState);

  const toolbar = (
    <div className="flex flex-wrap gap-2 mb-2">
      <button
        type="button"
        onClick={() => toggleInlineStyle('BOLD')}
        className={`px-2 py-1 border rounded ${
          currentStyle.has('BOLD') ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
        }`}
      >
        <strong>B</strong>
      </button>
      <button
        type="button"
        onClick={() => toggleInlineStyle('ITALIC')}
        className={`px-2 py-1 border rounded ${
          currentStyle.has('ITALIC') ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
        }`}
      >
        <em>I</em>
      </button>
      <button
        type="button"
        onClick={() => toggleInlineStyle('UNDERLINE')}
        className={`px-2 py-1 border rounded ${
          currentStyle.has('UNDERLINE') ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
        }`}
      >
        <u>U</u>
      </button>
      <button
        type="button"
        onClick={() => toggleBlockType('header-one')}
        className={`px-2 py-1 border rounded ${
          currentBlockType === 'header-one' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
        }`}
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => toggleBlockType('header-two')}
        className={`px-2 py-1 border rounded ${
          currentBlockType === 'header-two' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
        }`}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => toggleBlockType('header-three')}
        className={`px-2 py-1 border rounded ${
          currentBlockType === 'header-three' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
        }`}
      >
        H3
      </button>
      <button
        type="button"
        onClick={() => toggleBlockType('header-four')}
        className={`px-2 py-1 border rounded ${
          currentBlockType === 'header-four' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
        }`}
      >
        H4
      </button>
    </div>
  );

  return (
    <div className="bg-[#24242a] p-4 rounded shadow">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Coluna Esquerda - Inputs principais */}
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-medium text-white">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded p-2 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded p-2 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">Categoria</label>
            <select
              value={blogCategoryId || ''}
              onChange={(e) => setBlogCategoryId(Number(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded p-2 text-black"
            >
              <option value="">Selecione uma categoria</option>
              {blogCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={handleCreate}
            className="bg-[#7f5af0] text-white px-4 py-2 rounded hover:bg-[#5f3dc4] w-full"
          >
            Criar Texto
          </button>
        </div>

        {/* Coluna Direita - Editor */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-white mb-2">Conteúdo</label>
          <div className="relative border border-gray-300 rounded p-2 bg-[#2d2d2d] min-h-[400px] text-white">
            {toolbar}
            <Editor
              editorState={editorState}
              onChange={handleEditorChange}
              placeholder="Digite o conteúdo aqui..."
              blockRenderMap={customBlockRenderMap}
              blockStyleFn={blockStyleFn}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
