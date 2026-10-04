const fs = require('node:fs');
const path = require('node:path');
const {spawnSync} = require('node:child_process');
const preview = process.argv.includes('--preview');
if (preview && process.env.CI) throw new Error('Local draft builds are prohibited in CI.');
const env = {...process.env};
if (preview) env.CONTENT_PREVIEW='local'; else delete env.CONTENT_PREVIEW;
const out = preview ? 'out-preview' : 'out';
function run(args){const result=spawnSync(process.execPath,args,{stdio:'inherit',env});if(result.status!==0)process.exit(result.status||1);}
run(['node_modules/next/dist/bin/next','build']);
run(['scripts/normalize-static-segments.cjs',out]);
// Next's required zero-content route is only a build sentinel. Remove its
// generated 404 artifacts so it cannot appear as a 200 response on static hosts.
const sentinel=path.resolve(out,'resources','__unpublished');
const exportRoot=path.resolve(out)+path.sep;
if(!sentinel.startsWith(exportRoot))throw new Error('Invalid export cleanup target');
if(fs.existsSync(sentinel))fs.rmSync(sentinel,{recursive:true});
const guides=fs.readdirSync('content/guides').filter(f=>f.endsWith('.json')).map(f=>JSON.parse(fs.readFileSync(path.join('content/guides',f),'utf8')));
for(const guide of guides){
  const published=guide.status==='published'&&guide.reviewStatus==='approved'&&guide.publishedAt&&guide.publicationAuthorization;
  if(!preview&&!published)continue;
  for(const role of ['cover','body']){
    const filename=`${guide.slug}-${role}.webp`;
    const source=path.join('content/images/resources',filename);
    if(!fs.existsSync(source))throw new Error(`Missing guide image: ${source}`);
    fs.mkdirSync(path.join(out,'guide-images'),{recursive:true});
    fs.copyFileSync(source,path.join(out,'guide-images',filename));
  }
}
if(!preview)run(['scripts/audit-guide-export.cjs']);
console.log(preview ? 'LOCAL PREVIEW ONLY: out-preview. Serve on 127.0.0.1; do not publish.' : 'Production export verified; unapproved guide content and assets excluded.');
