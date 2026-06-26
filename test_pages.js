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
    
    // Check tables
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema='public'
    `);
    console.log("Tables in payload_puck_cms:", tables.rows.map(r => r.table_name));

    // Get pages
    const pages = await client.query("SELECT id, slug, title, puck_data FROM pages");
    console.log("Pages saved in payload_puck_cms pages table:", pages.rows.length);
    for (const page of pages.rows) {
      console.log(`- ID: ${page.id}, Slug: "${page.slug}", Title: "${page.title}"`);
      console.log(`  PuckData:`, JSON.stringify(page.puck_data).substring(0, 300) + '...');
    }

    // Get versions
    const versions = await client.query("SELECT id, parent_id, version FROM _pages_v");
    console.log("Versions saved in payload_puck_cms _pages_v table:", versions.rows.length);
    for (const v of versions.rows) {
      console.log(`- ID: ${v.id}, Parent ID: ${v.parent_id}`);
      console.log(`  Version:`, JSON.stringify(v.version).substring(0, 300) + '...');
    }
    
    await client.end();
  } catch (err) {
    console.error("❌ Error:", err.message);
    await client.end().catch(() => {});
  }
}

run();
