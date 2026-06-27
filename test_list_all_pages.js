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
    
    const res = await client.query('SELECT id, slug, title, puck_data FROM pages WHERE slug = \'blogs\'');
    if (res.rows.length > 0) {
      console.log("Blogs page puck_data:", JSON.stringify(res.rows[0].puck_data, null, 2));
    } else {
      console.log("Blogs page not found!");
    }

    await client.end();
  } catch (err) {
    console.error("Error:", err.message);
    await client.end().catch(() => {});
  }
}

run();
