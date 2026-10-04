async page => {
 const base='http://127.0.0.1:4174', results=[], errors=[], failed=[], writes=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failed.push({url:r.url(),status:r.status()});});page.on('request',r=>{if(!['GET','HEAD'].includes(r.method()))writes.push(r.method()+' '+r.url());});
 const check=(value,label)=>{if(!value)throw Error(label);};
 const ready=async()=>{await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>{});}));});await page.waitForTimeout(450);};
 const overflow=async()=>check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Page overflow');
 const gridCols=async()=>page.locator('.guide-grid').first().evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(' ').length);
 await page.setViewportSize({width:1440,height:1000});await page.goto(base+'/resources/');await ready();
 check(await page.locator('.guide-card').count()===6,'Six guides');check(await gridCols()===3,'Desktop three columns');
 await page.getByRole('button',{name:'Ingredient Guides',exact:true}).click();check(await page.locator('.guide-card').count()===4,'Ingredient category');
 await page.locator('#guide-search').fill('blueberries');check(await page.locator('.guide-card').count()===1,'Combined category and search');
 await page.getByRole('button',{name:'Private Label & Packaging',exact:true}).click();check(await page.locator('.guide-card').count()===0,'Combined empty result');check(await page.getByRole('heading',{name:'No guides match these filters.'}).isVisible(),'Empty state');
 await page.getByRole('button',{name:'Clear filters'}).click();check(await page.locator('.guide-card').count()===6,'Clear filters');
 await page.getByRole('button',{name:'Sourcing & Documentation',exact:true}).click();check(await page.locator('.guide-card').count()===1,'Documentation category');
 await page.getByRole('button',{name:'All Guides',exact:true}).click();await page.locator('.guide-chips button').first().focus();await page.keyboard.press('Tab');check(await page.evaluate(()=>getComputedStyle(document.activeElement).outlineStyle!=='none'),'Keyboard focus feedback');
 const guides=await page.locator('.guide-card h2 a').evaluateAll(links=>links.map(a=>({title:a.textContent,href:a.getAttribute('href')})));
 for(const [index,g] of guides.entries()){
  await page.goto(base+g.href);await ready();await overflow();
  check(await page.locator('h1').innerText()===g.title,'Guide heading '+g.href);
  check(await page.locator('h1').count()===1,'Unique H1');
  check(await page.locator('.guide-body').innerText().then(t=>t.split(/\s+/).length)>900,'Full body '+g.href);
  check(await page.locator('.guide-cover img').evaluate(i=>i.complete&&i.naturalWidth>0),'Cover loaded');check(await page.locator('.guide-body-image img').evaluate(i=>i.complete&&i.naturalWidth>0),'Body image loaded');
  const schema=await page.locator('script[type="application/ld+json"]').evaluate(el=>JSON.parse(el.textContent));
  const posting=schema['@graph'][0];check(posting.headline===g.title&&posting.creativeWorkStatus==='Draft','Draft schema');check(!posting.author&&!posting.datePublished&&!posting.dateModified,'No invented byline/date');
  check((await page.locator('meta[name="robots"]').getAttribute('content')).includes('noindex'),'Noindex');
  const internal=await page.locator('main a[href^="/"]').evaluateAll(links=>[...new Set(links.map(a=>a.getAttribute('href').split('#')[0]))]);
  for(const href of internal){const response=await page.request.get(base+href);check(response.ok(),'Internal link '+href);}
  const anchor=page.locator('.guide-toc nav a').nth(1);const target=await anchor.getAttribute('href');await anchor.click();await page.waitForTimeout(650);
  const top=await page.locator(target).evaluate(el=>el.getBoundingClientRect().top);check(top>=90&&top<160,'TOC sticky offset '+top);
  check(await page.locator('.guide-body h2,.guide-body p').evaluateAll(els=>els.every(el=>getComputedStyle(el).opacity==='1')),'Text fully opaque');
  await page.locator('#guide-product').selectOption({index:1});await page.locator('.guide-inquiry summary').click();await page.locator('.guide-inquiry input[type="checkbox"]').first().check();
  const selected=await page.locator('#guide-product option:checked').innerText();
  await page.getByRole('button',{name:'Discuss Your Sourcing Requirements',exact:true}).click();await page.waitForURL('**/contact/');await ready();
  const brief=await page.locator('.inquiry-summary').innerText();check(brief.includes(g.title)&&brief.includes(g.href.replace(/\/$/,''))&&brief.includes(selected)&&brief.includes('Product Specification'),'Article inquiry context '+g.href);
  check(!page.url().includes('?'),'Article handoff avoids query data');
  results.push({guide:g.href,body:'complete and opaque',metadata:'unique H1, noindex, draft schema without byline/dates',links:'all internal HTTP 200',toc:'visible below header',inquiry:'title/source/selected product/specification retained'});
 }
 // Existing text must survive a client navigation to a new article.
 await page.locator('textarea[name="message"]').fill('Synthetic existing project note — preserve this text.');
 await page.locator('.primary-nav a').filter({hasText:'Resources'}).click();await page.waitForURL('**/resources/');await page.locator('.guide-card h2 a').first().click();await ready();
 check(await page.locator('#guide-product').inputValue()==='','No forced product from another article');
 await page.getByRole('button',{name:'Discuss Your Sourcing Requirements',exact:true}).click();await page.waitForURL('**/contact/');
 check(await page.locator('textarea[name="message"]').inputValue()==='Synthetic existing project note — preserve this text.','Existing message retained');
 check(await page.locator('select[name="product"]').inputValue()==='','Unselected product not added');check(!await page.locator('.inquiry-summary').innerText().then(t=>t.includes('Product Specification')),'Unselected documents not added');
 await page.getByRole('button',{name:'Preview Inquiry',exact:true}).click();check(await page.locator('#error-name').isVisible()&&await page.locator('#error-email').isVisible(),'Required validation');
 await page.locator('input[name="name"]').fill('Preview QA');await page.locator('input[name="email"]').fill('qa@example.invalid');await page.getByRole('button',{name:'Preview Inquiry',exact:true}).click();check(await page.locator('.inquiry-preview').innerText().then(t=>t.includes('request has not been sent')&&t.includes(guides[0].title)),'Preview context');
 await page.getByRole('button',{name:'Back to Edit'}).click();await page.getByRole('button',{name:'Clear this draft',exact:true}).click();
 await page.goto(base+'/resources/ingredient-sourcing-inquiry/');await ready();
 const template=page.locator('#inquiry-template');await template.fill((await template.inputValue()).replace('[product name and form]','[Edited product brief]'));
 await page.context().grantPermissions(['clipboard-read','clipboard-write']);await page.getByRole('button',{name:'Copy template'}).click();
 check(await page.evaluate(()=>navigator.clipboard.readText()).then(t=>t.includes('[Edited product brief]')),'Edited template copied');
 await page.goto(base+'/resources/private-label-tea-packaging/');await ready();await page.screenshot({path:'output/playwright/resources/guide-packaging-desktop.png',fullPage:true});
 await page.locator('#planning-checklist').scrollIntoViewIfNeeded();await page.screenshot({path:'output/playwright/resources/guide-packaging-reading.png'});
 await page.setViewportSize({width:1920,height:1080});await page.goto(base+'/resources/');await ready();await overflow();check(await gridCols()===3,'1920 three columns');await page.screenshot({path:'output/playwright/resources/resources-1920.png',fullPage:true});
 await page.setViewportSize({width:900,height:1000});await overflow();check(await gridCols()===2,'Tablet two columns');
 await page.setViewportSize({width:390,height:844});await page.goto(base+'/resources/');await ready();await overflow();check(await gridCols()===1,'Mobile one column');
 await page.getByRole('button',{name:'Open menu',exact:true}).click();await page.locator('.primary-nav a').filter({hasText:'Resources'}).click();check(await page.getByRole('button',{name:'Open menu',exact:true}).isVisible(),'Mobile menu closes');
 await page.goto(base+'/resources/frozen-vs-freeze-dried-berries/');await ready();await overflow();await page.locator('.guide-mobile-toc summary').click();await page.locator('.guide-mobile-toc a[href="#comparison"]').click();await page.waitForTimeout(650);check(await page.locator('#comparison').evaluate(el=>el.getBoundingClientRect().top)>=80,'Mobile TOC');
 const table=page.locator('.guide-table-scroll');check(await table.evaluate(el=>el.scrollWidth>el.clientWidth),'Table internal scroll');await table.evaluate(el=>el.scrollLeft=120);check(await table.evaluate(el=>el.scrollLeft)>0,'Table scroll works');await overflow();await table.evaluate(el=>el.scrollLeft=0);
 await page.screenshot({path:'output/playwright/resources/guide-mobile-table.png'});await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:'output/playwright/resources/guide-berries-mobile.png',fullPage:true});
 await page.locator('#guide-product').selectOption('iqf-frozen-blueberries');await page.locator('.guide-inquiry summary').click();await page.locator('.guide-inquiry input[type="checkbox"]').nth(2).check();await page.getByRole('button',{name:'Discuss Your Sourcing Requirements',exact:true}).click();await page.waitForURL('**/contact/');await ready();await overflow();
 check(await page.locator('.inquiry-summary').innerText().then(t=>t.includes('IQF Frozen Blueberries')&&t.includes('Testing Documentation')),'Mobile inquiry');await page.screenshot({path:'output/playwright/resources/article-inquiry-mobile.png',fullPage:true});
 await page.getByRole('button',{name:'Clear this draft',exact:true}).click();
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto(base+'/resources/raspberry-leaf-tea-sourcing/');await ready();await overflow();check(await page.locator('.guide-body p').evaluateAll(els=>els.every(el=>getComputedStyle(el).opacity==='1')),'Reduced motion article readable');await page.locator('.guide-mobile-toc summary').click();check(await page.locator('.guide-mobile-toc nav a').first().isVisible(),'Reduced motion TOC');
 check(await page.evaluate(()=>localStorage.length===0&&sessionStorage.length===0),'No persistent personal storage');
 check(errors.length===0,'Browser page errors: '+errors.join(';'));check(failed.length===0,'HTTP failures: '+JSON.stringify(failed));check(writes.length===0,'Unexpected network writes');
 return {results,search:'combined categories, query, reset and empty state passed',viewports:'1440 / 1920: 3 columns; 900: 2; 390: 1; no document overflow',inquiry:'all six selected prefills; no auto-selection; existing message preserved; validation/preview/edit passed; mobile passed',template:'edited text copied to clipboard',reducedMotion:'complete visible text and functional mobile contents',errors,failed,writes};
}

