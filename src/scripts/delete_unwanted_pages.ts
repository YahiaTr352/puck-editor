import { getPayload } from 'payload';
import config from '../../payload.config';

async function run() {
  const payload = await getPayload({ config });
  
  // 1. Delete page with slug 'faq' from the 'pages' collection
  const resFaq = await payload.delete({
    collection: 'pages',
    where: {
      slug: { equals: 'faq' }
    }
  });
  console.log('Deleted faq pages from pages collection:', resFaq);

  // 2. Delete page with slug 'test-temp-page' from the 'pages' collection
  const resTest = await payload.delete({
    collection: 'pages',
    where: {
      slug: { equals: 'test-temp-page' }
    }
  });
  console.log('Deleted test-temp-page pages from pages collection:', resTest);

  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
