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
    const res = await client.query("SELECT id, slug, title, puck_data FROM pages WHERE slug = 'blogs'");
    console.log("Found pages matching slug = 'blogs':", res.rows.length);
    for (const r of res.rows) {
      console.log(`ID: ${r.id}, Slug: "${r.slug}", Title: "${r.title}"`);
      console.log("PuckData:", JSON.stringify(r.puck_data));
    }
    await client.end();
  } catch (err) {
    console.error(err);
    await client.end().catch(() => {});
  }
}

run();
