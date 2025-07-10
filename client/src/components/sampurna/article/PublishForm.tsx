// components/article/PublishForm.tsx
'use client';
import { useState } from 'react';

interface Props { articleId: string; onPublished: () => void; }

export default function PublishForm({ articleId, onPublished }: Props) {
  const [loading, setLoading] = useState(false);

  const publish = async () => {
    setLoading(true);
    await fetch(`/api/articles/${articleId}/publish`, { method: 'PATCH' });
    setLoading(false);
    onPublished();
  };

  return (
    <button
      onClick={publish}
      disabled={loading}
      className="mt-4 px-6 py-3 bg-primary-700 hover:bg-primary-800 rounded text-white"
    >
      {loading ? 'Memproses...' : 'Publikasi Artikel'}
    </button>
  );
}
