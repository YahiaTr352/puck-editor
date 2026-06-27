'use server';

import { getPayload } from 'payload';
import config from '@payload-config';
import { revalidatePath } from 'next/cache';

/**
 * Get page data from Payload CMS PostgreSQL database by slug
 */
export async function getPageData(slug: string, options?: { draft?: boolean }) {
  console.log(`[getPageData] Called with slug: "${slug}", draft: ${options?.draft}`);
  try {
    const payload = await getPayload({ config });
    const draft = options?.draft ?? false;

    // Fetch published version
    const resultFalse = await payload.find({
      collection: 'pages',
      draft: false,
      overrideAccess: true,
      where: {
        slug: {
          equals: slug,
        },
      },
    });
    const pubDoc = resultFalse.docs.length > 0 ? resultFalse.docs[0] : null;
    console.log(`[getPageData] "${slug}" - Published doc found: ${!!pubDoc}`);

    if (!draft) {
      return pubDoc;
    }

    // Fetch draft version
    const resultTrue = await payload.find({
      collection: 'pages',
      draft: true,
      overrideAccess: true,
      where: {
        slug: {
          equals: slug,
        },
      },
    });
    const draftDoc = resultTrue.docs.length > 0 ? resultTrue.docs[0] : null;
    console.log(`[getPageData] "${slug}" - Draft/latest doc found: ${!!draftDoc}`);

    // Compare timestamps to return the most recently updated one
    if (pubDoc && draftDoc) {
      const pubTime = new Date(pubDoc.updatedAt).getTime();
      const draftTime = new Date(draftDoc.updatedAt).getTime();
      const choice = draftTime >= pubTime ? 'draftDoc' : 'pubDoc';
      console.log(`[getPageData] "${slug}" - Both found. Choice: ${choice} (pubTime: ${pubDoc.updatedAt}, draftTime: ${draftDoc.updatedAt})`);
      return draftTime >= pubTime ? draftDoc : pubDoc;
    }

    const finalDoc = draftDoc || pubDoc;
    console.log(`[getPageData] "${slug}" - Returning: ${finalDoc ? (draftDoc ? 'draftDoc' : 'pubDoc') : 'null'}`);
    return finalDoc;
  } catch (error) {
    console.error(`[getPageData] Error fetching page data for "${slug}":`, error);
    return null;
  }
}

/**
 * Save page data to Payload CMS PostgreSQL database by slug
 */
