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
    
    // Fetch current puck_data
    const res = await client.query("SELECT puck_data FROM pages WHERE slug = 'blogs'");
    if (res.rows.length === 0) {
      console.log("No blogs page found in PostgreSQL.");
      await client.end();
      return;
    }

    let puckData = res.rows[0].puck_data;
    if (typeof puckData === 'string') {
      puckData = JSON.parse(puckData);
    }

    // Update title and subtitle inside puckData
    if (puckData.content && Array.isArray(puckData.content)) {
      puckData.content = puckData.content.map((item: any) => {
        if (item.type === 'BlogList') {
          return {
            ...item,
            props: {
              ...item.props,
              eyebrow: "مدوّنة اختباري",
              title: "رؤى ومقالات لمعلّمي الغد في المملكة",
              subtitle: "أفكار عملية عن الذكاء الاصطناعي في التعليم، التقويم المتوازن، والمنهج السعودي — من فريق اختباري ونخبة من المعلمين."
            }
          };
        }
        return item;
      });
    }

    // Update puck_data in DB
    await client.query(
      "UPDATE pages SET puck_data = $1, title = $2 WHERE slug = 'blogs'",
      [JSON.stringify(puckData), "المدوّنة - Examy"]
    );

    console.log("Updated blogs page in PostgreSQL successfully!");
    await client.end();
  } catch (err) {
    console.error(err);
    await client.end().catch(() => {});
  }
}

run();
