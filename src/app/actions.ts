'use server';

import { getPayload } from 'payload';
import config from '@payload-config';

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
      draft: true, // Fetch drafts too if versions drafts are enabled
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
      draft: true,
    });

    if (result.docs.length > 0) {
      // Update existing page (saving it as a draft to support version history)
      const pageId = result.docs[0].id;
      const updated = await payload.update({
        collection: 'pages',
        id: pageId,
        data: {
          title,
          puckData,
        },
        draft: true, // Save as draft so it creates a version history snapshot
      });
      return { success: true, doc: updated };
    } else {
      // Create new page
      const created = await payload.create({
        collection: 'pages',
        data: {
          title,
          slug,
          puckData,
          status: 'draft',
        },
      });
      return { success: true, doc: created };
    }
  } catch (error) {
    console.error('Error saving page data:', error);
    throw new Error('Failed to save page data to database');
  }
}
