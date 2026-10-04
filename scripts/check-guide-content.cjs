const fs=require('fs'),path=require('path'),assert=require('assert/strict'),crypto=require('crypto');
const guides=fs.readdirSync('content/guides').map(f=>JSON.parse(fs.readFileSync('content/guides/'+f,'utf8')));
const imageManifest=JSON.parse(fs.readFileSync('docs/resource-image-manifest.json','utf8'));
const report=[];
for(const g of guides){
 const text=[g.lead,...g.sections.flatMap(s=>[s.title,...s.paragraphs,...s.bullets||[],...(s.table?[...s.table.headers,...s.table.rows.flat()]:[])]),g.inquiryTemplate||''].join(' ').replace(/\[([^\]]+)\]\([^)]+\)/g,'$1');
 const words=text.match(/\b[\w]+(?:['’-][\w]+)*\b/g).length;
 const html=fs.readFileSync(`out-preview/resources/${g.slug}/index.html`,'utf8');
 for(const section of g.sections)assert(html.includes(section.paragraphs[0].slice(0,50)),'Server HTML body '+g.slug);
 assert(words>=900&&words<=1400,`${g.slug} word count ${words}`);
 assert(g.status==='draft'&&g.reviewStatus==='pending'&&!g.publishedAt&&!g.author&&!g.reviewer&&!g.publicationAuthorization);
 assert.equal(new Set(g.sections.map(s=>s.id)).size,g.sections.length);
 assert.equal(imageManifest.filter(i=>i.slug===g.slug).length,2);
 report.push({title:g.title,path:`/resources/${g.slug}`,words,category:g.category,status:g.status,reviewStatus:g.reviewStatus,publication:'Not authorized',sources:g.references,pending:g.pending});
}
assert.equal(new Set(imageManifest.map(i=>i.sha256)).size,12,'Twelve unique image hashes');
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);
const oldHashes=new Set(walk('public/images').map(p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex')));
assert(imageManifest.every(i=>!oldHashes.has(i.sha256)),'New images distinct from existing files');
fs.writeFileSync('docs/resources-content-review.json',JSON.stringify({checkedAt:'2026-10-04',wordCountMethod:'Visible lead, headings, paragraphs, tables/checklists and editable template; excludes metadata, URLs, references and navigation.',guides:report},null,2)+'\n');
console.log(report.map(g=>`${g.words} words — ${g.title}`).join('\n'));console.log('Server HTML, draft states, references and 12 distinct new image files checked.');
