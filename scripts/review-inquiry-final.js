// Final targeted checks after the shared-field and application remount fixes.
async page => {
 const base='http://localhost:4173', results=[];
 const assert=(value,message)=>{if(!value)throw Error(message);};
 const ready=async()=>{await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>{});}));});await page.waitForTimeout(400);};
 await page.setViewportSize({width:390,height:844});
 await page.goto(base+'/contact/?source=quality&product=iqf-frozen-raspberries&document=specification&document=certification&certification=haccp&market=eu');await ready();
 await page.getByRole('button',{name:'Edit details',exact:true}).click();
 await page.getByRole('radio',{name:'Product Inquiry',exact:true}).check();
 assert(await page.locator('[name="documentType"][value="certification"]').isVisible(),'Retained document topics editable across types');
 await page.locator('[name="packaging"]').fill('Discuss product-specific pack');
 await page.getByRole('radio',{name:'Quality Documents',exact:true}).check();
 assert(await page.locator('[name="packaging"]').isVisible(),'Retained packaging editable across types');
 assert(await page.evaluate(()=>document.documentElement.scrollWidth===innerWidth),'Mobile expanded form overflow');
 await page.locator('input[name="name"]').fill('Preview QA');await page.locator('input[name="email"]').fill('qa@example.invalid');await page.locator('textarea[name="message"]').fill('Synthetic mobile preview check');
 await page.getByRole('button',{name:'Preview Inquiry',exact:true}).click();assert(await page.locator('.inquiry-preview').isVisible(),'Mobile preview');
 await page.getByRole('button',{name:'Back to Edit'}).click();assert(await page.locator('textarea[name="message"]').inputValue()==='Synthetic mobile preview check','Mobile back to edit');
 await page.getByRole('button',{name:'Clear this draft',exact:true}).click();
 results.push('390px: document and packing context remains editable across inquiry types; preview/back works; no overflow');
 await page.setViewportSize({width:1440,height:1000});
 for(const id of ['tea-infusion-blends','beverage-garnishes','bakery-fruit-preparations','dairy-frozen-desserts']){
  await page.goto(base+'/applications/'+id+'/');await ready();
  const name=await page.locator('.ap-brief-application strong').innerText();
  await page.getByRole('button',{name:'Continue to Inquiry',exact:true}).click();await page.waitForURL('**/contact/');await ready();
  const brief=await page.locator('.inquiry-summary').innerText();assert(brief.includes(name)&&brief.includes('/applications/'+id),'Application source mismatch');
  assert(await page.locator('select[name="product"]').inputValue()==='','No unrelated product carried');
  results.push({application:id,inquiry:'passed without forced product selection'});
 }
 await page.getByRole('button',{name:'Clear this draft',exact:true}).click();
 await page.goto(base+'/contact/?product=iqf-frozen-raspberries&form=Whole%20Fruit%20Brief');await ready();
 await page.screenshot({path:'output/playwright/about-contact/contact-prefill-desktop.png',fullPage:true});
 await page.goto(base+'/');await ready();await page.locator('.about-actions a').click();await page.waitForURL('**/about/');assert(await page.locator('h1').innerText()==='About FRUNORIA','Homepage About CTA');
 return {results,homeAboutEntry:'passed',screenshots:'No personal fields populated in screenshot'};
}
