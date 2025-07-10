import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { title, content, status = 'draft', slug } = await req.json();

    if (!title || !content || !slug) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        content,
        status,
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}


export async function GET() {
  try {
    const drafts = await prisma.article.findMany({
      where: { status: 'draft' },
      orderBy: { createdAt: 'desc' },
      include: {
        thumbnail: true,
      },
    });

    const serialized = drafts.map(d => ({
      id: d.id,
      title: d.title,
      slug: d.slug,
      createdAt: d.createdAt,
      thumbnailUrl: d.thumbnail[0]?.url || null,
    }));

    return NextResponse.json(serialized);
  } catch (err) {
    console.error('[DRAFT_GET_ERROR]', err);
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}


