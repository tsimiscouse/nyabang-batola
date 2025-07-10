// app/editor/[id]/page.tsx
'use client';
import { use } from 'react';
import ArticleEditor from '../ArticleEditor'; // jika masih di direktori yang sama

export default function EditorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
  return <ArticleEditor articleId= {id} />;
}
