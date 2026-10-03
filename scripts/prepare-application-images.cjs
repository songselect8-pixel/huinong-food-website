// Lossless original archive + format conversion only; never crop or recolour generated content.
const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const sharp = require('sharp');

(async () => {
  const manifestPath = path.resolve('docs/application-image-manifest.json');
  const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
  let generated;
  try { generated = JSON.parse((await fs.readFile('docs/application-generated-paths.json', 'utf8')).replace(/^\uFEFF/, '')); }
  catch (error) { if (error.code !== 'ENOENT') throw error; generated = manifest.assets.filter(asset => asset.generatedPath); }
  for (const item of generated) {
    const asset = manifest.assets.find(asset => asset.id === item.id);
    if (!asset) throw new Error(`Unknown application asset: ${item.id}`);
    const original = path.resolve(asset.originalArchivePath);
    const output = path.resolve('public', asset.publicPath.replace(/^\//, ''));
    await fs.mkdir(path.dirname(original), {recursive:true});
    await fs.mkdir(path.dirname(output), {recursive:true});
    await fs.copyFile(item.generatedPath, original);
    await sharp(original).webp({quality:90, effort:6}).toFile(output);
    const {width,height} = await sharp(output).metadata();
    const data = await fs.readFile(output);
    Object.assign(asset, {generatedPath:item.generatedPath, prompt:item.prompt ?? asset.prompt, visualReview:item.visualReview ?? asset.visualReview, previousAttempts:item.previousAttempts ?? asset.previousAttempts, width, height, bytes:data.length, sha256:crypto.createHash('sha256').update(data).digest('hex'), status:'generated-and-integrated'});
  }
  await fs.writeFile(manifestPath, JSON.stringify(manifest,null,2)+'\n');
  process.stdout.write(JSON.stringify(manifest.assets.map(({id,status,width,height}) => ({id,status,width,height})),null,2));
})().catch(error => { console.error(error.message); process.exitCode=1; });
