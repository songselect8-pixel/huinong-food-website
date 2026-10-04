// Run with the installed playwright-cli after building and serving out/ on localhost:4173.
async (page) => {
  const base = 'http://localhost:4173';
  const shots = 'C:/Users/XuWanPi/Pictures/Screenshots/FRUNORIA-applications';
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const assert = (value, message) => { if (!value) throw new Error(message); };
  const ready = async () => {
    await page.evaluate(async () => {await document.fonts.ready; await Promise.all([...document.images].map(image => {image.loading='eager'; return image.decode().catch(()=>{});}));});
    assert(await page.locator('img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0)), 'Broken image');
    await page.waitForTimeout(750);
  };
  const navigate = async path => { const response = await page.goto(base+path); assert(response.status()===200,`Missing route: ${path}`); await ready(); };
  const widthOK = async () => assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Horizontal overflow');
  const textOK = async () => assert(await page.locator('main h1,main h2,main h3,main p').evaluateAll(nodes=>nodes.every(node=>{
    if (!node.getClientRects().length || getComputedStyle(node).visibility==='hidden') return true;
    const range=document.createRange();range.selectNodeContents(node);const text=range.getBoundingClientRect();
    for(let parent=node;parent&&parent!==document.body;parent=parent.parentElement){
      const style=getComputedStyle(parent),box=parent.getBoundingClientRect();
      if(+style.opacity<.99)return false;
      if(['hidden','clip'].includes(style.overflowY)&&(text.top<box.top-1||text.bottom>box.bottom+1))return false;
    }return true;
  })),'Faded or vertically clipped text');
  const topShot = async (name,full=true) => {await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(400);if(full)await page.screenshot({path:`${shots}/${name}-full.png`,fullPage:true});await page.screenshot({path:`${shots}/${name}-top.png`});};
  const sectionShot = async (selector,name) => {await page.locator(selector).evaluate(el=>scrollTo({top:el.getBoundingClientRect().top+scrollY-105,behavior:'instant'}));await page.waitForTimeout(500);await page.screenshot({path:`${shots}/${name}.png`});};
  const expected = [
    {id:'tea-infusion-blends',name:'Tea & Infusion Blends',count:7,product:'raspberry-leaf-tea',productName:'Raspberry Leaf Tea'},
    {id:'beverage-garnishes',name:'Beverage Garnishes',count:2,product:'dried-orange-slices',productName:'Dried Orange Slices'},
    {id:'bakery-fruit-preparations',name:'Bakery & Fruit Preparations',count:2,product:'iqf-frozen-raspberries',productName:'IQF Frozen Raspberries'},
    {id:'dairy-frozen-desserts',name:'Dairy & Frozen Desserts',count:2,product:'iqf-frozen-blueberries',productName:'IQF Frozen Blueberries'},
  ];
  await page.setViewportSize({width:1440,height:1000});
  await navigate('/applications/');
  assert(await page.title()==='Applications | FRUNORIA','Wrong overview title');
  assert(await page.locator('.ap-range-card').count()===4,'Expected four application cards');
  assert(await page.locator('.ap-range-grid').evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(' ').length)===2,'Overview is not a two-column grid');
  const cardImages=await page.locator('.ap-range-image img').evaluateAll(images=>images.map(img=>img.getAttribute('src')));
  const overviewImage=await page.locator('.ap-overview-visual img').getAttribute('src');
  assert(new Set([...cardImages,overviewImage]).size===5,'Repeated overview images');
  assert(await page.getByText('Application Concept',{exact:true}).count()===5,'Overview image labels missing');
  for(const [index,card] of (await page.locator('.ap-range-card').all()).entries()) {
    const hrefs=await card.locator('a').evaluateAll(nodes=>nodes.map(node=>node.getAttribute('href')));
    assert(hrefs.length===3&&hrefs.every(href=>href===`/applications/${expected[index].id}`),'Image, title and CTA route mismatch');
  }
  await page.getByRole('link',{name:/Explore Applications/}).click();
  assert(new URL(page.url()).hash==='#application-ranges','Overview anchor failed');
  await widthOK();await textOK();await topShot('applications-desktop');
  await sectionShot('#application-ranges','applications-desktop-ranges');

  const detailResults=[],heroImages=[],descriptions=[],allProductPaths=new Set();
  for(const item of expected) {
    await navigate('/applications/');
    await page.locator(`.ap-range-card a[href="/applications/${item.id}"]`).last().click();await ready();
    assert(await page.locator('h1').innerText()===item.name,'Wrong application title');
    for(const id of ['ingredient-forms','related-products','selection','documents','faq','application-inquiry']) assert(await page.locator(`#${id}`).count()===1,`Missing ${id}`);
    assert(await page.locator('.ap-form-grid article').count()===3&&await page.locator('.ap-check-list > div').count()===4,'Incomplete forms/checks');
    descriptions.push(await page.locator('.ap-detail-copy > p').innerText());
    heroImages.push(await page.locator('.ap-detail-visual img').getAttribute('src'));
    assert(await page.locator('.ap-detail-visual figcaption').textContent()==='Application Concept','Detail concept label missing');
    const cards=await page.locator('.ap-product-card').evaluateAll(nodes=>nodes.map(node=>({hrefs:[...node.querySelectorAll('a')].map(a=>a.getAttribute('href')),image:node.querySelector('img').getAttribute('src')})));
    assert(cards.length===item.count,'Wrong related product count');
    for(const card of cards){assert(card.hrefs.length===3&&card.hrefs.every(href=>href===card.hrefs[0]),'Related product links inconsistent');assert(card.image.startsWith('/images/products/v2/'),'Wrong related product imagery');allProductPaths.add(card.hrefs[0]);}
    if(item.id==='beverage-garnishes')assert(cards.every(card=>card.hrefs[0].includes('dried-')),'Berry incorrectly assigned to garnish guide');
    if(['bakery-fruit-preparations','dairy-frozen-desserts'].includes(item.id))assert(cards.every(card=>card.hrefs[0].includes('iqf-frozen-')),'Wrong frozen application products');
    for(const faq of await page.locator('.ap-faq-list details').all()) {
      await faq.locator('summary').click();assert(await faq.locator('p').isVisible(),'FAQ did not expand');
      assert((await faq.locator('p').innerText()).length>80,'Empty FAQ');
      await faq.locator('summary').click();assert(!await faq.locator('p').isVisible(),'FAQ did not collapse');
    }
    assert(await page.locator('.ap-faq-list details').count()===4,'Expected four FAQs');
    await widthOK();await textOK();await topShot(`${item.id}-desktop`);
    await sectionShot('#selection',`${item.id}-selection`);
    await page.locator('#documents a[href="/quality"]').click();await page.locator('.q-page').waitFor();
    assert(await page.locator('main a[download]').count()===0,'Unexpected Quality download');
    await navigate(`/applications/${item.id}/`);
    await page.locator('select[name="applicationProduct"]').selectOption(item.product);
    await page.locator('.ap-brief-extra summary').click();
    const packaging=`Discuss the ${item.name} pack and handling format.`;
    const documents=`Review the ${item.productName} specification and relevant document scope.`;
    await page.locator('textarea[name="applicationPackaging"]').fill(packaging);
    await page.locator('textarea[name="applicationDocuments"]').fill(documents);
    // Editing, collapsing and reopening optional fields retains the brief.
    await page.locator('.ap-brief-extra summary').click();await page.locator('.ap-brief-extra summary').click();
    assert(await page.locator('textarea[name="applicationPackaging"]').inputValue()===packaging,'Optional brief not retained');
    await page.getByRole('button',{name:/Continue to Inquiry/}).click();await page.locator('.form-context').waitFor();
    const context=await page.locator('input[name="briefContext"]').inputValue();
    for(const text of [item.name,item.productName,`Page source: /applications/${item.id}`,packaging,documents])assert(context.includes(text),`Missing inquiry context: ${text}`);
    assert(await page.locator('input[name="packagingRequest"]').inputValue()===packaging,'Packaging field not prefilled');
    assert(await page.locator('input[name="documentRequest"]').inputValue()===documents,'Document field not prefilled');
    if(item.id==='bakery-fruit-preparations') {
      await sectionShot('.quote-form','application-inquiry-prefill-desktop');
      await page.locator('input[name="name"]').fill('Application QA');await page.locator('input[name="email"]').fill('qa@example.com');
      await page.locator('input[name="company"]').fill('Local Preview');await page.locator('textarea[name="message"]').fill('Application inquiry development preview check.');
      await page.getByRole('button',{name:/Preview Request/}).click();
      assert((await page.locator('.form-feedback').innerText()).includes('has not been sent'),'False sent status');
      await page.getByRole('button',{name:'Remove added inquiry details'}).click();
      for(const name of ['briefContext','packagingRequest','documentRequest'])assert(await page.locator(`input[name="${name}"]`).inputValue()==='','Removal incomplete');
    }
    detailResults.push({path:`/applications/${item.id}`,relatedProducts:cards.length,faq:4,prefill:'application + product + source + packaging + documents passed'});
  }
  assert(new Set([...cardImages,overviewImage,...heroImages]).size===9,'Not nine independently wired application images');
  assert(new Set(descriptions).size===4,'Repeated application copy');
  for(const path of allProductPaths){await navigate(path);assert(await page.locator('.pd-page').count()===1,'Related product is not a complete detail route');}

  // Overview brief validates application, clears incompatible selections and preserves its own source.
  await navigate('/applications/');
  await page.getByRole('button',{name:/Continue to Inquiry/}).click();
  assert(new URL(page.url()).pathname==='/applications/','Empty application accepted');
  await page.locator('select[name="application"]').selectOption('tea-infusion-blends');
  await page.locator('select[name="applicationProduct"]').selectOption('dried-rose-flowers');
  await page.locator('select[name="application"]').selectOption('dairy-frozen-desserts');
  assert(await page.locator('select[name="applicationProduct"]').inputValue()==='','Incompatible product not cleared');
  assert(await page.locator('select[name="applicationProduct"] option').count()===3,'Product options not scoped to application');
  await page.getByRole('button',{name:/Continue to Inquiry/}).click();await page.locator('.form-context').waitFor();
  const general=await page.locator('input[name="briefContext"]').inputValue();
  assert(general.includes('Product: To be discussed')&&general.includes('Page source: /applications'),'No-product overview inquiry incorrect');
  assert(await page.locator('select[name="interest"]').inputValue()==='Not sure yet','No-product category fallback incorrect');
  await page.goto(base+'/?source=application&application=beverage-garnishes&product=iqf-frozen-blueberries&packaging='+encodeURIComponent('x'.repeat(400))+'&documents='+encodeURIComponent('<untrusted-value>\n'+'y'.repeat(400))+'#quote');
  await page.locator('.form-context').waitFor();
  assert(!(await page.locator('input[name="briefContext"]').inputValue()).includes('Blueberries'),'Unrelated product accepted');
  assert((await page.locator('input[name="packagingRequest"]').inputValue()).length===250&&(await page.locator('input[name="documentRequest"]').inputValue()).length===300,'Query limits not applied');
  assert(await page.locator('untrusted-value').count()===0,'Untrusted text parsed as HTML');
  await page.goto(base+'/?source=application&application=untrusted-application&product=dried-lemon-slices#quote');
  await page.locator('.form-context').waitFor();
  assert(!(await page.locator('input[name="briefContext"]').inputValue()).includes('Application:'),'Invalid application accepted');

  // Existing home module keeps its three tabs and sends each entry to the corresponding guide.
  await navigate('/');
  assert(await page.locator('header a[href="/applications"]').count()===1&&await page.locator('footer a[href="/applications"]').count()===1,'Navigation not connected');
  for(let index=0;index<3;index++) {
    await page.locator('.application-tab').nth(index).click();await page.waitForTimeout(450);
    const href=await page.locator('.application-detail.is-active > a.button').getAttribute('href');
    assert(href===`/applications/${expected[index].id}`,'Home application route mismatch');
    await page.locator('.application-detail.is-active > a.button').click();await page.locator('.ap-detail').waitFor();
    await navigate('/');
  }
  await page.locator('header a[href="/applications"]').click();await page.locator('.ap-overview').waitFor();

  const responsive=[];
  for(const width of [1920,900,390]) {
    await page.setViewportSize({width,height:width===390?844:1000});await navigate('/applications/');await widthOK();await textOK();
    if(width===390) {
      assert(await page.locator('.ap-range-grid').evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(' ').length)===1,'Mobile cards are not stacked');
      await topShot('applications-mobile');
      await page.getByRole('button',{name:'Open menu',exact:true}).click();await page.locator('#primary-navigation a[href="/applications"]').click();await page.locator('.ap-overview').waitFor();
      for(const item of expected) {
        await navigate(`/applications/${item.id}/`);await widthOK();await textOK();
        assert(await page.locator('.ap-detail-visual img').evaluate(img=>{const r=img.getBoundingClientRect();return getComputedStyle(img).objectFit==='contain'&&Math.abs(r.width/r.height-img.naturalWidth/img.naturalHeight)<.02;}),'Mobile hero stretched or cropped');
        if(['tea-infusion-blends','bakery-fruit-preparations'].includes(item.id))await topShot(`${item.id}-mobile`);
        await page.locator('.ap-faq-list summary').first().click();assert(await page.locator('.ap-faq-list details').first().locator('p').isVisible(),'Mobile FAQ failed');
        await page.locator('select[name="applicationProduct"]').selectOption(item.product);
        await page.locator('.ap-brief-extra summary').click();await page.locator('textarea[name="applicationPackaging"]').fill('Discuss portioning and packing');await page.locator('textarea[name="applicationDocuments"]').fill('Request product specification');
        if(item.id==='bakery-fruit-preparations')await sectionShot('#application-inquiry','application-mobile-brief');
        await page.getByRole('button',{name:/Continue to Inquiry/}).click();await page.locator('.form-context').waitFor();
        assert((await page.locator('input[name="briefContext"]').inputValue()).includes(item.productName),'Mobile product prefill missing');await widthOK();
        if(item.id==='bakery-fruit-preparations')await sectionShot('.quote-form','application-mobile-prefill');
      }
    } else {for(const item of expected){await navigate(`/applications/${item.id}/`);await widthOK();await textOK();}}
    responsive.push({width,overview:'passed',details:4,overflow:false});
  }
  await page.emulateMedia({reducedMotion:'reduce'});
  await navigate('/applications/');await textOK();
  await page.locator('.ap-range-card a').first().click();await ready();await textOK();
  await page.locator('.ap-faq-list summary').first().click();assert(await page.locator('.ap-faq-list details').first().locator('p').isVisible(),'Reduced-motion FAQ failed');
  await page.emulateMedia({reducedMotion:'no-preference'});
  assert(errors.length===0,errors.join('; '));
  return {desktop:'1440x1000',images:9,overview:'2x2 cards, working image/title/CTA links',detailResults,relatedProductRoutesChecked:allProductPaths.size,inquiry:'4 detail handoffs + overview, optional requirements retained, query validation, preview-only status',homeEntries:3,responsive,reducedMotion:'passed',pageErrors:errors};
}
