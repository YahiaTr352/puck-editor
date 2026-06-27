async function run() {
  try {
    const res = await fetch("http://localhost:3000/blogs");
    const html = await res.text();
    
    // Find all links containing class "blog-card-item"
    const regex = /href="\/blog-details\?slug=([^"]+)"[^>]*>([\s\S]*?<\/Link>|[\s\S]*?<\/a>)/g;
    let match;
    let count = 0;
    
    console.log("=== RENDERED BLOG CARDS ===");
    while ((match = regex.exec(html)) !== null) {
      count++;
      const slug = match[1];
      const cardContent = match[2];
      
      // Try to find the title inside the cardContent
      // The title is in a div/span with color: "rgb(232, 241, 238)" or similar style
      const titleMatch = cardContent.match(/rgb\(232,\s*241,\s*238\)"[^>]*>([^<]+)/);
      const title = titleMatch ? titleMatch[1].trim() : "Unknown Title";
      
      console.log(`${count}. Title: "${title}", Slug: "${slug}"`);
    }
  } catch (e) {
    console.error("Fetch failed:", e);
  }
}

run();
