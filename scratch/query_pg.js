import pg from 'pg';
const { Client } = pg;

async function run() {
  const client = new Client({
    connectionString: 'postgresql://postgres:hammouripassword@127.0.0.1:5432/payload_db'
  });
  await client.connect();
  const res = await client.query('SELECT id, slug, title, status FROM pages');
  console.log(`Total rows in pages table: ${res.rows.length}`);
  res.rows.forEach(row => {
    console.log(row);
  });
  await client.end();
}
run().catch(console.error);
