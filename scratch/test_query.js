import { getPayload } from 'payload';
import config from '../payload.config';

async function run() {
  try {
    const payload = await getPayload({ config });
    
    console.log("Querying slug 'blogs' with draft: true...");
    const res1 = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'blogs'
        }
      },
      draft: true
    });
    console.log("Found docs with draft true:", res1.docs.length);
    if (res1.docs.length > 0) {
      console.log("Doc 0 ID:", res1.docs[0].id, "Title:", res1.docs[0].title, "Slug:", res1.docs[0].slug);
    }

    console.log("\nQuerying slug 'blogs' with draft: false...");
    const res2 = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'blogs'
        }
      },
      draft: false
    });
    console.log("Found docs with draft false:", res2.docs.length);

    console.log("\nListing all pages in Payload collection:");
    const resAll = await payload.find({
      collection: 'pages',
      limit: 100,
      draft: true
    });
    console.log("Total pages found:", resAll.docs.length);
    resAll.docs.forEach((doc, i) => {
      console.log(`Page ${i}: ID=${doc.id}, Title="${doc.title}", Slug="${doc.slug}"`);
    });
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