export async function savePageData(slug: string, title: string, puckData: any) {
  console.log(`[savePageData] Called for slug: "${slug}", title: "${title}"`);
  try {
    const payload = await getPayload({ config });

    // If saving the blogs list page, propagate any changes made to blog items back to their individual pages
    if (slug === "blogs" && puckData && puckData.content) {
      const blogListBlock = puckData.content.find((c: any) => c.type === "BlogList");
      const editedPosts = blogListBlock?.props?.posts;
      if (Array.isArray(editedPosts)) {
        for (const post of editedPosts) {
          if (!post.slug) continue;
          const blogSlug = `blog-details-${post.slug}`;
          
          // Find the existing blog details page (check drafts first)
          let blogRes = await payload.find({
            collection: 'pages',
            draft: true,
            overrideAccess: true,
            where: {
              slug: {
                equals: blogSlug,
              },
            },
          });
          
          if (blogRes.docs.length === 0) {
            blogRes = await payload.find({
              collection: 'pages',
              draft: false,
              overrideAccess: true,
              where: {
                slug: {
                  equals: blogSlug,
                },
              },
            });
          }
          
          const blogDoc = blogRes.docs.length > 0 ? blogRes.docs[0] : null;
          if (blogDoc) {
            let blogPuckData = typeof blogDoc.puckData === 'string' ? JSON.parse(blogDoc.puckData) : blogDoc.puckData;
            if (blogPuckData && blogPuckData.content) {
              const detailsBlock = blogPuckData.content.find((c: any) => c.type === "BlogDetails");
              if (detailsBlock && detailsBlock.props) {
                // Check if title, description/subtitle, image, date or author has changed
                let changed = false;
                if (detailsBlock.props.title !== post.title) {
                  detailsBlock.props.title = post.title;
                  changed = true;
                }
                if (detailsBlock.props.subtitle !== post.description) {
                  detailsBlock.props.subtitle = post.description;
                  changed = true;
                }
                if (post.image && detailsBlock.props.image !== post.image) {
                  detailsBlock.props.image = post.image;
                  changed = true;
                }
                if (post.date && detailsBlock.props.date !== post.date) {
                  detailsBlock.props.date = post.date;
                  changed = true;
                }
                if (post.author && detailsBlock.props.author !== post.author) {
                  detailsBlock.props.author = post.author;
                  changed = true;
                }
                
                if (changed) {
                  console.log(`[savePageData] Propagating changes to individual blog details page: "${blogSlug}"`);
                  await payload.update({
                    collection: 'pages',
                    id: blogDoc.id,
                    draft: false,
                    overrideAccess: true,
                    data: {
                      title: post.title || blogDoc.title,
                      puckData: blogPuckData,
                      status: 'published',
                    },
                  });
                }
              }
            }
          }
        }
      }
    }

    // Check if the page already exists (include drafts)
    let result = await payload.find({
      collection: 'pages',
      draft: true,
      overrideAccess: true,
      where: {
        slug: {
          equals: slug,
        },
      },
    });
    console.log(`[savePageData] "${slug}" - Querying draft: true, found count: ${result.docs.length}`);

    // Fallback to published table if drafts query returns nothing (empty _pages_v)
    if (result.docs.length === 0) {
      result = await payload.find({
        collection: 'pages',
        draft: false,
        overrideAccess: true,
        where: {
          slug: {
            equals: slug,
          },
        },
      });
      console.log(`[savePageData] "${slug}" - Fallback query draft: false, found count: ${result.docs.length}`);
    }

    if (result.docs.length > 0) {
      // Update existing page and publish it directly
      const pageId = result.docs[0].id;
      console.log(`[savePageData] "${slug}" - Updating existing page. ID: ${pageId}`);
      const updated = await payload.update({
        collection: 'pages',
        id: pageId,
        draft: false, // Publish and update main pages table
        overrideAccess: true,
        data: {
          title,
          slug,
          puckData,
          status: 'published',
        },
      });
      console.log(`[savePageData] "${slug}" - Successfully updated page ID: ${pageId}`);
      try {
        revalidatePath('/', 'layout');
        console.log(`[savePageData] "${slug}" - Revalidated path '/' layout`);
      } catch (revalErr) {
        console.warn(`[savePageData] "${slug}" - Non-fatal revalidatePath warning:`, (revalErr as Error).message);
      }
      return { success: true, doc: updated };
    } else {
      // Create and publish new page
      console.log(`[savePageData] "${slug}" - Creating new page.`);
      const created = await payload.create({
        collection: 'pages',
        draft: false, // Publish and create in main pages table
        overrideAccess: true,
        data: {
          title,
          slug,
          puckData,
          status: 'published',
        },
      });
      console.log(`[savePageData] "${slug}" - Successfully created page ID: ${created.id}`);
      try {
        revalidatePath('/', 'layout');
        console.log(`[savePageData] "${slug}" - Revalidated path '/' layout`);
      } catch (revalErr) {
        console.warn(`[savePageData] "${slug}" - Non-fatal revalidatePath warning:`, (revalErr as Error).message);
      }
      return { success: true, doc: created };
    }
  } catch (error) {
    console.error(`[savePageData] Error saving page data for "${slug}":`, error);
    throw new Error('Failed to save page data to database');
  }
}

/**
 * Get a list of all pages in the database
 */
