// Use the existing playwright-cli run-code command after building and serving out/ on 4173.
async (page) => {
  const base = 'http://localhost:4173';
  const shots = 'C:/Users/XuWanPi/Pictures/Screenshots/FRUNORIA-quality';
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const assert = (value, message) => { if (!value) throw new Error(message); };
  const ready = async () => {
    await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(img => { img.loading = 'eager'; return img.decode().catch(() => {}); })); });
    await page.waitForTimeout(350);
  };
  const overflowOK = async () => assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Horizontal overflow');
  const quality = async (query = '') => { const r = await page.goto(base + '/quality/' + query); assert(r.status() === 200, 'Quality route missing'); await ready(); };
  const shotSection = async (id, name) => {
    await page.locator(id).evaluate(el => scrollTo({top: el.getBoundingClientRect().top + scrollY - 102, behavior: 'instant'}));
    await page.waitForTimeout(500);
    await page.screenshot({path: `${shots}/${name}.png`});
  };
  const bodyClear = async () => assert(await page.locator('main h1, main h2, main p').evaluateAll(nodes => nodes.every(node => {
    if (!node.getClientRects().length || getComputedStyle(node).visibility === 'hidden') return true;
    for (let p = node; p && p !== document.body; p = p.parentElement) if (Number(getComputedStyle(p).opacity) < .99) return false;
    return true;
  })), 'Text remains faded');
  await page.setViewportSize({width:1440,height:1000});
  await quality();
  assert(await page.title() === 'Quality & Compliance | FRUNORIA', 'Incorrect title');
  for (const id of ['certifications','product-documents','markets','documentation-requests']) assert(await page.locator(`#${id}`).count() === 1, `Missing ${id}`);
  assert(await page.locator('main img, main a[download]').count() === 0, 'Unexpected image/download');
  assert(await page.locator('main form').count() === 1, 'Duplicate request form');
  assert(await page.locator('.q-cert-card').count() === 4, 'Missing certification records');
  for (const card of await page.locator('.q-cert-card').all()) {
    assert((await card.innerText()).includes('Holder and product scope awaiting verification'), 'Unsupported certification claim');
    assert((await card.innerText()).includes('Public copy not currently available'), 'File state lost');
    await card.locator('summary').click();
    assert(await card.locator('.q-cert-details dl > div').count() === 6, 'Incomplete certificate fields');
    assert(await card.getByText('Publication permission not confirmed').isVisible(), 'Missing public-access status');
    await card.locator('summary').click();
    assert(!await card.locator('.q-cert-details dl').isVisible(), 'Certificate will not collapse');
  }
  const tabResults = [];
  for (const [prefix, ids] of [['documents',['frozen','dried','botanical']], ['markets',['eu','us','gb','ca','jp']]]) {
    const heights = [];
    for (const id of ids) {
      await page.locator(`#${prefix}-tab-${id}`).click();
      const panel = page.locator(`#${prefix}-panel-${id}`);
      assert(await panel.isVisible(), `Missing active ${id}`);
      assert(await page.locator(`[id^="${prefix}-panel-"]:visible`).count() === 1, 'Multiple visible panels');
      assert(await page.locator(`[id^="${prefix}-panel-"][aria-hidden="true"]`).evaluateAll(nodes => nodes.every(n => n.inert)), 'Inactive panel is focusable');
      heights.push(await panel.evaluate(el => el.parentElement.getBoundingClientRect().height));
      if (prefix === 'documents') {
        const topics = panel.locator('details');
        assert(await topics.count() === 3, 'Missing document topics');
        for (const topic of await topics.all()) {
          if (await topic.getAttribute('open') === null) await topic.locator('summary').click();
          assert(await topic.locator('.q-topic-content').isVisible(), 'Topic did not expand');
          assert(await topic.locator('dl > div').count() === 3, 'Missing include/check/request content');
          await topic.locator('summary').click();
        }
        await topics.first().locator('summary').click();
      } else if (id === 'jp') {
        assert(await panel.getByText('Research draft · not verified', {exact:true}).isVisible(), 'Japan draft not marked');
        assert(await panel.locator('.q-market-rows, a').count() === 0, 'Draft shows verified guidance');
      } else {
        assert(await panel.locator('.q-market-rows article').count() === 3, 'Market categories merged');
        assert(await panel.locator('.q-market-footer a').count() > 0, 'Official sources missing');
        assert((await panel.locator('.q-status').innerText()).includes('2026-10-03'), 'Review date missing');
      }
    }
    assert(Math.max(...heights) - Math.min(...heights) < 1, `${prefix} tabs shift page height`);
    const first = page.locator(`#${prefix}-tab-${ids[0]}`);
    await first.focus(); await page.keyboard.press('End');
    assert(await page.locator(`#${prefix}-tab-${ids.at(-1)}`).getAttribute('aria-selected') === 'true', 'End key failed');
    await page.keyboard.press('Home'); await page.keyboard.press('ArrowRight');
    assert(await page.locator(`#${prefix}-tab-${ids[1]}`).getAttribute('aria-selected') === 'true', 'Arrow key failed');
    await page.keyboard.press('ArrowLeft');
    tabResults.push({prefix, count:ids.length, keyboard:'passed', stableHeight:true});
  }
  await overflowOK(); await bodyClear();
  await page.evaluate(() => scrollTo({top:0,behavior:'instant'}));
  await page.screenshot({path:`${shots}/quality-desktop-full.png`,fullPage:true});
  await page.screenshot({path:`${shots}/quality-desktop-top.png`});
  await shotSection('#product-documents','quality-desktop-documents');
  await shotSection('#markets','quality-desktop-markets');
  await shotSection('#documentation-requests','quality-desktop-request');

  // Native validation: neither a missing product nor an empty document selection navigates away.
  const submit = page.locator('.q-request-summary button[type="submit"]');
  await submit.click();
  assert(new URL(page.url()).pathname.startsWith('/quality'), 'Missing product accepted');
  assert(!await page.locator('#request-product').evaluate(el => el.validity.valid), 'Required product is not validated');
  await page.locator('#request-product').selectOption('iqf-frozen-raspberries');
  await page.locator('input[value="specification"]').uncheck();
  await submit.click();
  assert(!await page.locator('#documentation-request-form').evaluate(el => el.checkValidity()), 'Empty documents accepted');

  // Each certificate request preserves its selected topic without pretending it is a public file.
  for (const name of ['HACCP','ISO 22000','BRCGS','FSSC 22000']) {
    await page.getByRole('button',{name:`Request ${name} certification information`,exact:true}).click();
    assert(await page.locator('input[value="certification"]').isChecked(), 'Certification topic not selected');
    assert((await page.locator('.q-request-summary').innerText()).includes(name), 'Certificate context lost');
  }
  await page.getByRole('button',{name:'Request HACCP certification information',exact:true}).click();
  for (const id of ['specification','ingredient','testing','packaging']) await page.locator(`input[value="${id}"]`).check();
  await page.locator('#markets-tab-eu').click();
  await page.locator('#markets-panel-eu').getByRole('button',{name:/Use this market/}).click();
  assert(await page.locator('#request-market').inputValue() === 'eu', 'Market not transferred to brief');
  await submit.click(); await page.locator('.form-context').waitFor();
  const fullContext = await page.locator('input[name="briefContext"]').inputValue();
  for (const text of ['IQF Frozen Raspberries','Product Specification','Ingredient / Botanical Information','Testing Documentation','Certification Information','Packaging / Storage Information','HACCP','European Union','Page source: /quality']) assert(fullContext.includes(text), `Prefill missing ${text}`);
  assert(await page.locator('select[name="interest"]').inputValue() === 'Frozen Berries', 'Wrong category');
  await page.locator('.form-extra summary').click();
  assert(await page.locator('input[name="targetMarket"]').inputValue() === 'European Union', 'Editable market not prefilled');
  assert((await page.locator('input[name="documentRequest"]').inputValue()).includes('HACCP'), 'Editable document request not prefilled');
  await shotSection('.quote-form','quality-inquiry-prefill');
  await page.locator('input[name="targetMarket"]').fill('Germany');
  await page.locator('input[name="documentRequest"]').fill('Review the requested product and lot documents');
  await page.locator('input[name="name"]').fill('Development QA');
  await page.locator('input[name="email"]').fill('qa@example.com');
  await page.locator('input[name="company"]').fill('Preview Check');
  await page.locator('textarea[name="message"]').fill('Local quality documentation request preview only.');
  await page.getByRole('button',{name:/Preview Request/}).click();
  assert((await page.locator('.form-feedback').innerText()).includes('has not been sent'), 'False delivery claim');
  await page.getByRole('button',{name:'Remove added inquiry details'}).click();
  assert(await page.locator('input[name="briefContext"]').inputValue() === '', 'Removal does not clear context');
  assert(await page.locator('input[name="targetMarket"]').inputValue() === '' && await page.locator('input[name="documentRequest"]').inputValue() === '', 'Removal does not clear optional prefill');

  const routes = [
    {product:'dried-lemon-slices',group:'dried',market:'us',label:'United States'},
    {product:'raspberry-leaf-tea',group:'botanical',market:'ca',label:'Canada'},
    {product:'iqf-frozen-blueberries',group:'frozen',market:'gb',label:'Great Britain'},
  ];
  for (const route of routes) {
    await quality(`?product=${route.product}#product-documents`);
    assert(await page.locator('#request-product').inputValue() === route.product, 'Product detail context lost');
    assert(await page.locator(`#documents-tab-${route.group}`).getAttribute('aria-selected') === 'true', 'Wrong document group for product');
    const panel = page.locator(`#documents-panel-${route.group}`);
    await panel.locator('details').nth(1).locator('summary').click();
    await panel.locator('details').nth(1).getByRole('button',{name:/Prepare document request/}).click();
    assert(await page.locator('input[value="testing"]').isChecked(), 'Testing topic did not enter request');
    await page.locator('#request-market').selectOption(route.market);
    // Closing CTA submits the same form and uses its current selections.
    await page.locator('.q-closing button').click();
    await page.locator('.form-context').waitFor();
    const context = await page.locator('input[name="briefContext"]').inputValue();
    assert(context.includes(route.label) && context.includes('Testing Documentation') && context.includes('Page source: /quality'), 'Route prefill mismatch');
  }
  await quality('?product=iqf-frozen-raspberries');
  await page.locator('#documents-tab-dried').click();
  await page.locator('#documents-panel-dried details').first().getByRole('button',{name:/Prepare document request/}).click();
  assert(await page.locator('#request-product').inputValue() === '', 'Unrelated product retained in new group request');

  await page.goto(`${base}/?source=quality&product=dried-lemon-slices&market=untrusted-market&document=testing&document=testing&document=unknown-document&certification=untrusted-cert#quote`);
  await page.locator('.form-context').waitFor();
  const safeContext = await page.locator('input[name="briefContext"]').inputValue();
  assert(!safeContext.includes('untrusted') && !safeContext.includes('unknown-document') && safeContext.includes('To be discussed'), 'Unknown query values leaked');
  assert(safeContext.split('Testing Documentation').length === 2, 'Duplicate document query duplicated output');
  await page.goto(`${base}/?source=quality&product=dried-lemon-slices&document=unknown-document#quote`);
  await page.locator('.form-context').waitFor();
  assert(!(await page.locator('input[name="briefContext"]').inputValue()).includes('Document types:'), 'Invalid document became a request');

  // Home, navigation, footer, Private Label and all nine product pages point to the same page.
  await page.goto(base); await ready();
  assert(await page.locator('main a[href="/quality"]').count() === 2, 'Home quality entries not unified');
  assert(await page.locator('header a[href="/quality"]').count() === 1 && await page.locator('footer a[href="/quality"]').count() === 1, 'Navigation/footer wrong');
  await page.locator('header a[href="/quality"]').click();
  await page.locator('.q-page').waitFor();
  await page.goto(base + '/products/');
  const productPaths = await page.locator('.catalog-card h2 a').evaluateAll(nodes => nodes.map(a => a.getAttribute('href')));
  assert(productPaths.length === 9, 'Products changed');
  for (const path of productPaths) {
    await page.goto(base + path);
    const link = page.locator('main a[href^="/quality?product="]');
    assert(await link.count() === 1, 'Product quality entry missing');
    assert(new URL(await link.getAttribute('href'),base).searchParams.get('product') === path.split('/').filter(Boolean).at(-1), 'Product context differs');
  }
  await page.goto(base + '/private-label/'); await ready();
  assert(await page.locator('.pl-workflow-list').count() === 1 && await page.locator('.pl-workflow-list li').count() === 6, 'Private Label workflow changed');
  await page.locator('#process').scrollIntoViewIfNeeded(); await page.waitForTimeout(900);
  assert(await page.locator('#pl-process-title').evaluate(el => {
    const r = document.createRange(); r.selectNodeContents(el); const box = r.getBoundingClientRect();
    for (let p = el; p && p !== document.body; p = p.parentElement) {
      const s = getComputedStyle(p), b = p.getBoundingClientRect();
      if (+s.opacity < .99) return false;
      if (['hidden','clip'].includes(s.overflowY) && (box.top < b.top - 1 || box.bottom > b.bottom + 1)) return false;
    } return true;
  }), 'Private Label title faded or clipped');
  await page.locator('main a[href="/quality"]').click(); await page.locator('.q-page').waitFor();

  const responsive = [];
  for (const width of [1920,900,390]) {
    await page.setViewportSize({width,height:width === 390 ? 844 : 1000}); await quality();
    await overflowOK(); await bodyClear();
    if (width === 390) {
      for (const [prefix, ids] of [['documents',['frozen','dried','botanical']], ['markets',['eu','us','gb','ca','jp']]]) {
        const heights = [];
        for (const id of ids) {
          await page.locator(`#${prefix}-tab-${id}`).click();
          heights.push(await page.locator(`#${prefix}-panel-${id}`).evaluate(el => el.parentElement.getBoundingClientRect().height));
        }
        assert(Math.max(...heights) - Math.min(...heights) < 1, `Mobile ${prefix} tabs shift layout`);
        await page.locator(`#${prefix}-tab-${ids[0]}`).click();
      }
      await page.evaluate(() => scrollTo({top:0,behavior:'instant'}));
      await page.waitForTimeout(500);
      await page.screenshot({path:`${shots}/quality-mobile-full.png`,fullPage:true});
      await page.screenshot({path:`${shots}/quality-mobile-top.png`});
      await page.getByRole('button',{name:'Open menu',exact:true}).click();
      await page.locator('#primary-navigation a[href="/quality"]').click();
      await page.locator('.q-page').waitFor();
      await page.locator('#documents-tab-botanical').click();
      await page.locator('#documents-panel-botanical details').nth(2).locator('summary').click();
      await overflowOK();
      await shotSection('#product-documents','quality-mobile-documents');
      await page.locator('#documents-panel-botanical details').nth(2).getByRole('button',{name:/Prepare document request/}).click();
      await page.locator('#request-product').selectOption('raspberry-leaf-tea');
      await page.locator('#markets-tab-ca').click();
      await page.locator('#markets-panel-ca').getByRole('button',{name:/Use this market/}).click();
      await shotSection('#documentation-requests','quality-mobile-request');
      await page.locator('.q-request-summary button').click(); await page.locator('.form-context').waitFor();
      assert((await page.locator('input[name="briefContext"]').inputValue()).includes('Packaging / Storage Information'), 'Mobile request failed');
      await overflowOK(); await shotSection('.quote-form','quality-mobile-prefill');
    }
    responsive.push({width,overflow:false,text:'clear'});
  }
  await page.emulateMedia({reducedMotion:'reduce'}); await quality();
  await bodyClear();
  await page.locator('#documents-tab-dried').click();
  await page.locator('#documents-panel-dried details').nth(1).locator('summary').click();
  assert(await page.locator('#documents-panel-dried details').nth(1).locator('.q-topic-content').isVisible(), 'Reduced-motion interaction failed');
  await overflowOK(); await page.emulateMedia({reducedMotion:'no-preference'});
  assert(errors.length === 0, errors.join('; '));
  return {desktop:'1440x1000',tabResults,certifications:'4 records; independent verification/file states; details and requests passed',prefill:'5 types, 4 certificate topics, EU/US/CA/GB; product/category/market/documents/source; native validation; editable fields; removal; preview-only confirmed',entryPoints:'Home x2, header, footer, Private Label, product details x9',responsive,reducedMotion:'passed',downloads:0,pageErrors:errors};
}
