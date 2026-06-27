import { savePageData, getPageData } from '../src/app/actions.ts';
import pkg from 'pg';
const { Client } = pkg;

async function main() {
  const slug = 'test-temp-page';
  console.log("Saving page...");
  await savePageData(slug, 'Test Title', {
    content: [{ type: 'BlogDetails', props: { title: 'Updated Title' } }]
  });

  console.log("Fetching page with draft: true...");
  const draftData = await getPageData(slug, { draft: true });
  console.log("Draft title:", draftData?.puckData?.content?.[0]?.props?.title);

  console.log("Fetching page with draft: false...");
  const pubData = await getPageData(slug, { draft: false });
  console.log("Published title:", pubData?.puckData?.content?.[0]?.props?.title);

  const c = new Client({
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'hammouripassword',
    database: 'payload_db'
  });
  await c.connect();
  const vRes = await c.query('select count(*) from _pages_v');
  console.log("Total rows in _pages_v:", vRes.rows[0].count);
  await c.end();
}

main().catch(err => {
  console.error(err);
});
