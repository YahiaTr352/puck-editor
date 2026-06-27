async function run() {
  // Let's run a raw query to check what is in pages
  // and see if any row throws an error in getDynamicBlogsList logic.
  const pkg = await import('pg');
  const client = new pkg.Client({
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'hammouripassword',
    database: 'payload_db',
  });

  try {
    await client.connect();
    const res = await client.query('SELECT id, slug, title, puck_data FROM pages');
    const docs = res.rows.map(r => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      puckData: r.puck_data
    }));

    const blogDocs = docs.filter((doc) => doc.slug.startsWith('blog-details-'));
    console.log(`Found ${blogDocs.length} blog-details documents in raw pages table.`);
    
    // Let's map it
    const mapped = blogDocs.map((doc) => {
      try {
        const puckData = typeof doc.puckData === 'string' ? JSON.parse(doc.puckData) : doc.puckData;
        const blogDetails = puckData?.content?.find((c) => c.type === 'BlogDetails') || {};
        const props = blogDetails.props || {};
        return {
          id: doc.id,
          title: props.title || doc.title || "",
          slug: doc.slug,
        };
      } catch (e) {
        console.error(`Failed on doc ID ${doc.id}:`, e.message);
        throw e;
      }
    });

    console.log(`Successfully mapped ${mapped.length} blogs!`);
    await client.end();
  } catch (err) {
    console.error("General error:", err.message);
    await client.end().catch(() => {});
  }
}

run();
