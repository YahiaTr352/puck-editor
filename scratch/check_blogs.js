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

  await client.connect();
  const res = await client.query("SELECT id, slug, title, puck_data FROM pages WHERE slug = 'blogs'");
  if (res.rows.length === 0) {
    console.log("❌ No page with slug 'blogs' found!");
  } else {
    const row = res.rows[0];
    console.log(`Page: ${row.title} (Slug: ${row.slug})`);
    const data = row.puck_data;
    console.log("Root properties:", data.root);
    const blogList = data.content?.find(c => c.type === 'BlogList');
    if (blogList) {
      console.log("BlogList component found!");
      console.log("Title:", blogList.props?.title);
      console.log("Subtitle:", blogList.props?.subtitle);
      console.log("Number of posts in database:", blogList.props?.posts?.length);
      if (blogList.props?.posts && blogList.props.posts.length > 0) {
        console.log("First post in DB:", blogList.props.posts[0]);
      }
    } else {
      console.log("❌ No BlogList component in puck_data content!");
    }
  }
  await client.end();
}

run().catch(console.error);
