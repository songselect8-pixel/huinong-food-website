// Companion browser review for 390px, 900px and 1920px viewports.
async (page) => {
  const base = 'http://localhost:4173';
  const shots = 'C:/Users/XuWanPi/Pictures/Screenshots/FRUNORIA-product-library';
  const assert = (value, message) => { if (!value) throw new Error(message); };
  const ready = async () => page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map(i => { i.loading = 'eager'; return i.decode().catch(() => {}); }));
  });
  const widthOK = async () => assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Horizontal overflow');
  const position = async selector => {
    await page.locator(selector).evaluate(el => window.scrollTo({top: el.getBoundingClientRect().top + scrollY - 95, behavior: 'instant'}));
    await page.waitForTimeout(800);
  };
  const fullyVisible = async selector => page.locator(selector).evaluateAll(nodes => nodes.every(n => {
    const range = document.createRange();
    range.selectNodeContents(n);
    const text = range.getBoundingClientRect();
    for (let p = n; p && p !== document.body; p = p.parentElement) {
      const style = getComputedStyle(p);
      if (Number(style.opacity) < .99 || style.visibility === 'hidden') return false;
      const bounds = p.getBoundingClientRect();
      if (['hidden','clip'].includes(style.overflowX) && (text.left < bounds.left - 1 || text.right > bounds.right + 1)) return false;
      if (['hidden','clip'].includes(style.overflowY) && (text.top < bounds.top - 1 || text.bottom > bounds.bottom + 1)) return false;
    }
    return true;
  }));
  await page.setViewportSize({width: 390, height: 844});
  await page.goto(`${base}/products/`);
  await ready();
  const cards = await page.locator('.catalog-card').evaluateAll(nodes => nodes.map(n => ({name: n.querySelector('h2').textContent, href: n.querySelector('a').getAttribute('href')})));
  assert(cards.length === 9, 'Missing mobile cards');
  await widthOK();
  await page.screenshot({path: `${shots}/products-mobile.png`, fullPage: true});
  await page.getByRole('button', {name: 'Open menu', exact: true}).click();
  assert(await page.getByRole('button', {name: 'Close menu', exact: true}).getAttribute('aria-expanded') === 'true', 'Menu failed');
  await page.screenshot({path: `${shots}/mobile-navigation.png`});
  await page.getByRole('button', {name: 'Close menu', exact: true}).click();
  const mobileResults = [];
  for (const [index, card] of cards.entries()) {
    await page.goto(base + card.href);
    await ready();
    await widthOK();
    assert(await fullyVisible('main h1, main h2'), 'Hidden mobile heading');
    const galleryHeight = await page.locator('.pd-product-gallery').evaluate(el => el.getBoundingClientRect().height);
    for (const role of ['detail','application','product']) {
      await page.getByRole('button', {name: `Show ${role} image`, exact: true}).click();
      await page.waitForFunction(role => document.querySelector('.pd-main-image figcaption').textContent.toLowerCase().startsWith(role), role);
      await ready();
      assert(Math.abs(await page.locator('.pd-product-gallery').evaluate(el => el.getBoundingClientRect().height) - galleryHeight) < 1, 'Mobile gallery shifts height');
    }
    const option = page.locator('.pd-option').last();
    await option.click();
    const selected = await option.locator('strong').innerText();
    await page.waitForFunction(() => document.querySelectorAll('.pd-option[aria-pressed="true"]').length === 1);
    const cta = page.locator('.pd-hero-actions a').first();
    assert(new URL(await cta.getAttribute('href'), base).searchParams.get('form') === selected, 'Mobile hero prefill not synchronized');
    if (index === 0 || card.name === 'Cassia, Goji & Chrysanthemum Tea Bags') {
      const id = card.href.split('/').filter(Boolean).pop();
      await position('.pd-product-gallery');
      await page.screenshot({path: `${shots}/${id}-mobile-gallery.png`});
      await position('#specifications');
      await page.screenshot({path: `${shots}/${id}-mobile-specifications.png`});
      await position('.pd-option-action');
      await page.screenshot({path: `${shots}/${id}-mobile-selection.png`});
    }
    await cta.click();
    await page.locator('.form-context').waitFor();
    assert((await page.locator('input[name="briefContext"]').inputValue()).includes(`Product: ${card.name}`), 'Mobile product missing');
    assert((await page.locator('input[name="briefContext"]').inputValue()).includes(`Requested form: ${selected}`), 'Mobile selection missing');
    await widthOK();
    if (index === 0) {
      await page.locator('input[name="name"]').fill('Mobile QA');
      await page.locator('input[name="email"]').fill('mobile-qa@example.com');
      await page.locator('input[name="company"]').fill('Local Preview');
      await page.locator('textarea[name="message"]').fill('Please review the selected product requirements.');
      await page.getByRole('button', {name: /Preview Request/}).click();
      await page.locator('.form-feedback').waitFor();
      assert((await page.locator('.form-feedback').innerText()).includes('has not been sent'), 'Mobile preview status incorrect');
      await position('.quote-form');
      await page.screenshot({path: `${shots}/mobile-inquiry-form.png`});
      await position('.form-actions');
      await page.screenshot({path: `${shots}/mobile-inquiry-feedback.png`});
      await page.getByRole('button', {name: 'Remove added inquiry details'}).click();
      await page.waitForFunction(() => !document.querySelector('.form-context'));
    }
    mobileResults.push({product: card.name, gallery: '3 views / stable', selection: 'passed', prefill: 'passed', overflow: false});
  }
  await page.goto(`${base}/private-label/`);
  await ready();
  await position('#process');
  assert(await page.locator('.pl-workflow-list').count() === 1 && await page.locator('.pl-workflow-list li').count() === 6, 'Duplicate workflow');
  assert(await fullyVisible('#pl-process-title, .pl-workflow-list strong'), 'Faded or clipped mobile workflow');
  await widthOK();
  await page.screenshot({path: `${shots}/private-label-workflow-mobile.png`});
  await page.emulateMedia({reducedMotion: 'reduce'});
  await page.reload();
  await ready();
  await position('#process');
  assert(await fullyVisible('#pl-process-title, .pl-workflow-list strong'), 'Reduced-motion workflow hidden');
  await page.goto(`${base}/products/cassia-goji-chrysanthemum-tea-bags/`);
  await ready();
  assert(await fullyVisible('main h1, main h2'), 'Reduced-motion detail hidden');
  await page.getByRole('button', {name: 'Show application image'}).click();
  await page.locator('.pd-option').first().click();
  await page.waitForFunction(() => document.querySelector('.pd-option').getAttribute('aria-pressed') === 'true');
  await page.emulateMedia({reducedMotion: 'no-preference'});

  const layouts = [];
  for (const width of [900,1920]) {
    await page.setViewportSize({width,height:1080});
    await page.goto(`${base}/products/`);
    await ready();
    await widthOK();
    const columns = await page.locator('.catalog-grid').evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length);
    assert(columns === (width === 900 ? 2 : 3), 'Wrong responsive grid');
    await page.goto(`${base}/products/chrysanthemum-honeysuckle-goji-blend/`);
    await ready();
    await widthOK();
    assert(await fullyVisible('main h1, main h2'), 'Responsive title clipped');
    layouts.push({width,columns,overflow:false});
  }
  await page.setViewportSize({width:1440,height:1000});
  await page.goto(base);
  await ready();
  await position('.category-grid');
  const categories = await page.locator('.category-card').evaluateAll(nodes => nodes.map(n => ({name:n.querySelector('h3').textContent,image:n.querySelector('img').getAttribute('src'),href:n.getAttribute('href')})));
  assert(categories.map(c=>c.name).join('|') === 'Dried Fruits & Slices|Frozen Berries|Flowers & Herbal Ingredients|Fruit & Herbal Blends|Tea Bags & Packed Teas', 'Homepage order changed');
  assert(categories.every(c=>c.image.includes('/images/categories/v2/')), 'Old homepage range imagery');
  assert(await page.locator('img[src="/images/home-berries-citrus-hero.webp"]').count() === 1, 'Homepage hero changed');
  await page.setViewportSize({width:1440,height:1250});
  await position('.category-grid');
  await page.screenshot({path:`${shots}/homepage-product-ranges.png`});
  await page.goto(`${base}/private-label/`);
  await ready();
  await position('#process');
  assert(await fullyVisible('#pl-process-title, .pl-workflow-list strong'), 'Desktop workflow title clipped');
  await page.screenshot({path:`${shots}/private-label-workflow-desktop.png`});
  return {mobileResults,layouts,homepage:categories,privateLabel:'One six-step workflow; headings fully opaque and not clipped at 390px and 1440px',reducedMotion:'Private Label and detail content / gallery / selection passed',mobileForm:'Validation preview and remove context passed; no email sent'};
}
