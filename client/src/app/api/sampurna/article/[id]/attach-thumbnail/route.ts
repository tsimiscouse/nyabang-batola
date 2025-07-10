import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { createClient } from '@supabase/supabase-js';

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const form = await req.formData();
    console.log('[DEBUG] Form keys:', Array.from(form.keys())); // ← Tambahkan ini
    const file = form.get('thumbnail') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const articleId = await params.id;

    // Upload to Supabase Storage
    const filePath = `${articleId}/${Date.now()}-${file.name}`;
    const { data, error: uploadError } = await sb
      .storage
      .from('thumbnails')
      .upload(filePath, file, {
        upsert: true,
        contentType: file.type,
      });

    if (uploadError) throw uploadError;

    const { publicUrl } = sb.storage.from('thumbnails').getPublicUrl(data.path).data;

    // Create Thumbnail in DB
    const thumbnail = await prisma.thumbnail.create({
      data: {
        url: publicUrl,
        width: 800,
        height: 600,
        article: { connect: { id: articleId } },
      },
    });

    return NextResponse.json(thumbnail, { status: 201 });
  } catch (error) {
    console.error('Upload thumbnail error:', error);
    return NextResponse.json(
      { error: 'Failed to upload thumbnail' },
      { status: 500 }
    );
  }
}
