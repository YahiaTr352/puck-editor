import { NextResponse, NextRequest } from 'next/server';
import { getPageData } from '@/app/actions';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Slug parameter is required' },
        { 
          status: 400,
          headers: { 'Access-Control-Allow-Origin': '*' }
        }
      );
    }

    const dbSlug = `blog-details-${slug}`;
    const dbData = await getPageData(dbSlug);

    if (!dbData) {
      return NextResponse.json(
        { error: `Blog post '${slug}' not found` },
        { 
          status: 404,
          headers: { 'Access-Control-Allow-Origin': '*' }
        }
      );
    }

    const puckData = typeof dbData.puckData === 'string' ? JSON.parse(dbData.puckData) : dbData.puckData;

    return NextResponse.json(
      {
        id: dbData.id,
        title: dbData.title ? dbData.title.replace('مقالة: ', '').replace(' - Examy', '') : '',
        slug: slug,
        meta: (dbData as any).meta || null,
        puckData: puckData,
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      }
    );
  } catch (error) {
    console.error('API Error fetching blog details:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { 
        status: 500,
        headers: { 'Access-Control-Allow-Origin': '*' }
      }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
