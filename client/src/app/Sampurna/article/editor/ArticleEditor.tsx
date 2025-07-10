'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Blockquote from '@tiptap/extension-blockquote';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import CodeBlock from '@tiptap/extension-code-block';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TextAlign from '@tiptap/extension-text-align';
import Paragraph from '@tiptap/extension-paragraph';

import { ResizableImage } from 'tiptap-extension-resizable-image';
import 'tiptap-extension-resizable-image/styles.css';

import React, { useEffect, useState } from 'react';
import {
  BoldIcon, ItalicIcon, ListIcon, Heading1Icon, Heading2Icon, Heading3Icon,
  ListOrderedIcon, CodeIcon, ImageIcon, QuoteIcon, TableIcon,
  AlignLeftIcon, AlignCenterIcon, AlignRightIcon, AlignJustifyIcon,
  VideoIcon
} from 'lucide-react';

type Props = {
  articleId?: string;
}

const ToolbarButton = ({
  onClick,
  icon: Icon,
  isActive,
}: {
  onClick: () => void;
  icon: React.ElementType;
  isActive?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`p-2 rounded hover:bg-white/10 ${isActive ? 'bg-white/20' : ''}`}
    type="button"
  >
    <Icon size={18} />
  </button>
);

export default function ArticleEditor({ articleId }: Props) {
  console.log('Editing article ID:', articleId);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3] }),
      Bold,
      Italic,
      Blockquote,
      BulletList,
      OrderedList,
      ListItem,
      CodeBlock,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        defaultAlignment: 'justify',
      }),
      Paragraph.extend({
        addAttributes() {
          return {
            style: {
              default: 'margin-bottom: 1rem;',
              parseHTML: (element) => element.getAttribute('style') || '',
              renderHTML: (attributes) => {
                return { style: attributes.style };
              },
            },
          };
        },
      }),
      ResizableImage.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: 'my-4 rounded shadow-lg',
        },
        resizeIcon: true,
      }),
    ],
    content: '<p></p>',
  });

  useEffect(() => {
    if(!articleId) return;
    const fetchArticle = async () => {
      setLoading(true);
      try{
        const res = await fetch(`/api/sampurna/article/${articleId}`);
        const data = await res.json();
        setTitle(data.title);
        editor?.commands.setContent(data.content);
      } catch (error) {
        console.error('Failed to fetch article:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [articleId, editor]);

  const saveDraft = async () => {
    if (!editor || !title) return;
    const content = editor.getHTML();
    const response = await fetch('/api/sampurna/article', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        status: 'draft',
        slug: title.toLowerCase().replace(/\s+/g, '-'),
      }),
    });

    if(response.ok){
      alert('Draft saved successfully!');
    } else{
      alert('Failed to save draft.');
    }
  };

  const addImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      if (!input.files?.length) return;
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const src = reader.result as string;
        const imageTag = `<img src="${src}" data-resizable="true" style="width: 300px;" />`;
        editor?.commands.insertContent(imageTag);
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const addVideo = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';
    input.onchange = async () => {
      if (!input.files?.length) return;
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const videoTag = `<video controls class="w-full mt-4"><source src="${reader.result}" type="${file.type}"></video>`;
        editor?.commands.insertContent(videoTag);
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Editor */}
      <div className="w-1/2 p-6 overflow-y-scroll border-r border-white/10 bg-black">
        <input
          type="text"
          placeholder="Judul Artikel"
          className="w-full text-4xl font-bold outline-none border-b border-transparent focus:border-white transition-all mb-4 bg-transparent text-white placeholder:text-white/40"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {editor && (
          <div className="flex flex-wrap gap-2 border-b pb-3 mb-4 border-white/10">
            <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} icon={BoldIcon} isActive={editor.isActive('bold')} />
            <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} icon={ItalicIcon} isActive={editor.isActive('italic')} />
            <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} icon={Heading1Icon} isActive={editor.isActive('heading', { level: 1 })} />
            <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} icon={Heading2Icon} isActive={editor.isActive('heading', { level: 2 })} />
            <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} icon={Heading3Icon} isActive={editor.isActive('heading', { level: 3 })} />
            <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} icon={ListIcon} isActive={editor.isActive('bulletList')} />
            <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} icon={ListOrderedIcon} isActive={editor.isActive('orderedList')} />
            <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} icon={CodeIcon} isActive={editor.isActive('codeBlock')} />
            <ToolbarButton onClick={addImage} icon={ImageIcon} />
            <ToolbarButton onClick={addVideo} icon={VideoIcon} />
            <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} icon={QuoteIcon} isActive={editor.isActive('blockquote')} />
            <ToolbarButton onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} icon={TableIcon} />
            <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} icon={AlignLeftIcon} isActive={editor.isActive({ textAlign: 'left' })} />
            <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} icon={AlignCenterIcon} isActive={editor.isActive({ textAlign: 'center' })} />
            <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} icon={AlignRightIcon} isActive={editor.isActive({ textAlign: 'right' })} />
            <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('justify').run()} icon={AlignJustifyIcon} isActive={editor.isActive({ textAlign: 'justify' })} />
          </div>
        )}

        <EditorContent
          editor={editor}
          className="focus:outline-none min-h-screen text-white placeholder:text-white/40"
        />
        <button
          onClick={saveDraft}
          className='mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded'>
            Simpan Draft
          </button>
      </div>

      {/* Preview */}
      <div className="w-1/2 p-6 overflow-y-scroll bg-black text-white">
        <h1 className="text-4xl font-bold mb-6 border-b border-white pb-2">{title || 'Preview Judul'}</h1>
        <div className="prose prose-invert prose-lg max-w-none space-y-4" dangerouslySetInnerHTML={{ __html: editor?.getHTML() || '' }} />
      </div>
    </div>
  );
}
