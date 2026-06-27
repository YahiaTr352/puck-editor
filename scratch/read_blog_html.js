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
    const res = await client.query("SELECT id, slug, title FROM pages");
    console.log("All Pages in DB:");
    res.rows.forEach(row => {
      console.log(`- ID: ${row.id}, Slug: "${row.slug}", Title: "${row.title}"`);
    });
    await client.end();
  } catch (err) {
    console.error(err);
    await client.end().catch(() => {});
  }
}

run();
