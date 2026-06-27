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
      } else if (stat.isFile() && (file.endsWith('.scss') || file.endsWith('.sass') || file.endsWith('.ts') || file.endsWith('.tsx'))) {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes('unresolved') || content.includes('opacity ease-in 0.2s')) {
          console.log(`FOUND in: ${fullPath}`);
        }
      }
    }
  } catch (err) {
    // Ignore
  }
}

searchDirectory('./node_modules');
console.log('Search finished.');
