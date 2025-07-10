// app/api/articles/[id]/publish/route.ts
import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const updated = await prisma.article.update({
      where: { id: params.id },
      data: { status: 'published' },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to publish article' }, { status: 500 });
  }
}
