import fs from 'fs';

const content = fs.readFileSync('C:\\Users\\user\\Desktop\\questionn\\puck-editor\\src\\puck\\config.tsx', 'utf8');
const lines = content.split('\n');

console.log("Searching for Link in config.tsx...");
lines.forEach((line, idx) => {
  if (line.includes('import ') && line.includes('Link')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
