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
      } else if (stat.isFile() && file.endsWith('.js')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes('customElements.define')) {
          const match = content.match(/customElements\.define\(['"][a-zA-Z0-9-]+['"]/g);
          if (match) {
            console.log(`FOUND in ${fullPath}: ${match.join(', ')}`);
          }
        }
      }
    }
  } catch (err) {
    // Ignore
  }
}

searchDirectory('./node_modules/next/dist');
console.log('Search finished.');
