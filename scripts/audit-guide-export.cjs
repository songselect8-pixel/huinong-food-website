const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const guides=fs.readdirSync('content/guides').filter(f=>f.endsWith('.json')).map(f=>JSON.parse(fs.readFileSync(path.join('content/guides',f),'utf8')));
const drafts=guides.filter(g=>!(g.status==='published'&&g.reviewStatus==='approved'&&g.publishedAt&&g.publicationAuthorization));
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const files=walk('out');let scanned=0;
for(const file of files){
  for(const guide of drafts)assert(!file.includes(guide.slug),`Draft path/asset leaked: ${file}`);
  if(!/\.(html|txt|js|json|xml)$/i.test(file))continue;
  scanned++;const text=fs.readFileSync(file,'utf8');
  for(const guide of drafts){for(const marker of [guide.slug,guide.title,guide.lead.slice(0,85)])assert(!text.includes(marker),`Draft content leaked into ${file}: ${guide.slug}`);}
}
assert(fs.existsSync('out/resources/index.html'),'Public Resources landing missing');
console.log(`Draft export audit passed: ${drafts.length} unapproved guides excluded from ${scanned} HTML/RSC/JS/JSON/XML files and all exported asset paths.`);
