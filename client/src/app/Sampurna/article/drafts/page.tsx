'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Card, CardContent, CardHeader, CardTitle,
} from '@/components/ui/Card';
import  Button  from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

type Draft = {
  id: string;
  title: string;
  slug: string;
  thumbnailUrl?: string;
  createdAt: string;
};

export default function DraftListPage() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDrafts();
  }, []);

  const fetchDrafts = async () => {
    setLoading(true);
    const res = await fetch('/api/sampurna/article');
    const data = await res.json();
    setDrafts(data);
    setLoading(false);
  };

  const uploadThumbnail = async (id: string, file: File) => {
    const form = new FormData();
    form.append('thumbnail', file);
    const res = await fetch(`/api/sampurna/article/${id}/attach-thumbnail`, {
      method: 'POST',
      body: form,
    });

    if (res.ok) {
      alert('Thumbnail uploaded successfully!');
    } else {
      alert('Failed to upload thumbnail.');
    }

    fetchDrafts();
  };

  const publish = async (id: string) => {
    await fetch(`/api/sampurna/article/${id}/publish`, { method: 'PATCH' });
    fetchDrafts();
  };

  return (
    <section className="min-h-screen bg-black text-white px-4 sm:px-6 md:px-16 py-12">
      <h2 className="text-4xl sm:text-5xl font-bold font-serif mb-8">Draft Artikel</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {drafts.map((d) => (
          <Card key={d.id} className="bg-[#111] border border-white/10 text-white rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">{d.title}</CardTitle>
              <p className="text-sm text-gray-400">Created: {new Date(d.createdAt).toLocaleDateString()}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {d.thumbnailUrl ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <img
                      src={d.thumbnailUrl}
                      alt="Thumbnail"
                      className="rounded h-48 w-full object-cover cursor-pointer transition hover:opacity-90"
                    />
                  </DialogTrigger>
                  <DialogContent className="max-w-xl p-0 overflow-hidden">
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <Image
                      src={d.thumbnailUrl}
                      alt="Preview Thumbnail"
                      width={800}
                      height={500}
                      className="w-full h-auto object-cover"
                    />
                  </DialogContent>
                </Dialog>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor={`thumbnail-${d.id}`}>Upload Thumbnail</Label>
                  <Input
                    id={`thumbnail-${d.id}`}
                    type="file"
                    accept="image/*"
                    className="bg-gray-800 text-white"
                    onChange={e => e.target.files?.[0] && uploadThumbnail(d.id, e.target.files[0])}
                  />
                </div>
              )}

              <div className="flex gap-3">
                <Link href={`/Sampurna/article/editor/${d.id}`} className="flex-1">
                  <Button variant="outline" className="w-full border-white/40 text-white hover:bg-white/10">
                    Edit
                  </Button>
                </Link>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                      Publish
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-black text-white border border-white/10">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Yakin ingin mempublikasikan?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="text-gray-300">Batal</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => publish(d.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Ya, Publish
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}

        {drafts.length === 0 && !loading && (
          <div className="col-span-full text-center text-gray-500">
            Tidak ada draft tersedia.
          </div>
        )}
      </div>
    </section>
  );
}
