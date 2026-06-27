import { NextResponse } from 'next/server';
import { getPageData } from '@/app/actions';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const dbData = await getPageData('faq');
    if (!dbData) {
      return NextResponse.json(
        { error: 'FAQ page not found' },
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
        title: dbData.title,
        slug: dbData.slug,
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
    console.error('API Error fetching FAQ:', error);
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
