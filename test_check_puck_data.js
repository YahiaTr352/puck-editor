import pkg from 'pg';
const { Client } = pkg;

async function run() {
  const client = new Client({
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'hammouripassword',
    database: 'payload_db',
  });

  try {
    await client.connect();
    
    const res = await client.query('SELECT id, slug, title, puck_data FROM pages WHERE slug LIKE \'blog-details-%\'');
    console.log(`Checking ${res.rows.length} pages starting with blog-details-...`);
    
    for (const doc of res.rows) {
      try {
        const puckData = typeof doc.puck_data === 'string' ? JSON.parse(doc.puck_data) : doc.puck_data;
        if (!puckData) {
          console.log(`❌ Page ID ${doc.id} (Slug: ${doc.slug}) has null puckData`);
          continue;
        }
        if (!puckData.content) {
          console.log(`⚠️ Page ID ${doc.id} (Slug: ${doc.slug}) has puckData but NO content array`);
          continue;
        }
        if (!Array.isArray(puckData.content)) {
          console.log(`❌ Page ID ${doc.id} (Slug: ${doc.slug}) content is not an array:`, typeof puckData.content);
          continue;
        }
        const blogDetails = puckData.content.find((c) => c.type === 'BlogDetails') || {};
        const props = blogDetails.props || {};
        console.log(`✅ Page ID ${doc.id} (Slug: ${doc.slug}) checked OK. BlogDetails title: "${props.title || doc.title}"`);
      } catch (err) {
        console.log(`❌ Page ID ${doc.id} (Slug: ${doc.slug}) failed with error:`, err.message);
      }
    }

    await client.end();
  } catch (err) {
    console.error("Error:", err.message);
    await client.end().catch(() => {});
  }
}

run();
