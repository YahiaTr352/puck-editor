'use server';

import { getPayload } from 'payload';
import config from '@payload-config';
import { revalidatePath } from 'next/cache';

/**
 * Get page data from Payload CMS PostgreSQL database by slug
 */
export async function getPageData(slug: string) {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: slug,
        },
      },
    });

    if (result.docs.length > 0) {
      return result.docs[0];
    }
    return null;
  } catch (error) {
    console.error('Error fetching page data:', error);
    return null;
  }
}

/**
 * Save page data to Payload CMS PostgreSQL database by slug
 */
export async function savePageData(slug: string, title: string, puckData: any) {
  try {
    const payload = await getPayload({ config });

    // Check if the page already exists
    const result = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: slug,
        },
      },
    });

    if (result.docs.length > 0) {
      // Update existing page and publish it directly to the main pages table
      const pageId = result.docs[0].id;
      const updated = await payload.update({
        collection: 'pages',
        id: pageId,
        data: {
          title,
          slug,
          puckData,
          status: 'published',
        },
      });
      revalidatePath('/', 'layout');
      return { success: true, doc: updated };
    } else {
      // Create and publish new page
      const created = await payload.create({
        collection: 'pages',
        data: {
          title,
          slug,
          puckData,
          status: 'published',
        },
      });
      revalidatePath('/', 'layout');
      return { success: true, doc: created };
    }
  } catch (error) {
    console.error('Error saving page data:', error);
    throw new Error('Failed to save page data to database');
  }
}

/**
 * Get a list of all pages in the database
 */
export async function getPagesList() {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: 'pages',
      limit: 200,
    });
    return result.docs.map(doc => ({
      id: doc.id,
      slug: doc.slug,
      title: doc.title,
      updatedAt: doc.updatedAt,
    }));
  } catch (error) {
    console.error('Error fetching pages list:', error);
    return [];
  }
}

/**
 * Delete page data by slug
 */
export async function deletePageData(slug: string) {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: slug,
        },
      },
    });

    if (result.docs.length > 0) {
      await payload.delete({
        collection: 'pages',
        id: result.docs[0].id,
      });
      revalidatePath('/', 'layout');
      return { success: true };
    }
    return { success: false, error: 'Page not found' };
  } catch (error) {
    console.error('Error deleting page:', error);
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Fetch and format the dynamic blog posts list from the database
 */
export async function getDynamicBlogsList() {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: 'pages',
      limit: 100,
    });

    const blogDocs = result.docs.filter((doc: any) => doc.slug.startsWith('blog-details-'));
    
    // Sort descending by ID to make newer/featured posts appear first
    blogDocs.sort((a: any, b: any) => b.id - a.id);

    return blogDocs.map((doc: any) => {
      const puckData = typeof doc.puckData === 'string' ? JSON.parse(doc.puckData) : doc.puckData;
      const blogDetails = puckData?.content?.find((c: any) => c.type === 'BlogDetails') || {};
      const props = blogDetails.props || {};

      const cleanSlug = doc.slug.replace('blog-details-', '');

      return {
        title: props.title || doc.title || "",
        description: props.subtitle || "",
        image: props.image || "",
        date: props.date || "",
        author: props.author || "فريق اختباري",
        slug: cleanSlug
      };
    });
  } catch (error) {
    console.error('Error fetching dynamic blogs list:', error);
    return [];
  }
}
