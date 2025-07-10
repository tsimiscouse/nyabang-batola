import { NextRequest, NextResponse } from 'next/server';
import {prisma} from '@/lib/db';
import { createClient } from '@supabase/supabase-js';

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get('file') as Blob;
  const artId = form.get('articleId') as string;

  try {
    // Upload ke Supa
    const { data, error: upErr } = await sb
      .storage
      .from('thumbnails')
      .upload(`${artId}/${Date.now()}`, file, { upsert: true });
    if (upErr) throw upErr;
    const url = sb.storage.from('thumbnails').getPublicUrl(data.path).data.publicUrl;

    // Simpan metadata
    const img = await prisma.thumbnail.create({
      data: { url, width: 800, height: 600, article: { connect: { id: artId } } }
    });
    return NextResponse.json(img);
  } catch (e) {
    return NextResponse.error();
  }
}
