import pkg from 'pg';
const { Client } = pkg;

async function main() {
  const c = new Client({
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'hammouripassword',
    database: 'payload_db'
  });
  await c.connect();
  
  const pagesRes = await c.query("select id, slug, status from pages where slug = 'test-temp-page'");
  console.log("Pages table result:", pagesRes.rows);

  const versionsRes = await c.query("select count(*) from _pages_v");
  console.log("Total rows in _pages_v:", versionsRes.rows[0].count);

  const detailsRes = await c.query("select id, parent_id, version_status from _pages_v");
  console.log("Versions detail:", detailsRes.rows);

  await c.end();
}

main().catch(err => console.error(err));