export async function getPagesList() {
  try {
    const payload = await getPayload({ config });
    
    // Fetch published pages
    const resultFalse = await payload.find({
      collection: 'pages',
      draft: false,
      overrideAccess: true,
      limit: 200,
    });

    // Fetch draft / latest version pages
    const resultTrue = await payload.find({
      collection: 'pages',
      draft: true,
      overrideAccess: true,
      limit: 200,
    });

    // Merge them: keep the newer version based on updatedAt timestamp
    const docsMap = new Map<string, any>();
    resultFalse.docs.forEach(doc => docsMap.set(doc.slug, doc));
    
    resultTrue.docs.forEach(draftDoc => {
      const existing = docsMap.get(draftDoc.slug);
      if (existing) {
        const pubTime = new Date(existing.updatedAt).getTime();
        const draftTime = new Date(draftDoc.updatedAt).getTime();
        if (draftTime >= pubTime) {
          docsMap.set(draftDoc.slug, draftDoc);
        }
      } else {
        docsMap.set(draftDoc.slug, draftDoc);
      }
    });

    const docs = Array.from(docsMap.values());

    return docs.map(doc => ({
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
      overrideAccess: true,
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
        overrideAccess: true,
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
export async function getDynamicBlogsList(options?: { draft?: boolean }) {
  try {
    const payload = await getPayload({ config });
    const draft = options?.draft ?? false;

    let docs: any[] = [];

    if (draft) {
      // Fetch both published and latest versions to perform union merge
      const resultFalse = await payload.find({
        collection: 'pages',
        draft: false,
        overrideAccess: true,
        limit: 100,
      });

      const resultTrue = await payload.find({
        collection: 'pages',
        draft: true,
        overrideAccess: true,
        limit: 100,
      });

      // Merge and keep the newer one based on updatedAt timestamp
      const docsMap = new Map<string, any>();
      resultFalse.docs.forEach(doc => docsMap.set(doc.slug, doc));
      
      resultTrue.docs.forEach(draftDoc => {
        const existing = docsMap.get(draftDoc.slug);
        if (existing) {
          const pubTime = new Date(existing.updatedAt).getTime();
          const draftTime = new Date(draftDoc.updatedAt).getTime();
          if (draftTime >= pubTime) {
            docsMap.set(draftDoc.slug, draftDoc);
          }
        } else {
          docsMap.set(draftDoc.slug, draftDoc);
        }
      });
      
      docs = Array.from(docsMap.values());
    } else {
      const resultFalse = await payload.find({
        collection: 'pages',
        draft: false,
        overrideAccess: true,
        limit: 100,
      });
      docs = resultFalse.docs;
    }

    const blogDocs = docs.filter((doc: any) => doc.slug.startsWith('blog-details-'));
    
    // Sort descending by ID to make newer/featured posts appear first
    blogDocs.sort((a: any, b: any) => b.id - a.id);

    return blogDocs.map((doc: any) => {
      const puckData = typeof doc.puckData === 'string' ? JSON.parse(doc.puckData) : doc.puckData;
      const blogDetails = puckData?.content?.find((c: any) => c.type === 'BlogDetails') || {};
      const props = blogDetails.props || {};

      const cleanSlug = doc.slug.replace('blog-details-', '');

      const title = props.title || doc.title || "";
      const subtitle = props.subtitle || "";
      const combined = `${title} ${subtitle}`.toLowerCase();
      
      const inferredTags: string[] = [];
      if (combined.includes('ذكاء') || combined.includes('ai') || combined.includes('اصطناعي')) {
        inferredTags.push('ذكاء اصطناعي');
      }
      if (combined.includes('تقويم') || combined.includes('اختبار') || combined.includes('امتحان') || combined.includes('أسئلة')) {
        inferredTags.push('التقويم والاختبارات');
      }
      if (combined.includes('منهج') || combined.includes('سعودي') || combined.includes('مملكة')) {
        inferredTags.push('المنهج السعودي');
      }
      if (combined.includes('نصائح') || combined.includes('معلم') || combined.includes('بلوم')) {
        inferredTags.push('نصائح للمعلمين');
      }
      if (inferredTags.length === 0) {
        inferredTags.push('عام');
      }
      const tagsStr = inferredTags.join(',');

      return {
        id: doc.id,
        title,
        text: subtitle,
        description: subtitle,
        image: props.image || "",
        date: props.date || "",
        created_at: doc.updatedAt || doc.createdAt,
        author: props.author || "فريق اختباري",
        slug: cleanSlug,
        tags: tagsStr,
      };
    });
  } catch (error) {
    console.error('Error fetching dynamic blogs list:', error);
    return [];
  }
}
