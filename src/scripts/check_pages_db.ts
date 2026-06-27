import { getPayload } from 'payload';
import config from '../../payload.config';

async function run() {
  const payload = await getPayload({ config });
  
  const resPublished = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 100,
  });

  const resDrafts = await payload.find({
    collection: 'pages',
    draft: true,
    limit: 100,
  });

  console.log('--- PUBLISHED PAGES ---');
  resPublished.docs.forEach(doc => {
    console.log(`Title: ${doc.title} | Slug: ${doc.slug} | Status: ${doc.status}`);
  });

  console.log('--- ALL (DRAFTS + PUBLISHED) PAGES ---');
  resDrafts.docs.forEach(doc => {
    console.log(`Title: ${doc.title} | Slug: ${doc.slug} | Status: ${doc.status}`);
  });

  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
