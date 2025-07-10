// components/article/UploadThumbnailForm.tsx
'use client';
import { useState } from 'react';

interface Props { articleId: string; onUploaded: () => void; }

export default function UploadThumbnailForm({ articleId, onUploaded }: Props) {
  const [file, setFile] = useState<File | null>(null);

  const upload = async () => {
    if (!file) return;
    const fm = new FormData();
    fm.set('file', file);
    const thumb = await fetch('/api/thumbnail', { method: 'POST', body: fm }).then(r => r.json());
    await fetch(`/api/articles/${articleId}/attach-thumbnail`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: thumb.url, width: 800, height: 600 }),
    });
    onUploaded();
  };

  return (
    <div className="bg-black text-white p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-semibold mb-4">Upload Thumbnail</h2>
      <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] ?? null)} />
      <button
        className="mt-3 px-6 py-2 bg-primary-700 hover:bg-primary-800 rounded text-white"
        onClick={upload}
        disabled={!file}
      >
        Upload
      </button>
    </div>
  );
}
