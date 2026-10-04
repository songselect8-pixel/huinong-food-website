// Next 16.3.6 export uses Windows separators in segment filenames, while the
// client requests dot-separated names. Add matching aliases without editing Next.
const fs = require('node:fs');
const path = require('node:path');
function walk(directory) {
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}
let copied = 0;
for (const source of walk(process.argv[2] || 'out')) {
  const parts = source.split(path.sep);
  const start = parts.findIndex(part => part.startsWith('__next.'));
  if (start < 0 || start === parts.length - 1 || !source.endsWith('.txt')) continue;
  const target = path.join(...parts.slice(0, start), parts.slice(start).join('.'));
  fs.copyFileSync(source, target);
  if (!fs.readFileSync(source).equals(fs.readFileSync(target))) throw new Error('Static segment alias mismatch');
  copied++;
}
console.log(`Static segment aliases verified: ${copied}`);
