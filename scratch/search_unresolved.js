import fs from 'fs';
import path from 'path';

function searchDirectory(dir) {
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        searchDirectory(fullPath);
      } else if (stat.isFile() && (file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.html') || file.endsWith('.json') || file.endsWith('.mjs'))) {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes('body[unresolved]') || content.includes('opacity ease-in 0.2s')) {
          console.log(`FOUND in: ${fullPath}`);
        }
      }
    }
  } catch (err) {
    // Ignore errors for unreadable dirs/files
  }
}

searchDirectory('./node_modules');
console.log('Search finished.');
