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
  const res = await client.query("SELECT * FROM pages");
  console.log(`Total rows in PG pages table: ${res.rows.length}`);
  
  if (res.rows.length > 0) {
    const columns = Object.keys(res.rows[0]);
    console.log("Columns in pages table:", columns);
    
    // Print home page row (usually exists)
    const home = res.rows.find(r => r.slug === 'home');
    if (home) {
      console.log("\n--- Home Page Row ---");
      columns.forEach(col => {
        if (col !== 'puck_data') {
          console.log(`${col}:`, home[col]);
        }
      });
    }
    
    // Print blogs page row
    const blogs = res.rows.find(r => r.slug === 'blogs');
    if (blogs) {
      console.log("\n--- Blogs Page Row ---");
      columns.forEach(col => {
        if (col !== 'puck_data') {
          console.log(`${col}:`, blogs[col]);
        }
      });
    }
  }
  
  await client.end();
}

run().catch(console.error);
