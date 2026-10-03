// Run after npm run build and serving out/ at localhost:4173:
// playwright-cli -s=frunoria-products run-code --filename scripts/review-product-library.js
async (page) => {
  const base = 'http://localhost:4173';
  const shots = 'C:/Users/XuWanPi/Pictures/Screenshots/FRUNORIA-product-library';
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const assert = (value, message) => { if (!value) throw new Error(message); };
  const ready = async () => {
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map(i => { i.loading = 'eager'; return i.decode().catch(() => {}); }));
    });
    assert(await page.locator('img').evaluateAll(images => images.every(i => i.complete && i.naturalWidth > 0)), 'Broken image');
  };
  const widthOK = async () => assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Horizontal overflow');
  await page.setViewportSize({width: 1440, height: 1000});
  await page.goto(`${base}/products/`);
  await ready();
  const cards = await page.locator('.catalog-card').evaluateAll(nodes => nodes.map(n => ({
    name: n.querySelector('h2').textContent,
    hrefs: [...n.querySelectorAll('a')].map(a => a.getAttribute('href')),
    image: n.querySelector('img').getAttribute('src'),
    category: n.querySelector('.mini-label').textContent,
  })));
  assert(cards.length === 9, 'Expected nine cards');
  assert(new Set(cards.map(c => c.image)).size === 9, 'Duplicate product main images');
  assert(cards.every(c => c.hrefs.length === 3 && c.hrefs.every(h => h === c.hrefs[0] && h.startsWith('/products/'))), 'Image/name/button detail paths differ');
  assert(cards.every(c => c.image.includes('/images/products/v2/')), 'Old card image');
  assert(cards.find(c => c.name === 'Raspberry Leaf Tea').category === 'Flowers & Herbal Ingredients', 'Leaf category changed');
  assert(await page.locator('.catalog-grid').evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length === 3), 'Desktop grid not three columns');
  await page.screenshot({path: `${shots}/products-desktop.png`, fullPage: true});
  await page.getByRole('button', {name: 'Frozen Berries', exact: true}).click();
  await page.waitForFunction(() => document.querySelectorAll('.catalog-card').length === 2);
  await page.locator('.catalog-controls').scrollIntoViewIfNeeded();
  await page.screenshot({path: `${shots}/products-frozen-filter.png`});
  await page.getByRole('searchbox').fill('blueberry');
  await page.waitForFunction(() => document.querySelectorAll('.catalog-card').length === 1);
  assert((await page.locator('.catalog-card h2').innerText()).includes('Blueberries'), 'Combined search failed');
  await page.getByRole('searchbox').fill('not-an-ingredient');
  await page.locator('.catalog-empty').waitFor();
  await page.getByRole('button', {name: /Show all products/}).click();
  await page.waitForFunction(() => document.querySelectorAll('.catalog-card').length === 9);
  await widthOK();

  const detailResults = [];
  for (const [index, card] of cards.entries()) {
    const response = await page.goto(base + card.hrefs[0]);
    assert(response.status() === 200, `Missing detail: ${card.name}`);
    await ready();
    assert(await page.locator('h1').innerText() === card.name, 'Wrong detail title');
    for (const section of ['overview','specifications','applications','packing','quality','faq']) assert(await page.locator(`#${section}`).count() === 1, `Missing ${section}`);
    assert(await page.locator('.pd-related-grid a').count() === 3, 'Missing related products');
    const galleryTop = await page.locator('#specifications').evaluate(el => el.getBoundingClientRect().top + scrollY);
    const sources = [];
    for (const role of ['product','detail','application']) {
      await page.getByRole('button', {name: `Show ${role} image`, exact: true}).click();
      await page.waitForFunction(role => document.querySelector('.pd-main-image figcaption').textContent.toLowerCase().startsWith(role), role);
      await ready();
      sources.push(await page.locator('.pd-main-image img').getAttribute('src'));
      assert(Math.abs(await page.locator('#specifications').evaluate(el => el.getBoundingClientRect().top + scrollY) - galleryTop) < 1, 'Gallery changes page height');
    }
    assert(new Set(sources).size === 3 && sources.every(s => s.includes('/v2/')), 'Missing unique new gallery images');
    await page.getByRole('button', {name: 'Show product image', exact: true}).click();
    const options = page.locator('.pd-option');
    await options.nth(0).focus();
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => document.querySelector('.pd-option').getAttribute('aria-pressed') === 'true');
    await options.nth(0).click();
    await page.waitForFunction(() => document.querySelector('.pd-option').getAttribute('aria-pressed') === 'false');
    await options.nth(1).click();
    const requirement = await options.nth(1).locator('strong').innerText();
    const quoteLinks = await page.locator('.pd-page a[href*="?product="]').evaluateAll(nodes => nodes.map(n => n.getAttribute('href')));
    assert(quoteLinks.length === 3 && new Set(quoteLinks).size === 1, 'Quote links not synchronized');
    assert(new URL(quoteLinks[0], base).searchParams.get('form') === requirement, 'Selected requirement missing');
    await page.locator('.pd-faq-list summary').first().click();
    assert(await page.locator('.pd-faq-list details').first().getAttribute('open') !== null, 'FAQ does not open');
    await page.locator('.pd-faq-list summary').first().click();
    await widthOK();
    assert(await page.locator('main h1, main h2, main p').evaluateAll(nodes => nodes.every(n => {
      for (let p = n; p && p !== document.body; p = p.parentElement) if (Number(getComputedStyle(p).opacity) < .99) return false;
      return true;
    })), 'Faded detail content');
    if (['Dried Lemon Slices','IQF Frozen Raspberries','Cassia, Goji & Chrysanthemum Tea Bags'].includes(card.name)) {
      await page.evaluate(() => window.scrollTo({top: 0, behavior: 'instant'}));
      const id = card.hrefs[0].split('/').filter(Boolean).pop();
      await page.screenshot({path: `${shots}/${id}-full.png`, fullPage: true});
      await page.screenshot({path: `${shots}/${id}-hero.png`});
      await page.locator('#specifications').evaluate(el => window.scrollTo({top:el.getBoundingClientRect().top + scrollY - 100,behavior:'instant'}));
      await page.screenshot({path: `${shots}/${id}-specifications.png`});
    }
    await page.locator('.pd-option-action a').click();
    await page.locator('.form-context').waitFor();
    const context = await page.locator('input[name="briefContext"]').inputValue();
    assert(context.includes(`Product: ${card.name}`) && context.includes(`Page source: ${card.hrefs[0]}`) && context.includes(`Requested form: ${requirement}`), `Wrong prefill ${card.name}`);
    assert(await page.locator('select[name="interest"]').inputValue() === card.category, 'Incorrect inquiry category');
    if (index === 0) {
      await page.locator('input[name="name"]').fill('Development QA');
      await page.locator('input[name="email"]').fill('qa@example.com');
      await page.locator('input[name="company"]').fill('Preview Check');
      await page.locator('textarea[name="message"]').fill('Please review this local product inquiry preview.');
      await page.getByRole('button', {name: /Preview Request/}).click();
      await page.locator('.form-feedback').waitFor();
      assert((await page.locator('.form-feedback').innerText()).includes('has not been sent'), 'Preview form incorrectly reports delivery');
    }
    detailResults.push({name: card.name, path: card.hrefs[0], gallery: 3, prefill: 'passed', requirement});
  }
  assert(errors.length === 0, errors.join('; '));
  return {viewport: '1440x1000', catalogue: '9 unique new images, 27 detail links, 3-column grid, combined filters, no-results and reset passed', detailResults, pageErrors: errors};
}
