// Run with playwright-cli run-code --filename scripts/review-buyer-content.js.
// Uses synthetic details; reports no personal values and makes no form transmission.
async page => {
  const base = 'http://127.0.0.1:4186', shots = 'output/playwright/buyer-content';
  const results = [], errors = [], failed = [], writes = [];
  const assert = (value, message) => { if (!value) throw Error(message); };
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => {if (response.status() >= 400 && response.url().startsWith(base)) failed.push(response.url().split('?')[0]);});
  page.on('request', request => {if (!['GET','HEAD'].includes(request.method())) writes.push(request.method());});
  const ready = async () => {
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.race([Promise.all([...document.images].map(img => {img.loading='eager'; return img.decode().catch(()=>{});})),new Promise(resolve=>setTimeout(resolve,4000))]);
    });
    await page.waitForTimeout(800);
  };
  const go = async path => {const response=await page.goto(base+path); assert(response.status()===200,'Route failed: '+path); await ready();};
  const width = async () => assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Horizontal overflow: '+page.url());
  const summary = () => page.locator('.inquiry-summary');
  const contact = async () => {await page.waitForURL(url=>url.pathname==='/contact/',{timeout:10000}); await ready();};
  const readable = async () => assert(await page.locator('main h1, main h2, main h3, main p').evaluateAll(nodes => nodes.every(node => {
    if (!node.getClientRects().length || node.closest('[inert],[aria-hidden="true"]')) return true;
    for(let current=node; current && current!==document.body; current=current.parentElement) if (+getComputedStyle(current).opacity < .99) return false;
    return true;
  })),'Faded text: '+page.url());
  await page.setViewportSize({width:1440,height:1000});
  await go('/contact/');
  await page.getByRole('button',{name:'Preview Inquiry',exact:true}).click();
  assert(await page.locator('.field-error').count()===3,'Required fields');
  await page.locator('[name="name"]').fill('QA Preview');
  await page.locator('[name="email"]').fill('qa@example.invalid');
  await page.locator('[name="message"]').fill('Synthetic buyer brief for local verification.');
  await page.locator('.primary-nav').getByRole('link',{name:'Products',exact:true}).click();
  await page.waitForURL('**/products/'); await ready();
  assert(await page.locator('.catalog-card').count()===9,'Nine product cards');
  assert(await page.locator('.catalog-grid').evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(' ').length)===3,'Three-column catalogue retained');
  await page.locator('.catalog-card').filter({hasText:'Dried Lemon Slices'}).getByRole('link',{name:'View Product',exact:true}).click(); await ready();
  await page.locator('.pd-option').first().click();
  await page.locator('.pd-sample-brief input').first().check();
  const chosen = await page.locator('.pd-option.is-selected strong').innerText();
  const criterion = await page.locator('.pd-sample-brief label').first().innerText();
  await page.getByRole('button',{name:'Discuss a Sample',exact:true}).click(); await contact();
  assert(await page.locator('[name="inquiryType"]:checked').inputValue()==='sample','Sample inquiry type');
  assert((await summary().innerText()).includes(criterion),'Evaluation prefill');
  assert((await summary().innerText()).includes(chosen),'Form prefill');
  assert((await summary().innerText()).includes('/products/dried-lemon-slices'),'Source prefill');
  assert((await page.locator('[name="message"]').inputValue()).startsWith('Synthetic buyer'),'Existing message retained');
  assert(!page.url().includes('qa')&&!page.url().includes('Synthetic'),'No personal URL data');
  await page.getByRole('button',{name:'Edit details',exact:true}).click();
  await page.locator('[name="quantity"]').fill('2');
  await page.locator('[name="unit"]').selectOption('kg');
  await page.getByRole('button',{name:'Preview Inquiry',exact:true}).click();
  assert(await page.locator('.inquiry-preview').isVisible(),'Preview');
  await page.context().grantPermissions(['clipboard-read','clipboard-write']);
  await page.getByRole('button',{name:'Copy Inquiry',exact:true}).click();
  await page.waitForFunction(()=>document.querySelector('.inquiry-export-status')?.textContent.startsWith('Copied'));
  assert((await page.locator('.inquiry-export-status').innerText()).startsWith('Copied'),'Clipboard success feedback');
  const copied=await page.evaluate(()=>navigator.clipboard.readText());
  assert(copied.includes('Sample Discussion')&&copied.includes(criterion)&&copied.includes('Local draft — not sent'),'Clipboard context');
  const downloadPromise=page.waitForEvent('download');
  await page.getByRole('button',{name:'Download Draft',exact:true}).click();
  const download=await downloadPromise;
  assert(download.suggestedFilename()==='frunoria-inquiry-draft.txt','Download name');
  const stream=await download.createReadStream(); let downloaded=''; for await(const part of stream) downloaded+=part.toString();
  assert(downloaded.replace(/\r\n/g,'\n')===copied.replace(/\r\n/g,'\n'),'Downloaded draft matches copied preview');
  assert(await page.evaluate(()=>localStorage.length===0&&sessionStorage.length===0),'No persistent browser storage');
  await page.getByRole('button',{name:'Back to Edit'}).click();
  await page.getByRole('button',{name:'Remove product',exact:true}).click();
  assert(await page.locator('[name="sampleFocus"]').inputValue()==='','Product removal clears dependent sample criteria');
  await page.getByRole('button',{name:'Clear this draft',exact:true}).click();
  results.push('Sample handoff retains product/form/source/message; preview/copy/download agree; dependent sample data clears; no storage');

  const products=['dried-lemon-slices','dried-orange-slices','iqf-frozen-raspberries','iqf-frozen-blueberries','dried-rose-flowers','raspberry-leaf-tea','chrysanthemum-honeysuckle-goji-blend','lemon-passion-fruit-orange-infusion','cassia-goji-chrysanthemum-tea-bags'];
  const uniqueChecklists=[];
  for(const id of products){
    await go('/products/'+id+'/'); await width(); await readable();
    assert(await page.locator('.pd-sample-brief input').count()===3,'Three sample topics: '+id);
    uniqueChecklists.push(await page.locator('.pd-sample-brief fieldset').innerText());
    assert(await page.locator('.pd-logistics-grid article').count()===3,'Packing topics: '+id);
    assert(await page.locator('.pd-gallery-thumbs button').count()===3,'Existing gallery: '+id);
    await page.locator('.pd-sample-brief input').nth(1).check();
    await page.getByRole('button',{name:'Discuss a Sample',exact:true}).click(); await contact();
    assert(await page.locator('select[name="product"]').inputValue()===id,'Correct sample product: '+id);
    assert((await summary().innerText()).includes('/products/'+id),'Correct sample source: '+id);
  }
  assert(new Set(uniqueChecklists).size===9,'Product checklists are distinct');
  results.push('All nine product pages: unique sample checklists, packing content, galleries and correct sample inquiry');

  for(const id of ['tea-infusion-blends','beverage-garnishes','bakery-fruit-preparations','dairy-frozen-desserts']){
    await go('/applications/'+id+'/');
    const application=await page.locator('h1').innerText();
    const productId=await page.locator('[name="applicationProduct"] option').nth(1).getAttribute('value');
    await page.locator('[name="applicationProduct"]').selectOption(productId);
    await page.locator('.ap-brief-extra summary').click();
    await page.locator('[name="applicationPackaging"]').fill('Trial pack brief');
    await page.locator('[name="applicationDocuments"]').fill('Product specification and relevant lot report');
    await page.locator('.ap-trial-options input').first().check();
    const trial=await page.locator('.ap-trial-options label').first().innerText();
    await width();
    await page.getByRole('button',{name:'Continue to Inquiry',exact:true}).click(); await contact();
    const text=await summary().innerText();
    assert(text.includes(application)&&text.includes(trial)&&text.includes('Trial pack brief')&&text.includes('relevant lot report'),'Application trial context: '+id);
    assert(await page.locator('select[name="product"]').inputValue()===productId,'Application product');
  }
  results.push('Four application briefs retain product, application, packaging, documents and selected trial topics');

  await go('/quality/');
  assert(await page.locator('.q-cert-card').count()===4,'Four certification topics retained');
  assert(await page.locator('.q-cert-card a[download]').count()===0,'No unsupported certificate download');
  await page.getByRole('tab',{name:'Dried Fruits',exact:true}).click();
  await page.locator('.q-document-panel:not([inert]) details').nth(1).locator('summary').click();
  assert(await page.locator('.q-document-panel:not([inert]) details').nth(1).getAttribute('open')!==null,'Document expansion');
  await page.getByRole('button',{name:'Request HACCP certification information',exact:true}).click();
  await page.locator('#request-product').selectOption('iqf-frozen-raspberries');
  await page.locator('#request-market').selectOption('eu');
  await page.locator('input[name="document"][value="testing"]').check();
  await page.locator('#documentation-request-form').getByRole('button',{name:'Request Documentation',exact:true}).click(); await contact();
  assert((await summary().innerText()).includes('HACCP')&&(await summary().innerText()).includes('Testing Documentation'),'Quality document context');
  assert((await summary().innerText()).includes('European'),'Market context');
  assert(!(await summary().innerText()).includes('Trial pack brief'),'No unrelated old application criteria');
  results.push('Quality document tabs, expansion and product/certificate/testing/market request work; no fake downloads');

  await go('/resources/');
  assert(await page.locator('.guide-card').count()===6,'Six local draft guides preserved');
  const checklistPromise=page.waitForEvent('download');
  await page.getByRole('link',{name:'Download Sourcing Checklist',exact:true}).click();
  const checklist=await checklistPromise;assert(checklist.suggestedFilename()==='frunoria-sourcing-checklist.txt','Real checklist download');
  await page.locator('.sourcing-directory summary').click();
  assert(await page.locator('.sourcing-directory li a').count()===9,'Nine quick-reference links');
  await page.locator('.sourcing-directory a').filter({hasText:'Dried Rose Flowers'}).click();await ready();
  assert(page.url().includes('/products/dried-rose-flowers/'),'Reference product link');
  results.push('Resources: six gated draft guides, working checklist download and nine product-reference links');

  for(const viewport of [{width:1440,height:1000},{width:1920,height:1080},{width:390,height:844}]){
    await page.setViewportSize(viewport);
    await page.emulateMedia({reducedMotion:viewport.width===390?'reduce':'no-preference'});
    for(const path of ['/resources/','/products/dried-lemon-slices/','/private-label/','/quality/','/contact/','/about/','/applications/dairy-frozen-desserts/']){
      await go(path); await width(); await readable();
      if(path==='/private-label/'){
        assert(await page.locator('.pl-workflow-list li').count()===6,'Single six-step workflow');
        await page.locator('.pl-buyer-faq details').first().locator('summary').click();
        assert(await page.locator('.pl-buyer-faq details').first().getAttribute('open')!==null,'Private Label FAQ');
      }
      if(viewport.width!==1920){
        const label=path==='/'?'home':path.split('/').filter(Boolean).join('-');
        if(path==='/products/dried-lemon-slices/') {await page.locator('#sample-review').scrollIntoViewIfNeeded();await ready();await page.screenshot({path:shots+'/sample-'+viewport.width+'.png'});}
        else if(path==='/private-label/') {await page.locator('.pl-buyer-faq').scrollIntoViewIfNeeded();await ready();await page.screenshot({path:shots+'/private-label-'+viewport.width+'.png'});}
        else await page.screenshot({path:shots+'/'+label+'-'+viewport.width+'.png',fullPage:true});
      }
    }
    results.push(viewport.width+'px: seven updated page types without horizontal overflow or faded text'+(viewport.width===390?'; reduced motion':'') );
  }
  await page.setViewportSize({width:390,height:844});
  await go('/products/iqf-frozen-raspberries/');
  await page.locator('.pd-gallery-thumbs button').nth(2).click();
  await page.locator('.pd-sample-brief input').first().check();
  await page.getByRole('button',{name:'Discuss a Sample',exact:true}).click();await contact();
  await page.getByRole('button',{name:'Edit details',exact:true}).click();await width();
  assert(await page.locator('[name="coldChain"]').isVisible(),'Frozen sample cold-chain field');
  await page.screenshot({path:shots+'/sample-inquiry-mobile.png',fullPage:true});
  await page.getByRole('button',{name:'Clear this draft',exact:true}).click();
  assert(!errors.length,'Browser errors: '+errors.join('; '));assert(!failed.length,'Failed requests: '+failed.join('; '));assert(!writes.length,'Unexpected request transmission');
  return {results,errors,failedRequests:failed,nonGetRequests:writes};
}
