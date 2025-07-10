// app/api/articles/[id]/route.ts
import { prisma } from '@/lib/db';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: params.id },
      include: { thumbnail: true },
    });

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }) {
  const id = params.id;
  const { title, content, action } = await req.json();
  try {
    const updates: any = { title, content, updatedAt: new Date() };
    if (action === 'publish') updates.status = 'published';
    const art = await prisma.article.update({
      where: { id },
      data: updates
    });
    return NextResponse.json(art);
  } catch (error) {
    return NextResponse.error();
  }
}
