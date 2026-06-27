import { getPayload } from 'payload';
import config from '../payload.config.ts';

async function run() {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: 'pages',
    draft: false,
  });

  console.log(`Total published pages found: ${result.docs.length}`);
  for (const doc of result.docs) {
    console.log(`- Slug: "${doc.slug}", Title: "${doc.title}"`);
  }
}

run().catch(console.error);
