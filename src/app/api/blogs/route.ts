import { NextResponse } from 'next/server';
import { getPageData, getDynamicBlogsList } from '@/app/actions';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const dbData = await getPageData('blogs');
    const posts = await getDynamicBlogsList();

    const puckData = dbData && dbData.puckData 
      ? (typeof dbData.puckData === 'string' ? JSON.parse(dbData.puckData) : dbData.puckData)
      : null;

    return NextResponse.json(
      {
        page: dbData ? {
          id: dbData.id,
          title: dbData.title,
          slug: dbData.slug,
          meta: (dbData as any).meta || null,
          puckData: puckData,
        } : null,
        posts: posts.map((post: any) => ({
          id: post.id,
          slug: post.slug.replace('blog-details-', ''),
          title: post.title ? post.title.replace('مقالة: ', '').replace(' - Examy', '') : 'بدون عنوان',
          updatedAt: post.updatedAt,
        })),
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
    console.error('API Error fetching blogs list:', error);
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
