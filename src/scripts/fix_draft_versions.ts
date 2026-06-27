import { getPayload } from 'payload';
import config from '../../payload.config';
import pg from 'pg';

async function run() {
  const payload = await getPayload({ config });
  
  // 1. Get all raw pages from the database using direct query
  const client = new pg.Client({
    connectionString: process.env.DATABASE_URI || 'postgresql://postgres:hammouripassword@127.0.0.1:5432/payload_db'
  });
  await client.connect();
  const rawPagesRes = await client.query('SELECT id, slug, title, puck_data FROM pages');
  const rawPages = rawPagesRes.rows;
  console.log(`Found ${rawPages.length} raw pages in the pages table.`);
  await client.end();

  // 2. For each raw page, trigger payload.update to register draft versions
  for (const page of rawPages) {
    console.log(`Processing page: "${page.title}" (slug: ${page.slug})`);
    try {
      await payload.update({
        collection: 'pages',
        id: page.id,
        draft: false, // Triggers version record generation
        overrideAccess: true,
        data: {
          title: page.title,
          slug: page.slug,
          puckData: page.puck_data,
          status: 'published'
        }
      });
      console.log(`Successfully versioned: "${page.title}"`);
    } catch (err) {
      console.error(`Failed to update page ${page.slug}:`, err);
    }
  }

  console.log('Finished fixing drafts & versions.');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
