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
    const res = await client.query("SELECT id, slug, title FROM pages WHERE slug IN ('home', 'faq', 'blogs')");
    console.log("Core pages found in DB:");
    console.log(JSON.stringify(res.rows, null, 2));
    await client.end();
  } catch (err) {
    console.error("Error:", err.message);
    await client.end().catch(() => {});
  }
}

run();
