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

  const pagesRes = await c.query("select puck_data from pages where slug = 'blog-details-أنواع-التعلم-الذاتي'");
  const pagesProps = pagesRes.rows[0]?.puck_data?.content?.find(c => c.type === 'BlogDetails')?.props;
  console.log("Pages table title:", pagesProps?.title);

  const versionsRes = await c.query("select version_puck_data from _pages_v where parent_id = (select id from pages where slug = 'blog-details-أنواع-التعلم-الذاتي') order by id desc limit 1");
  const versionsProps = versionsRes.rows[0]?.version_puck_data?.content?.find(c => c.type === 'BlogDetails')?.props;
  console.log("Latest version in _pages_v title:", versionsProps?.title);

  await c.end();
}

main().catch(err => console.error(err));
