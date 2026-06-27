async function main() {
  try {
    const res = await fetch('http://localhost:3000/blogs');
    const html = await res.text();
    
    // Search for the grid SVG
    const match = html.match(/<svg[^>]*class="[^"]*grid-bg[^"]*"[^>]*>([\s\S]*?)<\/svg>/i) || 
                  html.match(/<svg[^>]*class="[^"]*grid[^"]*"[^>]*>([\s\S]*?)<\/svg>/i);
    
    if (match) {
      console.log("Found grid SVG:");
      console.log(match[0]);
    } else {
      console.log("Grid SVG not found in HTML!");
      // Let's print all SVGs in the hero section to see what is there
      const heroMatch = html.match(/<section[^>]*class="[^"]*hero[^"]*"[^>]*>([\s\S]*?)<\/section>/i);
      if (heroMatch) {
        console.log("Hero section content:");
        console.log(heroMatch[0].match(/<svg[\s\S]*?<\/svg>/g));
      }
    }
  } catch (e) {
    console.error(e);
  }
}

main();
